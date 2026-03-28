'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';

export interface CurrencyInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  id?: string;
}

/**
 * Currency input that:
 * - Shows raw digits while typing (no formatting mid-input)
 * - Formats with thousand separators on blur
 * - Never produces NaN — empty input = 0
 */
export function CurrencyInput({
  label,
  value,
  onChange,
  placeholder = '$0',
  disabled = false,
  error,
  required = false,
  id,
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  // Raw string the user is typing (digits only, no formatting)
  const [rawInput, setRawInput] = React.useState<string>(() =>
    value > 0 ? String(value) : ''
  );

  // When the external value changes (e.g. form reset) and we're not focused, sync display
  React.useEffect(() => {
    if (!isFocused) {
      setRawInput(value > 0 ? String(value) : '');
    }
  }, [value, isFocused]);

  const formatThousands = (num: number): string =>
    num.toLocaleString('es-CO');

  const handleFocus = () => {
    setIsFocused(true);
    // Show plain digits while editing
    setRawInput(value > 0 ? String(value) : '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const digits = e.target.value.replace(/\D/g, '');
    setRawInput(digits);
    const parsed = digits === '' ? 0 : parseInt(digits, 10);
    onChange(isNaN(parsed) ? 0 : parsed);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (rawInput === '' || rawInput === '0') {
      setRawInput('');
    } else {
      // rawInput may already be formatted from a previous blur — strip and reformat
      const digits = rawInput.replace(/\D/g, '');
      const num = parseInt(digits, 10);
      setRawInput(isNaN(num) || num === 0 ? '' : formatThousands(num));
    }
  };

  // Always derive display from rawInput — it's the single source of truth for the visible string
  const displayValue = isFocused
    ? rawInput                          // plain digits while typing
    : rawInput;                         // formatted string after blur (set in handleBlur)

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder.replace('$', '').trim()}
          disabled={disabled}
          className={`flex h-9 w-full rounded-md border bg-transparent pl-7 pr-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-red-500' : 'border-input'
          }`}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
