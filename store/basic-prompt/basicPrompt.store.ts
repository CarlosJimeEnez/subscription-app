import { actionBasicPrompt } from "@/actions/gemini/basic.prompt.action";
import { GeminiResponse, GeminiResponseMarkdown, Message } from "@/interface/message.interface";
import uuid from 'react-native-uuid';
import { create } from "zustand";

// Extender la interfaz Message para incluir información de la respuesta
interface ExtendedMessage extends Message {
    geminiResponse?: GeminiResponse; // Información adicional de la respuesta
}

interface BasicPromptStore {
    geminiWriting: boolean; 
    messages: ExtendedMessage[];
    conversationId: string; 
    lastResponseType?: string; // Tipo de la última respuesta
    lastResponseSuccess?: boolean; // Estado de éxito de la última respuesta

    addMessage: (message: string) => Promise<void>;
    setGeminiWriting: (geminiWriting: boolean) => void;
    setConversationId: (conversationId: string) => void;
}

const createMessage = (text: string, sender: 'user' | 'gemini', geminiResponse?: GeminiResponseMarkdown): ExtendedMessage => {
    return {
        id: uuid.v4(),
        text: text,
        createdAt: new Date(),
        sender: sender,
        type: "text",
    }
}

export const useBasicPromptStore = create<BasicPromptStore>((set) => ({
  // State 
  geminiWriting: false,
  messages: [],
  conversationId: "",
  lastResponseSuccess: false,

  // Actions
  addMessage: async (text: string) =>  {
    const userMessage = createMessage(text, 'user');
    const { conversationId } = useBasicPromptStore.getState();
    
    set( state => ({
      geminiWriting: true,
      messages: [...state.messages, userMessage]
    }));

    try {
      const geminiResponse: GeminiResponseMarkdown = await actionBasicPrompt(text, conversationId);
      // Crear mensaje con la respuesta completa
      const geminiMessage = createMessage(geminiResponse.result, 'gemini');
      
      set(state => ({
        geminiWriting: false,
        messages: [...state.messages, geminiMessage],
        lastResponseSuccess: true
      }));
    } catch (error) {
      console.error('Error al obtener respuesta de Gemini:', error);
      set({ 
        geminiWriting: false,
        lastResponseType: 'error',
        lastResponseSuccess: false
      });
      // Opcionalmente, podrías añadir un mensaje de error al chat
    }
  },

  setGeminiWriting: (isWriting: boolean) => {
    set({geminiWriting: isWriting })
  },

  setConversationId: (conversationId: string) => {
    set({conversationId})
  }
}))
