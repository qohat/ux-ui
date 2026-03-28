'use client';

import { useEffect, useRef, useState } from 'react';
import { useDebounce } from './useDebounce';

/**
 * Hook for auto-saving data with debounce
 * Shows save status (idle, saving, saved, error)
 */
export function useAutoSave<T>(
  data: T,
  onSave: (data: T) => Promise<void>,
  options: {
    delay?: number;
    enabled?: boolean;
  } = {}
) {
  const { delay = 2000, enabled = true } = options;
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const debouncedData = useDebounce(data, delay);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!enabled) return;

    const save = async () => {
      try {
        setStatus('saving');
        await onSave(debouncedData);
        setStatus('saved');

        // Reset to idle after 2 seconds
        setTimeout(() => setStatus('idle'), 2000);
      } catch (error) {
        console.error('Auto-save error:', error);
        setStatus('error');
      }
    };

    save();
  }, [debouncedData, onSave, enabled]);

  return { status };
}
