import { Message } from '@/interface/message.interface'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    msg: Message
}

const UserMessage = ({ msg }: Props) => {
    return (
        <View key={`user-${msg.id}`} className="bg-[#177e55] self-end rounded-lg p-3 mb-3 max-w-xs">
            <Text className="text-white">{msg.text}</Text>
        </View>
    )
}

export default UserMessage