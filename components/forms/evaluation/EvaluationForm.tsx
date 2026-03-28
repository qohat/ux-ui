'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';
import { Tab1Resume } from './Tab1Resume';
import { Tab2Commercial } from './Tab2Commercial';
import { Tab3Financial } from './Tab3Financial';
import { Tab4Proposal } from './Tab4Proposal';
import { Tab5Committee } from './Tab5Committee';
import { Tab6Contingency } from './Tab6Contingency';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';
import { ApplicationDetails } from '@/lib/types/api.types';
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';
import { submitEvaluation, saveEvaluationDraft } from '@/lib/api/evaluations';

interface EvaluationFormProps {
  application: ApplicationDetails;
  initialData?: Partial<EvaluationFormData>;
}

const tabs = [
  { id: 0, name: 'Resumen', component: Tab1Resume },
  { id: 1, name: 'Validación Comercial', component: Tab2Commercial },
  { id: 2, name: 'Análisis Financiero', component: Tab3Financial },
  { id: 3, name: 'Propuesta Asesor', component: Tab4Proposal },
  { id: 4, name: 'Mesa de Crédito', component: Tab5Committee },
  { id: 5, name: 'Análisis Contingencia', component: Tab6Contingency },
];

export function EvaluationForm({ application, initialData }: EvaluationFormProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<EvaluationFormData>({
    mode: 'onChange',
    defaultValues: {
      applicationNumber: application.applicationNumber,
      ...initialData,
    },
  });

  const { watch } = form;

  // Form persistence
  const { save, load } = useFormPersistence(
    `evaluation-${application.applicationNumber}`,
    form,
    currentTab
  );

  // Load saved data on mount
  useEffect(() => {
    load();
  }, [load]);

  // Save on tab change
  useEffect(() => {
    save();
  }, [currentTab, save]);

  const goToTab = (tabIndex: number) => {
    if (tabIndex >= 0 && tabIndex < tabs.length) {
      setCurrentTab(tabIndex);
    }
  };

  const goToNextTab = () => {
    if (currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1);
    }
  };

  const goToPreviousTab = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleSaveDraft = async () => {
    try {
      save();
      const formData = form.getValues();

      await saveEvaluationDraft(application.applicationNumber, formData);

      alert('Borrador guardado exitosamente');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error al guardar el borrador. Los datos se guardaron localmente.');
    }
  };

  const onSubmit = async (data: EvaluationFormData) => {
    try {
      setIsSubmitting(true);

      // Validate required fields for final submission
      if (!data.mesa_decision) {
        alert('Debe completar la decisión de Mesa de Crédito antes de enviar');
        setCurrentTab(4); // Go to Tab 5 (Credit Committee)
        return;
      }

      // Submit evaluation to API
      const response = await submitEvaluation(data);

      if (response.success) {
        // Clear saved form data from localStorage
        sessionStorage.removeItem(`evaluation-${application.applicationNumber}`);

        alert(`Evaluación enviada exitosamente\nDecisión: ${data.mesa_decision}`);
        router.push('/dashboard');
      } else {
        alert('Error al enviar la evaluación: ' + response.message);
      }
    } catch (error: any) {
      console.error('Error submitting evaluation:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      alert('Error al enviar la evaluación: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentTab + 1) / tabs.length) * 100;
  const isFirstTab = currentTab === 0;
  const isLastTab = currentTab === tabs.length - 1;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Paso {currentTab + 1} de {tabs.length}
          </span>
          <span className="text-sm text-gray-600">{tabs[currentTab].name}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          {tabs.map((tab, index) => {
            const isActive = currentTab === index;
            const isCompleted = index < currentTab;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => goToTab(index)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Tab Content */}
        <div className="min-h-[400px]">
          {currentTab === 0 && <Tab1Resume application={application} />}
          {currentTab === 1 && <Tab2Commercial form={form} />}
          {currentTab === 2 && <Tab3Financial form={form} />}
          {currentTab === 3 && <Tab4Proposal form={form} />}
          {currentTab === 4 && <Tab5Committee form={form} />}
          {currentTab === 5 && <Tab6Contingency form={form} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousTab}
            disabled={isFirstTab}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              className="gap-2"
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4" />
              Guardar Borrador
            </Button>

            {!isLastTab ? (
              <Button type="button" onClick={goToNextTab} className="gap-2">
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar Evaluación
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>

      {/* Auto-save Indicator */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Los cambios se guardan automáticamente cada 30 segundos
        </p>
      </div>
    </div>
  );
}
