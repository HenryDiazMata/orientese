// ==========================================
// PROFISSIONAIS.JSX
// VISTA: FILTROS + GRID + PAGINACION
// DATOS: profissionaisListaDados.js + src/data/drones/profissionais.json
// TIPO PERSONA = FILTRO Y SELLO. NO ES ITEM DEL SIDEBAR
// WIZARD CadastroProfissionais NO TOCAR
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
import './css/profissionais.css';

function normalizarTipoPersona(valor) {
  const t = String(valor || '').toLowerCase().trim();
  if (t === 'juridica' || t === 'jurídica' || t === 'pj') return 'juridica';
  return 'fisica';
}

// AREAS DEL DIRECTORIO (FILTRO). NO ES EL WIZARD.
// EL MATCH ES POR INCLUSION PARA CUBRIR "Agrônomo" vs "Agrônomo / Mapeamento"
const AREAS_ESPECIALIDADE = [
  'Piloto de Drone',
  'Agrônomo',
  'Mapeamento / Fotogrametria',
  'Topografia / Ortomosaico',
  'Pulverização / Agrícola',
  'Inspeção Predial / Industrial',
  'Inspeção de Linhas / Torres',
  'Técnico em Manutenção',
  'Consertos / Reparos',
  'Fotógrafo / Videomaker',
  'Audiovisual / Eventos',
  'Observador Visual (EVLOS)',
  'Radio Operador (VHF)',
  'Apoio de Solo / Logística',
  'Busca e Resgate',
  'Instrutor / Treinamento',
  'Consultoria / Projetos'
];

function coincideEspecialidade(especialidade, categoria) {
  if (!categoria || categoria === 'todas') return true;
  const esp = String(especialidade || '').toLowerCase();
  const cat = String(categoria).toLowerCase();
  if (!esp) return false;
  return esp.includes(cat) || cat.includes(esp);
}

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
  const [filtroTipoPersona, setFiltroTipoPersona] = useState('TODOS');
  const [buscaVaga, setBuscaVaga] = useState('');
  const [modalDados, setModalDados] = useState(null);
  const [tickLista, setTickLista] = useState(0);
  const [porPagina, setPorPagina] = useState(POR_PAGINA_PADRAO);
  const [pagina, setPagina] = useState(1);
  // recomendadas = MAYOR avaliacao; alfabetica = NOMBRE
  const [ordenarPor, setOrdenarPor] = useState('recomendadas');

  const baseProfissionais = useMemo(() => {
    return [...lerCadastrosLocais(), ...MOCK_PROFISSIONAIS].map((pro) => ({
      ...pro,
      tipoPersona: normalizarTipoPersona(pro.tipoPersona)
    }));
  }, [tickLista]);

  const hayFiltrosActivos =
    buscaNome.trim() !== '' ||
    estadoUF !== 'todos' ||
    cidade.trim() !== '' ||
    categoria !== 'todas' ||
    experiencia !== 'todos' ||
    formaPagamento !== 'todas' ||
    disponibilidade !== 'todas' ||
    certificacao !== 'todas' ||
    garantia !== 'todas' ||
    filtroTipoPersona !== 'TODOS';

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
    setFiltroTipoPersona('TODOS');
    setPagina(1);
  };

  const profissionaisFiltrados = baseProfissionais
    .filter((pro) => {
      const matchNome = String(pro.nome || '').toLowerCase().includes(buscaNome.toLowerCase());
      const matchUF = estadoUF === 'todos' || pro.estado === estadoUF;
      const matchCidade = String(pro.cidade || '').toLowerCase().includes(cidade.toLowerCase());
      const matchCat = coincideEspecialidade(pro.especialidade, categoria);
      const matchExp = experiencia === 'todos' || pro.experiencia === experiencia;
      const matchPag = formaPagamento === 'todas' || String(pro.pagamento || '').includes(formaPagamento);
      const matchDisp = disponibilidade === 'todas' || pro.disponibilidade === disponibilidade;
      const matchCert = certificacao === 'todas' || pro.certificacao === certificacao;
      const matchGar = garantia === 'todas' || pro.garantia === garantia;
      const tipo = normalizarTipoPersona(pro.tipoPersona);
      const matchTipo = filtroTipoPersona === 'TODOS' || tipo === filtroTipoPersona;
      return matchNome && matchUF && matchCidade && matchCat && matchExp && matchPag && matchDisp && matchCert && matchGar && matchTipo;
    })
    .sort((a, b) => {
      if (ordenarPor === 'alfabetica') {
        return String(a.nome).localeCompare(String(b.nome));
      }
      const notaA = Number(a.avaliacao) || 0;
      const notaB = Number(b.avaliacao) || 0;
      if (notaB !== notaA) return notaB - notaA;
      return (Number(b.avaliacoesQtd) || 0) - (Number(a.avaliacoesQtd) || 0);
    });

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
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#0f172a' }}>
              Rede de Profissionais
            </h1>
            <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: 15 }}>
              Diretório informativo de profissionais afins à operação com drones
            </p>
          </div>
          <div className="filtro-painel-avancado">
            <div className="filtro-grupo">
              <select value={filtroTipoPersona} onChange={mudarFiltro(setFiltroTipoPersona)} aria-label="Tipo de pessoa">
                <option value="TODOS">Tipo de pessoa — todos</option>
                <option value="fisica">Pessoa física</option>
                <option value="juridica">Pessoa jurídica</option>
              </select>
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
                {AREAS_ESPECIALIDADE.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
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

            <button
              type="button"
              className="btn-limpar-filtros"
              onClick={limparFiltros}
              disabled={!hayFiltrosActivos}
              style={{
                color: hayFiltrosActivos ? '#C46B6B' : '#94a3b8',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                cursor: hayFiltrosActivos ? 'pointer' : 'default'
              }}
            >
              Limpar Filtros
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
            <div className="contador-resultados" style={{ margin: 0 }}>
              Exibindo <strong>{profissionaisPagina.length}</strong> de <strong>{totalFiltrado}</strong> profissional(ais)
              {' '}— página {paginaSegura} de {totalPaginas}.
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}>
              Ordenar por:
              <select
                value={ordenarPor}
                onChange={(e) => { setOrdenarPor(e.target.value); setPagina(1); }}
                style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff' }}
              >
                <option value="recomendadas">Mais recomendados</option>
                <option value="alfabetica">Ordem alfabética</option>
              </select>
            </label>
          </div>
          <div className="contador-resultados" style={{ display: 'none' }}>
            Exibindo <strong>{profissionaisPagina.length}</strong> de <strong>{totalFiltrado}</strong> profissional(ais)
            {' '}— página {paginaSegura} de {totalPaginas}.
          </div>

          {totalFiltrado === 0 ? (
            <div className="sem-resultados">Nenhum profissional encontrado com os filtros aplicados.</div>
          ) : (
            <div className="grid-profissionais">
              {profissionaisPagina.map((pro) => {
                const tipo = normalizarTipoPersona(pro.tipoPersona);
                return (
                <div key={pro.id} className="card-profissional">
                  <div>
                    <span className="badge-especialidade">{pro.especialidade}</span>
                    <span style={{
                      display: 'inline-block',
                      marginLeft: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 12,
                      background: tipo === 'juridica' ? '#e0f2fe' : '#f1f5f9',
                      color: tipo === 'juridica' ? '#0369a1' : '#475569'
                    }}>
                      {tipo === 'juridica' ? 'Pessoa jurídica' : 'Pessoa física'}
                    </span>
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                      <span>{pro.nome}</span>
                      {pro.avaliacao != null && (
                        <span style={{ fontSize: 13, color: '#0077C8', fontWeight: 800, whiteSpace: 'nowrap' }}>
                          ★ {Number(pro.avaliacao).toFixed(1)}
                        </span>
                      )}
                    </h3>
                    <p>📍 {pro.cidade}{pro.estado ? ` - ${pro.estado}` : ''}</p>
                    <p>📄 {pro.registro}</p>
                    <p>⏱️ Exp: <strong>{pro.experiencia}</strong> | 📅 {pro.disponibilidade}</p>
                  </div>
                  <button className="btn-contato" onClick={() => setModalDados(pro)}>
                    Entrar em Contato
                  </button>
                </div>
                );
              })}
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
                  <button type="button" className="btn-vaga-contato">
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
