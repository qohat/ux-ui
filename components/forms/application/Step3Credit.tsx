'use client';

import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';
import { ApplicationFormData } from '@/lib/validations/application.schema';
import { CREDIT_PRODUCTS, PAYMENT_PERIOD_OPTIONS, ACCOUNT_TYPE_OPTIONS, COLOMBIAN_BANKS } from '@/lib/constants';
import { calculateMonthlyPayment } from '@/lib/utils/calculators';
import { formatCurrency } from '@/lib/utils/formatters';

interface Step3CreditProps {
  form: UseFormReturn<ApplicationFormData>;
}

export function Step3Credit({ form }: Step3CreditProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const requestedAmount = watch('requestedAmount');
  const termMonths = watch('termMonths');

  // Calculate monthly payment automatically
  useEffect(() => {
    if (requestedAmount && termMonths) {
      const annualRate = 0.18; // 18% annual rate (example)
      const payment = calculateMonthlyPayment(requestedAmount, annualRate, termMonths);
      setValue('monthlyPayment', formatCurrency(payment));
    }
  }, [requestedAmount, termMonths, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Solicitud de Crédito</h2>
        <p className="text-gray-600">
          Complete los datos del crédito que desea solicitar
        </p>
      </div>

      {/* Product */}
      <div className="space-y-2">
        <Label htmlFor="product">
          Producto <span className="text-red-500">*</span>
        </Label>
        <select
          id="product"
          {...register('product')}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Seleccione...</option>
          {CREDIT_PRODUCTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.product && (
          <p className="text-sm text-red-500">{errors.product.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Requested Amount */}
        <CurrencyInput
          label="Monto Solicitado"
          value={requestedAmount || 0}
          onChange={(value) => setValue('requestedAmount', value)}
          required
          error={errors.requestedAmount?.message}
          id="requestedAmount"
        />

        {/* Term Months */}
        <div className="space-y-2">
          <Label htmlFor="termMonths">
            Plazo (meses) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="termMonths"
            type="number"
            {...register('termMonths', { valueAsNumber: true })}
            placeholder="12"
            min={1}
            max={120}
          />
          {errors.termMonths && (
            <p className="text-sm text-red-500">{errors.termMonths.message}</p>
          )}
        </div>
      </div>

      {/* Monthly Payment (calculated) */}
      <div className="space-y-2">
        <Label htmlFor="monthlyPayment">
          Cuota Mensual Estimada <span className="text-red-500">*</span>
        </Label>
        <Input
          id="monthlyPayment"
          {...register('monthlyPayment')}
          readOnly
          className="bg-gray-50"
        />
        <p className="text-xs text-gray-500">
          Calculado automáticamente con tasa del 18% anual
        </p>
      </div>

      {/* Payment Period */}
      <div className="space-y-2">
        <Label htmlFor="paymentPeriod">
          Periodo de Pago <span className="text-red-500">*</span>
        </Label>
        <select
          id="paymentPeriod"
          {...register('paymentPeriod')}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Seleccione...</option>
          {PAYMENT_PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.paymentPeriod && (
          <p className="text-sm text-red-500">{errors.paymentPeriod.message}</p>
        )}
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Información Bancaria</h3>

        {/* Bank */}
        <div className="space-y-2 mb-4">
          <Label htmlFor="bank">
            Banco <span className="text-red-500">*</span>
          </Label>
          <select
            id="bank"
            {...register('bank')}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Seleccione...</option>
            {COLOMBIAN_BANKS.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          {errors.bank && (
            <p className="text-sm text-red-500">{errors.bank.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Account Type */}
          <div className="space-y-2">
            <Label htmlFor="accountType">
              Tipo de Cuenta <span className="text-red-500">*</span>
            </Label>
            <select
              id="accountType"
              {...register('accountType')}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Seleccione...</option>
              {ACCOUNT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.accountType && (
              <p className="text-sm text-red-500">{errors.accountType.message}</p>
            )}
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <Label htmlFor="accountNumber">
              Número de Cuenta <span className="text-red-500">*</span>
            </Label>
            <Input
              id="accountNumber"
              {...register('accountNumber')}
              placeholder="1234567890"
            />
            {errors.accountNumber && (
              <p className="text-sm text-red-500">{errors.accountNumber.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
