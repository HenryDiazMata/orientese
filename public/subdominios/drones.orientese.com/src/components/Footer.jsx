// ==========================================
// Footer.jsx
// Pie de drones.orientese.com
// Desktop: 3 columnas. Móvil: una debajo de otra.
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Mail,
  MessageSquare,
  Send,
  Lock,
  ShieldCheck,
  Users,
  HelpCircle
} from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const { t } = useTranslation();

  const handleNavigation = (viewId) => {
    if (setCurrentView) {
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-theme">
      <div className="container">

        {/* Columnas: la cuadrícula real está en App.css (.footer-cols) */}
        <div className="footer-cols">

          {/* Contacto */}
          <div>
            <h4>{t('footer.contactTitle')}</h4>

            <p className="footer-line">
              <MapPin size={14} color="#38bdf8" className="footer-ico" />
              <span>
                {t('footer.addressLabel')}: Rua da Mina, Nº 48 <br />
                Conjunto Residencial Recanto dos Humildes<br />
                Distrito Perus, São Paulo <br />
                SP, {t('footer.brazil')}
              </span>
            </p>

            <p className="footer-line footer-mail">
              <Mail size={14} color="#38bdf8" />
              <a href="mailto:contato@drones.orientese.com">contato@drones.orientese.com</a>
            </p>

            <div className="footer-social">
              <a href="#" className="footer-wa">
                <MessageSquare size={16} /> WhatsApp
              </a>
              <a href="#" className="footer-tg">
                <Send size={14} /> Telegram
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4>{t('footer.navTitle')}</h4>
            <div className="footer-nav-grid">
              <button onClick={() => handleNavigation('INÍCIO')} className="footer-link">{t('footer.home')}</button>
              <button onClick={() => handleNavigation('ORÇAMENTOS')} className="footer-link">{t('footer.quotes')}</button>
              <button onClick={() => handleNavigation('PILOTOS')} className="footer-link">{t('nav.pilots')}</button>
              <button onClick={() => handleNavigation('AUXILIARES')} className="footer-link">{t('nav.helpers')}</button>
              <button onClick={() => handleNavigation('MANUTENÇÃO')} className="footer-link">{t('footer.maint')}</button>
              <button onClick={() => handleNavigation('CONSERTOS')} className="footer-link">{t('footer.repairs')}</button>
              <button onClick={() => handleNavigation('PROFISSIONAIS')} className="footer-link">{t('footer.pros')}</button>
              <button onClick={() => handleNavigation('DRONES')} className="footer-link">{t('nav.drones')}</button>
              <button onClick={() => handleNavigation('VAGAS')} className="footer-link">{t('footer.jobs')}</button>
              <button onClick={() => handleNavigation('ANUNCIANTES')} className="footer-link">{t('footer.ads')}</button>
            </div>
          </div>

          {/* Información */}
          <div>
            <h4>{t('footer.infoTitle')}</h4>
            <div className="footer-info-list">
              <a href="#">
                <Users size={14} /> {t('footer.about')}
              </a>
              <a href="#">
                <Lock size={14} /> {t('footer.terms')}
              </a>
              <a href="#">
                <ShieldCheck size={14} /> {t('footer.privacy')}
              </a>
              <a href="#">
                <Users size={14} /> {t('footer.community')}
              </a>
              <a href="#">
                <HelpCircle size={14} /> {t('footer.faq')}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div>{t('footer.copy')}</div>
          <div>{t('footer.credits')}</div>
        </div>
      </div>
    </footer>
  );
}