// IMPORTACIÓN DE LIBRERÍAS DE INTERNACIONALIZACIÓN
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// IMPORTACIÓN DE ARCHIVOS DE TRADUCCIÓN DEL SUBDOMINIO ORIENTESE
import esOrientese from './locales/orientese/es.js';
import ptOrientese from './locales/orientese/pt-BR.js';
import enOrientese from './locales/orientese/en.js';

// CONFIGURACIÓN DE RECURSOS DIVIDIDOS POR ESPACIOS DE NOMBRES (NAMESPACES)
const resources = {
  // 1. PORTUGUÊS (PT-BR)
  'pt-BR': {
    orientese: ptOrientese,
    drones: {}
  },

  // 2. CASTELLANO (ES)
  es: {
    orientese: esOrientese,
    drones: {}
  },

  // 3. ENGLISH (EN)
  en: {
    orientese: enOrientese,
    drones: {}
  }
};

// ALIAS PARA SOPORTAR VARIACIONES DEL SELECTOR
resources.pt = resources['pt-BR'];

// INICIALIZACIÓN DE I18NEXT EN REACT
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',                       // IDIOMA INICIAL POR DEFECTO
    fallbackLng: 'es',               // IDIOMA DE RESPALDO EN CASO DE ERROR
    defaultNS: 'orientese',          // NAMESPACE POR DEFECTO
    interpolation: {
      escapeValue: false             // REACT PROTEGE CONTRA ATAQUES XSS AUTOMÁTICAMENTE
    }
  });

export default i18n;