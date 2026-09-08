// ==========================================
// SimuladorDuplo.jsx
// Calculadora de Orçamentos (Voo + Manutenção)
// Versão completa adaptada para tema Claro / Escuro
// ==========================================

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from './Modal';

export const SimuladorDuplo = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [tab, setTab] = useState('voo');

  // Estados dos formulários
  const [tipoServico, setTipoServico] = useState('');
  const [categoriaDrone, setCategoriaDrone] = useState('');
  const [qtdFotos, setQtdFotos] = useState('');
  const [adicionais, setAdicionais] = useState([]);

  const [tipoManutencao, setTipoManutencao] = useState('');
  const [porteManutencao, setPorteManutencao] = useState('');
  const [defeitos, setDefeitos] = useState([]);

  const [resultado, setResultado] = useState(null);

  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');

  const limiteGratuito = 5;
  const [orcamentosRealizados, setOrcamentosRealizados] = useState(0);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const categoriasDrone = [
    { value: 'pesado', label: 'Porte Pesado (> 25kg) - Agrícola / Pulverização / Carga' },
    { value: 'subpesado', label: 'Porte Subpesado (2kg a 25kg) - Mapeamento / Laser (LiDAR)' },
    { value: 'medio', label: 'Porte Médio (250g a 2kg) - Inspeção / Filmagens Profissionais' },
    { value: 'leve', label: 'Porte Leve (< 250g) - Recreativo / Diversão / Fotos Básicas' }
  ];

  const opcionesAdicionalesVoo = [
    { id: 'noturno', label: 'Trabalho Noturno', preco: 200 },
    { id: 'urgencia', label: 'Urgência', preco: 250 },
    { id: 'pressao', label: 'Trabalho sob Pressão', preco: 150 },
    { id: 'remota', label: 'Área Remota', preco: 180 },
    { id: 'deslocamento', label: 'Deslocamento', preco: 120 },
    { id: 'bateria', label: 'Bateria Extra', preco: 80 },
    { id: 'relatorio', label: 'Relatório Técnico', preco: 300 },
    { id: 'seguro', label: 'Seguro Operacional', preco: 220 },
    { id: 'edicao', label: 'Edição das Imagens', preco: 250 }
  ];

  const opcionesDefeitosManutencao = [
    { id: 'gimbal', label: 'Conserto/Troca de Gimbal/Câmera', preco: 450 },
    { id: 'bracos', label: 'Troca de Braços / Shell / Carcaça', preco: 300 },
    { id: 'motores', label: 'Substituição de Motores / ESC', preco: 250 },
    { id: 'placa', label: 'Reparo em Placa Mãe / Módulo GPS', preco: 500 },
    { id: 'sensores', label: 'Calibração / Troca de Sensores', preco: 200 },
    { id: 'atualizacao', label: 'Atualização de Firmware & Testes', preco: 150 },
    { id: 'limpeza', label: 'Limpeza Química & Desoxidação', preco: 220 },
    { id: 'controle', label: 'Manutenção no Rádio Controle', preco: 180 },
    { id: 'urgencia_m', label: 'Serviço de Urgência Técnico', preco: 200 }
  ];

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleCheckboxVoo = (item) => {
    if (adicionais.some((a) => a.id === item.id)) {
      setAdicionais(adicionais.filter((a) => a.id !== item.id));
    } else {
      setAdicionais([...adicionais, item]);
    }
  };

  const handleCheckboxManutencao = (item) => {
    if (defeitos.some((d) => d.id === item.id)) {
      setDefeitos(defeitos.filter((d) => d.id !== item.id));
    } else {
      setDefeitos([...defeitos, item]);
    }
  };

  const handleNovoOrcamento = () => {
    setTipoServico('');
    setCategoriaDrone('');
    setQtdFotos('');
    setAdicionais([]);
    setTipoManutencao('');
    setPorteManutencao('');
    setDefeitos([]);
    setResultado(null);
    setNomeCliente('');
    setEmailCliente('');
    setTelefoneCliente('');
  };

  const handleSwitchTab = (newTab) => {
    setTab(newTab);
    setResultado(null);
  };

  const handleCalcularVoo = (e) => {
    e.preventDefault();

    if (orcamentosRealizados >= limiteGratuito) {
      setModalConfig({
        isOpen: true,
        title: 'Limite Atingido',
        message: `Você atingiu o limite gratuito de ${limiteGratuito} orçamentos.`,
        type: 'error'
      });
      return;
    }

    if (!tipoServico || !categoriaDrone || !qtdFotos) {
      setModalConfig({
        isOpen: true,
        title: 'Campos Obrigatórios',
        message: 'Por favor, preencha todos os campos obrigatórios (*)',
        type: 'error'
      });
      return;
    }

    const numFotos = parseInt(qtdFotos, 10) || 0;
    const valorUnitarioFoto = 1.5;
    const subtotalFotos = numFotos * valorUnitarioFoto;
    const desconto = numFotos > 540 ? subtotalFotos * 0.1 : 0;
    const totalFotosComDesconto = subtotalFotos - desconto;
    const totalAdicionais = adicionais.reduce((sum, item) => sum + item.preco, 0);
    const taxaBaseServico = 450.0;
    const valorTotal = taxaBaseServico + totalFotosComDesconto + totalAdicionais;

    const agora = new Date();
    const dataHoraCalculo =
      agora.toLocaleDateString('pt-BR') +
      ' às ' +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setResultado({
      modalidade: 'VOO',
      tipoServico,
      categoriaDrone: categoriasDrone.find((c) => c.value === categoriaDrone)?.label || categoriaDrone,
      numFotos,
      valorUnitarioFoto,
      subtotalFotos,
      desconto,
      adicionaisSelecionados: adicionais,
      taxaBaseServico,
      valorTotal,
      dataHoraCalculo
    });

    setOrcamentosRealizados((prev) => prev + 1);
  };

  const handleCalcularManutencao = (e) => {
    e.preventDefault();

    if (orcamentosRealizados >= limiteGratuito) {
      setModalConfig({
        isOpen: true,
        title: 'Limite Atingido',
        message: `Você atingiu o limite gratuito de ${limiteGratuito} orçamentos.`,
        type: 'error'
      });
      return;
    }

    if (!tipoManutencao || !porteManutencao) {
      setModalConfig({
        isOpen: true,
        title: 'Campos Obrigatórios',
        message: 'Por favor, selecione o Tipo de Manutenção e o Porte do Equipamento (*)',
        type: 'error'
      });
      return;
    }

    const taxaDiagnosticoBase = 180.0;
    const totalDefeitos = defeitos.reduce((sum, item) => sum + item.preco, 0);
    const valorTotal = taxaDiagnosticoBase + totalDefeitos;

    const agora = new Date();
    const dataHoraCalculo =
      agora.toLocaleDateString('pt-BR') +
      ' às ' +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setResultado({
      modalidade: 'MANUTENÇÃO',
      tipoManutencao,
      porteManutencao: categoriasDrone.find((c) => c.value === porteManutencao)?.label || porteManutencao,
      defeitosSelecionados: defeitos,
      taxaDiagnosticoBase,
      valorTotal,
      dataHoraCalculo
    });

    setOrcamentosRealizados((prev) => prev + 1);
  };

  const handleEnviarOrcamento = (e) => {
    e.preventDefault();
    if (!nomeCliente || (!emailCliente && !telefoneCliente)) {
      setModalConfig({
        isOpen: true,
        title: 'Dados Incompletos',
        message: 'Por favor, informe seu Nome e ao menos um meio de contato (E-mail ou Telefone).',
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

  // Cores dinâmicas
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
        {/* Cabeçalho */}
        <div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4"
          style={{ borderColor: cardBorder }}
        >
          <div>
            <h2 className="text-2xl font-black tracking-tight" style={{ color: textMain }}>
              Simulador de Orçamentos
            </h2>
            <p className="text-sm font-medium mt-0.5" style={{ color: textMuted }}>
              Calculadora de serviços operacionais e manutenção técnica.
            </p>
          </div>

          <div 
            className="flex p-1 rounded-xl border self-stretch sm:self-auto justify-center"
            style={{ backgroundColor: isDark ? '#0f172a' : '#f1f5f9', borderColor: cardBorder }}
          >
            <button
              type="button"
              onClick={() => handleSwitchTab('voo')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'voo' ? 'bg-blue-600 text-white shadow' : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SERVIÇOS DE VOO
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('manutencao')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'manutencao' ? 'bg-blue-600 text-white shadow' : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              MANUTENÇÃO & CONSERTOS
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* TAB VOO */}
          {tab === 'voo' && (
            <form onSubmit={handleCalcularVoo} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>TIPO DE SERVIÇO *</label>
                <select
                  value={tipoServico}
                  onChange={(e) => setTipoServico(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha o serviço...</option>
                  <option value="Mapeamento Aéreo / Fotogrametria">Mapeamento Aéreo / Fotogrametria</option>
                  <option value="Inspeção Visual Predial/Industrial">Inspeção Visual Predial/Industrial</option>
                  <option value="Filmagem e Fotografia Profissional">Filmagem e Fotografia Profissional</option>
                  <option value="Pulverização / Agrícola">Pulverização / Agrícola</option>
                  <option value="Contagem de Gado / Rebanho">Contagem de Gado / Rebanho</option>
                  <option value="Contagem de Ovinos / Caprinos">Contagem de Ovinos / Caprinos</option>
                  <option value="Contagem de Frutos / Pomares">Contagem de Frutos / Pomares</option>
                  <option value="Monitoramento de Saúde da Lavoura (NDVI)">Monitoramento de Saúde da Lavoura (NDVI)</option>
                  <option value="Mapeamento de Áreas de Pastagem">Mapeamento de Áreas de Pastagem</option>
                  <option value="Inspeção de Linhas de Transmissão / Torres">Inspeção de Linhas de Transmissão / Torres</option>
                  <option value="Levantamento Topográfico / Ortomosaico">Levantamento Topográfico / Ortomosaico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>CATEGORIA / PORTE DO DRONE *</label>
                <select
                  value={categoriaDrone}
                  onChange={(e) => setCategoriaDrone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha a categoria do drone...</option>
                  {categoriasDrone.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>QUANTIDADE ESTIMADA DE FOTOS *</label>
                <input
                  type="number"
                  placeholder="Ex: 1500 (digite apenas números)"
                  value={qtdFotos}
                  onChange={(e) => setQtdFotos(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                />
                <p className="text-[11px] font-bold mt-1" style={{ color: '#0077C8' }}>
                  Desconto de 10% aplicado só as fotos para pedidos acima de 540 fotos.
                </p>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>
                  SERVIÇOS E CONDIÇÕES ADICIONAIS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {opcionesAdicionalesVoo.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center p-2.5 rounded-lg border text-[11px] font-semibold cursor-pointer transition-colors"
                      style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    >
                      <input
                        type="checkbox"
                        checked={adicionais.some((a) => a.id === item.id)}
                        onChange={() => handleCheckboxVoo(item)}
                        className="mr-2 text-blue-600 rounded focus:ring-blue-500 h-4 w-4"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-all shadow">
                  CALCULAR ORÇAMENTO
                </button>
                <button type="button" onClick={handleNovoOrcamento} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors">
                  LIMPAR DADOS
                </button>
              </div>
            </form>
          )}

          {/* TAB MANUTENÇÃO */}
          {tab === 'manutencao' && (
            <form onSubmit={handleCalcularManutencao} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: labelColor }}>TIPO DE MANUTENÇÃO *</label>
                <select
                  value={tipoManutencao}
                  onChange={(e) => setTipoManutencao(e.target.value)}
                  className="w-full p-2.5 rounded-lg border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
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
                  className="w-full p-2.5 rounded-lg border text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                  style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                >
                  <option value="">Escolha o porte para a manutenção...</option>
                  {categoriasDrone.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-center mb-3" style={{ color: labelColor }}>
                  DEFEITOS DETECTADOS / SERVIÇOS TÉCNICOS NECESSÁRIOS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {opcionesDefeitosManutencao.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center p-2.5 rounded-lg border text-[11px] font-semibold cursor-pointer transition-colors"
                      style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                    >
                      <input
                        type="checkbox"
                        checked={defeitos.some((d) => d.id === item.id)}
                        onChange={() => handleCheckboxManutencao(item)}
                        className="mr-2 text-blue-600 rounded focus:ring-blue-500 h-4 w-4"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-all shadow">
                  CALCULAR MANUTENÇÃO
                </button>
                <button type="button" onClick={handleNovoOrcamento} className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors">
                  LIMPAR DADOS
                </button>
              </div>
            </form>
          )}

          {/* PAINEL DE RESULTADO */}
          <div 
            className="lg:col-span-5 border-2 border-dashed rounded-2xl p-5 flex flex-col justify-between min-h-[380px]"
            style={{ 
              borderColor: isDark ? '#475569' : '#cbd5e1',
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.6)' : '#f8fafc'
            }}
          >
            <div className="mb-4 text-center">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="text-blue-600 text-xs font-extrabold tracking-wide uppercase">
                  ORÇAMENTOS REALIZADOS:{' '}
                  <span className="text-sm px-2 py-0.5 bg-blue-600 text-white rounded-md ml-1">
                    {orcamentosRealizados} / {limiteGratuito}
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium mt-3 px-2 leading-relaxed" style={{ color: textMuted }}>
                cadastrados em <span className="font-bold text-blue-500">orientese.com</span> tem cálculo de orçamentos ilimitados
              </p>
            </div>

            {resultado ? (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="border-b pb-2 text-center" style={{ borderColor: cardBorder }}>
                    <h3 className="text-xs font-black uppercase tracking-wider text-blue-500">
                      DEMONSTRATIVO DE ORÇAMENTO ({resultado.modalidade})
                    </h3>
                    <p className="text-[10px]" style={{ color: textMuted }}>Gerado em: {resultado.dataHoraCalculo}</p>
                  </div>

                  <div className="text-xs space-y-2 mt-3" style={{ color: textMain }}>
                    {resultado.modalidade === 'VOO' ? (
                      <>
                        <p className="border-b pb-1" style={{ borderColor: cardBorder }}>
                          <span className="font-bold">Serviço:</span> {resultado.tipoServico}
                        </p>
                        <p className="border-b pb-1" style={{ borderColor: cardBorder }}>
                          <span className="font-bold">Equipamento:</span> {resultado.categoriaDrone}
                        </p>
                        <div className="flex justify-between items-center">
                          <span>Qtd. Fotos ({resultado.numFotos}x {formatarMoeda(resultado.valorUnitarioFoto)}):</span>
                          <span className="font-semibold">{formatarMoeda(resultado.subtotalFotos)}</span>
                        </div>
                        {resultado.desconto > 0 && (
                          <div className="flex justify-between items-center text-green-600 font-bold">
                            <span>Desconto (&gt;540 fotos):</span>
                            <span>- {formatarMoeda(resultado.desconto)}</span>
                          </div>
                        )}
                        {resultado.adicionaisSelecionados.length > 0 && (
                          <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                            <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>Adicionais:</p>
                            {resultado.adicionaisSelecionados.map((item) => (
                              <div key={item.id} className="flex justify-between text-[11px] pl-2">
                                <span>+ {item.label}</span>
                                <span>{formatarMoeda(item.preco)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex justify-between pt-1">
                          <span>Taxa Base Operacional:</span>
                          <span>{formatarMoeda(resultado.taxaBaseServico)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="border-b pb-1" style={{ borderColor: cardBorder }}>
                          <span className="font-bold">Modalidade:</span> {resultado.tipoManutencao}
                        </p>
                        <p className="border-b pb-1" style={{ borderColor: cardBorder }}>
                          <span className="font-bold">Equipamento:</span> {resultado.porteManutencao}
                        </p>
                        <div className="flex justify-between items-center">
                          <span>Taxa Diagnóstico de Bancada:</span>
                          <span className="font-semibold">{formatarMoeda(resultado.taxaDiagnosticoBase)}</span>
                        </div>
                        {resultado.defeitosSelecionados.length > 0 && (
                          <div className="pt-1 border-t space-y-1" style={{ borderColor: cardBorder }}>
                            <p className="font-bold text-[10px] uppercase" style={{ color: textMuted }}>Serviços/Consertos Selecionados:</p>
                            {resultado.defeitosSelecionados.map((item) => (
                              <div key={item.id} className="flex justify-between text-[11px] pl-2">
                                <span>+ {item.label}</span>
                                <span>{formatarMoeda(item.preco)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    <div className="border-t-2 border-blue-500 pt-2 mt-2 flex justify-between text-sm font-extrabold text-blue-600">
                      <span>VALOR TOTAL ESTIMADO:</span>
                      <span>{formatarMoeda(resultado.valorTotal)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3 text-[10px] space-y-1 leading-normal text-justify mt-3" style={{ borderColor: cardBorder, color: textMuted }}>
                    <p>
                      <strong>Aviso Importante:</strong> Este orçamento possui caráter estritamente <em>referencial e informativo</em>.
                    </p>
                  </div>

                  {/* Formulário de envio */}
                  <div className="border-t pt-3 mt-3" style={{ borderColor: cardBorder }}>
                    <h4 className="text-xs font-bold mb-2 text-center text-blue-600">
                      RECEBER ESTE ORÇAMENTO
                    </h4>
                    <form onSubmit={handleEnviarOrcamento} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Seu Nome Completo *"
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                        className="w-full p-2 rounded-lg border text-xs outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                      />
                      <input
                        type="email"
                        placeholder="Seu E-Mail principal"
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                        className="w-full p-2 rounded-lg border text-xs outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp / Telegram (DDD + Nº)"
                        value={telefoneCliente}
                        onChange={(e) => setTelefoneCliente(e.target.value)}
                        className="w-full p-2 rounded-lg border text-xs outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                      />
                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow mt-1"
                      >
                        ENVIAR DEMONSTRATIVO
                      </button>
                    </form>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNovoOrcamento}
                  className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  NOVO ORÇAMENTO
                </button>
              </div>
            ) : (
              <div className="my-auto text-center py-6">
                <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: textMuted }}>
                  Preencha os dados no formulário ao lado e clique em{' '}
                  <strong className="text-blue-500">Calcular Orçamento</strong> para visualizar o demonstrativo completo aqui.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Parceiros */}
      <div className="my-8">
        <h3 className="text-center text-xs font-bold tracking-widest uppercase mb-4" style={{ color: textMuted }}>
          PARCEIROS COMERCIAIS / PATROCINADORES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="border-2 border-dashed rounded-xl p-4 text-center"
              style={{ 
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#475569' : '#cbd5e1'
              }}
            >
              <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded mb-2">
                Espaço Disponível
              </span>
              <h4 className="text-xs font-bold mb-1" style={{ color: textMain }}>Espaço para Anunciante</h4>
              <p className="text-[11px]" style={{ color: textMuted }}>
                Anuncie aqui seus produtos ou serviços.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimuladorDuplo;