// ==========================================
// RUTA: src/components/drones/i18n.js
// JSON GRANDE + PLANES + CADASTRO
// ==========================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '../../locales/drones/es.json';
import ptBR from '../../locales/drones/pt-BR.json';
import en from '../../locales/drones/en.json';
import fr from '../../locales/drones/fr.json';
import it from '../../locales/drones/it.json';
import de from '../../locales/drones/de.json';

import esPlanes from '../../locales/drones/es/planes.json';
import ptPlanes from '../../locales/drones/pt-BR/planes.json';
import enPlanes from '../../locales/drones/en/planes.json';
import frPlanes from '../../locales/drones/fr/planes.json';
import itPlanes from '../../locales/drones/it/planes.json';
import dePlanes from '../../locales/drones/de/planes.json';

import esCadastro from '../../locales/drones/es/cadastro.json';
import ptCadastro from '../../locales/drones/pt-BR/cadastro.json';
import enCadastro from '../../locales/drones/en/cadastro.json';
import frCadastro from '../../locales/drones/fr/cadastro.json';
import itCadastro from '../../locales/drones/it/cadastro.json';
import deCadastro from '../../locales/drones/de/cadastro.json';

const i18nDrones = i18n.createInstance();

i18nDrones.use(initReactI18next).init({
  resources: {
    es: { translation: { ...es, ...esPlanes, ...esCadastro } },
    'pt-BR': { translation: { ...ptBR, ...ptPlanes, ...ptCadastro } },
    pt: { translation: { ...ptBR, ...ptPlanes, ...ptCadastro } },
    en: { translation: { ...en, ...enPlanes, ...enCadastro } },
    fr: { translation: { ...fr, ...frPlanes, ...frCadastro } },
    it: { translation: { ...it, ...itPlanes, ...itCadastro } },
    de: { translation: { ...de, ...dePlanes, ...deCadastro } },
  },
  lng: localStorage.getItem('idioma') || 'pt-BR',
  fallbackLng: 'pt-BR',
  supportedLngs: ['es', 'pt-BR', 'pt', 'en', 'fr', 'it', 'de'],
  load: 'currentOnly',
  interpolation: { escapeValue: false },
});

export default i18nDrones;