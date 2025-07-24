import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

const NuevoChat = () => {
    return (
        <View className="items-center mb-7">
            <Ionicons name="hardware-chip-outline" size={40} color="#9CA3AF" />
            <View className="bg-gray-800 rounded-lg p-5 mt-4 max-w-xs self-center">
                <Text className="text-white text-center">
                    ¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?
                </Text>
            </View>
        </View>
    )
}

export default NuevoChat