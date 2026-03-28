# FINAZACTIVOS Frontend

Portal de solicitud y evaluación de créditos con Next.js 15 + TypeScript + Tailwind CSS.

**Version**: 1.0.0
**Stack**: Next.js 15 App Router, React 19, TypeScript 5, Shadcn/ui, React Hook Form, Zod

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Backend API running on port 3000

### Installation

```bash
# Clone or create project
npx create-next-app@latest finazactivos-frontend --typescript --tailwind --app --eslint

cd finazactivos-frontend

# Install dependencies
npm install react-hook-form zod @hookform/resolvers zod axios next-auth lucide-react date-fns clsx tailwind-merge

# Install dev dependencies
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @playwright/test msw

# Setup Shadcn/ui
npx shadcn@latest init

# Add Shadcn components
npx shadcn@latest add button input select textarea label card tabs progress alert dialog form checkbox radio-group

# Setup env
cp .env.example .env.local
```

### Configuration

**`.env.local`**:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXTAUTH_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32
```

### Run

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Tests
npm run test
npm run test:e2e
```

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Protected routes
│   │   ├── evaluacion/[id]/
│   │   └── dashboard/
│   ├── (public)/        # Public routes
│   │   ├── solicitud/
│   │   └── confirmacion/[number]/
│   └── api/             # API routes (proxy, auth)
│
├── components/
│   ├── ui/              # Shadcn/ui primitives
│   ├── forms/           # Application & Evaluation forms
│   ├── layout/          # Header, Footer, Sidebar
│   └── dashboard/       # Dashboard components
│
├── lib/
│   ├── api/             # API client (axios)
│   ├── validations/     # Zod schemas
│   ├── storage/         # SessionStorage helpers
│   ├── hooks/           # Custom hooks
│   ├── utils/           # Formatters, validators, calculators
│   └── types/           # TypeScript types
│
└── tests/
    ├── unit/            # Vitest unit tests
    ├── integration/     # Integration tests
    └── e2e/             # Playwright E2E tests
```

---

## 📝 Forms

### Form 1: Application (Client)

**URL**: `/solicitud`
**Auth**: Not required
**Steps**: 6 (Personal → Address → Credit → Employment → Financial → Documents)

**Features**:
- Multi-step wizard
- Session persistence
- Zod validation per step
- File uploads (max 5MB)
- Signature canvas
- Mobile-first responsive

**Submit**: `POST /api/v1/applications`

### Form 2: Evaluation (Advisor)

**URL**: `/evaluacion/[applicationNumber]`
**Auth**: JWT required
**Tabs**: 6 (Summary → Validation → Financial → Proposal → Committee → Contingency)

**Features**:
- Tabbed interface
- Auto-save every 30s
- Financial calculations
- Conditional sections
- Desktop-first responsive

**Submit**: `POST /api/v1/evaluations`

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Test**:
- Zod schemas
- Calculators (PMT, totals)
- Formatters (currency, date)
- Validators (custom logic)
- Custom hooks

### Integration Tests (Vitest + Testing Library)

**Test**:
- Form flows (all steps)
- Session persistence
- Navigation (steps/tabs)
- API calls (MSW mocks)

### E2E Tests (Playwright)

```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # UI mode
```

**Test**:
- Complete application flow
- File uploads
- Submit + redirect
- Error handling

---

## 🔐 Authentication

**NextAuth.js + JWT**

Protected routes use `(auth)` group with server-side session check:

```typescript
// app/(auth)/layout.tsx
export default async function AuthLayout({ children }) {
  const session = await auth();
  if (!session) redirect('/login');
  return <>{children}</>;
}
```

API client auto-injects JWT token in requests.

---

## 💾 Persistence

**SessionStorage** for form state:

- Auto-save every 30s
- Save on step change
- Restore on page load
- Clear on successful submit

```typescript
// Usage
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';

const { clearCache } = useFormPersistence('application', formData, currentStep);
```

---

## ✅ Validation

**Zod + React Hook Form**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema } from '@/lib/validations/application.schema';

const form = useForm({
  resolver: zodResolver(step1Schema),
  defaultValues: cachedData || {}
});
```

**Schema per step/tab** for granular validation.

---

## 🎨 UI Components

**Shadcn/ui** (Tailwind-based):

```bash
# Add component
npx shadcn@latest add button

# Use
import { Button } from '@/components/ui/button';
<Button variant="default">Click me</Button>
```

**Custom components**:
- `FileUpload`: Drag-drop file upload with preview
- `CurrencyInput`: Auto-formatted currency input
- `SignatureCanvas`: Canvas for electronic signature
- `DatePicker`: Date selector with validation

---

## 🔌 API Client

**Axios** with interceptors:

```typescript
import { apiClient } from '@/lib/api/client';

// Auto-includes JWT
const response = await apiClient.get('/applications/123');

// Upload files
const formData = new FormData();
formData.append('applicationData', JSON.stringify(data));
formData.append('file', file);
await apiClient.post('/applications', formData);
```

**Features**:
- Auto JWT injection
- Auto redirect on 401
- 30s timeout (60s for uploads)
- Request/response logging

---

## 📊 Scripts

```bash
# Development
npm run dev               # Start dev server (port 8000)

# Build
npm run build             # Production build
npm start                 # Start production server

# Quality
npm run lint              # ESLint
npm run type-check        # TypeScript check

# Testing
npm run test              # Unit + Integration tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run test:e2e          # E2E tests (Playwright)
npm run test:e2e:ui       # E2E UI mode

# Clean
npm run clean             # Remove .next/
```

---

## 🌍 Environment Variables

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# NextAuth
NEXTAUTH_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-key

# Optional
NEXT_PUBLIC_MAX_FILE_SIZE_MB=5
NEXT_PUBLIC_APP_NAME=FINAZACTIVOS
```

**Public vars** (client-side): Prefix with `NEXT_PUBLIC_*`
**Private vars** (server-side only): No prefix

---

## 📚 Documentation

- **PROPUESTA_FRONTEND.md** - Full technical proposal (architecture, validation, testing)
- **CLAUDE.md** - Guide for Claude Code (concepts, workflows, common errors)
- **API Backend** - `../finazactivos/backend/api/` (types reference)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Docker

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

### Pre-deploy Checklist

- [ ] Tests pass
- [ ] Type-check passes
- [ ] Build succeeds
- [ ] `.env.production` configured
- [ ] Backend API accessible
- [ ] CORS configured in backend

---

## 🔑 Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15 | React framework (App Router) |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4 | Utility-first CSS |
| **Shadcn/ui** | Latest | UI components |
| **React Hook Form** | 7 | Form state management |
| **Zod** | 3 | Schema validation |
| **Axios** | 1.7 | HTTP client |
| **NextAuth** | 5 | Authentication |
| **Vitest** | 2 | Unit/integration testing |
| **Playwright** | 1 | E2E testing |

---

## 📝 Type Synchronization

**Critical**: Types in `lib/types/api.types.ts` MUST match backend types:

```bash
# Sync types from backend
cp ../finazactivos/backend/api/src/types/application.types.ts lib/types/
cp ../finazactivos/backend/api/src/types/evaluation.types.ts lib/types/

# Adapt naming if needed (keep compatibility)
```

**Backend reference**: `../finazactivos/backend/api/src/types/`

---

## 🐛 Troubleshooting

### Port already in use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Module not found

```bash
# Clear cache
rm -rf .next node_modules
npm install
```

### Type errors

```bash
# Check types
npm run type-check

# Sync with backend types (see Type Synchronization)
```

### Tests failing

```bash
# Check backend is running
curl http://localhost:3000/health

# Clear test cache
npm run test -- --clearCache
```

---

## 📞 Support

**Backend API**: http://localhost:3000/api/v1
**API Docs**: http://localhost:3000/api-docs (Swagger)
**Repository**: `../finazactivos`

---

**License**: ISC
**Version**: 1.0.0
**Last Updated**: 2026-03-27
