'use client';

import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';
import { ApplicationFormData } from '@/lib/validations/application.schema';
import { sum } from '@/lib/utils/calculators';

interface Step5FinancialProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function Step5Financial({ form }: Step5FinancialProps) {
  const {
    formState: { errors },
    setValue,
    watch,
  } = form;

  const monthlyIncome = watch('monthlyIncome') || 0;
  const familyIncome = watch('familyIncome') || 0;
  const otherIncome = watch('otherIncome') || 0;

  const foodExpense = watch('foodExpense') || 0;
  const rentExpense = watch('rentExpense') || 0;
  const utilitiesExpense = watch('utilitiesExpense') || 0;
  const transportExpense = watch('transportExpense') || 0;
  const otherExpense = watch('otherExpense') || 0;

  // Calculate totals automatically
  useEffect(() => {
    const totalIncome = sum(monthlyIncome, familyIncome, otherIncome);
    const totalExpense = sum(foodExpense, rentExpense, utilitiesExpense, transportExpense, otherExpense);
    const netBalance = totalIncome - totalExpense;

    setValue('totalIncome', totalIncome);
    setValue('totalExpense', totalExpense);
    setValue('netBalance', netBalance);
  }, [monthlyIncome, familyIncome, otherIncome, foodExpense, rentExpense, utilitiesExpense, transportExpense, otherExpense, setValue]);

  const totalIncome = watch('totalIncome') || 0;
  const totalExpense = watch('totalExpense') || 0;
  const netBalance = watch('netBalance') || 0;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Información Financiera</h2>
        <p className="text-gray-600">
          Detalle sus ingresos y gastos mensuales
        </p>
      </div>

      {/* Income Section */}
      <div className="border rounded-lg p-4 bg-green-50">
        <h3 className="text-lg font-semibold mb-4 text-green-900">Ingresos Mensuales</h3>

        <div className="space-y-4">
          <div className="bg-white p-3 rounded">
            <p className="text-sm text-gray-600 mb-1">Ingreso Personal</p>
            <p className="text-lg font-semibold">
              ${monthlyIncome.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-500">Del paso anterior</p>
          </div>

          <CurrencyInput
            label="Ingresos Familiares (opcional)"
            value={familyIncome}
            onChange={(value) => setValue('familyIncome', value)}
            error={errors.familyIncome?.message}
            id="familyIncome"
          />

          <CurrencyInput
            label="Otros Ingresos (opcional)"
            value={otherIncome}
            onChange={(value) => setValue('otherIncome', value)}
            error={errors.otherIncome?.message}
            id="otherIncome"
          />

          <div className="bg-green-100 p-3 rounded">
            <p className="text-sm text-gray-700 mb-1">Total Ingresos</p>
            <p className="text-2xl font-bold text-green-700">
              ${totalIncome.toLocaleString('es-CO')}
            </p>
          </div>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="border rounded-lg p-4 bg-red-50">
        <h3 className="text-lg font-semibold mb-4 text-red-900">Gastos Mensuales</h3>

        <div className="space-y-4">
          <CurrencyInput
            label="Alimentación"
            value={foodExpense}
            onChange={(value) => setValue('foodExpense', value)}
            error={errors.foodExpense?.message}
            id="foodExpense"
          />

          <CurrencyInput
            label="Arriendo o Vivienda"
            value={rentExpense}
            onChange={(value) => setValue('rentExpense', value)}
            error={errors.rentExpense?.message}
            id="rentExpense"
          />

          <CurrencyInput
            label="Servicios Públicos"
            value={utilitiesExpense}
            onChange={(value) => setValue('utilitiesExpense', value)}
            error={errors.utilitiesExpense?.message}
            id="utilitiesExpense"
          />

          <CurrencyInput
            label="Transporte"
            value={transportExpense}
            onChange={(value) => setValue('transportExpense', value)}
            error={errors.transportExpense?.message}
            id="transportExpense"
          />

          <CurrencyInput
            label="Otros Gastos"
            value={otherExpense}
            onChange={(value) => setValue('otherExpense', value)}
            error={errors.otherExpense?.message}
            id="otherExpense"
          />

          <div className="bg-red-100 p-3 rounded">
            <p className="text-sm text-gray-700 mb-1">Total Gastos</p>
            <p className="text-2xl font-bold text-red-700">
              ${totalExpense.toLocaleString('es-CO')}
            </p>
          </div>
        </div>
      </div>

      {/* Net Balance */}
      <div className={`border-2 rounded-lg p-4 ${netBalance >= 0 ? 'bg-blue-50 border-blue-300' : 'bg-yellow-50 border-yellow-300'}`}>
        <h3 className="text-lg font-semibold mb-2">Balance Neto (Capacidad de Pago)</h3>
        <p className="text-3xl font-bold mb-2" style={{ color: netBalance >= 0 ? '#2563eb' : '#d97706' }}>
          ${netBalance.toLocaleString('es-CO')}
        </p>
        <p className="text-sm text-gray-600">
          {netBalance >= 0
            ? 'Su capacidad de pago es positiva'
            : 'Advertencia: Sus gastos superan sus ingresos'}
        </p>
        {errors.netBalance && (
          <p className="text-sm text-red-500 mt-2">{errors.netBalance.message}</p>
        )}
      </div>
    </div>
  );
}
