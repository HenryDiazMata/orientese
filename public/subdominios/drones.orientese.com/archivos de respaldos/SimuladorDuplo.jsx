import React, { useState } from 'react';

export const SimuladorDuplo = () => {
  // Pestañas de modo ('voo' | 'manutencao')
  const [tab, setTab] = useState('voo');

  // ==========================================
  // ESTADOS PARA SERVIÇOS DE VOO
  // ==========================================
  const [tipoServico, setTipoServico] = useState('');
  const [categoriaDrone, setCategoriaDrone] = useState('');
  const [qtdFotos, setQtdFotos] = useState('');
  const [adicionais, setAdicionais] = useState([]);

  // ==========================================
  // ESTADOS PARA MANUTENÇÃO & CONSERTOS
  // ==========================================
  const [tipoManutencao, setTipoManutencao] = useState('');
  const [porteManutencao, setPorteManutencao] = useState('');
  const [defeitos, setDefeitos] = useState([]);

  // Resultado del cálculo activo
  const [resultado, setResultado] = useState(null);

  // Estados del Formulario de Envío
  const [nomeCliente, setNomeCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');

  // ==========================================
  // CONFIGURACIÓN DE LÍMITE Y CÁLCULOS
  // ==========================================
  const limiteGratuito = 5; 
  const [orcamentosRealizados, setOrcamentosRealizados] = useState(0);

  // Categorías de drones
  const categoriasDrone = [
    { value: 'pesado', label: 'Porte Pesado (> 25kg) - Agrícola / Pulverização / Carga' },
    { value: 'subpesado', label: 'Porte Subpesado (2kg a 25kg) - Mapeamento / Laser (LiDAR)' },
    { value: 'medio', label: 'Porte Médio (250g a 2kg) - Inspeção / Filmagens Profissionais' },
    { value: 'leve', label: 'Porte Leve (< 250g) - Recreativo / Diversão / Fotos Básicas' }
  ];

  // Adicionales de Voo
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

  // Reparaciones / Defectos de Manutenção
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

  // Formateador BRL estilo Brasil
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Manejo de Checkboxes de Voo
  const handleCheckboxVoo = (item) => {
    if (adicionais.some(a => a.id === item.id)) {
      setAdicionais(adicionais.filter(a => a.id !== item.id));
    } else {
      setAdicionais([...adicionais, item]);
    }
  };

  // Manejo de Checkboxes de Manutenção
  const handleCheckboxManutencao = (item) => {
    if (defeitos.some(d => d.id === item.id)) {
      setDefeitos(defeitos.filter(d => d.id !== item.id));
    } else {
      setDefeitos([...defeitos, item]);
    }
  };

  // Función Limpiar Campos / Nuevo Presupuesto
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

  // Cambio de Pestaña
  const handleSwitchTab = (newTab) => {
    setTab(newTab);
    setResultado(null);
  };

  // CÁLCULO DE VOO
  const handleCalcularVoo = (e) => {
    e.preventDefault();
    if (orcamentosRealizados >= limiteGratuito) {
      alert(`Você atingiu o limite gratuito de ${limiteGratuito} orçamentos.`);
      return;
    }

    if (!tipoServico || !categoriaDrone || !qtdFotos) {
      alert('Por favor, preencha todos os campos obrigatórios (*)');
      return;
    }

    const numFotos = parseInt(qtdFotos) || 0;
    const valorUnitarioFoto = 1.50;
    const subtotalFotos = numFotos * valorUnitarioFoto;
    let desconto = numFotos > 540 ? subtotalFotos * 0.10 : 0;
    const totalFotosComDesconto = subtotalFotos - desconto;
    const totalAdicionais = adicionais.reduce((sum, item) => sum + item.preco, 0);
    const taxaBaseServico = 450.00;
    const valorTotal = taxaBaseServico + totalFotosComDesconto + totalAdicionais;

    const agora = new Date();
    const dataHoraCalculo = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setResultado({
      modalidade: 'VOO',
      tipoServico,
      categoriaDrone: categoriasDrone.find(c => c.value === categoriaDrone)?.label || categoriaDrone,
      numFotos,
      valorUnitarioFoto,
      subtotalFotos,
      desconto,
      adicionaisSelecionados: adicionais,
      taxaBaseServico,
      valorTotal,
      dataHoraCalculo
    });

    setOrcamentosRealizados(prev => prev + 1);
  };

  // CÁLCULO DE MANUTENÇÃO
  const handleCalcularManutencao = (e) => {
    e.preventDefault();
    if (orcamentosRealizados >= limiteGratuito) {
      alert(`Você atingiu o limite gratuito de ${limiteGratuito} orçamentos.`);
      return;
    }

    if (!tipoManutencao || !porteManutencao) {
      alert('Por favor, selecione o Tipo de Manutenção e o Porte do Equipamento (*)');
      return;
    }

    const taxaDiagnosticoBase = 180.00;
    const totalDefeitos = defeitos.reduce((sum, item) => sum + item.preco, 0);
    const valorTotal = taxaDiagnosticoBase + totalDefeitos;

    const agora = new Date();
    const dataHoraCalculo = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setResultado({
      modalidade: 'MANUTENÇÃO',
      tipoManutencao,
      porteManutencao: categoriasDrone.find(c => c.value === porteManutencao)?.label || porteManutencao,
      defeitosSelecionados: defeitos,
      taxaDiagnosticoBase,
      valorTotal,
      dataHoraCalculo
    });

    setOrcamentosRealizados(prev => prev + 1);
  };

  const handleEnviarOrcamento = (e) => {
    e.preventDefault();
    if (!nomeCliente || (!emailCliente && !telefoneCliente)) {
      alert('Por favor, informe seu Nome e ao menos um meio de contato (E-mail ou Telefone).');
      return;
    }
    alert(`Orçamento enviado com sucesso para ${nomeCliente}!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* CARD PRINCIPAL */}
      <div className="card-theme rounded-2xl p-6 shadow-md border transition-all">
        
        {/* Encabezado y Selector de Modo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Simulador de Orçamentos</h2>
            <p className="text-sm opacity-75 font-medium mt-0.5">
              Calculadora de serviços operacionais e manutenção técnica.
            </p>
          </div>

          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 self-stretch sm:self-auto justify-center">
            <button 
              type="button"
              onClick={() => handleSwitchTab('voo')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'voo' 
                  ? 'bg-blue-600 text-white shadow' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              ✈️ SERVIÇOS DE VOO
            </button>
            <button 
              type="button"
              onClick={() => handleSwitchTab('manutencao')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'manutencao' 
                  ? 'bg-blue-600 text-white shadow' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'
              }`}
            >
              ⚙️ MANUTENÇÃO & CONSERTOS
            </button>
          </div>
        </div>

        {/* Grilla Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULARIO 1: SERVIÇOS DE VOO */}
          {tab === 'voo' && (
            <form onSubmit={handleCalcularVoo} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">
                  TIPO DE SERVIÇO *
                </label>
                <select 
                  value={tipoServico}
                  onChange={(e) => setTipoServico(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Escolha o serviço...</option>
                  <option value="Mapeamento Aéreo / Fotogrametria">Mapeamento Aéreo / Fotogrametria</option>
                  <option value="Inspeção Visual Predial/Industrial">Inspeção Visual Predial/Industrial</option>
                  <option value="Filmagem e Fotografia Profissional">Filmagem e Fotografia Profissional</option>
                  <option value="Pulverização / Agrícola">Pulverização / Agrícola</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">
                  CATEGORIA / PORTE DO DRONE *
                </label>
                <select 
                  value={categoriaDrone}
                  onChange={(e) => setCategoriaDrone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Escolha a categoria do drone...</option>
                  {categoriasDrone.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">
                  QUANTIDADE ESTIMADA DE FOTOS *
                </label>
                <input 
                  type="number"
                  placeholder="Ex: 1500 (digite apenas números)"
                  value={qtdFotos}
                  onChange={(e) => setQtdFotos(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1">
                  Desconto de 10% aplicado só as fotos para pedidos acima de 540 fotos.
                </p>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-bold text-center mb-3 opacity-90">
                  SERVIÇOS E CONDIÇÕES ADICIONAIS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {opcionesAdicionalesVoo.map((item) => (
                    <label 
                      key={item.id} 
                      className="flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-[11px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={adicionais.some(a => a.id === item.id)}
                        onChange={() => handleCheckboxVoo(item)}
                        className="mr-2 text-blue-600 rounded focus:ring-blue-500" 
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BOTONES VOO */}
              <div className="flex flex-wrap gap-2 pt-3">
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-all shadow"
                >
                  CALCULAR ORÇAMENTO
                </button>
                <button 
                  type="button" 
                  onClick={handleNovoOrcamento} 
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors"
                >
                  🗑️ LIMPAR DADOS
                </button>
                <button 
                  type="button" 
                  onClick={handleNovoOrcamento} 
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors"
                >
                  🔄 NOVO ORÇAMENTO
                </button>
              </div>
            </form>
          )}

          {/* FORMULARIO 2: MANUTENÇÃO E CONSERTOS */}
          {tab === 'manutencao' && (
            <form onSubmit={handleCalcularManutencao} className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">
                  TIPO DE MANUTENÇÃO *
                </label>
                <select 
                  value={tipoManutencao}
                  onChange={(e) => setTipoManutencao(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Escolha a modalidade técnica...</option>
                  <option value="Manutenção Preventiva Geral">Manutenção Preventiva Geral (Revisão)</option>
                  <option value="Manutenção Corretiva (Reparo pós-queda)">Manutenção Corretiva (Reparo após Queda/Avaria)</option>
                  <option value="Diagnóstico de Bancada e Perícia">Diagnóstico Técnico de Bancada</option>
                  <option value="Customização e Instalação de Acessórios">Customização / Instalação de Módulos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 opacity-80">
                  PORTE / CATEGORIA DO EQUIPAMENTO *
                </label>
                <select 
                  value={porteManutencao}
                  onChange={(e) => setPorteManutencao(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Escolha o porte para a manutenção...</option>
                  {categoriasDrone.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-bold text-center mb-3 opacity-90">
                  DEFEITOS DETECTADOS / SERVIÇOS TÉCNICOS NECESSÁRIOS
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {opcionesDefeitosManutencao.map((item) => (
                    <label 
                      key={item.id} 
                      className="flex items-center p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-[11px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={defeitos.some(d => d.id === item.id)}
                        onChange={() => handleCheckboxManutencao(item)}
                        className="mr-2 text-blue-600 rounded focus:ring-blue-500" 
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BOTONES MANUTENÇÃO */}
              <div className="flex flex-wrap gap-2 pt-3">
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-all shadow"
                >
                  CALCULAR MANUTENÇÃO
                </button>
                <button 
                  type="button" 
                  onClick={handleNovoOrcamento} 
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors"
                >
                  🗑️ LIMPAR DADOS
                </button>
                <button 
                  type="button" 
                  onClick={handleNovoOrcamento} 
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-bold py-2.5 px-3 rounded-lg text-xs tracking-wider transition-colors"
                >
                  🔄 NOVO ORÇAMENTO
                </button>
              </div>
            </form>
          )}

          {/* Panel de Resumen Derecho */}
          <div className="lg:col-span-5 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-5 flex flex-col justify-between bg-gray-50/50 dark:bg-gray-800/30 min-h-[380px]">
            
            {/* CONTADOR Y LEYENDA (BLOQUE UNIFICADO PERMANENTE) */}
            <div className="mb-4 text-center">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="text-blue-600 dark:text-blue-400 text-xs font-extrabold tracking-wide uppercase">
                  ORÇAMENTOS REALIZADOS: <span className="text-sm px-2 py-0.5 bg-blue-600 text-white rounded-md ml-1">{orcamentosRealizados} / {limiteGratuito}</span>
                </div>
              </div>

              {/* LEYENDA PERMANENTE */}
              <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium mt-3 px-2 leading-relaxed">
                cadastrados em <span className="font-bold text-blue-600 dark:text-blue-400">orientese.com</span> tem calculo de orçamentos ilimitados
              </p>
            </div>

            {resultado ? (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="border-b pb-2 border-gray-200 dark:border-gray-700 text-center">
                    <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      DEMONSTRATIVO DE ORÇAMENTO ({resultado.modalidade})
                    </h3>
                    <p className="text-[10px] opacity-60">Gerado em: {resultado.dataHoraCalculo}</p>
                  </div>

                  <div className="text-[11px] space-y-2 opacity-90 mt-3">
                    {resultado.modalidade === 'VOO' ? (
                      <>
                        <p className="border-b pb-1"><span className="font-bold">Serviço:</span> {resultado.tipoServico}</p>
                        <p className="border-b pb-1"><span className="font-bold">Equipamento:</span> {resultado.categoriaDrone}</p>
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
                          <div className="pt-1 border-t space-y-1">
                            <p className="font-bold text-[10px] uppercase opacity-70">Adicionais:</p>
                            {resultado.adicionaisSelecionados.map((item) => (
                              <div key={item.id} className="flex justify-between text-[10px] pl-2">
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
                        <p className="border-b pb-1"><span className="font-bold">Modalidade:</span> {resultado.tipoManutencao}</p>
                        <p className="border-b pb-1"><span className="font-bold">Equipamento:</span> {resultado.porteManutencao}</p>
                        <div className="flex justify-between items-center">
                          <span>Taxa Diagnóstico de Bancada:</span>
                          <span className="font-semibold">{formatarMoeda(resultado.taxaDiagnosticoBase)}</span>
                        </div>
                        {resultado.defeitosSelecionados.length > 0 && (
                          <div className="pt-1 border-t space-y-1">
                            <p className="font-bold text-[10px] uppercase opacity-70">Serviços/Consertos Selecionados:</p>
                            {resultado.defeitosSelecionados.map((item) => (
                              <div key={item.id} className="flex justify-between text-[10px] pl-2">
                                <span>+ {item.label}</span>
                                <span>{formatarMoeda(item.preco)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    <div className="border-t-2 border-blue-600 pt-2 mt-2 flex justify-between text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      <span>VALOR TOTAL ESTIMADO:</span>
                      <span>{formatarMoeda(resultado.valorTotal)}</span>
                    </div>
                  </div>

                  {/* Leyenda aclaratoria */}
                  <div className="border-t pt-3 border-gray-200 dark:border-gray-700 text-[9px] opacity-75 space-y-1 leading-normal text-justify mt-3">
                    <p>
                      <strong>Aviso Importante:</strong> Este orçamento possui caráter estritamente <em>referencial e informativo</em>. Os valores baseiam-se em médias de mercado coletadas na presente data.
                    </p>
                  </div>

                  {/* FORMULARIO DE ENVÍO */}
                  <div className="border-t pt-3 border-gray-200 dark:border-gray-700 mt-3">
                    <h4 className="text-[11px] font-bold mb-2 text-center text-blue-600 dark:text-blue-400">
                      ✉️ RECEBER ESTE ORÇAMENTO
                    </h4>
                    <form onSubmit={handleEnviarOrcamento} className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Seu Nome Completo *"
                        value={nomeCliente}
                        onChange={(e) => setNomeCliente(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[11px] outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input 
                        type="email" 
                        placeholder="Seu E-Mail principal"
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[11px] outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input 
                        type="tel" 
                        placeholder="WhatsApp / Telegram (DDD + Nº)"
                        value={telefoneCliente}
                        onChange={(e) => setTelefoneCliente(e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-[11px] outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold py-2 rounded-lg transition-colors shadow mt-1"
                      >
                        ENVIAR DEMONSTRATIVO
                      </button>
                    </form>
                  </div>
                </div>

                {/* BOTÓN NOVO ORÇAMENTO AL FINAL DEL RESULTADO */}
                <button 
                  type="button" 
                  onClick={handleNovoOrcamento}
                  className="w-full mt-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 text-xs font-bold py-2.5 rounded-lg transition-colors border border-gray-300 dark:border-gray-600"
                >
                  🔄 NOVO ORÇAMENTO
                </button>

              </div>
            ) : (
              /* ESTADO INICIAL */
              <div className="my-auto text-center py-6">
                <p className="text-xs opacity-70 leading-relaxed max-w-xs mx-auto">
                  Preencha os dados no formulário ao lado e clique em <strong className="opacity-100 text-blue-600 dark:text-blue-400">Calcular Orçamento</strong> para visualizar o demonstrativo completo aqui.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* BLOQUE DE PATROCINADORES INFERIOR */}
      <div className="my-8">
        <h3 className="text-center text-xs font-bold opacity-50 tracking-widest uppercase mb-4">
          PARCEIROS COMERCIAIS / PATROCINADORES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-theme border-2 border-dashed rounded-xl p-4 text-center">
            <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              Espaço Disponível
            </span>
            <h4 className="text-xs font-bold mb-1">Anuncie Sua Oficina Aqui</h4>
            <p className="text-[11px] opacity-70">
              Destaque seus serviços de manutenção preventiva e reparos no portal.
            </p>
          </div>
          <div className="card-theme border-2 border-dashed rounded-xl p-4 text-center">
            <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              Espaço Disponível
            </span>
            <h4 className="text-xs font-bold mb-1">Peças e Componentes de Reposição</h4>
            <p className="text-[11px] opacity-70">
              Baterias, hélices, motores e gimbals com cliques diretos para seu e-commerce.
            </p>
          </div>
          <div className="card-theme border-2 border-dashed rounded-xl p-4 text-center">
            <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded mb-2">
              Espaço Disponível
            </span>
            <h4 className="text-xs font-bold mb-1">Seguros RETA e Cadastro ANAC</h4>
            <p className="text-[11px] opacity-70">
              Assessoria completa para pilotos e empresas operarem 100% na lei.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SimuladorDuplo;