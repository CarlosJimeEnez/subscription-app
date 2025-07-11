import { Redirect } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const index = () => {
  return (
    <View>
      <Redirect href="/(tabs)/index" />
    </View>
  )
}

export default index