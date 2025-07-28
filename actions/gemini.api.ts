import axios from "axios";

// Crear la instancia de Axios
const geminiApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_GEMINI_API_URL,
});

export default geminiApi;