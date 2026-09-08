import { useState } from 'react';
import CadastroProfissionais from '../components/formularios/CadastroProfissionais';
import CadastroVagas from '../components/formularios/CadastroVagas';
import ModalDrone from '../components/modals/ModalDrone';
import './profissionais.css';

const MOCK_PROFISSIONAIS = [
  { 
    id: 1, 
    nome: 'Carlos Eduardo', 
    especialidade: 'Piloto de Drone', 
    estado: 'SP', 
    cidade: 'Ribeirão Preto', 
    registro: 'ANAC-10293', 
    experiencia: '100h+', 
    pagamento: 'PJ / NF',
    disponibilidade: 'Imediata',
    certificacao: 'Autorizado / Certificado',
    garantia: '3 Meses',
    whatsapp: '5516999998888',
    email: 'carlos.piloto@example.com'
  },
  { 
    id: 2, 
    nome: 'Mariana Silva', 
    especialidade: 'Agrônomo', 
    estado: 'MG', 
    cidade: 'Uberlândia', 
    registro: 'CREA-98765', 
    experiencia: 'Especialista', 
    pagamento: 'CLT / Diária',
    disponibilidade: 'Finais de Semana',
    certificacao: 'Autônomo / Independente',
    garantia: 'Sem Garantia',
    whatsapp: '5534988887777',
    email: 'mariana.agro@example.com'
  },
  { 
    id: 3, 
    nome: 'Roberto Alves', 
    especialidade: 'Técnico em Manutenção', 
    estado: 'PR', 
    cidade: 'Cascavel', 
    registro: 'CREA-43210', 
    experiencia: 'Especialista', 
    pagamento: 'PJ / NF',
    disponibilidade: 'Imediata',
    certificacao: 'Autorizado / Certificado',
    garantia: '6 Meses',
    whatsapp: '5545977776666',
    email: 'roberto.fix@example.com'
  },
  { 
    id: 4, 
    nome: 'Ana Souza', 
    especialidade: 'Fotógrafo / Videomaker', 
    estado: 'SP', 
    cidade: 'Campinas', 
    registro: 'Portfólio', 
    experiencia: 'Estagiário', 
    pagamento: 'Diária',
    disponibilidade: 'Sob Consulta',
    certificacao: 'Autônomo / Independente',
    garantia: '1 Mês',
    whatsapp: '5519966665555',
    email: 'ana.foto@example.com'
  }
];

const MOCK_VAGAS = [
  { id: 1, titulo: 'Piloto para Pulverização de Cana', empresa: 'Usina Santa Maria', local: 'Ribeirão Preto - SP', contrato: 'Safra / Temporário' },
  { id: 2, titulo: 'Mapeamento Agrícola com Drones', empresa: 'AgroGeo Topografia', local: 'Uberlândia - MG', contrato: 'PJ / Prestação de Serviço' },
  { id: 3, titulo: 'Técnico de Manutenção DJI', empresa: 'DroneFix Soluções', local: 'Cascavel - PR', contrato: 'CLT' }
];

export default function Profissionais({ abaAtiva, setAbaAtiva }) {
  // Estados de Filtro de Profissionais
  const [buscaNome, setBuscaNome] = useState('');
  const [estadoUF, setEstadoUF] = useState('todos');
  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState('todas');
  const [experiencia, setExperiencia] = useState('todos');
  const [formaPagamento, setFormaPagamento] = useState('todas');
  const [disponibilidade, setDisponibilidade] = useState('todas');
  const [certificacao, setCertificacao] = useState('todas');
  const [garantia, setGarantia] = useState('todas');

  // Estado de Filtro de Vagas
  const [buscaVaga, setBuscaVaga] = useState('');

  // Estado Modal
  const [modalDados, setModalDados] = useState(null);

  // Limpar todos os filtros
  const limparFiltros = () => {
    setBuscaNome('');
    setEstadoUF('todos');
    setCidade('');
    setCategoria('todas');
    setExperiencia('todos');
    setFormaPagamento('todas');
    setDisponibilidade('todas');
    setCertificacao('todas');
    setGarantia('todas');
  };

  const profissionaisFiltrados = MOCK_PROFISSIONAIS
    .filter((pro) => {
      const matchNome = pro.nome.toLowerCase().includes(buscaNome.toLowerCase());
      const matchUF = estadoUF === 'todos' || pro.estado === estadoUF;
      const matchCidade = pro.cidade.toLowerCase().includes(cidade.toLowerCase());
      const matchCat = categoria === 'todas' || pro.especialidade === categoria;
      const matchExp = experiencia === 'todos' || pro.experiencia === experiencia;
      const matchPag = formaPagamento === 'todas' || pro.pagamento.includes(formaPagamento);
      const matchDisp = disponibilidade === 'todas' || pro.disponibilidade === disponibilidade;
      const matchCert = certificacao === 'todas' || pro.certificacao === certificacao;
      const matchGar = garantia === 'todas' || pro.garantia === garantia;

      return matchNome && matchUF && matchCidade && matchCat && matchExp && matchPag && matchDisp && matchCert && matchGar;
    })
    .sort((a, b) => a.nome.localeCompare(b.nome));

  const vagasFiltradas = MOCK_VAGAS.filter((vaga) => {
    const termo = buscaVaga.toLowerCase();
    return vaga.titulo.toLowerCase().includes(termo) || 
           vaga.empresa.toLowerCase().includes(termo) ||
           vaga.local.toLowerCase().includes(termo);
  });

  return (
    <div className="profissionais-container">

      {/* PAINEL: PROFISSIONAIS */}
      {(abaAtiva === 'buscar-pro' || !abaAtiva) && (
        <section className="painel-catalogo">
          <div className="filtro-painel-avancado">
            <div className="filtro-grupo">
              <input 
                type="text" 
                placeholder="Nome do profissional..."
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
              />
              <select value={estadoUF} onChange={(e) => setEstadoUF(e.target.value)}>
                <option value="todos">Todos os Estados (UF)</option>
                <option value="SP">São Paulo (SP)</option>
                <option value="MG">Minas Gerais (MG)</option>
                <option value="PR">Paraná (PR)</option>
                <option value="GO">Goiás (GO)</option>
              </select>
              <input 
                type="text" 
                placeholder="Cidade..."
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>

            <div className="filtro-grupo">
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="todas">Todas as Áreas / Especialidades</option>
                <option value="Piloto de Drone">Piloto de Drone</option>
                <option value="Agrônomo">Agrônomo / Mapeamento</option>
                <option value="Técnico em Manutenção">Técnico em Manutenção</option>
                <option value="Fotógrafo / Videomaker">Fotógrafo / Videomaker</option>
              </select>

              <select value={experiencia} onChange={(e) => setExperiencia(e.target.value)}>
                <option value="todos">Nível de Experiência</option>
                <option value="Estagiário">Estagiário / Iniciante</option>
                <option value="100h+">Mais de 100 horas de voo</option>
                <option value="Especialista">Especialista / Senior</option>
              </select>

              <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
                <option value="todas">Forma de Pagamento</option>
                <option value="Diária">Diária</option>
                <option value="PJ">PJ / Nota Fiscal</option>
                <option value="CLT">Contrato CLT</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <select value={disponibilidade} onChange={(e) => setDisponibilidade(e.target.value)}>
                <option value="todas">Disponibilidade</option>
                <option value="Imediata">Imediata</option>
                <option value="Finais de Semana">Finais de Semana</option>
                <option value="Sob Consulta">Sob Consulta</option>
              </select>

              <select value={certificacao} onChange={(e) => setCertificacao(e.target.value)}>
                <option value="todas">Qualificação / Selo</option>
                <option value="Autorizado / Certificado">Técnico/Oficina Autorizada</option>
                <option value="Autônomo / Independente">Profissional Independente</option>
              </select>

              <select value={garantia} onChange={(e) => setGarantia(e.target.value)}>
                <option value="todas">Garantia Oferecida</option>
                <option value="Sem Garantia">Sem Garantia</option>
                <option value="1 Mês">1 Mês</option>
                <option value="3 Meses">3 Meses</option>
                <option value="6 Meses">6 Meses</option>
              </select>
            </div>

            <button className="btn-limpar-filtros" onClick={limparFiltros}>
              Limpar Filtros
            </button>
          </div>

          <div className="contador-resultados">
            Exibindo <strong>{profissionaisFiltrados.length}</strong> profissional(ais) encontrado(s) em ordem alfabética.
          </div>

          {profissionaisFiltrados.length === 0 ? (
            <div className="sem-resultados">Nenhum profissional encontrado com os filtros aplicados.</div>
          ) : (
            <div className="grid-profissionais">
              {profissionaisFiltrados.map((pro) => (
                <div key={pro.id} className="card-profissional">
                  <div>
                    <span className="badge-especialidade">{pro.especialidade}</span>
                    <h3>{pro.nome}</h3>
                    <p>📍 {pro.cidade} - {pro.estado}</p>
                    <p>📄 {pro.registro}</p>
                    <p>⏱️ Exp: <strong>{pro.experiencia}</strong> | 📅 {pro.disponibilidade}</p>
                  </div>
                  <button className="btn-contato" onClick={() => setModalDados(pro)}>
                    Entrar em Contato
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* PAINEL: MURAL DE VAGAS */}
      {abaAtiva === 'mural-vagas' && (
        <section className="painel-vagas">
          <div className="filtro-bar">
            <input 
              type="text" 
              placeholder="Buscar vaga por título, empresa ou cidade..."
              value={buscaVaga}
              onChange={(e) => setBuscaVaga(e.target.value)}
            />
          </div>

          {vagasFiltradas.length === 0 ? (
            <div className="sem-resultados">Nenhuma vaga encontrada para esta busca.</div>
          ) : (
            <div className="grid-profissionais">
              {vagasFiltradas.map((vaga) => (
                <div key={vaga.id} className="card-profissional">
                  <div>
                    <span className="badge-especialidade badge-vaga">
                      {vaga.contrato}
                    </span>
                    <h3>{vaga.titulo}</h3>
                    <p>🏢 <strong>{vaga.empresa}</strong></p>
                    <p>📍 {vaga.local}</p>
                  </div>
                  <button className="btn-vaga-contato">
                    Candidatar-se / Contato
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* PAINEL: CADASTROS */}
      {abaAtiva === 'criar-pro' && (
        <CadastroProfissionais onCancel={() => setAbaAtiva('buscar-pro')} />
      )}

      {abaAtiva === 'publicar-vaga' && (
        <CadastroVagas onCancel={() => setAbaAtiva('mural-vagas')} />
      )}

      {/* MODAL */}
      <ModalDrone 
        isOpen={!!modalDados} 
        onClose={() => setModalDados(null)} 
        dados={modalDados} 
      />
    </div>
  );
}