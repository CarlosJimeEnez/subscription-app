import { useExpenses } from '@/hooks/expenses/useExpenses';
import React from 'react';
import { View } from 'react-native';
import EmptyExpenses from './EmptyExpenses';
import ErrorExpenses from './ErrorExpenses';
import ExpenseItem from './ExpenseItem';
import LoadingExpenses from './LoadingExpenses';

interface Props {
  className?: string;
}

const ExpensesList = ({ className }: Props) => {
  const { expenses } = useExpenses();
  console.log(expenses);

  if (expenses.isLoading) {
    return <LoadingExpenses />;
  }

  if (expenses.isError) {
    return <ErrorExpenses error={expenses.error} />;
  }

  if (!expenses.data || expenses.data.length === 0) {
    return <EmptyExpenses />;
  }

  return (
    <View className={className}>
      {expenses.data.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </View>
  );
};

export default ExpensesList;