'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApplicationFormData } from '@/lib/validations/application.schema';
import { GENDER_OPTIONS, MARITAL_STATUS_OPTIONS } from '@/lib/constants';

interface Step1PersonalProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function Step1Personal({ form }: Step1PersonalProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Datos Personales</h2>
        <p className="text-gray-600">
          Por favor complete su información personal básica
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName">
            Nombres <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Ej: Juan Carlos"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Apellidos <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Ej: Pérez García"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* ID Number */}
        <div className="space-y-2">
          <Label htmlFor="idNumber">
            Cédula de Ciudadanía <span className="text-red-500">*</span>
          </Label>
          <Input
            id="idNumber"
            {...register('idNumber')}
            placeholder="1234567890"
            maxLength={10}
          />
          {errors.idNumber && (
            <p className="text-sm text-red-500">{errors.idNumber.message}</p>
          )}
        </div>

        {/* ID Issue Date */}
        <div className="space-y-2">
          <Label htmlFor="idIssueDate">
            Fecha de Expedición <span className="text-red-500">*</span>
          </Label>
          <Input
            id="idIssueDate"
            type="date"
            {...register('idIssueDate')}
          />
          {errors.idIssueDate && (
            <p className="text-sm text-red-500">{errors.idIssueDate.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birthDate">
            Fecha de Nacimiento <span className="text-red-500">*</span>
          </Label>
          <Input
            id="birthDate"
            type="date"
            {...register('birthDate')}
          />
          {errors.birthDate && (
            <p className="text-sm text-red-500">{errors.birthDate.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">
            Género <span className="text-red-500">*</span>
          </Label>
          <select
            id="gender"
            {...register('gender')}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Seleccione...</option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}
        </div>
      </div>

      {/* Marital Status */}
      <div className="space-y-2">
        <Label htmlFor="maritalStatus">
          Estado Civil <span className="text-red-500">*</span>
        </Label>
        <select
          id="maritalStatus"
          {...register('maritalStatus')}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Seleccione...</option>
          {MARITAL_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.maritalStatus && (
          <p className="text-sm text-red-500">{errors.maritalStatus.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Mobile */}
        <div className="space-y-2">
          <Label htmlFor="mobile">
            Celular <span className="text-red-500">*</span>
          </Label>
          <Input
            id="mobile"
            {...register('mobile')}
            placeholder="3001234567"
            maxLength={10}
            type="tel"
          />
          {errors.mobile && (
            <p className="text-sm text-red-500">{errors.mobile.message}</p>
          )}
        </div>

        {/* Phone (optional) */}
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono (opcional)</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="6012345678"
            type="tel"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Email (optional) */}
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico (opcional)</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="ejemplo@correo.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
}
