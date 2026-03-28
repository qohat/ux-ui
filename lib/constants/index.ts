/**
 * Application Constants
 */

// Storage Keys
export const STORAGE_KEYS = {
  APPLICATION_FORM: 'form_application',
  EVALUATION_FORM: 'form_evaluation',
  AUTH_TOKEN: 'auth_token',
} as const;

// Form Steps
export const APPLICATION_STEPS = {
  PERSONAL: 0,
  ADDRESS: 1,
  CREDIT: 2,
  EMPLOYMENT: 3,
  FINANCIAL: 4,
  DOCUMENTS: 5,
  TOTAL: 6,
} as const;

export const EVALUATION_TABS = {
  SUMMARY: 0,
  VALIDATION: 1,
  FINANCIAL: 2,
  PROPOSAL: 3,
  COMMITTEE: 4,
  CONTINGENCY: 5,
  TOTAL: 6,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024,
  ACCEPTED_TYPES: {
    IMAGE: ['image/jpeg', 'image/jpg', 'image/png'],
    DOCUMENT: ['application/pdf'],
  },
} as const;

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Otro' },
] as const;

// Marital Status Options
export const MARITAL_STATUS_OPTIONS = [
  { value: 'soltero', label: 'Soltero/a' },
  { value: 'casado', label: 'Casado/a' },
  { value: 'union_libre', label: 'Unión Libre' },
  { value: 'divorciado', label: 'Divorciado/a' },
  { value: 'viudo', label: 'Viudo/a' },
] as const;

// Housing Type Options
export const HOUSING_TYPE_OPTIONS = [
  { value: 'propia', label: 'Propia' },
  { value: 'arrendada', label: 'Arrendada' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'otra', label: 'Otra' },
] as const;

// Payment Period Options
export const PAYMENT_PERIOD_OPTIONS = [
  { value: 'mensual', label: 'Mensual' },
  { value: 'quincenal', label: 'Quincenal' },
  { value: 'semanal', label: 'Semanal' },
] as const;

// Account Type Options
export const ACCOUNT_TYPE_OPTIONS = [
  { value: 'ahorros', label: 'Ahorros' },
  { value: 'corriente', label: 'Corriente' },
] as const;

// Credit Products
export const CREDIT_PRODUCTS = [
  { value: 'microempresa', label: 'Microempresa' },
  { value: 'consumo', label: 'Consumo' },
  { value: 'vivienda', label: 'Vivienda' },
  { value: 'agricola', label: 'Agrícola' },
] as const;

// Colombian Banks
export const COLOMBIAN_BANKS = [
  'Bancolombia',
  'Banco de Bogotá',
  'Davivienda',
  'BBVA Colombia',
  'Banco Popular',
  'Banco Caja Social',
  'Banco de Occidente',
  'Banco AV Villas',
  'Banco Agrario',
  'Banco Falabella',
  'Banco Pichincha',
  'Scotiabank Colpatria',
  'Banco GNB Sudameris',
  'Banco Cooperativo Coopcentral',
  'Bancoomeva',
  'Nequi',
  'Daviplata',
  'Otro',
] as const;

// Economic Activities
export const ECONOMIC_ACTIVITIES = [
  { value: 'comercio', label: 'Comercio', category: 'commerce' },
  { value: 'servicios', label: 'Servicios', category: 'services' },
  { value: 'manufactura', label: 'Manufactura', category: 'manufacturing' },
  { value: 'agricultura', label: 'Agricultura', category: 'agriculture' },
  { value: 'ganaderia', label: 'Ganadería', category: 'agriculture' },
  { value: 'independiente', label: 'Independiente', category: 'services' },
  { value: 'empleado', label: 'Empleado', category: 'services' },
  { value: 'otro', label: 'Otro', category: 'other' },
] as const;

// Application Status
export const APPLICATION_STATUS = {
  SUBMITTED: { value: 'submitted', label: 'Enviada', color: 'blue' },
  UNDER_REVIEW: { value: 'under_review', label: 'En Revisión', color: 'yellow' },
  PREAPPROVED: { value: 'preapproved', label: 'Preaprobada', color: 'green' },
  APPROVED: { value: 'approved', label: 'Aprobada', color: 'green' },
  REJECTED: { value: 'rejected', label: 'Rechazada', color: 'red' },
  DISBURSED: { value: 'disbursed', label: 'Desembolsada', color: 'purple' },
  CANCELLED: { value: 'cancelled', label: 'Cancelada', color: 'gray' },
} as const;

// Evaluation Decision
export const EVALUATION_DECISION = {
  APPROVED: { value: 'aprobado', label: 'Aprobado', color: 'green' },
  REJECTED: { value: 'rechazado', label: 'Rechazado', color: 'red' },
  CONDITIONAL: { value: 'condicional', label: 'Condicional', color: 'yellow' },
} as const;

// Auto-save Interval (milliseconds)
export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

// Session Timeout (milliseconds)
export const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;
