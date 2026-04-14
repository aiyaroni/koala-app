export interface PersonalData {
  age: string;
  gender: "male" | "female" | "";
  maritalStatus: "single" | "married" | "divorced" | "widowed" | "";
  children: string;
  youngestChildAge: string;
  isNewImmigrant: boolean;
  immigrationYear: string;
}

export interface EmploymentData {
  employmentType: "employee" | "self-employed" | "both" | "";
  grossSalary: string;
  hasAdditionalIncome: boolean;
  additionalIncome: string;
  yearsAtCurrentEmployer: string;
  plannedRetirementAge: "60" | "62" | "65" | "67" | "flexible" | "";
}

export interface AssetsData {
  hasMortgage: boolean;
  mortgageBalance: string;
  mortgageInterest: string;
  mortgageYearsLeft: string;
  hasOtherLoans: boolean;
  otherLoansBalance: string;
  ownsApartment: boolean;
  apartmentValue: string;
  liquidSavings: string;
}

export interface PensionData {
  hasPensionFund: boolean;
  pensionFundName: string;
  hasManagerInsurance: boolean;
  managerInsuranceCompany: string;
  hasStudyFund: boolean;
  hasProvidentFund: boolean;
  employerContributes: "yes" | "no" | "unknown" | "";
  knowsManagementFees: boolean;
  managementFeesPercent: string;
}

export interface InsuranceData {
  hasLifeInsurance: boolean;
  lifeInsuranceAmount: string;
  lifeInsuranceCompany: string;
  hasDisabilityInsurance: boolean;
  disabilityInsurancePercent: string;
  hasHomeInsurance: boolean;
  homeInsuranceType: "structure" | "contents" | "both" | "";
  carInsurance: "mandatory" | "comprehensive" | "third-party" | "";
  hasHealthInsurance: boolean;
  healthInsuranceHmo: string;
  healthInsuranceLevel: string;
}

export interface GoalsData {
  biggestFinancialConcern: string;
  familyIfCantWork: "fine" | "problematic" | "catastrophe" | "";
  monthsWithoutIncome: "less-3" | "3-6" | "6-12" | "more-12" | "";
  riskTolerance: number;
}

export interface DocumentFile {
  id: string;
  name: string;
  file: File | null;
  type: "pension-report" | "insurance-policy" | "payslip";
}

export interface DocumentsData {
  pensionReport: DocumentFile | null;
  insurancePolicies: DocumentFile[];
  payslips: DocumentFile[];
}

export interface QuestionnaireState {
  personal: PersonalData;
  employment: EmploymentData;
  assets: AssetsData;
  pension: PensionData;
  insurance: InsuranceData;
  goals: GoalsData;
  documents: DocumentsData;
}

export const initialState: QuestionnaireState = {
  personal: {
    age: "",
    gender: "",
    maritalStatus: "",
    children: "0",
    youngestChildAge: "",
    isNewImmigrant: false,
    immigrationYear: "",
  },
  employment: {
    employmentType: "",
    grossSalary: "",
    hasAdditionalIncome: false,
    additionalIncome: "",
    yearsAtCurrentEmployer: "",
    plannedRetirementAge: "",
  },
  assets: {
    hasMortgage: false,
    mortgageBalance: "",
    mortgageInterest: "",
    mortgageYearsLeft: "",
    hasOtherLoans: false,
    otherLoansBalance: "",
    ownsApartment: false,
    apartmentValue: "",
    liquidSavings: "",
  },
  pension: {
    hasPensionFund: false,
    pensionFundName: "",
    hasManagerInsurance: false,
    managerInsuranceCompany: "",
    hasStudyFund: false,
    hasProvidentFund: false,
    employerContributes: "",
    knowsManagementFees: false,
    managementFeesPercent: "",
  },
  insurance: {
    hasLifeInsurance: false,
    lifeInsuranceAmount: "",
    lifeInsuranceCompany: "",
    hasDisabilityInsurance: false,
    disabilityInsurancePercent: "",
    hasHomeInsurance: false,
    homeInsuranceType: "",
    carInsurance: "",
    hasHealthInsurance: false,
    healthInsuranceHmo: "",
    healthInsuranceLevel: "",
  },
  goals: {
    biggestFinancialConcern: "",
    familyIfCantWork: "",
    monthsWithoutIncome: "",
    riskTolerance: 5,
  },
  documents: {
    pensionReport: null,
    insurancePolicies: [],
    payslips: [],
  },
};
