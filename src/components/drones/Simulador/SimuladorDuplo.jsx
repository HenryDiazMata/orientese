// ==========================================
// RUTA: src/components/drones/Simulador/SimuladorDuplo.jsx
// SIMULADOR DE PRESUPUESTOS DEL SUBDOMINIO DRONES
// ==========================================

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// TEMA CLARO/OSCURO DE DRONES (NO EL DE ORIENTESE)
import { useTheme } from '../../../context/drones/ThemeContext';

// VENTANA EMERGENTE DE DRONES
import Modal from '../modals/Modal';

// IDIOMAS SOLO DE DRONES
import i18nDrones from '../i18n';

import {
  CATEGORIAS_DRONE,
  ADICIONAIS_VOO,
  ADICIONAIS_MANUTENCAO,
  DEFEITOS_MANUTENCAO,
  PPP_FACTORES,
  PAISES,
  ESTADOS_BRASIL,
  TASAS_CAMBIO_APROX
} from './constants';
import pricesData from './prices.json';
import './SimuladorDuplo.css';

const LIMITE_GRATUITO = 5;

// CLAVES SEGURAS. EL TEXTO DE prices.json NO SE USA COMO RUTA DE IDIOMA
const SVC_KEY = {
  'Filmagem e Fotografia Profissional': 'sim.svcFilmagem',
  'Pulverização / Agrícola': 'sim.svcPulverizacao',
  'Mapeamento Aéreo / Fotogrametria': 'sim.svcMapeamento',
  'Inspeção Visual Predial/Industrial': 'sim.svcInspecaoPredial',
  'Contagem de Gado / Rebanho': 'sim.svcGado',
  'Contagem de Ovinos / Caprinos': 'sim.svcOvinos',
  'Contagem de Frutos / Pomares': 'sim.svcFrutos',
  'Monitoramento de Saúde da Lavoura (NDVI)': 'sim.svcNdvi',
  'Mapeamento de Áreas de Pastagem': 'sim.svcPastagem',
  'Inspeção de Linhas de Transmissão / Torres': 'sim.svcTorres',
  'Levantamento Topográfico / Ortomosaico': 'sim.svcOrto'
};

export const SimuladorDuplo = () => {
  const { t, i18n } = useTranslation(undefined, { i18n: i18nDrones });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [tab, setTab] = useState('voo');
  const [pais, setPais] = useState('BR');
  const [estado, setEstado] = useState('SP');
  const idiomaInicial = i18n.language?.startsWith('pt') ? 'pt' : (i18n.language || 'pt');
  const [idioma, setIdioma] = useState(idiomaInicial);

  const [tipoServico, setTipoServico] = useState('');
  const [categoriaDrone, setCategoriaDrone] = useState('');
  const [qtdFotos, setQtdFotos] = useState('');
  const [hectares, setHectares] = useState('');
  const [adicionais, setAdicionais] = useState([]);

  const [tipoManutencao, setTipoManutencao] = useState('');
  const [porteManutencao, setPorteManutencao] = useState('');
  const [defeitos, setDefeitos] = useState([]);
  const [adicionaisManutencao, setAdicionaisManutencao] = useState([]);

  const [resultado, setResultado] = useState(null);
  const [orcamentosRealizados, setOrcamentosRealizados] = useState(0);
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  const paisInfo = PAISES.find(p => p.code === pais) || PAISES[0];
  const factorPPP = PPP_FACTORES[pais] || PPP_FACTORES.DEFAULT;
  const tasaCambio = TASAS_CAMBIO_APROX[paisInfo.moeda] || 1;
  const taxaCambioRef = pricesData.taxaCambioReferencia || 5.10;

  const precosEstado = useMemo(() => {
    if (pais !== 'BR') return pricesData.BR.SP;
    return pricesData.BR[estado] || pricesData.BR.SP;
  }, [pais, estado]);

  const servicoAtual = tipoServico ? precosEstado[tipoServico] : null;
  const precisaHectares = servicoAtual && (
    servicoAtual.tipo === 'hectare' ||
    servicoAtual.tipo === 'hectare_variantes' ||
    servicoAtual.tipo === 'misto'
  );

  const formatarMoeda = (valorUSD) => {
    const valorLocal = valorUSD * factorPPP * tasaCambio;
    return new Intl.NumberFormat(paisInfo.locale, {
      style: 'currency', currency: paisInfo.moeda, maximumFractionDigits: 0
    }).format(valorLocal);
  };
  const brlParaUSD = (valorBRL) => valorBRL / taxaCambioRef;
  const precoUnitarioFotoUSD = brlParaUSD(pricesData.taxasGlobais.valorFotoBRL);

  const labelDe = (item) => (item.labelKey ? t(item.labelKey) : item.label);
  const nomePaisDe = (p) => (p.nomeKey ? t(p.nomeKey) : p.nome);
  const nomeServicoDe = (nome) => (SVC_KEY[nome] ? t(SVC_KEY[nome]) : nome);

  const claseCasilla = 'flex items-start gap-2 p-2.5 rounded-lg border text-[12px] font-semibold cursor-pointer leading-snug min-h-[3.25rem]';
  const estiloCasilla = { backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' };

  const handleIdioma = (code) => {
    setIdioma(code);
    i18n.changeLanguage(code === 'pt' ? 'pt-BR' : code);
  };

  const handleCheckboxVoo = (item) => {
    setAdicionais(prev => prev.some(a => a.id === item.id) ? prev.filter(a => a.id !== item.id) : [...prev, item]);
  };
  const handleCheckboxManutencao = (item) => {
    setDefeitos(prev => prev.some(d => d.id === item.id) ? prev.filter(d => d.id !== item.id) : [...prev, item]);
  };
  const handleCheckboxAdicionalManutencao = (item) => {
    setAdicionaisManutencao(prev => prev.some(a => a.id === item.id) ? prev.filter(a => a.id !== item.id) : [...prev, item]);
  };

  const handleNovoOrcamento = () => {
    setTipoServico(''); setCategoriaDrone(''); setQtdFotos(''); setHectares('');
    setAdicionais([]); setTipoManutencao(''); setPorteManutencao('');
    setDefeitos([]); setAdicionaisManutencao([]); setResultado(null);
  };
  const handleSwitchTab = (newTab) => { setTab(newTab); setResultado(null); };

  const verificarLimite = () => {
    if (orcamentosRealizados >= LIMITE_GRATUITO) {
      setModalConfig({
        isOpen: true,
        title: t('sim.limitTitle'),
        type: 'error',
        message: t('sim.limitMsg', { limit: LIMITE_GRATUITO })
      });
      return false;
    }
    return true;
  };

  const handleCalcularVoo = (e) => {
    e.preventDefault();
    if (!verificarLimite()) return;
    if (!tipoServico || !categoriaDrone) {
      setModalConfig({ isOpen: true, title: t('sim.requiredTitle'), type: 'error', message: t('sim.requiredFlight') });
      return;
    }
    if (precisaHectares && (!hectares || parseFloat(hectares) <= 0)) {
      setModalConfig({ isOpen: true, title: t('sim.haTitle'), type: 'error', message: t('sim.haMsg') });
      return;
    }

    const numFotos = parseInt(qtdFotos, 10) || 0;
    const numHectares = parseFloat(hectares) || 0;
    const totalAdicionaisUSD = adicionais.reduce((sum, item) => sum + item.precoUSD, 0);
    const subtotalFotosUSD = numFotos * precoUnitarioFotoUSD;
    const taxaBaseUSD = brlParaUSD(pricesData.taxasGlobais.taxaBaseVooBRL);
    let cenarios = [];
    let legendaServico = servicoAtual?.legenda || null;
    let temVarianteAeronave = false;

    if (servicoAtual.tipo === 'diaria') {
      const valorServicoUSD = brlParaUSD(servicoAtual.referenciaBRL);
      cenarios.push({ label: `Por ${servicoAtual.unidade}`, valorServicoUSD, totalUSD: valorServicoUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD, tipoAeronave: 'com' });
    } else if (servicoAtual.tipo === 'hectare') {
      const valorServicoUSD = numHectares * brlParaUSD(servicoAtual.referenciaBRL);
      cenarios.push({ label: `Por hectare (${numHectares} ha)`, valorServicoUSD, totalUSD: valorServicoUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD, tipoAeronave: 'com' });
    } else if (servicoAtual.tipo === 'hectare_variantes') {
      temVarianteAeronave = true;
      Object.entries(servicoAtual.variantes).forEach(([key, variante]) => {
        const valorServicoUSD = numHectares * brlParaUSD(variante.referenciaBRL);
        cenarios.push({ label: variante.label, valorServicoUSD, totalUSD: valorServicoUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD, tipoAeronave: key === 'comAeronave' ? 'com' : 'sem' });
      });
    } else if (servicoAtual.tipo === 'misto') {
      const valorDiariaUSD = brlParaUSD(servicoAtual.diaria.referenciaBRL);
      cenarios.push({ label: servicoAtual.diaria.label, valorServicoUSD: valorDiariaUSD, totalUSD: valorDiariaUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD, tipoAeronave: 'com' });
      const valorHaUSD = numHectares * brlParaUSD(servicoAtual.hectare.referenciaBRL);
      cenarios.push({ label: `${servicoAtual.hectare.label} (${numHectares} ha)`, valorServicoUSD: valorHaUSD, totalUSD: valorHaUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD, tipoAeronave: 'com' });
    }

    const agora = new Date();
    const cat = CATEGORIAS_DRONE.find(c => c.value === categoriaDrone);
    setResultado({
      modalidade: 'VOO',
      tipoServico,
      categoriaDrone: cat ? labelDe(cat) : categoriaDrone,
      numFotos, numHectares, precoUnitarioFotoUSD, subtotalFotosUSD,
      adicionaisSelecionados: adicionais, taxaBaseServicoUSD: taxaBaseUSD, cenarios, legendaServico, temVarianteAeronave,
      dataHoraCalculo: agora.toLocaleString(paisInfo.locale, { dateStyle: 'short', timeStyle: 'short' }),
      pais: nomePaisDe(paisInfo),
      estado: pais === 'BR' ? (ESTADOS_BRASIL.find(e => e.code === estado)?.nome || estado) : null,
      moeda: paisInfo.moeda,
      usandoFallbackSP: pais === 'BR' && estado !== 'SP' && !pricesData.BR[estado]
    });
    setOrcamentosRealizados(prev => prev + 1);
  };

  const handleCalcularManutencao = (e) => {
    e.preventDefault();
    if (!verificarLimite()) return;
    if (!tipoManutencao || !porteManutencao) {
      setModalConfig({ isOpen: true, title: t('sim.requiredTitle'), type: 'error', message: t('sim.requiredMaint') });
      return;
    }

    const m = pricesData.taxasGlobais.manutencao2026;
    const isAgricola = porteManutencao === 'pesado';
    const isDiagOnly = tipoManutencao.includes('Diagnóstico');
    const isPreventiva = tipoManutencao.includes('Preventiva');
    const numHa = parseFloat(hectares) || 0;
    const temLimpeza = defeitos.some(d => d.id === 'limpeza');
    const temHomologacao = defeitos.some(d => d.id === 'homologacao');
    const defeitosSemHomologacao = defeitos.filter(d => d.id !== 'homologacao');
    const totalExtrasUSD = adicionaisManutencao.reduce((sum, item) => sum + item.precoUSD, 0);

    let baseBRL = 0;
    let modoCalculo = 'consumo';
    let taxaDiagnosticoBRL = 0;

    if (isAgricola) {
      modoCalculo = 'agricola';
      const ciclos = numHa > 0 ? numHa / 1000 : 1;
      baseBRL = m.agricolaCiclo1000ha * ciclos;
      if (temHomologacao) baseBRL += m.homologacao;
    } else if (isDiagOnly && defeitosSemHomologacao.length === 0) {
      modoCalculo = 'diagnostico';
      taxaDiagnosticoBRL = m.diagnostico;
      baseBRL = m.diagnostico;
      if (temHomologacao) baseBRL += m.homologacao;
    } else {
      taxaDiagnosticoBRL = m.diagnostico;
      baseBRL = m.diagnostico;
      if (isPreventiva && !temLimpeza) baseBRL += m.preventivaGeral;
      defeitos.forEach(d => { baseBRL += d.maxBRL ?? 0; });
      const teto = m.tetoPorPorte[porteManutencao] || m.tetoPorPorte.medio;
      baseBRL = Math.min(baseBRL, teto);
    }

    const agora = new Date();
    const cat = CATEGORIAS_DRONE.find(c => c.value === porteManutencao);
    setResultado({
      modalidade: 'MANUTENÇÃO',
      tipoManutencao,
      porteManutencao: cat ? labelDe(cat) : porteManutencao,
      defeitosSelecionados: defeitos,
      adicionaisSelecionados: adicionaisManutencao,
      taxaDiagnosticoUSD: brlParaUSD(taxaDiagnosticoBRL),
      valorTotalUSD: brlParaUSD(baseBRL) + totalExtrasUSD,
      modoCalculo,
      numHectares: isAgricola ? (numHa || 1000) : null,
      dataHoraCalculo: agora.toLocaleString(paisInfo.locale, { dateStyle: 'short', timeStyle: 'short' }),
      pais: nomePaisDe(paisInfo),
      estado: pais === 'BR' ? (ESTADOS_BRASIL.find(e => e.code === estado)?.nome || estado) : null,
      moeda: paisInfo.moeda,
      estimativa: true
    });
    setOrcamentosRealizados(prev => prev + 1);
  };

  const handleEnviarOrcamento = (e) => {
    e.preventDefault();
    if (!nomeCliente || (!emailCliente && !telefoneCliente)) {
      setModalConfig({ isOpen: true, title: t('sim.incompleteTitle'), type: 'error', message: t('sim.incompleteMsg') });
      return;
    }
    setModalConfig({
      isOpen: true,
      title: t('sim.successTitle'),
      type: 'success',
      message: t('sim.successMsg', { name: nomeCliente })
    });
  };

  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const cardBorder = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const labelColor = isDark ? '#e2e8f0' : '#334155';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8" style={{ color: textMain }}>
      <Modal isOpen={modalConfig.isOpen} title={modalConfig.title} type={modalConfig.type} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}>
        {modalConfig.message}
      </Modal>

      <div className="rounded-2xl p-6 shadow-md transition-all" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
        <div className="border-b pb-5 mb-6" style={{ borderColor: cardBorder }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight" style={{ color: textMain }}>{t('sim.title')}</h2>
              <p className="text-sm font-medium mt-1" style={{ color: textMuted }}>{t('sim.subtitle')}</p>
            </div>
            <div className="flex p-1 rounded-xl border self-start" style={{ backgroundColor: isDark ? '#0f172a' : '#f1f5f9', borderColor: cardBorder }}>
              <button type="button" onClick={() => handleSwitchTab('voo')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'voo' ? 'bg-blue-600 text-white shadow' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('sim.tabFlight')}</button>
              <button type="button" onClick={() => handleSwitchTab('manutencao')} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'manutencao' ? 'bg-blue-600 text-white shadow' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('sim.tabMaint')}</button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold whitespace-nowrap" style={{ color: labelColor }}>{t('sim.country')}</label>
              <select value={pais} onChange={(e) => { setPais(e.target.value); if (e.target.value !== 'BR') setEstado('SP'); }} className="p-2 rounded-lg border text-xs font-medium min-w-[170px]" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}>
                {PAISES.map(p => <option key={p.code} value={p.code}>{nomePaisDe(p)} ({p.moeda})</option>)}
              </select>
            </div>
            {pais === 'BR' && (
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold whitespace-nowrap" style={{ color: labelColor }}>{t('sim.state')}</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)} className="p-2 rounded-lg border text-xs font-medium min-w-[180px]" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}>
                  {ESTADOS_BRASIL.map(e => <option key={e.code} value={e.code}>{e.nome}</option>)}
                </select>
              </div>
            )}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold whitespace-nowrap" style={{ color: labelColor }}>{t('sim.language')}</label>
              <select value={idioma} onChange={(e) => handleIdioma(e.target.value)} className="p-2 rounded-lg border text-xs font-medium min-w-[130px]" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}>
                <option value="pt">Português</option>
                <option value="es">Castellano</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="it">Italiano</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {tab === 'voo' && (
            <form onSubmit={handleCalcularVoo} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.serviceType')}</label>
                <select
                  value={tipoServico}
                  onChange={(e) => { setTipoServico(e.target.value); setHectares(''); setResultado(null); }}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium"
                  style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">{t('sim.chooseService')}</option>
                  {Object.keys(precosEstado)
                    .filter(k => !k.startsWith('_'))
                    .map(servico => (
                      <option key={servico} value={servico}>
                        {nomeServicoDe(servico)}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.droneCategory')}</label>
                <select value={categoriaDrone} onChange={(e) => setCategoriaDrone(e.target.value)} className="w-full p-2.5 rounded-lg border text-xs font-medium" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}>
                  <option value="">{t('sim.chooseCategory')}</option>
                  {CATEGORIAS_DRONE.map(cat => (
                    <option key={cat.value} value={cat.value}>{labelDe(cat)}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {precisaHectares && (
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.hectares')}</label>
                    <input type="number" step="0.1" min="0.1" placeholder="Ex: 50.5" value={hectares} onChange={(e) => setHectares(e.target.value)} className="w-full p-2.5 rounded-lg border text-xs font-medium" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <p className="text-[11px] mt-1" style={{ color: '#0077C8' }}>{t('sim.hectaresHint')}</p>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.photos')}</label>
                  <input type="number" min="0" placeholder="Ex: 800" value={qtdFotos} onChange={(e) => setQtdFotos(e.target.value)} className="w-full p-2.5 rounded-lg border text-xs font-medium" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                </div>
              </div>
              {servicoAtual?.legenda && (
                <div className="p-3 rounded-lg text-[11px] leading-relaxed" style={{ backgroundColor: isDark ? '#0f172a' : '#f0f9ff', color: textMuted, border: `1px solid ${cardBorder}` }}>{servicoAtual.legenda}</div>
              )}
              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>{t('sim.extrasFlight')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ADICIONAIS_VOO.map(item => (
                    <label key={item.id} className={claseCasilla} style={estiloCasilla}>
                      <input type="checkbox" checked={adicionais.some(a => a.id === item.id)} onChange={() => handleCheckboxVoo(item)} className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{labelDe(item)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow">{t('sim.calcFlight')}</button>
                <button type="button" onClick={handleNovoOrcamento} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2.5 px-3 rounded-lg text-xs">{t('sim.clear')}</button>
              </div>
            </form>
          )}

          {tab === 'manutencao' && (
            <form onSubmit={handleCalcularManutencao} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.maintType')}</label>
                <select value={tipoManutencao} onChange={(e) => setTipoManutencao(e.target.value)} className="w-full p-2.5 rounded-lg border text-xs font-medium" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}>
                  <option value="">{t('sim.chooseMaint')}</option>
                  <option value="Manutenção Preventiva Geral">{t('sim.maintPreventive')}</option>
                  <option value="Manutenção Corretiva (Reparo pós-queda)">{t('sim.maintCorrective')}</option>
                  <option value="Diagnóstico de Bancada e Perícia">{t('sim.maintDiag')}</option>
                  <option value="Customização e Instalação de Acessórios">{t('sim.maintCustom')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.equipmentSize')}</label>
                <select value={porteManutencao} onChange={(e) => setPorteManutencao(e.target.value)} className="w-full p-2.5 rounded-lg border text-xs font-medium" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}>
                  <option value="">{t('sim.chooseSize')}</option>
                  {CATEGORIAS_DRONE.map(cat => (
                    <option key={cat.value} value={cat.value}>{labelDe(cat)}</option>
                  ))}
                </select>
                {porteManutencao === 'pesado' && (
                  <p className="text-[11px] leading-snug mt-2" style={{ color: '#0077C8' }}>{t('sim.heavyHint')}</p>
                )}
              </div>
              {porteManutencao === 'pesado' && (
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>{t('sim.cycleHectares')}</label>
                  <input type="number" step="1" min="0" placeholder="Ex: 1000" value={hectares} onChange={(e) => setHectares(e.target.value)} className="w-full p-2.5 rounded-lg border text-xs font-medium" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                  <p className="text-[11px] mt-1" style={{ color: '#0077C8' }}>{t('sim.cycleHint')}</p>
                </div>
              )}
              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>{t('sim.defects')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {DEFEITOS_MANUTENCAO.map(item => (
                    <label key={item.id} className={claseCasilla} style={estiloCasilla}>
                      <input type="checkbox" checked={defeitos.some(d => d.id === item.id)} onChange={() => handleCheckboxManutencao(item)} className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{labelDe(item)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>{t('sim.extrasMaint')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ADICIONAIS_MANUTENCAO.map(item => (
                    <label key={item.id} className={claseCasilla} style={estiloCasilla}>
                      <input type="checkbox" checked={adicionaisManutencao.some(a => a.id === item.id)} onChange={() => handleCheckboxAdicionalManutencao(item)} className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{labelDe(item)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow">{t('sim.calcMaint')}</button>
                <button type="button" onClick={handleNovoOrcamento} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2.5 px-3 rounded-lg text-xs">{t('sim.clear')}</button>
              </div>
            </form>
          )}

          <div className="lg:col-span-5 border-2 border-dashed rounded-2xl p-5 flex flex-col min-h-[420px]" style={{ borderColor: isDark ? '#475569' : '#cbd5e1', backgroundColor: isDark ? 'rgba(30,41,59,0.6)' : '#f8fafc' }}>
            <div className="mb-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="text-blue-600 text-xs font-extrabold uppercase">
                  {t('sim.quotesToday')}{' '}
                  <span className="text-sm px-2 py-0.5 bg-blue-600 text-white rounded-md ml-1">{orcamentosRealizados} / {LIMITE_GRATUITO}</span>
                </div>
              </div>
            </div>

            {resultado ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="border-b pb-2 text-center" style={{ borderColor: cardBorder }}>
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-500">{t('sim.reportTitle')} ({resultado.modalidade})</h3>
                  <p className="text-[10px]" style={{ color: textMuted }}>
                    {t('sim.generatedAt')} {resultado.dataHoraCalculo} • {resultado.pais}{resultado.estado ? ` - ${resultado.estado}` : ''} ({resultado.moeda})
                  </p>
                </div>

                <div className="text-xs space-y-2" style={{ color: textMain }}>
                  {resultado.modalidade === 'VOO' ? (
                    <>
                      <p><span className="font-bold">{t('sim.service')}</span> {nomeServicoDe(resultado.tipoServico)}</p>
                      <p><span className="font-bold">{t('sim.equipment')}</span> {resultado.categoriaDrone}</p>
                      {resultado.numFotos > 0 && (
                        <div className="flex justify-between">
                          <span>{t('sim.photosLine')} ({resultado.numFotos} × {formatarMoeda(resultado.precoUnitarioFotoUSD)}):</span>
                          <span className="font-semibold">{formatarMoeda(resultado.subtotalFotosUSD)}</span>
                        </div>
                      )}
                      {resultado.adicionaisSelecionados.length > 0 && (
                        <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                          <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>{t('sim.extras')}</p>
                          {resultado.adicionaisSelecionados.map(item => (
                            <div key={item.id} className="flex justify-between text-[11px] pl-2">
                              <span>+ {labelDe(item)}</span><span>{formatarMoeda(item.precoUSD)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between"><span>{t('sim.baseFee')}</span><span>{formatarMoeda(resultado.taxaBaseServicoUSD)}</span></div>
                      <div className="pt-3 mt-2 border-t-2 border-blue-500 space-y-3">
                        <p className="font-bold text-[11px] uppercase text-blue-600">{resultado.cenarios.length > 1 ? t('sim.scenarios') : t('sim.serviceValue')}</p>
                        {resultado.cenarios.map((cenario, idx) => (
                          <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: isDark ? '#0f172a' : '#f0f9ff' }}>
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-semibold text-[12px]">{cenario.label}</span>
                              <span className="font-extrabold text-blue-600 text-sm whitespace-nowrap">{formatarMoeda(cenario.totalUSD)}</span>
                            </div>
                          </div>
                        ))}
                        {!resultado.temVarianteAeronave && (
                          <p className="text-[10px] italic mt-1" style={{ color: textMuted }}>{t('sim.noOwnAircraft')}</p>
                        )}
                      </div>
                      {resultado.legendaServico && <p className="text-[10px] mt-2 italic" style={{ color: textMuted }}>{resultado.legendaServico}</p>}
                    </>
                  ) : (
                    <>
                      <p><span className="font-bold">{t('sim.modality')}</span> {resultado.tipoManutencao}</p>
                      <p><span className="font-bold">{t('sim.equipment')}</span> {resultado.porteManutencao}</p>
                      {resultado.modoCalculo === 'agricola' && resultado.numHectares != null && (
                        <p><span className="font-bold">{t('sim.cycle')}</span> {resultado.numHectares} ha</p>
                      )}
                      {resultado.taxaDiagnosticoUSD > 0 && (
                        <div className="flex justify-between"><span>{t('sim.diagFee')}</span><span className="font-semibold">{formatarMoeda(resultado.taxaDiagnosticoUSD)}</span></div>
                      )}
                      {resultado.defeitosSelecionados.length > 0 && resultado.modoCalculo !== 'agricola' && (
                        <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                          <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>{t('sim.repairs')}</p>
                          {resultado.defeitosSelecionados.map(item => (
                            <div key={item.id} className="flex justify-between text-[11px] pl-2">
                              <span>+ {labelDe(item)}</span>
                              <span>{formatarMoeda(brlParaUSD(item.maxBRL ?? 0))}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {resultado.modoCalculo === 'agricola' && resultado.defeitosSelecionados.some(d => d.id === 'homologacao') && (
                        <div className="flex justify-between text-[11px]">
                          <span>{t('sim.homologation')}</span>
                          <span>{formatarMoeda(brlParaUSD(150))}</span>
                        </div>
                      )}
                      {resultado.adicionaisSelecionados.length > 0 && (
                        <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                          <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>{t('sim.extraConditions')}</p>
                          {resultado.adicionaisSelecionados.map(item => (
                            <div key={item.id} className="flex justify-between text-[11px] pl-2">
                              <span>+ {labelDe(item)}</span><span>{formatarMoeda(item.precoUSD)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-t-2 border-blue-500 pt-3 mt-3 flex justify-between text-sm font-extrabold text-blue-600">
                        <span>{t('sim.totalRef')}</span>
                        <span>{formatarMoeda(resultado.valorTotalUSD)}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t pt-3 text-[10px] leading-relaxed text-justify" style={{ borderColor: cardBorder, color: textMuted }}>
                  {resultado.modalidade === 'VOO' ? (
                    <p>
                      {t('sim.noticeFlight')}
                      {resultado.usandoFallbackSP ? ` ${t('sim.noticeFallbackSP')}` : ''}
                      {' '}{t('sim.noticeFlightRest')}
                    </p>
                  ) : (
                    <p>{t('sim.noticeMaint')}</p>
                  )}
                </div>

                <div className="border-t pt-3 mt-2" style={{ borderColor: cardBorder }}>
                  <h4 className="text-xs font-bold mb-2 text-center text-blue-600">{t('sim.receiveTitle')}</h4>
                  <form onSubmit={handleEnviarOrcamento} className="space-y-2">
                    <input type="text" placeholder={t('sim.namePh')} value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} className="w-full p-2 rounded-lg border text-xs" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <input type="email" placeholder={t('sim.emailPh')} value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} className="w-full p-2 rounded-lg border text-xs" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <input type="tel" placeholder={t('sim.phonePh')} value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} className="w-full p-2 rounded-lg border text-xs" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg shadow">{t('sim.send')}</button>
                  </form>
                </div>
                <button type="button" onClick={handleNovoOrcamento} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs font-bold py-2.5 rounded-lg">{t('sim.newQuote')}</button>
              </div>
            ) : (
              <div className="my-auto text-center py-8">
                <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: textMuted }}>{t('sim.empty')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorDuplo;