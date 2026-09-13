// ==========================================
// RUTA: src/components/drones/i18n.js
// IDIOMAS SOLO DEL SUBDOMINIO DRONES
// NO USA EL MISMO MOTOR QUE ORIENTESE PARA QUE NO SE MEZCLEN LOS TEXTOS
// ==========================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '../../locales/drones/es.json';
import ptBR from '../../locales/drones/pt-BR.json';
import en from '../../locales/drones/en.json';
import fr from '../../locales/drones/fr.json';
import it from '../../locales/drones/it.json';

// INSTANCIA PROPIA DE DRONES (NO PISA EL IDIOMA DEL PORTAL)
const i18nDrones = i18n.createInstance();

i18nDrones.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    'pt-BR': { translation: ptBR },
    pt: { translation: ptBR },
    en: { translation: en },
    fr: { translation: fr },
    it: { translation: it }
  },
  lng: localStorage.getItem('idioma') || 'pt-BR',
  fallbackLng: 'pt-BR',
  supportedLngs: ['es', 'pt-BR', 'pt', 'en', 'fr', 'it'],
  load: 'currentOnly',
  interpolation: { escapeValue: false }
});

export default i18nDrones;