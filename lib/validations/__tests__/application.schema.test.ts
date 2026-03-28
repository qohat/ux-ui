import { step1Schema, step5Schema } from '../application.schema';

// Helper to get a date string N years ago
const yearsAgo = (n: number): string => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - n);
  return d.toISOString().split('T')[0];
};

const tomorrow = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const today = (): string => new Date().toISOString().split('T')[0];

describe('step1Schema - birthDate', () => {
  const base = {
    firstName: 'Juan',
    lastName: 'Pérez',
    idNumber: '1234567890',
    idIssueDate: '2015-01-01',
    gender: 'masculino' as const,
    maritalStatus: 'soltero' as const,
    mobile: '3001234567',
  };

  it('accepts a person exactly 18 years old', () => {
    const result = step1Schema.safeParse({ ...base, birthDate: yearsAgo(18) });
    expect(result.success).toBe(true);
  });

  it('accepts a person 30 years old', () => {
    const result = step1Schema.safeParse({ ...base, birthDate: yearsAgo(30) });
    expect(result.success).toBe(true);
  });

  it('rejects a person 17 years old', () => {
    const result = step1Schema.safeParse({ ...base, birthDate: yearsAgo(17) });
    expect(result.success).toBe(false);
    if (!result.success) {
      const msg = result.error.issues[0].message;
      expect(msg).toMatch(/18/);
    }
  });

  it('rejects a future birth date', () => {
    const result = step1Schema.safeParse({ ...base, birthDate: tomorrow() });
    expect(result.success).toBe(false);
  });

  it('rejects empty birthDate', () => {
    const result = step1Schema.safeParse({ ...base, birthDate: '' });
    expect(result.success).toBe(false);
  });
});

describe('step1Schema - idIssueDate', () => {
  const base = {
    firstName: 'Juan',
    lastName: 'Pérez',
    idNumber: '1234567890',
    birthDate: yearsAgo(30),
    gender: 'masculino' as const,
    maritalStatus: 'soltero' as const,
    mobile: '3001234567',
  };

  it('accepts a past issue date', () => {
    const result = step1Schema.safeParse({ ...base, idIssueDate: '2015-06-15' });
    expect(result.success).toBe(true);
  });

  it('accepts today as issue date', () => {
    const result = step1Schema.safeParse({ ...base, idIssueDate: today() });
    expect(result.success).toBe(true);
  });

  it('rejects a future issue date', () => {
    const result = step1Schema.safeParse({ ...base, idIssueDate: tomorrow() });
    expect(result.success).toBe(false);
    if (!result.success) {
      const msg = result.error.issues[0].message;
      expect(msg).toMatch(/futura/i);
    }
  });

  it('rejects empty idIssueDate', () => {
    const result = step1Schema.safeParse({ ...base, idIssueDate: '' });
    expect(result.success).toBe(false);
  });
});

describe('step5Schema - financial totals', () => {
  const validData = {
    totalIncome: 3000000,
    totalExpense: 1500000,
    netBalance: 1500000,
  };

  it('accepts valid financial data', () => {
    const result = step5Schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects zero totalIncome', () => {
    const result = step5Schema.safeParse({ ...validData, totalIncome: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects negative totalExpense', () => {
    const result = step5Schema.safeParse({ ...validData, totalExpense: -100 });
    expect(result.success).toBe(false);
  });

  it('rejects negative netBalance', () => {
    const result = step5Schema.safeParse({ ...validData, netBalance: -1 });
    expect(result.success).toBe(false);
  });

  it('accepts optional income fields as 0', () => {
    const result = step5Schema.safeParse({
      ...validData,
      familyIncome: 0,
      otherIncome: 0,
    });
    expect(result.success).toBe(true);
  });

  it('rejects negative optional income fields', () => {
    const result = step5Schema.safeParse({ ...validData, familyIncome: -500 });
    expect(result.success).toBe(false);
  });
});
