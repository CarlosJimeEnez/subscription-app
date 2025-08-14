import { Subscription } from '@/interface/subscription.interface';
import React from 'react';
import { FlatList } from 'react-native';
import CardList from './CardList';

interface Props {
    subscriptions: Subscription[];
    className?: string;
}

const ListVertical = ({subscriptions, className}: Props) => {
  return (
    <FlatList
      horizontal
      data={subscriptions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
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
      )}
      className="mt-4"
    />
  );
};

export default ListVertical;