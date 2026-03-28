import {
  calculateMonthlyPayment,
  calculateNetBalance,
  calculateEquity,
  sum,
} from '../calculators';

describe('calculators', () => {
  describe('calculateMonthlyPayment', () => {
    it('calculates monthly payment with interest correctly', () => {
      // Principal: 5,000,000, Rate: 18%, Term: 12 months
      const payment = calculateMonthlyPayment(5000000, 0.18, 12);

      // Expected: approximately 458,698 COP per month
      expect(payment).toBeGreaterThan(450000);
      expect(payment).toBeLessThan(470000);
    });

    it('calculates monthly payment with zero interest rate', () => {
      // With 0% interest, payment should be principal / months
      const payment = calculateMonthlyPayment(12000, 0, 12);
      expect(payment).toBe(1000);
    });

    it('calculates payment for different terms', () => {
      const payment12 = calculateMonthlyPayment(1000000, 0.18, 12);
      const payment24 = calculateMonthlyPayment(1000000, 0.18, 24);
      const payment36 = calculateMonthlyPayment(1000000, 0.18, 36);

      // Longer terms should have lower monthly payments
      expect(payment12).toBeGreaterThan(payment24);
      expect(payment24).toBeGreaterThan(payment36);
    });

    it('handles large loan amounts', () => {
      const payment = calculateMonthlyPayment(100000000, 0.18, 120);
      expect(payment).toBeGreaterThan(0);
      expect(payment).toBeLessThan(100000000);
    });

    it('handles very low interest rates', () => {
      const payment = calculateMonthlyPayment(1000000, 0.01, 12);
      expect(payment).toBeGreaterThan(83000);
      expect(payment).toBeLessThan(85000);
    });

    it('returns rounded integer values', () => {
      const payment = calculateMonthlyPayment(5000000, 0.18, 12);
      expect(Number.isInteger(payment)).toBe(true);
    });
  });

  describe('calculateNetBalance', () => {
    it('calculates positive net balance', () => {
      const income = 5000000;
      const expenses = 3000000;

      expect(calculateNetBalance(income, expenses)).toBe(2000000);
    });

    it('calculates negative net balance', () => {
      const income = 2000000;
      const expenses = 3000000;

      expect(calculateNetBalance(income, expenses)).toBe(-1000000);
    });

    it('handles zero income', () => {
      expect(calculateNetBalance(0, 1000000)).toBe(-1000000);
    });

    it('handles zero expenses', () => {
      expect(calculateNetBalance(1000000, 0)).toBe(1000000);
    });

    it('handles both zero', () => {
      expect(calculateNetBalance(0, 0)).toBe(0);
    });

    it('handles decimal values', () => {
      expect(calculateNetBalance(1500.5, 1000.3)).toBeCloseTo(500.2, 1);
    });
  });

  describe('calculateEquity', () => {
    it('calculates positive equity', () => {
      const assets = 10000000;
      const liabilities = 4000000;

      expect(calculateEquity(assets, liabilities)).toBe(6000000);
    });

    it('calculates negative equity', () => {
      const assets = 3000000;
      const liabilities = 5000000;

      expect(calculateEquity(assets, liabilities)).toBe(-2000000);
    });

    it('handles zero liabilities', () => {
      expect(calculateEquity(5000000, 0)).toBe(5000000);
    });

    it('handles zero assets', () => {
      expect(calculateEquity(0, 3000000)).toBe(-3000000);
    });

    it('handles both zero', () => {
      expect(calculateEquity(0, 0)).toBe(0);
    });

    it('handles decimal values', () => {
      expect(calculateEquity(5000.75, 2000.25)).toBeCloseTo(3000.5, 1);
    });
  });

  describe('sum', () => {
    it('sums multiple positive numbers', () => {
      expect(sum(1, 2, 3, 4, 5)).toBe(15);
      expect(sum(100, 200, 300)).toBe(600);
    });

    it('handles negative numbers', () => {
      expect(sum(-5, 10, -3)).toBe(2);
      expect(sum(-10, -20, -30)).toBe(-60);
    });

    it('handles zero values', () => {
      expect(sum(0, 0, 0)).toBe(0);
      expect(sum(1, 0, 2, 0, 3)).toBe(6);
    });

    it('handles undefined values', () => {
      expect(sum(1, undefined, 2, undefined, 3)).toBe(6);
      expect(sum(undefined, undefined)).toBe(0);
    });

    it('handles single value', () => {
      expect(sum(42)).toBe(42);
      expect(sum(undefined)).toBe(0);
    });

    it('handles empty arguments', () => {
      expect(sum()).toBe(0);
    });

    it('handles decimal values', () => {
      expect(sum(1.5, 2.3, 3.7)).toBeCloseTo(7.5, 1);
    });

    it('handles mixed undefined and numbers', () => {
      expect(sum(100, undefined, 200, undefined, 300)).toBe(600);
    });

    it('handles large numbers', () => {
      expect(sum(1000000, 2000000, 3000000)).toBe(6000000);
    });
  });
});
