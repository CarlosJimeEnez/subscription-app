import { ExpensesContainer } from '@/components/home';
import FAB from '@/components/home/FAB';
import HorizontalBarChart from '@/components/home/HorizontalBarChart';
import ShownCard from '@/components/home/ShownCard';
import UserGreeting from '@/components/home/UserGreeting';
import ListVertical from '@/components/shared/ListVertical';
import useExpenses from '@/hooks/expenses/useExpenses';
import useHome from '@/hooks/useSubscriptions';
import { useAuth } from '@clerk/clerk-expo';
import { Bell } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setupExpensesAuth } from '../../../actions/expenses/expenses.api';

export default function HomeScreen() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const safeArea = useSafeAreaInsets();
  const { subscriptions } = useHome();
  const { expenses } = useExpenses(isLoaded && !!isSignedIn);

  const handleRefresh = () => {
    expenses.refetch();
  };

  // Configurar autenticación para expenses API
  useEffect(() => {
    if (isLoaded) {
      setupExpensesAuth(getToken);
    }
  }, [getToken, isLoaded]);

  return (
    <View className='flex-1' style={{ paddingTop: safeArea.top + 20, backgroundColor: "#101323" }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={expenses.isRefetching}
            onRefresh={handleRefresh}
            tintColor="#3B82F6"
          />
        }
      >
        <View className='mt-5 px-5 flex-1 '>
          <View className='flex-row items-center justify-between pb-4'>
            <UserGreeting />
            <View>
              {/* {Alert Button} */}
              <TouchableOpacity>
                <Bell size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text className='text-text text-2xl font-bold'>Resumen</Text>
          {/* <BarChart data={barData} />; */}
          <HorizontalBarChart className='px-5 mt-6' />

          <View className='flex-row flex-1 items-center justify-between gap-4 '>
            <ShownCard title="Active Subscriptions" className='h-full' value="4" />
            <ShownCard title="Total Spent This Month" className='h-full' value="$45.96" />
          </View>
        </View>

        {/* List Vertical de Upcoming Bills */}
        <View className='mt-9 mx-6 p-3 border border-gray-700  rounded-xl'>
          <Text className='text-text text-2xl font-bold mt-3 '>Suscripciones activas</Text>
          {
            subscriptions.length != 0 ? (
              <ListVertical subscriptions={subscriptions} />
            ) : (
              <Text className='text-text text-2xl font-bold mt-3 '>No hay suscripciones activas</Text>
            )
          }
        </View>

        {/* Movimientos */}
        <ExpensesContainer
          className='mt-5 mx-6'
          title='Movimientos'
          maxItems={5}
        />
      </ScrollView>
      <FAB />
    </View>
  );
}