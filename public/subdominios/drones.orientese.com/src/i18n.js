import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './Locales/es.json';
import ptBR from './Locales/pt-BR.json';
import en from './Locales/en.json';
import fr from './Locales/fr.json';
import it from './Locales/it.json';

i18n.use(initReactI18next).init({
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
load: 'languageOnly',
  nonExplicitSupportedLngs: false,
  interpolation: { escapeValue: false }
});

export default i18n;