import { z } from 'zod';

/**
 * Evaluation Form Validation Schemas
 * 6 Tabs with progressive validation
 * Simplified for Zod 4 compatibility
 */

// Tab 1: Summary (Read-only, no validation needed)

// Tab 2: Commercial Validation
export const tab2Schema = z.object({
  commercial_validated: z.boolean().optional(),
  commercial_comments: z.string().max(500, 'Máximo 500 caracteres').optional(),
  docs_validated: z.boolean().optional(),
  docs_comments: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

// Tab 3: Financial Analysis
export const tab3Schema = z.object({
  // Assets
  assets_property: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  assets_vehicles: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  assets_inventory: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  assets_accounts: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  assets_other: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  totalAssets: z.number().nonnegative('No puede ser negativo').optional(),

  // Liabilities
  liabilities_loans: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  liabilities_cards: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  liabilities_suppliers: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  liabilities_other: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  totalLiabilities: z.number().nonnegative('No puede ser negativo').optional(),

  equity: z.number().optional(),

  // Income
  income_sales: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  income_services: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  income_other: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  income_family: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  totalIncome: z.number().nonnegative('No puede ser negativo').optional(),

  // Expenses
  expense_cost: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  expense_operating: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  expense_personal: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  totalExpenses: z.number().nonnegative('No puede ser negativo').optional(),

  grossCapacity: z.number().optional(),

  // Deductions
  deduction_familyLoad: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  deduction_otherObligations: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  deduction_living: z.number().nonnegative('No puede ser negativo').optional().or(z.literal(0)),
  totalDeductions: z.number().nonnegative('No puede ser negativo').optional(),

  netCapacity: z.number().optional(),
});

// Tab 4: Advisor Proposal
export const tab4Schema = z.object({
  proposal_amount: z.number().positive('El monto debe ser mayor a 0').optional(),

  proposal_termMonths: z
    .number()
    .int('El plazo debe ser un número entero')
    .min(1, 'El plazo mínimo es 1 mes')
    .max(120, 'El plazo máximo es 120 meses')
    .optional(),

  proposal_rate: z
    .number()
    .min(0, 'La tasa no puede ser negativa')
    .max(100, 'La tasa no puede ser mayor a 100%')
    .optional(),

  proposal_monthlyPayment: z.number().optional(),
  proposal_totalPayment: z.number().optional(),
  proposal_totalInterest: z.number().optional(),
  proposal_comments: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

// Tab 5: Credit Committee
export const tab5Schema = z.object({
  mesa_decision: z.enum(['aprobado', 'rechazado', 'condicional']),

  mesa_conditions: z.string().max(1000, 'Máximo 1000 caracteres').optional(),

  mesa_sarlaft_pep: z.boolean().optional(),
  mesa_sarlaft_lists: z.boolean().optional(),
  mesa_sarlaft_adverse: z.boolean().optional(),

  mesa_comments: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
});

// Tab 6: Contingency Analysis (simplified - all fields optional)
export const tab6Schema = z.object({
  summary_economicActivity: z.string().optional(),

  // Commerce
  contingency_commerce_inventory: z.number().nonnegative('No puede ser negativo').optional(),
  contingency_commerce_salesVolume: z.number().nonnegative('No puede ser negativo').optional(),
  contingency_commerce_suppliers: z.string().max(500).optional(),
  contingency_commerce_location: z.string().max(500).optional(),
  contingency_commerce_competition: z.string().max(500).optional(),

  // Services
  contingency_services_clients: z.number().nonnegative('No puede ser negativo').optional(),
  contingency_services_avgTicket: z.number().nonnegative('No puede ser negativo').optional(),
  contingency_services_equipment: z.string().max(500).optional(),
  contingency_services_licenses: z.string().max(500).optional(),
  contingency_services_staff: z.number().nonnegative('No puede ser negativo').optional(),

  // Manufacturing
  contingency_manufacturing_capacity: z.string().max(500).optional(),
  contingency_manufacturing_machinery: z.string().max(500).optional(),
  contingency_manufacturing_rawMaterials: z.string().max(500).optional(),
  contingency_manufacturing_production: z.string().max(500).optional(),
  contingency_manufacturing_distribution: z.string().max(500).optional(),

  // Agriculture
  contingency_agriculture_landSize: z.string().max(500).optional(),
  contingency_agriculture_crops: z.string().max(500).optional(),
  contingency_agriculture_livestock: z.string().max(500).optional(),
  contingency_agriculture_equipment: z.string().max(500).optional(),
  contingency_agriculture_climate: z.string().max(500).optional(),
});

// Complete Evaluation Schema
export const evaluationSchema = z.object({
  applicationNumber: z.string().min(1, 'El número de solicitud es requerido'),
  organizationId: z.string().optional(),
  evaluatedBy: z.string().optional(),
  evaluatedAt: z.string().optional(),
})
  .merge(tab2Schema)
  .merge(tab3Schema)
  .merge(tab4Schema)
  .merge(tab5Schema)
  .merge(tab6Schema);

// Type inference
export type Tab2Data = z.infer<typeof tab2Schema>;
export type Tab3Data = z.infer<typeof tab3Schema>;
export type Tab4Data = z.infer<typeof tab4Schema>;
export type Tab5Data = z.infer<typeof tab5Schema>;
export type Tab6Data = z.infer<typeof tab6Schema>;
export type EvaluationFormData = z.infer<typeof evaluationSchema>;

// Schema array for easy access by tab index
export const evaluationTabSchemas = [
  z.object({}), // Tab 0: Summary (no validation)
  tab2Schema,
  tab3Schema,
  tab4Schema,
  tab5Schema,
  tab6Schema,
];
