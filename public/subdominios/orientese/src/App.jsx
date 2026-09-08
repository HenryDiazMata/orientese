import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from './components/MainLayout';
import AuthPage from './components/AuthPage';
import AboutPage from './components/AboutPage';
import './App.css';

/**
 * App.jsx
 * Ubicación: src/App.jsx
 * Propósito: Componente principal con enrutamiento inteligente entre vistas y detección de subdominios SSO.
 */
function App() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('light');
  const [currentView, setCurrentView] = useState('home');
  const [subdomain, setSubdomain] = useState('main');

  // Detectar el subdominio activo al cargar la aplicación
  useEffect(() => {
    const host = window.location.hostname; // Ej: drones.orientese.com o localhost
    const parts = host.split('.');

    // Si tiene más de 2 partes y no es www, extraemos el subdominio
    if (parts.length > 2 && parts[0] !== 'www') {
      setSubdomain(parts[0].toLowerCase());
    } else {
      setSubdomain('main'); // Dominio principal orientese.com
    }
  }, []);

  // Matriz Oficial de Subdominios de Orientese
  const subdominios = [
    {
      id: 'drones',
      titulo: 'drones.orientese.com',
      descricao: t('subdomains.drones.description', 'Simulador de orçamentos, diretório de pilotos, técnicos e serviços do setor.'),
      link: 'https://drones.orientese.com',
      imagem: '/isologotipo_drones.png',
      activo: true
    },
    {
      id: 'mentora',
      titulo: 'mentora.orientese.com',
      descricao: t('subdomains.mentora.description', 'Orientação em responsabilidade social e incentivos fiscais para pequenas, médias e grandes empresas.'),
      link: 'https://mentora.orientese.com',
      imagem: null,
      activo: true
    },
    {
      id: 'standshowtour',
      titulo: 'standshowtour.orientese.com',
      descricao: t('subdomains.standshowtour.description', 'Promoção empresarial, comercial e turística integrando realidade aumentada.'),
      link: 'https://standshowtour.orientese.com',
      imagem: null,
      activo: true
    },
    {
      id: 'ofertas',
      titulo: 'ofertas.orientese.com',
      descricao: t('subdomains.ofertas.description', 'Publicação de ofertas lícitas e capacitação comercial para empresários.'),
      link: 'https://ofertas.orientese.com',
      imagem: null,
      activo: true
    },
    {
      id: 'empleos',
      titulo: 'empleos.orientese.com',
      descricao: t('subdomains.empleos.description', 'Conexão direta entre profissionais que oferecem serviços e contratantes.'),
      link: 'https://empleos.orientese.com',
      imagem: null,
      activo: true
    },
    {
      id: 'ondesp',
      titulo: 'ondesp.orientese.com',
      descricao: t('subdomains.ondesp.description', 'Guia útil e informativo sobre serviços, comércio e investimento em São Paulo.'),
      link: 'https://ondesp.orientese.com',
      imagem: null,
      activo: true
    },
    {
      id: 'fundaval',
      titulo: 'fundaval.orientese.com',
      descricao: t('subdomains.fundaval.description', 'Espaço dedicado a temas variados de formação social, cidadã e desenvolvimento comunitário.'),
      link: 'https://fundaval.orientese.com',
      imagem: null,
      activo: true
    }
  ];

  // Función para cambiar de vista y hacer scroll automático si es necesario
  const handleNavigation = (targetView) => {
    if (targetView === 'servicos') {
      setCurrentView('home');
      // Esperamos a que React monte la vista 'home' en el DOM antes de hacer scroll
      setTimeout(() => {
        const element = document.getElementById('servicos');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentView(targetView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Alternar entre tema Claro (light) y Oscuro (dark)
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Renderizar vistas especializadas según el subdominio cargado
  const renderSubdomainView = () => {
    switch (subdomain) {
      case 'drones':
        return (
          <section className="hero-section">
            <h1 className="section-title">Drones & Movilidade Aérea</h1>
            <p className="contact-subtitle">Simulador de orçamentos, diretório de pilotos e serviços especializados do setor.</p>
          </section>
        );
      case 'mentora':
        return (
          <section className="hero-section">
            <h1 className="section-title">Mentora</h1>
            <p className="contact-subtitle">Orientação em responsabilidade social e incentivos fiscais para empresas.</p>
          </section>
        );
      case 'ofertas':
        return (
          <section className="hero-section">
            <h1 className="section-title">Ofertas & Licitacións</h1>
            <p className="contact-subtitle">Publicação de ofertas lícitas e capacitação comercial empresarial.</p>
          </section>
        );
      case 'empleos':
        return (
          <section className="hero-section">
            <h1 className="section-title">Portal de Empleos</h1>
            <p className="contact-subtitle">Conexão direta entre profissionais que oferecem serviços e contratantes.</p>
          </section>
        );
      case 'ondesp':
        return (
          <section className="hero-section">
            <h1 className="section-title">Onde em São Paulo (Ondesp)</h1>
            <p className="contact-subtitle">Guia útil e informativo sobre serviços, comércio e investimento em São Paulo.</p>
          </section>
        );
      case 'fundaval':
        return (
          <section className="hero-section">
            <h1 className="section-title">Fundaval</h1>
            <p className="contact-subtitle">Espaço dedicado a temas de formação social, cidadã e desenvolvimento comunitário.</p>
          </section>
        );
      case 'standshowtour':
        return (
          <section className="hero-section">
            <h1 className="section-title">StandShowTour</h1>
            <p className="contact-subtitle">Promoção empresarial, comercial e turística integrando realidade aumentada.</p>
          </section>
        );
      default:
        // Portal principal orientese.com
        return (
          <>
            {/* Sección Hero */}
            <section className="hero-section">
              <h1 className="section-title">{t('hero.title', 'Portal Orientese')}</h1>
              <p className="contact-subtitle">{t('hero.subtitle', 'Um ecossistema de subdomínios especializados para informar de maneira útil e agradável.')}</p>
            </section>

            {/* Grilla de Subdominios Oficiales */}
            <section id="servicos" className="services-grid">
              {subdominios.map((item, index) => (
                <div key={index} className="service-card">
                  {item.imagem && (
                    <div className="card-image-container">
                      <img 
                        src={item.imagem} 
                        alt={`Logo ${item.titulo}`} 
                        className="card-image"
                      />
                    </div>
                  )}

                  <div className="card-body">
                    <h3>{item.titulo}</h3>
                    <p>{item.descricao}</p>
                    
                    <a 
                      href={item.link} 
                      target={item.activo ? "_blank" : "_self"} 
                      rel="noopener noreferrer" 
                      className={`subdomain-link ${!item.activo ? 'disabled-link' : ''}`}
                    >
                      {item.activo 
                        ? t('subdomains.accessButton', 'Acessar site') 
                        : t('subdomains.comingSoon', 'Em preparação')}
                    </a>
                  </div>
                </div>
              ))}
            </section>
          </>
        );
    }
  };

  return (
    <MainLayout 
      theme={theme} 
      toggleTheme={toggleTheme} 
      onNavigate={handleNavigation}
    >
      {/* Vista Principal adaptada al subdominio */}
      {currentView === 'home' && renderSubdomainView()}

      {/* Vista: Sobre Nosotros */}
      {currentView === 'sobre' && (
        <AboutPage onBackHome={() => handleNavigation('home')} />
      )}

      {/* Vista: Autenticación SSO (Login y Registro) */}
      {(currentView === 'cadastro' || currentView === 'login') && (
        <AuthPage 
          initialMode={currentView} 
          onBackHome={() => handleNavigation('home')} 
        />
      )}
    </MainLayout>
  );
}

export default App;