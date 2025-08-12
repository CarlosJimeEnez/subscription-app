import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Expense } from '@/interface/expense.interface';
import { FormatPrice } from '@/helpers/formatPrice';
import { formatDay } from '@/helpers/formatDay';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  expense: Expense;
  onPress?: (expense: Expense) => void;
  className?: string;
}

const ExpenseItem = ({ expense, onPress, className }: Props) => {
  const handlePress = () => {
    onPress?.(expense);
  };

  return (
    <Pressable 
      onPress={handlePress}
      className={`flex-row items-center justify-between p-4 mb-2 bg-secondary rounded-lg ${className}`}
    >
      {/* Icono de categoría */}
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-accent rounded-full items-center justify-center mr-3">
          <Ionicons name="apps-outline" size={20} color="white" />
        </View>
        
        {/* Información del gasto */}
        <View className="flex-1">
          <Text className="text-text text-lg font-bold" numberOfLines={1}>
            {expense.name}
          </Text>
          <Text className="text-gray-400 text-sm">
            {expense.category}
          </Text>
          {expense.date && (
            <Text className="text-gray-500 text-xs">
              {formatDay(new Date(expense.date))}
            </Text>
          )}
        </View>
      </View>
      
      {/* Monto */}
      <View className="items-end">
        <Text className="text-text text-lg font-bold">
          {FormatPrice.format(expense.amount)}
        </Text>
        {expense.description && (
          <Text className="text-gray-400 text-xs" numberOfLines={1}>
            {expense.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default ExpenseItem;