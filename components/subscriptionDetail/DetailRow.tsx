import React from 'react';
import { Text, View } from 'react-native';

const DetailRow = ({ label, value, className, isBadge }: { label: string; value: string, className?: string, isBadge?: boolean }) => {
  return (
    <View className={`flex-row justify-between items-center py-5 ${className}`}>
      {label === "Status" ? (
        <Text className={"text-text text-xl font-normal leading-normal"}>{label}</Text>
      ) : (
        <Text className={"text-[#8e99cc] text-sm font-normal leading-normal"}>{label}</Text>
      )}
      {/* Badge */}
      {isBadge ? (
        <View className="flex-row items-center gap-2 rounded-full bg-[#21284a] py-2 px-3">
          <View className={`size-2 rounded-full ${value === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
          <Text className="text-white text-sm font-normal leading-normal">{value}</Text>
        </View>
      ) : (
        <Text className="text-white text-sm font-normal leading-normal">{value}</Text>
      )}
    </View>
  )
}

export default DetailRow