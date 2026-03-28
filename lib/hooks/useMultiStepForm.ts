'use client';

import { useState, useCallback } from 'react';

/**
 * Hook for managing multi-step form navigation
 */
export function useMultiStepForm(totalSteps: number, initialStep: number = 0) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const goToPrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return {
    currentStep,
    goToNext,
    goToPrevious,
    goToStep,
    reset,
    isFirstStep,
    isLastStep,
    progress,
    totalSteps,
  };
}
