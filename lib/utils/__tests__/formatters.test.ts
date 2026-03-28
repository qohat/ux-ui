import {
  formatCurrency,
  parseCurrency,
  formatDate,
  formatDateISO,
  formatPhone,
  formatIdNumber,
} from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
      const result1 = formatCurrency(1000000);
      const result2 = formatCurrency(500);
      const result3 = formatCurrency(1234567);

      expect(result1).toContain('1.000.000');
      expect(result2).toContain('500');
      expect(result3).toContain('1.234.567');
    });

    it('formats zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toContain('0');
    });

    it('formats negative numbers correctly', () => {
      const result = formatCurrency(-1000);
      expect(result).toContain('1.000');
      expect(result).toContain('-');
    });

    it('handles decimal numbers by rounding', () => {
      // Intl.NumberFormat rounds to nearest integer
      const result1 = formatCurrency(1000.5);
      const result2 = formatCurrency(1000.4);

      expect(result1).toContain('1.001');
      expect(result2).toContain('1.000');
    });
  });

  describe('parseCurrency', () => {
    it('parses formatted currency strings correctly', () => {
      expect(parseCurrency('$ 1000000')).toBe(1000000);
      expect(parseCurrency('$ 500')).toBe(500);
      expect(parseCurrency('$ 1234567')).toBe(1234567);
    });

    it('handles strings without currency symbol', () => {
      expect(parseCurrency('1000000')).toBe(1000000);
      expect(parseCurrency('500')).toBe(500);
    });

    it('handles negative values', () => {
      expect(parseCurrency('-$ 1000')).toBe(-1000);
    });

    it('returns 0 for invalid input', () => {
      expect(parseCurrency('')).toBe(0);
      expect(parseCurrency('abc')).toBe(0);
      expect(parseCurrency('$')).toBe(0);
    });

    it('handles strings with extra spaces', () => {
      expect(parseCurrency(' $ 1000 ')).toBe(1000);
    });
  });

  describe('formatDate', () => {
    it('formats dates correctly in Colombian format', () => {
      const date = new Date('2026-03-27');
      const formatted = formatDate(date);
      // Intl.DateTimeFormat may format with or without leading zeros depending on locale
      expect(formatted).toMatch(/2[67]\/0?3\/2026/);
    });

    it('handles Date objects', () => {
      const date = new Date('2026-01-15');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/1[45]\/0?1\/2026/);
    });

    it('handles string dates', () => {
      const formatted = formatDate('2026-12-31');
      expect(formatted).toMatch(/3[01]\/1[12]\/2026/);
    });
  });

  describe('formatDateISO', () => {
    it('formats dates to ISO string', () => {
      const date = new Date('2026-03-27T10:30:00');
      const formatted = formatDateISO(date);
      expect(formatted).toMatch(/2026-03-27/);
    });

    it('handles string dates', () => {
      const formatted = formatDateISO('2026-03-27');
      expect(formatted).toMatch(/2026-03-27/);
    });
  });

  describe('formatPhone', () => {
    it('formats 10-digit phone numbers correctly', () => {
      expect(formatPhone('3001234567')).toBe('300 123 4567');
    });

    it('returns original string for non-10-digit phone numbers', () => {
      expect(formatPhone('1234567')).toBe('1234567');
      expect(formatPhone('12345')).toBe('12345');
    });

    it('returns original string for invalid phone numbers', () => {
      expect(formatPhone('abc')).toBe('abc');
      expect(formatPhone('')).toBe('');
    });

    it('handles phone numbers with spaces by removing them', () => {
      expect(formatPhone(' 3001234567 ')).toBe('300 123 4567');
    });
  });

  describe('formatIdNumber', () => {
    it('formats ID numbers with thousand separators', () => {
      expect(formatIdNumber('1234567890')).toBe('1.234.567.890');
      expect(formatIdNumber('123456')).toBe('123.456');
    });

    it('returns original string for empty input', () => {
      expect(formatIdNumber('')).toBe('');
    });

    it('handles numbers with existing separators', () => {
      expect(formatIdNumber('1.234.567')).toBe('1.234.567');
    });

    it('removes non-numeric characters before formatting', () => {
      expect(formatIdNumber('123abc456')).toBe('123.456');
    });
  });
});
