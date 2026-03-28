'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApplicationFormData } from '@/lib/validations/application.schema';
import { ECONOMIC_ACTIVITIES } from '@/lib/constants';

interface Step4EmploymentProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function Step4Employment({ form }: Step4EmploymentProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Actividad Económica</h2>
        <p className="text-gray-600">
          Complete la información sobre su actividad laboral o económica
        </p>
      </div>

      {/* Economic Activity */}
      <div className="space-y-2">
        <Label htmlFor="economicActivity">
          Actividad Económica <span className="text-red-500">*</span>
        </Label>
        <select
          id="economicActivity"
          {...register('economicActivity')}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Seleccione...</option>
          {ECONOMIC_ACTIVITIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.economicActivity && (
          <p className="text-sm text-red-500">{errors.economicActivity.message}</p>
        )}
      </div>

      {/* Activity Municipality */}
      <div className="space-y-2">
        <Label htmlFor="activityMunicipality">
          Municipio donde ejerce la actividad <span className="text-red-500">*</span>
        </Label>
        <Input
          id="activityMunicipality"
          {...register('activityMunicipality')}
          placeholder="Ej: Bogotá"
        />
        {errors.activityMunicipality && (
          <p className="text-sm text-red-500">{errors.activityMunicipality.message}</p>
        )}
      </div>

      {/* Employer Address (optional) */}
      <div className="space-y-2">
        <Label htmlFor="employerAddress">
          Dirección del Empleador o Negocio (opcional)
        </Label>
        <Input
          id="employerAddress"
          {...register('employerAddress')}
          placeholder="Ej: Calle 123 # 45-67"
        />
        {errors.employerAddress && (
          <p className="text-sm text-red-500">{errors.employerAddress.message}</p>
        )}
      </div>

      {/* Hire Date (optional) */}
      <div className="space-y-2">
        <Label htmlFor="hireDate">
          Fecha de Inicio de Actividad (opcional)
        </Label>
        <Input
          id="hireDate"
          type="date"
          {...register('hireDate')}
        />
        {errors.hireDate && (
          <p className="text-sm text-red-500">{errors.hireDate.message}</p>
        )}
      </div>
    </div>
  );
}
