import {
  validateColombianId,
  validateColombianMobile,
  validateEmail,
  validateAdultAge,
  validateFileSize,
  validateFileType,
} from '../validators';

describe('validators', () => {
  describe('validateColombianId', () => {
    it('validates correct Colombian IDs', () => {
      expect(validateColombianId('123456')).toBe(true);
      expect(validateColombianId('1234567890')).toBe(true);
      expect(validateColombianId('12345678')).toBe(true);
    });

    it('rejects IDs that are too short', () => {
      expect(validateColombianId('12345')).toBe(false);
      expect(validateColombianId('123')).toBe(false);
    });

    it('rejects IDs that are too long', () => {
      expect(validateColombianId('12345678901')).toBe(false);
    });

    it('rejects non-numeric IDs', () => {
      expect(validateColombianId('123abc')).toBe(false);
      expect(validateColombianId('abc123')).toBe(false);
    });

    it('rejects empty strings', () => {
      expect(validateColombianId('')).toBe(false);
    });

    it('handles IDs with spaces', () => {
      expect(validateColombianId(' 1234567 ')).toBe(true);
    });
  });

  describe('validateColombianMobile', () => {
    it('validates correct Colombian mobile numbers', () => {
      expect(validateColombianMobile('3001234567')).toBe(true);
      expect(validateColombianMobile('3101234567')).toBe(true);
      expect(validateColombianMobile('3201234567')).toBe(true);
      expect(validateColombianMobile('3501234567')).toBe(true);
    });

    it('rejects numbers not starting with 3', () => {
      expect(validateColombianMobile('2001234567')).toBe(false);
      expect(validateColombianMobile('4001234567')).toBe(false);
    });

    it('rejects numbers with incorrect length', () => {
      expect(validateColombianMobile('300123456')).toBe(false); // 9 digits
      expect(validateColombianMobile('30012345678')).toBe(false); // 11 digits
    });

    it('rejects non-numeric values', () => {
      expect(validateColombianMobile('300abc4567')).toBe(false);
    });

    it('rejects empty strings', () => {
      expect(validateColombianMobile('')).toBe(false);
    });

    it('handles numbers with spaces', () => {
      expect(validateColombianMobile(' 3001234567 ')).toBe(true);
    });
  });

  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@example.co')).toBe(true);
      expect(validateEmail('user+tag@example.com')).toBe(true);
      expect(validateEmail('user_name@sub.example.com')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('invalid@.com')).toBe(false);
    });

    it('rejects empty strings', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('handles emails with spaces (should reject)', () => {
      expect(validateEmail('test @example.com')).toBe(false);
      expect(validateEmail(' test@example.com ')).toBe(false); // spaces not trimmed
    });
  });

  describe('validateAdultAge', () => {
    it('validates adults (18 years or older)', () => {
      const date19YearsAgo = new Date();
      date19YearsAgo.setFullYear(date19YearsAgo.getFullYear() - 19);

      const date30YearsAgo = new Date();
      date30YearsAgo.setFullYear(date30YearsAgo.getFullYear() - 30);

      expect(validateAdultAge(date19YearsAgo.toISOString().split('T')[0])).toBe(true);
      expect(validateAdultAge(date30YearsAgo.toISOString().split('T')[0])).toBe(true);
    });

    it('rejects minors (under 18 years)', () => {
      const date17YearsAgo = new Date();
      date17YearsAgo.setFullYear(date17YearsAgo.getFullYear() - 17);

      const date10YearsAgo = new Date();
      date10YearsAgo.setFullYear(date10YearsAgo.getFullYear() - 10);

      expect(validateAdultAge(date17YearsAgo.toISOString().split('T')[0])).toBe(false);
      expect(validateAdultAge(date10YearsAgo.toISOString().split('T')[0])).toBe(false);
    });

    it('handles boundary case (exactly 18 years old)', () => {
      const dateExactly18 = new Date();
      dateExactly18.setFullYear(dateExactly18.getFullYear() - 18);
      dateExactly18.setDate(dateExactly18.getDate() - 1); // One day before 18th birthday today

      expect(validateAdultAge(dateExactly18.toISOString().split('T')[0])).toBe(true);
    });

    it('handles Date objects', () => {
      const date20YearsAgo = new Date();
      date20YearsAgo.setFullYear(date20YearsAgo.getFullYear() - 20);

      expect(validateAdultAge(date20YearsAgo)).toBe(true);
    });
  });

  describe('validateFileSize', () => {
    it('validates files within size limit', () => {
      const file1MB = new File(['x'.repeat(1024 * 1024)], 'test.pdf');
      const file3MB = new File(['x'.repeat(3 * 1024 * 1024)], 'test.pdf');
      const maxSize5MB = 5 * 1024 * 1024;

      expect(validateFileSize(file1MB, maxSize5MB)).toBe(true);
      expect(validateFileSize(file3MB, maxSize5MB)).toBe(true);
    });

    it('rejects files exceeding size limit', () => {
      const file6MB = new File(['x'.repeat(6 * 1024 * 1024)], 'test.pdf');
      const maxSize5MB = 5 * 1024 * 1024;

      expect(validateFileSize(file6MB, maxSize5MB)).toBe(false);
    });

    it('handles exact size match', () => {
      const file1MB = new File(['x'.repeat(1024 * 1024)], 'test.pdf');
      const maxSize1MB = 1024 * 1024;

      expect(validateFileSize(file1MB, maxSize1MB)).toBe(true);
    });

    it('handles empty files', () => {
      const emptyFile = new File([], 'empty.pdf');
      const maxSize5MB = 5 * 1024 * 1024;

      expect(validateFileSize(emptyFile, maxSize5MB)).toBe(true);
    });
  });

  describe('validateFileType', () => {
    it('validates PDF files', () => {
      const pdfFile = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      expect(validateFileType(pdfFile, ['application/pdf'])).toBe(true);
    });

    it('validates image files', () => {
      const jpgFile = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      const pngFile = new File(['content'], 'image.png', { type: 'image/png' });

      expect(validateFileType(jpgFile, ['image/jpeg', 'image/png'])).toBe(true);
      expect(validateFileType(pngFile, ['image/jpeg', 'image/png'])).toBe(true);
    });

    it('rejects files with incorrect type', () => {
      const txtFile = new File(['content'], 'document.txt', { type: 'text/plain' });
      expect(validateFileType(txtFile, ['application/pdf'])).toBe(false);
    });

    it('handles multiple allowed types', () => {
      const pdfFile = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      const jpgFile = new File(['content'], 'image.jpg', { type: 'image/jpeg' });
      const txtFile = new File(['content'], 'document.txt', { type: 'text/plain' });

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

      expect(validateFileType(pdfFile, allowedTypes)).toBe(true);
      expect(validateFileType(jpgFile, allowedTypes)).toBe(true);
      expect(validateFileType(txtFile, allowedTypes)).toBe(false);
    });

    it('checks exact match for file types', () => {
      const pdfFile = new File(['content'], 'document.pdf', { type: 'application/pdf' });
      expect(validateFileType(pdfFile, ['application/pdf'])).toBe(true);
      expect(validateFileType(pdfFile, ['application/x-pdf'])).toBe(false);
    });
  });
});
