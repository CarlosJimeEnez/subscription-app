import axios from "axios";

// Crear la instancia de Axios
const geminiApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_GEMINI_API_URL,
    timeout: 10000, // 10 segundos de timeout
});

// Interceptor para requests
geminiApi.interceptors.request.use(
    (config) => {
        console.log('🚀 Gemini API Request:', {
            url: config.url,
            baseURL: config.baseURL,
            fullURL: `${config.baseURL}${config.url}`,
            method: config.method,
            data: config.data,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para responses
geminiApi.interceptors.response.use(
    (response) => {
        console.log('✅ Gemini API Response:', {
            status: response.status,
            statusText: response.statusText,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('❌ Response Error:', {
            message: error.message,
            code: error.code,
            config: {
                url: error.config?.url,
                baseURL: error.config?.baseURL,
                fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'N/A'
            },
            response: error.response ? {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data
            } : 'No response received'
        });
        return Promise.reject(error);
    }
);

export default geminiApi;