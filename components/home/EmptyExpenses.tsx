import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

interface Props {
  className?: string;
  message?: string;
  showAddButton?: boolean;
}

const EmptyExpenses = ({ 
  className, 
  message = 'No hay movimientos registrados', 
  showAddButton = true 
}: Props) => {
  const handleAddExpense = () => {
    // Navegar a la pantalla de agregar gasto
    // router.push('/expense/add'); // Descomenta cuando tengas esta ruta
    console.log('Navegar a agregar gasto');
  };

  return (
    <View className={`items-center justify-center py-12 px-4 ${className}`}>
      <Text className="text-6xl mb-4">📊</Text>
      
      <Text className="text-text text-xl font-bold text-center mb-2">
        {message}
      </Text>
      
      <Text className="text-gray-400 text-sm text-center mb-6">
        Comienza agregando tu primer movimiento financiero
      </Text>
      
      {showAddButton && (
        <Pressable 
          onPress={handleAddExpense}
          className="bg-accent px-6 py-3 rounded-lg flex-row items-center"
        >
          <Text className="text-white font-bold mr-2">
            Agregar Movimiento
          </Text>
          <Text className="text-white text-lg">+</Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmptyExpenses;