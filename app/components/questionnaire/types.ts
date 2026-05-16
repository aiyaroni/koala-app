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
  // net-salary specific
  hasCompanyCar: boolean;
  companyCarValue: string;
  hasMealVouchers: boolean;
  mealVouchersAmount: string;
  pensionEmployeePercent: string;
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
  currentBalance: string;
  investmentTrack: "conservative" | "balanced" | "aggressive" | "unknown" | "";
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
  // car-insurance specific
  vehicleYear: string;
  vehicleMake: string;
  drivingYears: string;
  annualKm: "under-10k" | "10k-20k" | "20k-30k" | "over-30k" | "";
  previousAccidents: "none" | "one" | "two-plus" | "";
}

export interface GoalsData {
  biggestFinancialConcern: string;
  familyIfCantWork: "fine" | "problematic" | "catastrophe" | "";
  monthsWithoutIncome: "less-3" | "3-6" | "6-12" | "more-12" | "";
  riskTolerance: number;
}

export interface TaxTriggersData {
  taxYears: string[];
  jobChanges: boolean;
  employersCount: "2" | "3" | "4+" | "";
  hadUnemployment: boolean;
  unemploymentMonths: string;
  miluimDays: string;
  hadDonations: boolean;
  donationsAmount: string;
  yishuvMezakeh: boolean;
  yishuvName: string;
  isNewImmigrantClaim: boolean;
  isSingleParent: boolean;
  hasDisabledChild: boolean;
  hasPersonalDisability: boolean;
  paysAlimony: boolean;
  earlyKerenWithdrawal: boolean;
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
  taxTriggers: TaxTriggersData;
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
    hasCompanyCar: false,
    companyCarValue: "",
    hasMealVouchers: false,
    mealVouchersAmount: "",
    pensionEmployeePercent: "",
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
    currentBalance: "",
    investmentTrack: "",
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
    vehicleYear: "",
    vehicleMake: "",
    drivingYears: "",
    annualKm: "",
    previousAccidents: "",
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
  taxTriggers: {
    taxYears: [],
    jobChanges: false,
    employersCount: "",
    hadUnemployment: false,
    unemploymentMonths: "",
    miluimDays: "",
    hadDonations: false,
    donationsAmount: "",
    yishuvMezakeh: false,
    yishuvName: "",
    isNewImmigrantClaim: false,
    isSingleParent: false,
    hasDisabledChild: false,
    hasPersonalDisability: false,
    paysAlimony: false,
    earlyKerenWithdrawal: false,
  },
};
