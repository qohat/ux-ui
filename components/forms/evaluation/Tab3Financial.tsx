'use client';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { EvaluationFormData } from '@/lib/validations/evaluation.schema';
import { CurrencyInput } from '@/components/forms/shared/CurrencyInput';
import { formatCurrency } from '@/lib/utils/formatters';
import { sum } from '@/lib/utils/calculators';

interface Tab3FinancialProps {
  form: UseFormReturn<EvaluationFormData>;
}

export function Tab3Financial({ form }: Tab3FinancialProps) {
  const { register, watch, setValue } = form;

  // Watch all asset fields
  const assetsProperty = watch('assets_property') || 0;
  const assetsVehicles = watch('assets_vehicles') || 0;
  const assetsInventory = watch('assets_inventory') || 0;
  const assetsAccounts = watch('assets_accounts') || 0;
  const assetsOther = watch('assets_other') || 0;

  // Watch all liability fields
  const liabilitiesLoans = watch('liabilities_loans') || 0;
  const liabilitiesCards = watch('liabilities_cards') || 0;
  const liabilitiesSuppliers = watch('liabilities_suppliers') || 0;
  const liabilitiesOther = watch('liabilities_other') || 0;

  // Watch all income fields
  const incomeSales = watch('income_sales') || 0;
  const incomeServices = watch('income_services') || 0;
  const incomeOther = watch('income_other') || 0;
  const incomeFamily = watch('income_family') || 0;

  // Watch all expense fields
  const expenseCost = watch('expense_cost') || 0;
  const expenseOperating = watch('expense_operating') || 0;
  const expensePersonal = watch('expense_personal') || 0;

  // Watch deduction fields
  const deductionFamilyLoad = watch('deduction_familyLoad') || 0;
  const deductionOtherObligations = watch('deduction_otherObligations') || 0;
  const deductionLiving = watch('deduction_living') || 0;

  // Auto-calculate totals
  useEffect(() => {
    const totalAssets = sum(assetsProperty, assetsVehicles, assetsInventory, assetsAccounts, assetsOther);
    const totalLiabilities = sum(liabilitiesLoans, liabilitiesCards, liabilitiesSuppliers, liabilitiesOther);
    const equity = totalAssets - totalLiabilities;
    const totalIncome = sum(incomeSales, incomeServices, incomeOther, incomeFamily);
    const totalExpenses = sum(expenseCost, expenseOperating, expensePersonal);
    const grossCapacity = totalIncome - totalExpenses;
    const totalDeductions = sum(deductionFamilyLoad, deductionOtherObligations, deductionLiving);
    const netCapacity = grossCapacity - totalDeductions;

    setValue('totalAssets', totalAssets);
    setValue('totalLiabilities', totalLiabilities);
    setValue('equity', equity);
    setValue('totalIncome', totalIncome);
    setValue('totalExpenses', totalExpenses);
    setValue('grossCapacity', grossCapacity);
    setValue('totalDeductions', totalDeductions);
    setValue('netCapacity', netCapacity);
  }, [
    assetsProperty, assetsVehicles, assetsInventory, assetsAccounts, assetsOther,
    liabilitiesLoans, liabilitiesCards, liabilitiesSuppliers, liabilitiesOther,
    incomeSales, incomeServices, incomeOther, incomeFamily,
    expenseCost, expenseOperating, expensePersonal,
    deductionFamilyLoad, deductionOtherObligations, deductionLiving,
    setValue
  ]);

  return (
    <div className="space-y-6">
      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Activos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CurrencyInput
                id="assets_property"
                label="Inmuebles"
                value={assetsProperty}
                onChange={(value) => setValue('assets_property', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="assets_vehicles"
                label="Vehículos"
                value={assetsVehicles}
                onChange={(value) => setValue('assets_vehicles', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="assets_inventory"
                label="Inventario"
                value={assetsInventory}
                onChange={(value) => setValue('assets_inventory', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="assets_accounts"
                label="Cuentas por Cobrar"
                value={assetsAccounts}
                onChange={(value) => setValue('assets_accounts', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="assets_other"
                label="Otros Activos"
                value={assetsOther}
                onChange={(value) => setValue('assets_other', value)}
                placeholder="$0"
              />
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Activos:</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(watch('totalAssets') || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Pasivos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CurrencyInput
                id="liabilities_loans"
                label="Préstamos Bancarios"
                value={liabilitiesLoans}
                onChange={(value) => setValue('liabilities_loans', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="liabilities_cards"
                label="Tarjetas de Crédito"
                value={liabilitiesCards}
                onChange={(value) => setValue('liabilities_cards', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="liabilities_suppliers"
                label="Cuentas por Pagar"
                value={liabilitiesSuppliers}
                onChange={(value) => setValue('liabilities_suppliers', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="liabilities_other"
                label="Otros Pasivos"
                value={liabilitiesOther}
                onChange={(value) => setValue('liabilities_other', value)}
                placeholder="$0"
              />
            </div>
          </div>
          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Pasivos:</span>
              <span className="text-xl font-bold text-red-600">
                {formatCurrency(watch('totalLiabilities') || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Patrimonio:</span>
              <span className={`text-xl font-bold ${(watch('equity') || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(watch('equity') || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Ingresos Mensuales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CurrencyInput
                id="income_sales"
                label="Ventas"
                value={incomeSales}
                onChange={(value) => setValue('income_sales', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="income_services"
                label="Servicios"
                value={incomeServices}
                onChange={(value) => setValue('income_services', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="income_other"
                label="Otros Ingresos"
                value={incomeOther}
                onChange={(value) => setValue('income_other', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="income_family"
                label="Ingresos Familiares"
                value={incomeFamily}
                onChange={(value) => setValue('income_family', value)}
                placeholder="$0"
              />
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Ingresos:</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(watch('totalIncome') || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-600" />
            Egresos Mensuales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CurrencyInput
                id="expense_cost"
                label="Costo de Ventas"
                value={expenseCost}
                onChange={(value) => setValue('expense_cost', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="expense_operating"
                label="Gastos Operativos"
                value={expenseOperating}
                onChange={(value) => setValue('expense_operating', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="expense_personal"
                label="Gastos Personales"
                value={expensePersonal}
                onChange={(value) => setValue('expense_personal', value)}
                placeholder="$0"
              />
            </div>
          </div>
          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Egresos:</span>
              <span className="text-xl font-bold text-red-600">
                {formatCurrency(watch('totalExpenses') || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Capacidad Bruta:</span>
              <span className={`text-xl font-bold ${(watch('grossCapacity') || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(watch('grossCapacity') || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-orange-600" />
            Deducciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <CurrencyInput
                id="deduction_familyLoad"
                label="Carga Familiar"
                value={deductionFamilyLoad}
                onChange={(value) => setValue('deduction_familyLoad', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="deduction_otherObligations"
                label="Otras Obligaciones"
                value={deductionOtherObligations}
                onChange={(value) => setValue('deduction_otherObligations', value)}
                placeholder="$0"
              />
            </div>
            <div>
              <CurrencyInput
                id="deduction_living"
                label="Gastos de Vida"
                value={deductionLiving}
                onChange={(value) => setValue('deduction_living', value)}
                placeholder="$0"
              />
            </div>
          </div>
          <div className="pt-4 border-t space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Deducciones:</span>
              <span className="text-xl font-bold text-orange-600">
                {formatCurrency(watch('totalDeductions') || 0)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-lg font-medium">Capacidad Neta:</span>
              <span className={`text-2xl font-bold ${(watch('netCapacity') || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(watch('netCapacity') || 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
