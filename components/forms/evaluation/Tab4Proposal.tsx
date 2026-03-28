'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';
import { formatCurrency } from '@/lib/utils/formatters';
import { calculateMonthlyPayment } from '@/lib/utils/calculators';

interface Tab4ProposalProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab4Proposal({ form }: Tab4ProposalProps) {
  const { register, watch, setValue, formState: { errors } } = form;

  const proposalAmount = watch('proposal_amount') || 0;
  const proposalTermMonths = watch('proposal_termMonths') || 0;
  const proposalRate = watch('proposal_rate') || 0;

  // Auto-calculate monthly payment, total payment and total interest
  useEffect(() => {
    if (proposalAmount > 0 && proposalTermMonths > 0 && proposalRate > 0) {
      const monthlyPayment = calculateMonthlyPayment(proposalAmount, proposalRate / 100, proposalTermMonths);
      const totalPayment = monthlyPayment * proposalTermMonths;
      const totalInterest = totalPayment - proposalAmount;

      setValue('proposal_monthlyPayment', Math.round(monthlyPayment));
      setValue('proposal_totalPayment', Math.round(totalPayment));
      setValue('proposal_totalInterest', Math.round(totalInterest));
    } else {
      setValue('proposal_monthlyPayment', 0);
      setValue('proposal_totalPayment', 0);
      setValue('proposal_totalInterest', 0);
    }
  }, [proposalAmount, proposalTermMonths, proposalRate, setValue]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Propuesta del Asesor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CurrencyInput
                id="proposal_amount"
                label="Monto Propuesto"
                value={proposalAmount}
                onChange={(value) => setValue('proposal_amount', value)}
                placeholder="$0"
              />
              {errors.proposal_amount && (
                <p className="text-sm text-red-500 mt-1">{errors.proposal_amount.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="proposal_termMonths">Plazo (meses)</Label>
              <Input
                id="proposal_termMonths"
                type="number"
                min={1}
                max={120}
                placeholder="Ej: 24"
                {...register('proposal_termMonths', { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.proposal_termMonths && (
                <p className="text-sm text-red-500 mt-1">{errors.proposal_termMonths.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="proposal_rate">Tasa de Interés Anual (%)</Label>
              <Input
                id="proposal_rate"
                type="number"
                step="0.01"
                min={0}
                max={100}
                placeholder="Ej: 24.5"
                {...register('proposal_rate', { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.proposal_rate && (
                <p className="text-sm text-red-500 mt-1">{errors.proposal_rate.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculated Summary */}
      {proposalAmount > 0 && proposalTermMonths > 0 && proposalRate > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen de la Propuesta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Monto del Crédito</span>
              <span className="font-semibold">{formatCurrency(proposalAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Plazo</span>
              <span className="font-semibold">{proposalTermMonths} meses</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Tasa Anual</span>
              <span className="font-semibold">{proposalRate}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Cuota Mensual</span>
              <span className="font-bold text-lg text-primary">
                {formatCurrency(watch('proposal_monthlyPayment') || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Total a Pagar</span>
              <span className="font-semibold">{formatCurrency(watch('proposal_totalPayment') || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Intereses</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(watch('proposal_totalInterest') || 0)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle>Comentarios del Asesor</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="proposal_comments">Observaciones y justificación de la propuesta</Label>
          <textarea
            id="proposal_comments"
            rows={4}
            className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Ingrese sus observaciones sobre la propuesta..."
            {...register('proposal_comments')}
          />
          <p className="text-xs text-gray-500 mt-1">
            {watch('proposal_comments')?.length || 0}/500 caracteres
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
