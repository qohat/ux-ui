# CLAUDE.md - Template para Frontend FINAZACTIVOS

**Este archivo debe copiarse al nuevo proyecto frontend como `CLAUDE.md`**

---

# CLAUDE.md

Este archivo guía a Claude Code al trabajar en el frontend de FINAZACTIVOS.

---

## 📋 PROYECTO

**FINAZACTIVOS Frontend** - Portal de solicitud y evaluación de créditos

**Stack**: Next.js 15 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + Shadcn/ui

**Puerto**: 8000 (frontend), 3000 (backend API)

**Backend Repository**: `../finazactivos` (proyecto principal)

**Estado**: ✅ En desarrollo

---

## 🏗️ ARQUITECTURA

### App Router Structure

```
app/
├── (auth)/          # Rutas autenticadas
│   ├── evaluacion/[id]/    # Formulario evaluación
│   ├── dashboard/          # Lista solicitudes
│   └── layout.tsx          # Auth layout + guard
├── (public)/        # Rutas públicas
│   ├── solicitud/          # Formulario solicitud
│   ├── confirmacion/[number]/
│   └── layout.tsx          # Public layout
├── api/             # API Routes
│   ├── auth/               # NextAuth endpoints
│   └── proxy/              # Proxy al backend
├── layout.tsx       # Root layout
├── page.tsx         # Landing page
└── globals.css      # Tailwind imports
```

**Grupos de rutas**:
- `(auth)` - Requieren JWT, redirect si no autenticado
- `(public)` - Acceso libre, sin autenticación

### Components Structure

```
components/
├── ui/              # Shadcn/ui primitivos (NO MODIFICAR)
├── forms/
│   ├── application/ # Solicitud (6 steps)
│   └── evaluation/  # Evaluación (6 tabs)
├── layout/          # Header, Footer, Sidebar
└── dashboard/       # Dashboard components
```

### Lib Structure

```
lib/
├── api/             # API client (axios + interceptors)
├── validations/     # Zod schemas
├── storage/         # SessionStorage helpers
├── hooks/           # Custom hooks (useMultiStepForm, etc)
├── utils/           # Formatters, validators, calculators
└── types/           # TypeScript types (sync con backend)
```

---

## 🔑 CONCEPTOS CLAVE

### Multi-Step Forms

Ambos formularios usan el hook `useMultiStepForm`:

```typescript
import { useMultiStepForm } from '@/lib/hooks/useMultiStepForm';

const { currentStep, isFirstStep, isLastStep, goToNext, goToPrevious } =
  useMultiStepForm(6);
```

**Persistencia automática**: SessionStorage cada 30s y al cambiar de paso.

### Validación: React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '@/lib/validations/application.schema';

const form = useForm({
  resolver: zodResolver(step1Schema),
  defaultValues: cachedData || initialValues
});
```

**Por qué Zod**: Type-safe, composable, integración perfecta con RHF.

### Server Components vs Client Components

**Default**: Server Components (sin `'use client'`)
**Client**: Solo cuando necesites hooks, eventos, estado

```typescript
// ❌ Malo: Client Component innecesario
'use client';
export default function Page() {
  return <div>Static content</div>;
}

// ✅ Bueno: Server Component
export default function Page() {
  return <div>Static content</div>;
}

// ✅ Bueno: Client Component solo cuando necesario
'use client';
export default function InteractiveForm() {
  const [data, setData] = useState({});
  // ...
}
```

### API Client

Axios configurado con interceptors:

```typescript
import { apiClient } from '@/lib/api/client';

// Auto-incluye JWT token
const response = await apiClient.get('/applications/123');
```

**Features**:
- Auto-inject JWT desde NextAuth
- Auto-redirect a /login si 401
- Timeout 30s (60s para uploads)

---

## 📝 FORMULARIOS

### Formulario 1: Solicitud (6 pasos)

**URL**: `/solicitud`
**Auth**: NO requerida
**Endpoint**: `POST /api/v1/applications`

**Pasos**:
1. Datos Personales (firstName, lastName, idNumber, birthDate, gender, maritalStatus, mobile, email)
2. Dirección (municipality, address, housingType, monthlyIncome)
3. Crédito (product, requestedAmount, termMonths, bank, accountNumber)
4. Actividad Económica (economicActivity, activityMunicipality)
5. Información Financiera (income, expenses, netBalance)
6. Documentos (bankCert, idFront, idBack, photoProfile, signature, consents)

**Validación**: Zod schema por paso (step1Schema, step2Schema, etc.)

**Persistencia**: SessionStorage key `form_application`

**Envío**: FormData con `applicationData` JSON + archivos

### Formulario 2: Evaluación (6 tabs)

**URL**: `/evaluacion/[applicationNumber]`
**Auth**: JWT requerido
**Endpoint**: `POST /api/v1/evaluations`

**Tabs**:
1. Resumen (read-only - datos de solicitud)
2. Validación Comercial (commercial_validated, docs_validated, comments)
3. Análisis Financiero (assets, liabilities, equity, income, expenses, capacity)
4. Propuesta Asesor (proposal_amount, termMonths, rate, monthlyPayment)
5. Mesa de Crédito (decision, sarlaft checks, conditions)
6. Análisis Contingencia (condicional según economicActivity)

**Validación**: Zod schema por tab (tab2Schema, tab3Schema, etc.)

**Auto-guardado**: Cada 30s automático

**Envío**: JSON completo con todos los tabs

---

## 🧪 TESTING

### Unit Tests (Vitest)

```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Qué testear**:
- ✅ Zod schemas (validación correcta e incorrecta)
- ✅ Calculadores financieros (PMT, totales, etc.)
- ✅ Formatters (currency, date, etc.)
- ✅ Validators (custom validation logic)
- ✅ Custom hooks (useMultiStepForm, useFormPersistence)

**Ubicación**: `tests/unit/`

### Integration Tests (Vitest + Testing Library)

**Qué testear**:
- ✅ Flujos completos de formularios (todos los pasos)
- ✅ Persistencia sessionStorage (save/restore)
- ✅ Navegación entre pasos/tabs
- ✅ Validación por paso (no permite avanzar si inválido)
- ✅ API calls (usando MSW mocks)

**Ubicación**: `tests/integration/`

### E2E Tests (Playwright)

```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # UI mode
```

**Qué testear**:
- ✅ Happy path solicitud completa
- ✅ Upload de archivos
- ✅ Submit exitoso + redirect
- ✅ Error handling (red states, mensajes)
- ✅ Persistencia en refresh

**Ubicación**: `tests/e2e/`

---

## 🚫 ERRORES COMUNES

### 1. Module not found en imports

**Error**: `Cannot find module '@/components/...'`

**Causa**: Alias `@/` no configurado

**Solución**: Verificar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 2. Hydration failed

**Error**: `Error: Hydration failed because the initial UI does not match what was rendered on the server`

**Causa**: Contenido diferente entre server y client (dates, random values, etc.)

**Solución**:
```typescript
'use client';
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null; // Evita SSR
```

### 3. Session not found

**Error**: 401 en API calls autenticados

**Causa**: JWT no se envía o expiró

**Solución**:
```typescript
// Verificar que apiClient tenga interceptor
// Verificar que NextAuth session esté activa
import { useSession } from 'next-auth/react';
const { data: session } = useSession();
console.log(session); // Debug
```

### 4. FormData no llega al backend

**Error**: Backend no recibe archivos o applicationData

**Causa**: Formato incorrecto de FormData

**Solución**:
```typescript
const formData = new FormData();
formData.append('applicationData', JSON.stringify(data)); // ✅ JSON.stringify
formData.append('bankCert', file); // ✅ File object directo

await apiClient.post('/applications', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

### 5. Zod validation error no se muestra

**Error**: Validación falla pero no hay mensaje en UI

**Causa**: No se conectó error de RHF con UI

**Solución**:
```typescript
<FormField
  control={form.control}
  name="firstName"
  render={({ field, fieldState }) => (
    <div>
      <Input {...field} />
      {fieldState.error && (
        <p className="text-red-600">{fieldState.error.message}</p>
      )}
    </div>
  )}
/>
```

---

## 🔧 COMANDOS

### Desarrollo
```bash
npm run dev               # Dev server en puerto 8000
npm run build             # Build producción
npm start                 # Start producción
```

### Quality
```bash
npm run lint              # ESLint
npm run type-check        # TypeScript check sin compilar
```

### Testing
```bash
npm run test              # Unit + Integration
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run test:e2e          # E2E con Playwright
```

### Shadcn/ui
```bash
npx shadcn@latest add button    # Agregar componente
npx shadcn@latest add input     # Agregar input
npx shadcn@latest add tabs      # Agregar tabs
```

---

## 📚 DOCUMENTACIÓN CLAVE

### Next.js 15
- **App Router**: https://nextjs.org/docs/app
- **Server Components**: https://react.dev/reference/rsc/server-components
- **Server Actions**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- **Routing**: https://nextjs.org/docs/app/building-your-application/routing

### React Hook Form + Zod
- **React Hook Form**: https://react-hook-form.com/
- **Zod**: https://zod.dev/
- **Integration**: https://react-hook-form.com/get-started#SchemaValidation

### Shadcn/ui
- **Components**: https://ui.shadcn.com/docs/components
- **Installation**: https://ui.shadcn.com/docs/installation/next
- **Theming**: https://ui.shadcn.com/docs/theming

### Testing
- **Vitest**: https://vitest.dev/
- **Testing Library**: https://testing-library.com/docs/react-testing-library/intro/
- **Playwright**: https://playwright.dev/

---

## ⚠️ REGLAS CRÍTICAS

### 1. SIEMPRE sincronizar tipos con backend

Los tipos en `lib/types/api.types.ts` DEBEN coincidir 100% con backend.

**Proceso**:
1. Copiar tipos de `backend/api/src/types/application.types.ts` y `evaluation.types.ts`
2. Adaptar nombres si necesario (mantener compatibilidad)
3. NO inventar campos nuevos sin coordinación con backend

**Verificación**:
```bash
# Comparar tipos
diff lib/types/api.types.ts ../finazactivos/backend/api/src/types/application.types.ts
```

### 2. NUNCA modificar componentes Shadcn/ui

Los componentes en `components/ui/` son de Shadcn/ui. NO modificar directamente.

**Si necesitas customizar**:
```typescript
// ❌ Malo: Modificar Button.tsx

// ✅ Bueno: Usar className o variants
<Button className="custom-class">Click</Button>

// ✅ Bueno: Crear wrapper
export function PrimaryButton(props) {
  return <Button variant="default" className="bg-blue-600" {...props} />;
}
```

### 3. SIEMPRE validar antes de enviar

```typescript
// ❌ Malo: Enviar sin validar
await apiClient.post('/applications', data);

// ✅ Bueno: Validar primero
const validated = applicationSchema.parse(data);
await apiClient.post('/applications', validated);

// ✅ Mejor: React Hook Form ya valida
const onSubmit = form.handleSubmit(async (data) => {
  // data ya está validado por Zod
  await apiClient.post('/applications', data);
});
```

### 4. SIEMPRE persistir formularios multi-paso

Usa `useFormPersistence` hook:

```typescript
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';

const { clearCache } = useFormPersistence('application', formData, currentStep);

// Al submit exitoso
const onSuccess = () => {
  clearCache(); // Limpiar cache
  router.push(`/confirmacion/${applicationNumber}`);
};
```

### 5. NUNCA hardcodear URLs o secretos

```typescript
// ❌ Malo
const API_URL = 'http://localhost:3000';
const SECRET = 'my-secret-key';

// ✅ Bueno
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SECRET = process.env.NEXTAUTH_SECRET;
```

**Variables públicas**: Prefijo `NEXT_PUBLIC_*`
**Variables privadas**: Sin prefijo (solo server-side)

---

## 🔄 FLUJOS DE TRABAJO

### Agregar nuevo componente

1. **Crear archivo**: `components/[categoria]/ComponentName.tsx`
2. **Agregar tipos**: `lib/types/[categoria].types.ts` si aplica
3. **Agregar tests**: `tests/unit/components/[categoria]/ComponentName.test.tsx`
4. **Usar**: Import en página/formulario

**Ejemplo**:
```bash
# Crear componente
touch components/forms/shared/DatePicker.tsx

# Agregar tests
touch tests/unit/components/forms/DatePicker.test.tsx

# Usar
import { DatePicker } from '@/components/forms/shared/DatePicker';
```

### Agregar nuevo endpoint API

1. **Agregar función**: `lib/api/[recurso].ts`
   ```typescript
   export async function getApplications() {
     const response = await apiClient.get('/applications');
     return response.data;
   }
   ```

2. **Agregar tipos**: `lib/types/api.types.ts`
   ```typescript
   export interface ApplicationListItem {
     application_id: string;
     // ...
   }
   ```

3. **Agregar mock**: `tests/mocks/handlers.ts`
   ```typescript
   http.get('/api/v1/applications', () => {
     return HttpResponse.json([{ application_id: '1' }]);
   })
   ```

4. **Usar**: En Server Component o Client Component
   ```typescript
   const applications = await getApplications();
   ```

### Agregar nuevo paso en formulario

1. **Crear schema Zod**: `lib/validations/application.schema.ts`
   ```typescript
   export const step7Schema = z.object({
     // ...
   });
   ```

2. **Crear componente**: `components/forms/application/Step7Name.tsx`
   ```typescript
   export function Step7Name({ form }) {
     // ...
   }
   ```

3. **Agregar al array**: `components/forms/application/ApplicationForm.tsx`
   ```typescript
   const steps = [
     <Step1Personal />,
     // ...
     <Step7Name />
   ];
   ```

4. **Agregar tests**: `tests/integration/forms/application-step7.test.tsx`

### Agregar validación custom

1. **Crear en utils**: `lib/utils/validators.ts`
   ```typescript
   export function validateColombiaCedula(cedula: string): boolean {
     // Luhn algorithm
     // ...
   }
   ```

2. **Usar en Zod schema**: `lib/validations/application.schema.ts`
   ```typescript
   idNumber: z.string().refine(validateColombiaCedula, {
     message: 'Cédula inválida'
   })
   ```

3. **Agregar tests**: `tests/unit/utils/validators.test.ts`
   ```typescript
   it('should validate correct cedula', () => {
     expect(validateColombiaCedula('1234567890')).toBe(true);
   });
   ```

---

## 📊 MÉTRICAS DE CALIDAD

### Targets

| Métrica | Target | Herramienta |
|---------|--------|-------------|
| **Type Coverage** | 100% | TypeScript strict |
| **Test Coverage** | 85%+ | Vitest |
| **Bundle Size (First Load)** | < 200KB | Next.js build |
| **Lighthouse Performance** | 90+ | Lighthouse |
| **Lighthouse Accessibility** | 95+ | Lighthouse |
| **Build Time** | < 60s | Next.js build |

### Verificar

```bash
# Type coverage
npm run type-check

# Test coverage
npm run test:coverage

# Bundle size
npm run build
# Ver output en terminal

# Lighthouse (en dev)
npx lighthouse http://localhost:8000 --view

# Build time
time npm run build
```

---

## 🚀 DEPLOYMENT

### Build de producción

```bash
npm run build
npm start
```

**Output**: Directorio `.next/`

### Variables de entorno

**Crear `.env.production`**:
```bash
# Backend API
NEXT_PUBLIC_API_URL=https://api.finazactivos.com/api/v1

# NextAuth
NEXTAUTH_URL=https://app.finazactivos.com
NEXTAUTH_SECRET=[GENERATE-RANDOM-SECRET]

# App Config
NEXT_PUBLIC_APP_NAME=FINAZACTIVOS
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**Generar secret**:
```bash
openssl rand -base64 32
```

### Checklist pre-deploy

- [ ] Tests pasan (`npm run test`)
- [ ] E2E pasan (`npm run test:e2e`)
- [ ] Type-check pasa (`npm run type-check`)
- [ ] Lint pasa (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Backend API accesible desde URL pública
- [ ] NextAuth secret generado
- [ ] CORS configurado en backend
- [ ] SSL/HTTPS configurado

### Deployment Targets

**Vercel** (Recomendado para Next.js):
```bash
npm i -g vercel
vercel --prod
```

**Docker**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
```

---

## 🔍 DEBUGGING

### Next.js Debugging

**Server Components**:
```typescript
export default async function Page() {
  console.log('This logs in terminal (server)');
  return <div>Page</div>;
}
```

**Client Components**:
```typescript
'use client';
export default function Page() {
  console.log('This logs in browser console');
  return <div>Page</div>;
}
```

### React Hook Form Debugging

```typescript
const form = useForm();

// Ver valores actuales
console.log(form.watch());

// Ver errores
console.log(form.formState.errors);

// Ver estado
console.log(form.formState.isDirty, form.formState.isValid);
```

### API Debugging

```typescript
// En lib/api/client.ts
apiClient.interceptors.request.use((config) => {
  console.log('Request:', config.method, config.url, config.data);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
```

---

## 📦 DEPENDENCIAS PRINCIPALES

```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-auth": "^5.0.0-beta.25",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.10.0",
    "axios": "^1.7.9",
    "tailwindcss": "^4.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "typescript": "^5.7.2",
    "vitest": "^2.1.8",
    "@playwright/test": "^1.49.1",
    "@testing-library/react": "^16.1.0",
    "msw": "^2.7.0"
  }
}
```

---

## 💡 TIPS Y MEJORES PRÁCTICAS

### Performance

1. **Lazy load componentes pesados**:
   ```typescript
   const SignatureCanvas = dynamic(() => import('./SignatureCanvas'), {
     loading: () => <Spinner />,
     ssr: false
   });
   ```

2. **Usar Server Components cuando sea posible**:
   ```typescript
   // ✅ Server Component (default)
   export default async function Page() {
     const data = await fetch('...');
     return <div>{data}</div>;
   }
   ```

3. **Memoizar cálculos pesados**:
   ```typescript
   const monthlyPayment = useMemo(() =>
     calculatePMT(amount, rate, term),
     [amount, rate, term]
   );
   ```

### Accessibility

1. **Siempre usar labels**:
   ```typescript
   <label htmlFor="firstName">Nombres</label>
   <input id="firstName" name="firstName" />
   ```

2. **ARIA attributes**:
   ```typescript
   <button aria-label="Cerrar modal" onClick={onClose}>
     <X />
   </button>
   ```

3. **Keyboard navigation**:
   ```typescript
   <div
     role="button"
     tabIndex={0}
     onKeyDown={(e) => e.key === 'Enter' && onClick()}
   >
     Click me
   </div>
   ```

### Security

1. **Sanitizar inputs**:
   ```typescript
   import DOMPurify from 'isomorphic-dompurify';
   const clean = DOMPurify.sanitize(userInput);
   ```

2. **Validar en cliente Y servidor**:
   ```typescript
   // Cliente: Zod
   const validated = schema.parse(data);

   // Servidor: API también valida
   ```

3. **No exponer secrets**:
   ```typescript
   // ❌ Malo
   const API_KEY = 'sk_live_...';

   // ✅ Bueno
   const API_KEY = process.env.API_KEY; // No NEXT_PUBLIC
   ```

---

**Tech Stack**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4, Shadcn/ui, React Hook Form, Zod, Vitest, Playwright

**Última actualización**: 2026-03-27
