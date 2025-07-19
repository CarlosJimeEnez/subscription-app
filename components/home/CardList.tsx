import { daysRamain } from '@/helpers/formatDay';
import { FormatPrice } from '@/helpers/formatPrice';
import { getCategoryIcon } from '@/helpers/getCategoryIcon';
import { BillingCycle, Category } from '@/interface/subscription.interface';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import AccentText from '../shared/AccentText';

interface CardListProps {
  id: string;
  title: string;
  subtitle: number;
  className?: string;
  nextPaymentDate: string;
  category: Category;
  billingCycle: BillingCycle;
}

const CardList = ({ id, title, subtitle, className, nextPaymentDate, category, billingCycle }: CardListProps) => {

  const getIconName = getCategoryIcon(category)

  return (
    <Pressable onPress={() => router.push(`../subscription/${id}`)}>
      <View className={`flex-row items-center gap-2 bg-primary px-2 py-1 rounded-2xl ${className}`}>
        {/* Icon Container */}
        <View className="flex w-14 h-16 shrink-0 items-center justify-center rounded-lg bg-[#21284a]">
          <Ionicons name={getIconName} size={18} color="white" />
        </View>

        {/* Información */}
        <View className="flex-1 flex-col justify-center">

          {/* Nombre y Categoría */}
          <View className='flex-row  items-start'>
            <Text className="text-xl font-medium leading-normal text-text">{title}</Text>
          </View>

          <Text className='text-sm font-normal leading-normal text-[#c4cbe6]'>{billingCycle}</Text>

          {/* Fecha de próxima factura */}
          <View className='flex-row items-center gap-2 mt-1'>
            <View className="flex-row items-center">
              <View className="flex-row items-center gap-2">
                <AccentText label={daysRamain(nextPaymentDate) > 0 ? `${daysRamain(nextPaymentDate)} days remaining` : ''} IonIconName='calendar-outline' />
              </View>
            </View>
          </View>
        </View>

        {/* {Dinero} */}
        <View className="flex-col items-end justify-center">
          <Text className="text-xl font-medium leading-normal text-text">{FormatPrice.format(subtitle)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardList;