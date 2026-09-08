import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2026 Orientese. {t('footer.rights')}</p>
        <p>{t('footer.credits')}</p>
      </div>
    </footer>
  );
}