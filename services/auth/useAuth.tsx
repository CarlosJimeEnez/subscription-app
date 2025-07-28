import geminiApi from '@/actions/gemini.api';
import { useAuth as useClerkAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { setupAuthInterceptor } from './authInterceptor';

/**
 * Hook personalizado que extiende la funcionalidad de autenticación de Clerk
 * y configura automáticamente los interceptores de autenticación para las API
 * y el refresh automático de tokens
 */
export const useAuth = () => {
  const clerkAuth = useClerkAuth();
  
  useEffect(() => {
    // Configurar el interceptor de autenticación cuando el componente se monta
    // Pasamos la función getToken del hook de Clerk
    if (clerkAuth.getToken) {
      setupAuthInterceptor(geminiApi, clerkAuth.getToken);
    }
  }, [clerkAuth.getToken]);

  // Configurar refresh automático de token
  useEffect(() => {
    if (clerkAuth.isSignedIn && clerkAuth.getToken) {
      // Configurar refresh automático cada 50 minutos
      const interval = setInterval(async () => {
        try {
          await clerkAuth.getToken();
          console.log('Token refrescado automáticamente');
        } catch (error) {
          console.error('Error al refrescar token:', error);
        }
      }, 50 * 60 * 1000); // 50 minutos
      
      return () => clearInterval(interval);
    }
  }, [clerkAuth.isSignedIn, clerkAuth.getToken]);

  return {
    ...clerkAuth,
    isAuthenticated: !!clerkAuth.isSignedIn
  };
};