import { actionBasicPrompt } from "@/actions/gemini/basic.prompt.action";
import { Message } from "@/interface/message.interface";
import uuid from 'react-native-uuid';
import { create } from "zustand";

interface BasicPromptStore {
    geminiWriting: boolean; 
    messages: Message[];
    conversationId: string; 

    addMessage: (message: string) => Promise<void>;
    setGeminiWriting: (geminiWriting: boolean) => void;
    setConversationId: (conversationId: string) => void;
}

const createMessage = (text: string, sender: 'user' | 'gemini'):Message => {
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

  // Actions
  addMessage: async (text: string) =>  {
    const userMessage = createMessage(text, 'user');
    const { conversationId } = useBasicPromptStore.getState();
    
    set( state => ({
      geminiWriting: true,
      messages: [...state.messages, userMessage]
    }));

    try {
      // Ya no necesitamos pasar el token
      const geminiResponseText = await actionBasicPrompt(text, conversationId);
      // Se crea otro mensaje para la respuesta de Gemini
      const geminiMessage = createMessage(geminiResponseText, 'gemini');
      
      set(state => ({
        geminiWriting: false,
        messages: [...state.messages, geminiMessage]
      }));
    } catch (error) {
      console.error('Error al obtener respuesta de Gemini:', error);
      set({ geminiWriting: false });
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
