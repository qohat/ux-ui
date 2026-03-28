/**
 * SessionStorage helpers for form state persistence
 */

export interface StoredFormData<T = unknown> {
  data: T;
  step: number;
  timestamp: number;
  version: string;
}

const STORAGE_VERSION = '1.0';

/**
 * Save form data to sessionStorage
 */
export function saveFormData<T>(key: string, data: T, step: number): void {
  if (typeof window === 'undefined') return;

  const storedData: StoredFormData<T> = {
    data,
    step,
    timestamp: Date.now(),
    version: STORAGE_VERSION,
  };

  try {
    sessionStorage.setItem(key, JSON.stringify(storedData));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
}

/**
 * Load form data from sessionStorage
 */
export function loadFormData<T>(key: string): StoredFormData<T> | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(key);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as StoredFormData<T>;

    // Check version compatibility
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('Storage version mismatch, clearing cached data');
      clearFormData(key);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error loading from sessionStorage:', error);
    return null;
  }
}

/**
 * Clear form data from sessionStorage
 */
export function clearFormData(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
}

/**
 * Check if form data exists in sessionStorage
 */
export function hasFormData(key: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return sessionStorage.getItem(key) !== null;
  } catch (error) {
    console.error('Error checking sessionStorage:', error);
    return false;
  }
}

/**
 * Get all sessionStorage keys with a prefix
 */
export function getStorageKeys(prefix: string): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.error('Error getting storage keys:', error);
    return [];
  }
}

/**
 * Clear all form data (for cleanup)
 */
export function clearAllFormData(): void {
  if (typeof window === 'undefined') return;

  const formKeys = getStorageKeys('form_');
  formKeys.forEach((key) => clearFormData(key));
}
