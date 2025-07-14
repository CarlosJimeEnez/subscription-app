import React from 'react';
import { Text, View } from 'react-native';



const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View className="flex-row justify-between border-t border-t-[#2f396a] py-5">
        <Text className="text-[#8e99cc] text-sm font-normal leading-normal">{label}</Text>
        <Text className="text-white text-sm font-normal leading-normal">{value}</Text>
      </View>
  )
}

export default DetailRow