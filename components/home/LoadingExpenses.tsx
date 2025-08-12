import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface Props {
  className?: string;
  message?: string;
}

const LoadingExpenses = ({ className, message = 'Cargando movimientos...' }: Props) => {
  return (
    <View className={`flex-row items-center justify-center py-8 ${className}`}>
      <ActivityIndicator size="large" color="#3B82F6" className="mr-3" />
      <Text className="text-text text-lg font-medium">
        {message}
      </Text>
    </View>
  );
};

export default LoadingExpenses;