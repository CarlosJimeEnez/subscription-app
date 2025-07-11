import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface CardListProps {
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  className?: string;
}

const CardList = ({ iconName, title, subtitle, className }: CardListProps) => {
  return (
    <View className={`flex-row items-center gap-4 bg-primary px-4 py-2 min-h-[72px] ${className}`}>
      {/* Icon Container */}
      <View className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#21284a]">
        <Ionicons name={iconName} size={24} color="white" />
      </View>

      {/* Text Container */}
      <View className="flex-col justify-center">
        <Text className="text-base font-medium leading-normal text-text">{title}</Text>
        <Text className="text-sm font-normal leading-normal text-[#8e99cc]">{subtitle}</Text>
      </View>
    </View>
  );
};

export default CardList;