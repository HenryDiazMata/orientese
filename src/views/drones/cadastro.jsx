// ==========================================
// CADASTRO.JSX
// CARDS + TIEMPO APROXIMADO
// PROFISSIONAIS NO CIERRA AL ENVIAR (EL FORM MUESTRA EXITO)
// ==========================================

import React, { useState } from 'react';
import { useTheme } from "../../context/drones/ThemeContext";

import {
  UserPlus,
  Plane,
  Users,
  Wrench,
  Settings,
  Megaphone,
  ArrowRight,
  ArrowLeft,
  Briefcase,
} from 'lucide-react';
import CadastroPiloto from "../../components/drones/formularios/CadastroPiloto";
import CadastroUsuario from "../../components/drones/formularios/CadastroUsuario";
import CadastroManutencao from "../../components/drones/formularios/CadastroManutencao";
import CadastroConserto from "../../components/drones/formularios/CadastroConserto";
import CadastroAuxiliar from "../../components/drones/formularios/CadastroAuxiliar";
import CadastroProfissionais from "../../components/drones/formularios/CadastroProfissionais";
import CadastroVagas from "../../components/drones/formularios/CadastroVagas";

export default function Cadastro() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formularioAtivo, setFormularioAtivo] = useState(null);

  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  const BotaoVoltar = () => (
    <button
      type="button"
      onClick={() => setFormularioAtivo(null)}
      style={{
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
        fontSize: '14px'
      }}
    >
      <ArrowLeft size={18} />
      Voltar para Área de Cadastros
    </button>
  );

  if (formularioAtivo === 'piloto') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <BotaoVoltar />
        <CadastroPiloto onSalvar={() => setFormularioAtivo(null)} />
      </div>
    );
  }

  if (formularioAtivo === 'usuario') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <BotaoVoltar />
        <CadastroUsuario onSalvar={() => setFormularioAtivo(null)} />
      </div>
    );
  }

  if (formularioAtivo === 'auxiliar') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <BotaoVoltar />
        <CadastroAuxiliar
          onSalvar={() => setFormularioAtivo(null)}
          onCancelar={() => setFormularioAtivo(null)}
        />
      </div>
    );
  }

  if (formularioAtivo === 'manutencao') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <BotaoVoltar />
        <CadastroManutencao
          onSalvar={() => setFormularioAtivo(null)}
          onCancelar={() => setFormularioAtivo(null)}
        />
      </div>
    );
  }

  if (formularioAtivo === 'conserto') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <BotaoVoltar />
        <CadastroConserto
          onSalvar={() => setFormularioAtivo(null)}
          onCancelar={() => setFormularioAtivo(null)}
        />
      </div>
    );
  }

  if (formularioAtivo === 'profissional') {
    return (
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <BotaoVoltar />
        <CadastroProfissionais
          onCancelar={() => setFormularioAtivo(null)}
        />
      </div>
    );
  }

  const opcoesCadastro = [
    {
      id: 'usuarios',
      titulo: 'Usuários / Contratantes',
      descricao: 'Fazendeiros, engenheiros, construtoras, ganadeiros e demais contratantes de serviços.',
      tempo: 'Tempo aproximado: 6 a 8 minutos.',
      aviso: 'Formulário completo. Reserve um momento calmo.',
      icon: <UserPlus size={28} color="#0077C8" />,
      status: 'Disponível',
      formKey: 'usuario'
    },
    {
      id: 'pilotos',
      titulo: 'Pilotos de Drones',
      descricao: 'Cadastro de pilotos profissionais (iniciantes e experientes) para operações aéreas.',
      tempo: 'Tempo aproximado: 8 a 10 minutos.',
      aviso: 'Formulário completo. Reserve um momento calmo.',
      icon: <Plane size={28} color="#0077C8" />,
      status: 'Disponível',
      formKey: 'piloto'
    },
    {
      id: 'auxiliares',
      titulo: 'Auxiliares de Campo',
      descricao: 'Profissionais de apoio em solo (observador visual, logística, baterias, etc.).',
      tempo: 'Tempo aproximado: 6 a 8 minutos.',
      aviso: 'Formulário completo. Reserve um momento calmo.',
      icon: <Users size={28} color="#0077C8" />,
      status: 'Disponível',
      formKey: 'auxiliar'
    },
    {
      id: 'manutencao',
      titulo: 'Manutenção',
      descricao: 'Técnicos especializados em manutenção preventiva e corretiva de drones.',
      tempo: 'Tempo aproximado: 8 a 10 minutos.',
      aviso: 'Formulário completo. Reserve um momento calmo.',
      icon: <Wrench size={28} color="#0077C8" />,
      status: 'Disponível',
      formKey: 'manutencao'
    },
    {
      id: 'consertos',
      titulo: 'Consertos (Oficinas-profissionais)',
      descricao: 'Oficinas e profissionais que realizam reparos e consertos de equipamentos.',
      tempo: 'Tempo aproximado: 8 a 12 minutos.',
      aviso: 'Formulário completo. Reserve um momento calmo.',
      icon: <Settings size={28} color="#0077C8" />,
      status: 'Disponível',
      formKey: 'conserto'
    },
    {
      id: 'profissionais',
      titulo: 'Profissionais',
      descricao: 'Profissionais, técnicos, empregados e operários afins do setor.',
      tempo: 'Tempo aproximado: 8 a 12 minutos.',
      aviso: 'Formulário completo. Reserve um momento calmo. Dados pessoais só são vistos por quem for contratar.',
      icon: <Briefcase size={28} color="#0077C8" />,
      status: 'Disponível',
      formKey: 'profissional'
    },
    {
      id: 'vagas',
      titulo: 'Vagas',
      descricao: 'Busca de pessoal.',
      tempo: 'Tempo aproximado: a definir.',
      aviso: 'Em breve.',
      icon: <Megaphone size={28} color="#0077C8" />,
      status: 'Em breve'
    },
    {
      id: 'anunciantes',
      titulo: 'Anunciantes / Patrocinadores',
      descricao: 'Empresas que desejam anunciar no portal.',
      tempo: 'Tempo aproximado: a definir.',
      aviso: 'Em breve.',
      icon: <Megaphone size={28} color="#0077C8" />,
      status: 'Em breve'
    },
    {
      id: 'drones',
      titulo: 'Drones (Partes / acessórios)',
      descricao: 'Ofertas de drones e acessórios.',
      tempo: 'Tempo aproximado: a definir.',
      aviso: 'Em breve.',
      icon: <Megaphone size={28} color="#0077C8" />,
      status: 'Em breve'
    },
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: '800', color: textMain }}>
          Área de Cadastros
        </h1>
        <p style={{ margin: 0, fontSize: '16px', color: textMuted }}>
          Escolha o tipo de cadastro. O formulário abre nesta mesma página.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {opcoesCadastro.map((opcao) => (
          <div
            key={opcao.id}
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ marginBottom: '16px' }}>{opcao.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: textMain }}>
                {opcao.titulo}
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: textMuted }}>
                {opcao.descricao}
              </p>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: '700', color: textMain }}>
                {opcao.tempo}
              </p>
              <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: textMuted }}>
                {opcao.aviso}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: opcao.status === 'Disponível' ? '#dcfce7' : (isDark ? '#334155' : '#f1f5f9'),
                color: opcao.status === 'Disponível' ? '#15803d' : textMuted
              }}>
                {opcao.status}
              </span>
              {opcao.status === 'Disponível' && (
                <button
                  type="button"
                  onClick={() => setFormularioAtivo(opcao.formKey)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0077C8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cadastrar <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}