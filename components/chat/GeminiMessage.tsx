import { Message } from '@/interface/message.interface';
import React from 'react';
import { View } from 'react-native';
import Markdown from 'react-native-markdown-display';


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

interface GeminiMessageProps {
    msg: Message;
}

const GeminiMessage: React.FC<GeminiMessageProps> = ({ msg }) => {
    console.log('mensaje desde gemini', msg);
    // Si no hay información de respuesta, mostrar mensaje normal
    return (
        <View>
            <Markdown style={baseMarkdownStyles}>{msg.text}</Markdown>
        </View>
    )

};

export default GeminiMessage;