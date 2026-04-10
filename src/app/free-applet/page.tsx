"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Paperclip, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const CONTENT_FORMAT_OPTIONS = [
  "Slides or presentations",
  "Documents or PDFs",
  "Rough notes or recordings",
  "Video content",
  "Just an idea — no content yet",
  "Something else",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormState {
  name: string;
  work_email: string;
  company_name: string;
  company_website: string;
  applet_topic: string;
  content_format: string;
  description: string;
}

interface FieldError {
  name?: string;
  work_email?: string;
  company_name?: string;
  company_website?: string;
  applet_topic?: string;
  content_format?: string;
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
  "icloud.com", "aol.com", "protonmail.com", "mail.com", "zoho.com",
  "yandex.com", "ymail.com", "rediffmail.com", "msn.com", "me.com",
  "mac.com", "googlemail.com", "pm.me", "tutanota.com", "hey.com",
]);

function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url: string): boolean {
  try {
    const withProtocol = url.startsWith("http") ? url : `https://${url}`;
    new URL(withProtocol);
    return true;
  } catch {
    return false;
  }
}

export default function FreeAppletPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    work_email: "",
    company_name: "",
    company_website: "",
    applet_topic: "",
    content_format: "",
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched.has(field)) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => new Set(prev).add(field));
    validateField(field, form[field]);
  };

  const validateField = (field: keyof FormState, value: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      switch (field) {
        case "name":
          if (!value.trim()) next.name = "We'd love to know your name.";
          else delete next.name;
          break;
        case "work_email":
          if (!value.trim()) {
            next.work_email = "Please enter your work email.";
          } else if (!isValidEmail(value)) {
            next.work_email = "That doesn't look like a valid email.";
          } else if (!isWorkEmail(value)) {
            next.work_email = "Please use your work email, not a personal one.";
          } else {
            delete next.work_email;
          }
          break;
        case "company_name":
          if (!value.trim()) next.company_name = "Company name is required.";
          else delete next.company_name;
          break;
        case "company_website":
          if (!value.trim()) {
            next.company_website = "Please share your website URL.";
          } else if (!isValidUrl(value)) {
            next.company_website = "That doesn't look like a valid URL.";
          } else {
            delete next.company_website;
          }
          break;
        case "applet_topic":
          if (!value.trim()) next.applet_topic = "Tell us what your applet should cover.";
          else delete next.applet_topic;
          break;
        case "content_format":
          if (!value) next.content_format = "Please pick an option.";
          else delete next.content_format;
          break;
      }
      return next;
    });
  };

  const validateAll = (): boolean => {
    const allFields: (keyof FormState)[] = [
      "name", "work_email", "company_name", "company_website", "applet_topic", "content_format",
    ];
    const newErrors: FieldError = {};
    allFields.forEach((field) => {
      const value = form[field];
      switch (field) {
        case "name":
          if (!value.trim()) newErrors.name = "We'd love to know your name.";
          break;
        case "work_email":
          if (!value.trim()) {
            newErrors.work_email = "Please enter your work email.";
          } else if (!isValidEmail(value)) {
            newErrors.work_email = "That doesn't look like a valid email.";
          } else if (!isWorkEmail(value)) {
            newErrors.work_email = "Please use your work email, not a personal one.";
          }
          break;
        case "company_name":
          if (!value.trim()) newErrors.company_name = "Company name is required.";
          break;
        case "company_website":
          if (!value.trim()) {
            newErrors.company_website = "Please share your website URL.";
          } else if (!isValidUrl(value)) {
            newErrors.company_website = "That doesn't look like a valid URL.";
          }
          break;
        case "applet_topic":
          if (!value.trim()) newErrors.applet_topic = "Tell us what your applet should cover.";
          break;
        case "content_format":
          if (!value) newErrors.content_format = "Please pick an option.";
          break;
      }
    });
    setErrors(newErrors);
    setTouched(new Set(allFields));
    return Object.keys(newErrors).length === 0;
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const valid = selected.filter((f) => f.size <= MAX_FILE_SIZE);
    const oversized = selected.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      setSubmitError(`${oversized.length} file(s) exceeded the 10MB limit and were not added.`);
      setTimeout(() => setSubmitError(null), 4000);
    }
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...valid.filter((f) => !existing.has(f.name + f.size))];
    });
    // Reset input so same file can be re-added after removal
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) {
      const firstErrorEl = document.querySelector("[data-field-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("work_email", form.work_email.trim().toLowerCase());
      formData.append("company_name", form.company_name.trim());
      formData.append(
        "company_website",
        form.company_website.startsWith("http") ? form.company_website.trim() : `https://${form.company_website.trim()}`
      );
      formData.append("applet_topic", form.applet_topic.trim());
      formData.append("content_format", form.content_format);
      if (form.description.trim()) {
        formData.append("description", form.description.trim());
      }
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/submit-free-applet", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.debug ? `${data.error} (${data.debug})` : data.error || "Something went wrong. Please try again.";
        setSubmitError(msg);
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-lg w-full text-center"
          >
            <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
              We got your request!
            </h1>
            <p className="text-lg text-charcoal/60 leading-relaxed max-w-sm mx-auto mb-8">
              We&apos;ll review your details and reach out within 2 business days to schedule a discovery call.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors underline underline-offset-4"
            >
              Back to AppletPod
            </a>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 md:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="text-xs font-heading font-semibold tracking-[0.1em] uppercase text-accent mb-3">
              Free First Applet
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight mb-4">
              Let&apos;s build your first applet — free.
            </h1>
            <p className="text-lg text-charcoal/60 leading-relaxed">
              Tell us a bit about yourself and what you want to build. We&apos;ll take it from there.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-0"
          >
            {/* Section: About you */}
            <FormSection label="About you" step="01">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Your name"
                  error={errors.name}
                  touched={touched.has("name")}
                >
                  <input
                    type="text"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={inputClass(errors.name, touched.has("name"))}
                    autoComplete="name"
                  />
                </Field>
                <Field
                  label="Work email"
                  hint="No Gmail, Yahoo, etc."
                  error={errors.work_email}
                  touched={touched.has("work_email")}
                >
                  <input
                    type="email"
                    placeholder="priya@yourcompany.com"
                    value={form.work_email}
                    onChange={(e) => handleChange("work_email", e.target.value)}
                    onBlur={() => handleBlur("work_email")}
                    className={inputClass(errors.work_email, touched.has("work_email"))}
                    autoComplete="email"
                  />
                </Field>
                <Field
                  label="Company name"
                  error={errors.company_name}
                  touched={touched.has("company_name")}
                >
                  <input
                    type="text"
                    placeholder="Acme Learning"
                    value={form.company_name}
                    onChange={(e) => handleChange("company_name", e.target.value)}
                    onBlur={() => handleBlur("company_name")}
                    className={inputClass(errors.company_name, touched.has("company_name"))}
                    autoComplete="organization"
                  />
                </Field>
                <Field
                  label="Company website"
                  error={errors.company_website}
                  touched={touched.has("company_website")}
                >
                  <input
                    type="url"
                    placeholder="acmelearning.com"
                    value={form.company_website}
                    onChange={(e) => handleChange("company_website", e.target.value)}
                    onBlur={() => handleBlur("company_website")}
                    className={inputClass(errors.company_website, touched.has("company_website"))}
                    autoComplete="url"
                  />
                </Field>
              </div>
            </FormSection>

            <SectionDivider />

            {/* Section: About your applet */}
            <FormSection label="About your applet" step="02">
              <div className="space-y-5">
                <Field
                  label="What should your applet cover?"
                  error={errors.applet_topic}
                  touched={touched.has("applet_topic")}
                >
                  <input
                    type="text"
                    placeholder="e.g. New hire onboarding flow, Product feature walkthrough, Compliance training module"
                    value={form.applet_topic}
                    onChange={(e) => handleChange("applet_topic", e.target.value)}
                    onBlur={() => handleBlur("applet_topic")}
                    className={inputClass(errors.applet_topic, touched.has("applet_topic"))}
                  />
                </Field>
                <Field
                  label="What does your content look like right now?"
                  error={errors.content_format}
                  touched={touched.has("content_format")}
                >
                  <select
                    value={form.content_format}
                    onChange={(e) => handleChange("content_format", e.target.value)}
                    onBlur={() => handleBlur("content_format")}
                    className={`${inputClass(errors.content_format, touched.has("content_format"))} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'12'%20height%3D'12'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%231A1A2E99'%20stroke-width%3D'2'%3E%3Cpath%20d%3D'M6%209l6%206%206-6'%2F%3E%3C%2Fsvg%3E")] bg-no-repeat bg-[right_14px_center]`}
                  >
                    <option value="">Pick one…</option>
                    {CONTENT_FORMAT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Anything else we should know?"
                  hint="Optional — your audience, goals, constraints, etc."
                >
                  <textarea
                    rows={4}
                    placeholder="e.g. This is for new hire onboarding. Our learners are non-technical. We already have a Moodle setup."
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-warm-dark bg-white text-charcoal placeholder:text-charcoal/30 text-base font-body leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
                  />
                </Field>
              </div>
            </FormSection>

            <SectionDivider />

            {/* Section: Attachments */}
            <FormSection label="Attachments" step="03" hint="Optional · 10MB per file">
              <div className="space-y-3">
                {files.length > 0 && (
                  <ul className="space-y-2">
                    {files.map((file, i) => (
                      <motion.li
                        key={`${file.name}-${file.size}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className="flex items-center gap-3 px-4 py-2.5 bg-warm rounded-xl border border-warm-dark/50"
                      >
                        <Paperclip className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-sm text-charcoal/80 truncate flex-1">{file.name}</span>
                        <span className="text-xs text-charcoal/40 shrink-0">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-warm-dark transition-colors shrink-0 cursor-pointer"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X className="w-3.5 h-3.5 text-charcoal/50" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-charcoal/20 text-charcoal/50 hover:border-accent hover:text-accent text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="text-base leading-none">+</span>
                  Add file
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileAdd}
                  aria-label="Upload files"
                />
                <p className="text-xs text-charcoal/40">
                  Slides, PDFs, notes, recordings — anything that helps us understand your content.
                </p>
              </div>
            </FormSection>

            <SectionDivider />

            {/* Submit */}
            <div className="pt-2 pb-4">
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-50 border border-red-200"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{submitError}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-accent text-white text-base font-semibold hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-accent/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send my request"
                )}
              </button>
              <p className="mt-4 text-sm text-charcoal/40">
                No commitment. We&apos;ll reach out within 24 hours.
              </p>
            </div>
          </motion.form>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────

function FormSection({
  children,
  label,
  step,
  hint,
}: {
  children: React.ReactNode;
  label: string;
  step: string;
  hint?: string;
}) {
  return (
    <div className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-heading font-bold text-accent/60 tracking-wider">{step}</span>
        <h2 className="font-heading text-lg font-bold text-charcoal">{label}</h2>
        {hint && <span className="text-xs text-charcoal/40 font-medium">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px bg-warm-dark/60" />;
}

function Field({
  label,
  hint,
  error,
  touched,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}) {
  const showError = error && touched;
  return (
    <div className="flex flex-col gap-1.5" data-field-error={showError ? "true" : undefined}>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-charcoal/80">{label}</label>
        {hint && !showError && (
          <span className="text-xs text-charcoal/40">{hint}</span>
        )}
        {showError && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function inputClass(error?: string, isTouched?: boolean): string {
  const base =
    "w-full px-4 py-3 rounded-xl border bg-white text-charcoal placeholder:text-charcoal/30 text-base font-body leading-relaxed focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";
  if (error && isTouched) {
    return `${base} border-red-300 focus:ring-red-400`;
  }
  return `${base} border-warm-dark focus:ring-accent`;
}
