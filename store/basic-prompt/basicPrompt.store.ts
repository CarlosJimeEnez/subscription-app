import { actionBasicPrompt } from "@/actions/gemini/basic.prompt.action";
import { Message } from "@/interface/message.interface";
import uuid from 'react-native-uuid';
import { create } from "zustand";

interface BasicPromptStore {
    geminiWriting: boolean; 
    messages: Message[];

    addMessage: (message: string) => void;
    setGeminiWriting: (geminiWriting: boolean) => void;
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

  // Actions
  addMessage: async (text: string) =>  {
    const userMessage = createMessage(text, 'user');
    
    set( state => ({
      geminiWriting: true,
      messages: [...state.messages, userMessage]
    }))

    // TODO: Call Gemini API
    const geminiResponseText = await actionBasicPrompt(text);
    // Se crea otro mensaje para la respuesta de Gemini
    const geminiMessage = createMessage(geminiResponseText, 'gemini');
    
    set(state => ({
      geminiWriting: false,
      messages: [...state.messages, geminiMessage]
    }))
  },

  setGeminiWriting: (isWriting: boolean) => {
    set({geminiWriting: isWriting })
  },
  
}))
