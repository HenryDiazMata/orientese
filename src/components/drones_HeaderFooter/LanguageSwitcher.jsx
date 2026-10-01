// ==========================================
// ARCHIVO COMPLETO: src/components/drones_HeaderFooter/LanguageSwitcher.jsx
// AIRE = pt-BR. MENU VIVO: PT / ES / EN
// FR IT DE OCULTOS (JSON SE QUEDA). SE ACTIVAN DESPUES.
// LEYENDAS: idioma.leyendaIncompleto + idioma.leyendaTradutor
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import { useTranslation } from 'react-i18next';
import i18nDrones from '../drones/i18n';

// EDITA AQUI: PARA REACTIVAR FR/IT/DE DESCOMENTA ESAS LINEAS
const IDIOMAS = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Castellano' },
  { code: 'en', label: 'English' },
  // { code: 'fr', label: 'Français' },
  // { code: 'it', label: 'Italiano' },
  // { code: 'de', label: 'Deutsch' },
];

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation(undefined, { i18n: i18nDrones });

  const actual = i18n.language?.startsWith('pt') ? 'pt' : i18n.language;

  const cambiar = (code) => {
    const lng = code === 'pt' ? 'pt-BR' : code;
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('idioma', lng);
    } catch {
      /* ignore */
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <select
        value={actual}
        onChange={(e) => cambiar(e.target.value)}
        aria-label="Idioma"
        className="drones-lang-select"
      >
        {IDIOMAS.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
      {/* EDITA AQUI: TAMANO Y ALINEACION DE LAS LEYENDAS */}
      <span style={{ fontSize: '0.7rem', lineHeight: 1.3, maxWidth: 220, textAlign: 'right' }}>
        {t('idioma.leyendaIncompleto')}
      </span>
      <span style={{ fontSize: '0.7rem', lineHeight: 1.3, maxWidth: 220, textAlign: 'right' }}>
        {t('idioma.leyendaTradutor')}
      </span>
    </div>
  );
}