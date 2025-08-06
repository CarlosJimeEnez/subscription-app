import { actionBasicPrompt } from "@/actions/gemini/basic.prompt.action";
import { Message } from "@/interface/message.interface";
import uuid from 'react-native-uuid';
import { create } from "zustand";



interface BasicPromptStore {
    geminiWriting: boolean; 
    messages: Message[];
    conversationId: string; 
    lastResponseType?: string; // Tipo de la última respuesta
    lastResponseSuccess?: boolean; // Estado de éxito de la última respuesta

    addMessage: (message: string) => Promise<void>;
    setGeminiWriting: (geminiWriting: boolean) => void;
    setConversationId: (conversationId: string) => void;
}

const createMessage = (text: string, sender: 'user' | 'gemini'): Message => {
  console.log("text message: ", text)
  
  let formattedText = text;
  
  // Si el texto es un JSON stringificado, parsearlo
  try {
    const parsedResponse = JSON.parse(text);
    if (parsedResponse.result) {
      formattedText = parsedResponse.result;
    }
  } catch (error) {
    // Si no es JSON válido, usar el texto original
    console.log("No es JSON válido, usando texto original");
  }
  
  return {
    id: uuid.v4(),
    text: formattedText, // Usar el texto formateado
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

    // Gemini Message
    try {
      const geminiResponse: Message = await actionBasicPrompt(text, conversationId);
      // Crear mensaje con la respuesta completa
      const geminiMessage = createMessage(JSON.stringify(geminiResponse), 'gemini');
      
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
