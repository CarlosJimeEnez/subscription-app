import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Text, View } from 'react-native';

const UserGreeting = () => {
  const { user } = useUser();

  return (
    <View className='flex-col items-start justify-start'>
      <Text className='text-muted text-xl font-light'>Hello</Text>
      <Text className='text-text text-4xl font-bold'>{user?.fullName}</Text>
    </View>
  );
};

export default UserGreeting;
