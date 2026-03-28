'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileText } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';
import { formatCurrency } from '@/lib/utils/formatters';
import { calculateMonthlyPayment } from '@/lib/utils/calculators';

interface Tab4ProposalProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab4Proposal({ form }: Tab4ProposalProps) {
  const { register, watch, setValue } = form;

  const proposalAmount = watch('proposal_amount') || 0;
  const proposalTermMonths = watch('proposal_termMonths') || 0;
  const proposalRate = watch('proposal_rate') || 0;

  // Auto-calculate payment when amount, term, or rate changes
  useEffect(() => {
    if (proposalAmount > 0 && proposalTermMonths > 0 && proposalRate >= 0) {
      const monthlyPayment = calculateMonthlyPayment(proposalAmount, proposalRate / 100, proposalTermMonths);
      const totalPayment = monthlyPayment * proposalTermMonths;
      const totalInterest = totalPayment - proposalAmount;

      setValue('proposal_monthlyPayment', monthlyPayment);
      setValue('proposal_totalPayment', totalPayment);
      setValue('proposal_totalInterest', totalInterest);
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
            <FileText className="h-5 w-5" />
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
                required
              />
            </div>
            <div>
              <Label htmlFor="proposal_termMonths">Plazo (meses) *</Label>
              <Input
                id="proposal_termMonths"
                type="number"
                min="1"
                max="120"
                placeholder="12"
                {...register('proposal_termMonths', { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="proposal_rate">Tasa de Interés Anual (%) *</Label>
              <Input
                id="proposal_rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="18.00"
                {...register('proposal_rate', { valueAsNumber: true })}
              />
            </div>
          </div>

          {proposalAmount > 0 && proposalTermMonths > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
              <h4 className="font-medium text-blue-900">Cálculo de Cuota</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-blue-700">Cuota Mensual</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(watch('proposal_monthlyPayment') || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Total a Pagar</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(watch('proposal_totalPayment') || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Interés Total</p>
                  <p className="text-xl font-bold text-blue-900">
                    {formatCurrency(watch('proposal_totalInterest') || 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comentarios y Observaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="proposal_comments">Comentarios sobre la Propuesta</Label>
            <textarea
              id="proposal_comments"
              rows={6}
              className="mt-1 flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Ingrese justificación de la propuesta, análisis de capacidad de pago, riesgos identificados, etc..."
              {...register('proposal_comments')}
            />
            <p className="text-xs text-gray-500 mt-1">
              {watch('proposal_comments')?.length || 0}/500 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> La propuesta debe estar respaldada por el análisis financiero realizado en la pestaña anterior. Verifique que la cuota mensual no supere la capacidad neta de pago del cliente.
        </p>
      </div>
    </div>
  );
}
