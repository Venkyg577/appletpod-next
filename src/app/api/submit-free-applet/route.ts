import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase";
import { Resend } from "resend";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
  "icloud.com", "aol.com", "protonmail.com", "mail.com", "zoho.com",
  "yandex.com", "ymail.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.com.au",
  "rediffmail.com", "msn.com", "me.com", "mac.com", "googlemail.com",
  "pm.me", "tutanota.com", "fastmail.com", "hey.com", "inbox.com",
]);

function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const work_email = formData.get("work_email") as string;
    const company_name = formData.get("company_name") as string;
    const company_website = formData.get("company_website") as string;
    const applet_topic = formData.get("applet_topic") as string;
    const content_format = formData.get("content_format") as string;
    const description = formData.get("description") as string | null;
    const files = formData.getAll("files") as File[];

    // Required field validation
    if (!name || !work_email || !company_name || !company_website || !applet_topic || !content_format) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Work email validation
    if (!isWorkEmail(work_email)) {
      return NextResponse.json(
        { error: "Please use a work email address, not a personal email." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createServiceRoleClient();
    const submissionId = randomUUID();
    const fileUrls: string[] = [];

    // Upload files to Supabase Storage
    for (const file of files) {
      if (!file || file.size === 0) continue;

      const fileExt = file.name.split(".").pop() || "bin";
      const fileName = `${submissionId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from("submissions")
        .upload(fileName, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("File upload error:", uploadError);
        // Continue without this file rather than failing the whole submission
        continue;
      }

      const { data: urlData } = supabaseAdmin.storage
        .from("submissions")
        .getPublicUrl(fileName);

      fileUrls.push(urlData.publicUrl);
    }

    // Insert into database
    const { error: dbError } = await supabaseAdmin
      .from("free_applet_submissions")
      .insert({
        id: submissionId,
        name,
        work_email,
        company_name,
        company_website,
        applet_topic,
        content_format,
        description: description || null,
        file_urls: fileUrls,
        status: "pending",
        updated_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error("DB insert error — code:", dbError.code, "| message:", dbError.message, "| details:", dbError.details, "| hint:", dbError.hint);
      return NextResponse.json(
        { error: "Failed to save your submission. Please try again.", debug: dbError.message },
        { status: 500 }
      );
    }

    // Send confirmation email to the client
    await resend.emails.send({
      from: "AppletPod <onboarding@resend.dev>",
      to: work_email,
      subject: "We got your applet request — AppletPod",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1A1A2E;">
          <div style="margin-bottom: 32px;">
            <span style="font-size: 20px; font-weight: 700; color: #E87B35;">AppletPod</span>
          </div>
          <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; line-height: 1.3;">
            Got it, ${name.split(" ")[0]}.
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #1A1A2E99; margin-bottom: 24px;">
            We've received your request for a free applet covering <strong style="color: #1A1A2E;">"${applet_topic}"</strong>.
            We'll review your details and reach out within 2 business days to schedule a discovery call.
          </p>
          <div style="background: #FFF3EB; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px;">
            <p style="font-size: 14px; font-weight: 600; color: #E87B35; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em;">What you submitted</p>
            <table style="width: 100%; font-size: 14px; color: #1A1A2E99; border-collapse: collapse;">
              <tr><td style="padding: 4px 0; font-weight: 600; color: #1A1A2E; width: 140px;">Company</td><td style="padding: 4px 0;">${company_name}</td></tr>
              <tr><td style="padding: 4px 0; font-weight: 600; color: #1A1A2E;">Topic</td><td style="padding: 4px 0;">${applet_topic}</td></tr>
              <tr><td style="padding: 4px 0; font-weight: 600; color: #1A1A2E;">Content format</td><td style="padding: 4px 0;">${content_format}</td></tr>
              ${fileUrls.length > 0 ? `<tr><td style="padding: 4px 0; font-weight: 600; color: #1A1A2E;">Attachments</td><td style="padding: 4px 0;">${fileUrls.length} file(s) uploaded</td></tr>` : ""}
            </table>
          </div>
          <p style="font-size: 14px; color: #1A1A2E60; margin-bottom: 8px;">Questions? Reply to this email or reach us at Venkatesh@appletpod.com</p>
          <p style="font-size: 14px; color: #1A1A2E60;">— Venkatesh, AppletPod</p>
        </div>
      `,
    });

    // Send notification email to Venkatesh
    await resend.emails.send({
      from: "AppletPod <onboarding@resend.dev>",
      to: "Venkatesh@appletpod.com",
      subject: `New free applet request from ${company_name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1A1A2E;">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 20px; font-weight: 700; color: #E87B35;">New Submission</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 20px;">Free applet request from ${company_name}</h1>
          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600; width: 160px;">Name</td><td style="padding: 10px 0;">${name}</td></tr>
            <tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600;">Email</td><td style="padding: 10px 0;"><a href="mailto:${work_email}" style="color: #E87B35;">${work_email}</a></td></tr>
            <tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600;">Company</td><td style="padding: 10px 0;">${company_name}</td></tr>
            <tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600;">Website</td><td style="padding: 10px 0;"><a href="${company_website}" style="color: #E87B35;">${company_website}</a></td></tr>
            <tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600;">Applet topic</td><td style="padding: 10px 0;">${applet_topic}</td></tr>
            <tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600;">Content format</td><td style="padding: 10px 0;">${content_format}</td></tr>
            ${description ? `<tr style="border-bottom: 1px solid #EDEBE8;"><td style="padding: 10px 0; font-weight: 600; vertical-align: top;">Notes</td><td style="padding: 10px 0;">${description}</td></tr>` : ""}
            ${fileUrls.length > 0 ? `<tr><td style="padding: 10px 0; font-weight: 600; vertical-align: top;">Files</td><td style="padding: 10px 0;">${fileUrls.map((url, i) => `<a href="${url}" style="color: #E87B35; display: block; margin-bottom: 4px;">File ${i + 1}</a>`).join("")}</td></tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #F7F5F3; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #1A1A2E60;">Submission ID: ${submissionId}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, id: submissionId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Submission error:", message, error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", debug: message },
      { status: 500 }
    );
  }
}
