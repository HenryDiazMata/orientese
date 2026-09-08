import { useState } from 'react';
import './CadastroForm.css';

export default function CadastroVaga({ onCancel }) {
  const [vaga, setVaga] = useState({
    titulo: '',
    empresa: '',
    tipoContrato: 'Safra / Temporário',
    descricao: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Vaga "${vaga.titulo}" publicada com sucesso!`);
    if (onCancel) onCancel();
  };

  return (
    <div className="cadastro-container formulario-card">
      <div className="cadastro-header">
        <h2>Publicar oportunidade / vaga</h2>
        <p>Informe os dados essenciais da vaga.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Dados da vaga</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Título da vaga *</label>
              <input
                type="text"
                placeholder="Ex: Piloto de Pulverização"
                value={vaga.titulo}
                onChange={(e) => setVaga({ ...vaga, titulo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Empresa ou fazenda *</label>
              <input
                type="text"
                placeholder="Nome da empresa"
                value={vaga.empresa}
                onChange={(e) => setVaga({ ...vaga, empresa: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Tipo de contrato</label>
              <select
                value={vaga.tipoContrato}
                onChange={(e) => setVaga({ ...vaga, tipoContrato: e.target.value })}
              >
                <option value="Safra / Temporário">Safra / Temporário</option>
                <option value="Prestação de Serviço (PJ)">Prestação de Serviço (PJ)</option>
                <option value="CLT">CLT</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Descrição</label>
              <textarea
                placeholder="Atividades e requisitos..."
                value={vaga.descricao}
                onChange={(e) => setVaga({ ...vaga, descricao: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-salvar">Publicar vaga</button>
          <button type="button" className="btn-cancelar" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}