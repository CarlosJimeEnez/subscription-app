import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  title: string;
  value: string;
  className?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const ShownCard = ({ title, value, className, iconName }: Props) => {
  return (
    <View className={`mt-5 rounded-2xl border border-[#3A3F51] bg-[#1F2437] p-4 flex-1 flex-row items-center justify-between ${className}`}>
      {iconName ?
        <View className={"flex-row items-center gap-3"}>
          <Ionicons name={iconName} size={20} color="#9CA3AF" />
        </View> : null
      }
      <View className={`flex-1 ml-3 ${iconName ? "ml-3" : ""}`} >
        <Text className="text-text font-medium text-base">{title}</Text>
        <Text className="mt-2 text-4xl font-bold text-text">{value}</Text>

      </View>
    </View>
  )
}

export default ShownCard