import { formatDay } from '@/helpers/formatDay';
import { FormatPrice } from '@/helpers/formatPrice';
import { getCategoryColor } from '@/helpers/getCategoryColors';
import { getCategoryIcon } from '@/helpers/getCategoryIcon';
import { Expense } from '@/interface/expense.interface';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface Props {
  expense: Expense;
  onPress?: (expense: Expense) => void;
  className?: string;
}

const ExpenseItem = ({ expense, onPress, className }: Props) => {
  const categoryColor = getCategoryColor(expense.category)
  const categoryIcon = getCategoryIcon(expense.category)
  
  const handlePress = () => {
    router.push(`/expense/${expense.id}` as any);
  };

  return (
    <Pressable 
      onPress={handlePress}
      className={`flex-row items-center justify-between p-4 mb-2 bg-secondary rounded-lg ${className}`}
    >
      {/* Icono de categoría */}
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 bg-accent rounded-full items-center justify-center mr-3">
          <Ionicons name={categoryIcon} size={20} color="white" />
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
      </View>
    </Pressable>
  );
};

export default ExpenseItem;