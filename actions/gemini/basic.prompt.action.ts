import { GeminiResponse } from "@/interface/message.interface";
import geminiApi from "../gemini.api";

export const actionBasicPrompt = async (prompt: string, conversationId: string): Promise<GeminiResponse> => {
    try {
        const response = await geminiApi.post("/basic-prompt", {
            prompt,
            conversationId
        }, {
            responseType: "json"
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};