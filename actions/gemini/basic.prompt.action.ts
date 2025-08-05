import { GeminiResponseMarkdown } from "@/interface/message.interface";
import geminiApi from "../gemini.api";

export const actionBasicPrompt = async (prompt: string, conversationId: string): Promise<GeminiResponseMarkdown> => {
    try {
        const response = await geminiApi.post("/basic-prompt", {
            prompt,
            conversationId
        }, {
            responseType: "text"
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};