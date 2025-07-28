import { Message } from '@/interface/message.interface'
import React, { JSX } from 'react'
import { Text, View } from 'react-native'
import { t, translateField, translateSubscriptionData } from '@/helpers/formatLanguaje'

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
            // Verificar si la respuesta contiene JSON anidado
            const responseText = parsedMsg.response
            
            // Es texto markdown normal
            return responseText
        }
        
        // Si no tiene "response", devolver el texto original
        return msg.text
    } catch (error) {
        // Si no es JSON válido, devolver el texto original
        console.log('Error parseando mensaje:', error)
        return msg.text
    }
}

// Función para renderizar listas de puntos
const renderBulletList = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let currentText = ''
    
    lines.forEach((line, index) => {
        if (line.trim().startsWith('*')) {
            // Si hay texto acumulado antes del punto, agregarlo
            if (currentText.trim()) {
                elements.push(
                    <Text key={`text-${index}`} className="text-white text-sm leading-5 mb-3">
                        {currentText.trim()}
                    </Text>
                )
                currentText = ''
            }
            
            // Agregar el punto de la lista
            const bulletText = line.replace(/^\s*\*\s*/, '').trim()
            // Limpiar formato markdown (**texto**)
            const cleanBulletText = bulletText.replace(/\*\*(.*?)\*\*/g, '$1')
            elements.push(
                <View key={`bullet-${index}`} className="flex-row items-start mb-2">
                    <Text className="text-blue-400 text-sm mr-2">•</Text>
                    <Text className="text-white text-sm leading-5 flex-1">{cleanBulletText}</Text>
                </View>
            )
        } else {
            // Acumular texto normal
            currentText += line + '\n'
        }
    })
    
    // Agregar cualquier texto restante
    if (currentText.trim()) {
        elements.push(
            <Text key="final-text" className="text-white text-sm leading-5 mt-3">
                {currentText.trim()}
            </Text>
        )
    }
    
    return elements
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

const GeminiMessage = ({ msg }: Props) => {
    const messageText = parseMessage(msg);
    const subscriptionData = parseSubscriptionResponse(messageText);

    // Caso 1: Respuesta de suscripción (éxito o fallo)
    if (subscriptionData) {
        // Caso 1.1: Faltan campos
        if (subscriptionData.success === false) {
            return (
                <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
                    <Text className="text-white text-md leading-5 font-semibold">{t('incompleteInfo')}</Text>
                    <Text className="text-white text-md leading-5">
                        {subscriptionData.message}
                    </Text>

                    {subscriptionData.missing_fields?.length > 0 && (
                        <View className="mb-4">
                            <Text className="text-white text-md leading-5 font-bold mt-2">{t('missingFields')}</Text>
                            <View className="text-white text-md leading-5">
                                {subscriptionData.missing_fields.map((field: string, index: number) => (
                                    <Text key={index} className="text-amber-400 text-md">• {translateField(field)}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {subscriptionData.current_data && Object.keys(subscriptionData.current_data).length > 0 && (
                        <View>
                            <Text className="text-white text-md leading-5 font-bold mt-2">{t('currentData')}:</Text>
                            <View className="mt-2">
                                {Object.entries(subscriptionData.current_data).map(([key, value]) => (
                                    <Text key={key} className="text-green-400 text-md">• {translateField(key)}: {translateField(String(value))}</Text>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            );
        }

        // Caso 1.2: Suscripción creada con éxito
        if (subscriptionData.success === true) {
            const { name, price, category, billingCycle } = subscriptionData.subscription;
            return (
                <View className="bg-green-50 border border-green-200 self-start rounded-lg p-6 mb-7 max-w-sm">
                    <Text className="text-green-800 font-bold text-base mb-2">✅ {t('subscriptionRegistered')}</Text>
                    <View className="bg-white rounded-md p-4 mt-2 border border-green-100">
                        <Text className="text-lg font-bold text-gray-800">{name}</Text>
                        <Text className="text-2xl font-extrabold text-green-600 mt-1">${price}</Text>
                        <Text className="text-sm text-gray-500 capitalize mt-2">{translateField(category)} • {translateField(billingCycle)}</Text>
                    </View>
                </View>
            );
        }
    }

    // Caso 2: Mensaje de bienvenida con lista
    const hasFinancialServices = messageText.includes(t('financialAnalysis')) || 
                                messageText.includes(t('subscriptionManagement')) || 
                                messageText.includes(t('financialExtraction')) ||
                                messageText.includes('Análisis de gastos') || // Fallback para compatibilidad
                                messageText.includes('Gestión de suscripciones') ||
                                messageText.includes('Extracción de información financiera');
    if (hasFinancialServices) {
        return (
            <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
                {renderBulletList(messageText)}
            </View>
        );
    }

    // Caso 3: Mensaje de texto normal
    return (
        <View className="bg-gray-800 self-start rounded-lg p-5 mb-7 max-w-sm">
            <Text className="text-white text-sm leading-5">{messageText}</Text>
        </View>
    );
}

export default GeminiMessage