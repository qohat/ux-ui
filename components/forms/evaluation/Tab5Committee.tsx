import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';

interface Tab5CommitteeProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab5Committee({ form }: Tab5CommitteeProps) {
  const { register, watch } = form;
  const decision = watch('mesa_decision');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decisión de Mesa de Crédito</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mesa_decision">Decisión *</Label>
            <select
              id="mesa_decision"
              className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register('mesa_decision')}
            >
              <option value="">Seleccione una decisión...</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
              <option value="condicional">Condicional</option>
            </select>
          </div>

          {decision === 'aprobado' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Crédito Aprobado</p>
                <p className="text-sm text-green-700 mt-1">
                  La solicitud ha sido aprobada. Proceda con el desembolso según los términos acordados.
                </p>
              </div>
            </div>
          )}

          {decision === 'rechazado' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900">Crédito Rechazado</p>
                <p className="text-sm text-red-700 mt-1">
                  La solicitud ha sido rechazada. Asegúrese de documentar las razones en los comentarios.
                </p>
              </div>
            </div>
          )}

          {decision === 'condicional' && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Aprobación Condicional</p>
                <p className="text-sm text-yellow-700 mt-1">
                  La solicitud requiere condiciones adicionales. Especifique las condiciones requeridas.
                </p>
              </div>
            </div>
          )}

          {decision === 'condicional' && (
            <div>
              <Label htmlFor="mesa_conditions">Condiciones Requeridas *</Label>
              <textarea
                id="mesa_conditions"
                rows={4}
                className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Especifique las condiciones que debe cumplir el cliente para la aprobación final..."
                {...register('mesa_conditions')}
              />
              <p className="text-xs text-gray-500 mt-1">
                {watch('mesa_conditions')?.length || 0}/1000 caracteres
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validaciones SARLAFT</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mesa_sarlaft_pep"
                className="h-4 w-4 rounded border-gray-300"
                {...register('mesa_sarlaft_pep')}
              />
              <Label htmlFor="mesa_sarlaft_pep" className="cursor-pointer">
                Cliente NO es Persona Expuesta Políticamente (PEP)
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mesa_sarlaft_lists"
                className="h-4 w-4 rounded border-gray-300"
                {...register('mesa_sarlaft_lists')}
              />
              <Label htmlFor="mesa_sarlaft_lists" className="cursor-pointer">
                Cliente NO aparece en listas restrictivas (OFAC, ONU, etc.)
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mesa_sarlaft_adverse"
                className="h-4 w-4 rounded border-gray-300"
                {...register('mesa_sarlaft_adverse')}
              />
              <Label htmlFor="mesa_sarlaft_adverse" className="cursor-pointer">
                NO se encontraron hallazgos adversos en medios de comunicación
              </Label>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mt-4">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> Las validaciones SARLAFT son obligatorias. Asegúrese de haber realizado todas las verificaciones necesarias antes de aprobar el crédito.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comentarios Finales de Mesa</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="mesa_comments">Comentarios Generales</Label>
            <textarea
              id="mesa_comments"
              rows={6}
              className="mt-1 flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Ingrese observaciones generales, justificación de la decisión, condiciones especiales, etc..."
              {...register('mesa_comments')}
            />
            <p className="text-xs text-gray-500 mt-1">
              {watch('mesa_comments')?.length || 0}/1000 caracteres
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
