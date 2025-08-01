import { ErrorResponse, GeminiResponse, GeneralResponse, GreetingResponse, SubscriptionErrorResponse, SubscriptionSuccessResponse } from '@/interface/message.interface'
import React from 'react'
import { Text, View } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface ExtendedMessage {
    id: string;
    text: string;
    createdAt: Date;
    sender: 'user' | 'gemini';
    type: string;
    geminiResponse?: GeminiResponse;
}

interface Props {
    msg: ExtendedMessage
}

// Estilos base para Markdown
const baseMarkdownStyles = {
    body: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
    },
    heading1: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700' as const,
        marginBottom: 8,
    },
    heading2: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700' as const,
        marginBottom: 6,
    },
    paragraph: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    strong: {
        color: '#ffffff',
        fontWeight: '700' as const,
    },
    list_item: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
    },
};

// Estilos para diferentes tipos de respuesta
const successStyles = {
    ...baseMarkdownStyles,
    body: { ...baseMarkdownStyles.body, color: '#10b981' },
    paragraph: { ...baseMarkdownStyles.paragraph, color: '#10b981' },
};

const errorStyles = {
    ...baseMarkdownStyles,
    body: { ...baseMarkdownStyles.body, color: '#f59e0b' },
    paragraph: { ...baseMarkdownStyles.paragraph, color: '#f59e0b' },
};

const greetingStyles = {
    ...baseMarkdownStyles,
    body: { ...baseMarkdownStyles.body, color: '#60a5fa' },
    paragraph: { ...baseMarkdownStyles.paragraph, color: '#60a5fa' },
};

const GeminiMessage = ({ msg }: Props) => {
   
    
    // Si no hay información de respuesta, mostrar mensaje normal
    if (!msg.geminiResponse) {
        return (
            <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
                <Markdown style={baseMarkdownStyles}>
                    {msg.text}
                </Markdown>
            </View>
        );
    }

    const response = msg.geminiResponse;

    // Renderizar según el tipo de respuesta
    switch (response.type) {
        case 'greeting':
            const greetingResponse = response as GreetingResponse;
            return (
                <View className="bg-blue-900 border border-blue-600 self-start rounded-lg p-5 mb-7 max-w-sm">
                    <View className="flex-row items-center mb-3">
                        <Text className="text-2xl mr-2">👋</Text>
                        <Text className="text-blue-300 font-bold text-lg">Saludo</Text>
                    </View>
                    <Markdown style={greetingStyles}>
                        {response.message}
                    </Markdown>
                    {greetingResponse.data.availableFeatures.length > 0 && (
                        <View className="mt-3">
                            <Text className="text-blue-300 font-semibold mb-2">Funciones disponibles:</Text>
                            {greetingResponse.data.availableFeatures.map((feature, index) => (
                                <Text key={index} className="text-blue-200 text-sm">• {feature}</Text>
                            ))}
                        </View>
                    )}
                </View>
            );

        case 'subscription':
            if (response.success) {
                const successResponse = response as SubscriptionSuccessResponse;
                const subscription = successResponse.data.subscription;
                return (
                    <View className="bg-green-900 border border-green-600 self-start rounded-lg p-5 mb-7 max-w-sm">
                        <View className="flex-row items-center mb-3">
                            <Text className="text-2xl mr-2">✅</Text>
                            <Text className="text-green-300 font-bold text-lg">Suscripción {successResponse.data.action === 'created' ? 'Creada' : 'Actualizada'}</Text>
                        </View>
                        <Markdown style={successStyles}>
                            {response.message}
                        </Markdown>
                        <View className="bg-green-800 rounded-lg p-3 mt-3">
                            <Text className="text-green-200 font-bold text-lg">{subscription.name}</Text>
                            <Text className="text-green-100 text-2xl font-bold">${subscription.price}</Text>
                            <Text className="text-green-300">{subscription.category} • {subscription.billingCycle}</Text>
                        </View>
                    </View>
                );
            } else {
                const errorResponse = response as SubscriptionErrorResponse;
                return (
                    <View className="bg-amber-900 border border-amber-600 self-start rounded-lg p-5 mb-7 max-w-sm">
                        <View className="flex-row items-center mb-3">
                            <Text className="text-2xl mr-2">⚠️</Text>
                            <Text className="text-amber-300 font-bold text-lg">Información Incompleta</Text>
                        </View>
                        <Markdown style={errorStyles}>
                            {response.message}
                        </Markdown>
                        {errorResponse.data.missing_fields.length > 0 && (
                            <View className="mt-3">
                                <Text className="text-amber-300 font-semibold mb-2">Campos faltantes:</Text>
                                {errorResponse.data.missing_fields.map((field, index) => (
                                    <Text key={index} className="text-amber-200 text-sm">• {field}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                );
            }

        case 'general':
            const generalResponse = response as GeneralResponse;
            return (
                <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
                    <Markdown style={baseMarkdownStyles}>
                        {response.message}
                    </Markdown>
                    {generalResponse.data.relatedTopics && generalResponse.data.relatedTopics.length > 0 && (
                        <View className="mt-3">
                            <Text className="text-gray-300 font-semibold mb-2">Temas relacionados:</Text>
                            {generalResponse.data.relatedTopics.map((topic, index) => (
                                <Text key={index} className="text-gray-400 text-sm">• {topic}</Text>
                            ))}
                        </View>
                    )}
                </View>
            );

        case 'error':
            const errorResponse = response as ErrorResponse;
            return (
                <View className="bg-red-900 border border-red-600 self-start rounded-lg p-5 mb-7 max-w-sm">
                    <View className="flex-row items-center mb-3">
                        <Text className="text-2xl mr-2">❌</Text>
                        <Text className="text-red-300 font-bold text-lg">Error</Text>
                    </View>
                    <Markdown style={errorStyles}>
                        {response.message}
                    </Markdown>
                    <Text className="text-red-400 text-sm mt-2">Código: {errorResponse.data.errorCode}</Text>
                </View>
            );

        default:
            return (
                <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
                    <Markdown style={baseMarkdownStyles}>
                        {msg.text}
                    </Markdown>
                </View>
            );
    }
};

export default GeminiMessage