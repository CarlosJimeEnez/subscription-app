import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useExpenses } from '@/hooks/expenses/useExpenses';
import { FormatPrice } from '@/helpers/formatPrice';
import LoadingExpenses from './LoadingExpenses';
import ErrorExpenses from './ErrorExpenses';

interface Props {
  className?: string;
  period?: 'today' | 'week' | 'month' | 'all';
}

const ExpensesSummary = ({ className, period = 'month' }: Props) => {
  const { expenses } = useExpenses();

  const summary = useMemo(() => {
    if (!expenses.data) return null;

    const now = new Date();
    let filteredExpenses = expenses.data;

    // Filtrar por período
    switch (period) {
      case 'today':
        filteredExpenses = expenses.data.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredExpenses = expenses.data.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= weekAgo;
        });
        break;
      case 'month':
        filteredExpenses = expenses.data.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.getMonth() === now.getMonth() && 
                 expenseDate.getFullYear() === now.getFullYear();
        });
        break;
    }

    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const count = filteredExpenses.length;
    const average = count > 0 ? total / count : 0;

    // Agrupar por categoría
    const byCategory = filteredExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(byCategory)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      total,
      count,
      average,
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null
    };
  }, [expenses.data, period]);

  if (expenses.isLoading) {
    return <LoadingExpenses message="Calculando resumen..." className={className} />;
  }

  if (expenses.isError) {
    return <ErrorExpenses error={expenses.error} className={className} />;
  }

  if (!summary) {
    return null;
  }

  const getPeriodLabel = () => {
    switch (period) {
      case 'today': return 'Hoy';
      case 'week': return 'Esta semana';
      case 'month': return 'Este mes';
      default: return 'Total';
    }
  };

  return (
    <View className={`bg-secondary rounded-lg p-4 ${className}`}>
      <Text className="text-text text-lg font-bold mb-3">
        Resumen - {getPeriodLabel()}
      </Text>
      
      <View className="flex-row justify-between mb-2">
        <View className="flex-1">
          <Text className="text-gray-400 text-sm">Total gastado</Text>
          <Text className="text-text text-xl font-bold">
            {FormatPrice.format(summary.total)}
          </Text>
        </View>
        
        <View className="flex-1 items-center">
          <Text className="text-gray-400 text-sm">Movimientos</Text>
          <Text className="text-text text-xl font-bold">
            {summary.count}
          </Text>
        </View>
        
        <View className="flex-1 items-end">
          <Text className="text-gray-400 text-sm">Promedio</Text>
          <Text className="text-text text-xl font-bold">
            {FormatPrice.format(summary.average)}
          </Text>
        </View>
      </View>
      
      {summary.topCategory && (
        <View className="mt-3 pt-3 border-t border-gray-600">
          <Text className="text-gray-400 text-sm mb-1">Categoría principal</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-text font-medium">
              {summary.topCategory.name}
            </Text>
            <Text className="text-accent font-bold">
              {FormatPrice.format(summary.topCategory.amount)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExpensesSummary;