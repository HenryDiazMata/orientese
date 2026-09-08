import { useState } from 'react';
import CadastroProfissionais from '../components/formularios/CadastroProfissionais';
import CadastroVagas from '../components/formularios/CadastroVagas';
import './profissionais.css';

export default function ProfissionaisView() {
  const [abaAtiva, setAbaAtiva] = useState('catalogo');
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('todas');

  const listaProfissionais = [
    { id: 1, nome: 'Carlos Eduardo', especialidade: 'Piloto', cidade: 'Ribeirão Preto - SP', anac: 'ANAC-10293' },
    { id: 2, nome: 'Mariana Silva', especialidade: 'Agrônomo', cidade: 'Uberlândia - MG', anac: 'CREA-98765' },
    { id: 3, nome: 'Roberto Alves', especialidade: 'Técnico', cidade: 'Cascavel - PR', anac: 'CREA-43210' },
  ];

  const listaVagas = [
    { id: 1, titulo: 'Piloto para Pulverização de Cana', empresa: 'Usina Santa Maria', local: 'Ribeirão Preto - SP', contrato: 'Safra / Temporário' },
    { id: 2, titulo: 'Mapeamento Agrícola com Drones', empresa: 'AgroGeo Topografia', local: 'Uberlândia - MG', contrato: 'PJ / Prestação de Serviço' },
    { id: 3, titulo: 'Técnico de Manutenção DJI', empresa: 'DroneFix Soluções', local: 'Cascavel - PR', contrato: 'CLT' },
  ];

  const profissionaisFiltrados = listaProfissionais.filter((pro) => {
    const batimentoBusca = pro.nome.toLowerCase().includes(busca.toLowerCase()) || 
                          pro.cidade.toLowerCase().includes(busca.toLowerCase());
    const batimentoCat = categoria === 'todas' || pro.especialidade === categoria;
    return batimentoBusca && batimentoCat;
  });

  const vagasFiltradas = listaVagas.filter((vaga) => {
    return vaga.titulo.toLowerCase().includes(busca.toLowerCase()) || 
           vaga.empresa.toLowerCase().includes(busca.toLowerCase()) ||
           vaga.local.toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <div className="profissionais-container">
      <div className="header-secao">
        <h2>Rede de Profissionais e Oportunidades</h2>
        <div className="acoes-principais">
          <button 
            className={abaAtiva === 'catalogo' ? 'active-catalogo' : ''} 
            onClick={() => setAbaAtiva('catalogo')}
          >
            Buscar Profissionais
          </button>
          <button 
            className={abaAtiva === 'vagas' ? 'active-vagas' : ''} 
            onClick={() => setAbaAtiva('vagas')}
          >
            Mural de Vagas
          </button>
          <button 
            className={abaAtiva === 'cadastro-pro' ? 'active-perfil' : ''} 
            onClick={() => setAbaAtiva('cadastro-pro')}
          >
            + Criar Perfil
          </button>
          <button 
            className={abaAtiva === 'cadastro-vaga' ? 'active-vaga' : ''} 
            onClick={() => setAbaAtiva('cadastro-vaga')}
          >
            + Publicar Vaga
          </button>
        </div>
      </div>

      {abaAtiva === 'catalogo' && (
        <section className="painel-catalogo">
          <div className="filtro-bar">
            <input 
              type="text" 
              placeholder="Buscar por nome ou cidade..."
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

          <div className="grid-profissionais">
            {profissionaisFiltrados.map((pro) => (
              <div key={pro.id} className="card-profissional">
                <span className="badge-especialidade">{pro.especialidade}</span>
                <h3>{pro.nome}</h3>
                <p>📍 {pro.cidade}</p>
                <p>📄 {pro.anac}</p>
                <button className="btn-contato" onClick={() => alert(`Contato com ${pro.nome}`)}>
                  Entrar em Contato
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {abaAtiva === 'vagas' && (
        <section className="painel-vagas">
          <div className="filtro-bar">
            <input 
              type="text" 
              placeholder="Buscar vaga por título, empresa ou cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="grid-profissionais">
            {vagasFiltradas.map((vaga) => (
              <div key={vaga.id} className="card-profissional">
                <span className="badge-especialidade" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                  {vaga.contrato}
                </span>
                <h3>{vaga.titulo}</h3>
                <p>🏢 <strong>{vaga.empresa}</strong></p>
                <p>📍 {vaga.local}</p>
                <button className="btn-vaga-contato" onClick={() => alert(`Candidatura para ${vaga.titulo}`)}>
                  Candidatar-se / Contato
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {abaAtiva === 'cadastro-pro' && (
        <CadastroProfissionais onCancel={() => setAbaAtiva('catalogo')} />
      )}

      {abaAtiva === 'cadastro-vaga' && (
        <CadastroVagas onCancel={() => setAbaAtiva('vagas')} />
      )}
    </div>
  );
}