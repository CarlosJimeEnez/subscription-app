import { Subscription } from '@/interface/subscription.interface';
import React from 'react';
import { Text, View } from 'react-native';
import CardList from './CardList';

interface Props {
    subscriptions: Subscription[];
    className?: string;
}

const ListVertical = ({subscriptions, className}: Props) => {
  return (
    <View className="mt-4">
      <View className='flex-col gap-y-1'>
        {subscriptions.length > 0 ? (
          subscriptions.map((item) => (
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
          ))
        ):(
          <Text className="text-text mt-6 text-xl font-bold">No hay suscripciones</Text>
        )}
      </View>
    </View>
  );
};

export default ListVertical;