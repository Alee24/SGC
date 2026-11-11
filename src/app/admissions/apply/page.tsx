"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Plus,
  Printer,
  Trash2,
} from "lucide-react";
import { SelectField, TextArea, TextField } from "@/components/forms/FormFields";
import { KENYA_COUNTIES } from "@/data/counties";
import {
  emptyParent,
  emptySibling,
  FieldErrors,
  TRACKS_BY_PATHWAY,
  validateApplication,
} from "@/lib/applicationValidation";
import type {
  ParentParticulars,
  SeniorPathway,
  SeniorSchoolApplicationData,
  SiblingRecord,
  TrackChoice,
} from "@/types/application";

const DRAFT_KEY = "starehe_g10_application_draft_v1";

const STEPS = [
  { n: 1, short: "Student", title: "Student details & Part I", sub: "Particulars, pathway choice and headteacher's recommendation" },
  { n: 2, short: "Family", title: "Part II: Background information", sub: "Parents' particulars, income and brothers & sisters" },
  { n: 3, short: "Explanation", title: "Part III: Why admission is required", sub: "Parent or guardian statement and certification" },
  { n: 4, short: "Recommendations", title: "Part IV: Recommendations", sub: "Chief and religious leader (sponsored category only)" },
  { n: 5, short: "Review", title: "Review & submit", sub: "Confirm everything is correct before you submit" },
];

const PATHWAYS: { id: SeniorPathway; title: string; note: string }[] = [
  { id: "STEM", title: "Science, Technology, Engineering & Mathematics", note: "Pure Science or Applied Science" },
  { id: "SOCIAL_SCIENCE", title: "Social Science", note: "Languages or Humanities & Business Studies" },
  { id: "ARTS_SPORTS", title: "Arts and Sports Science", note: "Arts or Sports Science" },
];

const TRACK_NOTES: Record<TrackChoice, string> = {
  "Pure Science": "Mathematics, Biology, Physics, Chemistry",
  "Applied Science": "Home Science, Computer Science, Agriculture",
  Languages: "Literature in English, Fasihi, French, German",
  "Humanities & Business Studies": "History, Geography, CRE/IRE, Business Studies",
  Arts: "Music and Dance, Fine Art, Theatre and Film",
  "Sports Science": "Physical Education, Sports and recreation",
};

const PARENT_ROWS: { key: keyof ParentParticulars; label: string; hint: string; multiline?: boolean; type?: string }[] = [
  { key: "fullNames", label: "Full names", hint: "" },
  { key: "maritalStatus", label: "Marital status", hint: "Married / Divorced / Separated / Single parent / Widowed / Deceased" },
  { key: "deceasedDate", label: "Date of death (if deceased)", hint: "Attach a copy of the death certificate", type: "date" },
  { key: "idNumber", label: "National ID number", hint: "Attach a copy of the ID" },
  { key: "employmentIncome", label: "Employment & average monthly income", hint: "Describe the job; attach a pay slip", multiline: true },
  { key: "businessIncome", label: "Business & average monthly income", hint: "Type of business and what it earns per month", multiline: true },
  { key: "ownedLandIncome", label: "Owned land, crops & income", hint: "Number of acres, crops grown and income from them", multiline: true },
  { key: "otherIncome", label: "Other income (incl. casual labour)", hint: "Describe and show the average monthly income", multiline: true },
  { key: "physicalAddress", label: "Physical address of residence", hint: "Town, estate and nearest landmark (school, church, hospital)", multiline: true },
  { key: "houseStatus", label: "House owned, employer-owned or rented", hint: "If rented, state the monthly rent" },
];

const nextYear = String(new Date().getFullYear() + 1);

function initialData(): SeniorSchoolApplicationData {
  return {
    admissionYear: nextYear,
    category: "SPONSORED",
    fullName: "",
    assessmentNo: "",
    centreCode: "",
    pathwaySelected: "",
    tracksSelected: [],
    dateOfBirth: "",
    birthCertNo: "",
    juniorSchoolName: "",
    juniorSchHoiContact: "",
    county: "",
    subCounty: "",
    passportPhotoDataUrl: "",
    headteacherBgComments: "",
    headteacherAbilityObservations: "",
    headteacherName: "",
    headteacherMobile: "",
    headteacherDate: "",
    father: emptyParent(),
    mother: emptyParent(),
    siblings: [emptySibling()],
    whoPaysFees: "",
    admissionExplanation: "",
    parentCertName: "",
    parentCertOccupation: "",
    parentCertAddress: "",
    parentCertMobile: "",
    parentCertEmail: "",
    parentCertDate: new Date().toISOString().slice(0, 10),
    parentCertRelationship: "",
    chiefComments: "",
    chiefNameTitle: "",
    chiefMobile: "",
    chiefOfficeTel: "",
    chiefDate: "",
    clergyComments: "",
    clergyNameTitle: "",
    clergyMobile: "",
    clergyOfficeTel: "",
    clergyDate: "",
  };
}

/** Downscale a photo in the browser so uploads stay small and fast. */
function resizeImage(file: File, maxSide = 700): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode"));
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

async function downloadBlob(res: Response, fallbackName: string) {
  const blob = await res.blob();
  const cd = res.headers.get("Content-Disposition") || "";
  const name = /filename="([^"]+)"/.exec(cd)?.[1] || fallbackName;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

interface SubmitResult {
  id: number;
  applicationNumber: string;
  downloadToken: string;
}

export default function ApplyPage() {
  const [data, setData] = useState<SeniorSchoolApplicationData>(initialData);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [declared, setDeclared] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setData({ ...initialData(), ...saved.data });
        if (saved.step) setStep(Math.min(5, Number(saved.step)));
        setDraftRestored(true);
      }
    } catch {
      /* ignore corrupt draft */
    }
    hydrated.current = true;
  }, []);

  // Autosave draft
  useEffect(() => {
    if (!hydrated.current || result) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step }));
      } catch {
        // Storage full (large photo) – save without the photo
        try {
          localStorage.setItem(DRAFT_KEY, JSON.stringify({ data: { ...data, passportPhotoDataUrl: "" }, step }));
        } catch {
          /* ignore */
        }
      }
    }, 400);
    return () => clearTimeout(t);
  }, [data, step, result]);

  const set = useCallback(<K extends keyof SeniorSchoolApplicationData>(key: K, value: SeniorSchoolApplicationData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const n = { ...e };
      delete n[key as string];
      return n;
    });
  }, []);

  const setParent = (who: "father" | "mother", key: keyof ParentParticulars, value: string) => {
    setData((d) => ({ ...d, [who]: { ...d[who], [key]: value } }));
    setErrors((e) => {
      const k = `${who}.${key}`;
      if (!e[k] && !e["father.fullNames"]) return e;
      const n = { ...e };
      delete n[k];
      if (key === "fullNames") delete n["father.fullNames"];
      return n;
    });
  };

  const setSibling = (i: number, key: keyof SiblingRecord, value: string) => {
    setData((d) => ({
      ...d,
      siblings: d.siblings.map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
    }));
  };

  const isSelf = data.category === "SELF_SPONSORED";
  const visibleSteps = useMemo(() => STEPS.filter((s) => !(isSelf && s.n === 4)), [isSelf]);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goNext = () => {
    const errs = validateApplication(data, step);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setBanner(`Please fix ${Object.keys(errs).length} highlighted field${Object.keys(errs).length > 1 ? "s" : ""} before continuing.`);
      setTimeout(() => {
        const first = document.querySelector('[aria-invalid="true"]') as HTMLElement | null;
        first?.focus();
      }, 50);
      return;
    }
    setBanner("");
    let next = step + 1;
    if (isSelf && next === 4) next = 5;
    setStep(Math.min(5, next));
    scrollTop();
  };

  const goBack = () => {
    setBanner("");
    let prev = step - 1;
    if (isSelf && prev === 4) prev = 3;
    setStep(Math.max(1, prev));
    scrollTop();
  };

  const onPhoto = async (file?: File) => {
    if (!file) return;
    if (!/^image\/(jpe?g|png)$/i.test(file.type)) {
      setErrors((e) => ({ ...e, passportPhotoDataUrl: "Passport photo must be a JPG or PNG image." }));
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErrors((e) => ({ ...e, passportPhotoDataUrl: "This photo is larger than 8MB. Please choose a smaller image." }));
      return;
    }
    try {
      set("passportPhotoDataUrl", await resizeImage(file));
    } catch {
      setErrors((e) => ({ ...e, passportPhotoDataUrl: "We could not read this image. Try another JPG or PNG photo." }));
    }
  };

  const downloadBlank = async () => {
    window.location.href = "/api/applications/form-pdf";
  };

  const downloadDraftPdf = async () => {
    setPdfBusy(true);
    try {
      const res = await fetch("/api/applications/form-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "The PDF could not be generated. Please try again.");
      }
      await downloadBlob(res, "Starehe-Grade10-Application.pdf");
    } catch (err) {
      setBanner((err as Error).message);
    } finally {
      setPdfBusy(false);
    }
  };

  const downloadSubmittedPdf = async () => {
    if (!result) return;
    setPdfBusy(true);
    try {
      const res = await fetch(`/api/applications/${encodeURIComponent(result.applicationNumber)}/pdf?token=${result.downloadToken}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "The PDF could not be downloaded. Please try again.");
      }
      await downloadBlob(res, `Starehe-Grade10-${result.applicationNumber}.pdf`);
    } catch (err) {
      setBanner((err as Error).message);
    } finally {
      setPdfBusy(false);
    }
  };

  const submit = async () => {
    const errs = validateApplication(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstStep = Object.keys(errs).some((k) => ["fullName", "assessmentNo", "dateOfBirth", "juniorSchoolName", "county", "pathwaySelected", "tracksSelected", "passportPhotoDataUrl", "headteacherMobile"].includes(k))
        ? 1
        : Object.keys(errs).some((k) => k.startsWith("father") || k.startsWith("mother"))
          ? 2
          : Object.keys(errs).some((k) => k.startsWith("parentCert") || k === "admissionExplanation")
            ? 3
            : 4;
      setStep(firstStep);
      setBanner("Some details still need attention. We've taken you to the first section with a problem.");
      scrollTop();
      return;
    }
    if (!declared) {
      setBanner("Please confirm the declaration before submitting.");
      return;
    }
    setSubmitting(true);
    setBanner("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (j.fieldErrors) setErrors(j.fieldErrors);
        throw new Error(j.error || "Your application could not be submitted. Please try again.");
      }
      setResult(j as SubmitResult);
      localStorage.removeItem(DRAFT_KEY);
      scrollTop();
    } catch (err) {
      const msg = (err as Error).message;
      setBanner(
        msg === "Failed to fetch"
          ? "You appear to be offline. Your answers are saved on this device — reconnect and press Submit again."
          : msg
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    localStorage.removeItem(DRAFT_KEY);
    setData(initialData());
    setStep(1);
    setErrors({});
    setDeclared(false);
    setDraftRestored(false);
    setResult(null);
  };

  const current = STEPS.find((s) => s.n === step)!;
  const stepIndex = visibleSteps.findIndex((s) => s.n === step);

  return (
    <div className="bg-starehe-cream min-h-screen">
      {/* Header */}
      <section className="bg-starehe-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-starehe-blue-200 mb-4">
            <Link href="/admissions" className="hover:text-white">Admissions</Link>
            <span className="mx-2">/</span>
            <Link href="/admissions/senior-school" className="hover:text-white">Senior School</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Apply</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Application for admission into Grade 10
              </h1>
              <p className="mt-3 text-starehe-blue-100 text-sm sm:text-base leading-relaxed">
                Fill in the official Senior School form online. When you finish, download the completed 4-page form,
                take it to the headteacher, chief and religious leader for signatures and stamps, then return the
                physical copy with the supporting documents by <strong className="text-white">31st July</strong>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={downloadBlank}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
              >
                <Printer className="w-4 h-4" />
                Blank form (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      <div ref={topRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 scroll-mt-24">
        {result ? (
          <SuccessPanel
            result={result}
            name={data.fullName}
            isSelf={isSelf}
            busy={pdfBusy}
            onDownload={downloadSubmittedPdf}
            onNew={resetForm}
            banner={banner}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            {/* Stepper */}
            <aside className="lg:sticky lg:top-28 self-start">
              <ol className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0" aria-label="Application steps">
                {visibleSteps.map((s, i) => {
                  const done = i < stepIndex;
                  const active = s.n === step;
                  return (
                    <li key={s.n} className="flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => (done ? (setStep(s.n), scrollTop()) : undefined)}
                        disabled={!done && !active}
                        aria-current={active ? "step" : undefined}
                        className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          active
                            ? "bg-white shadow-subtle border border-stone-200 text-starehe-blue-900 font-semibold"
                            : done
                              ? "text-starehe-blue-800 hover:bg-white/70"
                              : "text-stone-400 cursor-not-allowed"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            active
                              ? "bg-starehe-maroon-800 text-white"
                              : done
                                ? "bg-starehe-blue-100 text-starehe-blue-800"
                                : "bg-stone-200 text-stone-500"
                          }`}
                        >
                          {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </span>
                        <span className="whitespace-nowrap">{s.short}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div className="hidden lg:block mt-6 rounded-lg border border-stone-200 bg-white p-4 text-xs text-stone-600 leading-relaxed">
                <p className="font-semibold text-starehe-blue-900 mb-1">Your progress is saved</p>
                Answers are kept on this device as you type, so you can close the page and come back later.
              </div>
            </aside>

            {/* Form card */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-subtle">
              <header className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-stone-100">
                <p className="text-xs font-semibold text-starehe-maroon-800">
                  Step {stepIndex + 1} of {visibleSteps.length}
                </p>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-starehe-blue-900 mt-1">{current.title}</h2>
                <p className="text-sm text-stone-500 mt-1">{current.sub}</p>
              </header>

              <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
                {draftRestored && step === 1 && (
                  <div className="flex items-start justify-between gap-4 rounded-lg bg-starehe-blue-50 border border-starehe-blue-100 px-4 py-3 text-sm text-starehe-blue-900">
                    <span>We restored the answers you saved earlier on this device.</span>
                    <button type="button" onClick={resetForm} className="text-xs font-semibold underline underline-offset-2 hover:text-starehe-maroon-800 flex-shrink-0">
                      Start afresh
                    </button>
                  </div>
                )}

                {banner && (
                  <div role="alert" className="flex items-start gap-3 rounded-lg bg-starehe-maroon-50 border border-starehe-maroon-200 px-4 py-3 text-sm text-starehe-maroon-900">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{banner}</span>
                  </div>
                )}

                {step === 1 && (
                  <StepStudent data={data} errors={errors} set={set} onPhoto={onPhoto} />
                )}
                {step === 2 && (
                  <StepFamily data={data} errors={errors} set={set} setParent={setParent} setSibling={setSibling} setData={setData} />
                )}
                {step === 3 && <StepExplanation data={data} errors={errors} set={set} />}
                {step === 4 && <StepRecommendations data={data} errors={errors} set={set} />}
                {step === 5 && (
                  <StepReview data={data} declared={declared} setDeclared={setDeclared} goTo={(n) => { setStep(n); scrollTop(); }} />
                )}
              </div>

              <footer className="px-5 sm:px-8 py-5 border-t border-stone-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex gap-3">
                  {step > 1 && (
                    <button type="button" onClick={goBack} className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-starehe-blue-900 hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-starehe-blue-700 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={downloadDraftPdf}
                    disabled={pdfBusy}
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-starehe-blue-800 hover:bg-starehe-blue-50 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-starehe-blue-700 transition-colors"
                  >
                    {pdfBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    Preview PDF
                  </button>
                </div>
                {step < 5 ? (
                  <button type="button" onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 px-5 py-2.5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-starehe-maroon-700 transition-colors">
                    Save & continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-starehe-maroon-700 transition-colors"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                )}
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── Step components ───────────────────────── */

type SetFn = <K extends keyof SeniorSchoolApplicationData>(key: K, value: SeniorSchoolApplicationData[K]) => void;

function SectionTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-bold text-starehe-blue-900">{children}</h3>
      {note && <p className="text-xs text-stone-500 mt-0.5">{note}</p>}
    </div>
  );
}

function StepStudent({
  data,
  errors,
  set,
  onPhoto,
}: {
  data: SeniorSchoolApplicationData;
  errors: FieldErrors;
  set: SetFn;
  onPhoto: (f?: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const togglePathway = (p: SeniorPathway) => {
    set("pathwaySelected", p);
    set("tracksSelected", data.tracksSelected.filter((t) => TRACKS_BY_PATHWAY[p].includes(t)));
  };
  const toggleTrack = (t: TrackChoice) => {
    set(
      "tracksSelected",
      data.tracksSelected.includes(t) ? data.tracksSelected.filter((x) => x !== t) : [...data.tracksSelected, t]
    );
  };

  return (
    <>
      <section>
        <SectionTitle note="Self-sponsored applicants should contact the school before submitting.">Category</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Category">
          {[
            { v: "SPONSORED", t: "Sponsored student", d: "Family cannot raise secondary school fees" },
            { v: "SELF_SPONSORED", t: "Self-sponsored student", d: "Family will pay the school fees" },
          ].map((o) => (
            <label
              key={o.v}
              className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                data.category === o.v ? "border-starehe-blue-700 bg-starehe-blue-50/60" : "border-stone-300 hover:border-stone-400"
              }`}
            >
              <input
                type="radio"
                name="category"
                value={o.v}
                checked={data.category === o.v}
                onChange={() => set("category", o.v as SeniorSchoolApplicationData["category"])}
                className="mt-1 w-4 h-4 accent-starehe-blue-800"
              />
              <span>
                <span className="block text-sm font-semibold text-starehe-blue-900">{o.t}</span>
                <span className="block text-xs text-stone-500 mt-0.5">{o.d}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Student particulars</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
          <div>
            <span className="block text-[13px] font-semibold text-starehe-blue-900 mb-1.5">Passport photo</span>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={`relative w-[130px] h-[150px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-starehe-blue-700 transition-colors ${
                errors.passportPhotoDataUrl ? "border-starehe-maroon-500" : "border-stone-300 hover:border-starehe-blue-700"
              }`}
              aria-label={data.passportPhotoDataUrl ? "Change passport photo" : "Upload passport photo"}
            >
              {data.passportPhotoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.passportPhotoDataUrl} alt="Passport photo preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-6 h-6 text-stone-400" />
                  <span className="mt-2 text-xs text-stone-500 px-2">Upload a clear photo</span>
                </>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
            {errors.passportPhotoDataUrl ? (
              <p role="alert" className="mt-1.5 text-xs text-starehe-maroon-700 max-w-[150px]">{errors.passportPhotoDataUrl}</p>
            ) : (
              <p className="mt-1.5 text-xs text-stone-500 max-w-[150px]">Optional online. Not older than 3 months; affix a physical copy too.</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField id="fullName" label="Full name" required value={data.fullName} onValue={(v) => set("fullName", v)} error={errors.fullName} autoComplete="name" wrapperClassName="sm:col-span-2" />
            <TextField id="assessmentNo" label="Assessment No." required value={data.assessmentNo} onValue={(v) => set("assessmentNo", v)} error={errors.assessmentNo} hint="KJSEA assessment number" />
            <TextField id="centreCode" label="Centre code" value={data.centreCode} onValue={(v) => set("centreCode", v)} />
            <TextField id="dateOfBirth" label="Date of birth" type="date" required value={data.dateOfBirth} onValue={(v) => set("dateOfBirth", v)} error={errors.dateOfBirth} />
            <TextField id="birthCertNo" label="Birth certificate No." value={data.birthCertNo} onValue={(v) => set("birthCertNo", v)} />
            <TextField id="juniorSchoolName" label="Junior school name" required value={data.juniorSchoolName} onValue={(v) => set("juniorSchoolName", v)} error={errors.juniorSchoolName} wrapperClassName="sm:col-span-2" />
            <TextField id="juniorSchHoiContact" label="Junior school HOI contact" value={data.juniorSchHoiContact} onValue={(v) => set("juniorSchHoiContact", v)} hint="Head of institution's phone number" inputMode="tel" wrapperClassName="sm:col-span-2" />
            <SelectField id="county" label="County" required value={data.county} onValue={(v) => set("county", v)} options={KENYA_COUNTIES} placeholder="Select county" error={errors.county} />
            <TextField id="subCounty" label="Sub-county" value={data.subCounty} onValue={(v) => set("subCounty", v)} />
            <TextField id="admissionYear" label="Admission year" value={data.admissionYear} onValue={(v) => set("admissionYear", v.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" hint="Year the girl joins Grade 10" />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle note="Core subjects for all: English, Kiswahili, Mathematics & Community Service Learning.">Pathway & tracks</SectionTitle>
        <div className="grid md:grid-cols-3 gap-3" role="radiogroup" aria-label="Pathway">
          {PATHWAYS.map((p) => {
            const active = data.pathwaySelected === p.id;
            return (
              <div key={p.id} className={`rounded-lg border p-4 transition-colors ${active ? "border-starehe-blue-700 bg-starehe-blue-50/60" : errors.pathwaySelected ? "border-starehe-maroon-400" : "border-stone-300"}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="pathway" checked={active} onChange={() => togglePathway(p.id)} className="mt-1 w-4 h-4 accent-starehe-blue-800" aria-invalid={Boolean(errors.pathwaySelected)} />
                  <span>
                    <span className="block text-sm font-semibold text-starehe-blue-900 leading-snug">{p.title}</span>
                    <span className="block text-xs text-stone-500 mt-0.5">{p.note}</span>
                  </span>
                </label>
                {active && (
                  <div className="mt-3 pl-7 space-y-2">
                    {TRACKS_BY_PATHWAY[p.id].map((t) => (
                      <label key={t} className="flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" checked={data.tracksSelected.includes(t)} onChange={() => toggleTrack(t)} className="mt-0.5 w-4 h-4 accent-starehe-maroon-800" />
                        <span>
                          <span className="block text-sm text-stone-800 font-medium">{t}</span>
                          <span className="block text-[11px] text-stone-500">{TRACK_NOTES[t]}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {(errors.pathwaySelected || errors.tracksSelected) && (
          <p role="alert" className="mt-2 text-xs text-starehe-maroon-700">{errors.pathwaySelected || errors.tracksSelected}</p>
        )}
      </section>

      <section>
        <SectionTitle note="To be completed by the junior secondary school headteacher. You can leave these blank and let the headteacher write on the printed form.">
          Part I: Headteacher&apos;s recommendation
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextArea id="headteacherBgComments" label="Comments on the pupil's background" rows={3} maxLength={600} value={data.headteacherBgComments} onValue={(v) => set("headteacherBgComments", v)} wrapperClassName="sm:col-span-2" />
          <TextArea id="headteacherAbilityObservations" label="Ability, effort, co-curricular involvement, conduct & discipline" rows={3} maxLength={600} value={data.headteacherAbilityObservations} onValue={(v) => set("headteacherAbilityObservations", v)} wrapperClassName="sm:col-span-2" />
          <TextField id="headteacherName" label="Headteacher's name" value={data.headteacherName} onValue={(v) => set("headteacherName", v)} />
          <TextField id="headteacherMobile" label="Headteacher's mobile" inputMode="tel" value={data.headteacherMobile} onValue={(v) => set("headteacherMobile", v)} error={errors.headteacherMobile} />
          <TextField id="headteacherDate" label="Date" type="date" value={data.headteacherDate} onValue={(v) => set("headteacherDate", v)} />
        </div>
      </section>
    </>
  );
}

function StepFamily({
  data,
  errors,
  set,
  setParent,
  setSibling,
  setData,
}: {
  data: SeniorSchoolApplicationData;
  errors: FieldErrors;
  set: SetFn;
  setParent: (w: "father" | "mother", k: keyof ParentParticulars, v: string) => void;
  setSibling: (i: number, k: keyof SiblingRecord, v: string) => void;
  setData: React.Dispatch<React.SetStateAction<SeniorSchoolApplicationData>>;
}) {
  return (
    <>
      <div className="rounded-lg bg-starehe-gold-50 border border-starehe-gold-200 px-4 py-3 text-sm text-starehe-gold-900">
        If this part is not fully and properly filled, the application will not be successful. Write &ldquo;None&rdquo; where a
        source of income does not apply.
      </div>

      {errors["father.fullNames"] && (
        <p role="alert" className="text-sm text-starehe-maroon-700">{errors["father.fullNames"]}</p>
      )}

      <section className="grid lg:grid-cols-2 gap-6">
        {(["father", "mother"] as const).map((who) => (
          <fieldset key={who} className="rounded-lg border border-stone-200 p-4 sm:p-5">
            <legend className="px-2 text-sm font-bold text-starehe-blue-900 capitalize">{who}</legend>
            <div className="space-y-4">
              {PARENT_ROWS.map((r) =>
                r.multiline ? (
                  <TextArea key={r.key} id={`${who}-${r.key}`} label={r.label} hint={r.hint} rows={2} value={data[who][r.key] || ""} onValue={(v) => setParent(who, r.key, v)} error={errors[`${who}.${r.key}`]} />
                ) : (
                  <TextField key={r.key} id={`${who}-${r.key}`} label={r.label} hint={r.hint || undefined} type={r.type || "text"} value={data[who][r.key] || ""} onValue={(v) => setParent(who, r.key, v)} error={errors[`${who}.${r.key}`] || (who === "father" && r.key === "fullNames" ? errors["father.fullNames"] : undefined)} />
                )
              )}
            </div>
          </fieldset>
        ))}
      </section>

      <section>
        <SectionTitle note="Start with the eldest. The printed form has room for seven; extras are listed below the table.">
          Brothers & sisters of the applicant
        </SectionTitle>
        <div className="space-y-3">
          {data.siblings.map((s, i) => (
            <div key={i} className="rounded-lg border border-stone-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-500">Sibling {i + 1}</span>
                <button
                  type="button"
                  onClick={() => setData((d) => ({ ...d, siblings: d.siblings.filter((_, idx) => idx !== i) }))}
                  className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-starehe-maroon-700 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-starehe-maroon-700"
                  aria-label={`Remove sibling ${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                <TextField id={`sib-${i}-name`} label="Name" value={s.name} onValue={(v) => setSibling(i, "name", v)} wrapperClassName="col-span-2 sm:col-span-4" />
                <SelectField id={`sib-${i}-gender`} label="M/F" value={s.gender} onValue={(v) => setSibling(i, "gender", v)} options={[{ value: "M", label: "M" }, { value: "F", label: "F" }]} placeholder="–" />
                <TextField id={`sib-${i}-age`} label="Age" inputMode="numeric" value={s.age} onValue={(v) => setSibling(i, "age", v.replace(/\D/g, "").slice(0, 2))} />
                <TextField id={`sib-${i}-school`} label="School/college & class" value={s.schoolOrCollege} onValue={(v) => setSibling(i, "schoolOrCollege", v)} wrapperClassName="col-span-2" />
                <TextField id={`sib-${i}-work`} label="If working: occupation & salary" value={s.workingOccupationSalary} onValue={(v) => setSibling(i, "workingOccupationSalary", v)} wrapperClassName="col-span-2" />
                <TextField id={`sib-${i}-married`} label="If married: spouse occupation & salary" value={s.marriedSpouseOccupationSalary} onValue={(v) => setSibling(i, "marriedSpouseOccupationSalary", v)} wrapperClassName="col-span-2" />
              </div>
            </div>
          ))}
          {data.siblings.length < 12 && (
            <button
              type="button"
              onClick={() => setData((d) => ({ ...d, siblings: [...d.siblings, emptySibling()] }))}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-stone-400 px-4 py-2.5 text-sm font-semibold text-starehe-blue-800 hover:border-starehe-blue-700 hover:bg-starehe-blue-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-starehe-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add brother or sister
            </button>
          )}
        </div>
        <TextArea id="whoPaysFees" label="If any siblings are in school/college, state who pays their fees" rows={2} maxLength={300} value={data.whoPaysFees} onValue={(v) => set("whoPaysFees", v)} wrapperClassName="mt-5" />
      </section>
    </>
  );
}

function StepExplanation({ data, errors, set }: { data: SeniorSchoolApplicationData; errors: FieldErrors; set: SetFn }) {
  return (
    <>
      <div className="rounded-lg bg-starehe-gold-50 border border-starehe-gold-200 px-4 py-3 text-sm text-starehe-gold-900 leading-relaxed">
        This part must be completed by the <strong>parent</strong>, or by the <strong>legal guardian</strong> where parents are
        deceased (attach proof of guardianship).
      </div>
      <TextArea
        id="admissionExplanation"
        label={data.category === "SELF_SPONSORED" ? "Why is Starehe Girls' Centre preferred over other schools?" : "Why is the family unable to raise fees for an ordinary senior secondary school?"}
        hint="Give a full and detailed explanation. This is one of the most important parts of the application."
        required
        rows={10}
        maxLength={3000}
        value={data.admissionExplanation}
        onValue={(v) => set("admissionExplanation", v)}
        error={errors.admissionExplanation}
      />
      <section>
        <SectionTitle note="I certify that the information on pages 2 and 3 is true and complete.">Parent / guardian certification</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField id="parentCertName" label="Name" required value={data.parentCertName} onValue={(v) => set("parentCertName", v)} error={errors.parentCertName} autoComplete="name" />
          <TextField id="parentCertRelationship" label="Relationship to the girl" required value={data.parentCertRelationship} onValue={(v) => set("parentCertRelationship", v)} error={errors.parentCertRelationship} hint="Father, Mother, Grandmother, Uncle, Aunt or Guardian (explain)" list="relationships" />
          <datalist id="relationships">
            {["Father", "Mother", "Grandfather", "Grandmother", "Uncle", "Aunt", "Legal guardian"].map((r) => <option key={r} value={r} />)}
          </datalist>
          <TextField id="parentCertOccupation" label="Occupation" value={data.parentCertOccupation} onValue={(v) => set("parentCertOccupation", v)} />
          <TextField id="parentCertAddress" label="Address" value={data.parentCertAddress} onValue={(v) => set("parentCertAddress", v)} hint="Postal or physical address" />
          <TextField id="parentCertMobile" label="Mobile number" required inputMode="tel" autoComplete="tel" value={data.parentCertMobile} onValue={(v) => set("parentCertMobile", v)} error={errors.parentCertMobile} />
          <TextField id="parentCertEmail" label="Email address" type="email" autoComplete="email" value={data.parentCertEmail} onValue={(v) => set("parentCertEmail", v)} error={errors.parentCertEmail} />
          <TextField id="parentCertDate" label="Date" type="date" value={data.parentCertDate} onValue={(v) => set("parentCertDate", v)} />
        </div>
        <p className="mt-3 text-xs text-stone-500">Sign the printed form by hand after downloading it.</p>
      </section>
    </>
  );
}

function StepRecommendations({ data, errors, set }: { data: SeniorSchoolApplicationData; errors: FieldErrors; set: SetFn }) {
  const block = (prefix: "chief" | "clergy", title: string) => (
    <section className="rounded-lg border border-stone-200 p-4 sm:p-5">
      <SectionTitle note="I have read the information given in this form. Based on my knowledge and/or inquiries about the applicant, I make the following comments.">
        {title}
      </SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextArea id={`${prefix}Comments`} label="Comments" rows={3} maxLength={600} value={data[`${prefix}Comments`]} onValue={(v) => set(`${prefix}Comments`, v)} wrapperClassName="sm:col-span-2" />
        <TextField id={`${prefix}NameTitle`} label="Full name and title" value={data[`${prefix}NameTitle`]} onValue={(v) => set(`${prefix}NameTitle`, v)} wrapperClassName="sm:col-span-2" />
        <TextField id={`${prefix}Mobile`} label="Mobile number" inputMode="tel" value={data[`${prefix}Mobile`]} onValue={(v) => set(`${prefix}Mobile`, v)} error={errors[`${prefix}Mobile`]} />
        <TextField id={`${prefix}OfficeTel`} label="Office tel." inputMode="tel" value={data[`${prefix}OfficeTel`]} onValue={(v) => set(`${prefix}OfficeTel`, v)} />
        <TextField id={`${prefix}Date`} label="Date" type="date" value={data[`${prefix}Date`]} onValue={(v) => set(`${prefix}Date`, v)} />
      </div>
    </section>
  );
  return (
    <>
      <div className="rounded-lg bg-starehe-blue-50 border border-starehe-blue-100 px-4 py-3 text-sm text-starehe-blue-900 leading-relaxed">
        These sections are usually written by the chief and religious leader on the printed form, with their signature and
        stamp. Fill in what you already have; anything left blank stays empty on the PDF for them to complete.
      </div>
      {block("chief", "Recommendation by Chief")}
      {block("clergy", "Recommendation by Priest, Pastor or Imam")}
    </>
  );
}

function StepReview({
  data,
  declared,
  setDeclared,
  goTo,
}: {
  data: SeniorSchoolApplicationData;
  declared: boolean;
  setDeclared: (v: boolean) => void;
  goTo: (n: number) => void;
}) {
  const pathway = PATHWAYS.find((p) => p.id === data.pathwaySelected)?.title || "—";
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Category", value: data.category === "SPONSORED" ? "Sponsored student" : "Self-sponsored student", step: 1 },
    { label: "Full name", value: data.fullName, step: 1 },
    { label: "Assessment No.", value: data.assessmentNo, step: 1 },
    { label: "Date of birth", value: data.dateOfBirth, step: 1 },
    { label: "Junior school", value: data.juniorSchoolName, step: 1 },
    { label: "County", value: [data.county, data.subCounty].filter(Boolean).join(", "), step: 1 },
    { label: "Pathway", value: `${pathway}${data.tracksSelected.length ? ` — ${data.tracksSelected.join(", ")}` : ""}`, step: 1 },
    { label: "Father", value: data.father.fullNames || "Not provided", step: 2 },
    { label: "Mother", value: data.mother.fullNames || "Not provided", step: 2 },
    { label: "Siblings listed", value: String(data.siblings.filter((s) => s.name).length), step: 2 },
    { label: "Explanation", value: `${data.admissionExplanation.slice(0, 160)}${data.admissionExplanation.length > 160 ? "…" : ""}`, step: 3 },
    { label: "Completed by", value: `${data.parentCertName} (${data.parentCertRelationship}) · ${data.parentCertMobile}`, step: 3 },
  ];
  return (
    <>
      <dl className="divide-y divide-stone-100 rounded-lg border border-stone-200">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[130px_1fr_auto] sm:grid-cols-[180px_1fr_auto] gap-3 px-4 py-3 text-sm">
            <dt className="text-stone-500">{r.label}</dt>
            <dd className="text-stone-900 break-words">{r.value || "—"}</dd>
            <button type="button" onClick={() => goTo(r.step)} className="text-xs font-semibold text-starehe-blue-700 hover:text-starehe-maroon-800 underline-offset-2 hover:underline">
              Edit
            </button>
          </div>
        ))}
      </dl>

      <div className="rounded-lg border border-stone-200 p-4 sm:p-5">
        <h3 className="text-sm font-bold text-starehe-blue-900 mb-2">Documents to attach to the physical form</h3>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-stone-700 list-disc pl-5">
          <li>Clear passport photograph (affixed on page 1)</li>
          <li>Copy of the birth certificate</li>
          <li>Headteacher&apos;s recommendation, signed & stamped</li>
          <li>Copies of parents&apos; ID cards</li>
          <li>Pay slip(s) if employed</li>
          <li>Death certificate(s) if a parent is deceased</li>
          {data.category === "SPONSORED" && <li>Chief and religious leader recommendations, stamped</li>}
        </ul>
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-stone-50 border border-stone-200 p-4 cursor-pointer">
        <input type="checkbox" checked={declared} onChange={(e) => setDeclared(e.target.checked)} className="mt-0.5 w-4 h-4 accent-starehe-maroon-800" />
        <span className="text-sm text-stone-700 leading-relaxed">
          I certify that the information given is true and complete. I understand that making a false statement on this
          form may lead to prosecution, and that the Centre&apos;s administration reserves the right of admission.
        </span>
      </label>
    </>
  );
}

function SuccessPanel({
  result,
  name,
  isSelf,
  busy,
  onDownload,
  onNew,
  banner,
}: {
  result: SubmitResult;
  name: string;
  isSelf: boolean;
  busy: boolean;
  onDownload: () => void;
  onNew: () => void;
  banner: string;
}) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl border border-stone-200 shadow-subtle p-6 sm:p-10">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-starehe-blue-900">Application received</h2>
          <p className="mt-1 text-sm text-stone-600">
            Thank you. {name ? <strong>{name}</strong> : "The applicant"}&apos;s Grade 10 application has been saved.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-starehe-blue-50 border border-starehe-blue-100 px-5 py-4">
        <p className="text-xs text-starehe-blue-800">Your application number</p>
        <p className="font-mono text-xl font-bold text-starehe-blue-900 tracking-wide mt-0.5">{result.applicationNumber}</p>
        <p className="text-xs text-stone-600 mt-1">Quote this number whenever you contact the admissions office.</p>
      </div>

      {banner && (
        <div role="alert" className="mt-4 flex items-start gap-3 rounded-lg bg-starehe-maroon-50 border border-starehe-maroon-200 px-4 py-3 text-sm text-starehe-maroon-900">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{banner}</span>
        </div>
      )}

      <h3 className="mt-8 text-sm font-bold text-starehe-blue-900">What to do next</h3>
      <ol className="mt-3 space-y-3 text-sm text-stone-700">
        {[
          "Download the completed form below and print all four pages.",
          "Affix a recent passport photo on page 1 and have the junior school headteacher sign and stamp Part I.",
          "Parent or guardian signs page 3.",
          ...(isSelf ? [] : ["Take page 4 to the area chief and your priest, pastor or imam to sign and stamp."]),
          "Return the physical form with all supporting documents to the school by 31st July.",
        ].map((t, i) => (
          <li key={i} className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-starehe-maroon-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
            <span className="pt-0.5">{t}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-starehe-maroon-800 hover:bg-starehe-maroon-700 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-starehe-maroon-700 transition-colors"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Download completed form (PDF)
        </button>
        <button type="button" onClick={onNew} className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 px-5 py-3 text-sm font-semibold text-starehe-blue-900 hover:bg-stone-50 transition-colors">
          Start another application
        </button>
      </div>
      <p className="mt-6 text-xs text-stone-500">
        Questions? Call 0707 900 852 / 0738 255 448 or email info@starehegirlscentre.co.ke.
      </p>
    </div>
  );
}

