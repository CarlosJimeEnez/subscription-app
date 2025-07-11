import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, View } from 'react-native';
import CardList from './CardList';

interface Subscription {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}

const subscriptions: Subscription[] = [
  { id: '1', iconName: 'musical-notes-outline', title: 'Music Streaming', subtitle: '$12.99 · Due Jul 15' },
  { id: '2', iconName: 'cloud-outline', title: 'Cloud Storage', subtitle: '$7.99 · Due Aug 10' },
  { id: '3', iconName: 'game-controller-outline', title: 'Gaming Service', subtitle: '$9.99 · Due Aug 22' },
  { id: '4', iconName: 'film-outline', title: 'Video Streaming', subtitle: '$15.00 · Due Aug 25' },
  { id: '5', iconName: 'book-outline', title: 'E-Book Subscription', subtitle: '$14.99 · Due Sep 1' },
];

const ListVertical = () => {
  return (
    <View className="mt-4">
      <FlatList
        data={subscriptions}
        renderItem={({ item }) => (
          <CardList
            iconName={item.iconName}
            title={item.title}
            subtitle={item.subtitle}
            className="mb-3"
          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // Avoid nested scroll views
      />
    </View>
  );
};

export default ListVertical;