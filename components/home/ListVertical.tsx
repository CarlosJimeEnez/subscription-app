import { Subscription } from '@/interface/subscription.interface';
import React from 'react';
import { FlatList, View } from 'react-native';
import CardList from './CardList';

interface Props {
    subscriptions: Subscription[];
}

const ListVertical = ({subscriptions}: Props) => {
  return (
    <View className="mt-4">
      <FlatList
        nestedScrollEnabled 
        data={subscriptions}
        renderItem={({ item }) => (
          <CardList
            title={item.name}
            subtitle={item.price}
            category={item.category}
            billingCycle={item.billingCycle}
            nextPaymentDate={item.nextPaymentDate}
            className=""
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-1" />} 
      />
    </View>
  );
};

export default ListVertical;