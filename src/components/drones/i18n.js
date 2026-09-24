// ==========================================
// RUTA: src/components/drones/i18n.js
// IDIOMAS SOLO DEL SUBDOMINIO DRONES
// NO USA EL MISMO MOTOR QUE ORIENTESE PARA QUE NO SE MEZCLEN LOS TEXTOS
// IDIOMAS: ES, PT-BR, EN, FR, IT, DE
// ==========================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ==========================================
// JSON GRANDES ACTUALES (NO MOVER / NO BORRAR)
// NAV, FOOTER, INICIO, SIMULADOR, ETC.
// ==========================================
import es from '../../locales/drones/es.json';
import ptBR from '../../locales/drones/pt-BR.json';
import en from '../../locales/drones/en.json';
import fr from '../../locales/drones/fr.json';
import it from '../../locales/drones/it.json';
import de from '../../locales/drones/de.json';

// ==========================================
// JSON POR SECCION — SOLO PLANES
// CARPETA: src/locales/drones/<idioma>/planes.json
// ==========================================
import esPlanes from '../../locales/drones/es/planes.json';
import ptPlanes from '../../locales/drones/pt-BR/planes.json';
import enPlanes from '../../locales/drones/en/planes.json';
import frPlanes from '../../locales/drones/fr/planes.json';
import itPlanes from '../../locales/drones/it/planes.json';
import dePlanes from '../../locales/drones/de/planes.json';

// ==========================================
// INSTANCIA PROPIA DEL SUBDOMINIO
// ==========================================
const i18nDrones = i18n.createInstance();

i18nDrones.use(initReactI18next).init({
  resources: {
    // MERGE: EL GRANDE + PLANES. PLANES PISA CLAVES SI SE REPETEN.
    es: { translation: { ...es, ...esPlanes } },
    'pt-BR': { translation: { ...ptBR, ...ptPlanes } },
    pt: { translation: { ...ptBR, ...ptPlanes } },
    en: { translation: { ...en, ...enPlanes } },
    fr: { translation: { ...fr, ...frPlanes } },
    it: { translation: { ...it, ...itPlanes } },
    de: { translation: { ...de, ...dePlanes } },
  },
  lng: localStorage.getItem('idioma') || 'pt-BR',
  fallbackLng: 'pt-BR',
  supportedLngs: ['es', 'pt-BR', 'pt', 'en', 'fr', 'it', 'de'],
  load: 'currentOnly',
  interpolation: { escapeValue: false },
});

export default i18nDrones;