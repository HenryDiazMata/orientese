import React, { useState, useMemo } from 'react';

const PROFISSIONAIS_MOCK = [
  {
    id: 1,
    nome: 'Carlos Silva',
    categoria: 'PILOTO',
    especialidade: 'MAPEAMENTO AGRÍCOLA',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    whatsapp: '16999991111'
  },
  {
    id: 2,
    nome: 'Juliana Costa',
    categoria: 'AUXILIAR',
    especialidade: 'OBSERVADORA DE ESPAÇO AÉREO',
    cidade: 'Sorocaba',
    estado: 'SP',
    whatsapp: '15999992222'
  },
  {
    id: 3,
    nome: 'Marcos Lima',
    categoria: 'CONSERTOS',
    especialidade: 'MANUTENÇÃO PREVENTIVA E CALIBRAÇÃO',
    cidade: 'Campinas',
    estado: 'SP',
    whatsapp: '19999993333'
  },
  {
    id: 4,
    nome: 'Dra. Patricia Mendes',
    categoria: 'ADVOGADA',
    especialidade: 'REGULARIZAÇÃO ANATEL, ANAC E DECEA',
    cidade: 'São Paulo',
    estado: 'SP',
    whatsapp: '11999994444'
  },
  {
    id: 5,
    nome: 'Eng. Ricardo Rocha',
    categoria: 'ENGENHEIRO',
    especialidade: 'INSPEÇÃO TÉCNICA E AEROFOTOGRAMETRIA',
    cidade: 'Curitiba',
    estado: 'PR',
    whatsapp: '41999995555'
  }
];

export default function ProfissionaisView() {
  const [filtroTexto, setFiltroTexto] = useState('');

  const profissionaisFiltrados = useMemo(() => {
    if (!filtroTexto.trim()) return PROFISSIONAIS_MOCK;

    const termo = filtroTexto.toLowerCase();
    return PROFISSIONAIS_MOCK.filter((prof) => {
      const coincideNome = prof.nome.toLowerCase().includes(termo);
      const coincideEspecialidade = prof.especialidade.toLowerCase().includes(termo);
      const coincideCategoria = prof.categoria.toLowerCase().includes(termo);
      const coincideCidade = prof.cidade.toLowerCase().includes(termo);
      const coincideEstado = prof.estado.toLowerCase().includes(termo);

      return (
        coincideNome ||
        coincideEspecialidade ||
        coincideCategoria ||
        coincideCidade ||
        coincideEstado
      );
    });
  }, [filtroTexto]);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 15px' }}>
      
      {/* Contenedor Principal Blanco */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          padding: '30px'
        }}
      >
        {/* Encabezado */}
        <div style={{ marginBottom: '25px' }}>
          <h2
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '800',
              color: '#111827'
            }}
          >
            Diretório de Profissionais Cadastrados
          </h2>
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: '14px',
              color: '#6b7280'
            }}
          >
            Encontre advogados, arquitetos, engenheiros, consultores, obreiros especializados próximos a você.
          </p>
        </div>

        {/* Campo de Búsqueda */}
        <div style={{ marginBottom: '25px' }}>
          <input
            type="text"
            placeholder="Digite um nome ou especialidade (ex: Agrícola)..."
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '14px',
              color: '#111827',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Tarjetas de Profesionales */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {profissionaisFiltrados.length > 0 ? (
            profissionaisFiltrados.map((prof) => (
              <div
                key={prof.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '18px 20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#111827'
                    }}
                  >
                    {prof.nome}
                  </h3>

                  <p
                    style={{
                      margin: '4px 0 6px 0',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#2563eb',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {prof.categoria} — {prof.especialidade}
                  </p>

                  <span
                    style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    📍 {prof.cidade} - {prof.estado}
                  </span>
                </div>

                <a
                  href={`https://wa.me/55${prof.whatsapp.replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(prof.nome)},%20encontrei%20seu%20perfil%20no%20Drones.Orientese.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '9px 24px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center'
                  }}
                >
                  Contatar
                </a>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 0', color: '#6b7280', fontSize: '14px' }}>
              Nenhum profissional encontrado para a busca especificada.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}