import { z } from 'zod';

/**
 * Application Form Validation Schemas
 * 6 Steps with progressive validation
 * Simplified for Zod 4 compatibility
 */

// Step 1: Personal Information
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),

  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),

  idNumber: z
    .string()
    .min(6, 'La cédula debe tener al menos 6 dígitos')
    .max(10, 'La cédula no puede tener más de 10 dígitos')
    .regex(/^\d+$/, 'La cédula solo puede contener números'),

  birthDate: z
    .string()
    .min(1, 'La fecha de nacimiento es requerida')
    .refine((date) => {
      const d = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - d.getFullYear();
      return age >= 18;
    }, 'Debe ser mayor de 18 años'),

  gender: z.enum(['masculino', 'femenino', 'otro']),

  maritalStatus: z.enum(['soltero', 'casado', 'union_libre', 'divorciado', 'viudo']),

  idIssueDate: z
    .string()
    .min(1, 'La fecha de expedición es requerida')
    .refine((date) => {
      const d = new Date(date);
      return d <= new Date();
    }, 'La fecha de expedición no puede ser futura'),

  mobile: z
    .string()
    .min(10, 'El celular debe tener 10 dígitos')
    .max(10, 'El celular debe tener 10 dígitos')
    .regex(/^3\d{9}$/, 'El celular debe comenzar con 3 y tener 10 dígitos'),

  email: z
    .string()
    .email('Correo electrónico inválido')
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(/^\d{7,10}$/, 'El teléfono debe tener entre 7 y 10 dígitos')
    .optional()
    .or(z.literal('')),
});

// Step 2: Address Information
export const step2Schema = z.object({
  municipality: z
    .string()
    .min(2, 'El municipio es requerido')
    .max(100, 'El municipio es muy largo'),

  address: z
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(200, 'La dirección es muy larga'),

  vereda: z.string().max(100, 'La vereda es muy larga').optional().or(z.literal('')),

  housingType: z.enum(['propia', 'arrendada', 'familiar', 'otra']),

  monthlyIncome: z
    .number()
    .positive('El ingreso mensual debe ser mayor a 0')
    .max(1000000000, 'El ingreso mensual es demasiado alto'),
});

// Step 3: Credit Request
export const step3Schema = z.object({
  product: z.string().min(1, 'El producto es requerido'),

  requestedAmount: z
    .number()
    .positive('El monto debe ser mayor a 0')
    .min(100000, 'El monto mínimo es $100,000')
    .max(500000000, 'El monto máximo es $500,000,000'),

  termMonths: z
    .number()
    .int('El plazo debe ser un número entero')
    .min(1, 'El plazo mínimo es 1 mes')
    .max(120, 'El plazo máximo es 120 meses'),

  monthlyPayment: z.string().min(1, 'La cuota mensual es requerida'),

  paymentPeriod: z.enum(['mensual', 'quincenal', 'semanal']),

  bank: z.string().min(2, 'El banco es requerido'),

  accountType: z.enum(['ahorros', 'corriente']),

  accountNumber: z
    .string()
    .min(8, 'El número de cuenta debe tener al menos 8 dígitos')
    .max(20, 'El número de cuenta no puede tener más de 20 dígitos')
    .regex(/^\d+$/, 'El número de cuenta solo puede contener números'),
});

// Step 4: Economic Activity
export const step4Schema = z.object({
  economicActivity: z.string().min(1, 'La actividad económica es requerida'),

  activityMunicipality: z
    .string()
    .min(2, 'El municipio de la actividad es requerido')
    .max(100, 'El municipio es muy largo'),

  employerAddress: z
    .string()
    .max(200, 'La dirección es muy larga')
    .optional()
    .or(z.literal('')),

  hireDate: z.string().optional().or(z.literal('')),
});

// Step 5: Financial Information
export const step5Schema = z.object({
  familyIncome: z.number().nonnegative('El ingreso familiar no puede ser negativo').optional().or(z.literal(0)),

  otherIncome: z.number().nonnegative('Otros ingresos no puede ser negativo').optional().or(z.literal(0)),

  totalIncome: z.number().positive('El total de ingresos debe ser mayor a 0'),

  foodExpense: z.number().nonnegative('El gasto no puede ser negativo').optional().or(z.literal(0)),

  rentExpense: z.number().nonnegative('El gasto no puede ser negativo').optional().or(z.literal(0)),

  utilitiesExpense: z.number().nonnegative('El gasto no puede ser negativo').optional().or(z.literal(0)),

  transportExpense: z.number().nonnegative('El gasto no puede ser negativo').optional().or(z.literal(0)),

  otherExpense: z.number().nonnegative('El gasto no puede ser negativo').optional().or(z.literal(0)),

  totalExpense: z.number().nonnegative('El total de gastos no puede ser negativo'),

  netBalance: z.number().refine((val) => val >= 0, 'El balance neto no puede ser negativo'),
});

// Step 6: Documents and Consents
export const step6Schema = z.object({
  signatureCity: z.string().min(2, 'La ciudad es requerida').optional(),

  signatureDate: z.string().min(1, 'La fecha es requerida').optional(),

  signature: z.string().min(10, 'La firma es requerida'),

  termsConsent: z.boolean().refine((val) => val === true, 'Debe aceptar los términos y condiciones'),

  privacyConsent: z.boolean().refine((val) => val === true, 'Debe aceptar la política de privacidad'),

  signatureConsent: z.boolean().optional(),

  emailConsent: z.boolean().optional(),
});

// Complete Application Schema (all steps combined)
export const applicationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema);

// Type inference
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type Step5Data = z.infer<typeof step5Schema>;
export type Step6Data = z.infer<typeof step6Schema>;
export type ApplicationFormData = z.infer<typeof applicationSchema>;

// Schema array for easy access by step index
export const applicationStepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
];
