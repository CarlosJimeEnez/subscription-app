import { AxiosInstance } from 'axios';

/**
 * Configura un interceptor de autenticación para una instancia de Axios
 * que añadirá automáticamente el token de autenticación a cada solicitud
 * y manejará la renovación del token cuando expire
 */
export const setupAuthInterceptor = (axiosInstance: AxiosInstance, getTokenFn: () => Promise<string | null>): void => {
  // Eliminar interceptores anteriores si existen para evitar duplicados
  // Configurar nuevo interceptor de solicitud
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        // Obtener token fresco para cada solicitud usando la función proporcionada
        const token = await getTokenFn();
        
        // Añadir más información para depuración
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error al obtener token para la solicitud:', error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Configurar interceptor de respuesta para manejar errores 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Si el error es 401 (No autorizado) y no hemos intentado renovar el token ya
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        console.log('Error 401 detectado, intentando renovar token...');
        originalRequest._retry = true;
        
        try {
          // Intentar obtener un nuevo token
          const newToken = await getTokenFn();
          
          if (newToken) {
            // Actualizar el token en la solicitud original
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            // Reintentar la solicitud original con el nuevo token
            return axiosInstance(originalRequest);
          } else {
            console.error('No se pudo obtener un nuevo token');
          }
        } catch (refreshError) {
          console.error('Error al renovar el token:', refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};