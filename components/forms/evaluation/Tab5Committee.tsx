'use client';

import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckSquare, AlertTriangle } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';

interface Tab5CommitteeProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab5Committee({ form }: Tab5CommitteeProps) {
  const { register, watch, formState: { errors } } = form;

  const decision = watch('mesa_decision');

  return (
    <div className="space-y-6">
      {/* SARLAFT Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Verificación SARLAFT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Confirme que se realizaron las verificaciones requeridas por el sistema SARLAFT.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mesa_sarlaft_pep"
                className="h-4 w-4 rounded border-gray-300"
                {...register('mesa_sarlaft_pep')}
              />
              <Label htmlFor="mesa_sarlaft_pep" className="font-normal cursor-pointer">
                Verificación de Personas Expuestas Políticamente (PEP) realizada
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mesa_sarlaft_lists"
                className="h-4 w-4 rounded border-gray-300"
                {...register('mesa_sarlaft_lists')}
              />
              <Label htmlFor="mesa_sarlaft_lists" className="font-normal cursor-pointer">
                Consulta en listas restrictivas (OFAC, ONU, etc.) realizada
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="mesa_sarlaft_adverse"
                className="h-4 w-4 rounded border-gray-300"
                {...register('mesa_sarlaft_adverse')}
              />
              <Label htmlFor="mesa_sarlaft_adverse" className="font-normal cursor-pointer">
                Búsqueda de información adversa en medios realizada
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Decision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Decisión de Mesa de Crédito
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="mesa_decision">
              Decisión <span className="text-red-500">*</span>
            </Label>
            <select
              id="mesa_decision"
              className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...register('mesa_decision')}
            >
              <option value="">Seleccione una decisión</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
              <option value="condicional">Condicional</option>
            </select>
            {errors.mesa_decision && (
              <p className="text-sm text-red-500 mt-1">{errors.mesa_decision.message}</p>
            )}
          </div>

          {/* Decision feedback */}
          {decision === 'aprobado' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium">Crédito Aprobado</p>
              <p className="text-xs text-green-700 mt-1">
                El crédito ha sido aprobado por la mesa de crédito.
              </p>
            </div>
          )}
          {decision === 'rechazado' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800 font-medium">Crédito Rechazado</p>
              <p className="text-xs text-red-700 mt-1">
                El crédito ha sido rechazado. Indique las razones en los comentarios.
              </p>
            </div>
          )}
          {decision === 'condicional' && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800 font-medium">Aprobación Condicional</p>
              <p className="text-xs text-yellow-700 mt-1">
                El crédito está condicionado. Especifique las condiciones a continuación.
              </p>
            </div>
          )}

          {/* Conditions (shown when condicional) */}
          {decision === 'condicional' && (
            <div>
              <Label htmlFor="mesa_conditions">Condiciones requeridas</Label>
              <textarea
                id="mesa_conditions"
                rows={4}
                className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describa las condiciones para la aprobación..."
                {...register('mesa_conditions')}
              />
            </div>
          )}

          {/* General comments */}
          <div>
            <Label htmlFor="mesa_comments">Comentarios de la Mesa de Crédito</Label>
            <textarea
              id="mesa_comments"
              rows={4}
              className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Ingrese los comentarios de la mesa de crédito..."
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
