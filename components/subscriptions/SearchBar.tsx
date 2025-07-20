import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

/**
 * Componente de barra de búsqueda con icono de lupa
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Encontrar subscripciones',
  className = '',
}) => {
  return (
    <View className={`flex-row items-center bg-primary rounded-xl px-4 py-3 ${className}`}>
      <Ionicons name="search-outline" size={20} color="#c4cbe6" />
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#c4cbe6"
        className="flex-1 ml-3 text-text text-base"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} className="p-1">
          <Ionicons name="close-circle" size={18} color="#c4cbe6" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
