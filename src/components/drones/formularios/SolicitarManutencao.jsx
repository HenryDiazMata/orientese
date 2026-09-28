// ==========================================
// SOLICITARMANUTENCAO.JSX
// PEDIDO DE MANTENIMIENTO (CLIENTE)
// NO ES CADASTRO DE TECNICO
// NO TOCAR CadastroManutencao.jsx
// UI CLARA — CadastroForm.css
// SIN PRECIOS — HUB INFORMATIVO
// ==========================================

import React, { useState } from 'react';
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const CATEGORIAS = [
  { value: 'Preventiva', label: 'Preventiva' },
  { value: 'Corretiva', label: 'Corretiva' },
  { value: 'Calibração', label: 'Calibração' },
];

const URGENCIAS = [
  { value: 'Baixa', label: 'Baixa' },
  { value: 'Media', label: 'Média' },
  { value: 'Alta', label: 'Alta' },
];

export default function SolicitarManutencao({ onSuccess, onCancelar }) {
  const [formData, setFormData] = useState({
    tipoPersona: 'fisica',
    cliente: '',
    titulo: '',
    categoria: 'Preventiva',
    equipamento: '',
    estado: 'SP',
    cidade: '',
    urgencia: 'Media',
    descricao: '',
    contatoWhatsApp: '',
  });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cliente.trim() || !formData.titulo.trim() || !formData.equipamento.trim()) {
      setErro('Preencha cliente, título do pedido e equipamento.');
      return;
    }
    if (!formData.cidade.trim() || !formData.contatoWhatsApp.trim()) {
      setErro('Preencha cidade e WhatsApp para receber orçamentos.');
      return;
    }
    setErro('');
    if (typeof onSuccess === 'function') {
      onSuccess({
        ...formData,
        tipoPersona: formData.tipoPersona === 'juridica' ? 'juridica' : 'fisica',
      });
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-header-nav">
        {typeof onCancelar === 'function' && (
          <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
            Voltar à lista
          </button>
        )}
      </div>

      <div className="cadastro-header">
        <h2>Solicitar manutenção</h2>
        <p>Descreva o equipamento e o problema. Técnicos da rede podem enviar orçamento pelo WhatsApp.</p>
      </div>

      <div className="aviso-box">
        <strong>Pedido do cliente</strong>
        <p>Isto não cadastra um técnico. O tipo de pessoa é de quem pede o serviço.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h3>Quem solicita</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Tipo de pessoa *</label>
              <select name="tipoPersona" value={formData.tipoPersona} onChange={handleChange} required>
                <option value="fisica">Pessoa física</option>
                <option value="juridica">Pessoa jurídica</option>
              </select>
            </div>
            <div className="form-group">
              <label>{formData.tipoPersona === 'juridica' ? 'Razão social / nome comercial *' : 'Nome do cliente *'}</label>
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>WhatsApp *</label>
              <input
                type="tel"
                name="contatoWhatsApp"
                value={formData.contatoWhatsApp}
                onChange={handleChange}
                placeholder="11999999999"
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>Pedido</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Título *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ex: Revisão preventiva Mavic 3"
                required
              />
            </div>
            <div className="form-group">
              <label>Categoria *</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange}>
                {CATEGORIAS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Urgência *</label>
              <select name="urgencia" value={formData.urgencia} onChange={handleChange}>
                {URGENCIAS.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Equipamento *</label>
              <input
                type="text"
                name="equipamento"
                value={formData.equipamento}
                onChange={handleChange}
                placeholder="Ex: DJI Mavic 3 Enterprise"
                required
              />
            </div>
            <div className="form-group">
              <label>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Estado (UF) *</label>
              <select name="estado" value={formData.estado} onChange={handleChange}>
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>Descrição do problema</label>
              <textarea
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="O que aconteceu, sintomas, se já caiu, água, etc."
              />
            </div>
          </div>
        </section>

        {erro && <p className="erro">{erro}</p>}

        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            Publicar solicitação
          </button>
          {typeof onCancelar === 'function' && (
            <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
