import axios from "axios";

const expensesApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_EXPENSES_API_URL,
    timeout: 10000,
});

// Función para configurar la autenticación
export const setupExpensesAuth = (getTokenFn: () => Promise<string | null>) => {
    // Interceptor para requests - añadir token de autenticación
    expensesApi.interceptors.request.use(
        async (config) => {
            try {
                const token = await getTokenFn();
                
                console.log('🚀 Expenses API Request:', {
                    url: config.url,
                    baseURL: config.baseURL,
                    fullURL: `${config.baseURL}${config.url}`,
                    method: config.method,
                    hasToken: !!token
                });
                
                // Añadir token si existe
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('❌ Error al obtener token para expenses:', error);
            }
            return config;
        },
        (error) => {
            console.error('❌ Expenses Request Error:', error);
            return Promise.reject(error);
        }
    );

    // Interceptor para responses
    expensesApi.interceptors.response.use(
        (response) => {
            console.log('✅ Expenses API Response:', {
                status: response.status,
                statusText: response.statusText,
                dataLength: response.data?.length || 'N/A'
            });
            return response;
        },
        async (error) => {
            console.error('❌ Expenses Response Error:', {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                config: {
                    url: error.config?.url,
                    baseURL: error.config?.baseURL,
                    fullURL: error.config ? `${error.config.baseURL}${error.config.url}` : 'N/A'
                }
            });
            
            // Si es error 401, intentar renovar token
            if (error.response?.status === 401 && !error.config._retry) {
                console.log('🔄 Error 401 detectado, intentando renovar token...');
                error.config._retry = true;
                
                try {
                    const newToken = await getTokenFn();
                    
                    if (newToken) {
                        error.config.headers['Authorization'] = `Bearer ${newToken}`;
                        return expensesApi(error.config);
                    }
                } catch (refreshError) {
                    console.error('❌ Error al renovar token:', refreshError);
                }
            }
            
            return Promise.reject(error);
        }
    );
};

export default expensesApi;
