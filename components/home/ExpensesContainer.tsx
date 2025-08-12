import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useExpenses } from '@/hooks/expenses/useExpenses';
import { Expense } from '@/interface/expense.interface';
import ExpensesList from './ExpensesList';

interface Props {
  className?: string;
  title?: string;
  showTitle?: boolean;
  onExpensePress?: (expense: Expense) => void;
  maxItems?: number;
  scrollable?: boolean;
}

const ExpensesContainer = ({ 
  className,
  title = 'Movimientos Recientes',
  showTitle = true,
  onExpensePress,
  maxItems,
  scrollable = true
}: Props) => {
  const { expenses } = useExpenses();

  const handleRefresh = () => {
    expenses.refetch();
  };

  const limitedData = maxItems && expenses.data 
    ? expenses.data.slice(0, maxItems)
    : expenses.data;

  const content = (
    <View className={className}>
      {showTitle && (
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-text text-2xl font-bold">
            {title}
          </Text>
          {expenses.data && expenses.data.length > 0 && (
            <Text className="text-gray-400 text-sm">
              {expenses.data.length} movimiento{expenses.data.length !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
      )}
      
      <ExpensesList className="" />
      
      {maxItems && expenses.data && expenses.data.length > maxItems && (
        <View className="mt-4 items-center">
          <Text className="text-accent text-sm font-medium">
            Ver todos los movimientos ({expenses.data.length - maxItems} más)
          </Text>
        </View>
      )}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={expenses.isRefetching}
            onRefresh={handleRefresh}
            tintColor="#3B82F6"
          />
        }
      >
        {content}
      </ScrollView>
    );
  }

  return content;
};

export default ExpensesContainer;