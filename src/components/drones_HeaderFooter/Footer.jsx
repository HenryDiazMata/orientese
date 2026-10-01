// ==========================================
// ARCHIVO COMPLETO: src/components/drones_HeaderFooter/Footer.jsx
// PIE SOLO DEL SUBDOMINIO DRONES
// WHATSAPP SI. TELEGRAM NO.
// LEGALES: SOMOS / TERMINOS / PRIVACIDAD / COMUNIDAD / FAQ
// FRANJA BETA AQUAMARINE. SIN LEYENDAS DE IDIOMA.
// CAMBIAR WHATSAPP: href wa.me
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../drones/i18n';

import {
  MapPin,
  Mail,
  MessageSquare,
  Lock,
  ShieldCheck,
  Users,
  HelpCircle,
} from 'lucide-react';

const LOGO_PORTAL = '/logos/orientese/logorientc2018Azul01.gif';
const URL_PORTAL = 'https://orientese.com';

export default function Footer({ setCurrentView }) {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  const handleNavigation = (viewId) => {
    if (setCurrentView) {
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-theme">
      <div className="container">
        <div className="footer-cols">
          <div>
            <h4>{t('footer.contactTitle')}</h4>

            <p className="footer-line">
              <MapPin size={14} color="#38bdf8" className="footer-ico" />
              <span>
                {t('footer.addressLabel')}: Rua da Mina, Nº 48 <br />
                Conjunto Residencial Recanto dos Humildes
                <br />
                Distrito Perus, São Paulo <br />
                SP, {t('footer.brazil')}
              </span>
            </p>

            <p className="footer-line footer-mail">
              <Mail size={14} color="#38bdf8" />
              <a href="mailto:contacto@drones.orientese.com">
                contacto@drones.orientese.com
              </a>
            </p>

            <div className="footer-social">
              <a
                href="https://wa.me/5511981941201"
                className="footer-wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare size={16} />{' '}
                {t('footer.whatsapp', { defaultValue: 'WhatsApp' })}
              </a>
            </div>
          </div>

          <div>
            <h4>{t('footer.navTitle')}</h4>
            <div className="footer-nav-grid">
              <button onClick={() => handleNavigation('INÍCIO')} className="footer-link">
                {t('footer.home')}
              </button>
              <button onClick={() => handleNavigation('BIENVENIDA')} className="footer-link">
                {t('nav.welcome')}
              </button>
              <button onClick={() => handleNavigation('PLANES')} className="footer-link">
                {t('nav.planes')}
              </button>
              <button onClick={() => handleNavigation('ACTIVAR')} className="footer-link">
                {t('nav.activate')}
              </button>
              <button onClick={() => handleNavigation('RENOVAR')} className="footer-link">
                {t('nav.renew')}
              </button>
              <button onClick={() => handleNavigation('ORÇAMENTOS')} className="footer-link">
                {t('footer.quotes')}
              </button>
              <button onClick={() => handleNavigation('CADASTRO')} className="footer-link">
                {t('nav.register')}
              </button>
              <button onClick={() => handleNavigation('PILOTOS')} className="footer-link">
                {t('nav.pilots')}
              </button>
              <button onClick={() => handleNavigation('AUXILIARES')} className="footer-link">
                {t('nav.helpers')}
              </button>
              <button onClick={() => handleNavigation('MANUTENÇÃO')} className="footer-link">
                {t('footer.maint')}
              </button>
              <button onClick={() => handleNavigation('CONSERTOS')} className="footer-link">
                {t('footer.repairs')}
              </button>
              <button onClick={() => handleNavigation('PROFISSIONAIS')} className="footer-link">
                {t('footer.pros')}
              </button>
              <button onClick={() => handleNavigation('VAGAS')} className="footer-link">
                {t('footer.jobs')}
              </button>
              <button onClick={() => handleNavigation('ANUNCIANTES')} className="footer-link">
                {t('footer.ads')}
              </button>
              <button onClick={() => handleNavigation('VENTAS')} className="footer-link">
                {t('nav.ventas', { defaultValue: 'VENTAS' })}
              </button>
            </div>
          </div>

          <div>
            <h4>{t('footer.infoTitle')}</h4>
            <div className="footer-info-list">
              <button type="button" className="footer-link" onClick={() => handleNavigation('SOMOS')}>
                <Users size={14} /> {t('footer.about')}
              </button>
              <button type="button" className="footer-link" onClick={() => handleNavigation('TERMINOS')}>
                <Lock size={14} /> {t('footer.terms')}
              </button>
              <button type="button" className="footer-link" onClick={() => handleNavigation('PRIVACIDAD')}>
                <ShieldCheck size={14} /> {t('footer.privacy')}
              </button>
              <button type="button" className="footer-link" onClick={() => handleNavigation('COMUNIDAD')}>
                <Users size={14} /> {t('footer.community')}
              </button>
              <button type="button" className="footer-link" onClick={() => handleNavigation('FAQ')}>
                <HelpCircle size={14} /> {t('footer.faq')}
              </button>
            </div>

            <a href={URL_PORTAL} className="footer-portal" title="orientese.com">
              <img src={LOGO_PORTAL} alt="orientese.com" />
            </a>
          </div>
        </div>

        <p
          className="footer-line"
          style={{
            margin: '1rem 0 0.75rem',
            maxWidth: '52rem',
            padding: '0.65rem 0.85rem',
            background: '#7FFFD4',
            color: '#0b3b3b',
            borderRadius: 8,
            lineHeight: 1.5,
            fontWeight: 600,
          }}
        >
          {t('beta.franja')}
        </p>

        <div className="footer-bottom">
          <div>{t('footer.copy')}</div>
          <div>{t('footer.credits')}</div>
        </div>
      </div>
    </footer>
  );
}