import geminiApi from "../gemini.api";

export const actionBasicPrompt = async (prompt: string, conversationId: string): Promise<string> => {
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