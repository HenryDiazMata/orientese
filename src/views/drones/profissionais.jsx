// ==========================================
// PROFISSIONAIS.JSX
// VISTA: FILTROS + GRID + PAGINACION
// DATOS EN profissionaisListaDados.js
// ==========================================

import { useMemo, useState } from 'react';

import CadastroProfissionais from '../../components/drones/formularios/CadastroProfissionais';
import CadastroVagas from '../../components/drones/formularios/CadastroVagas';
import ModalDrone from '../../components/drones/modals/ModalDrone';
import {
  MOCK_PROFISSIONAIS,
  MOCK_VAGAS,
  OPCOES_POR_PAGINA,
  POR_PAGINA_PADRAO,
  lerCadastrosLocais,
} from '../../components/drones/formularios/profissionaisListaDados';
import './profissionais.css';

export default function Profissionais({ abaAtiva, setAbaAtiva }) {
  const [buscaNome, setBuscaNome] = useState('');
  const [estadoUF, setEstadoUF] = useState('todos');
  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState('todas');
  const [experiencia, setExperiencia] = useState('todos');
  const [formaPagamento, setFormaPagamento] = useState('todas');
  const [disponibilidade, setDisponibilidade] = useState('todas');
  const [certificacao, setCertificacao] = useState('todas');
  const [garantia, setGarantia] = useState('todas');
  const [buscaVaga, setBuscaVaga] = useState('');
  const [modalDados, setModalDados] = useState(null);
  const [tickLista, setTickLista] = useState(0);
  const [porPagina, setPorPagina] = useState(POR_PAGINA_PADRAO);
  const [pagina, setPagina] = useState(1);

  const baseProfissionais = useMemo(() => {
    return [...lerCadastrosLocais(), ...MOCK_PROFISSIONAIS];
  }, [tickLista]);

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
    setPagina(1);
  };

  const profissionaisFiltrados = baseProfissionais
    .filter((pro) => {
      const matchNome = String(pro.nome || '').toLowerCase().includes(buscaNome.toLowerCase());
      const matchUF = estadoUF === 'todos' || pro.estado === estadoUF;
      const matchCidade = String(pro.cidade || '').toLowerCase().includes(cidade.toLowerCase());
      const matchCat = categoria === 'todas' || pro.especialidade === categoria;
      const matchExp = experiencia === 'todos' || pro.experiencia === experiencia;
      const matchPag = formaPagamento === 'todas' || String(pro.pagamento || '').includes(formaPagamento);
      const matchDisp = disponibilidade === 'todas' || pro.disponibilidade === disponibilidade;
      const matchCert = certificacao === 'todas' || pro.certificacao === certificacao;
      const matchGar = garantia === 'todas' || pro.garantia === garantia;
      return matchNome && matchUF && matchCidade && matchCat && matchExp && matchPag && matchDisp && matchCert && matchGar;
    })
    .sort((a, b) => String(a.nome).localeCompare(String(b.nome)));

  const totalFiltrado = profissionaisFiltrados.length;
  const totalPaginas = Math.max(1, Math.ceil(totalFiltrado / porPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const inicio = (paginaSegura - 1) * porPagina;
  const profissionaisPagina = profissionaisFiltrados.slice(inicio, inicio + porPagina);

  const vagasFiltradas = MOCK_VAGAS.filter((vaga) => {
    const termo = buscaVaga.toLowerCase();
    return vaga.titulo.toLowerCase().includes(termo) ||
           vaga.empresa.toLowerCase().includes(termo) ||
           vaga.local.toLowerCase().includes(termo);
  });

  function mudarPorPagina(valor) {
    setPorPagina(Number(valor));
    setPagina(1);
  }

  function mudarFiltro(setter) {
    return (evento) => {
      setter(evento.target.value);
      setPagina(1);
    };
  }

  return (
    <div className="profissionais-container">
      {(abaAtiva === 'buscar-pro' || !abaAtiva) && (
        <section className="painel-catalogo">
          <div className="filtro-painel-avancado">
            <div className="filtro-grupo">
              <input
                type="text"
                placeholder="Nome do profissional..."
                value={buscaNome}
                onChange={mudarFiltro(setBuscaNome)}
              />
              <select value={estadoUF} onChange={mudarFiltro(setEstadoUF)}>
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
                onChange={mudarFiltro(setCidade)}
              />
            </div>

            <div className="filtro-grupo">
              <select value={categoria} onChange={mudarFiltro(setCategoria)}>
                <option value="todas">Todas as Áreas / Especialidades</option>
                <option value="Piloto de Drone">Piloto de Drone</option>
                <option value="Agrônomo">Agrônomo / Mapeamento</option>
                <option value="Técnico em Manutenção">Técnico em Manutenção</option>
                <option value="Fotógrafo / Videomaker">Fotógrafo / Videomaker</option>
              </select>

              <select value={experiencia} onChange={mudarFiltro(setExperiencia)}>
                <option value="todos">Nível de Experiência</option>
                <option value="Estagiário">Estagiário / Iniciante</option>
                <option value="100h+">Mais de 100 horas de voo</option>
                <option value="Especialista">Especialista / Senior</option>
              </select>

              <select value={formaPagamento} onChange={mudarFiltro(setFormaPagamento)}>
                <option value="todas">Forma de Pagamento</option>
                <option value="Diária">Diária</option>
                <option value="PJ">PJ / Nota Fiscal</option>
                <option value="CLT">Contrato CLT</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <select value={disponibilidade} onChange={mudarFiltro(setDisponibilidade)}>
                <option value="todas">Disponibilidade</option>
                <option value="Imediata">Imediata</option>
                <option value="Finais de Semana">Finais de Semana</option>
                <option value="Sob Consulta">Sob Consulta</option>
              </select>

              <select value={certificacao} onChange={mudarFiltro(setCertificacao)}>
                <option value="todas">Qualificação / Selo</option>
                <option value="Autorizado / Certificado">Técnico/Oficina Autorizada</option>
                <option value="Autônomo / Independente">Profissional Independente</option>
              </select>

              <select value={garantia} onChange={mudarFiltro(setGarantia)}>
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
            Exibindo <strong>{profissionaisPagina.length}</strong> de <strong>{totalFiltrado}</strong> profissional(ais)
            {' '}— página {paginaSegura} de {totalPaginas}.
          </div>

          {totalFiltrado === 0 ? (
            <div className="sem-resultados">Nenhum profissional encontrado com os filtros aplicados.</div>
          ) : (
            <div className="grid-profissionais">
              {profissionaisPagina.map((pro) => (
                <div key={pro.id} className="card-profissional">
                  <div>
                    <span className="badge-especialidade">{pro.especialidade}</span>
                    <h3>{pro.nome}</h3>
                    <p>📍 {pro.cidade}{pro.estado ? ` - ${pro.estado}` : ''}</p>
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

          {totalFiltrado > 0 && (
            <div className="paginacao-profissionais" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Por página
                <select value={porPagina} onChange={(e) => mudarPorPagina(e.target.value)}>
                  {OPCOES_POR_PAGINA.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn-limpar-filtros"
                  disabled={paginaSegura <= 1}
                  onClick={() => setPagina((n) => Math.max(1, n - 1))}
                >
                  Anterior
                </button>
                <span>Página {paginaSegura} / {totalPaginas}</span>
                <button
                  type="button"
                  className="btn-limpar-filtros"
                  disabled={paginaSegura >= totalPaginas}
                  onClick={() => setPagina((n) => Math.min(totalPaginas, n + 1))}
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </section>
      )}

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

      {abaAtiva === 'criar-pro' && (
        <CadastroProfissionais
          onCancelar={() => setAbaAtiva && setAbaAtiva('buscar-pro')}
          onVerLista={() => {
            setTickLista((n) => n + 1);
            setPagina(1);
            if (setAbaAtiva) setAbaAtiva('buscar-pro');
          }}
        />
      )}

      {abaAtiva === 'publicar-vaga' && (
        <CadastroVagas onCancel={() => setAbaAtiva && setAbaAtiva('mural-vagas')} />
      )}

      <ModalDrone
        isOpen={!!modalDados}
        onClose={() => setModalDados(null)}
        dados={modalDados}
      />
    </div>
  );
}