// ==========================================
// ModalLogin.jsx
// Login + Recuperação de senha
// Sempre tema Light + animação drone-fly
// + botão FECHAR em todos os modos
// ==========================================

import React, { useState } from 'react';
import { useAuth } from "../../../context/drones/AuthContext";
import "./ModalDrone.css";

export default function ModalLogin({ isOpen, onClose, onLoginSuccess }) {
  const { login, requestPasswordReset, resetPassword } = useAuth();
  const [isClosing, setIsClosing] = useState(false);

  // 'login' | 'esqueci' | 'redefinir'
  const [modo, setModo] = useState('login');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Recuperação
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [codigoDev, setCodigoDev] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setModo('login');
      setEmail('');
      setSenha('');
      setCodigo('');
      setNovaSenha('');
      setConfirmarNovaSenha('');
      setErro('');
      setSucesso('');
      setCodigoDev('');
      onClose();
    }, 300);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);

    const result = login(email, senha);
    setLoading(false);

    if (result.success) {
      handleClose();
      if (onLoginSuccess) onLoginSuccess(result.user);
    } else {
      setErro(result.message);
    }
  };

  const handleSolicitarCodigo = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);

    const result = requestPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setSucesso(result.message);
      setCodigoDev(result.codigoDev || '');
      setModo('redefinir');
    } else {
      setErro(result.message);
    }
  };

  const handleRedefinirSenha = (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (novaSenha !== confirmarNovaSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const result = resetPassword(email, codigo, novaSenha);
    setLoading(false);

    if (result.success) {
      setSucesso(result.message);
      setModo('login');
      setSenha('');
      setCodigo('');
      setNovaSenha('');
      setConfirmarNovaSenha('');
      setCodigoDev('');
    } else {
      setErro(result.message);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: '14px',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#334155',
  };

  return (
    <div className="modal-drone-overlay">
      <div
        className={`modal-drone-card ${isClosing ? 'drone-fly-out' : 'drone-fly-in'}`}
        style={{ maxWidth: '420px' }}
      >
        <button className="btn-close-x" onClick={handleClose} type="button">
          ✕
        </button>

        <div className="modal-header" style={{ marginBottom: '20px' }}>
          <span className="badge-especialidade">
            {modo === 'login' && 'Acesso'}
            {modo === 'esqueci' && 'Recuperação'}
            {modo === 'redefinir' && 'Nova Senha'}
          </span>
          <span className="modal-nome-prof" style={{ fontSize: '1.25rem' }}>
            {modo === 'login' && 'Entrar na sua conta'}
            {modo === 'esqueci' && 'Esqueci minha senha'}
            {modo === 'redefinir' && 'Redefinir senha'}
          </span>
          <p className="modal-sub">
            {modo === 'login' && 'Use o e-mail cadastrado para acessar'}
            {modo === 'esqueci' && 'Informe seu e-mail para receber o código'}
            {modo === 'redefinir' && 'Digite o código e a nova senha'}
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
              fontWeight: '600',
            }}
          >
            ⚠️ {erro}
          </div>
        )}

        {sucesso && (
          <div
            style={{
              background: '#f0fdf4',
              color: '#15803d',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '14px',
              fontWeight: '600',
            }}
          >
            ✅ {sucesso}
          </div>
        )}

        {/* ========== LOGIN ========== */}
        {modo === 'login' && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                style={inputStyle}
                autoComplete="email"
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Senha</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="Sua senha"
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#64748b',
                  }}
                  title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '18px' }}>
              <button
                type="button"
                onClick={() => {
                  setErro('');
                  setSucesso('');
                  setModo('esqueci');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0077C8',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0077C8',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="btn-fechar"
              style={{ marginTop: '12px' }}
            >
              Fechar
            </button>
          </form>
        )}

        {/* ========== ESQUECI SENHA ========== */}
        {modo === 'esqueci' && (
          <form onSubmit={handleSolicitarCodigo}>
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0077C8',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: loading ? 'wait' : 'pointer',
                marginBottom: '12px',
              }}
            >
              {loading ? 'Enviando...' : 'Enviar código'}
            </button>

            <button
              type="button"
              onClick={() => {
                setErro('');
                setSucesso('');
                setModo('login');
              }}
              className="btn-fechar"
              style={{ marginBottom: '8px' }}
            >
              Voltar ao login
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="btn-fechar"
            >
              Fechar
            </button>
          </form>
        )}

        {/* ========== REDEFINIR SENHA ========== */}
        {modo === 'redefinir' && (
          <form onSubmit={handleRedefinirSenha}>
            {codigoDev && (
              <div
                style={{
                  background: '#fffbeb',
                  border: '1px solid #fbbf24',
                  color: '#92400e',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  marginBottom: '14px',
                }}
              >
                <strong>Modo desenvolvimento:</strong> seu código é{' '}
                <strong style={{ letterSpacing: '2px' }}>{codigoDev}</strong>
              </div>
            )}

            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Código recebido</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
                placeholder="000000"
                maxLength={6}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Nova senha</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={mostrarNovaSenha ? 'text' : 'password'}
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  required
                  minLength={8}
                  style={{ ...inputStyle, paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarNovaSenha(!mostrarNovaSenha)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#64748b',
                  }}
                >
                  {mostrarNovaSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Confirmar nova senha</label>
              <input
                type="password"
                value={confirmarNovaSenha}
                onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                required
                minLength={8}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#0077C8',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '15px',
                cursor: loading ? 'wait' : 'pointer',
                marginBottom: '12px',
              }}
            >
              {loading ? 'Salvando...' : 'Redefinir senha'}
            </button>

            <button
              type="button"
              onClick={() => {
                setErro('');
                setSucesso('');
                setModo('login');
              }}
              className="btn-fechar"
              style={{ marginBottom: '8px' }}
            >
              Voltar ao login
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="btn-fechar"
            >
              Fechar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}