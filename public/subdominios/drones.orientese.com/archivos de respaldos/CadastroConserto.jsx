import React, { useState } from 'react';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const OPCOES_ESPECIALIDADES = [
  'Troca de Braço / Estrutura Quebrada',
  'Reparo / Troca de Gimbal e Câmera',
  'Troca de Motores / ESCs',
  'Recuperação após Queda / Colisão',
  'Reparo por Danos por Água / Umidade',
  'Troca de Shell / Carcaça',
  'Calibração e Atualização de Firmware',
  'Troca de Placa Principal / Sensores'
];

export default function CadastroConserto({ onVoltar }) {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    responsavelTecnico: '',
    whatsapp: '',
    estado: 'SP',
    cidade: '',
    marcasAtendidas: '',
    tempoMedioConserto: '24h a 48h',
    garantiaDias: '90 dias',
    
    // Beneficios y Diferenciales
    oficinaAutorizada: false,
    orcamentoGratuito: true,
    atendimentoPresencial: true,
    temPecasEstoque: false,
    atendeEnvioCorreios: true,
    servicoColetaLocal: false,

    especialidades: []
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEspecialidadeChange = (opcao) => {
    setFormData(prev => {
      const existe = prev.especialidades.includes(opcao);
      if (existe) {
        return { ...prev, especialidades: prev.especialidades.filter(item => item !== opcao) };
      } else {
        return { ...prev, especialidades: [...prev.especialidades, opcao] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Cadastro de Conserto:', formData);
    setEnviado(true);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#111827',
    fontSize: '14px',
    outline: 'none',
    marginTop: '4px',
    boxSizing: 'border-box'
  };

  if (enviado) {
    return (
      <div style={{
        padding: '30px',
        backgroundColor: '#f0fdf4',
        border: '1px solid #86efac',
        borderRadius: '10px',
        textAlign: 'center',
        margin: '20px 0',
        color: '#166534'
      }}>
        <h2>✅ Perfil de Consertos Cadastrado com Sucesso!</h2>
        <p>Seu serviço de reparo já está visível para os clientes com todos os diferenciais cadastrados.</p>
        <button
          onClick={onVoltar}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#166534',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ⬅️ Voltar para a lista de consertos
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid #4b5563',
      borderRadius: '10px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '20px' }}>🛠️ Cadastrar Oficina / Técnico de Conserto</h3>
        {onVoltar && (
          <button
            onClick={onVoltar}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✖️ Cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Nome da Oficina / Empresa *</label>
            <input
              type="text"
              name="nomeEmpresa"
              required
              placeholder="Ex: UTI dos Drones - Consertos Rápidos"
              value={formData.nomeEmpresa}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Responsável Técnico *</label>
            <input
              type="text"
              name="responsavelTecnico"
              required
              placeholder="Ex: Marcos Vinícius"
              value={formData.responsavelTecnico}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>WhatsApp de Atendimento *</label>
            <input
              type="text"
              name="whatsapp"
              required
              placeholder="Ex: 11999998888 (Apenas números)"
              value={formData.whatsapp}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Estado (UF) *</label>
            <select name="estado" value={formData.estado} onChange={handleChange} style={inputStyle}>
              {ESTADOS_BRASIL.map(uf => (
                <option key={uf} value={uf} style={{ color: '#111827' }}>{uf}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Cidade *</label>
            <input
              type="text"
              name="cidade"
              required
              placeholder="Ex: São Paulo"
              value={formData.cidade}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Prazo Médio de Entrega</label>
            <select name="tempoMedioConserto" value={formData.tempoMedioConserto} onChange={handleChange} style={inputStyle}>
              <option value="No mesmo dia" style={{ color: '#111827' }}>⚡ No mesmo dia (Express)</option>
              <option value="24h a 48h" style={{ color: '#111827' }}>⏱️ 24h a 48h</option>
              <option value="3 a 5 dias" style={{ color: '#111827' }}>📅 3 a 5 dias úteis</option>
              <option value="Sob consulta" style={{ color: '#111827' }}>🔍 Sob consulta / Orçamento</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Garantia do Serviço</label>
            <select name="garantiaDias" value={formData.garantiaDias} onChange={handleChange} style={inputStyle}>
              <option value="30 dias" style={{ color: '#111827' }}>🛡️ 30 dias</option>
              <option value="90 dias" style={{ color: '#111827' }}>🛡️ 90 dias (Padrão)</option>
              <option value="180 dias" style={{ color: '#111827' }}>🛡️ 6 Meses</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Modelos e Marcas Atendidas *</label>
          <input
            type="text"
            name="marcasAtendidas"
            required
            placeholder="Ex: Linha DJI Mavic, Mini, Air, Phantom, Autel..."
            value={formData.marcasAtendidas}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* ESPECIALIDADES / TIPOS DE CONSERTO */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
            Serviços e Tipos de Conserto Realizados:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
            {OPCOES_ESPECIALIDADES.map(opcao => (
              <label key={opcao} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.especialidades.includes(opcao)}
                  onChange={() => handleEspecialidadeChange(opcao)}
                />
                {opcao}
              </label>
            ))}
          </div>
        </div>

        {/* DIFERENCIAIS E LOGÍSTICA */}
        <div style={{ marginBottom: '20px', paddingTop: '15px', borderTop: '1px dashed #6b7280' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
            Diferenciais e Facilidades do Atendimento:
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="orcamentoGratuito" checked={formData.orcamentoGratuito} onChange={handleChange} />
              💰 Orçamento 100% Gratuito (Sem taxa de avaliação)
            </label>

            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="oficinaAutorizada" checked={formData.oficinaAutorizada} onChange={handleChange} />
              🏅 Oficina Autorizada / Credenciada
            </label>

            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="temPecasEstoque" checked={formData.temPecasEstoque} onChange={handleChange} />
              ⚡ Peças de reposição em estoque (Pronta Entrega)
            </label>

            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="atendeEnvioCorreios" checked={formData.atendeEnvioCorreios} onChange={handleChange} />
              📦 Aceita envio por Correios / Sedex / Transportadora
            </label>

            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="atendimentoPresencial" checked={formData.atendimentoPresencial} onChange={handleChange} />
              🏢 Atendimento Presencial / Balcão
            </label>

            <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="servicoColetaLocal" checked={formData.servicoColetaLocal} onChange={handleChange} />
              🛵 Serviço de Coleta / Motoboy Local
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          💾 Salvar e Publicar Serviços de Conserto
        </button>
      </form>
    </div>
  );
}