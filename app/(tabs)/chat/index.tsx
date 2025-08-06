import AnimacionPensando from '@/components/chat/AnimacionPensando';
import GeminiMessage from '@/components/chat/GeminiMessage';
import MessageBlueprint from '@/components/chat/MessageBlueprint';
import NuevoChat from '@/components/chat/NuevoChat';
import UserMessage from '@/components/chat/UserMessage';
import useChat from '@/hooks/useChat';
import { useBasicPromptStore } from '@/store/basic-prompt/basicPrompt.store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pause, Send } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';


const ChatScreen = () => {
    const [text, setText] = useState('');
    const [textInputHeight, setTextInputHeight] = useState(40); // Altura inicial del TextInput

    const top = useSafeAreaInsets().top;
    const messages = useBasicPromptStore((state) => state.messages);
    const geminiWriting = useBasicPromptStore((state) => state.geminiWriting);
    const { isAuthenticated } = useChat(); // Ahora solo necesitamos saber si está autenticado
    const addMessage = useBasicPromptStore((state) => state.addMessage);
    const setConversationId = useBasicPromptStore((state) => state.setConversationId);

    // Referencia para el ScrollView
    const scrollViewRef = useRef<ScrollView>(null);

    // Este useEffect ya maneja correctamente la inicialización del UUID
    useEffect(() => {
        // Generar un ID global para toda la sesión de chat
        const globalConversationId = uuid.v4().toString();
        setConversationId(globalConversationId);
    }, []);

    // Función para hacer scroll al final
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    // Efecto para hacer scroll cuando cambian los mensajes
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    // Efecto para escuchar eventos del teclado
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => {
                // Pequeño delay para asegurarse de que todo esté renderizado
                setTimeout(() => scrollToBottom(), 100);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSendMessage = async () => {
        if (text === '' || !isAuthenticated) return;

        try {
            const textToSend = text.trim();
            setText('');
            await addMessage(textToSend); // Ya no necesitamos pasar el token
            // Pequeño delay para asegurar que el mensaje se renderice antes de scroll
            setTimeout(() => scrollToBottom(), 100);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-900 " style={{ paddingTop: top }} edges={['bottom', 'left', 'right']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={0}
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
                    ref={scrollViewRef}
                    className="flex-1 p-6"
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: messages.length > 0 ? 'flex-start' : 'center',
                        paddingBottom: 80 // Espacio para los MessageBlueprint fixed
                    }}
                    showsVerticalScrollIndicator={true}
                >
                    {/* Chat Messages */}
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            msg.sender === 'user' ? (
                                <UserMessage key={`user-${msg.id}`} msg={msg} />
                            ) : (
                                <GeminiMessage key={`gemini-${msg.id}`} msg={msg} />
                            )
                        ))
                    ) : (
                        <NuevoChat />
                    )}

                    {geminiWriting && (
                        <AnimacionPensando text="Pensando..." />
                    )}

                </ScrollView>

                {/* Fixed MessageBlueprint Area */}
                <View className=" " style={{ zIndex: 10 }}>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 12,
                            paddingVertical: 1,
                            alignItems: 'center'
                        }}
                        style={{
                            minHeight: 80, // Cambiar de maxHeight a minHeight
                            backgroundColor: '#111827' // Asegurar fondo visible
                        }}
                    >
                        <View className='flex-row w-full pe-24'>
                            <MessageBlueprint
                                title="Nueva Compra"
                                onPress={() => setText('Nueva compra de (  ) por (  )')}
                                variant="default"
                            />
                            <View style={{ width: 8 }} />
                            <MessageBlueprint
                                title="Análisis de Gastos"
                                onPress={() => setText('Analiza mis gastos mensuales')}
                                variant="default"
                            />
                            <View style={{ width: 8 }} />
                            <MessageBlueprint
                                title="Gasto en Comida"
                                onPress={() => setText('Nuevo gasto en comida por ')}
                                variant="default"
                            />
                        </View>
                    </ScrollView>
                </View>

                {/* Input Area */}
                <View className="flex-row items-center bg-gray-900 border-t  border-gray-800 rounded-xl p-2">
                    <TouchableOpacity className="rounded-full bg-gray-800 h-14 w-14 items-center justify-center mr-3">
                        <MaterialCommunityIcons name="paperclip" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <View className="flex-1 flex-row bg-gray-800 rounded-xl items-center">
                        <TouchableOpacity className="p-4">
                            <MaterialCommunityIcons name="camera-outline" size={24} color="#9CA3AF" />
                        </TouchableOpacity>

                        <TextInput
                            className="flex-1 text-white text-base pr-3"
                            placeholder="Escribe tu mensaje aquí..."
                            placeholderTextColor="#9CA3AF"
                            value={text}
                            onChangeText={setText}
                            multiline
                            style={{
                                minHeight: 40,
                                maxHeight: 120, // Limitar la altura máxima
                                height: Math.max(40, textInputHeight)
                            }}
                            onContentSizeChange={(event) => {
                                setTextInputHeight(event.nativeEvent.contentSize.height);
                                // También hacer scroll cuando crece el input
                                scrollToBottom();
                            }}
                        />
                        <TouchableOpacity onPress={handleSendMessage} className="p-2 bg-[#177e55] rounded-lg m-2">
                            {geminiWriting ? (
                                <Pause size={24} color="white" />
                            ) : (
                                <Send size={24} color="white" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

export default ChatScreen;
