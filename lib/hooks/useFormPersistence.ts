'use client';

import { useEffect, useCallback, useRef } from 'react';
import {
  saveFormData,
  loadFormData,
  clearFormData,
  type StoredFormData,
} from '../storage/session';
import { AUTO_SAVE_INTERVAL } from '../constants';

/**
 * Hook for automatic form data persistence in sessionStorage
 * Auto-saves every 30 seconds and on step changes
 */
export function useFormPersistence<T>(
  storageKey: string,
  data: T,
  currentStep: number,
  enabled: boolean = true
) {
  const lastSavedRef = useRef<string>('');
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Save data to sessionStorage
  const save = useCallback(() => {
    if (!enabled) return;

    const dataString = JSON.stringify(data);
    // Only save if data has changed
    if (dataString !== lastSavedRef.current) {
      saveFormData(storageKey, data, currentStep);
      lastSavedRef.current = dataString;
    }
  }, [storageKey, data, currentStep, enabled]);

  // Load data from sessionStorage
  const load = useCallback((): StoredFormData<T> | null => {
    if (!enabled) return null;
    return loadFormData<T>(storageKey);
  }, [storageKey, enabled]);

  // Clear data from sessionStorage
  const clear = useCallback(() => {
    clearFormData(storageKey);
    lastSavedRef.current = '';
  }, [storageKey]);

  // Auto-save on interval
  useEffect(() => {
    if (!enabled) return;

    timerRef.current = setInterval(() => {
      save();
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [save, enabled]);

  // Save on step change
  useEffect(() => {
    if (enabled) {
      save();
    }
  }, [currentStep, save, enabled]);

  // Save on unmount
  useEffect(() => {
    return () => {
      if (enabled && data) {
        saveFormData(storageKey, data, currentStep);
      }
    };
  }, [storageKey, data, currentStep, enabled]);

  return {
    save,
    load,
    clear,
  };
}
