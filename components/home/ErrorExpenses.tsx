import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useExpenses } from '@/hooks/expenses/useExpenses';

interface Props {
  error?: any;
  className?: string;
  onRetry?: () => void;
}

const ErrorExpenses = ({ error, className, onRetry }: Props) => {
  const { expenses } = useExpenses();
  
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      expenses.refetch();
    }
  };

  return (
    <View className={`items-center justify-center py-8 px-4 ${className}`}>
      <Text className="text-red-400 text-xl font-bold mb-2">
        ⚠️ Error al cargar movimientos
      </Text>
      
      {error?.message && (
        <Text className="text-gray-400 text-sm text-center mb-4">
          {error.message}
        </Text>
      )}
      
      <Pressable 
        onPress={handleRetry}
        className="bg-accent px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-bold">
          Reintentar
        </Text>
      </Pressable>
    </View>
  );
};

export default ErrorExpenses;