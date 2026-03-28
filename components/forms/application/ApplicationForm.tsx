'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useMultiStepForm } from '@/lib/hooks/useMultiStepForm';
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';
import { applicationStepSchemas, type ApplicationFormData } from '@/lib/validations/application.schema';
import { STORAGE_KEYS, APPLICATION_STEPS } from '@/lib/constants';

// Step components
import { Step1Personal } from './Step1Personal';
import { Step2Address } from './Step2Address';
import { Step3Credit } from './Step3Credit';
import { Step4Employment } from './Step4Employment';
import { Step5Financial } from './Step5Financial';
import { Step6Documents } from './Step6Documents';

const stepComponents = [
  Step1Personal,
  Step2Address,
  Step3Credit,
  Step4Employment,
  Step5Financial,
  Step6Documents,
];

const stepTitles = [
  'Datos Personales',
  'Dirección',
  'Crédito',
  'Actividad Económica',
  'Información Financiera',
  'Documentos',
];

export function ApplicationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<{
    bankCert?: File;
    idFront?: File;
    idBack?: File;
    photoProfile?: File;
  }>({});

  const { currentStep, goToNext, goToPrevious, goToStep, isFirstStep, isLastStep, progress } =
    useMultiStepForm(APPLICATION_STEPS.TOTAL);

  const form = useForm<ApplicationFormData>({
    // Use combined schema for all fields, validate step-by-step manually
    mode: 'onChange',
  });

  const { clear: clearCache } = useFormPersistence(
    STORAGE_KEYS.APPLICATION_FORM,
    form.watch(),
    currentStep
  );

  const onNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      goToNext();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onPrevious = () => {
    goToPrevious();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Import API function dynamically to avoid issues
      const { submitApplication } = await import('@/lib/api/applications');

      // Submit application
      const response = await submitApplication(data, files);

      // Clear cache on success
      clearCache();

      // Redirect to confirmation page with application number
      router.push(`/confirmacion/${response.applicationNumber}`);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Ocurrió un error al enviar la solicitud. Por favor intente nuevamente.';
      setSubmitError(errorMessage);

      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Solicitud de Crédito</h1>
          <span className="text-sm text-gray-600">
            Paso {currentStep + 1} de {APPLICATION_STEPS.TOTAL}
          </span>
        </div>
        <Progress value={progress} className="h-2" />

        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {stepTitles.map((title, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToStep(index)}
              disabled={index > currentStep}
              className={`text-xs md:text-sm px-2 py-1 rounded transition-colors ${
                index === currentStep
                  ? 'bg-primary text-white font-semibold'
                  : index < currentStep
                  ? 'text-primary hover:bg-primary/10'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{stepTitles[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {currentStep === APPLICATION_STEPS.DOCUMENTS ? (
              <Step6Documents form={form} files={files} onFilesChange={setFiles} />
            ) : (
              <StepComponent form={form} />
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{submitError}</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstStep || isSubmitting}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>

              {!isLastStep ? (
                <Button type="button" onClick={onNext} disabled={isSubmitting}>
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          ¿Necesita ayuda? Contacte a nuestro equipo de soporte al{' '}
          <a href="tel:+573001234567" className="text-blue-600 hover:underline">
            300 123 4567
          </a>
        </p>
      </div>
    </div>
  );
}
