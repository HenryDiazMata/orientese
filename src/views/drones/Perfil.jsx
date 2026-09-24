// ==========================================
// ARCHIVO: src/views/drones/Perfil.jsx
// ANTES: MeuPerfil.jsx
// LABEL EN PANTALLA: MEU PERFIL
// PUBLICAR VAGA / USADO SOLO AQUI (GATED)
// SIN REACT-ROUTER
// ==========================================

import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/drones/AuthContext';
import { useTheme } from '../../context/drones/ThemeContext';

import CadastroPiloto from '../../components/drones/formularios/CadastroPiloto';
import CadastroUsuario from '../../components/drones/formularios/CadastroUsuario';
import CadastroAuxiliar from '../../components/drones/formularios/CadastroAuxiliar';
import CadastroManutencao from '../../components/drones/formularios/CadastroManutencao';
import CadastroConserto from '../../components/drones/formularios/CadastroConserto';
import CadastroProfissionais from '../../components/drones/formularios/CadastroProfissionais';

// ==========================================
// CLAVES LOCALSTORAGE
// ==========================================
const LS_USER = 'drones.user';
const LS_FATURA = 'drones.fatura';
const LS_CUPOS = 'drones.cupos';
const LS_SSO = 'orientese.sso';

function leerJSON(clave, fallback) {
  try {
    const bruto = localStorage.getItem(clave);
    return bruto ? JSON.parse(bruto) : fallback;
  } catch (e) {
    return fallback;
  }
}

function guardarJSON(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function btnSec(isDark) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    padding: '10px 18px',
    backgroundColor: isDark ? '#334155' : '#e2e8f0',
    color: isDark ? '#f8fafc' : '#475569',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  };
}

function Section({ title, children, textMain }) {
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

export default function Perfil({ setCurrentView }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [editando, setEditando] = useState(false);
  const [avisoCta, setAvisoCta] = useState('');

  const dronesUser = leerJSON(LS_USER, {});
  const cupos = leerJSON(LS_CUPOS, {});
  const fatura = leerJSON(LS_FATURA, {});
  const sso = leerJSON(LS_SSO, {});

  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  // ==========================================
  // DATOS UNIDOS: SSO + DRONES.USER + AUTH
  // ==========================================
  const tipo = dronesUser.tipo || (user && user.tipo) || '';
  const tipos = dronesUser.tipos || (tipo ? [tipo] : []);
  const grupo = dronesUser.grupo || '';
  const plano = dronesUser.plano || 'visitante';
  const validade = dronesUser.validade || '';
  const paisConta = dronesUser.paisConta || sso.paisConta || (user && (user.pais || user.paisConta)) || 'BR';
  const fuso = dronesUser.fuso || 'America/Sao_Paulo';
  const horasVoo = Number(dronesUser.horasVoo || (user && user.horasVoo) || 0);
  const selo = dronesUser.selo || '';
  const planoPago = plano === 'plus' || plano === 'pro' || plano === 'elite';

  const podeVaga =
    (grupo === 'A' || grupo === 'C') &&
    planoPago &&
    Number(cupos.vagasSemana || 0) > Number(cupos.vagasUsadasSemana || 0);

  const podeUsado =
    planoPago && Number(cupos.usadosSemana || 0) > Number(cupos.usadosUsadosSemana || 0);

  const FormTipo = useMemo(() => {
    const mapa = {
      piloto: CadastroPiloto,
      usuario: CadastroUsuario,
      auxiliar: CadastroAuxiliar,
      manutencao: CadastroManutencao,
      conserto: CadastroConserto,
      profissional: CadastroProfissionais,
    };
    return mapa[tipo] || null;
  }, [tipo]);

  if (!user) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Você precisa estar logado para ver esta página.</p>
      </div>
    );
  }

  // ==========================================
  // GUARDAR EDICION DEL FORM DEL TIPO REAL
  // SI PILOTO PASA DE 400 H → SELO PILOTO AVANÇADO
  // ==========================================
  const handleSalvarEdicao = (dadosAtualizados) => {
    const horas = Number((dadosAtualizados && (dadosAtualizados.horasVoo || dadosAtualizados.horas)) || horasVoo || 0);
    const next = {
      ...dronesUser,
      form: dadosAtualizados || {},
      horasVoo: horas,
      atualizadoEm: new Date().toISOString(),
    };
    if (tipo === 'piloto') {
      next.selo = horas >= 400 ? 'Piloto avançado' : 'Em formação';
    }
    guardarJSON(LS_USER, next);
    setEditando(false);
    setAvisoCta('');
  };

  // ==========================================
  // PANTALLA EDITAR: SOLO EL FORM DEL TIPO DEL USER
  // ==========================================
  if (editando) {
    if (!FormTipo) {
      return (
        <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ color: textMuted }}>
            Sem tipo de cadastro. Conclua o cadastro para editar o perfil.
          </p>
          <button type="button" onClick={() => setCurrentView && setCurrentView('CADASTRO')} style={btnSec(isDark)}>
            Ir para cadastro
          </button>
        </div>
      );
    }

    const Form = FormTipo;
    const propsForm =
      tipo === 'piloto'
        ? { pilotoParaEditar: { ...(user || {}), ...(dronesUser.form || {}), horasVoo }, onSalvar: handleSalvarEdicao }
        : { onSalvar: handleSalvarEdicao, onCancelar: () => setEditando(false) };

    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <button type="button" onClick={() => setEditando(false)} style={btnSec(isDark)}>
          ← Voltar ao perfil
        </button>
        <Form {...propsForm} />
      </div>
    );
  }

  const endereco = (dronesUser.form && dronesUser.form.endereco) || user.endereco || {};

  function clicarVaga() {
    if (podeVaga) {
      setAvisoCta('Cupo de vaga disponível. CadastroVagas ainda não está ligado neste fio (só pelo Perfil quando autorizado).');
      return;
    }
    setAvisoCta('Criar vaga só para Grupo A ou parceiro C com plano e cupo da semana. Faça upgrade no cadastro.');
  }

  function clicarUsado() {
    if (podeUsado) {
      setAvisoCta('Cupo de usado disponível. Publicar usado não abre o mural. Fluxo de anúncio ainda não ligado neste fio.');
      return;
    }
    setAvisoCta('Anunciar equipamento usado exige plano pago e cupo da semana. Faça upgrade no cadastro.');
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* ==========================================
          CABECERA
          ========================================== */}
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
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: textMain }}>Meu perfil</h1>
          <p style={{ margin: '6px 0 0 0', color: textMuted, fontSize: '14px' }}>
            {user.codigoRegistro && (
              <span>
                Código: <strong style={{ color: '#0077C8' }}>{user.codigoRegistro}</strong>
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
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

      {/* ==========================================
          CTAS GATED
          ========================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '16px',
        }}
      >
        <button
          type="button"
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
          Editar perfil
        </button>

        <button
          type="button"
          onClick={clicarVaga}
          style={{
            padding: '14px 18px',
            backgroundColor: isDark ? '#334155' : '#f1f5f9',
            color: textMain,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
            opacity: podeVaga ? 1 : 0.7,
          }}
        >
          Criar vaga
        </button>

        <button
          type="button"
          onClick={clicarUsado}
          style={{
            padding: '14px 18px',
            backgroundColor: isDark ? '#334155' : '#f1f5f9',
            color: textMain,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            fontSize: '14px',
            opacity: podeUsado ? 1 : 0.7,
          }}
        >
          Anunciar equipamento usado
        </button>
      </div>

      {avisoCta ? (
        <p style={{ color: textMuted, fontSize: '13px', marginBottom: '20px' }}>{avisoCta}</p>
      ) : null}

      {/* ==========================================
          FICHA: TIPO, PLANO, PAIS, HORAS, CUPOS, FATURA
          ========================================== */}
      <div
        style={{
          backgroundColor: bgCard,
          border: `1px solid ${borderColor}`,
          borderRadius: '14px',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {(user.fotoUrl || user.fotoPreview || (dronesUser.form && dronesUser.form.fotoUrl)) && (
            <img
              src={user.fotoUrl || user.fotoPreview || dronesUser.form.fotoUrl}
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
              {user.nomeCompleto || user.nome || sso.nome || 'Usuário'}
            </h2>
            <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>{user.email || sso.email}</p>
          </div>
        </div>

        <Section title="Conta" textMain={textMain}>
          <p style={{ margin: 0, color: textMuted, fontSize: '14px', lineHeight: 1.7 }}>
            Tipo(s): <strong style={{ color: textMain }}>{tipos.join(', ') || '—'}</strong>
            <br />
            Grupo: <strong style={{ color: textMain }}>{grupo || '—'}</strong>
            <br />
            Plano: <strong style={{ color: textMain }}>{plano}</strong>
            <br />
            Validade: <strong style={{ color: textMain }}>{validade || '—'}</strong>
            <br />
            País da conta: <strong style={{ color: textMain }}>{paisConta}</strong>
            <br />
            Fuso (simulador): <strong style={{ color: textMain }}>{fuso}</strong>
          </p>
        </Section>

        <Section title="Horas e selo" textMain={textMain}>
          <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>
            Horas de voo: <strong style={{ color: textMain }}>{horasVoo}</strong>
            <br />
            Selo: <strong style={{ color: textMain }}>{selo || (tipo === 'piloto' && horasVoo < 400 ? 'Em formação' : '—')}</strong>
          </p>
        </Section>

        <Section title="Cupos" textMain={textMain}>
          <p style={{ margin: 0, color: textMuted, fontSize: '14px', lineHeight: 1.7 }}>
            Vagas da semana: {cupos.vagasUsadasSemana || 0} / {cupos.vagasSemana || 0}
            <br />
            Usados da semana: {cupos.usadosUsadosSemana || 0} / {cupos.usadosSemana || 0}
            <br />
            Simulador do dia: {cupos.simuladorUsadoDia || 0} / {cupos.simuladorDia || 2}
            <br />
            Limite diário do simulador renova à 00:00 no seu fuso.
          </p>
        </Section>

        <Section title="Fatura" textMain={textMain}>
          <p style={{ margin: 0, color: textMuted, fontSize: '14px' }}>
            Emitir em nome de: {fatura.emitirEmNomeDe || '—'}
            <br />
            Tax ID: {fatura.taxId || '—'}
          </p>
        </Section>

        <Section title="Endereço" textMain={textMain}>
          <p style={{ margin: 0, color: textMuted, fontSize: '14px', lineHeight: 1.6 }}>
            {endereco.logradouro && `${endereco.logradouro}${endereco.numero ? `, ${endereco.numero}` : ''}`}
            {endereco.bairro && ` — ${endereco.bairro}`}
            <br />
            {endereco.cidade && `${endereco.cidade} - ${endereco.estado || ''}`}
            {endereco.cep && ` | CEP: ${endereco.cep}`}
          </p>
        </Section>
      </div>
    </div>
  );
}