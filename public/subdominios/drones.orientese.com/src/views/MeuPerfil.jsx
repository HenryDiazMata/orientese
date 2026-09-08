// ==========================================
// MeuPerfil.jsx
// Página do perfil do usuário logado
// ==========================================

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import CadastroPiloto from '../components/formularios/CadastroPiloto';

export default function MeuPerfil({ setCurrentView }) {
  const { user, logout, updateUser } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [editando, setEditando] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Você precisa estar logado para ver esta página.</p>
      </div>
    );
  }

  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  const handleSalvarEdicao = (dadosAtualizados) => {
    updateUser(dadosAtualizados);
    setEditando(false);
  };

  if (editando && user.tipo === 'piloto') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <button
          onClick={() => setEditando(false)}
          style={{
            marginBottom: '20px',
            padding: '10px 18px',
            backgroundColor: isDark ? '#334155' : '#e2e8f0',
            color: isDark ? '#f8fafc' : '#475569',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          ← Voltar ao perfil
        </button>
        <CadastroPiloto
          pilotoParaEditar={user}
          onSalvar={handleSalvarEdicao}
        />
      </div>
    );
  }

  const endereco = user.endereco || {};

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Cabeçalho */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: textMain }}>
            MEU PERFIL
          </h1>
          <p style={{ margin: '6px 0 0 0', color: textMuted, fontSize: '14px' }}>
            {user.codigoRegistro && (
              <span>
                Código: <strong style={{ color: '#0077C8' }}>{user.codigoRegistro}</strong>
              </span>
            )}
            {user.tipo && (
              <span style={{ marginLeft: '12px' }}>
                Tipo: <strong>{user.tipo}</strong>
              </span>
            )}
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: '10px 16px',
            backgroundColor: isDark ? '#7f1d1d' : '#fef2f2',
            color: isDark ? '#fecaca' : '#dc2626',
            border: `1px solid ${isDark ? '#991b1b' : '#fecaca'}`,
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Sair da conta
        </button>
      </div>

      {/* Ações rápidas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '28px',
        }}
      >
        <button
          onClick={() => setEditando(true)}
          style={{
            padding: '14px 18px',
            backgroundColor: '#0077C8',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          ✏️ Editar perfil
        </button>

        <button
          onClick={() => setCurrentView && setCurrentView('VAGAS')}
          style={{
            padding: '14px 18px',
            backgroundColor: isDark ? '#334155' : '#f1f5f9',
            color: textMain,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          📋 Criar Vaga
        </button>

        <button
          onClick={() => setCurrentView && setCurrentView('DRONES')}
          style={{
            padding: '14px 18px',
            backgroundColor: isDark ? '#334155' : '#f1f5f9',
            color: textMain,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          🛸 Oferecer Oferta
        </button>
      </div>

      {/* Dados do perfil */}
      <div
        style={{
          backgroundColor: bgCard,
          border: `1px solid ${borderColor}`,
          borderRadius: '14px',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {(user.fotoUrl || user.fotoPreview) && (
            <img
              src={user.fotoUrl || user.fotoPreview}
              alt="Foto"
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'cover',
                borderRadius: '12px',
                border: `2px solid ${borderColor}`,
              }}
            />
          )}
          <div>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '20px', color: textMain }}>
              {user.nomeCompleto || user.nome || 'Usuário'}
            </h2>
            <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>
              {user.email}
            </p>
            {user.telefone1 && (
              <p style={{ margin: '4px 0 0 0', color: textMuted, fontSize: '14px' }}>
                📱 {user.telefone1}
              </p>
            )}
          </div>
        </div>

        <Section title="Endereço" textMain={textMain} textMuted={textMuted}>
          <p style={{ margin: 0, color: textMuted, fontSize: '14px', lineHeight: 1.6 }}>
            {endereco.logradouro && `${endereco.logradouro}${endereco.numero ? `, ${endereco.numero}` : ''}`}
            {endereco.bairro && ` — ${endereco.bairro}`}
            <br />
            {endereco.cidade && `${endereco.cidade} - ${endereco.estado || ''}`}
            {endereco.cep && ` | CEP: ${endereco.cep}`}
          </p>
        </Section>

        {user.servicos?.length > 0 && (
          <Section title="Serviços" textMain={textMain} textMuted={textMuted}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {user.servicos.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    backgroundColor: isDark ? '#0f172a' : '#e0f2fe',
                    color: isDark ? '#7dd3fc' : '#0369a1',
                    fontWeight: '600',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {user.portesDrone?.length > 0 && (
          <Section title="Portes de Drone" textMain={textMain} textMuted={textMuted}>
            <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>
              {user.portesDrone.join(' · ')}
            </p>
          </Section>
        )}

        {user.licencias && (
          <Section title="Licenças" textMain={textMain} textMuted={textMuted}>
            <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>{user.licencias}</p>
          </Section>
        )}

        {user.nivelExperiencias && (
          <Section title="Experiência" textMain={textMain} textMuted={textMuted}>
            <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>
              {user.nivelExperiencias === 'estagiario' && 'Estagiário / Principiante'}
              {user.nivelExperiencias === 'intermediario' && 'Intermediário'}
              {user.nivelExperiencias === 'avancado' && 'Avançado'}
            </p>
          </Section>
        )}

        {user.dataCadastro && (
          <Section title="Cadastro" textMain={textMain} textMuted={textMuted}>
            <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>
              Desde: {user.dataCadastro}
            </p>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children, textMain, textMuted }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontWeight: '700',
          color: textMain,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}