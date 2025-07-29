import { t, translateField } from '@/helpers/formatLanguaje'
import { Message } from '@/interface/message.interface'
import React from 'react'
import { View } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface Props {
    msg: Message
}

const parseMessage = (msg: Message): string => {
    try {
        // El mensaje llega como JSON string con propiedad "response"
        const parsedMsg = JSON.parse(msg.text)
        console.log('Mensaje parseado:', parsedMsg)
        
        // Extraer el texto de la propiedad "response"
        if (parsedMsg.response) {
            return parsedMsg.response
        }
        
        // Si no tiene "response", devolver el texto original
        return msg.text
    } catch (error) {
        // Si no es JSON válido, devolver el texto original
        console.log('Error parseando mensaje:', error)
        return msg.text
    }
}

const parseSubscriptionResponse = (text: string) => {
    try {
        const match = text.match(/```json\n([\s\S]*?)\n```/);
        if (match && match[1]) {
            return JSON.parse(match[1]);
        }
        return false; // No hay JSON válido
    } catch (error) {
        console.log('Error parseando JSON de suscripción:', error);
        return false; // Error al parsear
    }
};

// Estilos personalizados para el componente Markdown
const markdownStyles = {
    body: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
    },
    heading1: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700' as const, // Cambiado de 'bold'
        marginBottom: 8,
    },
    heading2: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700' as const, // Cambiado de 'bold'
        marginBottom: 6,
    },
    heading3: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700' as const, // Cambiado de 'bold'
        marginBottom: 4,
    },
    paragraph: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },
    list_item: {
        color: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
    },
    bullet_list: {
        marginBottom: 8,
    },
    ordered_list: {
        marginBottom: 8,
    },
    bullet_list_icon: {
        color: '#60a5fa', // blue-400
        fontSize: 14,
        marginRight: 8,
    },
    strong: {
        color: '#ffffff',
        fontWeight: '700' as const, // Cambiado de 'bold'
    },
    em: {
        color: '#ffffff',
        fontStyle: 'italic' as const,
    },
    code_inline: {
        backgroundColor: '#374151', // gray-700
        color: '#f3f4f6', // gray-100
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 13,
    },
    fence: {
        backgroundColor: '#374151', // gray-700
        color: '#f3f4f6', // gray-100
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
    },
    blockquote: {
        backgroundColor: '#374151', // gray-700
        borderLeftWidth: 4,
        borderLeftColor: '#60a5fa', // blue-400
        paddingLeft: 12,
        paddingVertical: 8,
        marginVertical: 8,
    },
    link: {
        color: '#60a5fa', // blue-400
        textDecorationLine: 'underline' as const,
    },
};

// Estilos específicos para mensajes de error (texto ámbar)
const errorMarkdownStyles = {
    ...markdownStyles,
    body: {
        ...markdownStyles.body,
        color: '#f59e0b', // amber-500
    },
    paragraph: {
        ...markdownStyles.paragraph,
        color: '#f59e0b', // amber-500
    },
    list_item: {
        ...markdownStyles.list_item,
        color: '#f59e0b', // amber-500
    },
};

// Estilos específicos para datos actuales (texto verde)
const successMarkdownStyles = {
    ...markdownStyles,
    body: {
        ...markdownStyles.body,
        color: '#10b981', // green-500
    },
    paragraph: {
        ...markdownStyles.paragraph,
        color: '#10b981', // green-500
    },
    list_item: {
        ...markdownStyles.list_item,
        color: '#10b981', // green-500
    },
};

const GeminiMessage = ({ msg }: Props) => {
    const messageText = parseMessage(msg);
    const subscriptionData = parseSubscriptionResponse(messageText);
    // Caso 1: Respuesta de suscripción (éxito o fallo)
    if (subscriptionData) {
        // Caso 1.1: Faltan campos
        if (subscriptionData.success === false) {
            // Crear contenido markdown para campos faltantes
            let missingFieldsMarkdown = '';
            if (subscriptionData.missing_fields?.length > 0) {
                missingFieldsMarkdown = `\n\n**${t('missingFields')}:**\n`;
                subscriptionData.missing_fields.forEach((field: string) => {
                    missingFieldsMarkdown += `• ${translateField(field)}\n`;
                });
            }

            // Crear contenido markdown para datos actuales
            let currentDataMarkdown = '';
            if (subscriptionData.current_data && Object.keys(subscriptionData.current_data).length > 0) {
                currentDataMarkdown = `\n\n**${t('currentData')}:**\n`;
                Object.entries(subscriptionData.current_data).forEach(([key, value]) => {
                    currentDataMarkdown += `• ${translateField(key)}: ${translateField(String(value))}\n`;
                });
            }

            return (
                <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
                    <Markdown style={markdownStyles}>
                        {`**${t('incompleteInfo')}**\n\n${subscriptionData.message}`}
                    </Markdown>

                    {missingFieldsMarkdown && (
                        <Markdown style={errorMarkdownStyles}>
                            {missingFieldsMarkdown}
                        </Markdown>
                    )}

                    {currentDataMarkdown && (
                        <Markdown style={successMarkdownStyles}>
                            {currentDataMarkdown}
                        </Markdown>
                    )}
                </View>
            );
        }

        // Caso 1.2: Suscripción creada con éxito
        if (subscriptionData.success === true) {
            const { name, price, category, billingCycle } = subscriptionData.subscription;
            const successMarkdown = `✅ **${t('subscriptionRegistered')}**\n\n**${name}**\n\n**$${price}**\n\n*${translateField(category)} • ${translateField(billingCycle)}*`;
            
            return (
                <View className="bg-green-50 border border-green-200 self-start rounded-lg p-6 mb-7 max-w-sm">
                    <Markdown style={{
                        ...markdownStyles,
                        body: { ...markdownStyles.body, color: '#065f46' }, // green-800
                        paragraph: { ...markdownStyles.paragraph, color: '#065f46' },
                        strong: { ...markdownStyles.strong, color: '#065f46' },
                        em: { ...markdownStyles.em, color: '#6b7280' }, // gray-500
                    }}>
                        {successMarkdown}
                    </Markdown>
                </View>
            );
        }
    }

    // Caso 2 y 3: Mensajes normales - Usar Markdown
    return (
        <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
            <Markdown style={markdownStyles}>
                {messageText}
            </Markdown>
        </View>
    );
}

export default GeminiMessage