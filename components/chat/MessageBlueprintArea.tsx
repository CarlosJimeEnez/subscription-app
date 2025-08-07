import React from 'react';
import { ScrollView, View } from 'react-native';
import MessageBlueprint from './MessageBlueprint';

interface MessageBlueprintAreaProps {
    onMessageSelect: (message: string) => void;
}

const MessageBlueprintArea: React.FC<MessageBlueprintAreaProps> = ({ onMessageSelect }) => {
    return (
        <View className="bg-transparent">
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingVertical: 1,
                    alignItems: 'center'
                }}
                style={{

                    minHeight: 80,
                    backgroundColor: 'transparent'
                }}
            >
                <View className='flex-row w-full pe-24'>
                    <MessageBlueprint
                        title="Nueva Compra"
                        onPress={() => onMessageSelect('Nueva compra de (  ) por (  )')}
                        variant="default"
                    />
                    <View style={{ width: 8 }} />
                    <MessageBlueprint
                        title="Análisis de Gastos"
                        onPress={() => onMessageSelect('Analiza mis gastos mensuales')}
                        variant="default"
                    />
                    <View style={{ width: 8 }} />
                    <MessageBlueprint
                        title="Gasto en Comida"
                        onPress={() => onMessageSelect('Nuevo gasto en comida por ')}
                        variant="default"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default MessageBlueprintArea;