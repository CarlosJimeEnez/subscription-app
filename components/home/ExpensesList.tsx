import React from 'react';
import { View } from 'react-native';
import EmptyExpenses from './EmptyExpenses';
import ErrorExpenses from './ErrorExpenses';
import ExpenseItem from './ExpenseItem';
import LoadingExpenses from './LoadingExpenses';
import { Expense } from '@/interface/expense.interface';

interface Props {
  className?: string;
  expenses: Expense[];
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}

const ExpensesList = ({ className, expenses, isLoading, isError, error }: Props) => {
  if (isLoading) {
    return <LoadingExpenses />;
  }

  if (isError) {
    return <ErrorExpenses error={error} />;
  }

  if (!expenses || expenses.length === 0) {
    return <EmptyExpenses />;
  }

  return (
    <View className={className}>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </View>
  );
};

export default ExpensesList;