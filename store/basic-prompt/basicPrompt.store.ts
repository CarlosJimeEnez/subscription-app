import { Message } from "react-hook-form";
import { create } from "zustand";

interface BasicPromptStore {
    geminiWriting: boolean; 
    messages: Message[];

    addMessage: (message: Message) => void;
    setGeminiWriting: (geminiWriting: boolean) => void;
}

const useBasicPromptStore = create<BasicPromptStore>((set) => ({
  // State 
  geminiWriting: false,
  messages: [],

  // Actions
  addMessage: (message: Message) =>  {

  },
  setGeminiWriting: (isWriting: boolean) => {
    set({geminiWriting: isWriting })
  },
  
}))
