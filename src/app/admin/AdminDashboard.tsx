"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type {
  ApplicationStatus,
  StoredApplication,
} from "@/types/application";

interface AdminUser {
  username: string;
  fullName: string;
  role: "SUPER_ADMIN" | "ADMISSIONS_OFFICER" | "REVIEWER";
}

interface SummaryStats {
  total: number;
  pending: number;
  shortlisted: number;
  approved: number;
  sponsored: number;
  selfSponsored: number;
}

type ListItem = Omit<StoredApplication, "passportPhotoDataUrl"> & {
  hasPhoto?: boolean;
};

interface AuditEntry {
  id: number;
  actor_username: string;
  action: string;
  previous_status: string | null;
  new_status: string | null;
  notes: string | null;
  created_at: string;
}

const STATUS_META: Record<
  ApplicationStatus,
  { label: string; badge: string }
> = {
  PENDING: {
    label: "Pending review",
    badge: "bg-stone-100 text-stone-800 border-stone-300",
  },
  UNDER_REVIEW: {
    label: "Under review",
    badge: "bg-starehe-blue-50 text-starehe-blue-900 border-starehe-blue-200",
  },
  SHORTLISTED: {
    label: "Shortlisted",
    badge: "bg-starehe-gold-50 text-starehe-gold-900 border-starehe-gold-300",
  },
  HOME_VISIT_REQUIRED: {
    label: "Home visit",
    badge: "bg-amber-50 text-amber-900 border-amber-300",
  },
  APPROVED: {
    label: "Approved",
    badge: "bg-emerald-50 text-emerald-900 border-emerald-300",
  },
  WAITLISTED: {
    label: "Waitlisted",
    badge: "bg-slate-100 text-slate-800 border-slate-300",
  },
  REJECTED: {
    label: "Not successful",
    badge: "bg-starehe-maroon-50 text-starehe-maroon-900 border-starehe-maroon-200",
  },
};

const PATHWAY_LABELS: Record<string, string> = {
  STEM: "STEM",
  SOCIAL_SCIENCE: "Social Science",
  ARTS_SPORTS: "Arts & Sports",
};

function formatDateShort(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso.includes("T") ? iso : `${iso.replace(" ", "T")}Z`);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard({ user }: { user: AdminUser }) {
  const router = useRouter();
  const [items, setItems] = useState<ListItem[]>([]);
  const [stats, setStats] = useState<SummaryStats>({
    total: 0,
    pending: 0,
    shortlisted: 0,
    approved: 0,
    sponsored: 0,
    selfSponsored: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [pathway, setPathway] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Detail drawer state
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<StoredApplication | null>(null);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // Review form state inside drawer
  const [editStatus, setEditStatus] = useState<ApplicationStatus>("PENDING");
  const [editRemarks, setEditRemarks] = useState("");
  const [editArts, setEditArts] = useState("");
  const [editSocial, setEditSocial] = useState("");
  const [editStem, setEditStem] = useState("");
  const [savingReview, setSavingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [archiving, setArchiving] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams();
      if (search.trim()) qs.set("search", search.trim());
      if (category !== "ALL") qs.set("category", category);
      if (pathway !== "ALL") qs.set("pathway", pathway);
      if (statusFilter !== "ALL") qs.set("status", statusFilter);

      const res = await fetch(`/api/applications?${qs.toString()}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.replace("/admin/login?expired=1");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.error || "Could not load Grade 10 applications."
        );
      }
      setItems(data.items || []);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [search, category, pathway, statusFilter, router]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchList();
    }, 200);
    return () => clearTimeout(t);
  }, [fetchList]);

  const openApplication = async (id: number) => {
    setSelectedId(id);
    setDetail(null);
    setAudit([]);
    setDetailLoading(true);
    setReviewMessage("");
    try {
      const res = await fetch(`/api/applications/${id}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.replace("/admin/login?expired=1");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Could not load application details.");
      }
      const app: StoredApplication = data.application;
      setDetail(app);
      setAudit(data.audit || []);
      setEditStatus(app.status);
      setEditRemarks(app.adminRemarks || "");
      setEditArts(app.knecArtsScore || "");
      setEditSocial(app.knecSocialScore || "");
      setEditStem(app.knecStemScore || "");
    } catch (err) {
      setError((err as Error).message);
      setSelectedId(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const saveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail) return;
    setSavingReview(true);
    setReviewMessage("");
    try {
      const res = await fetch(`/api/applications/${detail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          adminRemarks: editRemarks,
          knecArtsScore: editArts,
          knecSocialScore: editSocial,
          knecStemScore: editStem,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Review changes could not be saved.");
      }
      setDetail(data.application);
      setAudit(data.audit || []);
      setReviewMessage("Decision and KNEC scores saved.");
      fetchList();
    } catch (err) {
      setReviewMessage(`Error: ${(err as Error).message}`);
    } finally {
      setSavingReview(false);
    }
  };

  const archiveSelected = async () => {
    if (!detail) return;
    if (
      !window.confirm(
        `Archive application ${detail.applicationNumber} (${detail.fullName})? It will be hidden from the active list but preserved in the database.`
      )
    ) {
      return;
    }
    setArchiving(true);
    try {
      const res = await fetch(`/api/applications/${detail.id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Could not archive application.");
      }
      setSelectedId(null);
      setDetail(null);
      fetchList();
    } catch (err) {
      setReviewMessage(`Error: ${(err as Error).message}`);
    } finally {
      setArchiving(false);
    }
  };

  const exportCsv = () => {
    const headers = [
      "Application No",
      "Submitted Date",
      "Full Name",
      "Category",
      "Assessment No",
      "Centre Code",
      "Date of Birth",
      "County",
      "Sub-County",
      "Junior School",
      "HOI Contact",
      "Pathway",
      "Tracks",
      "Parent/Guardian",
      "Parent Mobile",
      "Status",
      "KNEC Arts",
      "KNEC Social",
      "KNEC STEM",
      "Admin Remarks",
    ];
    const esc = (v: unknown) => {
      const s = String(v ?? "").replace(/"/g, '""');
      return `"${s}"`;
    };
    const rows = items.map((a) =>
      [
        a.applicationNumber,
        a.createdAt,
        a.fullName,
        a.category,
        a.assessmentNo,
        a.centreCode,
        a.dateOfBirth,
        a.county,
        a.subCounty,
        a.juniorSchoolName,
        a.juniorSchHoiContact,
        a.pathwaySelected,
        (a.tracksSelected || []).join("; "),
        a.parentCertName,
        a.parentCertMobile,
        a.status,
        a.knecArtsScore || "",
        a.knecSocialScore || "",
        a.knecStemScore || "",
        a.adminRemarks || "",
      ]
        .map(esc)
        .join(",")
    );
    const csv = [headers.map(esc).join(","), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Starehe-Grade10-Applications-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const countyCount = useMemo(() => {
    const s = new Set(items.map((i) => i.county).filter(Boolean));
    return s.size;
  }, [items]);

  return (
    <div className="bg-starehe-cream min-h-screen">
      {/* Top header */}
      <header className="bg-starehe-blue-900 text-white border-b border-starehe-blue-800">
        <div className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-starehe-gold-300">
              Starehe Girls&apos; Centre &bull; Admissions Committee Portal
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              Grade 10 Senior School Applications
            </h1>
            <p className="text-xs sm:text-sm text-starehe-blue-200 mt-1">
              Signed in as <strong className="text-white">{user.fullName}</strong> ({user.username} &middot;{" "}
              {user.role.replace("_", " ")})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admissions/apply"
              className="inline-flex items-center gap-1.5 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New application
            </Link>
            <a
              href="/api/applications/form-pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Blank PDF
            </a>
            <button
              type="button"
              onClick={exportCsv}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 hover:bg-white/10 disabled:opacity-50 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Export CSV ({items.length})
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 hover:bg-white/10 px-3.5 py-2 text-xs font-semibold text-starehe-blue-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="w-[92%] md:w-[90%] max-w-[1680px] mx-auto py-8 space-y-6">
        {/* Summary metrics */}
        <section
          aria-label="Application summary statistics"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5"
        >
          {[
            { label: "Total received", value: stats.total, sub: `${countyCount} counties in view` },
            { label: "Pending review", value: stats.pending, sub: "Awaiting committee" },
            { label: "Shortlisted", value: stats.shortlisted, sub: "Incl. home visits" },
            { label: "Approved", value: stats.approved, sub: "Admitted to Grade 10" },
            { label: "Sponsored (70%)", value: stats.sponsored, sub: "Need-based applicants" },
            { label: "Self-sponsored", value: stats.selfSponsored, sub: "Fee-paying applicants" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-xl border border-stone-200 p-4 shadow-subtle"
            >
              <p className="text-xs font-medium text-stone-500">{m.label}</p>
              <p className="font-serif text-2xl font-bold text-starehe-blue-900 tabular-nums mt-1">
                {m.value}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">{m.sub}</p>
            </div>
          ))}
        </section>

        {/* Filters bar */}
        <section className="bg-white rounded-xl border border-stone-200 p-4 shadow-subtle">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            <div className="lg:col-span-5">
              <label
                htmlFor="admin-search"
                className="block text-xs font-semibold text-starehe-blue-900 mb-1"
              >
                Search applicant, reference, assessment no., school or county
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Wanjiku, SGC-G10, Turkana..."
                  className="w-full rounded-lg border border-stone-300 bg-white pl-9 pr-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-starehe-blue-700"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="filter-category"
                className="block text-xs font-semibold text-starehe-blue-900 mb-1"
              >
                Category
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-starehe-blue-700"
              >
                <option value="ALL">All categories</option>
                <option value="SPONSORED">Sponsored</option>
                <option value="SELF_SPONSORED">Self-sponsored</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="filter-pathway"
                className="block text-xs font-semibold text-starehe-blue-900 mb-1"
              >
                Pathway
              </label>
              <select
                id="filter-pathway"
                value={pathway}
                onChange={(e) => setPathway(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-starehe-blue-700"
              >
                <option value="ALL">All pathways</option>
                <option value="STEM">STEM</option>
                <option value="SOCIAL_SCIENCE">Social Science</option>
                <option value="ARTS_SPORTS">Arts &amp; Sports</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="filter-status"
                className="block text-xs font-semibold text-starehe-blue-900 mb-1"
              >
                Status
              </label>
              <select
                id="filter-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-starehe-blue-700"
              >
                <option value="ALL">All statuses</option>
                {Object.entries(STATUS_META).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1 flex justify-end">
              <button
                type="button"
                onClick={fetchList}
                title="Refresh list"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 px-3 py-2 text-xs font-semibold text-starehe-blue-900 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span className="lg:sr-only">Refresh</span>
              </button>
            </div>
          </div>
        </section>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl bg-starehe-maroon-50 border border-starehe-maroon-200 px-4 py-3 text-sm text-starehe-maroon-900"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Applications table */}
        <section className="bg-white rounded-xl border border-stone-200 shadow-subtle overflow-hidden">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-stone-500 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-starehe-blue-800" />
              <p className="text-sm">Loading applications…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-3">
              <p className="font-serif text-lg font-bold text-starehe-blue-900">
                No Grade 10 applications match the current view
              </p>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                Submitted applications appear here immediately. You can also submit a test application from the public Grade 10 form.
              </p>
              <div className="pt-1">
                <Link
                  href="/admissions/apply"
                  className="inline-flex items-center gap-2 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 px-4 py-2.5 text-xs font-semibold text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Open Grade 10 Application Form
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/80 text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Pathway &amp; Tracks</th>
                    <th className="py-3 px-4">County / Junior School</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-sm">
                  {items.map((app) => {
                    const st = STATUS_META[app.status] || STATUS_META.PENDING;
                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-stone-50/80 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono text-xs font-semibold text-starehe-blue-900 whitespace-nowrap">
                          {app.applicationNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-starehe-blue-950">
                            {app.fullName}
                          </div>
                          <div className="text-xs text-stone-500 tabular-nums">
                            KJSEA: {app.assessmentNo}
                            {app.centreCode ? ` · Centre ${app.centreCode}` : ""}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${
                              app.category === "SPONSORED"
                                ? "bg-starehe-maroon-50 text-starehe-maroon-900 border border-starehe-maroon-200"
                                : "bg-starehe-blue-50 text-starehe-blue-900 border border-starehe-blue-200"
                            }`}
                          >
                            {app.category === "SPONSORED"
                              ? "Sponsored"
                              : "Self-sponsored"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-900 text-xs">
                            {PATHWAY_LABELS[app.pathwaySelected] ||
                              app.pathwaySelected}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {(app.tracksSelected || []).join(", ")}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-900 text-xs">
                            {app.county}
                            {app.subCounty ? ` (${app.subCounty})` : ""}
                          </div>
                          <div className="text-[11px] text-stone-500 truncate max-w-[200px]">
                            {app.juniorSchoolName}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${st.badge}`}
                          >
                            {st.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-stone-600 tabular-nums whitespace-nowrap">
                          {formatDateShort(app.createdAt)}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <a
                              href={`/api/applications/${app.id}/pdf`}
                              className="inline-flex items-center gap-1 rounded-lg border border-stone-300 hover:bg-stone-100 px-2.5 py-1.5 text-xs font-semibold text-starehe-blue-900 transition-colors"
                              title="Download official 4-page PDF"
                            >
                              <Download className="w-3.5 h-3.5" />
                              PDF
                            </a>
                            <button
                              type="button"
                              onClick={() => openApplication(app.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-starehe-blue-900 hover:bg-starehe-blue-800 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Application Detail & Committee Review Modal */}
      {selectedId !== null && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/60 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Application review details"
        >
          <div className="bg-white w-full max-w-4xl h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="sticky top-0 z-10 bg-starehe-blue-900 text-white px-6 py-4 flex items-center justify-between border-b border-starehe-blue-800">
              <div>
                <p className="text-xs font-mono text-starehe-gold-300">
                  {detail?.applicationNumber || `Application #${selectedId}`}
                </p>
                <h2 className="font-serif text-lg sm:text-xl font-bold">
                  {detail?.fullName || "Loading application…"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {detail && (
                  <a
                    href={`/api/applications/${detail.id}/pdf`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download 4-Page PDF
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(null);
                    setDetail(null);
                  }}
                  className="rounded-lg p-2 text-starehe-blue-100 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {detailLoading || !detail ? (
              <div className="flex-1 py-20 flex flex-col items-center justify-center text-stone-500 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-starehe-blue-800" />
                <p className="text-sm">Loading complete Blue Form record…</p>
              </div>
            ) : (
              <div className="p-6 space-y-8">
                {/* Office Use / Committee Decision Form */}
                <form
                  onSubmit={saveReview}
                  className="rounded-xl border-2 border-starehe-blue-200 bg-starehe-blue-50/50 p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-base font-bold text-starehe-blue-950">
                        For Official Use Only — Admissions Committee Review
                      </h3>
                      <p className="text-xs text-stone-600">
                        Scores and decisions saved here are printed in the Official Use box on Page 1 of the downloaded PDF.
                      </p>
                    </div>
                    {detail.reviewedBy && (
                      <span className="text-xs text-stone-600">
                        Last reviewed by <strong>{detail.reviewedBy}</strong>
                      </span>
                    )}
                  </div>

                  {reviewMessage && (
                    <div
                      role="status"
                      className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-semibold ${
                        reviewMessage.startsWith("Error:")
                          ? "bg-starehe-maroon-50 text-starehe-maroon-900 border border-starehe-maroon-200"
                          : "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{reviewMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label
                        htmlFor="rev-status"
                        className="block text-xs font-semibold text-starehe-blue-900 mb-1"
                      >
                        Application Status
                      </label>
                      <select
                        id="rev-status"
                        value={editStatus}
                        onChange={(e) =>
                          setEditStatus(e.target.value as ApplicationStatus)
                        }
                        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-900"
                      >
                        {Object.entries(STATUS_META).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="rev-arts"
                        className="block text-xs font-semibold text-starehe-blue-900 mb-1"
                      >
                        KNEC Arts &amp; Sports
                      </label>
                      <input
                        id="rev-arts"
                        type="text"
                        value={editArts}
                        onChange={(e) => setEditArts(e.target.value)}
                        placeholder="e.g. Exceeding / 82%"
                        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rev-social"
                        className="block text-xs font-semibold text-starehe-blue-900 mb-1"
                      >
                        KNEC Social Science
                      </label>
                      <input
                        id="rev-social"
                        type="text"
                        value={editSocial}
                        onChange={(e) => setEditSocial(e.target.value)}
                        placeholder="e.g. Exceeding / 85%"
                        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rev-stem"
                        className="block text-xs font-semibold text-starehe-blue-900 mb-1"
                      >
                        KNEC STEM
                      </label>
                      <input
                        id="rev-stem"
                        type="text"
                        value={editStem}
                        onChange={(e) => setEditStem(e.target.value)}
                        placeholder="e.g. Exceeding / 88%"
                        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rev-remarks"
                      className="block text-xs font-semibold text-starehe-blue-900 mb-1"
                    >
                      Committee Remarks / Needs Assessment Notes
                    </label>
                    <textarea
                      id="rev-remarks"
                      rows={2}
                      value={editRemarks}
                      onChange={(e) => setEditRemarks(e.target.value)}
                      placeholder="Record need scale (1–10), home visit verification notes, or admission decision summary…"
                      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    {user.role === "SUPER_ADMIN" ? (
                      <button
                        type="button"
                        onClick={archiveSelected}
                        disabled={archiving}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-starehe-maroon-300 hover:bg-starehe-maroon-50 px-3 py-2 text-xs font-semibold text-starehe-maroon-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {archiving ? "Archiving…" : "Archive application"}
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      type="submit"
                      disabled={savingReview || user.role === "REVIEWER"}
                      className="inline-flex items-center gap-2 rounded-lg bg-starehe-blue-900 hover:bg-starehe-blue-800 disabled:opacity-60 px-4 py-2 text-xs font-semibold text-white transition-colors"
                    >
                      {savingReview && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      )}
                      Save committee decision
                    </button>
                  </div>
                </form>

                {/* Page 1: Student Particulars */}
                <section className="space-y-3">
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 border-b border-stone-200 pb-2">
                    Page 1 — Student Particulars &amp; Part I (Headteacher)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-5 items-start">
                    <div className="w-[120px] h-[140px] rounded-lg border border-stone-300 bg-stone-100 flex items-center justify-center overflow-hidden text-xs text-stone-400 text-center p-2">
                      {detail.passportPhotoDataUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={detail.passportPhotoDataUrl}
                          alt={detail.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "No digital photo attached"
                      )}
                    </div>
                    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 text-xs">
                      <Item label="Full Name" value={detail.fullName} />
                      <Item label="Category" value={detail.category} />
                      <Item label="Admission Year" value={`20${detail.admissionYear.slice(-2)}`} />
                      <Item label="Assessment No." value={detail.assessmentNo} />
                      <Item label="Centre Code" value={detail.centreCode} />
                      <Item label="Date of Birth" value={detail.dateOfBirth} />
                      <Item label="Birth Cert No." value={detail.birthCertNo} />
                      <Item label="County" value={detail.county} />
                      <Item label="Sub-County" value={detail.subCounty} />
                      <Item label="Junior School" value={detail.juniorSchoolName} />
                      <Item label="HOI Contact" value={detail.juniorSchHoiContact} />
                      <Item
                        label="Pathway & Tracks"
                        value={`${PATHWAY_LABELS[detail.pathwaySelected] || detail.pathwaySelected} (${(
                          detail.tracksSelected || []
                        ).join(", ")})`}
                      />
                    </dl>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="rounded-lg border border-stone-200 p-3 bg-stone-50/60">
                      <p className="font-semibold text-starehe-blue-900 mb-1">
                        Headteacher comments on background
                      </p>
                      <p className="text-stone-700 whitespace-pre-line">
                        {detail.headteacherBgComments || "—"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-3 bg-stone-50/60">
                      <p className="font-semibold text-starehe-blue-900 mb-1">
                        Ability, conduct &amp; co-curricular observations
                      </p>
                      <p className="text-stone-700 whitespace-pre-line">
                        {detail.headteacherAbilityObservations || "—"}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-2">
                        HOI: {detail.headteacherName || "—"} &middot; Tel:{" "}
                        {detail.headteacherMobile || "—"} &middot; Date:{" "}
                        {detail.headteacherDate || "—"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Page 2: Family Particulars */}
                <section className="space-y-3">
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 border-b border-stone-200 pb-2">
                    Page 2 — Part II: Parents, Income &amp; Siblings
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    {(["father", "mother"] as const).map((who) => {
                      const p = detail[who];
                      return (
                        <div
                          key={who}
                          className="rounded-lg border border-stone-200 p-3.5 space-y-1.5"
                        >
                          <p className="font-bold uppercase tracking-wider text-starehe-blue-900">
                            {who}
                          </p>
                          <Item label="Full names" value={p?.fullNames} />
                          <Item
                            label="Marital status"
                            value={`${p?.maritalStatus || "—"}${
                              p?.deceasedDate ? ` (Deceased: ${p.deceasedDate})` : ""
                            }`}
                          />
                          <Item label="ID Number" value={p?.idNumber} />
                          <Item label="Employment income" value={p?.employmentIncome} />
                          <Item label="Business income" value={p?.businessIncome} />
                          <Item label="Owned land / crops" value={p?.ownedLandIncome} />
                          <Item label="Other income" value={p?.otherIncome} />
                          <Item label="Physical address" value={p?.physicalAddress} />
                          <Item label="House status / rent" value={p?.houseStatus} />
                        </div>
                      );
                    })}
                  </div>

                  {detail.siblings && detail.siblings.length > 0 && (
                    <div className="rounded-lg border border-stone-200 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                          <tr>
                            <th className="py-2 px-3">Sibling Name</th>
                            <th className="py-2 px-3">M/F</th>
                            <th className="py-2 px-3">Age</th>
                            <th className="py-2 px-3">School / College</th>
                            <th className="py-2 px-3">Occupation &amp; Salary</th>
                            <th className="py-2 px-3">Spouse Occupation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {detail.siblings.map((s, idx) => (
                            <tr key={idx}>
                              <td className="py-2 px-3 font-medium">{s.name || "—"}</td>
                              <td className="py-2 px-3">{s.gender || "—"}</td>
                              <td className="py-2 px-3">{s.age || "—"}</td>
                              <td className="py-2 px-3">{s.schoolOrCollege || "—"}</td>
                              <td className="py-2 px-3">{s.workingOccupationSalary || "—"}</td>
                              <td className="py-2 px-3">{s.marriedSpouseOccupationSalary || "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="text-xs">
                    <span className="font-semibold text-starehe-blue-900">
                      Who has been paying school fees:{" "}
                    </span>
                    <span className="text-stone-700">{detail.whoPaysFees || "—"}</span>
                  </div>
                </section>

                {/* Page 3: Explanation & Parent Certification */}
                <section className="space-y-3">
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 border-b border-stone-200 pb-2">
                    Page 3 — Part III: Statement &amp; Parent Certification
                  </h3>
                  <div className="rounded-lg border border-stone-200 p-4 bg-stone-50/60 text-xs text-stone-800 whitespace-pre-line leading-relaxed">
                    {detail.admissionExplanation || "—"}
                  </div>
                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <Item label="Certifying Parent/Guardian" value={detail.parentCertName} />
                    <Item label="Relationship" value={detail.parentCertRelationship} />
                    <Item label="Occupation" value={detail.parentCertOccupation} />
                    <Item label="Mobile" value={detail.parentCertMobile} />
                    <Item label="Email" value={detail.parentCertEmail} />
                    <Item label="Address" value={detail.parentCertAddress} />
                  </dl>
                </section>

                {/* Page 4: Recommendations */}
                <section className="space-y-3">
                  <h3 className="font-serif text-base font-bold text-starehe-blue-950 border-b border-stone-200 pb-2">
                    Page 4 — Part IV: Chief &amp; Religious Leader Recommendations
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-lg border border-stone-200 p-3.5 space-y-1.5">
                      <p className="font-bold text-starehe-blue-900">
                        Chief / Assistant Chief / Sub-County Officer
                      </p>
                      <p className="text-stone-700 whitespace-pre-line">
                        {detail.chiefComments || "To be completed on printed form"}
                      </p>
                      <p className="text-[11px] text-stone-500 pt-1">
                        {detail.chiefNameTitle || "—"} &middot; Mobile:{" "}
                        {detail.chiefMobile || "—"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-3.5 space-y-1.5">
                      <p className="font-bold text-starehe-blue-900">
                        Priest / Pastor / Imam / Religious Leader
                      </p>
                      <p className="text-stone-700 whitespace-pre-line">
                        {detail.clergyComments || "To be completed on printed form"}
                      </p>
                      <p className="text-[11px] text-stone-500 pt-1">
                        {detail.clergyNameTitle || "—"} &middot; Mobile:{" "}
                        {detail.clergyMobile || "—"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Audit trail */}
                <section className="space-y-2">
                  <h3 className="font-serif text-sm font-bold text-starehe-blue-950 border-b border-stone-200 pb-1.5">
                    Audit History
                  </h3>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {audit.map((a) => (
                      <li
                        key={a.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded bg-stone-50 px-3 py-1.5 border border-stone-200/80"
                      >
                        <span>
                          <strong className="text-stone-900">{a.actor_username}</strong>{" "}
                          &middot; {a.action}{" "}
                          {a.new_status ? `→ ${a.new_status}` : ""}{" "}
                          {a.notes ? `(${a.notes})` : ""}
                        </span>
                        <span className="font-mono text-[11px] text-stone-500">
                          {a.created_at}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Item({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-[11px] text-stone-500">{label}</dt>
      <dd className="font-semibold text-stone-900 break-words">
        {value && String(value).trim() ? value : "—"}
      </dd>
    </div>
  );
}

