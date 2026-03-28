/**
 * Financial calculation utilities
 */

/**
 * Calculate monthly payment (PMT) using loan formula
 * PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
 *
 * @param principal - Loan amount
 * @param annualRate - Annual interest rate (e.g., 0.12 for 12%)
 * @param months - Loan term in months
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;

  // If rate is 0, simple division
  if (annualRate === 0) {
    return principal / months;
  }

  const monthlyRate = annualRate / 12;
  const payment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(payment);
}

/**
 * Calculate total payment
 */
export function calculateTotalPayment(
  monthlyPayment: number,
  months: number
): number {
  return monthlyPayment * months;
}

/**
 * Calculate total interest
 */
export function calculateTotalInterest(
  totalPayment: number,
  principal: number
): number {
  return totalPayment - principal;
}

/**
 * Calculate net balance (income - expenses)
 */
export function calculateNetBalance(income: number, expenses: number): number {
  return income - expenses;
}

/**
 * Calculate payment capacity (percentage of income)
 */
export function calculatePaymentCapacity(
  monthlyPayment: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) return 0;
  return (monthlyPayment / monthlyIncome) * 100;
}

/**
 * Calculate equity (assets - liabilities)
 */
export function calculateEquity(assets: number, liabilities: number): number {
  return assets - liabilities;
}

/**
 * Calculate gross payment capacity
 */
export function calculateGrossCapacity(
  totalIncome: number,
  totalExpenses: number
): number {
  return totalIncome - totalExpenses;
}

/**
 * Calculate net payment capacity
 */
export function calculateNetCapacity(
  grossCapacity: number,
  totalDeductions: number
): number {
  return grossCapacity - totalDeductions;
}

/**
 * Sum array of numbers
 */
export function sum(...values: (number | undefined)[]): number {
  return values.reduce<number>((acc, val) => acc + (val || 0), 0);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}
