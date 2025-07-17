import { Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const index = () => {
  const { top } = useSafeAreaInsets()
  return (
    <View className='flex-1 bg-[#101323]' style={{ paddingTop: top }}>
      <Redirect href="/(tabs)/home" />
    </View>
  )
}

export default index