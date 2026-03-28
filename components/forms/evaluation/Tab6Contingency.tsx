'use client';

import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Briefcase } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';

interface Tab6ContingencyProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab6Contingency({ form }: Tab6ContingencyProps) {
  const { register, watch, setValue } = form;

  const economicActivity = watch('summary_economicActivity') || '';

  // Determine category from activity
  const isCommerce = ['comercio'].includes(economicActivity);
  const isServices = ['servicios', 'independiente', 'empleado'].includes(economicActivity);
  const isManufacturing = ['manufactura'].includes(economicActivity);
  const isAgriculture = ['agricultura', 'ganaderia'].includes(economicActivity);

  return (
    <div className="space-y-6">
      {/* Economic Activity Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Actividad Económica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="summary_economicActivity">Actividad Económica del Solicitante</Label>
          <select
            id="summary_economicActivity"
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            {...register('summary_economicActivity')}
          >
            <option value="">Seleccione la actividad</option>
            <option value="comercio">Comercio</option>
            <option value="servicios">Servicios</option>
            <option value="manufactura">Manufactura</option>
            <option value="agricultura">Agricultura</option>
            <option value="ganaderia">Ganadería</option>
            <option value="independiente">Independiente</option>
            <option value="empleado">Empleado</option>
            <option value="otro">Otro</option>
          </select>
        </CardContent>
      </Card>

      {/* Commerce */}
      {isCommerce && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Contingencia - Comercio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <CurrencyInput
                  id="contingency_commerce_inventory"
                  label="Valor del Inventario"
                  value={watch('contingency_commerce_inventory') || 0}
                  onChange={(v) => setValue('contingency_commerce_inventory', v)}
                  placeholder="$0"
                />
              </div>
              <div>
                <CurrencyInput
                  id="contingency_commerce_salesVolume"
                  label="Volumen de Ventas Mensual"
                  value={watch('contingency_commerce_salesVolume') || 0}
                  onChange={(v) => setValue('contingency_commerce_salesVolume', v)}
                  placeholder="$0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contingency_commerce_suppliers">Principales Proveedores</Label>
              <Input id="contingency_commerce_suppliers" {...register('contingency_commerce_suppliers')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_commerce_location">Ubicación del Negocio</Label>
              <Input id="contingency_commerce_location" {...register('contingency_commerce_location')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_commerce_competition">Competencia</Label>
              <Input id="contingency_commerce_competition" {...register('contingency_commerce_competition')} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services */}
      {isServices && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Contingencia - Servicios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contingency_services_clients">Número de Clientes</Label>
                <Input
                  id="contingency_services_clients"
                  type="number"
                  min={0}
                  {...register('contingency_services_clients', { valueAsNumber: true })}
                  className="mt-1"
                />
              </div>
              <div>
                <CurrencyInput
                  id="contingency_services_avgTicket"
                  label="Ticket Promedio"
                  value={watch('contingency_services_avgTicket') || 0}
                  onChange={(v) => setValue('contingency_services_avgTicket', v)}
                  placeholder="$0"
                />
              </div>
              <div>
                <Label htmlFor="contingency_services_staff">Número de Empleados</Label>
                <Input
                  id="contingency_services_staff"
                  type="number"
                  min={0}
                  {...register('contingency_services_staff', { valueAsNumber: true })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contingency_services_equipment">Equipos y Herramientas</Label>
              <Input id="contingency_services_equipment" {...register('contingency_services_equipment')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_services_licenses">Licencias y Permisos</Label>
              <Input id="contingency_services_licenses" {...register('contingency_services_licenses')} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manufacturing */}
      {isManufacturing && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Contingencia - Manufactura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contingency_manufacturing_capacity">Capacidad de Producción</Label>
              <Input id="contingency_manufacturing_capacity" {...register('contingency_manufacturing_capacity')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_machinery">Maquinaria y Equipos</Label>
              <Input id="contingency_manufacturing_machinery" {...register('contingency_manufacturing_machinery')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_rawMaterials">Materias Primas</Label>
              <Input id="contingency_manufacturing_rawMaterials" {...register('contingency_manufacturing_rawMaterials')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_production">Proceso de Producción</Label>
              <Input id="contingency_manufacturing_production" {...register('contingency_manufacturing_production')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_distribution">Canales de Distribución</Label>
              <Input id="contingency_manufacturing_distribution" {...register('contingency_manufacturing_distribution')} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agriculture */}
      {isAgriculture && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Contingencia - Agricultura / Ganadería</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contingency_agriculture_landSize">Extensión del Terreno</Label>
              <Input id="contingency_agriculture_landSize" {...register('contingency_agriculture_landSize')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_crops">Cultivos / Productos</Label>
              <Input id="contingency_agriculture_crops" {...register('contingency_agriculture_crops')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_livestock">Inventario Pecuario</Label>
              <Input id="contingency_agriculture_livestock" {...register('contingency_agriculture_livestock')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_equipment">Equipos Agrícolas</Label>
              <Input id="contingency_agriculture_equipment" {...register('contingency_agriculture_equipment')} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_climate">Condiciones Climáticas / Riesgos</Label>
              <Input id="contingency_agriculture_climate" {...register('contingency_agriculture_climate')} className="mt-1" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fallback when no activity selected */}
      {!economicActivity && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            Seleccione la actividad económica del solicitante para ver los campos de análisis de contingencia correspondientes.
          </p>
        </div>
      )}

      {/* Other activity */}
      {economicActivity === 'otro' && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Contingencia - Otra Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              No hay campos específicos para esta actividad. Use los comentarios de la Mesa de Crédito para documentar el análisis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
