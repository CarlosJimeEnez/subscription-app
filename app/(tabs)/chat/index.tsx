import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const top = useSafeAreaInsets().top;
    return (
        <SafeAreaView className="flex-1 bg-gray-900 " style={{ paddingTop: top }} edges={['bottom', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
                keyboardVerticalOffset={90}
            >
                {/* Header */}
                <View className="p-6  items-center">
                    <Text className="text-2xl font-bold text-white">ChatBot Assistant</Text>
                    <Text className="text-sm text-gray-400 mt-1">
                        Tu asistente de IA personal. Pregúntame lo que quieras.
                    </Text>
                </View>

                {/* Chat Area */}
                <ScrollView
                    className="flex-1 p-6"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                >
                    {/* Chat Messages */}
                    {
                        message.length != 0 ? (
                            <View>
                                <Text className="text-white">{message}</Text>
                            </View>
                        ) : (
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
                </ScrollView>

                {/* Input Area */}
                <View className="flex-row items-center p-3">
                    <TouchableOpacity className="p-2 rounded-xl bg-gray-800 h-12 w-12 items-center justify-center">
                        <MaterialCommunityIcons name="paperclip" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <View className="flex-1 flex-row bg-gray-800 rounded-xl items-center pl-1 ml-2">
                        <TouchableOpacity className="p-2">
                            <MaterialCommunityIcons name="camera-outline" size={24} color="#9CA3AF" />
                        </TouchableOpacity>
                        <TextInput
                            className="flex-1 h-12 text-white text-base px-2"
                            placeholder="Escribe tu mensaje aquí..."
                            placeholderTextColor="#9CA3AF"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                        />
                        <TouchableOpacity className="p-3 bg-gray-700 rounded-lg ml-2">
                            <MaterialCommunityIcons name="send" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

export default ChatScreen;