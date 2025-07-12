import { FormatPrice } from '@/helpers/formatPrice';
import { BillingCycle, Category } from '@/interface/subscription.interface';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import AccentText from './AccentText';

interface CardListProps {
  title: string;
  subtitle: number;
  className?: string;
  nextPaymentDate: string;
  category: Category;
  billingCycle: BillingCycle;
}

const CardList = ({ title, subtitle, className, nextPaymentDate, category, billingCycle }: CardListProps) => {

  const getIconName = (category: Category): keyof typeof Ionicons.glyphMap => {
    switch (category) {
      case 'Music':
        return 'musical-notes-outline';
      case 'Entertainment':
        return 'film-outline';
      case 'Services':
        return 'cog-outline';
      case 'Productivity':
        return 'briefcase-outline';
      case 'Gaming':
        return 'game-controller-outline';
      default:
        return 'apps-outline';
    }
  };

  return (
    <View className={`flex-row items-center gap-2 bg-primary px-2 py-1 rounded-2xl ${className}`}>
      {/* Icon Container */}
      <View className="flex w-14 h-16 shrink-0 items-center justify-center rounded-lg bg-[#21284a]">
        <Ionicons name={getIconName(category)} size={18} color="white" />
      </View>

      {/* Información */}
      <View className="flex-1 flex-col justify-center">
        
        {/* Nombre y Categoría */}
        <View className='flex-row  items-start'>
          <Text className="text-xl font-medium leading-normal text-text">{title}</Text>
        </View>

        {/* Fecha de próxima factura */}
        <View className='flex-row items-center gap-2 mt-1'>
          <View className="flex-row items-center">
            <View className="flex-row items-center gap-2">
              <Ionicons name="calendar-outline" size={16} color="white" />
              <Text className='text-sm font-normal leading-normal text-[#c4cbe6]'>
                {nextPaymentDate}
              </Text>
              <AccentText label={billingCycle} />
            </View>
          </View>
        </View>
      </View>

      {/* {Dinero} */}
      <View className="flex-col items-end justify-center">
        <Text className="text-xl font-medium leading-normal text-text">{FormatPrice.format(subtitle)}</Text>
      </View>
    </View>
  );
};

export default CardList;