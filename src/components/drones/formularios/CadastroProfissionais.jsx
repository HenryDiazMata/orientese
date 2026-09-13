// ==========================================
// CADASTROCONSERTO.JSX
// TECNICO / OFICINA DE CONSERTO DE DRONES
// DATOS CIVILES: PORTAL / AUTH (SOLO LECTURA)
// ESTILO UNIFICADO: CADASTROFORM.CSS
// PUNTOS 8 Y 9: SIMULADOR Y VALIDACION DEL SISTEMA
// NO USA REACT-ROUTER
// ==========================================

import React, { useMemo, useState } from 'react';
import { useTheme } from "../../../context/drones/ThemeContext";
import { useAuth } from "../../../context/drones/AuthContext";
import './CadastroForm.css';

const STORAGE_KEY = 'cadastros_conserto';

const PAISES = [
  { id: 'BR', label: 'Brasil', doc: 'CNPJ da oficina ou CPF profissional' },
  { id: 'PT', label: 'Portugal', doc: 'NIF / NIPC' },
  { id: 'ES', label: 'España', doc: 'NIF / CIF' },
  { id: 'FR', label: 'France', doc: 'SIRET / TVA' },
  { id: 'IT', label: 'Italia', doc: 'Partita IVA' },
  { id: 'US', label: 'United States', doc: 'EIN / Tax ID' },
  { id: 'MX', label: 'México', doc: 'RFC' },
  { id: 'AR', label: 'Argentina', doc: 'CUIT / CUIL' },
  { id: 'CO', label: 'Colombia', doc: 'NIT' },
  { id: 'CL', label: 'Chile', doc: 'RUT' },
  { id: 'PE', label: 'Perú', doc: 'RUC' },
  { id: 'PY', label: 'Paraguay', doc: 'RUC' },
  { id: 'UY', label: 'Uruguay', doc: 'RUT' },
  { id: 'OTHER', label: 'Other / Otro / Autre / Altro', doc: 'Tax ID local' },
];

const TIPOS_DRON = [
  { id: 'consumer', label: 'Consumer / selfie / mini' },
  { id: 'pro', label: 'Pro / cinema' },
  { id: 'agricola', label: 'Agrícola' },
  { id: 'fpv', label: 'FPV / corrida' },
  { id: 'mapeo', label: 'Mapeo / RTK / lidar' },
  { id: 'vtol', label: 'VTOL / carga' },
];

const SUBSISTEMAS = [
  { id: 'fc', label: 'Controladora de voo / FC' },
  { id: 'esc', label: 'ESC e motores' },
  { id: 'gimbal', label: 'Gimbal e câmera' },
  { id: 'radio', label: 'Rádio e enlace' },
  { id: 'gnss', label: 'GNSS / IMU / compass' },
  { id: 'bateria', label: 'Bateria e PDB' },
  { id: 'frame', label: 'Frame, braços e hélices' },
  { id: 'agric_bomba', label: 'Tanque / bomba agrícola' },
];

const NIVEIS = [
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'solda', label: 'Solda / SMD / micro solda' },
  { id: 'firmware', label: 'Firmware e calibração' },
  { id: 'optica', label: 'Óptica e alinhamento de gimbal' },
  { id: 'recuperacao', label: 'Recuperação de dados / log' },
];

const MARCAS = ['DJI', 'Autel', 'Skydio', 'Parrot', 'Yamaha', 'FPV artesanal', 'Outras'];

const IDIOMAS = [
  { id: 'pt', label: 'Português' },
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'English' },
  { id: 'fr', label: 'Français' },
  { id: 'it', label: 'Italiano' },
];

function paisConfig(paisId) {
  return PAISES.find((item) => item.id === paisId) || PAISES[0];
}

function dadosPortal(user) {
  return {
    provedor: 'Portal SSO',
    sessionId: user?.sessionId || user?.id || 'sso-sess-portal',
    nome: user?.nomeCompleto || user?.nome || user?.name || 'Não informado no portal',
    email: user?.email || 'Não informado no portal',
    documento: user?.cpf || user?.documento || user?.taxId || 'Não informado no portal',
    telefone: user?.telefone || user?.phone || 'Não informado no portal',
    paisPortal: user?.pais || user?.country || 'BR',
  };
}

function toggleIn(lista, valor) {
  const atual = Array.isArray(lista) ? lista : [];
  return atual.includes(valor) ? atual.filter((item) => item !== valor) : [...atual, valor];
}

function calcularSimulacao(form) {
  let valor = form.tipoAtor === 'oficina' ? 280 : 190;
  valor += (form.tiposDron || []).length * 22;
  valor += (form.subsistemas || []).length * 18;
  valor += (form.niveis || []).length * 16;
  valor += (form.marcas || []).length * 14;
  valor += Math.min(Number(form.anosExperiencia) || 0, 20) * 10;
  valor += form.autorizadoFabricante ? 70 : 0;
  valor += form.bancadaPropria ? 40 : 0;
  valor += form.piezas === 'original' ? 35 : form.piezas === 'mixta' ? 20 : 0;
  valor += form.enviaInternacional ? 30 : 0;
  valor += form.atendeCampo ? 20 : 0;
  valor += form.seguroRC ? 25 : 0;
  valor += Number(form.garantiaDias) >= 90 ? 25 : Number(form.garantiaDias) >= 30 ? 12 : 0;
  valor += Number(form.prazoDiagnosticoDias) <= 2 ? 20 : 0;
  if (form.pais !== 'BR') valor = Math.round(valor * 1.04);

  return {
    especialidadeLabel: (form.tiposDron || []).join(', ') || '—',
    ticketBase: form.tipoAtor === 'oficina' ? 280 : 190,
    valorReferencial: Math.max(130, Math.round(valor)),
    observacao:
      'Valor referencial emitido pelo simulador do subdomínio Consertos. Não é editável pelo usuário.',
  };
}

function emitirValidacao(form, simulacao, portal) {
  let pontuacao = 40;
  if (portal.email && !String(portal.email).includes('Não informado')) pontuacao += 6;
  if ((form.nomeComercial || '').trim().length >= 3) pontuacao += 8;
  if ((form.cidade || '').trim().length >= 2) pontuacao += 6;
  if ((form.tiposDron || []).length >= 1) pontuacao += 8;
  if ((form.subsistemas || []).length >= 2) pontuacao += 6;
  if (form.bancadaPropria) pontuacao += 4;
  if (form.autorizadoFabricante) pontuacao += 6;
  if (form.termoResponsabilidade) pontuacao += 6;
  if (simulacao.valorReferencial >= 200) pontuacao += 6;
  pontuacao = Math.min(100, pontuacao);

  let status = 'em_analise';
  if (!form.termoResponsabilidade || (form.tiposDron || []).length === 0) status = 'pendente';
  else if (pontuacao >= 80) status = 'validado';
  else if (pontuacao < 55) status = 'pendente';

  return {
    pontuacao,
    status,
    emitidoPor: 'sistema',
    codigo: `VAL-CON-${Date.now().toString(36).toUpperCase()}`,
    emitidoEm: new Date().toISOString(),
    criterios: [
      'Identidade recebida do Portal SSO',
      'Completude dos campos do subdomínio Consertos',
      'Valor referencial calculado pelo simulador',
      'Pontuação e status gerados apenas pelo sistema',
    ],
  };
}

const INITIAL = {
  tipoAtor: 'tecnico',
  nomeComercial: '',
  web: '',
  whatsappComercial: '',
  pais: 'BR',
  documentoLocal: '',
  cidade: '',
  uf: '',
  direccionTaller: '',
  tiposDron: [],
  subsistemas: [],
  niveis: [],
  marcas: [],
  noHace: '',
  anosExperiencia: 1,
  credencialFabricante: '',
  autorizadoFabricante: false,
  bancadaPropria: false,
  piezas: 'mixta',
  stockPropio: false,
  trazaSerie: true,
  atendePresencial: true,
  atendeRemessaNacional: true,
  enviaInternacional: false,
  atendeCampo: false,
  clientePagaEnvio: true,
  idiomasAtencion: ['pt'],
  prazoDiagnosticoDias: 2,
  prazoReparoDias: 7,
  garantiaDias: 90,
  garantiaCubre: 'ambos',
  orcamentoPago: false,
  osSimultaneas: 3,
  seguroRC: false,
  ndaFlota: false,
  descarteBateria: false,
  resumoTecnico: '',
  termoResponsabilidade: false,
};

export default function CadastroConserto({ onSalvar, onCancelar }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const portal = dadosPortal(user);
  const [form, setForm] = useState({
    ...INITIAL,
    pais: portal.paisPortal === 'BR' ? 'BR' : portal.paisPortal || 'BR',
  });
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(null);

  const simulacao = useMemo(() => calcularSimulacao(form), [form]);
  const previewValidacao = useMemo(
    () => emitirValidacao(form, simulacao, portal),
    [form, simulacao, portal]
  );
  const docLabel = paisConfig(form.pais).doc;

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggle(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: toggleIn(prev[campo], valor) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    if (!(form.nomeComercial || '').trim()) {
      setErro('Informe o nome comercial ou como o técnico será apresentado.');
      return;
    }
    if (!(form.cidade || '').trim()) {
      setErro('Informe a cidade de atuação da bancada ou do técnico.');
      return;
    }
    if ((form.tiposDron || []).length === 0) {
      setErro('Marque pelo menos um tipo de drone que você realmente conserta.');
      return;
    }
    if ((form.subsistemas || []).length === 0) {
      setErro('Marque pelo menos um subsistema (FC, gimbal, bateria...).');
      return;
    }
    if ((form.idiomasAtencion || []).length === 0) {
      setErro('Marque pelo menos um idioma de atendimento.');
      return;
    }
    if (!form.termoResponsabilidade) {
      setErro('Aceite o termo de responsabilidade técnica para enviar.');
      return;
    }

    const validacao = emitirValidacao(form, simulacao, portal);
    const registro = {
      id: crypto.randomUUID(),
      subdominio: 'consertos',
      perfil: 'tecnico_conserto',
      portal,
      ...form,
      valorReferencial: simulacao.valorReferencial,
      simulacao,
      validacao,
      criadoEm: new Date().toISOString(),
    };

    const atual = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([registro, ...atual]));
    setEnviado(registro);
    if (onSalvar) onSalvar(registro);
  }

  /* PANTALLA DE EXITO DESPUES DE ENVIAR */
  if (enviado) {
    return (
      <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
        <div className="success-card">
          <h2>Cadastro de conserto enviado</h2>
          <p>Protocolo: {enviado.id}</p>
          <p>
            Valor referencial:{' '}
            {enviado.valorReferencial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p>Pontuação: {enviado.validacao.pontuacao}</p>
          <p>Status: {enviado.validacao.status}</p>
          <div className="code-badge">{enviado.validacao.codigo}</div>
        </div>
        <button type="button" className="btn-cancel" onClick={() => onCancelar && onCancelar()}>
          Voltar para Área de Cadastros
        </button>
      </div>
    );
  }

  return (
    <form className="cadastro-container" onSubmit={handleSubmit} data-theme={isDark ? 'dark' : 'light'}>
      {/* CABECERA */}
      <div className="cadastro-header">
        <h2>Cadastro de técnico de conserto de drones</h2>
        <p>Nome, e-mail, telefone e documento civil vêm do portal. Aqui só entra a capacidade real de conserto.</p>
      </div>

      {/* BLOQUE 1: DATOS DEL PORTAL, SOLO LECTURA */}
      <section className="form-section">
        <h3>1. Dados do Portal SSO</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Provedor</label>
            <input value={portal.provedor} readOnly />
          </div>
          <div className="form-group">
            <label>Sessão</label>
            <input value={portal.sessionId} readOnly />
          </div>
          <div className="form-group">
            <label>Nome</label>
            <input value={portal.nome} readOnly />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input value={portal.email} readOnly />
          </div>
          <div className="form-group">
            <label>Documento</label>
            <input value={portal.documento} readOnly />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input value={portal.telefone} readOnly />
          </div>
        </div>
      </section>

      {/* BLOQUE 2: IDENTIDAD PROFESIONAL */}
      <section className="form-section">
        <h3>2. Identidade profissional de conserto</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Tipo de atuação</label>
            <select value={form.tipoAtor} onChange={(e) => setField('tipoAtor', e.target.value)}>
              <option value="tecnico">Técnico autônomo</option>
              <option value="oficina">Oficina / bancada</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nome comercial</label>
            <input value={form.nomeComercial} onChange={(e) => setField('nomeComercial', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Site ou rede comercial</label>
            <input value={form.web} onChange={(e) => setField('web', e.target.value)} />
          </div>
          <div className="form-group">
            <label>WhatsApp comercial</label>
            <input value={form.whatsappComercial} onChange={(e) => setField('whatsappComercial', e.target.value)} />
          </div>
          <div className="form-group">
            <label>País de atuação</label>
            <select value={form.pais} onChange={(e) => setField('pais', e.target.value)}>
              {PAISES.map((pais) => (
                <option key={pais.id} value={pais.id}>{pais.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>{docLabel}</label>
            <input value={form.documentoLocal} onChange={(e) => setField('documentoLocal', e.target.value)} />
            <span className="help-text">Só se ainda não estiver no portal</span>
          </div>
          <div className="form-group">
            <label>Cidade da bancada</label>
            <input value={form.cidade} onChange={(e) => setField('cidade', e.target.value)} />
          </div>
          <div className="form-group">
            <label>{form.pais === 'BR' ? 'UF' : 'Estado / região'}</label>
            <input value={form.uf} onChange={(e) => setField('uf', e.target.value)} />
          </div>
          <div className="form-group full-width">
            <label>Endereço de recepção de equipamentos</label>
            <input value={form.direccionTaller} onChange={(e) => setField('direccionTaller', e.target.value)} />
          </div>
        </div>
      </section>

      {/* BLOQUE 3: TIPOS DE DRONE Y SUBSISTEMAS */}
      <section className="form-section">
        <h3>3. Tipos de drone e subsistemas</h3>
        <div className="form-group full-width">
          <label>Tipos de drone</label>
          <div className="checkbox-group">
            {TIPOS_DRON.map((item) => (
              <label key={item.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(form.tiposDron || []).includes(item.id)}
                  onChange={() => toggle('tiposDron', item.id)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Subsistemas</label>
          <div className="checkbox-group">
            {SUBSISTEMAS.map((item) => (
              <label key={item.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(form.subsistemas || []).includes(item.id)}
                  onChange={() => toggle('subsistemas', item.id)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Nível técnico</label>
          <div className="checkbox-group">
            {NIVEIS.map((item) => (
              <label key={item.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(form.niveis || []).includes(item.id)}
                  onChange={() => toggle('niveis', item.id)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group full-width">
          <label>Marcas</label>
          <div className="checkbox-group">
            {MARCAS.map((marca) => (
              <label key={marca} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(form.marcas || []).includes(marca)}
                  onChange={() => toggle('marcas', marca)}
                />
                {marca}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group full-width">
          <label>O que você NÃO conserta</label>
          <textarea rows={3} value={form.noHace} onChange={(e) => setField('noHace', e.target.value)} />
        </div>
      </section>

      {/* BLOQUE 4: BANCADA, PIEZAS Y CREDENCIALES */}
      <section className="form-section">
        <h3>4. Bancada, peças e credenciais</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Anos consertando drones</label>
            <input type="number" min="0" value={form.anosExperiencia} onChange={(e) => setField('anosExperiencia', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Origem das peças</label>
            <select value={form.piezas} onChange={(e) => setField('piezas', e.target.value)}>
              <option value="original">Só originais de fabricante</option>
              <option value="mixta">Originais e compatíveis, com aviso ao cliente</option>
              <option value="compativel">Principalmente compatíveis</option>
            </select>
          </div>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" checked={form.autorizadoFabricante} onChange={(e) => setField('autorizadoFabricante', e.target.checked)} />
            Autorizado / credenciado por fabricante
          </label>
          {form.autorizadoFabricante && (
            <div className="form-group">
              <label>Número da credencial</label>
              <input value={form.credencialFabricante} onChange={(e) => setField('credencialFabricante', e.target.value)} />
            </div>
          )}
          <label className="checkbox-item">
            <input type="checkbox" checked={form.bancadaPropria} onChange={(e) => setField('bancadaPropria', e.target.checked)} />
            Bancada / laboratório próprio
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.stockPropio} onChange={(e) => setField('stockPropio', e.target.checked)} />
            Mantenho estoque próprio
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.trazaSerie} onChange={(e) => setField('trazaSerie', e.target.checked)} />
            Registro número de série do drone e da peça trocada
          </label>
        </div>
      </section>

      {/* BLOQUE 5: LOGISTICA E IDIOMAS */}
      <section className="form-section">
        <h3>5. Logística e idiomas de atendimento</h3>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" checked={form.atendePresencial} onChange={(e) => setField('atendePresencial', e.target.checked)} />
            Retirada presencial
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.atendeRemessaNacional} onChange={(e) => setField('atendeRemessaNacional', e.target.checked)} />
            Envio nacional
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.enviaInternacional} onChange={(e) => setField('enviaInternacional', e.target.checked)} />
            Envio internacional (aduana por conta do cliente)
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.atendeCampo} onChange={(e) => setField('atendeCampo', e.target.checked)} />
            Atendimento em campo / fazenda / obra
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.clientePagaEnvio} onChange={(e) => setField('clientePagaEnvio', e.target.checked)} />
            Cliente paga ida e volta do equipamento
          </label>
        </div>
        <div className="form-group full-width">
          <label>Idiomas de atendimento</label>
          <div className="checkbox-group">
            {IDIOMAS.map((idioma) => (
              <label key={idioma.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(form.idiomasAtencion || []).includes(idioma.id)}
                  onChange={() => toggle('idiomasAtencion', idioma.id)}
                />
                {idioma.label}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 6: PLAZOS, PRESUPUESTO Y GARANTIA */}
      <section className="form-section">
        <h3>6. Prazo, orçamento e garantia</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Prazo de diagnóstico (dias)</label>
            <input type="number" min="1" value={form.prazoDiagnosticoDias} onChange={(e) => setField('prazoDiagnosticoDias', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Prazo médio de reparo (dias)</label>
            <input type="number" min="1" value={form.prazoReparoDias} onChange={(e) => setField('prazoReparoDias', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Garantia do serviço (dias)</label>
            <input type="number" min="0" value={form.garantiaDias} onChange={(e) => setField('garantiaDias', e.target.value)} />
          </div>
          <div className="form-group">
            <label>A garantia cobre</label>
            <select value={form.garantiaCubre} onChange={(e) => setField('garantiaCubre', e.target.value)}>
              <option value="mao">Só mão de obra</option>
              <option value="peca">Só peça fornecida por mim</option>
              <option value="ambos">Mão de obra e peça</option>
            </select>
          </div>
          <div className="form-group">
            <label>OS simultâneas</label>
            <input type="number" min="1" value={form.osSimultaneas} onChange={(e) => setField('osSimultaneas', e.target.value)} />
          </div>
        </div>
        <label className="checkbox-item">
          <input type="checkbox" checked={form.orcamentoPago} onChange={(e) => setField('orcamentoPago', e.target.checked)} />
          Diagnóstico / orçamento é pago (desconta se o cliente aceitar)
        </label>
      </section>

      {/* BLOQUE 7: RIESGO, FLOTA Y RESIDUOS */}
      <section className="form-section">
        <h3>7. Risco, flota e resíduos</h3>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" checked={form.seguroRC} onChange={(e) => setField('seguroRC', e.target.checked)} />
            Tenho seguro de responsabilidade civil
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.ndaFlota} onChange={(e) => setField('ndaFlota', e.target.checked)} />
            Aceito NDA / sigilo de mapas e imagens do cliente
          </label>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.descarteBateria} onChange={(e) => setField('descarteBateria', e.target.checked)} />
            Faço descarte correto de baterias e placas
          </label>
        </div>
        <div className="form-group full-width">
          <label>Resumo técnico</label>
          <textarea rows={4} value={form.resumoTecnico} onChange={(e) => setField('resumoTecnico', e.target.value)} />
        </div>
      </section>

      {/* BLOQUE 8: SIMULADOR */}
      <section className="form-section">
        <h3>8. Simulador — valor referencial</h3>
        <p className="help-text">{simulacao.observacao}</p>
        <div className="form-grid">
          <div className="form-group">
            <label>Tipos considerados</label>
            <input value={simulacao.especialidadeLabel} readOnly />
          </div>
          <div className="form-group">
            <label>Ticket base do simulador</label>
            <input value={simulacao.ticketBase} readOnly />
          </div>
          <div className="form-group">
            <label>Valor referencial</label>
            <input
              value={simulacao.valorReferencial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              readOnly
            />
          </div>
        </div>
      </section>

      {/* BLOQUE 9: PUNTUACION Y VALIDACION */}
      <section className="form-section">
        <h3>9. Pontuação e validação emitidas pelo sistema</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Pontuação</label>
            <input value={previewValidacao.pontuacao} readOnly />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input value={previewValidacao.status} readOnly />
          </div>
          <div className="form-group">
            <label>Emitido por</label>
            <input value={previewValidacao.emitidoPor} readOnly />
          </div>
        </div>
        <ul className="criterios-lista">
          {previewValidacao.criterios.map((criterio) => (
            <li key={criterio}>{criterio}</li>
          ))}
        </ul>
      </section>

      {/* TERMINO DE RESPONSABILIDAD */}
      <label className="checkbox-item">
        <input
          type="checkbox"
          checked={form.termoResponsabilidade}
          onChange={(e) => setField('termoResponsabilidade', e.target.checked)}
        />
        Declaro que os tipos de drone e subsistemas marcados correspondem à minha capacidade real e assumo a responsabilidade técnica do conserto.
      </label>

      {erro ? <p className="erro">{erro}</p> : null}

      <button type="submit" className="btn-submit">Enviar cadastro de conserto</button>
      <button type="button" className="btn-cancel" onClick={() => onCancelar && onCancelar()}>
        Cancelar
      </button>
    </form>
  );
}