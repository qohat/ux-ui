import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';

interface Tab2CommercialProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab2Commercial({ form }: Tab2CommercialProps) {
  const { register, watch } = form;
  const commercialValidated = watch('commercial_validated');
  const docsValidated = watch('docs_validated');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Validación Comercial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="commercial_validated"
              className="h-4 w-4 rounded border-gray-300"
              {...register('commercial_validated')}
            />
            <Label htmlFor="commercial_validated" className="font-medium cursor-pointer">
              Validación comercial completada
            </Label>
          </div>

          <div>
            <Label htmlFor="commercial_comments">Comentarios de Validación Comercial</Label>
            <textarea
              id="commercial_comments"
              rows={4}
              className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Ingrese sus observaciones sobre la validación comercial..."
              {...register('commercial_comments')}
            />
            <p className="text-xs text-gray-500 mt-1">
              {watch('commercial_comments')?.length || 0}/500 caracteres
            </p>
          </div>

          {commercialValidated && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium">
                Validación comercial marcada como completada
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Validación de Documentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="docs_validated"
              className="h-4 w-4 rounded border-gray-300"
              {...register('docs_validated')}
            />
            <Label htmlFor="docs_validated" className="font-medium cursor-pointer">
              Documentos validados y completos
            </Label>
          </div>

          <div>
            <Label htmlFor="docs_comments">Comentarios de Validación de Documentos</Label>
            <textarea
              id="docs_comments"
              rows={4}
              className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Ingrese sus observaciones sobre los documentos presentados..."
              {...register('docs_comments')}
            />
            <p className="text-xs text-gray-500 mt-1">
              {watch('docs_comments')?.length || 0}/500 caracteres
            </p>
          </div>

          {docsValidated && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800 font-medium">
                Documentos marcados como validados
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> La validación comercial y de documentos son pasos críticos en el proceso de evaluación. Asegúrese de verificar toda la información antes de continuar.
        </p>
      </div>
    </div>
  );
}
