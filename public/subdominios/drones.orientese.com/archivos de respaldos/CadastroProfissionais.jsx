import { useState } from 'react';

export default function CadastroProfissionais({ onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    especialidade: 'Piloto de Drone',
    cidade: '',
    telefone: '',
    anacCrea: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Perfil de ${formData.nome} cadastrado com sucesso!`);
    if (onCancel) onCancel();
  };

  return (
    <div className="formulario-card">
      <h3>Cadastrar Novo Profissional</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome Completo" 
          value={formData.nome} 
          onChange={(e) => setFormData({...formData, nome: e.target.value})} 
          required 
        />
        <select 
          value={formData.especialidade} 
          onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
        >
          <option value="Piloto de Drone">Piloto de Drone</option>
          <option value="Agrônomo">Agrônomo</option>
          <option value="Topógrafo">Topógrafo</option>
          <option value="Técnico em Manutenção">Técnico em Manutenção</option>
        </select>
        <input 
          type="text" 
          placeholder="Cidade / UF" 
          value={formData.cidade} 
          onChange={(e) => setFormData({...formData, cidade: e.target.value})} 
          required 
        />
        <input 
          type="text" 
          placeholder="Registro ANAC / CREA" 
          value={formData.anacCrea} 
          onChange={(e) => setFormData({...formData, anacCrea: e.target.value})} 
        />
        
        <div className="acoes-form">
          <button type="submit" className="btn-salvar">Salvar Perfil</button>
          <button type="button" onClick={onCancel} className="btn-cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  );
}