import { useFilters } from '@/hooks/useFilters';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface FilterProps {
  className?: string;
  setSelectedFilter?: (filter: string) => void;
}

/**
 * Componente de filtro con opciones seleccionables y scroll horizontal
 */
const Filter = ({ className, setSelectedFilter }: FilterProps) => {
  const { filterOptions, options, selectedFilter } = useFilters()
  return (
    <View className={`mb-4 ${className}`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >

        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => {
              if (setSelectedFilter) {
                setSelectedFilter(option.id);
              }
            }}
            className={`px-5 py-3 rounded-xl mr-3 flex-row items-center ${selectedFilter === option.id
              ? 'bg-primary border border-accent'
              : 'bg-primary border border-gray-700'
              }`}
          >
            {option.icon && (
              <Ionicons
                name={option.icon}
                size={16}
                color={selectedFilter === option.id ? '#ffffff' : '#c4cbe6'}
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              className={`${selectedFilter === option.id ? 'text-text' : 'text-muted'
                } text-base font-medium`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Filter;
