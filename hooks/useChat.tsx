import { useAuth } from '@/services/auth/useAuth';

/**
 * Hook para gestionar la funcionalidad del chat
 * Proporciona información sobre el estado de autenticación para el chat
 */
const useChat = () => {
  const { isAuthenticated } = useAuth();

  return {
    isAuthenticated
  };
};

export default useChat;