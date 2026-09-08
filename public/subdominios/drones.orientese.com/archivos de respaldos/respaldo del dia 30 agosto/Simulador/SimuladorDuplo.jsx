// ==========================================
// SimuladorDuplo.jsx
// Versão 01/09/2026 - Correções Testes 1, 2 e 3
// ==========================================

import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Modal from '../Modal';
import {
  CATEGORIAS_DRONE,
  ADICIONAIS_VOO,
  DEFEITOS_MANUTENCAO,
  PPP_FACTORES,
  PAISES,
  ESTADOS_BRASIL,
  TASAS_CAMBIO_APROX
} from './constants';
import pricesData from './prices.json';
import './SimuladorDuplo.css';

const LIMITE_GRATUITO = 5;

export const SimuladorDuplo = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [tab, setTab] = useState('voo');
  const [pais, setPais] = useState('BR');
  const [estado, setEstado] = useState('SP');
  const [idioma, setIdioma] = useState('pt');

  // Formulário VOO
  const [tipoServico, setTipoServico] = useState('');
  const [categoriaDrone, setCategoriaDrone] = useState('');
  const [qtdFotos, setQtdFotos] = useState('');
  const [hectares, setHectares] = useState('');
  const [adicionais, setAdicionais] = useState([]);

  // Formulário MANUTENÇÃO
  const [tipoManutencao, setTipoManutencao] = useState('');
  const [porteManutencao, setPorteManutencao] = useState('');
  const [defeitos, setDefeitos] = useState([]);

  const [resultado, setResultado] = useState(null);
  const [orcamentosRealizados, setOrcamentosRealizados] = useState(0);

  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

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
      style: 'currency',
      currency: paisInfo.moeda,
      maximumFractionDigits: 0
    }).format(valorLocal);
  };

  const brlParaUSD = (valorBRL) => valorBRL / taxaCambioRef;

  // Preço unitário da foto em USD (para exibir)
  const precoUnitarioFotoUSD = brlParaUSD(pricesData.taxasGlobais.valorFotoBRL);

  const handleCheckboxVoo = (item) => {
    setAdicionais(prev =>
      prev.some(a => a.id === item.id)
        ? prev.filter(a => a.id !== item.id)
        : [...prev, item]
    );
  };

  const handleCheckboxManutencao = (item) => {
    setDefeitos(prev =>
      prev.some(d => d.id === item.id)
        ? prev.filter(d => d.id !== item.id)
        : [...prev, item]
    );
  };

  const handleNovoOrcamento = () => {
    setTipoServico('');
    setCategoriaDrone('');
    setQtdFotos('');
    setHectares('');
    setAdicionais([]);
    setTipoManutencao('');
    setPorteManutencao('');
    setDefeitos([]);
    setResultado(null);
  };

  const handleSwitchTab = (newTab) => {
    setTab(newTab);
    setResultado(null);
  };

  const verificarLimite = () => {
    if (orcamentosRealizados >= LIMITE_GRATUITO) {
      setModalConfig({
        isOpen: true,
        title: 'Limite Atingido',
        message: `Você atingiu o limite gratuito de ${LIMITE_GRATUITO} orçamentos por dia. Usuários cadastrados em orientese.com têm cálculos ilimitados.`,
        type: 'error'
      });
      return false;
    }
    return true;
  };

  const handleCalcularVoo = (e) => {
    e.preventDefault();
    if (!verificarLimite()) return;

    if (!tipoServico || !categoriaDrone) {
      setModalConfig({
        isOpen: true,
        title: 'Campos Obrigatórios',
        message: 'Preencha o Tipo de Serviço e a Categoria do Drone.',
        type: 'error'
      });
      return;
    }

    if (precisaHectares && (!hectares || parseFloat(hectares) <= 0)) {
      setModalConfig({
        isOpen: true,
        title: 'Hectares Obrigatórios',
        message: 'Informe a quantidade de hectares a serem trabalhados.',
        type: 'error'
      });
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

    // ========== LÓGICA POR TIPO DE SERVIÇO ==========
    if (servicoAtual.tipo === 'diaria') {
      const valorServicoUSD = brlParaUSD(servicoAtual.referenciaBRL);
      cenarios.push({
        label: `Por ${servicoAtual.unidade}`,
        valorServicoUSD,
        totalUSD: valorServicoUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD,
        tipoAeronave: 'com'
      });
    }

    else if (servicoAtual.tipo === 'hectare') {
      const valorServicoUSD = numHectares * brlParaUSD(servicoAtual.referenciaBRL);
      cenarios.push({
        label: `Por hectare (${numHectares} ha)`,
        valorServicoUSD,
        totalUSD: valorServicoUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD,
        tipoAeronave: 'com'
      });
    }

    else if (servicoAtual.tipo === 'hectare_variantes') {
      // Pulverização – tem os dois valores reais
      temVarianteAeronave = true;
      Object.entries(servicoAtual.variantes).forEach(([key, variante]) => {
        const valorServicoUSD = numHectares * brlParaUSD(variante.referenciaBRL);
        cenarios.push({
          label: variante.label,
          valorServicoUSD,
          totalUSD: valorServicoUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD,
          tipoAeronave: key === 'comAeronave' ? 'com' : 'sem'
        });
      });
    }

    else if (servicoAtual.tipo === 'misto') {
      // Diária
      const valorDiariaUSD = brlParaUSD(servicoAtual.diaria.referenciaBRL);
      cenarios.push({
        label: servicoAtual.diaria.label,
        valorServicoUSD: valorDiariaUSD,
        totalUSD: valorDiariaUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD,
        tipoAeronave: 'com'
      });

      // Hectare
      const valorHaUSD = numHectares * brlParaUSD(servicoAtual.hectare.referenciaBRL);
      cenarios.push({
        label: `${servicoAtual.hectare.label} (${numHectares} ha)`,
        valorServicoUSD: valorHaUSD,
        totalUSD: valorHaUSD + taxaBaseUSD + subtotalFotosUSD + totalAdicionaisUSD,
        tipoAeronave: 'com'
      });
    }

    const agora = new Date();
    const dataHoraCalculo = agora.toLocaleString(paisInfo.locale, {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    setResultado({
      modalidade: 'VOO',
      tipoServico,
      categoriaDrone: CATEGORIAS_DRONE.find(c => c.value === categoriaDrone)?.label || categoriaDrone,
      numFotos,
      numHectares,
      precoUnitarioFotoUSD,
      subtotalFotosUSD,
      adicionaisSelecionados: adicionais,
      taxaBaseServicoUSD: taxaBaseUSD,
      cenarios,
      legendaServico,
      temVarianteAeronave,
      dataHoraCalculo,
      pais: paisInfo.nome,
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
      setModalConfig({
        isOpen: true,
        title: 'Campos Obrigatórios',
        message: 'Selecione o Tipo de Manutenção e o Porte do Equipamento.',
        type: 'error'
      });
      return;
    }

    const totalDefeitosUSD = defeitos.reduce((sum, item) => sum + item.precoUSD, 0);
    const taxaDiagnosticoUSD = brlParaUSD(pricesData.taxasGlobais.taxaDiagnosticoBRL);
    const valorTotalUSD = taxaDiagnosticoUSD + totalDefeitosUSD;

    const agora = new Date();
    const dataHoraCalculo = agora.toLocaleString(paisInfo.locale, {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    setResultado({
      modalidade: 'MANUTENÇÃO',
      tipoManutencao,
      porteManutencao: CATEGORIAS_DRONE.find(c => c.value === porteManutencao)?.label || porteManutencao,
      defeitosSelecionados: defeitos,
      taxaDiagnosticoUSD,
      valorTotalUSD,
      dataHoraCalculo,
      pais: paisInfo.nome,
      moeda: paisInfo.moeda,
      estimativa: true
    });

    setOrcamentosRealizados(prev => prev + 1);
  };

  const handleEnviarOrcamento = (e) => {
    e.preventDefault();
    if (!nomeCliente || (!emailCliente && !telefoneCliente)) {
      setModalConfig({
        isOpen: true,
        title: 'Dados Incompletos',
        message: 'Informe seu Nome e ao menos um meio de contato (E-mail ou Telefone).',
        type: 'error'
      });
      return;
    }

    setModalConfig({
      isOpen: true,
      title: 'Sucesso!',
      message: `Orçamento enviado com sucesso para ${nomeCliente}!`,
      type: 'success'
    });
  };

  // Estilos
  const cardBg = isDark ? '#1e293b' : '#ffffff';
  const cardBorder = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const labelColor = isDark ? '#e2e8f0' : '#334155';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8" style={{ color: textMain }}>
      <Modal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        type={modalConfig.type}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      >
        {modalConfig.message}
      </Modal>

      <div
        className="rounded-2xl p-6 shadow-md transition-all"
        style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}
      >
        {/* HEADER */}
        <div className="border-b pb-5 mb-6" style={{ borderColor: cardBorder }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight" style={{ color: textMain }}>
                Simulador de Orçamentos
              </h2>
              <p className="text-sm font-medium mt-1" style={{ color: textMuted }}>
                Valores referenciais • Ajustados ao país e moeda local
              </p>
            </div>

            <div
              className="flex p-1 rounded-xl border self-start"
              style={{ backgroundColor: isDark ? '#0f172a' : '#f1f5f9', borderColor: cardBorder }}
            >
              <button
                type="button"
                onClick={() => handleSwitchTab('voo')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === 'voo' ? 'bg-blue-600 text-white shadow' : isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                SERVIÇOS DE VOO
              </button>
              <button
                type="button"
                onClick={() => handleSwitchTab('manutencao')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === 'manutencao' ? 'bg-blue-600 text-white shadow' : isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                MANUTENÇÃO & CONSERTOS
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold whitespace-nowrap" style={{ color: labelColor }}>PAÍS:</label>
              <select
                value={pais}
                onChange={(e) => {
                  setPais(e.target.value);
                  if (e.target.value !== 'BR') setEstado('SP');
                }}
                className="p-2 rounded-lg border text-xs font-medium min-w-[170px]"
                style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
              >
                {PAISES.map(p => (
                  <option key={p.code} value={p.code}>{p.nome} ({p.moeda})</option>
                ))}
              </select>
            </div>

            {pais === 'BR' && (
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold whitespace-nowrap" style={{ color: labelColor }}>ESTADO:</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="p-2 rounded-lg border text-xs font-medium min-w-[180px]"
                  style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  {ESTADOS_BRASIL.map(e => (
                    <option key={e.code} value={e.code}>{e.nome}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold whitespace-nowrap" style={{ color: labelColor }}>IDIOMA:</label>
              <select
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
                className="p-2 rounded-lg border text-xs font-medium min-w-[130px]"
                style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
              >
                <option value="pt">Português</option>
                <option value="es">Castellano</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FORMULÁRIO VOO */}
          {tab === 'voo' && (
            <form onSubmit={handleCalcularVoo} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>TIPO DE SERVIÇO *</label>
                <select
                  value={tipoServico}
                  onChange={(e) => {
                    setTipoServico(e.target.value);
                    setHectares('');
                    setResultado(null);
                  }}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium"
                  style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha o serviço...</option>
                  {Object.keys(precosEstado).filter(k => !k.startsWith('_')).map(servico => (
                    <option key={servico} value={servico}>{servico}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>CATEGORIA / PORTE DO DRONE *</label>
                <select
                  value={categoriaDrone}
                  onChange={(e) => setCategoriaDrone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium"
                  style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha a categoria do drone...</option>
                  {CATEGORIAS_DRONE.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {precisaHectares && (
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>QUANTIDADE DE HECTARES *</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Ex: 50.5"
                      value={hectares}
                      onChange={(e) => setHectares(e.target.value)}
                      className="w-full p-2.5 rounded-lg border text-xs font-medium"
                      style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    />
                    <p className="text-[11px] mt-1" style={{ color: '#0077C8' }}>Necessário para cálculo por hectare.</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>QUANTIDADE ESTIMADA DE FOTOS</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Ex: 800 (opcional)"
                    value={qtdFotos}
                    onChange={(e) => setQtdFotos(e.target.value)}
                    className="w-full p-2.5 rounded-lg border text-xs font-medium"
                    style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                  />
                </div>
              </div>

              {servicoAtual?.legenda && (
                <div className="p-3 rounded-lg text-[11px] leading-relaxed" style={{ backgroundColor: isDark ? '#0f172a' : '#f0f9ff', color: textMuted, border: `1px solid ${cardBorder}` }}>
                  {servicoAtual.legenda}
                </div>
              )}

              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>
                  SERVIÇOS E CONDIÇÕES ADICIONAIS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ADICIONAIS_VOO.map(item => (
                    <label
                      key={item.id}
                      className="flex items-center p-2.5 rounded-lg border text-[11px] font-semibold cursor-pointer"
                      style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    >
                      <input
                        type="checkbox"
                        checked={adicionais.some(a => a.id === item.id)}
                        onChange={() => handleCheckboxVoo(item)}
                        className="mr-2 h-4 w-4"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow">
                  CALCULAR ORÇAMENTO
                </button>
                <button type="button" onClick={handleNovoOrcamento} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2.5 px-3 rounded-lg text-xs">
                  LIMPAR DADOS
                </button>
              </div>
            </form>
          )}

          {/* FORMULÁRIO MANUTENÇÃO */}
          {tab === 'manutencao' && (
            <form onSubmit={handleCalcularManutencao} className="lg:col-span-7 space-y-4">
              {/* ... (mantém igual ao anterior) */}
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>TIPO DE MANUTENÇÃO *</label>
                <select
                  value={tipoManutencao}
                  onChange={(e) => setTipoManutencao(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium"
                  style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha a modalidade técnica...</option>
                  <option value="Manutenção Preventiva Geral">Manutenção Preventiva Geral (Revisão)</option>
                  <option value="Manutenção Corretiva (Reparo pós-queda)">Manutenção Corretiva (Reparo após Queda/Avaria)</option>
                  <option value="Diagnóstico de Bancada e Perícia">Diagnóstico Técnico de Bancada</option>
                  <option value="Customização e Instalação de Acessórios">Customização / Instalação de Módulos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>PORTE / CATEGORIA DO EQUIPAMENTO *</label>
                <select
                  value={porteManutencao}
                  onChange={(e) => setPorteManutencao(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium"
                  style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha o porte...</option>
                  {CATEGORIAS_DRONE.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>
                  DEFEITOS / SERVIÇOS TÉCNICOS NECESSÁRIOS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {DEFEITOS_MANUTENCAO.map(item => (
                    <label
                      key={item.id}
                      className="flex items-center p-2.5 rounded-lg border text-[11px] font-semibold cursor-pointer"
                      style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    >
                      <input
                        type="checkbox"
                        checked={defeitos.some(d => d.id === item.id)}
                        onChange={() => handleCheckboxManutencao(item)}
                        className="mr-2 h-4 w-4"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow">
                  CALCULAR MANUTENÇÃO
                </button>
                <button type="button" onClick={handleNovoOrcamento} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2.5 px-3 rounded-lg text-xs">
                  LIMPAR DADOS
                </button>
              </div>
            </form>
          )}

          {/* ===================== RESULTADO ===================== */}
          <div
            className="lg:col-span-5 border-2 border-dashed rounded-2xl p-5 flex flex-col min-h-[420px]"
            style={{
              borderColor: isDark ? '#475569' : '#cbd5e1',
              backgroundColor: isDark ? 'rgba(30,41,59,0.6)' : '#f8fafc'
            }}
          >
            <div className="mb-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="text-blue-600 text-xs font-extrabold uppercase">
                  ORÇAMENTOS HOJE:{' '}
                  <span className="text-sm px-2 py-0.5 bg-blue-600 text-white rounded-md ml-1">
                    {orcamentosRealizados} / {LIMITE_GRATUITO}
                  </span>
                </div>
              </div>
            </div>

            {resultado ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="border-b pb-2 text-center" style={{ borderColor: cardBorder }}>
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-500">
                    DEMONSTRATIVO REFERENCIAL ({resultado.modalidade})
                  </h3>
                  <p className="text-[10px]" style={{ color: textMuted }}>
                    Gerado em {resultado.dataHoraCalculo} • {resultado.pais}
                    {resultado.estado ? ` - ${resultado.estado}` : ''} ({resultado.moeda})
                  </p>
                </div>

                <div className="text-xs space-y-2" style={{ color: textMain }}>
                  {resultado.modalidade === 'VOO' ? (
                    <>
                      <p><span className="font-bold">Serviço:</span> {resultado.tipoServico}</p>
                      <p><span className="font-bold">Equipamento:</span> {resultado.categoriaDrone}</p>

                      {/* FOTOS COM PREÇO UNITÁRIO */}
                      {resultado.numFotos > 0 && (
                        <div className="flex justify-between">
                          <span>
                            Fotos ({resultado.numFotos} × {formatarMoeda(resultado.precoUnitarioFotoUSD)}):
                          </span>
                          <span className="font-semibold">
                            {formatarMoeda(resultado.subtotalFotosUSD)}
                          </span>
                        </div>
                      )}

                      {resultado.adicionaisSelecionados.length > 0 && (
                        <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                          <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>Adicionais:</p>
                          {resultado.adicionaisSelecionados.map(item => (
                            <div key={item.id} className="flex justify-between text-[11px] pl-2">
                              <span>+ {item.label}</span>
                              <span>{formatarMoeda(item.precoUSD)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Taxa Base Operacional:</span>
                        <span>{formatarMoeda(resultado.taxaBaseServicoUSD)}</span>
                      </div>

                      {/* CENÁRIOS */}
                      <div className="pt-3 mt-2 border-t-2 border-blue-500 space-y-3">
                        <p className="font-bold text-[11px] uppercase text-blue-600">
                          {resultado.cenarios.length > 1 ? 'Cenários de Cobrança:' : 'Valor do Serviço:'}
                        </p>

                        {resultado.cenarios.map((cenario, idx) => (
                          <div key={idx} className="p-3 rounded-lg" style={{ backgroundColor: isDark ? '#0f172a' : '#f0f9ff' }}>
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-semibold text-[12px]">{cenario.label}</span>
                              <span className="font-extrabold text-blue-600 text-sm whitespace-nowrap">
                                {formatarMoeda(cenario.totalUSD)}
                              </span>
                            </div>
                          </div>
                        ))}

                        {/* Legenda de aeronave quando NÃO tem variante real */}
                        {!resultado.temVarianteAeronave && (
                          <p className="text-[10px] italic mt-1" style={{ color: textMuted }}>
                            Valores calculados considerando piloto com equipamentos/aeronave própria.  
                            Caso o piloto <strong>não possua aeronave própria</strong>, consulte-o para possível ajuste de preço.
                          </p>
                        )}
                      </div>

                      {resultado.legendaServico && (
                        <p className="text-[10px] mt-2 italic" style={{ color: textMuted }}>
                          {resultado.legendaServico}
                        </p>
                      )}
                    </>
                  ) : (
                    // MANUTENÇÃO (igual)
                    <>
                      <p><span className="font-bold">Modalidade:</span> {resultado.tipoManutencao}</p>
                      <p><span className="font-bold">Equipamento:</span> {resultado.porteManutencao}</p>
                      <div className="flex justify-between">
                        <span>Taxa Diagnóstico:</span>
                        <span className="font-semibold">{formatarMoeda(resultado.taxaDiagnosticoUSD)}</span>
                      </div>
                      {resultado.defeitosSelecionados.length > 0 && (
                        <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                          <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>Serviços/Consertos:</p>
                          {resultado.defeitosSelecionados.map(item => (
                            <div key={item.id} className="flex justify-between text-[11px] pl-2">
                              <span>+ {item.label}</span>
                              <span>{formatarMoeda(item.precoUSD)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-t-2 border-blue-500 pt-3 mt-3 flex justify-between text-sm font-extrabold text-blue-600">
                        <span>VALOR TOTAL REFERENCIAL:</span>
                        <span>{formatarMoeda(resultado.valorTotalUSD)}</span>
                      </div>
                      {resultado.estimativa && (
                        <p className="text-[10px] mt-1 italic" style={{ color: textMuted }}>
                          * Valores de manutenção são estimativas gerais. Confirme com o técnico.
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* AVISO IMPORTANTE */}
                <div className="border-t pt-3 text-[10px] leading-relaxed text-justify" style={{ borderColor: cardBorder, color: textMuted }}>
                  <p>
                    <strong>Aviso Importante:</strong> Este valor é <em>estritamente referencial e orientativo</em>, 
                    baseado no mercado de São Paulo (2026).
                    {resultado.usandoFallbackSP && ' Os preços do seu estado ainda não possuem referência específica e estão usando São Paulo como base.'}
                    {' '}O preço final pode <strong>subir ou baixar</strong> conforme experiência do piloto, 
                    equipamentos, forma de cobrança (diária × hectare), volume de produto, distância, 
                    urgência, complexidade e negociação entre as partes.
                  </p>
                </div>

                {/* Formulário de envio */}
                <div className="border-t pt-3 mt-2" style={{ borderColor: cardBorder }}>
                  <h4 className="text-xs font-bold mb-2 text-center text-blue-600">RECEBER ESTE ORÇAMENTO</h4>
                  <form onSubmit={handleEnviarOrcamento} className="space-y-2">
                    <input type="text" placeholder="Seu Nome Completo *" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} className="w-full p-2 rounded-lg border text-xs" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <input type="email" placeholder="E-mail" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} className="w-full p-2 rounded-lg border text-xs" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <input type="tel" placeholder="WhatsApp / Telegram" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} className="w-full p-2 rounded-lg border text-xs" style={{ backgroundColor: '#fff', color: '#0f172a', borderColor: '#cbd5e1' }} />
                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg shadow">
                      ENVIAR DEMONSTRATIVO
                    </button>
                  </form>
                </div>

                <button type="button" onClick={handleNovoOrcamento} className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs font-bold py-2.5 rounded-lg">
                  NOVO ORÇAMENTO
                </button>
              </div>
            ) : (
              <div className="my-auto text-center py-8">
                <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: textMuted }}>
                  Preencha os dados e clique em <strong className="text-blue-500">Calcular</strong> para ver o demonstrativo detalhado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorDuplo;