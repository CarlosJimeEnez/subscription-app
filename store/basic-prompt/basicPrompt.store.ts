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
  let formattedText = text;
  console.log("Formated Text", formattedText);
  
  // Si el sender es gemini, siempre intentar parsear el JSON y extraer el result
  if (sender === 'gemini') {
    try {
      const parsedResponse = JSON.parse(text);
      if (parsedResponse.result) {
        formattedText = parsedResponse.result;
        console.log("JSON válido, usando resultado:", formattedText);
      }
    } catch (error) {
      // Si no es JSON válido, usar el texto original
      console.log("No es JSON válido, usando texto original");
    }
  }
  // Para mensajes de usuario, usar el texto tal como viene
  
  return {
    id: uuid.v4(),
    text: formattedText, // Usar el texto formateado (solo el contenido del result para gemini)
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
      const geminiResponse: string = await actionBasicPrompt(text, conversationId);
      // Pasar directamente la respuesta sin JSON.stringify
      const geminiMessage = createMessage(geminiResponse, 'gemini');
      
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
