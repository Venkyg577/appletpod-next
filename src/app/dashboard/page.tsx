"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, ExternalLink, LogOut, RefreshCw } from "lucide-react";

type Status = "pending" | "verified" | "contacted" | "rejected";

interface Submission {
  id: string;
  name: string;
  work_email: string;
  company_name: string;
  company_website: string;
  applet_topic: string;
  content_format: string;
  description: string | null;
  file_urls: string[];
  status: Status;
  created_at: string;
  updated_at: string;
}

const STATUS_COLORS: Record<Status, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  verified: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  contacted: "bg-green-500/20 text-green-400 border border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border border-red-500/30",
};

const STATUS_OPTIONS: Status[] = ["pending", "verified", "contacted", "rejected"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/dashboard/submissions", {
      headers: { "x-dashboard-token": password },
    });

    if (res.ok) {
      onLogin(password);
    } else {
      setError("Wrong password.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold" style={{ color: "#E87B35" }}>
            AppletPod
          </span>
          <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1A1A2E] rounded-2xl p-8 border border-white/10">
          <label className="block text-white/60 text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#E87B35] transition-colors"
            placeholder="Enter dashboard password"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-4 py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: "#E87B35" }}
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Expandable row ────────────────────────────────────────────────────────────
function SubmissionRow({
  submission,
  token,
  onStatusChange,
}: {
  submission: Submission;
  token: string;
  onStatusChange: (id: string, status: Status) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function handleStatusChange(newStatus: Status) {
    setUpdatingStatus(true);
    const res = await fetch("/api/dashboard/submissions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-dashboard-token": token,
      },
      body: JSON.stringify({ id: submission.id, status: newStatus }),
    });
    if (res.ok) {
      onStatusChange(submission.id, newStatus);
    }
    setUpdatingStatus(false);
  }

  return (
    <>
      <tr
        className="border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-4 py-3 text-white font-medium text-sm">{submission.name}</td>
        <td className="px-4 py-3 text-white/60 text-sm hidden md:table-cell">
          <a
            href={`mailto:${submission.work_email}`}
            className="hover:text-[#E87B35] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {submission.work_email}
          </a>
        </td>
        <td className="px-4 py-3 text-white/60 text-sm hidden lg:table-cell">
          {submission.company_name}
        </td>
        <td className="px-4 py-3 text-white/80 text-sm hidden xl:table-cell max-w-[200px] truncate">
          {submission.applet_topic}
        </td>
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <select
            value={submission.status}
            onChange={(e) => handleStatusChange(e.target.value as Status)}
            disabled={updatingStatus}
            className={`text-xs px-2 py-1 rounded-full font-medium bg-transparent border-0 outline-none cursor-pointer disabled:opacity-50 ${STATUS_COLORS[submission.status]}`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#1A1A2E] text-white">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 text-white/40 text-sm hidden sm:table-cell whitespace-nowrap">
          {formatDate(submission.created_at)}
        </td>
        <td className="px-4 py-3 text-white/30">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>

      {expanded && (
        <tr className="bg-[#1A1A2E]/60">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                <a
                  href={`mailto:${submission.work_email}`}
                  className="text-[#E87B35] hover:underline"
                >
                  {submission.work_email}
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Company</p>
                <p className="text-white/80">{submission.company_name}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Website</p>
                <a
                  href={submission.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E87B35] hover:underline inline-flex items-center gap-1"
                >
                  {submission.company_website}
                  <ExternalLink size={12} />
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Content Format</p>
                <p className="text-white/80">{submission.content_format}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Topic</p>
                <p className="text-white/80">{submission.applet_topic}</p>
              </div>
              {submission.description && (
                <div className="sm:col-span-2">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Description</p>
                  <p className="text-white/70 leading-relaxed">{submission.description}</p>
                </div>
              )}
              {submission.file_urls && submission.file_urls.length > 0 && (
                <div className="sm:col-span-2">
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {submission.file_urls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E87B35]/10 text-[#E87B35] text-xs hover:bg-[#E87B35]/20 transition-colors border border-[#E87B35]/20"
                      >
                        File {i + 1}
                        <ExternalLink size={11} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Submitted</p>
                <p className="text-white/50 text-xs">{new Date(submission.created_at).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Last Updated</p>
                <p className="text-white/50 text-xs">{new Date(submission.updated_at).toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">ID</p>
                <p className="text-white/30 text-xs font-mono">{submission.id}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  const fetchSubmissions = useCallback(
    async (t: string) => {
      setLoading(true);
      setError("");
      const res = await fetch("/api/dashboard/submissions", {
        headers: { "x-dashboard-token": t },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions);
      } else {
        setError("Failed to load submissions.");
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    // Persist token in sessionStorage so refresh doesn't log out
    const saved = sessionStorage.getItem("dashboard_token");
    if (saved) {
      setToken(saved);
      fetchSubmissions(saved);
    }
  }, [fetchSubmissions]);

  function handleLogin(t: string) {
    sessionStorage.setItem("dashboard_token", t);
    setToken(t);
    fetchSubmissions(t);
  }

  function handleLogout() {
    sessionStorage.removeItem("dashboard_token");
    setToken(null);
    setSubmissions([]);
  }

  function handleStatusChange(id: string, status: Status) {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, updated_at: new Date().toISOString() } : s))
    );
  }

  if (!token) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const counts = submissions.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const filtered =
    filterStatus === "all" ? submissions : submissions.filter((s) => s.status === filterStatus);

  return (
    <div className="min-h-screen bg-[#0F0F1A] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0F0F1A]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold" style={{ color: "#E87B35" }}>
              AppletPod
            </span>
            <span className="text-white/30 text-sm ml-2">/ Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchSubmissions(token)}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors disabled:opacity-30"
              title="Refresh"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {(["all", ...STATUS_OPTIONS] as const).map((s) => {
            const count = s === "all" ? submissions.length : (counts[s] || 0);
            const active = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-xl p-4 text-left border transition-all ${
                  active
                    ? "border-[#E87B35]/50 bg-[#E87B35]/10"
                    : "border-white/5 bg-[#1A1A2E] hover:border-white/10"
                }`}
              >
                <p className="text-2xl font-bold text-white">{count}</p>
                <p className={`text-xs mt-0.5 capitalize ${active ? "text-[#E87B35]" : "text-white/40"}`}>
                  {s === "all" ? "Total" : s}
                </p>
              </button>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-[#1A1A2E] rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-white/70 text-sm font-medium">
              {filterStatus === "all" ? "All submissions" : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} submissions`}
              <span className="ml-2 text-white/30">({filtered.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-20 text-center text-white/30 text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-white/30 text-sm">No submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-2.5 text-left text-xs text-white/30 font-medium">Name</th>
                    <th className="px-4 py-2.5 text-left text-xs text-white/30 font-medium hidden md:table-cell">Email</th>
                    <th className="px-4 py-2.5 text-left text-xs text-white/30 font-medium hidden lg:table-cell">Company</th>
                    <th className="px-4 py-2.5 text-left text-xs text-white/30 font-medium hidden xl:table-cell">Topic</th>
                    <th className="px-4 py-2.5 text-left text-xs text-white/30 font-medium">Status</th>
                    <th className="px-4 py-2.5 text-left text-xs text-white/30 font-medium hidden sm:table-cell">Date</th>
                    <th className="px-4 py-2.5 w-8" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <SubmissionRow
                      key={s.id}
                      submission={s}
                      token={token}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
