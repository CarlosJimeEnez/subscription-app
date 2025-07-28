import i18n from 'i18next';

// Configuración de i18n para el sistema de traducción
i18n.init({
  resources: {
    en: {
      translation: {
        // Mensajes de información incompleta
        incompleteInfo: "Incomplete Information",
        missingFields: "Missing fields",
        currentData: "Information I already have",
        
        // Mensajes de éxito
        subscriptionRegistered: "Subscription Registered!",
        
        // Campos de suscripción
        name: "name",
        price: "price",
        description: "description",
        category: "category",
        status: "status",
        billingCycle: "billing cycle",
        
        // Categorías
        Music: "Music",
        Entertainment: "Entertainment",
        Services: "Services",
        Productivity: "Productivity",
        Gaming: "Gaming",
        Other: "Other",
        
        // Estados
        Active: "Active",
        Cancelled: "Cancelled",
        
        // Ciclos de facturación
        Monthly: "Monthly",
        Yearly: "Yearly",
        
        // Servicios financieros
        financialAnalysis: "Expense Analysis",
        subscriptionManagement: "Subscription Management",
        financialExtraction: "Financial Information Extraction"
      }
    },
    es: {
      translation: {
        // Mensajes de información incompleta
        incompleteInfo: "Información Incompleta",
        missingFields: "Campos faltantes",
        currentData: "Información que ya tengo",
        
        // Mensajes de éxito
        subscriptionRegistered: "¡Suscripción Registrada!",
        
        // Campos de suscripción
        name: "nombre",
        price: "precio",
        description: "descripción",
        category: "categoría",
        status: "estado",
        billingCycle: "ciclo de facturación",
        
        // Categorías
        Music: "Música",
        Entertainment: "Entretenimiento",
        Services: "Servicios",
        Productivity: "Productividad",
        Gaming: "Juegos",
        Other: "Otro",
        
        // Estados
        Active: "Activa",
        Cancelled: "Cancelada",
        
        // Ciclos de facturación
        Monthly: "Mensual",
        Yearly: "Anual",
        
        // Servicios financieros
        financialAnalysis: "Análisis de gastos",
        subscriptionManagement: "Gestión de suscripciones",
        financialExtraction: "Extracción de información financiera"
      }
    }
  },
  lng: "es", // Idioma por defecto español
  fallbackLng: "en",
  interpolation: {
    escapeValue: false // React ya escapa por defecto
  }
});

/**
 * Traduce un texto usando i18next
 * @param key - Clave de traducción
 * @param options - Opciones adicionales para la traducción
 * @returns Texto traducido
 */
export const t = (key: string, options?: any): string => {
  const result = i18n.t(key, options);
  // Asegurar que siempre retornemos un string
  return typeof result === 'string' ? result : key;
};

/**
 * Traduce un campo de suscripción al idioma actual
 * @param field - Campo a traducir
 * @returns Campo traducido
 */
export const translateField = (field: string): string => {
  // Intentar traducir usando la clave directa
  const translated = i18n.t(field);
  
  // Asegurar que el resultado sea un string y verificar si hay traducción
  const translatedString = typeof translated === 'string' ? translated : field;
  
  // Si no hay traducción disponible, devolver el campo original
  return translatedString !== field ? translatedString : field;
};

/**
 * Traduce un objeto completo de suscripción
 * @param data - Datos de suscripción
 * @returns Objeto con campos traducidos
 */
export const translateSubscriptionData = (data: Record<string, any>): Record<string, any> => {
  const translated: Record<string, any> = {};
  
  Object.entries(data).forEach(([key, value]) => {
    // Traducir la clave
    const translatedKey = translateField(key);
    
    // Traducir el valor si es un campo conocido
    let translatedValue = value;
    if (typeof value === 'string') {
      translatedValue = translateField(value);
    }
    
    translated[translatedKey] = translatedValue;
  });
  
  return translated;
};

/**
 * Cambia el idioma de la aplicación
 * @param language - Código del idioma ('en' | 'es')
 */
export const changeLanguage = (language: string): void => {
  i18n.changeLanguage(language);
};

/**
 * Obtiene el idioma actual
 * @returns Código del idioma actual
 */
export const getCurrentLanguage = (): string => {
  return i18n.language;
};

export default i18n;