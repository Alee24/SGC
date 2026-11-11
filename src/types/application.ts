export type AdmissionCategory = "SPONSORED" | "SELF_SPONSORED";
export type SeniorPathway = "STEM" | "SOCIAL_SCIENCE" | "ARTS_SPORTS";
export type TrackChoice =
  | "Pure Science"
  | "Applied Science"
  | "Languages"
  | "Humanities & Business Studies"
  | "Arts"
  | "Sports Science";

export type ApplicationStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "HOME_VISIT_REQUIRED"
  | "APPROVED"
  | "WAITLISTED"
  | "REJECTED";

export interface ParentParticulars {
  fullNames: string;
  maritalStatus: string;
  deceasedDate?: string;
  idNumber: string;
  employmentIncome: string;
  businessIncome: string;
  ownedLandIncome: string;
  otherIncome: string;
  physicalAddress: string;
  houseStatus: string;
}

export interface SiblingRecord {
  name: string;
  gender: "M" | "F" | "";
  age: string;
  schoolOrCollege: string;
  workingOccupationSalary: string;
  marriedSpouseOccupationSalary: string;
}

export interface SeniorSchoolApplicationData {
  // Header & Page 1
  admissionYear: string;
  category: AdmissionCategory;
  fullName: string;
  assessmentNo: string;
  centreCode: string;
  pathwaySelected: SeniorPathway | "";
  tracksSelected: TrackChoice[];
  dateOfBirth: string;
  birthCertNo: string;
  juniorSchoolName: string;
  juniorSchHoiContact: string;
  county: string;
  subCounty: string;
  passportPhotoDataUrl?: string;

  // Part I: Headteacher Recommendation
  headteacherBgComments: string;
  headteacherAbilityObservations: string;
  headteacherName: string;
  headteacherMobile: string;
  headteacherDate: string;

  // Part II: Background Information
  father: ParentParticulars;
  mother: ParentParticulars;
  siblings: SiblingRecord[];
  whoPaysFees: string;

  // Part III: Explanation & Parent Certification
  admissionExplanation: string;
  parentCertName: string;
  parentCertOccupation: string;
  parentCertAddress: string;
  parentCertMobile: string;
  parentCertEmail: string;
  parentCertDate: string;
  parentCertRelationship: string;

  // Part IV: Recommendations (Sponsored Category)
  chiefComments: string;
  chiefNameTitle: string;
  chiefMobile: string;
  chiefOfficeTel: string;
  chiefDate: string;

  clergyComments: string;
  clergyNameTitle: string;
  clergyMobile: string;
  clergyOfficeTel: string;
  clergyDate: string;
}

export interface StoredApplication extends SeniorSchoolApplicationData {
  id: number;
  applicationNumber: string;
  status: ApplicationStatus;
  adminRemarks: string;
  reviewedBy: string | null;
  knecArtsScore?: string;
  knecSocialScore?: string;
  knecStemScore?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

