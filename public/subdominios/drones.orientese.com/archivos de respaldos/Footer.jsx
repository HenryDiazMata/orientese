// ==========================================
// Footer.jsx
// Rodapé fixo do site drones.orientese.com
// ==========================================

import React from 'react';
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
  
  // Função para navegar ao clicar nos links do rodapé
  const handleNavigation = (viewId) => {
    if (setCurrentView) {
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-theme">
      <div className="container">
        
        {/* Grid principal do Footer */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1.5fr 1fr', 
          gap: '40px', 
          marginBottom: '30px' 
        }}>
          
          {/* Coluna 1 - Contato & Endereço */}
          <div>
            <h4>Contato & Endereço</h4>
            
            <p style={{ fontSize: '13px', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={14} color="#38bdf8" style={{ marginTop: '3px', flexShrink: 0 }} />
              <span>Endereço: Av. Principal, Nº 1000 - Centro<br />São Paulo - SP, Brasil</span>
            </p>

            <p style={{ fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="#38bdf8" />
              <a href="mailto:contato@orientese.com">contato@orientese.com</a>
            </p>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a 
                href="#" 
                style={{ 
                  backgroundColor: '#22c55e', 
                  color: '#ffffff', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  fontSize: '13px', 
                  fontWeight: '700', 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px' 
                }}
              >
                <MessageSquare size={16} /> WhatsApp
              </a>

              <a 
                href="#" 
                style={{ 
                  color: '#38bdf8', 
                  fontSize: '13px', 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontWeight: '500' 
                }}
              >
                <Send size={14} /> Telegram
              </a>
            </div>
          </div>

          {/* Coluna 2 - Navegação */}
          <div>
            <h4>Navegação</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '10px', 
              fontSize: '13px' 
            }}>
              <button onClick={() => handleNavigation('INÍCIO')} className="footer-link">Início</button>
              <button onClick={() => handleNavigation('ORÇAMENTOS')} className="footer-link">Orçamentos</button>
              <button onClick={() => handleNavigation('PILOTOS')} className="footer-link">Pilotos</button>
              <button onClick={() => handleNavigation('AUXILIARES')} className="footer-link">Auxiliares</button>
              <button onClick={() => handleNavigation('MANUTENÇÃO')} className="footer-link">Manutenção</button>
              <button onClick={() => handleNavigation('CONSERTOS')} className="footer-link">Consertos</button>
              <button onClick={() => handleNavigation('PROFISSIONAIS')} className="footer-link">Profissionais</button>
              <button onClick={() => handleNavigation('DRONES')} className="footer-link">Drones</button>
            </div>
          </div>

          {/* Coluna 3 - Informações & Regras */}
          <div>
            <h4>Informações & Regras</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} /> Termos de Uso
              </a>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} /> Política de Privacidade
              </a>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Users size={14} /> Normas da Comunidade
              </a>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={14} /> Perguntas Frequentes (FAQ)
              </a>
            </div>
          </div>

        </div>

        {/* Linha inferior */}
        <div style={{ 
          borderTop: '1px solid #1e293b', 
          paddingTop: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          fontSize: '12px', 
          color: '#64748b',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>© 2026 drones.orientese.com - Todos os direitos reservados.</div>
          <div>Desenvolvido com <span style={{ color: '#ef4444' }}>♥</span> | Créditos de Autoria</div>
        </div>

      </div>

      {/* Estilo extra para os botões de navegação do footer */}
      <style>{`
        .footer-link {
          background: none;
          border: none;
          color: #cbd5e1;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #ffffff;
        }
      `}</style>
    </footer>
  );
}