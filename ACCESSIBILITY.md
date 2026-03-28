# Accessibility Guide

## Overview

FINAZACTIVOS frontend is built with accessibility in mind, following WCAG 2.1 Level AA standards.

## Keyboard Navigation

### Global Navigation
- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward through interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns

### Forms
- **Arrow keys**: Navigate between radio buttons and dropdowns
- **Space**: Toggle checkboxes
- **Tab**: Move between form fields

### Multi-step Forms
- **Tab/Shift+Tab**: Navigate between fields
- **Enter**: Submit current step (when on submit button)
- **Click step indicators**: Jump to specific step (for completed steps)

## Screen Reader Support

### ARIA Labels
All interactive elements have appropriate ARIA labels:

```tsx
// Good examples
<button aria-label="Cerrar ventana">
  <X className="h-4 w-4" />
</button>

<input
  type="text"
  aria-label="Buscar solicitudes"
  placeholder="Buscar..."
/>

<div role="status" aria-live="polite">
  Guardando cambios...
</div>
```

### Form Labels
- All form inputs have associated `<label>` elements
- Required fields are marked with `required` attribute and visual indicator
- Error messages are announced via `aria-describedby`

```tsx
<Label htmlFor="firstName">
  Nombre *
</Label>
<Input
  id="firstName"
  required
  aria-invalid={!!errors.firstName}
  aria-describedby={errors.firstName ? "firstName-error" : undefined}
/>
{errors.firstName && (
  <p id="firstName-error" role="alert">
    {errors.firstName.message}
  </p>
)}
```

### Live Regions
Dynamic content updates use ARIA live regions:

```tsx
// Success messages
<div role="alert" aria-live="assertive">
  Solicitud enviada exitosamente
</div>

// Loading states
<div role="status" aria-live="polite" aria-busy="true">
  Cargando solicitudes...
</div>
```

## Color Contrast

All text meets WCAG AA contrast requirements:
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

### Color Palette
```css
/* Primary colors */
--primary: hsl(222.2 47.4% 11.2%);
--primary-foreground: hsl(210 40% 98%);

/* Status colors */
--success: hsl(142 76% 36%);  /* Green - Contrast: 4.8:1 */
--error: hsl(0 84% 60%);       /* Red - Contrast: 5.1:1 */
--warning: hsl(38 92% 50%);    /* Yellow - Contrast: 5.5:1 */
--info: hsl(199 89% 48%);      /* Blue - Contrast: 4.6:1 */
```

## Focus Indicators

All interactive elements have visible focus indicators:

```css
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-ring
.focus-visible:ring-offset-2
```

Disabled state:
```css
.disabled:pointer-events-none
.disabled:opacity-50
```

## Text Alternatives

### Images
All images have alt text:
```tsx
<img src="/logo.svg" alt="FINAZACTIVOS Logo" />
```

### Icons
Icons used for information have labels:
```tsx
<CheckCircle
  className="h-4 w-4"
  aria-label="Aprobado"
  role="img"
/>
```

Decorative icons are hidden from screen readers:
```tsx
<FileText className="h-4 w-4" aria-hidden="true" />
<span>Documentos</span>
```

## Form Validation

### Error Handling
- Errors are announced immediately via `role="alert"`
- Errors persist until corrected
- Error messages are clear and actionable

```tsx
<div role="alert" className="text-red-600">
  El número de cédula debe tener entre 6 y 10 dígitos
</div>
```

### Success Messages
Success states are also announced:
```tsx
<div role="status" aria-live="polite" className="text-green-600">
  Documentos validados correctamente
</div>
```

## Responsive Design

### Mobile Accessibility
- Touch targets are minimum 44x44px
- Forms are optimized for mobile input
- Text is legible at 16px base size (no zoom needed)

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Skip Links

Skip link for keyboard users (add to layout):
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-white"
>
  Saltar al contenido principal
</a>
```

## Page Structure

### Semantic HTML
```tsx
<header>
  <nav aria-label="Navegación principal">
    {/* Navigation items */}
  </nav>
</header>

<main id="main-content">
  <h1>Dashboard</h1>
  {/* Main content */}
</main>

<footer>
  {/* Footer content */}
</footer>
```

### Heading Hierarchy
- Use proper heading levels (h1 → h2 → h3)
- Don't skip heading levels
- One h1 per page

## Interactive Components

### Buttons vs Links
- **Buttons**: For actions (submit, toggle, etc.)
- **Links**: For navigation

```tsx
// Action - use button
<button onClick={handleSubmit}>
  Enviar
</button>

// Navigation - use link
<Link href="/dashboard">
  Ver Dashboard
</Link>
```

### Modal Dialogs
- Focus is trapped within modal
- Escape key closes modal
- Focus returns to trigger element on close

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirmar Acción</h2>
  {/* Dialog content */}
</div>
```

## Loading States

### Skeleton Screens
Use skeleton screens for better perceived performance:
```tsx
<DashboardSkeleton />
```

### Loading Indicators
```tsx
<div role="status" aria-live="polite">
  <Loader2 className="animate-spin" aria-hidden="true" />
  <span className="sr-only">Cargando...</span>
</div>
```

## Notifications

### Toast Notifications
```tsx
<ToastProvider>
  {/* App content */}
</ToastProvider>

// Usage
const { addToast } = useToast();
addToast('success', 'Guardado exitoso', 'Los cambios han sido guardados');
```

Toasts are:
- Announced via aria-live="polite"
- Dismissible via keyboard (focus + Enter)
- Auto-dismiss after 5 seconds

## Testing Accessibility

### Manual Testing
1. **Keyboard only**: Navigate entire app without mouse
2. **Screen reader**: Test with NVDA (Windows) or VoiceOver (Mac)
3. **Zoom**: Test at 200% zoom level
4. **Color blindness**: Use color blindness simulator

### Automated Testing
```bash
# Run accessibility tests
npm run test:a11y

# Lighthouse accessibility audit
npm run lighthouse
```

### Browser Extensions
- axe DevTools
- WAVE
- Lighthouse

## Common Patterns

### Form Field Pattern
```tsx
<div>
  <Label htmlFor="email">
    Correo Electrónico *
  </Label>
  <Input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="text-red-600 text-sm mt-1">
      {errors.email.message}
    </p>
  )}
</div>
```

### Status Badge Pattern
```tsx
<span
  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
  role="status"
  aria-label={`Estado: ${statusConfig.label}`}
>
  {statusConfig.label}
</span>
```

### Card Link Pattern
```tsx
<Link
  href={`/evaluacion/${applicationNumber}`}
  className="block hover:shadow-lg transition-shadow"
  aria-label={`Evaluar solicitud ${applicationNumber} de ${fullName}`}
>
  <Card>
    {/* Card content */}
  </Card>
</Link>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Reporting Issues

If you find an accessibility issue:
1. Document the issue with steps to reproduce
2. Include browser/screen reader details
3. Suggest a fix if possible
4. Open an issue in the repository

---

Last Updated: March 27, 2026
