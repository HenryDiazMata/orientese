import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    orientese: {
      header: { tagline: 'Información útil y agradable', about: 'Quiénes Somos', contact: 'Contacto' },
      common: { back: 'Inicio', backHome: '← Volver al inicio' },
      footer: { rights: 'Todos los derechos reservados.', privacy: 'Política de Privacidad', terms: 'Términos de Servicio', contact: 'Contacto' },
      auth: { form: { loginButton: 'Iniciar Sesión', registerButton: 'Registrarse' } },
      subdomains: {
        drones: { desc: 'Servicios aéreos, fotografía, inspección técnica y formación de pilotos.' },
        fundaval: { desc: 'Contenido dinámico, podcasts, blogs y videos autónomos.' },
        ofertas: { desc: 'Oportunidades, clasificados y comercio local.' },
        masoneria: { desc: 'Secciones históricas e información institucional.' },
        aquaviarios: { desc: 'Información, servicios e interacción para el sector marítimo y acuaviario.' },
        turismo: { desc: 'Guías de viaje, eventos culturales y rutas turísticas destacadas.' }
      }
    }
  },
  'pt-BR': {
    orientese: {
      header: { tagline: 'Informações úteis e agradáveis', about: 'Quem Somos', contact: 'Contato' },
      common: { back: 'Início', backHome: '← Voltar ao início' },
      footer: { rights: 'Todos os direitos reservados.', privacy: 'Política de Privacidade', terms: 'Termos de Serviço', contact: 'Contato' },
      auth: { form: { loginButton: 'Entrar', registerButton: 'Cadastrar-se' } },
      subdomains: {
        drones: { desc: 'Serviços aéreos, fotografia, inspeção técnica e formação de pilotos.' },
        fundaval: { desc: 'Conteúdo dinâmico, podcasts, blogs e vídeos autónomos.' },
        ofertas: { desc: 'Oportunidades, classificados e comércio local.' },
        masoneria: { desc: 'Seções históricas e informações institucionais.' },
        aquaviarios: { desc: 'Informações, serviços e interação para o setor marítimo e aquaviário.' },
        turismo: { desc: 'Guias de viagem, eventos culturais e rotas turísticas destacadas.' }
      }
    }
  },
  en: {
    orientese: {
      header: { tagline: 'Useful and pleasant information', about: 'About Us', contact: 'Contact' },
      common: { back: 'Home', backHome: '← Back to home' },
      footer: { rights: 'All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms of Service', contact: 'Contact' },
      auth: { form: { loginButton: 'Log In', registerButton: 'Sign Up' } },
      subdomains: {
        drones: { desc: 'Aerial services, photography, technical inspection, and pilot training.' },
        fundaval: { desc: 'Dynamic content, podcasts, blogs, and autonomous videos.' },
        ofertas: { desc: 'Opportunities, classifieds, and local trade.' },
        masoneria: { desc: 'Historical sections and institutional information.' },
        aquaviarios: { desc: 'Information, services, and interaction for the maritime and waterway sector.' },
        turismo: { desc: 'Travel guides, cultural events, and highlighted tourist routes.' }
      }
    }
  },
  fr: {
    orientese: {
      header: { tagline: 'Des informations utiles et agréables', about: 'À Propos', contact: 'Contact' },
      common: { back: 'Accueil', backHome: '← Retour à l\'accueil' },
      footer: { rights: 'Tous droits réservés.', privacy: 'Politique de confidentialité', terms: 'Conditions de service', contact: 'Contact' },
      auth: { form: { loginButton: 'Se connecter', registerButton: 'S\'inscrire' } },
      subdomains: {
        drones: { desc: 'Services aériens, photographie, inspection technique et formation de pilotes.' },
        fundaval: { desc: 'Contenu dynamique, podcasts, blogs et vidéos autonomes.' },
        ofertas: { desc: 'Opportunités, petites annonces et commerce local.' },
        masoneria: { desc: 'Sections historiques et informations institutionnelles.' },
        aquaviarios: { desc: 'Informations, services et interaction pour le secteur maritime et aquatique.' },
        turismo: { desc: 'Guides de voyage, événements culturels et circuits touristiques en vedette.' }
      }
    }
  },
  it: {
    orientese: {
      header: { tagline: 'Informazioni utili e piacevoli', about: 'Chi Siamo', contact: 'Contatto' },
      common: { back: 'Home', backHome: '← Torna alla home' },
      footer: { rights: 'Tutti i diritti riservati.', privacy: 'Informativa sulla privacy', terms: 'Termini di servizio', contact: 'Contatto' },
      auth: { form: { loginButton: 'Accedi', registerButton: 'Registrati' } },
      subdomains: {
        drones: { desc: 'Servizi aerei, fotografia, ispezione tecnica e formazione piloti.' },
        fundaval: { desc: 'Contenuti dinamici, podcast, blog e video autonomi.' },
        ofertas: { desc: 'Opportunità, annunci e commercio locale.' },
        masoneria: { desc: 'Sezioni storiche e informazioni istituzionali.' },
        aquaviarios: { desc: 'Informazioni, servizi e interazione per il settore marittimo e acquatico.' },
        turismo: { desc: 'Guide di viaggio, eventi culturali e percorsi turistici in evidenza.' }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    ns: ['orientese'],
    defaultNS: 'orientese',
    interpolation: { escapeValue: false }
  });

export default i18n;