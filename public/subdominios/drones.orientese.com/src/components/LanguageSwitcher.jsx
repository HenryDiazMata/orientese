// Selector de idioma para TODO el subdominio drones.orientese.com
import { useTranslation } from 'react-i18next';

const IDIOMAS = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Castellano' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // pt y pt-BR son el mismo idioma
  const actual = i18n.language?.startsWith('pt') ? 'pt' : i18n.language;

  const cambiar = (code) => {
    i18n.changeLanguage(code === 'pt' ? 'pt-BR' : code);
  };

  return (
    <select
      value={actual}
      onChange={(e) => cambiar(e.target.value)}
      aria-label="Idioma"
      className="p-2 rounded-lg border text-xs font-medium min-w-[130px]"
      style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
    >
      {IDIOMAS.map((item) => (
        <option key={item.code} value={item.code}>
          {item.label}
        </option>
      ))}
    </select>
  );
}