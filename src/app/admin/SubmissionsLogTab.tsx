"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Inbox,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import type { FormSubmissionStatus, StoredFormSubmission } from "@/types/application";

interface SubmissionsStats {
  total: number;
  newCount: number;
  inProgress: number;
  resolved: number;
  contactCount: number;
}

const STATUS_BADGE: Record<FormSubmissionStatus, { label: string; cls: string }> = {
  NEW: {
    label: "New",
    cls: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/30",
  },
  IN_PROGRESS: {
    label: "In progress",
    cls: "bg-brand-primaryLight text-brand-primary border-brand-primary/30",
  },
  RESOLVED: {
    label: "Resolved",
    cls: "bg-emerald-50 text-emerald-900 border-emerald-200",
  },
  ARCHIVED: {
    label: "Archived",
    cls: "bg-slate-100 text-slate-700 border-slate-200",
  },
};

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso.includes("T") ? iso : `${iso.replace(" ", "T")}Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SubmissionsLogTab({
  onNewCountChange,
}: {
  onNewCountChange?: (newCount: number) => void;
}) {
  const router = useRouter();
  const [items, setItems] = useState<StoredFormSubmission[]>([]);
  const [stats, setStats] = useState<SubmissionsStats>({
    total: 0,
    newCount: 0,
    inProgress: 0,
    resolved: 0,
    contactCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<number, string>>({});
  const [toast, setToast] = useState("");

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams();
      if (search.trim()) qs.set("search", search.trim());
      if (typeFilter !== "ALL") qs.set("formType", typeFilter);
      if (statusFilter !== "ALL") qs.set("status", statusFilter);

      const res = await fetch(`/api/submissions?${qs.toString()}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.replace("/admin/login?expired=1");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Unable to load form submission logs.");
      }
      setItems(data.items || []);
      if (data.stats) {
        setStats(data.stats);
        onNewCountChange?.(data.stats.newCount || 0);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, statusFilter, router, onNewCountChange]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchSubmissions();
    }, 180);
    return () => clearTimeout(t);
  }, [fetchSubmissions]);

  const handleStatusUpdate = async (
    item: StoredFormSubmission,
    nextStatus: FormSubmissionStatus
  ) => {
    setBusyId(item.id);
    setToast("");
    try {
      const res = await fetch(`/api/submissions/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          adminNotes: noteDrafts[item.id] ?? item.adminNotes,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to update submission status.");
      }
      setToast(`Updated ${item.referenceCode} to ${STATUS_BADGE[nextStatus].label}.`);
      await fetchSubmissions();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const handleArchive = async (item: StoredFormSubmission) => {
    setBusyId(item.id);
    try {
      const res = await fetch(`/api/submissions/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Could not archive submission.");
      }
      setToast(`Archived ${item.referenceCode}.`);
      await fetchSubmissions();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  };

  const exportCsv = () => {
    if (items.length === 0) return;
    const headers = [
      "Reference",
      "Form Type",
      "Category",
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Source Path",
      "Status",
      "Admin Notes",
      "Created At",
    ];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = items.map((s) =>
      [
        s.referenceCode,
        s.formType,
        s.category,
        s.submitterName,
        s.submitterEmail,
        s.submitterPhone,
        s.subject,
        s.message,
        s.sourcePath,
        s.status,
        s.adminNotes,
        s.createdAt,
      ]
        .map(escape)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `starehe-form-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[
          { label: "Total submissions", value: stats.total, sub: "All logged forms" },
          { label: "New / Unread", value: stats.newCount, sub: "Needs attention" },
          { label: "In progress", value: stats.inProgress, sub: "Being handled" },
          { label: "Resolved", value: stats.resolved, sub: "Closed & replied" },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-subtle"
          >
            <p className="text-xs font-medium text-slate-500">{m.label}</p>
            <p className="font-serif text-2xl font-bold text-starehe-blue-950 tabular-nums mt-1">
              {m.value}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">{m.sub}</p>
          </div>
        ))}
      </section>

      {/* Filters & Export */}
      <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-subtle">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          <div className="lg:col-span-5">
            <label
              htmlFor="sub-search"
              className="block text-xs font-semibold text-starehe-blue-950 mb-1"
            >
              Search sender, email, reference code, or message
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="sub-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. SGC-INQ-26 or jane.doe@example.com"
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <label
              htmlFor="sub-type"
              className="block text-xs font-semibold text-starehe-blue-950 mb-1"
            >
              Form type
            </label>
            <select
              id="sub-type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="ALL">All form types</option>
              <option value="CONTACT">Contact Inquiries (/contact)</option>
              <option value="ADMISSIONS_APPLICATION">Admissions Applications</option>
              <option value="GIVING_PLEDGE">Giving &amp; Sponsorship</option>
              <option value="GENERAL_FORM">General Forms</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label
              htmlFor="sub-status"
              className="block text-xs font-semibold text-starehe-blue-950 mb-1"
            >
              Status
            </label>
            <select
              id="sub-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="ALL">All statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          <div className="lg:col-span-2 flex gap-2">
            <button
              type="button"
              onClick={fetchSubmissions}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={items.length === 0}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-50 px-3 py-2 text-xs font-semibold text-white"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs sm:text-sm text-rose-900"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {toast && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Submissions List */}
      <section className="space-y-3">
        {loading && items.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
            <span>Loading logged submissions...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">
              No form submissions match these filters yet.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              All contact messages and submitted website forms are automatically recorded here.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const badge = STATUS_BADGE[item.status] || STATUS_BADGE.NEW;
            const currentNotes = noteDrafts[item.id] ?? item.adminNotes ?? "";

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-primary">
                        {item.referenceCode}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.cls}`}
                      >
                        {badge.label}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {item.formType.replace("_", " ")} &bull; {item.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-starehe-blue-950 mt-1.5">
                      {item.submitterName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                      {item.submitterEmail && (
                        <a
                          href={`mailto:${item.submitterEmail}`}
                          className="inline-flex items-center gap-1 hover:text-brand-primary"
                        >
                          <Mail className="w-3.5 h-3.5 text-brand-secondary" />
                          <span>{item.submitterEmail}</span>
                        </a>
                      )}
                      {item.submitterPhone && (
                        <a
                          href={`tel:${item.submitterPhone}`}
                          className="inline-flex items-center gap-1 hover:text-brand-primary"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-primary" />
                          <span>{item.submitterPhone}</span>
                        </a>
                      )}
                      <span className="text-slate-400">
                        Source: <code className="text-[11px]">{item.sourcePath}</code>
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-500">
                    <div>{formatDateTime(item.createdAt)}</div>
                    {item.handledBy && (
                      <div className="text-slate-400 mt-0.5">
                        Handled by: <strong>{item.handledBy}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed border border-slate-100">
                  {item.message}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  <input
                    type="text"
                    value={currentNotes}
                    onChange={(e) =>
                      setNoteDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    placeholder="Add internal follow-up remark..."
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => handleStatusUpdate(item, "IN_PROGRESS")}
                      className="px-3 py-1.5 rounded-lg border border-brand-primary text-brand-primary hover:bg-brand-primaryLight text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      Mark In Progress
                    </button>
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => handleStatusUpdate(item, "RESOLVED")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      Mark Resolved
                    </button>
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => handleArchive(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-600 text-xs font-semibold transition-colors disabled:opacity-50"
                      title="Archive log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
