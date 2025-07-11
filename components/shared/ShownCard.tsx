import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  title: string;
  value: string;
  className?: string;
}

const ShownCard = ({title, value, className}: Props) => {
  return (
    <View className={`${className} mt-5 rounded-2xl border border-[#3A3F51] bg-[#1F2437] p-5`}>
      <Text className="text-lg font-medium text-text">{title}</Text>
      <Text className="mt-2 text-4xl font-bold text-text">{value}</Text>
    </View>
  )
}

export default ShownCard