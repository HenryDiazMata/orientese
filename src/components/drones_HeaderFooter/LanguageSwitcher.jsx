// ==========================================
// ARCHIVO COMPLETO: src/components/drones_HeaderFooter/LanguageSwitcher.jsx
// SELECTOR DE IDIOMA DEL SUBDOMINIO drones.orientese.com
// VIVE EN LA FRANJA SUPERIOR (NO EN EL MENU IZQUIERDO)
// IDIOMAS: PT, ES, EN, FR, IT (DE MAS ADELANTE)
// COLORES / TAMAÑO: CLASE .drones-lang-select EN drones.css
// ==========================================

import { useTranslation } from 'react-i18next';
import i18nDrones from '../drones/i18n';

const IDIOMAS = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Castellano' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'de', label: 'Deutsch' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation(undefined, { i18n: i18nDrones });

  // PT Y PT-BR SON EL MISMO IDIOMA
  const actual = i18n.language?.startsWith('pt') ? 'pt' : i18n.language;

  const cambiar = (code) => {
    i18n.changeLanguage(code === 'pt' ? 'pt-BR' : code);
  };

  return (
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
  );
}