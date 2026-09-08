import { useState } from 'react';

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
    <div className="formulario-card">
      <h3>Publicar Oportunidade / Vaga</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Título da Vaga (ex: Piloto de Pulverização)" 
          value={vaga.titulo} 
          onChange={(e) => setVaga({...vaga, titulo: e.target.value})} 
          required 
        />
        <input 
          type="text" 
          placeholder="Nome da Empresa ou Fazenda" 
          value={vaga.empresa} 
          onChange={(e) => setVaga({...vaga, empresa: e.target.value})} 
          required 
        />
        <select 
          value={vaga.tipoContrato} 
          onChange={(e) => setVaga({...vaga, tipoContrato: e.target.value})}
        >
          <option value="Safra / Temporário">Safra / Temporário</option>
          <option value="Prestação de Serviço (PJ)">Prestação de Serviço (PJ)</option>
          <option value="CLT">CLT</option>
        </select>
        <textarea 
          placeholder="Descrição das atividades e requisitos..." 
          value={vaga.descricao} 
          onChange={(e) => setVaga({...vaga, descricao: e.target.value})} 
          rows={4}
        />

        <div className="acoes-form">
          <button type="submit" className="btn-salvar">Publicar Vaga</button>
          <button type="button" onClick={onCancel} className="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  );
}