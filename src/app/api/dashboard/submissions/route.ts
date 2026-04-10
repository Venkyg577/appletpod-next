import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase";

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("x-dashboard-token");
  const password = process.env.DASHBOARD_PASSWORD || "appletpod2024";
  return authHeader === password;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("free_applet_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ submissions: data });
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  const validStatuses = ["pending", "verified", "contacted", "rejected"];

  if (!id || !status || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("free_applet_submissions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
