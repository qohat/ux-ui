/**
 * API Types - Synchronized with Backend
 * Source: ../finazactivos/backend/api/src/types/
 */

// ==========================================
// APPLICATION TYPES
// ==========================================

/**
 * Application Data from Client Form
 */
export interface ApplicationData {
  // Personal Information
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  gender: 'masculino' | 'femenino' | 'otro';
  maritalStatus: 'soltero' | 'casado' | 'union_libre' | 'divorciado' | 'viudo';
  idIssueDate: string;
  mobile: string;
  email?: string;
  phone?: string;

  // Address
  municipality: string;
  address: string;
  vereda?: string;
  housingType: 'propia' | 'arrendada' | 'familiar' | 'otra';
  monthlyIncome: number;

  // Credit Request
  product: string;
  requestedAmount: number;
  termMonths: number;
  monthlyPayment: string;
  paymentPeriod: 'mensual' | 'quincenal' | 'semanal';
  bank: string;
  accountType: 'ahorros' | 'corriente';
  accountNumber: string;

  // Employment
  economicActivity: string;
  activityMunicipality: string;
  employerAddress?: string;
  hireDate?: string;

  // Financial Info
  familyIncome?: number;
  otherIncome?: number;
  totalIncome: number;
  foodExpense?: number;
  rentExpense?: number;
  utilitiesExpense?: number;
  transportExpense?: number;
  otherExpense?: number;
  totalExpense: number;
  netBalance: number;

  // Signature
  signatureCity?: string;
  signatureDate?: string;
  signature?: string;

  // Consents
  termsConsent: boolean;
  privacyConsent: boolean;
  signatureConsent?: boolean;
  emailConsent?: boolean;

  // Metadata
  organizationId?: string;
  submittedAt?: string;
}

/**
 * Application Response
 */
export interface ApplicationResponse {
  success: boolean;
  applicationNumber: string;
  applicationId: number;
  customerId: number;
  batchId: number;
  message: string;
}

/**
 * Application Status
 */
export type ApplicationStatus =
  | 'submitted'
  | 'under_review'
  | 'preapproved'
  | 'approved'
  | 'rejected'
  | 'disbursed'
  | 'cancelled';

/**
 * Application List Item
 */
export interface ApplicationListItem {
  application_id: string;
  application_number: string;
  requested_amount: string;
  status: ApplicationStatus;
  submitted_at: Date;
  identification: string;
  full_name: string;
  product_name: string;
}

/**
 * Application Details
 */
export interface ApplicationDetails {
  applicationNumber: string;
  applicationId: string;
  status: ApplicationStatus;
  submittedAt: Date;
  personalInfo: {
    fullName: string;
    identification: string;
    birthDate?: string;
    gender?: string;
    maritalStatus?: string;
    idIssueDate?: string;
  };
  creditRequest: {
    product: string;
    productName: string;
    requestedAmount: string;
  };
  address: {
    address_line: string;
    city: string;
  } | null;
  contacts: Array<{
    contact_type: string;
    contact_value: string;
  }>;
  financialInfo: {
    totalIncome: string;
    totalExpenses: string;
    paymentCapacity: string;
  };
  metadata: Record<string, unknown>;
}

// ==========================================
// EVALUATION TYPES
// ==========================================

/**
 * Evaluation Data from Advisor Form
 */
export interface EvaluationData {
  // Application Reference
  applicationNumber: string;
  organizationId?: string;
  evaluatedBy?: string;
  evaluatedAt?: string;

  // Validation (Tab 2)
  commercial_validated?: boolean;
  commercial_comments?: string;
  docs_validated?: boolean;
  docs_comments?: string;

  // Financial Analysis (Tab 3)
  assets_property?: number;
  assets_vehicles?: number;
  assets_inventory?: number;
  assets_accounts?: number;
  assets_other?: number;
  totalAssets?: number;

  liabilities_loans?: number;
  liabilities_cards?: number;
  liabilities_suppliers?: number;
  liabilities_other?: number;
  totalLiabilities?: number;

  equity?: number;

  income_sales?: number;
  income_services?: number;
  income_other?: number;
  income_family?: number;
  totalIncome?: number;

  expense_cost?: number;
  expense_operating?: number;
  expense_personal?: number;
  totalExpenses?: number;

  grossCapacity?: number;

  deduction_familyLoad?: number;
  deduction_otherObligations?: number;
  deduction_living?: number;
  totalDeductions?: number;

  netCapacity?: number;

  // Proposal (Tab 4)
  proposal_amount?: number;
  proposal_termMonths?: number;
  proposal_rate?: number;
  proposal_monthlyPayment?: number;
  proposal_totalPayment?: number;
  proposal_totalInterest?: number;
  proposal_comments?: string;

  // Credit Committee Decision (Tab 5)
  mesa_decision: 'aprobado' | 'rechazado' | 'condicional';
  mesa_conditions?: string;
  mesa_sarlaft_pep?: boolean;
  mesa_sarlaft_lists?: boolean;
  mesa_sarlaft_adverse?: boolean;
  mesa_comments?: string;

  // Contingency (Tab 6) - Dynamic based on economic activity
  summary_economicActivity?: string;

  // Commerce
  contingency_commerce_inventory?: number;
  contingency_commerce_salesVolume?: number;
  contingency_commerce_suppliers?: string;
  contingency_commerce_location?: string;
  contingency_commerce_competition?: string;

  // Services
  contingency_services_clients?: number;
  contingency_services_avgTicket?: number;
  contingency_services_equipment?: string;
  contingency_services_licenses?: string;
  contingency_services_staff?: number;

  // Manufacturing
  contingency_manufacturing_capacity?: string;
  contingency_manufacturing_machinery?: string;
  contingency_manufacturing_rawMaterials?: string;
  contingency_manufacturing_production?: string;
  contingency_manufacturing_distribution?: string;

  // Agriculture
  contingency_agriculture_landSize?: string;
  contingency_agriculture_crops?: string;
  contingency_agriculture_livestock?: string;
  contingency_agriculture_equipment?: string;
  contingency_agriculture_climate?: string;
}

/**
 * Evaluation Response
 */
export interface EvaluationResponse {
  success: boolean;
  applicationNumber: string;
  loanId: number;
  decision: 'aprobado' | 'rechazado' | 'condicional';
  status: string;
  message: string;
}

/**
 * Evaluation List Item
 */
export interface EvaluationListItem {
  loan_id: number;
  application_number: string;
  status: string;
  updated_at: Date;
  full_name: string;
  identification: string;
  evaluated_at: string;
  decision: string;
}

// ==========================================
// SHARED TYPES
// ==========================================

/**
 * API Error Response
 */
export interface APIError {
  success: false;
  error: string;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * API Success Response
 */
export interface APISuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

/**
 * File Upload Frontend Type (replaces Multer)
 */
export interface FileUpload {
  file: File;
  fieldName: string;
}
