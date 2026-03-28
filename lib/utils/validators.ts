/**
 * Validation utilities
 */

/**
 * Validate Colombian ID number (Cédula de Ciudadanía)
 * Basic validation - checks format and length
 */
export function validateColombianId(id: string): boolean {
  const cleaned = id.replace(/\D/g, '');
  return cleaned.length >= 6 && cleaned.length <= 10;
}

/**
 * Validate Colombian mobile number
 * Format: 3XX XXX XXXX (10 digits starting with 3)
 */
export function validateColombianMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/\D/g, '');
  return cleaned.length === 10 && cleaned.startsWith('3');
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Colombian bank account number
 */
export function validateBankAccount(account: string): boolean {
  const cleaned = account.replace(/\D/g, '');
  return cleaned.length >= 8 && cleaned.length <= 20;
}

/**
 * Validate date is in past
 */
export function validatePastDate(date: string | Date): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d < new Date();
}

/**
 * Validate date is at least 18 years ago (for birthdate)
 */
export function validateAdultAge(birthDate: string | Date): boolean {
  const d = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  const age = today.getFullYear() - d.getFullYear();
  const monthDiff = today.getMonth() - d.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
}

/**
 * Validate file size (in bytes)
 */
export function validateFileSize(file: File, maxSizeBytes: number): boolean {
  return file.size <= maxSizeBytes;
}

/**
 * Validate file type
 */
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Validate amount is positive number
 */
export function validatePositiveAmount(amount: number): boolean {
  return amount > 0 && !isNaN(amount) && isFinite(amount);
}

/**
 * Validate term months (between 1 and 120)
 */
export function validateTermMonths(months: number): boolean {
  return Number.isInteger(months) && months >= 1 && months <= 120;
}
