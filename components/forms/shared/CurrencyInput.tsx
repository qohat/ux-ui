'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency, parseCurrency } from '@/lib/utils/formatters';

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
  const [displayValue, setDisplayValue] = React.useState<string>(() =>
    value ? formatCurrency(value) : ''
  );

  // Update display value when external value changes
  React.useEffect(() => {
    if (value !== parseCurrency(displayValue)) {
      setDisplayValue(value ? formatCurrency(value) : '');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input
    if (inputValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/[^\d]/g, '');

    if (numericValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }

    const parsedValue = parseInt(numericValue, 10);

    if (!isNaN(parsedValue)) {
      setDisplayValue(formatCurrency(parsedValue));
      onChange(parsedValue);
    }
  };

  const handleBlur = () => {
    // Reformat on blur
    if (displayValue) {
      const numericValue = parseCurrency(displayValue);
      setDisplayValue(formatCurrency(numericValue));
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? 'border-red-500' : ''}
        inputMode="numeric"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
