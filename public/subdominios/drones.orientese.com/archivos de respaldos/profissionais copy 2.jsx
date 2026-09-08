import { useState } from 'react';
import CadastroProfissional from '../components/formularios/CadastroProfissionais';
import CadastroVaga from '../components/formularios/CadastroVaga';

export default function ProfissionaisView() {
  const [abaAtiva, setAbaAtiva] = useState('catalogo'); // 'catalogo', 'vagas', 'cadastro-pro', 'cadastro-vaga'
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('todas');

  return (
    <div className="profissionais-container">
      {/* Cabecera y Navegación Interna */}
      <div className="header-secao">
        <h2>Rede de Profissionais e Oportunidades</h2>
        <div className="acoes-principais">
          <button 
            className={abaAtiva === 'catalogo' ? 'active' : ''} 
            onClick={() => setAbaAtiva('catalogo')}
          >
            Buscar Profissionais
          </button>
          <button 
            className={abaAtiva === 'vagas' ? 'active' : ''} 
            onClick={() => setAbaAtiva('vagas')}
          >
            Mural de Vagas
          </button>
          <button 
            className="btn-destaque" 
            onClick={() => setAbaAtiva('cadastro-pro')}
          >
            + Criar Perfil
          </button>
          <button 
            className="btn-secundario" 
            onClick={() => setAbaAtiva('cadastro-vaga')}
          >
            + Publicar Vaga
          </button>
        </div>
      </div>

      {/* Renderización Condicional según la pestaña elegida */}
      {abaAtiva === 'catalogo' && (
        <section className="painel-catalogo">
          {/* Campo de Busca + Filtros */}
          <div className="filtro-bar">
            <input 
              type="text" 
              placeholder="Buscar por nome, cidade ou especialidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todas">Todas as Áreas</option>
              <option value="Piloto">Piloto de Drone</option>
              <option value="Agrônomo">Agrônomo / Mapeamento</option>
              <option value="Técnico">Técnico em Manutenção</option>
            </select>
          </div>
          {/* Grid de Cards de Profissionais iriam aqui */}
        </section>
      )}

      {abaAtiva === 'cadastro-pro' && (
        <CadastroProfissional onCancel={() => setAbaAtiva('catalogo')} />
      )}

      {abaAtiva === 'cadastro-vaga' && (
        <CadastroVaga onCancel={() => setAbaAtiva('vagas')} />
      )}
    </div>
  );
}