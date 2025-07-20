import ShownCard from '@/components/home/ShownCard';
import ListVertical from '@/components/shared/ListVertical';
import useHome from '@/hooks/useSubscriptions';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

// import { BarChart } from "react-native-gifted-charts";
import FAB from '@/components/home/FAB';
import HorizontalBarChart from '@/components/home/HorizontalBarChart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const home = () => {
  const safeArea = useSafeAreaInsets()
  const { subscriptions } = useHome()

  return (
    <View className='flex-1' style={{ paddingTop: safeArea.top, backgroundColor: "#101323" }}>
      <ScrollView>
        <View className='mt-5 px-5 flex-1 '>
          <Text className='text-text text-2xl font-bold'>Resumen</Text>
          <View className='flex-row flex-1 items-center justify-between gap-4 '>
            <ShownCard title="Active Subscriptions" className='h-full' value="4" />
            <ShownCard title="Total Spent This Month" className='h-full' value="$45.96" />
          </View>
        </View>

        {/* <BarChart data={barData} />; */}
        <HorizontalBarChart className='px-5 mt-6' />

        {/* List Vertical de Upcoming Bills */}
        <View className='mt-9 m-6 p-3 pb-6 border border-gray-700  rounded-xl'>
          <Text className='text-text text-2xl font-bold mt-3 '>Upcoming Bills (5)</Text>
          <ListVertical subscriptions={subscriptions} />
        </View>
      </ScrollView>
      <FAB />
    </View>
  )
}

export default home