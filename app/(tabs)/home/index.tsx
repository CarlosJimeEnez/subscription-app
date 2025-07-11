import ListVertical from '@/components/shared/ListVertical';
import ShownCard from '@/components/shared/ShownCard';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const home = () => {
  const safeArea = useSafeAreaInsets()
  return (
    <ScrollView className='flex-1' style={{paddingTop: safeArea.top, backgroundColor: "#101323"}}>
      <View className='mt-5 px-5'>
        <Text className='text-text text-2xl font-bold'>Resumen</Text>

        <View className='flex-row flex-wrap justify-between'>
          <ShownCard title="Active Subscriptions" value="4" className="w-[48%]"/>
          <ShownCard title="Total Spent This Month" value="$124" className="w-[48%]"/>
        </View>
      </View>

      {/* List Vertical de Upcoming Bills */}
      <View className='mt-6 px-5'>
        <Text className='text-text text-2xl font-bold'>Upcoming Bills</Text>
        <ListVertical/>
      </View>
    </ScrollView>
  )
}

export default home