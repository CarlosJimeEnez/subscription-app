import { Subscription } from '@/interface/subscription.interface';
import React from 'react';
import { View } from 'react-native';
import CardList from './CardList';

interface Props {
    subscriptions: Subscription[];
}

const ListVertical = ({subscriptions}: Props) => {
  return (
    <View className="mt-4">
      <View className='flex-col gap-y-1'>
        {subscriptions.map((item) => (
          <CardList
            id={item.id}
            key={item.id}
            title={item.name}
            subtitle={item.price}
            category={item.category}
            billingCycle={item.billingCycle}
            nextPaymentDate={item.nextPaymentDate.toISOString()}
            className=""
          />
        ))}
        
      </View>
    </View>
  );
};

export default ListVertical;