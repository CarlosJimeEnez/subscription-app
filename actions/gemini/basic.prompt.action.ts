import geminiApi from "../gemini.api"

export const actionBasicPrompt = async (prompt: string): Promise<string> => {
    try {
        const response = await geminiApi.post("/basic-prompt", {
            prompt: prompt
        }, {
            responseType: "text"
        })
        return response.data
    } catch (error) {
        throw error
    }
}