'use client';

import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';
import { ApplicationFormData } from '@/lib/validations/application.schema';
import { HOUSING_TYPE_OPTIONS } from '@/lib/constants';

interface Step2AddressProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function Step2Address({ form }: Step2AddressProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const monthlyIncome = watch('monthlyIncome');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Información de Residencia</h2>
        <p className="text-gray-600">
          Complete los datos de su lugar de residencia
        </p>
      </div>

      {/* Municipality */}
      <div className="space-y-2">
        <Label htmlFor="municipality">
          Municipio <span className="text-red-500">*</span>
        </Label>
        <Input
          id="municipality"
          {...register('municipality')}
          placeholder="Ej: Bogotá"
        />
        {errors.municipality && (
          <p className="text-sm text-red-500">{errors.municipality.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">
          Dirección <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="Ej: Calle 123 # 45-67"
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Vereda (optional) */}
      <div className="space-y-2">
        <Label htmlFor="vereda">Vereda (opcional)</Label>
        <Input
          id="vereda"
          {...register('vereda')}
          placeholder="Si aplica"
        />
        {errors.vereda && (
          <p className="text-sm text-red-500">{errors.vereda.message}</p>
        )}
      </div>

      {/* Housing Type */}
      <div className="space-y-2">
        <Label htmlFor="housingType">
          Tipo de Vivienda <span className="text-red-500">*</span>
        </Label>
        <select
          id="housingType"
          {...register('housingType')}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Seleccione...</option>
          {HOUSING_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.housingType && (
          <p className="text-sm text-red-500">{errors.housingType.message}</p>
        )}
      </div>

      {/* Monthly Income */}
      <CurrencyInput
        label="Ingreso Mensual"
        value={monthlyIncome || 0}
        onChange={(value) => setValue('monthlyIncome', value)}
        required
        error={errors.monthlyIncome?.message}
        id="monthlyIncome"
      />
    </div>
  );
}
