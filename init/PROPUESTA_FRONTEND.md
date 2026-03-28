# PROPUESTA FRONTEND - FINAZACTIVOS

**Version**: 1.0
**Fecha**: 2026-03-27
**Stack**: Next.js 15 App Router + TypeScript + Tailwind CSS + Shadcn/ui
**Objetivo**: Portal de crédito con formularios multi-paso, optimizado para móvil y desktop

---

## 🎯 RESUMEN EJECUTIVO

Portal web con **dos formularios principales**:

1. **Formulario de Solicitud** (Cliente) - 6 pasos, sin autenticación, mobile-first
2. **Formulario de Evaluación** (Asesor) - 6 pestañas, requiere autenticación, desktop-first

**Principios de diseño**:
- ✅ **Rápido**: Next.js 15 con App Router, RSC, Server Actions
- ✅ **Validación robusta**: Zod schemas + React Hook Form
- ✅ **Persistencia local**: SessionStorage para recuperación de progreso
- ✅ **Testing completo**: Vitest + Testing Library + Playwright
- ✅ **Type-safe**: TypeScript strict, tipos compartidos con backend
- ✅ **Escalable**: Arquitectura modular, componentes reutilizables
- ✅ **UX excelente**: Loading states, error handling, feedback inmediato

---

## 🏗️ ARQUITECTURA DEL SISTEMA

```
finazactivos-frontend/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Grupo de rutas con autenticación
│   │   ├── evaluacion/
│   │   │   └── [id]/            # /evaluacion/APP-2026-001
│   │   │       └── page.tsx     # Form evaluación (6 tabs)
│   │   ├── dashboard/           # /dashboard
│   │   │   └── page.tsx         # Lista solicitudes pendientes
│   │   └── layout.tsx           # Layout con auth guard
│   │
│   ├── (public)/                # Grupo de rutas públicas
│   │   ├── solicitud/           # /solicitud
│   │   │   └── page.tsx         # Form solicitud (6 steps)
│   │   ├── confirmacion/        # /confirmacion/[applicationNumber]
│   │   │   └── [number]/
│   │   │       └── page.tsx     # Confirmación post-envío
│   │   └── layout.tsx           # Layout público
│   │
│   ├── api/                     # API Routes (proxy/auth)
│   │   ├── auth/                # NextAuth endpoints
│   │   └── proxy/               # Proxy al backend
│   │
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home/landing
│   └── globals.css              # Tailwind imports
│
├── components/                   # Componentes React
│   ├── ui/                      # Shadcn/ui primitivos
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   └── ...
│   │
│   ├── forms/                   # Form components
│   │   ├── application/         # Solicitud (6 steps)
│   │   │   ├── ApplicationForm.tsx        # Container principal
│   │   │   ├── Step1Personal.tsx          # Datos personales
│   │   │   ├── Step2Address.tsx           # Dirección/vivienda
│   │   │   ├── Step3Credit.tsx            # Solicitud crédito
│   │   │   ├── Step4Employment.tsx        # Actividad económica
│   │   │   ├── Step5Financial.tsx         # Ingresos/gastos
│   │   │   ├── Step6Documents.tsx         # Carga archivos
│   │   │   └── StepNavigation.tsx         # Navegación pasos
│   │   │
│   │   ├── evaluation/          # Evaluación (6 tabs)
│   │   │   ├── EvaluationForm.tsx         # Container principal
│   │   │   ├── Tab1Summary.tsx            # Resumen solicitud
│   │   │   ├── Tab2Validation.tsx         # Validación comercial
│   │   │   ├── Tab3Financial.tsx          # Análisis financiero
│   │   │   ├── Tab4Proposal.tsx           # Propuesta asesor
│   │   │   ├── Tab5Committee.tsx          # Mesa de crédito
│   │   │   └── Tab6Contingency.tsx        # Análisis contingencia
│   │   │
│   │   └── shared/              # Componentes compartidos
│   │       ├── FormField.tsx              # Wrapper campo con label/error
│   │       ├── FileUpload.tsx             # Upload archivos
│   │       ├── CurrencyInput.tsx          # Input moneda
│   │       ├── DatePicker.tsx             # Selector fecha
│   │       └── LoadingSpinner.tsx         # Spinner
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── AuthGuard.tsx
│   │
│   └── dashboard/               # Dashboard components
│       ├── ApplicationsList.tsx
│       ├── StatusBadge.tsx
│       └── FiltersBar.tsx
│
├── lib/                         # Utilidades
│   ├── api/                     # Cliente API
│   │   ├── client.ts            # Axios instance configurado
│   │   ├── applications.ts      # Endpoints applications
│   │   ├── evaluations.ts       # Endpoints evaluations
│   │   └── auth.ts              # Endpoints auth
│   │
│   ├── validations/             # Zod schemas
│   │   ├── application.schema.ts          # Schema solicitud
│   │   ├── evaluation.schema.ts           # Schema evaluación
│   │   └── shared.schema.ts               # Schemas compartidos
│   │
│   ├── storage/                 # Persistencia local
│   │   ├── sessionStorage.ts              # Helpers sessionStorage
│   │   └── formCache.ts                   # Cache formularios
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useMultiStepForm.ts            # Hook multi-step
│   │   ├── useFormPersistence.ts          # Hook persistencia
│   │   ├── useFileUpload.ts               # Hook upload archivos
│   │   └── useAuth.ts                     # Hook autenticación
│   │
│   ├── utils/                   # Helpers
│   │   ├── formatters.ts                  # Format moneda/fecha/etc
│   │   ├── validators.ts                  # Validaciones custom
│   │   ├── calculators.ts                 # Cálculos financieros
│   │   └── cn.ts                          # classnames helper
│   │
│   └── types/                   # TypeScript types
│       ├── api.types.ts                   # Tipos del backend
│       ├── form.types.ts                  # Tipos de formularios
│       └── index.ts                       # Re-exports
│
├── tests/                       # Tests
│   ├── unit/                    # Tests unitarios
│   │   ├── validations/
│   │   ├── utils/
│   │   └── hooks/
│   │
│   ├── integration/             # Tests integración
│   │   ├── forms/
│   │   └── api/
│   │
│   └── e2e/                     # Tests end-to-end
│       ├── application.spec.ts
│       └── evaluation.spec.ts
│
├── public/                      # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── .env.local                   # Variables entorno
├── .env.example
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
├── vitest.config.ts             # Vitest config
├── playwright.config.ts         # Playwright config
├── package.json
├── CLAUDE.md                    # Guía para Claude Code
└── README.md                    # Documentación

```

---

## 📋 FORMULARIO 1: SOLICITUD DE CRÉDITO

### **Características**
- ✅ 6 pasos progresivos
- ✅ Sin autenticación requerida
- ✅ Mobile-first responsive
- ✅ Persistencia en sessionStorage
- ✅ Validación por paso
- ✅ Navegación adelante/atrás
- ✅ Upload de archivos (max 5MB)
- ✅ Preview antes de enviar
- ✅ Loading states

### **Flujo de Pasos**

#### **Step 1: Datos Personales**
```typescript
{
  firstName: string;              // Requerido
  lastName: string;               // Requerido
  idNumber: string;               // Requerido, formato cédula
  birthDate: string;              // Requerido, mayor de edad
  gender: 'masculino' | 'femenino' | 'otro';
  maritalStatus: 'soltero' | 'casado' | 'union_libre' | 'divorciado' | 'viudo';
  idIssueDate: string;            // Requerido
  mobile: string;                 // Requerido, 10 dígitos
  email?: string;                 // Opcional, validación email
  phone?: string;                 // Opcional
}
```

**Validaciones**:
- Nombres: min 2 caracteres, solo letras
- Cédula: formato colombiano, Luhn algorithm
- Fecha nacimiento: edad >= 18 años
- Móvil: formato 3XX XXX XXXX

#### **Step 2: Dirección y Vivienda**
```typescript
{
  municipality: string;           // Requerido, select
  address: string;                // Requerido
  vereda?: string;                // Opcional
  housingType: 'propia' | 'arrendada' | 'familiar' | 'otra';
  monthlyIncome: number;          // Requerido, > 0
}
```

**Validaciones**:
- Dirección: min 10 caracteres
- Ingreso mensual: > salario mínimo ($1,300,000)

#### **Step 3: Solicitud de Crédito**
```typescript
{
  product: string;                // Requerido, select productos
  requestedAmount: number;        // Requerido, min/max según producto
  termMonths: number;             // Requerido, 6-60 meses
  monthlyPayment: string;         // Auto-calculado
  paymentPeriod: 'mensual' | 'quincenal' | 'semanal';
  bank: string;                   // Requerido, select bancos
  accountType: 'ahorros' | 'corriente';
  accountNumber: string;          // Requerido, 10-16 dígitos
}
```

**Validaciones**:
- Monto según producto:
  - Microcrédito: $500K - $50M
  - Consumo: $1M - $20M
- Plazo: según producto
- Cálculo cuota: PMT = P * (r * (1+r)^n) / ((1+r)^n - 1)

#### **Step 4: Actividad Económica**
```typescript
{
  economicActivity: string;       // Requerido, select actividades
  activityMunicipality: string;   // Requerido
  employerAddress?: string;       // Opcional
  hireDate?: string;              // Opcional
}
```

**Validaciones**:
- Si es empleado: employerAddress y hireDate requeridos
- Si es independiente: descripción de actividad

#### **Step 5: Información Financiera**
```typescript
{
  familyIncome?: number;          // Opcional
  otherIncome?: number;           // Opcional
  totalIncome: number;            // Auto-suma

  foodExpense?: number;
  rentExpense?: number;
  utilitiesExpense?: number;
  transportExpense?: number;
  otherExpense?: number;
  totalExpense: number;           // Auto-suma

  netBalance: number;             // Auto: totalIncome - totalExpense
}
```

**Validaciones**:
- totalIncome >= monthlyIncome (Step 2)
- netBalance > 0 (capacidad de pago)
- Alerta si netBalance < monthlyPayment (Step 3)

#### **Step 6: Documentos**
```typescript
{
  bankCert: File;                 // Requerido, PDF max 5MB
  idFront: File;                  // Requerido, JPG/PNG max 5MB
  idBack: File;                   // Requerido, JPG/PNG max 5MB
  photoProfile: File;             // Requerido, JPG/PNG max 5MB

  signature: string;              // Base64 firma canvas
  termsConsent: boolean;          // Requerido
  privacyConsent: boolean;        // Requerido
}
```

**Validaciones**:
- Archivos: tipo, tamaño, MIME type
- Firma: canvas drawing requerido
- Consentimientos: ambos true

### **Envío y Respuesta**

**POST /api/v1/applications**
```typescript
// Envío
FormData {
  applicationData: JSON.stringify({...}),
  bankCert: File,
  idFront: File,
  idBack: File,
  photoProfile: File
}

// Respuesta 201
{
  success: true,
  applicationNumber: "APP-2026-001",
  applicationId: 1,
  customerId: 1,
  batchId: 1,
  message: "Solicitud creada exitosamente"
}
```

**Navegación post-envío**: Redirect a `/confirmacion/APP-2026-001`

---

## 📋 FORMULARIO 2: EVALUACIÓN DE CRÉDITO

### **Características**
- ✅ 6 pestañas horizontales (tabs)
- ✅ Requiere autenticación (JWT)
- ✅ Desktop-first responsive
- ✅ Auto-guardado cada 30s
- ✅ Validación final pre-envío
- ✅ Cálculos automáticos
- ✅ Campos condicionales
- ✅ Read-only para Tab 1

### **Flujo de Tabs**

#### **Tab 1: Resumen de Solicitud** (Read-only)
```typescript
{
  applicationNumber: string;
  submittedAt: Date;

  personalInfo: {
    fullName: string;
    identification: string;
    birthDate: string;
    gender: string;
    maritalStatus: string;
  };

  creditRequest: {
    product: string;
    requestedAmount: number;
    termMonths: number;
  };

  financialInfo: {
    totalIncome: number;
    totalExpenses: number;
    paymentCapacity: number;
  };

  documents: [
    { name: 'bankCert', url: string },
    { name: 'idFront', url: string },
    // ...
  ];
}
```

**Features**:
- Vista de solo lectura
- Links para ver documentos
- Resumen financiero con gráficas

#### **Tab 2: Validación Comercial**
```typescript
{
  commercial_validated: boolean;       // Toggle
  commercial_comments?: string;        // Textarea

  docs_validated: boolean;             // Toggle
  docs_comments?: string;              // Textarea
}
```

**Validaciones**:
- Si commercial_validated = false → commercial_comments requerido

#### **Tab 3: Análisis Financiero**
```typescript
{
  // Assets
  assets_property: number;
  assets_vehicles: number;
  assets_inventory: number;
  assets_accounts: number;
  assets_other: number;
  totalAssets: number;              // Auto-suma

  // Liabilities
  liabilities_loans: number;
  liabilities_cards: number;
  liabilities_suppliers: number;
  liabilities_other: number;
  totalLiabilities: number;         // Auto-suma

  equity: number;                   // Auto: assets - liabilities

  // Income
  income_sales: number;
  income_services: number;
  income_other: number;
  income_family: number;
  totalIncome: number;              // Auto-suma

  // Expenses
  expense_cost: number;
  expense_operating: number;
  expense_personal: number;
  totalExpenses: number;            // Auto-suma

  // Capacity
  grossCapacity: number;            // Auto: income - expenses

  deduction_familyLoad: number;
  deduction_otherObligations: number;
  deduction_living: number;
  totalDeductions: number;          // Auto-suma

  netCapacity: number;              // Auto: gross - deductions
}
```

**Validaciones**:
- netCapacity > 0 (requerido para aprobar)
- equity = totalAssets - totalLiabilities
- Cálculos automáticos en tiempo real

#### **Tab 4: Propuesta del Asesor**
```typescript
{
  proposal_amount: number;          // Requerido, <= requestedAmount
  proposal_termMonths: number;      // Requerido, <= termMonths
  proposal_rate: number;            // Requerido, tasa anual %

  proposal_monthlyPayment: number;  // Auto-calculado
  proposal_totalPayment: number;    // Auto-calculado
  proposal_totalInterest: number;   // Auto-calculado

  proposal_comments?: string;       // Opcional
}
```

**Validaciones**:
- proposal_amount <= requestedAmount
- Cálculo automático cuota con tasa de interés:
  ```
  r = proposal_rate / 12 / 100
  n = proposal_termMonths
  PMT = proposal_amount * (r * (1+r)^n) / ((1+r)^n - 1)
  ```

#### **Tab 5: Mesa de Crédito**
```typescript
{
  mesa_decision: 'aprobado' | 'rechazado' | 'condicional';  // Requerido
  mesa_conditions?: string;                                  // Si condicional

  mesa_sarlaft_pep: boolean;                                // Validación SARLAFT
  mesa_sarlaft_lists: boolean;
  mesa_sarlaft_adverse: boolean;

  mesa_comments?: string;
}
```

**Validaciones**:
- Si decision = 'condicional' → mesa_conditions requerido
- Todos los checks SARLAFT deben ser false para aprobar

#### **Tab 6: Análisis de Contingencia** (Condicional)
```typescript
// Campos dinámicos según economicActivity (Tab 1)

// Si "Comercio"
{
  contingency_commerce_inventory: number;
  contingency_commerce_salesVolume: number;
  contingency_commerce_suppliers: string;
  contingency_commerce_location: string;
  contingency_commerce_competition: string;
}

// Si "Servicios"
{
  contingency_services_clients: number;
  contingency_services_avgTicket: number;
  contingency_services_equipment: string;
  contingency_services_licenses: string;
  contingency_services_staff: number;
}

// Si "Manufactura"
{
  contingency_manufacturing_capacity: string;
  contingency_manufacturing_machinery: string;
  contingency_manufacturing_rawMaterials: string;
  contingency_manufacturing_production: string;
  contingency_manufacturing_distribution: string;
}

// Si "Agropecuario"
{
  contingency_agriculture_landSize: string;
  contingency_agriculture_crops: string;
  contingency_agriculture_livestock: string;
  contingency_agriculture_equipment: string;
  contingency_agriculture_climate: string;
}
```

**Validaciones**:
- Renderizar solo campos según economicActivity
- Al menos 3 de 5 campos requeridos por categoría

### **Envío y Respuesta**

**POST /api/v1/evaluations**
```typescript
// Envío
{
  applicationNumber: "APP-2026-001",
  evaluatedBy: "user@example.com",
  ...allTabsData
}

// Respuesta 201
{
  success: true,
  applicationNumber: "APP-2026-001",
  loanId: 1,
  decision: "aprobado",
  status: "approved",
  message: "Evaluación completada"
}
```

---

## 🔐 AUTENTICACIÓN

### **Estrategia**: NextAuth.js + JWT

```typescript
// lib/auth/auth.config.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Llamar a backend para validar credenciales
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });

        if (!res.ok) return null;

        const user = await res.json();
        return user;
      }
    })
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 horas
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
```

### **Protected Routes**
```typescript
// app/(auth)/layout.tsx
import { auth } from '@/lib/auth/auth.config';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

---

## 💾 PERSISTENCIA LOCAL

### **SessionStorage Strategy**
```typescript
// lib/storage/formCache.ts

export interface FormCache<T> {
  data: T;
  step?: number;
  timestamp: number;
  version: string;
}

export class FormStorage<T> {
  private key: string;
  private version: string = '1.0';

  constructor(formId: string) {
    this.key = `form_${formId}`;
  }

  save(data: Partial<T>, step?: number): void {
    if (typeof window === 'undefined') return;

    const cache: FormCache<T> = {
      data: data as T,
      step,
      timestamp: Date.now(),
      version: this.version
    };

    sessionStorage.setItem(this.key, JSON.stringify(cache));
  }

  load(): FormCache<T> | null {
    if (typeof window === 'undefined') return null;

    const cached = sessionStorage.getItem(this.key);
    if (!cached) return null;

    try {
      const parsed = JSON.parse(cached) as FormCache<T>;

      // Invalidar si es de otra versión o muy antiguo (>24h)
      const age = Date.now() - parsed.timestamp;
      if (parsed.version !== this.version || age > 86400000) {
        this.clear();
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(this.key);
  }
}
```

### **Hook de Persistencia**
```typescript
// lib/hooks/useFormPersistence.ts
import { useEffect } from 'react';
import { FormStorage } from '@/lib/storage/formCache';

export function useFormPersistence<T>(
  formId: string,
  data: T,
  currentStep?: number
) {
  const storage = new FormStorage<T>(formId);

  // Auto-guardar cada 30s
  useEffect(() => {
    const interval = setInterval(() => {
      storage.save(data, currentStep);
    }, 30000);

    return () => clearInterval(interval);
  }, [data, currentStep]);

  // Guardar al cambiar de paso
  useEffect(() => {
    storage.save(data, currentStep);
  }, [currentStep]);

  // Limpiar al desmontar (submit exitoso)
  const clearCache = () => storage.clear();

  return { clearCache };
}
```

---

## ✅ VALIDACIONES

### **Zod Schemas**

#### **Application Schema**
```typescript
// lib/validations/application.schema.ts
import { z } from 'zod';

export const step1Schema = z.object({
  firstName: z.string().min(2, 'Mínimo 2 caracteres').regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres').regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras'),
  idNumber: z.string().regex(/^\d{7,10}$/, 'Cédula inválida'),
  birthDate: z.string().refine((date) => {
    const age = calculateAge(new Date(date));
    return age >= 18 && age <= 80;
  }, 'Debe ser mayor de edad'),
  gender: z.enum(['masculino', 'femenino', 'otro']),
  maritalStatus: z.enum(['soltero', 'casado', 'union_libre', 'divorciado', 'viudo']),
  idIssueDate: z.string(),
  mobile: z.string().regex(/^3\d{9}$/, 'Móvil inválido (10 dígitos)'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
});

export const step2Schema = z.object({
  municipality: z.string().min(1, 'Requerido'),
  address: z.string().min(10, 'Mínimo 10 caracteres'),
  vereda: z.string().optional(),
  housingType: z.enum(['propia', 'arrendada', 'familiar', 'otra']),
  monthlyIncome: z.number().min(1300000, 'Debe ser >= salario mínimo'),
});

export const step3Schema = z.object({
  product: z.string().min(1, 'Requerido'),
  requestedAmount: z.number().min(500000, 'Mínimo $500.000').max(50000000, 'Máximo $50.000.000'),
  termMonths: z.number().min(6, 'Mínimo 6 meses').max(60, 'Máximo 60 meses'),
  monthlyPayment: z.string(),
  paymentPeriod: z.enum(['mensual', 'quincenal', 'semanal']),
  bank: z.string().min(1, 'Requerido'),
  accountType: z.enum(['ahorros', 'corriente']),
  accountNumber: z.string().regex(/^\d{10,16}$/, 'Cuenta inválida'),
});

export const step4Schema = z.object({
  economicActivity: z.string().min(1, 'Requerido'),
  activityMunicipality: z.string().min(1, 'Requerido'),
  employerAddress: z.string().optional(),
  hireDate: z.string().optional(),
});

export const step5Schema = z.object({
  familyIncome: z.number().optional(),
  otherIncome: z.number().optional(),
  totalIncome: z.number(),
  foodExpense: z.number().optional(),
  rentExpense: z.number().optional(),
  utilitiesExpense: z.number().optional(),
  transportExpense: z.number().optional(),
  otherExpense: z.number().optional(),
  totalExpense: z.number(),
  netBalance: z.number().refine((val) => val > 0, 'Capacidad de pago debe ser positiva'),
});

export const step6Schema = z.object({
  signature: z.string().min(1, 'Firma requerida'),
  termsConsent: z.literal(true, { errorMap: () => ({ message: 'Debe aceptar términos' }) }),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Debe aceptar política' }) }),
});

// Schema completo
export const applicationSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
  ...step5Schema.shape,
  ...step6Schema.shape,
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
```

#### **Evaluation Schema**
```typescript
// lib/validations/evaluation.schema.ts
import { z } from 'zod';

export const tab2Schema = z.object({
  commercial_validated: z.boolean(),
  commercial_comments: z.string().optional(),
  docs_validated: z.boolean(),
  docs_comments: z.string().optional(),
}).refine(
  (data) => data.commercial_validated || data.commercial_comments,
  { message: 'Comentarios requeridos si no está validado', path: ['commercial_comments'] }
);

export const tab3Schema = z.object({
  assets_property: z.number().nonnegative(),
  assets_vehicles: z.number().nonnegative(),
  assets_inventory: z.number().nonnegative(),
  assets_accounts: z.number().nonnegative(),
  assets_other: z.number().nonnegative(),
  totalAssets: z.number(),

  liabilities_loans: z.number().nonnegative(),
  liabilities_cards: z.number().nonnegative(),
  liabilities_suppliers: z.number().nonnegative(),
  liabilities_other: z.number().nonnegative(),
  totalLiabilities: z.number(),

  equity: z.number(),

  income_sales: z.number().nonnegative(),
  income_services: z.number().nonnegative(),
  income_other: z.number().nonnegative(),
  income_family: z.number().nonnegative(),
  totalIncome: z.number().positive('Debe tener ingresos'),

  expense_cost: z.number().nonnegative(),
  expense_operating: z.number().nonnegative(),
  expense_personal: z.number().nonnegative(),
  totalExpenses: z.number(),

  grossCapacity: z.number(),

  deduction_familyLoad: z.number().nonnegative(),
  deduction_otherObligations: z.number().nonnegative(),
  deduction_living: z.number().nonnegative(),
  totalDeductions: z.number(),

  netCapacity: z.number().positive('Capacidad de pago debe ser positiva'),
});

export const tab4Schema = z.object({
  proposal_amount: z.number().positive('Monto requerido'),
  proposal_termMonths: z.number().min(6).max(60),
  proposal_rate: z.number().min(0.1).max(60, 'Tasa inválida'),
  proposal_monthlyPayment: z.number(),
  proposal_totalPayment: z.number(),
  proposal_totalInterest: z.number(),
  proposal_comments: z.string().optional(),
});

export const tab5Schema = z.object({
  mesa_decision: z.enum(['aprobado', 'rechazado', 'condicional']),
  mesa_conditions: z.string().optional(),
  mesa_sarlaft_pep: z.boolean(),
  mesa_sarlaft_lists: z.boolean(),
  mesa_sarlaft_adverse: z.boolean(),
  mesa_comments: z.string().optional(),
}).refine(
  (data) => data.mesa_decision !== 'condicional' || data.mesa_conditions,
  { message: 'Condiciones requeridas si decisión es condicional', path: ['mesa_conditions'] }
);

export const evaluationSchema = z.object({
  applicationNumber: z.string(),
  ...tab2Schema.shape,
  ...tab3Schema.shape,
  ...tab4Schema.shape,
  ...tab5Schema.shape,
  // Tab 6 es condicional
});

export type EvaluationFormData = z.infer<typeof evaluationSchema>;
```

---

## 🧪 ESTRATEGIA DE TESTING

### **1. Unit Tests (Vitest)**
```typescript
// tests/unit/validations/application.test.ts
import { describe, it, expect } from 'vitest';
import { step1Schema } from '@/lib/validations/application.schema';

describe('Application Step 1 Validation', () => {
  it('should validate correct personal data', () => {
    const data = {
      firstName: 'Juan',
      lastName: 'Pérez',
      idNumber: '1234567890',
      birthDate: '1990-01-01',
      gender: 'masculino',
      maritalStatus: 'soltero',
      idIssueDate: '2010-01-01',
      mobile: '3001234567',
      email: 'juan@example.com',
    };

    expect(() => step1Schema.parse(data)).not.toThrow();
  });

  it('should reject invalid mobile number', () => {
    const data = {
      // ... valid data
      mobile: '12345', // Invalid
    };

    expect(() => step1Schema.parse(data)).toThrow();
  });

  it('should reject underage', () => {
    const data = {
      // ... valid data
      birthDate: new Date().toISOString().split('T')[0], // Today
    };

    expect(() => step1Schema.parse(data)).toThrow();
  });
});
```

```typescript
// tests/unit/utils/calculators.test.ts
import { describe, it, expect } from 'vitest';
import { calculateMonthlyPayment } from '@/lib/utils/calculators';

describe('Financial Calculators', () => {
  it('should calculate correct monthly payment', () => {
    const payment = calculateMonthlyPayment({
      amount: 10000000,  // $10M
      termMonths: 12,
      annualRate: 24,    // 24% EA
    });

    expect(payment).toBeCloseTo(962358, 0);
  });

  it('should handle zero rate', () => {
    const payment = calculateMonthlyPayment({
      amount: 12000000,
      termMonths: 12,
      annualRate: 0,
    });

    expect(payment).toBe(1000000); // amount / termMonths
  });
});
```

### **2. Integration Tests (Vitest + MSW)**
```typescript
// tests/integration/forms/application.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ApplicationForm } from '@/components/forms/application/ApplicationForm';
import { server } from '@/tests/mocks/server';
import { http, HttpResponse } from 'msw';

describe('Application Form Integration', () => {
  it('should complete full application flow', async () => {
    const { container } = render(<ApplicationForm />);

    // Step 1: Personal
    fireEvent.change(screen.getByLabelText(/Nombres/i), {
      target: { value: 'Juan' }
    });
    fireEvent.change(screen.getByLabelText(/Apellidos/i), {
      target: { value: 'Pérez' }
    });
    // ... fill all fields

    fireEvent.click(screen.getByText(/Siguiente/i));

    // Step 2: Address
    await waitFor(() => {
      expect(screen.getByText(/Dirección/i)).toBeInTheDocument();
    });

    // ... complete all steps

    // Step 6: Submit
    fireEvent.click(screen.getByText(/Enviar Solicitud/i));

    await waitFor(() => {
      expect(screen.getByText(/Solicitud enviada/i)).toBeInTheDocument();
    });
  });

  it('should validate each step before proceeding', async () => {
    render(<ApplicationForm />);

    // Try to proceed without filling
    fireEvent.click(screen.getByText(/Siguiente/i));

    await waitFor(() => {
      expect(screen.getByText(/Nombres.*requerido/i)).toBeInTheDocument();
    });
  });

  it('should restore form from sessionStorage', async () => {
    // Simulate saved data
    const savedData = { firstName: 'Juan', lastName: 'Pérez' };
    sessionStorage.setItem('form_application', JSON.stringify({
      data: savedData,
      step: 1,
      timestamp: Date.now(),
      version: '1.0'
    }));

    render(<ApplicationForm />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Nombres/i)).toHaveValue('Juan');
      expect(screen.getByLabelText(/Apellidos/i)).toHaveValue('Pérez');
    });
  });
});
```

### **3. E2E Tests (Playwright)**
```typescript
// tests/e2e/application.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Application Form E2E', () => {
  test('should submit complete application successfully', async ({ page }) => {
    await page.goto('/solicitud');

    // Step 1
    await page.fill('[name="firstName"]', 'Juan');
    await page.fill('[name="lastName"]', 'Pérez');
    await page.fill('[name="idNumber"]', '1234567890');
    await page.fill('[name="birthDate"]', '1990-01-01');
    await page.selectOption('[name="gender"]', 'masculino');
    await page.selectOption('[name="maritalStatus"]', 'soltero');
    await page.fill('[name="idIssueDate"]', '2010-01-01');
    await page.fill('[name="mobile"]', '3001234567');
    await page.fill('[name="email"]', 'juan@example.com');

    await page.click('button:has-text("Siguiente")');

    // Step 2
    await expect(page.locator('h2:has-text("Dirección")')).toBeVisible();
    await page.selectOption('[name="municipality"]', 'Bogotá');
    await page.fill('[name="address"]', 'Calle 123 #45-67');
    await page.selectOption('[name="housingType"]', 'propia');
    await page.fill('[name="monthlyIncome"]', '5000000');

    await page.click('button:has-text("Siguiente")');

    // ... complete all steps

    // Step 6: Upload files
    await page.setInputFiles('[name="bankCert"]', 'tests/fixtures/bank-cert.pdf');
    await page.setInputFiles('[name="idFront"]', 'tests/fixtures/id-front.jpg');
    await page.setInputFiles('[name="idBack"]', 'tests/fixtures/id-back.jpg');
    await page.setInputFiles('[name="photoProfile"]', 'tests/fixtures/photo.jpg');

    // Draw signature
    await page.locator('canvas[data-testid="signature-canvas"]').click();

    await page.check('[name="termsConsent"]');
    await page.check('[name="privacyConsent"]');

    await page.click('button:has-text("Enviar Solicitud")');

    // Verify success
    await expect(page).toHaveURL(/\/confirmacion\/APP-\d+-\d+/);
    await expect(page.locator('text=Solicitud enviada exitosamente')).toBeVisible();
  });

  test('should preserve form data on page refresh', async ({ page }) => {
    await page.goto('/solicitud');

    // Fill step 1
    await page.fill('[name="firstName"]', 'Juan');
    await page.fill('[name="lastName"]', 'Pérez');

    // Wait for auto-save (30s)
    await page.waitForTimeout(31000);

    // Reload page
    await page.reload();

    // Verify data persists
    await expect(page.locator('[name="firstName"]')).toHaveValue('Juan');
    await expect(page.locator('[name="lastName"]')).toHaveValue('Pérez');
  });
});
```

### **Test Coverage Target**
- **Unit**: 90%+ (utils, validators, calculators)
- **Integration**: 80%+ (components, forms, hooks)
- **E2E**: Critical paths (happy path + error scenarios)

---

## 🚀 PERFORMANCE OPTIMIZATIONS

### **1. Next.js Optimizations**
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimizaciones de producción
  swcMinify: true,

  // Optimizar imágenes
  images: {
    domains: ['storage.googleapis.com', 'n8n.example.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Comprimir respuestas
  compress: true,

  // Optimizar bundles
  experimental: {
    optimizePackageImports: ['@shadcn/ui', 'lucide-react'],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### **2. Code Splitting**
```typescript
// Lazy loading de componentes pesados
import dynamic from 'next/dynamic';

const SignatureCanvas = dynamic(
  () => import('@/components/forms/shared/SignatureCanvas'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
);

const FinancialCharts = dynamic(
  () => import('@/components/dashboard/FinancialCharts'),
  { loading: () => <ChartsSkeleton /> }
);
```

### **3. Data Fetching**
```typescript
// Server Components para data fetching
// app/(auth)/dashboard/page.tsx
import { auth } from '@/lib/auth/auth.config';
import { getApplications } from '@/lib/api/applications';

export default async function DashboardPage() {
  const session = await auth();

  // Fetch en el servidor
  const applications = await getApplications({
    status: 'submitted',
    limit: 20
  });

  return (
    <div>
      <ApplicationsList data={applications} />
    </div>
  );
}
```

### **4. Caching Strategy**
```typescript
// lib/api/client.ts
import axios from 'axios';
import { cache } from 'react';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache de React para deduplicate requests
export const getCachedApplication = cache(async (id: string) => {
  const res = await apiClient.get(`/applications/${id}`);
  return res.data;
});
```

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints (Tailwind)**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

### **Estrategia Mobile-First**
```typescript
// Formulario Solicitud: Mobile-first
<div className="
  flex flex-col gap-4          /* Mobile: stack vertical */
  md:flex-row md:gap-6         /* Desktop: horizontal */
  lg:max-w-4xl lg:mx-auto      /* Desktop: centrado con max-width */
">
  <FormField />
  <FormField />
</div>

// Formulario Evaluación: Desktop-first
<div className="
  hidden md:block               /* Solo visible en desktop */
">
  <Tabs orientation="horizontal" />
</div>

<div className="
  md:hidden                     /* Solo visible en mobile */
">
  <Accordion />  {/* Tabs → Accordion en móvil */}
</div>
```

---

## 🎨 UI/UX COMPONENTS (Shadcn/ui)

### **Instalación Base**
```bash
npx shadcn@latest init
npx shadcn@latest add button input select textarea label
npx shadcn@latest add card tabs progress alert dialog
npx shadcn@latest add form checkbox radio-group
npx shadcn@latest add dropdown-menu popover tooltip
npx shadcn@latest add calendar badge separator
```

### **Componentes Custom**

#### **FileUpload Component**
```typescript
// components/forms/shared/FileUpload.tsx
import { useState } from 'react';
import { Upload, X, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FileUploadProps {
  name: string;
  label: string;
  accept: string;
  maxSize: number; // MB
  value?: File;
  onChange: (file: File | null) => void;
  error?: string;
}

export function FileUpload({
  name,
  label,
  accept,
  maxSize,
  value,
  onChange,
  error
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Archivo muy grande. Máximo ${maxSize}MB`);
      return;
    }

    // Preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      {!value ? (
        <label className={cn(
          "flex flex-col items-center justify-center w-full h-32",
          "border-2 border-dashed rounded-lg cursor-pointer",
          "hover:bg-gray-50 transition",
          error && "border-red-500"
        )}>
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">Click para subir</span>
          <span className="text-xs text-gray-400">Máx {maxSize}MB</span>
          <input
            type="file"
            name={name}
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          {preview ? (
            <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded" />
          ) : (
            <FileCheck className="w-8 h-8 text-green-600" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{value.name}</p>
            <p className="text-xs text-gray-500">{(value.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1 hover:bg-red-100 rounded"
          >
            <X className="w-5 h-5 text-red-600" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
```

#### **CurrencyInput Component**
```typescript
// components/forms/shared/CurrencyInput.tsx
import { Input } from '@/components/ui/input';
import { formatCurrency, parseCurrency } from '@/lib/utils/formatters';

interface CurrencyInputProps {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  disabled?: boolean;
}

export function CurrencyInput({
  name,
  label,
  value,
  onChange,
  error,
  disabled
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(
    value ? formatCurrency(value) : ''
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numeric = parseCurrency(input);

    setDisplayValue(input);
    onChange(numeric);
  };

  const handleBlur = () => {
    if (value) {
      setDisplayValue(formatCurrency(value));
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          $
        </span>
        <Input
          type="text"
          name={name}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={cn("pl-7", error && "border-red-500")}
          placeholder="0"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
```

---

## 🔌 API CLIENT

```typescript
// lib/api/client.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor para JWT
    this.client.interceptors.request.use(async (config) => {
      if (typeof window !== 'undefined') {
        const session = await getSession();
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
      }
      return config;
    });

    // Response interceptor para errores
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getInstance() {
    return this.client;
  }
}

export const apiClient = new APIClient().getInstance();
```

```typescript
// lib/api/applications.ts
import { apiClient } from './client';
import type { ApplicationData, ApplicationResponse, ApplicationDetails } from '@/lib/types/api.types';

export async function createApplication(
  data: ApplicationData,
  files: Record<string, File>
): Promise<ApplicationResponse> {
  const formData = new FormData();
  formData.append('applicationData', JSON.stringify(data));

  Object.entries(files).forEach(([key, file]) => {
    formData.append(key, file);
  });

  const response = await apiClient.post<ApplicationResponse>(
    '/applications',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000, // 1 minuto para upload
    }
  );

  return response.data;
}

export async function getApplication(
  applicationNumber: string
): Promise<ApplicationDetails> {
  const response = await apiClient.get<ApplicationDetails>(
    `/applications/${applicationNumber}`
  );
  return response.data;
}

export async function getApplications(filters: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<ApplicationDetails[]> {
  const response = await apiClient.get<ApplicationDetails[]>(
    '/applications',
    { params: filters }
  );
  return response.data;
}
```

---

## 📦 PACKAGE.JSON

```json
{
  "name": "finazactivos-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 8000",
    "build": "next build",
    "start": "next start -p 8000",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "clean": "rm -rf .next out"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0-beta.25",

    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.10.0",

    "axios": "^1.7.9",

    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-select": "^2.1.5",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-label": "^2.1.1",

    "tailwindcss": "^4.0.0",
    "@tailwindcss/forms": "^0.5.9",

    "lucide-react": "^0.468.0",
    "date-fns": "^4.1.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.7.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",

    "typescript": "^5.7.2",

    "vitest": "^2.1.8",
    "@vitejs/plugin-react": "^4.3.4",
    "@vitest/coverage-v8": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/user-event": "^14.5.2",

    "@playwright/test": "^1.49.1",

    "msw": "^2.7.0",

    "eslint": "^9.18.0",
    "eslint-config-next": "^15.1.0",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",

    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

---

## 🌍 ENVIRONMENT VARIABLES

```bash
# .env.example

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# NextAuth
NEXTAUTH_URL=http://localhost:8000
NEXTAUTH_SECRET=your-super-secret-key-here-change-in-production

# Auth Provider (opcional si backend maneja auth)
AUTH_BACKEND_URL=http://localhost:3000/api/v1/auth

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE_MB=5

# App Config
NEXT_PUBLIC_APP_NAME=FINAZACTIVOS
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## 📋 RECOMENDACIONES CLAUDE.MD

```markdown
# CLAUDE.md (Para el nuevo proyecto frontend)

Este archivo guía a Claude Code al trabajar en el frontend de FINAZACTIVOS.

---

## 📋 PROYECTO

**FINAZACTIVOS Frontend** - Portal de solicitud y evaluación de créditos

**Stack**: Next.js 15 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + Shadcn/ui

**Puerto**: 8000 (frontend), 3000 (backend API)

**Estado**: En desarrollo

---

## 🏗️ ARQUITECTURA

### Estructura App Router (Next.js 15)

```
app/
├── (auth)/          # Rutas autenticadas (evaluación, dashboard)
├── (public)/        # Rutas públicas (solicitud, confirmación)
├── api/             # API Routes (proxy, auth)
└── layout.tsx       # Root layout
```

**Importante**: Usamos grupos de rutas `(auth)` y `(public)` para aplicar layouts diferentes según autenticación.

### Componentes

```
components/
├── ui/              # Primitivos Shadcn/ui (button, input, etc)
├── forms/           # Forms específicos (application, evaluation)
├── layout/          # Layout components (header, footer, sidebar)
└── dashboard/       # Dashboard components
```

**Convención**:
- Componentes UI en `components/ui/` son de Shadcn/ui (no modificar directamente)
- Componentes custom en `components/forms/`, `components/layout/`, etc.
- Cada form tiene su carpeta (application, evaluation) con steps/tabs como archivos separados

### Utilidades

```
lib/
├── api/             # Cliente API (axios)
├── validations/     # Schemas Zod
├── storage/         # SessionStorage helpers
├── hooks/           # Custom hooks
├── utils/           # Helpers (formatters, validators, calculators)
└── types/           # TypeScript types
```

---

## 🔑 CONCEPTOS CLAVE

### **Multi-Step Forms**

Ambos formularios (solicitud y evaluación) usan `useMultiStepForm` hook:

```typescript
const {
  currentStep,
  isFirstStep,
  isLastStep,
  goToNext,
  goToPrevious,
  goToStep
} = useMultiStepForm(totalSteps);
```

**Persistencia**: Cada paso se guarda automáticamente en sessionStorage cada 30s y al cambiar de paso.

### **Validación**

Usamos React Hook Form + Zod:

```typescript
const form = useForm({
  resolver: zodResolver(step1Schema),
  defaultValues: initialData
});
```

**Por qué Zod**: Type-safe, composable, mensajes de error claros, integración perfecta con React Hook Form.

### **Server Components vs Client Components**

- **Server Components** (default): Fetch data, layouts, páginas estáticas
- **Client Components** (`'use client'`): Forms, interactividad, hooks, event handlers

**Regla**: Solo usa `'use client'` cuando necesites hooks, eventos o estado. El resto déjalo como Server Component.

### **API Client**

Axios configurado con:
- Interceptor para JWT automático
- Base URL desde env
- Error handling (401 → redirect login)
- Timeout 30s (60s para uploads)

```typescript
import { apiClient } from '@/lib/api/client';

// Usar en Server Components o Server Actions
const data = await apiClient.get('/applications/123');
```

---

## 📝 FORMULARIOS

### **Solicitud (6 pasos)**

1. Datos Personales
2. Dirección y Vivienda
3. Solicitud de Crédito
4. Actividad Económica
5. Información Financiera
6. Documentos y Firma

**URL**: `/solicitud`
**Autenticación**: No requerida
**Persistencia**: SessionStorage key `form_application`
**Endpoint**: `POST /api/v1/applications`

### **Evaluación (6 tabs)**

1. Resumen (read-only)
2. Validación Comercial
3. Análisis Financiero
4. Propuesta del Asesor
5. Mesa de Crédito
6. Análisis de Contingencia (condicional)

**URL**: `/evaluacion/[applicationNumber]`
**Autenticación**: JWT requerido
**Persistencia**: Auto-guardado cada 30s
**Endpoint**: `POST /api/v1/evaluations`

---

## 🧪 TESTING

### **Unit Tests (Vitest)**

```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Qué testear**:
- Validaciones Zod (schemas)
- Calculadores financieros (utils/calculators.ts)
- Formatters (utils/formatters.ts)
- Hooks custom

### **Integration Tests (Vitest + Testing Library)**

**Qué testear**:
- Flujos completos de formularios
- Persistencia sessionStorage
- Navegación entre pasos/tabs
- Validación por paso

### **E2E Tests (Playwright)**

```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # UI mode
```

**Qué testear**:
- Happy path completo (solicitud end-to-end)
- Upload de archivos
- Submit y redirect
- Error scenarios

---

## 🚫 ERRORES COMUNES

### **1. "Module not found" en imports**

**Causa**: Alias `@/` no configurado o mal usado

**Solución**: Verificar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### **2. "Hydration failed" en Next.js**

**Causa**: Contenido diferente entre servidor y cliente (ej: dates, random values)

**Solución**:
```typescript
// Malo
<div>{new Date().toLocaleString()}</div>

// Bueno
'use client';
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

### **3. "Session not found" en API calls**

**Causa**: JWT no se envía o expiró

**Solución**:
- Verificar que `apiClient` tenga interceptor configurado
- Verificar que NextAuth session esté activa
- Renovar token si expiró

### **4. FormData no llega al backend**

**Causa**: Falta header `multipart/form-data` o JSON.stringify mal usado

**Solución**:
```typescript
const formData = new FormData();
formData.append('applicationData', JSON.stringify(data)); // ✅ JSON.stringify
formData.append('file', file); // ✅ File object directo

await apiClient.post('/applications', formData, {
  headers: { 'Content-Type': 'multipart/form-data' } // ✅
});
```

---

## 🔧 COMANDOS

### **Desarrollo**
```bash
npm run dev               # Start dev server en puerto 8000
npm run build             # Build para producción
npm start                 # Start producción
```

### **Quality**
```bash
npm run lint              # ESLint
npm run type-check        # TypeScript check
```

### **Testing**
```bash
npm run test              # Unit + Integration
npm run test:e2e          # E2E
```

### **Shadcn/ui**
```bash
npx shadcn@latest add button    # Agregar componente
npx shadcn@latest add dialog    # Agregar otro
```

---

## 📚 DOCUMENTACIÓN

### **Next.js 15**
- App Router: https://nextjs.org/docs/app
- Server Components: https://react.dev/reference/rsc/server-components
- Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions

### **React Hook Form + Zod**
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/

### **Shadcn/ui**
- Components: https://ui.shadcn.com/docs/components
- Installation: https://ui.shadcn.com/docs/installation/next

### **Testing**
- Vitest: https://vitest.dev/
- Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Playwright: https://playwright.dev/

---

## ⚠️ REGLAS IMPORTANTES

### **1. SIEMPRE usar tipos del backend**

Los tipos en `lib/types/api.types.ts` deben coincidir 100% con el backend (`backend/api/src/types/`).

**Cómo sincronizar**:
1. Copiar tipos del backend
2. Adaptar nombres (PascalCase)
3. NO inventar campos nuevos

### **2. NUNCA modificar componentes Shadcn/ui directamente**

Los componentes en `components/ui/` son de Shadcn/ui. Si necesitas modificar:

```typescript
// ❌ Malo: Modificar Button.tsx directamente

// ✅ Bueno: Crear variant o wrapper
<Button variant="custom" className="my-custom-class">
  Click me
</Button>
```

### **3. SIEMPRE validar con Zod antes de enviar**

```typescript
// ❌ Malo: Enviar sin validar
await apiClient.post('/applications', data);

// ✅ Bueno: Validar primero
const validated = applicationSchema.parse(data);
await apiClient.post('/applications', validated);
```

### **4. SIEMPRE persistir formularios en sessionStorage**

Usa `useFormPersistence` hook en todos los formularios multi-paso:

```typescript
const { clearCache } = useFormPersistence('application', formData, currentStep);

// Al submit exitoso
onSuccess(() => {
  clearCache(); // Limpiar cache
});
```

### **5. NUNCA hardcodear URLs o credenciales**

Usa variables de entorno:

```typescript
// ❌ Malo
const API_URL = 'http://localhost:3000';

// ✅ Bueno
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

---

## 🔄 FLUJO DE DESARROLLO

### **Agregar nuevo componente**

1. Crear en `components/[categoria]/NombreComponente.tsx`
2. Agregar tipos en `lib/types/[categoria].types.ts`
3. Agregar tests en `tests/unit/components/[categoria]/`
4. Usar en página/form

### **Agregar nuevo endpoint API**

1. Agregar función en `lib/api/[recurso].ts`
2. Agregar tipos en `lib/types/api.types.ts`
3. Agregar mock en `tests/mocks/handlers.ts`
4. Usar con `apiClient`

### **Agregar nuevo paso en formulario**

1. Crear schema Zod en `lib/validations/`
2. Crear componente en `components/forms/[form]/Step[N][Name].tsx`
3. Agregar al array de steps en `[Form]Form.tsx`
4. Agregar tests de validación

---

## 📊 MÉTRICAS DE CALIDAD

### **Targets**

- **Type Coverage**: 100% (TypeScript strict)
- **Test Coverage**: 85%+
- **Bundle Size**: < 200KB (first load JS)
- **Lighthouse Score**: 90+ (all metrics)
- **Build Time**: < 60s

### **Verificar**

```bash
npm run build             # Verifica bundle size
npm run test:coverage     # Verifica coverage
npx playwright test       # Verifica E2E
```

---

## 🚀 DEPLOYMENT

### **Build de producción**

```bash
npm run build
npm start
```

### **Variables de entorno**

Crear `.env.production`:
```bash
NEXT_PUBLIC_API_URL=https://api.finazactivos.com/api/v1
NEXTAUTH_URL=https://app.finazactivos.com
NEXTAUTH_SECRET=[RANDOM-SECRET-HERE]
```

### **Checklist pre-deploy**

- [ ] Tests pasan (unit + integration + E2E)
- [ ] Type-check pasa
- [ ] Lint pasa
- [ ] Build exitoso
- [ ] Variables de entorno configuradas
- [ ] API backend accesible desde frontend

---

**Tech Stack**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Shadcn/ui, React Hook Form, Zod, Vitest, Playwright

**Última actualización**: 2026-03-27
```

---

## 🎯 PLAN DE IMPLEMENTACIÓN (3 SEMANAS)

### **Semana 1: Setup + Solicitud**

**Día 1-2: Setup**
- [ ] Crear proyecto Next.js 15
- [ ] Configurar TypeScript, Tailwind, ESLint
- [ ] Instalar dependencias (React Hook Form, Zod, Axios, Shadcn/ui)
- [ ] Configurar NextAuth
- [ ] Setup estructura de carpetas
- [ ] Configurar API client
- [ ] Crear tipos base (copiar del backend)

**Día 3-7: Formulario Solicitud**
- [ ] Layout público + header/footer
- [ ] Multi-step container + navegación
- [ ] Step 1: Datos Personales + validación
- [ ] Step 2: Dirección + validación
- [ ] Step 3: Crédito + cálculo cuota
- [ ] Step 4: Actividad Económica
- [ ] Step 5: Info Financiera + cálculos
- [ ] Step 6: Upload archivos + firma
- [ ] Persistencia sessionStorage
- [ ] Integrar con backend API
- [ ] Página confirmación

### **Semana 2: Evaluación**

**Día 8-9: Setup Evaluación**
- [ ] Layout autenticado + sidebar
- [ ] AuthGuard middleware
- [ ] Tabs container
- [ ] Tab 1: Resumen (read-only)
- [ ] Fetch datos de solicitud

**Día 10-14: Tabs Evaluación**
- [ ] Tab 2: Validación Comercial
- [ ] Tab 3: Análisis Financiero + cálculos
- [ ] Tab 4: Propuesta + cálculo PMT
- [ ] Tab 5: Mesa de Crédito + SARLAFT
- [ ] Tab 6: Contingencia condicional
- [ ] Auto-guardado cada 30s
- [ ] Integrar con backend API
- [ ] Dashboard lista solicitudes

### **Semana 3: Testing + Polish**

**Día 15-16: Testing**
- [ ] Unit tests: validators, calculators, formatters
- [ ] Integration tests: form flows, persistence
- [ ] E2E tests: happy paths, error scenarios
- [ ] Fix issues encontrados

**Día 17-18: UI/UX Polish**
- [ ] Loading states (skeletons, spinners)
- [ ] Error states (boundaries, fallbacks)
- [ ] Toast notifications
- [ ] Responsive mobile/tablet
- [ ] Accessibility (ARIA, keyboard nav)

**Día 19-21: Deployment Prep**
- [ ] Build optimizations
- [ ] Performance audit (Lighthouse)
- [ ] Security audit (headers, CSP)
- [ ] Documentation (README, CLAUDE.md)
- [ ] Demo data seeds
- [ ] Deploy staging
- [ ] Deploy production

---

## 📊 RESUMEN DE DECISIONES TÉCNICAS

| Decisión | Alternativa | Por qué elegimos |
|----------|-------------|------------------|
| **Next.js 15 App Router** | Pages Router, Remix, Vite+React | RSC, Server Actions, mejor DX, performance |
| **Shadcn/ui** | MUI, Chakra, Ant Design | Tailwind-based, customizable, tree-shakeable |
| **React Hook Form** | Formik, React Final Form | Performance, bundle size, DX |
| **Zod** | Yup, Joi, AJV | Type-safe, composable, mejor con RHF |
| **Vitest** | Jest | Más rápido, ESM nativo, mejor DX |
| **Playwright** | Cypress, Selenium | Cross-browser, mejor para CI/CD |
| **NextAuth** | Auth0, Clerk | Open source, flexible, self-hosted |
| **SessionStorage** | LocalStorage, IndexedDB | Auto-clear al cerrar tab, más seguro |

---

## ✅ CHECKLIST FINAL

**Arquitectura**
- [x] Estructura modular y escalable
- [x] Separación clara de responsabilidades
- [x] Tipos compartidos con backend
- [x] API client configurado

**Formularios**
- [x] 6 pasos solicitud (mobile-first)
- [x] 6 tabs evaluación (desktop-first)
- [x] Validación Zod por paso/tab
- [x] Persistencia sessionStorage
- [x] Cálculos automáticos
- [x] Upload archivos

**Testing**
- [x] Strategy unit/integration/E2E
- [x] Coverage target 85%+
- [x] CI/CD ready

**Performance**
- [x] Code splitting
- [x] Image optimization
- [x] Bundle size < 200KB
- [x] RSC + Server Actions

**UX**
- [x] Loading states
- [x] Error handling
- [x] Responsive design
- [x] Accessibility

**Documentación**
- [x] CLAUDE.md completo
- [x] README con setup
- [x] Tipos documentados
- [x] Ejemplos de uso

---

**Versión**: 1.0
**Autor**: Propuesta generada para proyecto FINAZACTIVOS
**Fecha**: 2026-03-27
**Status**: ✅ Listo para implementar
