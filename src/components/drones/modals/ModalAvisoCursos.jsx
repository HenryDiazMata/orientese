// ==========================================
// MODAL AVISO DE CURSOS — SOLO VISITANTE
// NO ES ALTA DE CUENTA: SEM SENHA, SEM PERFIL, SEM RENOVAR, SEM VENCIMENTO
// EFECTO: overlay + drone-fly-in / drone-fly-out (ModalDrone.css)
// UI EN PORTUGUÉS. COMENTARIOS EN CASTELLANO Y MAYÚSCULAS
// ==========================================

import { useState, useEffect } from 'react';
import './ModalDrone.css';
import { registrarAvisoVisitante } from '../../../views/drones/cadastro/visitantesAvisos';

export default function ModalAvisoCursos({ isOpen, onClose, onEnviado }) {
  const [isClosing, setIsClosing] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  // AL ABRIR DE NUEVO, LIMPIAR CAMPOS
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setNome('');
      setEmail('');
      setTelefone('');
      setErro('');
      setEnviando(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;
  if (!isOpen) return null;

  const fechar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) fechar();
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    setErro('');

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const foneLimpo = telefone.trim();

    if (!nomeLimpo || !emailLimpo || !foneLimpo) {
      setErro('Preencha nome, e-mail e telefone.');
      return;
    }

    setEnviando(true);

    // MOCK: SIN BD. GUARDA EN MEMORIA DE LA SESIÓN
    const resultado = registrarAvisoVisitante({
      nome: nomeLimpo,
      email: emailLimpo,
      telefone: foneLimpo,
    });

    setEnviando(false);

    if (!resultado.ok) {
      setErro(resultado.mensagem);
      return;
    }

    if (onEnviado) onEnviado(resultado.registro);
    fechar();
  };

  return (
    <div className="modal-drone-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-drone-card ${isClosing ? 'drone-fly-out' : 'drone-fly-in'}`}
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn-close-x" type="button" onClick={fechar}>
          ✕
        </button>

        <div className="modal-header">
          <span className="badge-especialidade">Visitante</span>
          <span className="modal-nome-prof" style={{ fontSize: '1.25rem' }}>
            Aviso de cursos
          </span>
          <p className="modal-sub">
            Enviaremos avisos de cursos relacionados a drones e afins
            (piloto, manutenção, mecânica, mapeamento, etc.).
          </p>
        </div>

        {erro && (
          <div
            style={{
              background: '#fef2f2',
              color: '#dc2626',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '14px',
              fontWeight: 600,
            }}
          >
            ⚠️ {erro}
          </div>
        )}

        <form onSubmit={handleEnviar}>
          <div style={{ marginBottom: '14px' }}>
            <label className="cadastro-aviso-label">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome"
              className="cadastro-aviso-input"
              autoComplete="name"
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label className="cadastro-aviso-label">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="cadastro-aviso-input"
              autoComplete="email"
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="cadastro-aviso-label">Telefone</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              placeholder="WhatsApp ou Telegram (um número)"
              className="cadastro-aviso-input"
              autoComplete="tel"
            />
            <p className="modal-sub" style={{ marginTop: '6px' }}>
              WhatsApp ou Telegram (um número).
            </p>
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="cadastro-aviso-enviar"
          >
            {enviando ? 'Enviando...' : 'Enviar'}
          </button>

          <button type="button" className="btn-fechar" onClick={fechar}>
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
}