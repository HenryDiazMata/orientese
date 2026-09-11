import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation('orientese');

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="footer-copyright">&copy; 2026 Orientese. {t('footer.rights', 'Todos los derechos reservados.')}</p>
          <p className="footer-address">📍 Orientese.com - Portal Integrado de Subdominios</p>
        </div>

        <div className="footer-links">
          <a href="#privacy">{t('footer.privacy', 'Política de Privacidad')}</a>
          <span>•</span>
          <a href="#terms">{t('footer.terms', 'Términos de Servicio')}</a>
          <span>•</span>
          <a href="#contact">{t('footer.contact', 'Contacto')}</a>
        </div>

        <div className="footer-credits">
          <span>Desarrollado por el equipo de Orientese</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;