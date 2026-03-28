'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Store, Wrench, Factory, Sprout } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';

interface Tab6ContingencyProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab6Contingency({ form }: Tab6ContingencyProps) {
  const { register, watch, setValue } = form;
  const [selectedActivity, setSelectedActivity] = useState<string>('commerce');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Actividad Económica</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="summary_economicActivity">Descripción de la Actividad Económica</Label>
            <textarea
              id="summary_economicActivity"
              rows={3}
              className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Describa brevemente la actividad económica principal del cliente..."
              {...register('summary_economicActivity')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Activity Type Selector */}
      <div className="grid md:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => setSelectedActivity('commerce')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedActivity === 'commerce'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Store className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Comercio</p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedActivity('services')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedActivity === 'services'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Wrench className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Servicios</p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedActivity('manufacturing')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedActivity === 'manufacturing'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Factory className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Manufactura</p>
        </button>
        <button
          type="button"
          onClick={() => setSelectedActivity('agriculture')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedActivity === 'agriculture'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Sprout className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Agrícola</p>
        </button>
      </div>

      {/* Commerce Fields */}
      {selectedActivity === 'commerce' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Análisis de Comercio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <CurrencyInput
                  id="contingency_commerce_inventory"
                  label="Valor del Inventario"
                  value={watch('contingency_commerce_inventory') || 0}
                  onChange={(value) => setValue('contingency_commerce_inventory', value)}
                  placeholder="$0"
                />
              </div>
              <div>
                <CurrencyInput
                  id="contingency_commerce_salesVolume"
                  label="Volumen de Ventas Mensual"
                  value={watch('contingency_commerce_salesVolume') || 0}
                  onChange={(value) => setValue('contingency_commerce_salesVolume', value)}
                  placeholder="$0"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contingency_commerce_suppliers">Proveedores Principales</Label>
              <Input
                id="contingency_commerce_suppliers"
                placeholder="Ej: Proveedor A, Proveedor B..."
                {...register('contingency_commerce_suppliers')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_commerce_location">Ubicación del Negocio</Label>
              <Input
                id="contingency_commerce_location"
                placeholder="Describa la ubicación y características del local..."
                {...register('contingency_commerce_location')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_commerce_competition">Análisis de Competencia</Label>
              <textarea
                id="contingency_commerce_competition"
                rows={3}
                className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describa la competencia en el sector..."
                {...register('contingency_commerce_competition')}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Fields */}
      {selectedActivity === 'services' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Análisis de Servicios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contingency_services_clients">Número de Clientes Activos</Label>
                <Input
                  id="contingency_services_clients"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('contingency_services_clients', { valueAsNumber: true })}
                />
              </div>
              <div>
                <CurrencyInput
                  id="contingency_services_avgTicket"
                  label="Ticket Promedio"
                  value={watch('contingency_services_avgTicket') || 0}
                  onChange={(value) => setValue('contingency_services_avgTicket', value)}
                  placeholder="$0"
                />
              </div>
              <div>
                <Label htmlFor="contingency_services_staff">Personal Empleado</Label>
                <Input
                  id="contingency_services_staff"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('contingency_services_staff', { valueAsNumber: true })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contingency_services_equipment">Equipamiento y Herramientas</Label>
              <Input
                id="contingency_services_equipment"
                placeholder="Describa el equipamiento principal..."
                {...register('contingency_services_equipment')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_services_licenses">Licencias y Certificaciones</Label>
              <textarea
                id="contingency_services_licenses"
                rows={3}
                className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Liste las licencias y certificaciones relevantes..."
                {...register('contingency_services_licenses')}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manufacturing Fields */}
      {selectedActivity === 'manufacturing' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Análisis de Manufactura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contingency_manufacturing_capacity">Capacidad de Producción</Label>
              <Input
                id="contingency_manufacturing_capacity"
                placeholder="Ej: 1000 unidades/mes"
                {...register('contingency_manufacturing_capacity')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_machinery">Maquinaria y Equipo</Label>
              <textarea
                id="contingency_manufacturing_machinery"
                rows={3}
                className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describa la maquinaria principal..."
                {...register('contingency_manufacturing_machinery')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_rawMaterials">Materias Primas</Label>
              <Input
                id="contingency_manufacturing_rawMaterials"
                placeholder="Principales materias primas utilizadas..."
                {...register('contingency_manufacturing_rawMaterials')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_production">Proceso de Producción</Label>
              <textarea
                id="contingency_manufacturing_production"
                rows={3}
                className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describa el proceso de producción..."
                {...register('contingency_manufacturing_production')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_manufacturing_distribution">Canales de Distribución</Label>
              <Input
                id="contingency_manufacturing_distribution"
                placeholder="¿Cómo distribuye sus productos?"
                {...register('contingency_manufacturing_distribution')}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agriculture Fields */}
      {selectedActivity === 'agriculture' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Análisis Agrícola
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contingency_agriculture_landSize">Extensión de Tierra</Label>
              <Input
                id="contingency_agriculture_landSize"
                placeholder="Ej: 10 hectáreas"
                {...register('contingency_agriculture_landSize')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_crops">Cultivos Principales</Label>
              <Input
                id="contingency_agriculture_crops"
                placeholder="Ej: Café, maíz, plátano..."
                {...register('contingency_agriculture_crops')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_livestock">Ganadería</Label>
              <Input
                id="contingency_agriculture_livestock"
                placeholder="Tipo y cantidad de ganado..."
                {...register('contingency_agriculture_livestock')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_equipment">Maquinaria Agrícola</Label>
              <textarea
                id="contingency_agriculture_equipment"
                rows={3}
                className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describa la maquinaria disponible..."
                {...register('contingency_agriculture_equipment')}
              />
            </div>
            <div>
              <Label htmlFor="contingency_agriculture_climate">Condiciones Climáticas y Riesgos</Label>
              <textarea
                id="contingency_agriculture_climate"
                rows={3}
                className="mt-1 flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Describa condiciones climáticas y riesgos potenciales..."
                {...register('contingency_agriculture_climate')}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> El análisis de contingencia debe evaluar los riesgos específicos del sector económico y las medidas de mitigación implementadas por el cliente.
        </p>
      </div>
    </div>
  );
}
