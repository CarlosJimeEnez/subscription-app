import React from 'react'
import { Text, View } from 'react-native'

const ErrorLoadingGasto = () => {
    return (
        <View className="flex-1 justify-center items-center bg-background">
            <Text className="text-red-500 text-lg">Error loading expense</Text>
        </View>
    )
}

export default ErrorLoadingGasto