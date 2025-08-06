import { BarChart3, MessageCircle, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MessageBlueprintProps {
    title: string;
    iconType?: 'message' | 'shopping' | 'chart';
    onPress: (message: string) => void;
    variant?: 'default' | 'primary' | 'secondary';
}

const MessageBlueprint: React.FC<MessageBlueprintProps> = ({
    title,
    iconType = 'message',
    onPress,
    variant = 'default'
}) => {

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    container: 'bg-blue-600 border-blue-500',
                    text: 'text-white',
                    subtitle: 'text-blue-100'
                };
            case 'secondary':
                return {
                    container: 'bg-green-600 border-green-500',
                    text: 'text-white',
                    subtitle: 'text-green-100'
                };
            default:
                return {
                    container: 'bg-gray-800 border-gray-700',
                    text: 'text-white',
                    subtitle: 'text-gray-300'
                };
        }
    };

    const getIcon = () => {
        const iconColor = variant === 'default' ? '#ffffff' : '#ffffff';
        
        switch (iconType) {
            case 'shopping':
                return <ShoppingCart size={20} color={iconColor} />;
            case 'chart':
                return <BarChart3 size={20} color={iconColor} />;
            default:
                return <MessageCircle size={20} color={iconColor} />;
        }
    };

    const styles = getVariantStyles();

    return (
        <TouchableOpacity
            onPress={() => onPress(title)}
            className={`px-3 py-2 rounded-lg border ${styles.container} shadow-lg active:scale-95 flex-row items-center w-full`}
            activeOpacity={0.8}
            style={{ minWidth: 120, maxWidth: 150 }}
        >
            <View className="mr-2">
                {getIcon()}
            </View>
            <View className="flex-1">
                {title && (
                    <Text 
                        className={`text-xs font-semibold ${styles.text}`}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default MessageBlueprint;