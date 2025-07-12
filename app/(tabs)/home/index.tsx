import ListVertical from '@/components/home/ListVertical';
import ShownCard from '@/components/home/ShownCard';
import useHome from '@/hooks/useSubscriptions';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

// import { BarChart } from "react-native-gifted-charts";
import HorizontalBarChart from '@/components/home/HorizontalBarChart';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const barData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

const home = () => {
  const safeArea = useSafeAreaInsets()
  const { subscriptions, getSubscriptions } = useHome()
  const {width: screenWidth} = useWindowDimensions()

  return (
    <ScrollView className='flex-1' style={{ paddingTop: safeArea.top, backgroundColor: "#101323" }}>

      <View className='mt-5 px-5' >
        <Text className='text-text text-2xl font-bold'>Resumen</Text>

        <View className='flex-row items-center justify-between gap-4'>
          <ShownCard title="Active Subscriptions" value="4"  />
          <ShownCard title="Total Spent This Month" value="$45.96"  />
        </View>
      </View>

      {/* <BarChart data={barData} />; */}
      <HorizontalBarChart className='px-5 mt-6' />

      {/* List Vertical de Upcoming Bills */}
      <View className='mt-9 m-6 p-3 pb-6 border border-gray-700  rounded-xl'>
        <Text className='text-text text-2xl font-bold mt-3 '>Upcoming Bills</Text>
        <ListVertical subscriptions={subscriptions} />
      </View>
    </ScrollView>
  )
}

export default home