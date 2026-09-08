import React, { useState } from 'react';

export const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const ESPECIALIDADES_TECNICAS = [
  'Reparo Eletrônico / Placas',
  'Troca de Peças e Motores',
  'Manutenção Preventiva',
  'Calibração de Gimbal / Câmera',
  'Atualização de Firmware e Software',
  'Manutenção em Drones Agrícolas'
];

export default function CadastroManutencao({ onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    responsavelTecnico: '',
    email: '',
    whatsapp: '',
    estado: 'SP',
    cidade: '',
    enderecoAtendimento: '',
    especialidades: [],
    marcasAtendidas: '',
    isAutorizada: false,
    detalhesAutorizada: '',
    ofereceOrcamentoGratis: false,
    atendeEnvioCorreios: true
  });

  const handleWhatsappChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    setFormData(prev => ({ ...prev, whatsapp: value }));
  };

  const handleCheckboxChange = (especialidade) => {
    setFormData(prev => {
      const existe = prev.especialidades.includes(especialidade);
      return {
        ...prev,
        especialidades: existe
          ? prev.especialidades.filter(e => e !== especialidade)
          : [...prev.especialidades, especialidade]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.especialidades.length === 0) {
      alert('Selecione ao menos um serviço realizado.');
      return;
    }
    
    const novaOficina = {
      ...formData,
      id: Date.now(),
      whatsapp: formData.whatsapp.replace(/\D/g, ''),
      avaliacao: 5.0,
      avaliacoesQtd: 1,
      distanciaKm: Math.floor(Math.random() * 50) + 1
    };

    if (onSalvar) onSalvar(novaOficina);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    fontSize: '14px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: '13px',
    display: 'block',
    marginBottom: '5px',
    color: '#374151'
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '25px',
      maxWidth: '800px',
      margin: '0 auto 30px auto',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      color: '#1f2937'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '2px solid #059669', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0, color: '#111827' }}>🛠️ Cadastro de Técnico / Assistência Técnica</h3>
        {onCancelar && (
          <button 
            type="button" 
            onClick={onCancelar}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✖️ Cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        <div>
          <label style={labelStyle}>
            Nome da Oficina / Nome do Técnico *
          </label>
          <input
            type="text"
            required
            placeholder="Ex: DroneFix Assistência Técnica ou Roberto Silva"
            value={formData.nomeEmpresa}
            onChange={(e) => setFormData({...formData, nomeEmpresa: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
          <div>
            <label style={labelStyle}>
              Responsável Técnico *
            </label>
            <input
              type="text"
              required
              placeholder="Nome do responsável"
              value={formData.responsavelTecnico}
              onChange={(e) => setFormData({...formData, responsavelTecnico: e.target.value})}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              WhatsApp para Contato *
            </label>
            <input
              type="text"
              required
              placeholder="(11) 99999-9999"
              value={formData.whatsapp}
              onChange={handleWhatsappChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
          <div>
            <label style={labelStyle}>
              Estado (UF) *
            </label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({...formData, estado: e.target.value})}
              style={inputStyle}
            >
              {ESTADOS_BRASIL.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              Cidade *
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Campinas"
              value={formData.cidade}
              onChange={(e) => setFormData({...formData, cidade: e.target.value})}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>
            Marcas Atendidas / Especialidades de Fabricante
          </label>
          <input
            type="text"
            placeholder="Ex: DJI, Autel, Fimi, Drones Agrícolas (XAG/DJI Agras), Customizados..."
            value={formData.marcasAtendidas}
            onChange={(e) => setFormData({...formData, marcasAtendidas: e.target.value})}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Serviços Realizados *:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
            {ESPECIALIDADES_TECNICAS.map(esp => (
              <label key={esp} style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.especialidades.includes(esp)}
                  onChange={() => handleCheckboxChange(esp)}
                  style={{ accentColor: '#059669' }}
                />
                {esp}
              </label>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '15px', marginTop: '10px' }}>
          <label style={labelStyle}>
            ⭐ Diferenciais e Selos do Perfil:
          </label>

          <div style={{ display: 'grid', gap: '10px' }}>
            <label style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={formData.isAutorizada}
                onChange={(e) => setFormData({...formData, isAutorizada: e.target.checked})}
                style={{ accentColor: '#2563eb' }}
              />
              🛡️ É Oficina Autorizada / Possui Certificação de fabricante?
            </label>

            {formData.isAutorizada && (
              <input
                type="text"
                placeholder="Ex: Centro Autorizado DJI / Certificação XAG"
                value={formData.detalhesAutorizada}
                onChange={(e) => setFormData({...formData, detalhesAutorizada: e.target.value})}
                style={{ ...inputStyle, width: 'calc(100% - 24px)', marginLeft: '24px', fontSize: '12px' }}
              />
            )}

            <label style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.atendeEnvioCorreios}
                onChange={(e) => setFormData({...formData, atendeEnvioCorreios: e.target.checked})}
                style={{ accentColor: '#2563eb' }}
              />
              📦 Aceita recebimento de drones via Correios / Transportadora
            </label>

            <label style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.ofereceOrcamentoGratis}
                onChange={(e) => setFormData({...formData, ofereceOrcamentoGratis: e.target.checked})}
                style={{ accentColor: '#2563eb' }}
              />
              🏷️ Oferece Orçamento Gratuito aos clientes
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: '#059669',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          💾 Finalizar Cadastro de Manutenção
        </button>

      </form>
    </div>
  );
}