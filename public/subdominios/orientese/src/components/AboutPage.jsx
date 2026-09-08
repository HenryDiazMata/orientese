import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * AboutPage.jsx
 * Ubicación: src/components/AboutPage.jsx
 * Propósito: Presentar la trayectoria histórica, propósito informativo y proyección internacional de Orientese.
 */
export default function AboutPage({ onBackHome }) {
  const { t } = useTranslation();

  return (
    <div className="about-page-container">
      {/* Botón superior para retornar al Home */}
      <button className="btn-secondary" onClick={onBackHome} style={{ marginBottom: '1.5rem' }}>
        ← {t('common.back', 'Voltar ao início')}
      </button>

      <h2>{t('about.title', 'Sobre o Portal Orientese')}</h2>
      
      <div className="about-content-body" style={{ marginTop: '1rem', lineHeight: '1.6' }}>
        {/* Bloque 1: Origen e Historia */}
        <section className="about-section" style={{ marginBottom: '1.5rem' }}>
          <h3>Nossa Origem e Trajetória</h3>
          <p>
            O <strong>Portal Orientese</strong> nasceu no dia 3 de agosto do ano 2000 na cidade de Cumaná, Estado Sucre (Venezuela), sob o lema <em>"De Sucre para a Venezuela e o Mundo"</em>. Criado originalmente como um espaço pioneiro de orientação e utilidade, o portal evoluiu com os avanços tecnológicos sem perder sua essência integradora.
          </p>
        </section>

        {/* Bloque 2: Modernización y LLC */}
        <section className="about-section" style={{ marginBottom: '1.5rem' }}>
          <h3>Modernização e Visão Global</h3>
          <p>
            Hoje, operando a partir de São Paulo (Brasil) e em processo de consolidação institucional sob a figura de uma <strong>Wyoming LLC (EUA)</strong>, o Orientese se reinventa como um ecossistema digital moderno. Nossa estrutura internacional garante altos padrões de qualidade, neutralidade e credibilidade para usuários e parceiros em todo o continente.
          </p>
        </section>

        {/* Bloque 3: Propósito del Portal */}
        <section className="about-section" style={{ marginBottom: '1.5rem' }}>
          <h3>Propósito Informativo</h3>
          <p>
            O Orientese não é um meio noticioso nem um canal de vendas diretas. Nosso compromisso é <strong>informar de maneira útil, agradável e transparente</strong>. Por meio de subdomínios especializados, fornecemos ferramentas de cálculo, diretórios profissionais verificados e conteúdos focados na tomada de decisões estratégicas.
          </p>
        </section>

        {/* Bloque 4: Ecosistema SSO */}
        <section className="about-section" style={{ marginBottom: '1.5rem' }}>
          <h3>Ecossistema Unificado (SSO)</h3>
          <p>
            Acreditamos na simplicidade. Por isso, oferecemos um sistema de cadastro único que permite acessar todas as áreas do portal — como <code>drones</code>, <code>mentora</code>, <code>standshowtour</code>, <code>ofertas</code>, <code>empleos</code>, <code>ondesp</code> e <code>fundaval</code> — com um único usuário e senha.
          </p>
        </section>
      </div>

      {/* Botón inferior de retorno */}
      <button className="btn-secondary" onClick={onBackHome} style={{ marginTop: '1rem' }}>
        ← {t('common.back', 'Voltar ao início')}
      </button>
    </div>
  );
}