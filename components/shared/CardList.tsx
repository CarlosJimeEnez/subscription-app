import { daysRamain } from '@/helpers/formatDay';
import { FormatPrice } from '@/helpers/formatPrice';
import { getCategoryIcon } from '@/helpers/getCategoryIcon';
import { BillingCycle, Category } from '@/interface/subscription.interface';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

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
  const getIconName = getCategoryIcon(category);
  const daysLeft = daysRamain(nextPaymentDate);

  return (
    <Pressable onPress={() => router.push(`../subscription/${id}`)} className="mb-3 px-3">
      <View 
        className={`rounded-2xl p-4 bg-secondary ${className}`}
      >
        {/* Header con icono y menú */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
            <Ionicons name={getIconName} size={20} color="white" />
          </View>
          <Ionicons name="ellipsis-horizontal" size={20} color="white" />
        </View>

        {/* Título del servicio */}
        <Text className="text-white text-lg font-bold mb-1">{title}</Text>
        
        {/* Precio */}
        <View className="flex-row items-baseline mb-2">
          <Text className="text-white text-2xl font-bold">{FormatPrice.format(subtitle)}</Text>
          <Text className="text-white/70 text-sm ml-1">/{billingCycle === 'Monthly' ? 'month' : billingCycle === 'Yearly' ? 'year' : billingCycle.toLowerCase()}</Text>
        </View>
        
        {/* Días restantes */}
        <Text className="text-white/80 text-sm">
          {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardList;