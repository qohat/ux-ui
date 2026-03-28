# API Integration Guide

## Overview

The frontend application is fully integrated with the backend API for all data operations. This document describes the API integration architecture and available endpoints.

## Configuration

### Environment Variables

Configure the following variables in `.env.local`:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-key-here

# Optional
NEXT_PUBLIC_MAX_FILE_SIZE_MB=5
```

### API Client

The API client is configured in `lib/api/client.ts`:

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL`
- **Timeout**: 30 seconds (60 seconds for file uploads)
- **Authentication**: JWT token from localStorage
- **Error Handling**: Automatic 401 redirect to login

## API Modules

### 1. Applications API (`lib/api/applications.ts`)

#### `submitApplication(data, files)`
Submit a new credit application with documents.

**Request:**
- Method: `POST`
- Endpoint: `/applications`
- Content-Type: `multipart/form-data`
- Body: FormData with `applicationData` (JSON string) and files

**Response:**
```typescript
{
  success: boolean;
  applicationNumber: string;
  applicationId: string;
  message: string;
}
```

**Usage:**
```typescript
import { submitApplication } from '@/lib/api/applications';

const response = await submitApplication(formData, {
  bankCert: file1,
  idFront: file2,
  idBack: file3,
  photoProfile: file4,
});
```

#### `getApplications(filters?)`
Get list of applications with optional filtering.

**Request:**
- Method: `GET`
- Endpoint: `/applications`
- Query Params: `status`, `limit`, `offset`

**Response:**
```typescript
ApplicationListItem[] = [
  {
    application_id: string;
    application_number: string;
    requested_amount: string;
    status: ApplicationStatus;
    submitted_at: Date;
    identification: string;
    full_name: string;
    product_name: string;
  }
]
```

**Usage:**
```typescript
import { getApplications } from '@/lib/api/applications';

const applications = await getApplications({
  status: 'submitted',
  limit: 50
});
```

#### `getApplicationDetails(applicationNumber)`
Get detailed information for a specific application.

**Request:**
- Method: `GET`
- Endpoint: `/applications/{applicationNumber}`

**Response:**
```typescript
ApplicationDetails = {
  applicationNumber: string;
  applicationId: string;
  status: ApplicationStatus;
  submittedAt: Date;
  personalInfo: {...};
  creditRequest: {...};
  address: {...};
  contacts: [...];
  financialInfo: {...};
  metadata: {...};
}
```

**Usage:**
```typescript
import { getApplicationDetails } from '@/lib/api/applications';

const details = await getApplicationDetails('FA-2026-001');
```

---

### 2. Evaluations API (`lib/api/evaluations.ts`)

#### `submitEvaluation(data)`
Submit a complete evaluation for an application.

**Request:**
- Method: `POST`
- Endpoint: `/evaluations`
- Content-Type: `application/json`
- Body: Complete `EvaluationData` object

**Response:**
```typescript
{
  success: boolean;
  message: string;
  evaluationId?: string;
}
```

**Usage:**
```typescript
import { submitEvaluation } from '@/lib/api/evaluations';

const response = await submitEvaluation({
  applicationNumber: 'FA-2026-001',
  commercial_validated: true,
  mesa_decision: 'aprobado',
  // ... all other fields
});
```

#### `getEvaluationByApplicationNumber(applicationNumber)`
Get existing evaluation for an application.

**Request:**
- Method: `GET`
- Endpoint: `/evaluations/{applicationNumber}`

**Response:**
```typescript
EvaluationData | null
```

**Usage:**
```typescript
import { getEvaluationByApplicationNumber } from '@/lib/api/evaluations';

const evaluation = await getEvaluationByApplicationNumber('FA-2026-001');
// Returns null if evaluation doesn't exist (404)
```

#### `updateEvaluation(applicationNumber, data)`
Update an existing evaluation.

**Request:**
- Method: `PUT`
- Endpoint: `/evaluations/{applicationNumber}`
- Body: Partial `EvaluationData` object

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Usage:**
```typescript
import { updateEvaluation } from '@/lib/api/evaluations';

await updateEvaluation('FA-2026-001', {
  mesa_decision: 'aprobado',
  mesa_comments: 'Cliente aprobado con condiciones',
});
```

#### `saveEvaluationDraft(applicationNumber, data)`
Save partial evaluation data as draft.

**Request:**
- Method: `PATCH`
- Endpoint: `/evaluations/{applicationNumber}/draft`
- Body: Partial `EvaluationData` object

**Response:**
```typescript
{
  success: boolean;
  message: string;
}
```

**Usage:**
```typescript
import { saveEvaluationDraft } from '@/lib/api/evaluations';

await saveEvaluationDraft('FA-2026-001', {
  commercial_validated: true,
  commercial_comments: 'En proceso de validación',
});
```

---

## Error Handling

### HTTP Status Codes

The API client handles the following status codes:

- **200-299**: Success - returns response data
- **401 Unauthorized**: Automatically redirects to `/login` and clears auth token
- **403 Forbidden**: Logs error to console
- **404 Not Found**: Throws error (catch in component)
- **500+ Server Error**: Logs error and throws exception

### Error Response Format

```typescript
{
  success: false;
  error: string;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}
```

### Handling Errors in Components

```typescript
try {
  const response = await submitEvaluation(data);
  if (response.success) {
    // Success handling
  } else {
    alert('Error: ' + response.message);
  }
} catch (error: any) {
  const errorMessage = error.response?.data?.message || error.message;
  alert('Error: ' + errorMessage);
}
```

---

## Authentication

### JWT Token Management

1. **Login**: NextAuth handles authentication and stores session
2. **API Requests**:
   - Token is retrieved from `localStorage.getItem('auth_token')`
   - Automatically added to `Authorization: Bearer {token}` header
3. **Token Expiry**: 401 responses trigger automatic redirect to `/login`

### NextAuth Integration

The app uses NextAuth 5 with credentials provider:

```typescript
// lib/auth.ts
export const authConfig = {
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        // TODO: Replace with actual API call to backend
        // const user = await validateUser(credentials);
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 }, // 8 hours
};
```

---

## Form Persistence

### Local Storage

Forms automatically save to `sessionStorage` every 30 seconds:

- **Application Form**: `application-solicitud`
- **Evaluation Form**: `evaluation-{applicationNumber}`

### Auto-save Hook

The `useFormPersistence` hook (lib/hooks/useFormPersistence.ts) manages:
- Auto-save every 30 seconds
- Save on step/tab change
- Save on unmount
- Load saved data on mount

```typescript
const { save, load, clear } = useFormPersistence(
  'unique-form-key',
  form,
  currentStep
);
```

---

## Data Flow

### Application Submission Flow

1. User fills out 6-step application form
2. On submit:
   - Form validation (Zod schemas)
   - Files collected from FileUpload components
   - `submitApplication(data, files)` called
   - FormData sent to `/applications`
   - Response contains `applicationNumber`
   - Redirect to `/confirmacion/{applicationNumber}`
3. Session storage cleared on success

### Evaluation Flow

1. Advisor clicks "Evaluar" on application card
2. Navigate to `/evaluacion/{applicationNumber}`
3. Page loads:
   - Fetch `getApplicationDetails(applicationNumber)`
   - Fetch `getEvaluationByApplicationNumber(applicationNumber)`
   - If evaluation exists, pre-fill form
4. Advisor fills 6 tabs:
   - Auto-save to sessionStorage every 30s
   - Manual "Guardar Borrador" calls `saveEvaluationDraft()`
5. On final submit:
   - Validation (must have `mesa_decision`)
   - `submitEvaluation(data)` called
   - Success: clear storage, redirect to dashboard

### Dashboard Flow

1. Page loads
2. `getApplications()` called
3. Applications displayed in cards
4. Filters applied client-side (can be moved to API query params)
5. Stats calculated from applications array

---

## Testing with Mock Data

When the backend API is unavailable, the app falls back to mock data:

- **Dashboard**: Uses `mockApplications` array
- **Evaluation Page**: Uses `mockApplicationDetails` object

To disable fallback and test API errors:
```typescript
// Comment out the .catch() fallback
const data = await getApplications(); // Will throw on API error
```

---

## API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/applications` | POST | Submit new application |
| `/applications` | GET | List applications |
| `/applications/{number}` | GET | Get application details |
| `/evaluations` | POST | Submit evaluation |
| `/evaluations/{number}` | GET | Get evaluation |
| `/evaluations/{number}` | PUT | Update evaluation |
| `/evaluations/{number}/draft` | PATCH | Save draft |

---

## Next Steps

### Backend Implementation Required

The backend API needs to implement these endpoints with the following specifications:

1. **Authentication**: JWT-based auth with 8-hour token expiry
2. **File Upload**: Handle `multipart/form-data` for application documents
3. **Validation**: Match Zod schemas on backend
4. **Database**: Store applications and evaluations
5. **Status Management**: Update application status based on evaluation decision

### Frontend Enhancements

Once backend is ready:

1. Remove mock data fallbacks
2. Add proper loading states
3. Implement pagination for applications list
4. Add real-time updates (WebSockets or polling)
5. Implement file download for uploaded documents
6. Add evaluation history tracking

---

## Troubleshooting

### Common Issues

**Issue**: API calls fail with CORS errors
- **Solution**: Ensure backend has CORS enabled for `http://localhost:8000`

**Issue**: 401 Unauthorized on all requests
- **Solution**: Check that JWT token is being stored and sent correctly

**Issue**: File uploads timeout
- **Solution**: Increase timeout in `apiClient` (currently 60s for uploads)

**Issue**: FormData not working
- **Solution**: Ensure `Content-Type: multipart/form-data` header is set

### Debug Mode

Enable detailed logging:

```typescript
// In lib/api/client.ts
apiClient.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url);
  console.log('Headers:', config.headers);
  console.log('Data:', config.data);
  return config;
});
```

---

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to git
2. **Token Storage**: Consider using httpOnly cookies instead of localStorage
3. **File Validation**: Validate file types and sizes on backend
4. **Input Sanitization**: Backend must sanitize all inputs
5. **Rate Limiting**: Implement rate limiting on API endpoints
6. **HTTPS**: Use HTTPS in production
7. **CSRF Protection**: Implement CSRF tokens for state-changing operations

---

## Performance Optimization

1. **Caching**: Add React Query or SWR for data caching
2. **Lazy Loading**: Code-split evaluation tabs
3. **Debouncing**: Auto-save is already debounced (30s)
4. **Pagination**: Implement server-side pagination for applications list
5. **Image Optimization**: Use Next.js Image component for document previews

---

Last Updated: March 27, 2026
Version: 1.0.0
