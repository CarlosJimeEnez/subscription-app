import { Expense } from '@/interface/expense.interface';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ExpensesList from './ExpensesList';

interface Props {
  expenses: Expense[];
  className?: string;
  title?: string;
  showTitle?: boolean;
  onExpensePress?: (expense: Expense) => void;
  maxItems?: number;
  scrollable?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}

const ExpensesContainer = ({ 
  expenses,
  className,
  title = 'Movimientos Recientes',
  showTitle = true,
  onExpensePress,
  maxItems,
  scrollable = true,
  isLoading,
  isError,
  error
}: Props) => {

  const limitedData = maxItems && expenses
    ? expenses.slice(0, maxItems)
    : expenses;

  const content = (
    <View className={className}>
      {showTitle && (
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-text text-2xl font-bold">
            {title}
          </Text>

          {/* Numero de movimiento */}
          {expenses && expenses.length > 0 && (
            <Text className="text-gray-400 text-sm">
              {expenses.length} movimiento{expenses.length !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
      )}
      
      <ExpensesList 
        className="" 
        expenses={limitedData}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      
      {maxItems && expenses && expenses.length > maxItems && (
        <View className="mt-4 items-center">
          <Text className="text-accent text-sm font-medium">
            Ver todos los movimientos ({expenses.length - maxItems} más)
          </Text>
        </View>
      )}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView>
        {content}
      </ScrollView>
    );
  }

  return content;
};

export default ExpensesContainer;