import type {
  ParentParticulars,
  SeniorSchoolApplicationData,
  SiblingRecord,
  TrackChoice,
} from "@/types/application";

export const TRACKS_BY_PATHWAY: Record<string, TrackChoice[]> = {
  STEM: ["Pure Science", "Applied Science"],
  SOCIAL_SCIENCE: ["Languages", "Humanities & Business Studies"],
  ARTS_SPORTS: ["Arts", "Sports Science"],
};

export const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2MB after base64 decode

export const emptyParent = (): ParentParticulars => ({
  fullNames: "",
  maritalStatus: "",
  deceasedDate: "",
  idNumber: "",
  employmentIncome: "",
  businessIncome: "",
  ownedLandIncome: "",
  otherIncome: "",
  physicalAddress: "",
  houseStatus: "",
});

export const emptySibling = (): SiblingRecord => ({
  name: "",
  gender: "",
  age: "",
  schoolOrCollege: "",
  workingOccupationSalary: "",
  marriedSpouseOccupationSalary: "",
});

const str = (v: unknown, max = 2000) => String(v ?? "").slice(0, max).trim();

/** Normalises untrusted input into the application contract (server side). */
export function normaliseApplication(input: Record<string, unknown>): SeniorSchoolApplicationData {
  const parent = (p: unknown): ParentParticulars => {
    const o = (p && typeof p === "object" ? p : {}) as Record<string, unknown>;
    return {
      fullNames: str(o.fullNames, 200),
      maritalStatus: str(o.maritalStatus, 300),
      deceasedDate: str(o.deceasedDate, 20),
      idNumber: str(o.idNumber, 40),
      employmentIncome: str(o.employmentIncome, 400),
      businessIncome: str(o.businessIncome, 400),
      ownedLandIncome: str(o.ownedLandIncome, 400),
      otherIncome: str(o.otherIncome, 400),
      physicalAddress: str(o.physicalAddress, 400),
      houseStatus: str(o.houseStatus, 300),
    };
  };
  const siblings = Array.isArray(input.siblings) ? input.siblings : [];
  const pathway = str(input.pathwaySelected, 20);
  const allowedTracks = TRACKS_BY_PATHWAY[pathway] || [];
  const tracks = (Array.isArray(input.tracksSelected) ? input.tracksSelected : [])
    .map((t) => String(t))
    .filter((t): t is TrackChoice => (allowedTracks as string[]).includes(t));

  return {
    admissionYear: str(input.admissionYear, 4) || String(new Date().getFullYear() + 1),
    category: input.category === "SELF_SPONSORED" ? "SELF_SPONSORED" : "SPONSORED",
    fullName: str(input.fullName, 150),
    assessmentNo: str(input.assessmentNo, 40),
    centreCode: str(input.centreCode, 40),
    pathwaySelected: (["STEM", "SOCIAL_SCIENCE", "ARTS_SPORTS"].includes(pathway)
      ? pathway
      : "") as SeniorSchoolApplicationData["pathwaySelected"],
    tracksSelected: tracks,
    dateOfBirth: str(input.dateOfBirth, 20),
    birthCertNo: str(input.birthCertNo, 40),
    juniorSchoolName: str(input.juniorSchoolName, 200),
    juniorSchHoiContact: str(input.juniorSchHoiContact, 100),
    county: str(input.county, 60),
    subCounty: str(input.subCounty, 60),
    passportPhotoDataUrl: str(input.passportPhotoDataUrl, 3_000_000),

    headteacherBgComments: str(input.headteacherBgComments, 1500),
    headteacherAbilityObservations: str(input.headteacherAbilityObservations, 1500),
    headteacherName: str(input.headteacherName, 120),
    headteacherMobile: str(input.headteacherMobile, 30),
    headteacherDate: str(input.headteacherDate, 20),

    father: parent(input.father),
    mother: parent(input.mother),
    siblings: siblings.slice(0, 12).map((s) => {
      const o = (s && typeof s === "object" ? s : {}) as Record<string, unknown>;
      const g = str(o.gender, 1).toUpperCase();
      return {
        name: str(o.name, 120),
        gender: g === "M" || g === "F" ? g : "",
        age: str(o.age, 3),
        schoolOrCollege: str(o.schoolOrCollege, 200),
        workingOccupationSalary: str(o.workingOccupationSalary, 200),
        marriedSpouseOccupationSalary: str(o.marriedSpouseOccupationSalary, 200),
      } as SiblingRecord;
    }).filter((s) => s.name),
    whoPaysFees: str(input.whoPaysFees, 400),

    admissionExplanation: str(input.admissionExplanation, 4000),
    parentCertName: str(input.parentCertName, 150),
    parentCertOccupation: str(input.parentCertOccupation, 150),
    parentCertAddress: str(input.parentCertAddress, 250),
    parentCertMobile: str(input.parentCertMobile, 40),
    parentCertEmail: str(input.parentCertEmail, 150),
    parentCertDate: str(input.parentCertDate, 20),
    parentCertRelationship: str(input.parentCertRelationship, 150),

    chiefComments: str(input.chiefComments, 1500),
    chiefNameTitle: str(input.chiefNameTitle, 150),
    chiefMobile: str(input.chiefMobile, 30),
    chiefOfficeTel: str(input.chiefOfficeTel, 30),
    chiefDate: str(input.chiefDate, 20),

    clergyComments: str(input.clergyComments, 1500),
    clergyNameTitle: str(input.clergyNameTitle, 150),
    clergyMobile: str(input.clergyMobile, 30),
    clergyOfficeTel: str(input.clergyOfficeTel, 30),
    clergyDate: str(input.clergyDate, 20),
  };
}

export type FieldErrors = Record<string, string>;

const PHONE_RE = /^[+\d][\d\s-]{8,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validation rules shared by the wizard (per step) and the API. Messages are user-facing. */
export function validateApplication(
  d: SeniorSchoolApplicationData,
  step?: number
): FieldErrors {
  const e: FieldErrors = {};
  const check = (s: number) => step === undefined || step === s;

  if (check(1)) {
    if (!d.fullName || d.fullName.split(/\s+/).length < 2)
      e.fullName = "Enter the girl's full name as it appears on her birth certificate (at least two names).";
    if (!d.assessmentNo) e.assessmentNo = "Enter the KJSEA assessment number issued by KNEC.";
    if (!d.dateOfBirth) e.dateOfBirth = "Select the girl's date of birth.";
    else {
      const age = (Date.now() - new Date(d.dateOfBirth).getTime()) / (365.25 * 24 * 3600 * 1000);
      if (Number.isNaN(age) || age < 11 || age > 20)
        e.dateOfBirth = "Date of birth looks incorrect. Grade 10 applicants are usually between 13 and 18 years old.";
    }
    if (!d.juniorSchoolName) e.juniorSchoolName = "Enter the name of the junior school the girl attends.";
    if (!d.county) e.county = "Select the county where the family lives.";
    if (!d.pathwaySelected) e.pathwaySelected = "Choose one senior school pathway.";
    else if (!d.tracksSelected.length) e.tracksSelected = "Tick at least one track under the chosen pathway.";
    if (d.passportPhotoDataUrl) {
      const approxBytes = Math.ceil((d.passportPhotoDataUrl.length * 3) / 4);
      if (approxBytes > MAX_PHOTO_BYTES)
        e.passportPhotoDataUrl = "Passport photo is larger than 2MB. Please upload a smaller JPG or PNG image.";
      else if (!/^data:image\/(png|jpe?g);base64,/i.test(d.passportPhotoDataUrl))
        e.passportPhotoDataUrl = "Passport photo must be a JPG or PNG image.";
    }
    if (d.headteacherMobile && !PHONE_RE.test(d.headteacherMobile))
      e.headteacherMobile = "Enter a valid phone number, e.g. 0712 345 678.";
  }

  if (check(2)) {
    if (!d.father.fullNames && !d.mother.fullNames)
      e["father.fullNames"] = "Provide the particulars of at least one parent (father or mother).";
    for (const key of ["father", "mother"] as const) {
      const p = d[key];
      if (p.fullNames && !p.maritalStatus)
        e[`${key}.maritalStatus`] = "State marital status (or deceased with date).";
      if (p.fullNames && !p.physicalAddress)
        e[`${key}.physicalAddress`] = "Describe where this parent lives (town, estate and a nearby landmark).";
    }
  }

  if (check(3)) {
    if (!d.admissionExplanation || d.admissionExplanation.length < 80)
      e.admissionExplanation =
        "Please give a full explanation (at least a few sentences) of why the family needs a place at Starehe.";
    if (!d.parentCertName) e.parentCertName = "Enter the name of the parent or guardian completing this form.";
    if (!d.parentCertMobile || !PHONE_RE.test(d.parentCertMobile))
      e.parentCertMobile = "Enter a reachable mobile number, e.g. 0712 345 678. The school will use it to contact you.";
    if (d.parentCertEmail && !EMAIL_RE.test(d.parentCertEmail))
      e.parentCertEmail = "Enter a valid email address or leave it blank.";
    if (!d.parentCertRelationship)
      e.parentCertRelationship = "State your relationship to the girl (e.g. Mother, Uncle, Guardian).";
  }

  if (check(4)) {
    if (d.chiefMobile && !PHONE_RE.test(d.chiefMobile)) e.chiefMobile = "Enter a valid phone number for the chief.";
    if (d.clergyMobile && !PHONE_RE.test(d.clergyMobile))
      e.clergyMobile = "Enter a valid phone number for the religious leader.";
  }

  return e;
}

