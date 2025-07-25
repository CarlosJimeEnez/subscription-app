import { Message } from '@/interface/message.interface'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    msg: Message
}

const GeminiMessage = ({ msg }: Props) => {
    return (
        <View className="bg-gray-800 self-start rounded-lg p-3 mb-3 max-w-xs">
            <Text className="text-white">{msg.text}</Text>
        </View>
    )
}

export default GeminiMessage