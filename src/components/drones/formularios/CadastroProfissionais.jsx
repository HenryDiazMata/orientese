// ==========================================
// CADASTROPROFISSIONAIS.JSX
// B+C: 4 PASOS + LISTAS EXTERNAS
// EXITO EN PANTALLA (NO SALTA A LAS CARDS AL ENVIAR)
// ==========================================

import React, { useState } from 'react';
import { useTheme } from "../../../context/drones/ThemeContext";
import { useAuth } from "../../../context/drones/AuthContext";
import './CadastroForm.css';
import {
  PAISES,
  FORMACION_ACADEMICA,
  FORMACION_TECNICA,
  FORMACION_BASICA,
  AREAS_SERVICO,
  VINCULOS,
  DISPONIBILIDADES,
  IDIOMAS,
  NIVEIS_EXP,
} from './cadastroProfissionaisListas';

const STORAGE_KEY = 'cadastros_profissionais';
const TOTAL_PASOS = 4;

const TITULOS_PASO = [
  'Dados pessoais',
  'Formação acadêmica, técnica e básica',
  'Áreas de serviço, habilidades e observações',
  'Vínculo, credencial e envio',
];

function paisConfig(paisId) {
  return PAISES.find((item) => item.id === paisId) || PAISES[0];
}

function textoReal(valor) {
  const texto = String(valor || '').trim();
  if (!texto) return '';
  if (texto.toLowerCase().includes('não informado')) return '';
  if (texto.toLowerCase().includes('nao informado')) return '';
  return texto;
}

function soDigitos(valor) {
  return String(valor || '').replace(/\D/g, '');
}

function validarCPF(valor) {
  const cpf = soDigitos(valor);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i += 1) soma += Number(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i += 1) soma += Number(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === Number(cpf[10]);
}

function formatarCPF(valor) {
  const d = soDigitos(valor).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function metade(lista) {
  const meio = Math.ceil(lista.length / 2);
  return [lista.slice(0, meio), lista.slice(meio)];
}

function dadosPessoaisPortal(user) {
  if (!user) return { temSessao: false, nome: '', email: '' };
  return {
    temSessao: true,
    nome: textoReal(user.nomeCompleto || user.nome || user.name || user.fullName),
    email: textoReal(user.email),
  };
}

function toggleIn(lista, valor) {
  const atual = Array.isArray(lista) ? lista : [];
  return atual.includes(valor) ? atual.filter((item) => item !== valor) : [...atual, valor];
}

function ListaDosColumnas({ items, valores, onToggle }) {
  const [colA, colB] = metade(items);
  return (
    <div className="form-grid">
      <div className="checkbox-group">
        {colA.map((item) => (
          <label key={item.id} className="checkbox-item">
            <input type="checkbox" checked={(valores || []).includes(item.id)} onChange={() => onToggle(item.id)} />
            {item.label}
          </label>
        ))}
      </div>
      <div className="checkbox-group">
        {colB.map((item) => (
          <label key={item.id} className="checkbox-item">
            <input type="checkbox" checked={(valores || []).includes(item.id)} onChange={() => onToggle(item.id)} />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}

const INITIAL = {
  nomeApresentacao: '',
  dataNascimento: '',
  localNascimento: '',
  telefone1: '',
  telefone2: '',
  whatsapp: '',
  pais: '',
  documentoLocal: '',
  endereco: '',
  cidade: '',
  uf: '',
  cep: '',
  pontoEncontro: '',
  formacionAcademica: [],
  formacionAcademicaOutro: '',
  formacionTecnica: [],
  formacionTecnicaOutro: '',
  formacionBasica: [],
  formacionBasicaOutro: '',
  areasSetor: [],
  areaOutro: '',
  habilidadesExtras: '',
  observaciones: '',
  vinculo: '',
  nivelExperiencia: '',
  anosExperiencia: '',
  disponibilidades: [],
  raioKm: '',
  idiomasAtencion: [],
  temCredencial: false,
  orgaoCredencial: '',
  numeroCredencial: '',
  seguroRC: false,
  aceitaNDA: false,
  declaroDadosReais: false,
  aceitaVerificacao: false,
  termoResponsabilidade: false,
};

export default function CadastroProfissionais({ onSalvar, onCancelar }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const pessoais = dadosPessoaisPortal(user);
  const mostrarDadosPortal = pessoais.temSessao && (!!pessoais.nome || !!pessoais.email);

  const [paso, setPaso] = useState(1);
  const [form, setForm] = useState({
    ...INITIAL,
    nomeApresentacao: pessoais.nome || '',
  });
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(null);
  const docLabel = paisConfig(form.pais || 'BR').doc;
  const docObligatorio = form.pais === 'BR' || !!form.pais;

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggle(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: toggleIn(prev[campo], valor) }));
  }

  function onDocumentoChange(valor) {
    if (form.pais === 'BR') {
      setField('documentoLocal', formatarCPF(valor));
      return;
    }
    setField('documentoLocal', valor);
  }

  function validarPaso(n) {
    if (n === 1) {
      if (!(form.nomeApresentacao || '').trim()) return 'Informe o nome de apresentação.';
      if (!(form.cidade || '').trim()) return 'Informe a cidade.';
      if (!(form.telefone1 || '').trim()) return 'Informe pelo menos um telefone.';
      if (form.pais === 'BR') {
        if (!(form.documentoLocal || '').trim()) return 'Informe o CPF.';
        if (!validarCPF(form.documentoLocal)) return 'CPF inválido. Confira os 11 dígitos.';
      } else if (form.pais && !(form.documentoLocal || '').trim()) {
        return 'Informe o documento do país de atuação.';
      }
      if (!form.declaroDadosReais) return 'É necessário declarar que os dados são reais.';
    }
    if (n === 2) {
      const temFormacao =
        (form.formacionAcademica || []).length ||
        (form.formacionTecnica || []).length ||
        (form.formacionBasica || []).length;
      if (!temFormacao) return 'Marque pelo menos uma opção em Acadêmica, Técnica ou Básica.';
      if ((form.formacionAcademica || []).includes('outro_academico') && !(form.formacionAcademicaOutro || '').trim()) {
        return 'Descreva a formação acadêmica em Outro.';
      }
      if ((form.formacionTecnica || []).includes('outro_tecnico') && !(form.formacionTecnicaOutro || '').trim()) {
        return 'Descreva a formação técnica em Outro.';
      }
      if ((form.formacionBasica || []).includes('outro_basico') && !(form.formacionBasicaOutro || '').trim()) {
        return 'Descreva a formação básica em Outro.';
      }
    }
    if (n === 3) {
      if ((form.areasSetor || []).length === 0) return 'Marque pelo menos uma área de serviço que aspira.';
      if ((form.areasSetor || []).includes('outro_area') && !(form.areaOutro || '').trim()) {
        return 'Descreva a outra área de serviço.';
      }
    }
    if (n === 4 && !form.termoResponsabilidade) {
      return 'Aceite o termo para enviar.';
    }
    return '';
  }

  function irAdelante() {
    const msg = validarPaso(paso);
    if (msg) {
      setErro(msg);
      return;
    }
    setErro('');
    setPaso((n) => Math.min(TOTAL_PASOS, n + 1));
  }

  function irAtras() {
    setErro('');
    setPaso((n) => Math.max(1, n - 1));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = validarPaso(4);
    if (msg) {
      setErro(msg);
      return;
    }
    const registro = {
      id: crypto.randomUUID(),
      subdominio: 'drones',
      modulo: 'profissionais',
      pessoaisPortal: mostrarDadosPortal ? pessoais : { temSessao: false },
      visibilidadePessoal: 'apenas_contratante',
      documentoNormalizado: soDigitos(form.documentoLocal),
      ...form,
      criadoEm: new Date().toISOString(),
    };
    const atual = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([registro, ...atual]));
    setEnviado(registro);
  }

  function voltarDepoisDoExito() {
    if (onSalvar) onSalvar(enviado);
    if (onCancelar) onCancelar();
  }

  if (enviado) {
    return (
      <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
        <div className="success-card">
          <h2>Cadastro realizado com sucesso</h2>
          <p>Seus dados foram enviados e ficarão disponíveis na lista de profissionais do subdomínio.</p>
          <p>Protocolo: {enviado.id}</p>
        </div>
        <button type="button" className="btn-cancel" onClick={voltarDepoisDoExito}>
          Voltar para Área de Cadastros
        </button>
      </div>
    );
  }

  return (
    <form className="cadastro-container" onSubmit={handleSubmit} data-theme={isDark ? 'dark' : 'light'}>
      <div className="cadastro-header">
        <h2>Cadastro de profissionais afins do setor</h2>
        <p className="help-text">{TITULOS_PASO[paso - 1]}</p>
        <p className="help-text">* Campo obrigatório</p>
        <div className="paso-contador">
          <span>{paso}/{TOTAL_PASOS}</span>
        </div>
      </div>

      {paso === 1 && (
        <>
          {mostrarDadosPortal && (
            <section className="form-section">
              <h3>Dados pessoais</h3>
              <div className="form-grid">
                {pessoais.nome ? (
                  <div className="form-group">
                    <label>Nome</label>
                    <input value={pessoais.nome} readOnly />
                  </div>
                ) : null}
                {pessoais.email ? (
                  <div className="form-group">
                    <label>E-mail</label>
                    <input value={pessoais.email} readOnly />
                  </div>
                ) : null}
              </div>
            </section>
          )}
          <section className="form-section">
            <h3>Complemento dos dados pessoais</h3>
            <div className="aviso-box">
              Informe dados reais. O portal não se responsabiliza por informações falsas.
              Estes dados não entram no catálogo público: só quem for contratar poderá vê-los.
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome de apresentação *</label>
                <input value={form.nomeApresentacao} onChange={(e) => setField('nomeApresentacao', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Data de nascimento</label>
                <input type="date" value={form.dataNascimento} onChange={(e) => setField('dataNascimento', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Local de nascimento</label>
                <input value={form.localNascimento} onChange={(e) => setField('localNascimento', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Telefone principal *</label>
                <input value={form.telefone1} onChange={(e) => setField('telefone1', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Telefone 2</label>
                <input value={form.telefone2} onChange={(e) => setField('telefone2', e.target.value)} />
              </div>
              <div className="form-group">
                <label>WhatsApp</label>
                <input value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} />
              </div>
              <div className="form-group">
                <label>País</label>
                <select value={form.pais} onChange={(e) => setField('pais', e.target.value)}>
                  <option value="">Selecione</option>
                  {PAISES.map((pais) => (
                    <option key={pais.id} value={pais.id}>{pais.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>{docLabel}{docObligatorio ? ' *' : ''}</label>
                <input
                  value={form.documentoLocal}
                  onChange={(e) => onDocumentoChange(e.target.value)}
                  placeholder={form.pais === 'BR' ? '000.000.000-00' : ''}
                />
                {form.pais === 'BR' ? <span className="help-text">CPF validado ao continuar.</span> : null}
              </div>
              <div className="form-group">
                <label>Cidade *</label>
                <input value={form.cidade} onChange={(e) => setField('cidade', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{form.pais === 'BR' ? 'UF' : 'Estado / região'}</label>
                <input value={form.uf} onChange={(e) => setField('uf', e.target.value)} />
              </div>
              <div className="form-group">
                <label>CEP / código postal</label>
                <input value={form.cep} onChange={(e) => setField('cep', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Endereço</label>
                <input value={form.endereco} onChange={(e) => setField('endereco', e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Ponto de encontro (opcional)</label>
                <input value={form.pontoEncontro} onChange={(e) => setField('pontoEncontro', e.target.value)} />
              </div>
            </div>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input type="checkbox" checked={form.declaroDadosReais} onChange={(e) => setField('declaroDadosReais', e.target.checked)} />
                Declaro que os dados pessoais e profissionais são reais. *
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={form.aceitaVerificacao} onChange={(e) => setField('aceitaVerificacao', e.target.checked)} />
                Autorizo a validação interna para o selo “Profissional confirmado”.
              </label>
            </div>
          </section>
        </>
      )}

      {paso === 2 && (
        <>
          <section className="form-section">
            <h3>Formação acadêmica, técnica, básica *</h3>
            <p className="help-text">
              Marque pelo menos uma opção em Acadêmica, Técnica ou Básica.
              Não use este formulário se você é piloto, auxiliar de campo, técnico de manutenção, oficina de conserto ou contratante.
            </p>
          </section>
          <section className="form-section">
            <h3>Acadêmica</h3>
            <ListaDosColumnas items={FORMACION_ACADEMICA} valores={form.formacionAcademica} onToggle={(id) => toggle('formacionAcademica', id)} />
            {(form.formacionAcademica || []).includes('outro_academico') && (
              <div className="form-group full-width">
                <label>Descreva a formação acadêmica *</label>
                <input value={form.formacionAcademicaOutro} onChange={(e) => setField('formacionAcademicaOutro', e.target.value)} />
              </div>
            )}
          </section>
          <section className="form-section">
            <h3>Técnica</h3>
            <ListaDosColumnas items={FORMACION_TECNICA} valores={form.formacionTecnica} onToggle={(id) => toggle('formacionTecnica', id)} />
            {(form.formacionTecnica || []).includes('outro_tecnico') && (
              <div className="form-group full-width">
                <label>Descreva a formação técnica *</label>
                <input value={form.formacionTecnicaOutro} onChange={(e) => setField('formacionTecnicaOutro', e.target.value)} />
              </div>
            )}
          </section>
          <section className="form-section">
            <h3>Básica</h3>
            <ListaDosColumnas items={FORMACION_BASICA} valores={form.formacionBasica} onToggle={(id) => toggle('formacionBasica', id)} />
            {(form.formacionBasica || []).includes('outro_basico') && (
              <div className="form-group full-width">
                <label>Descreva o ofício básico *</label>
                <input value={form.formacionBasicaOutro} onChange={(e) => setField('formacionBasicaOutro', e.target.value)} />
              </div>
            )}
          </section>
        </>
      )}

      {paso === 3 && (
        <>
          <section className="form-section">
            <h3>Áreas de serviço que aspira *</h3>
            <p className="help-text">Marque pelo menos uma área.</p>
            <ListaDosColumnas items={AREAS_SERVICO} valores={form.areasSetor} onToggle={(id) => toggle('areasSetor', id)} />
            {(form.areasSetor || []).includes('outro_area') && (
              <div className="form-group full-width">
                <label>Descreva a outra área *</label>
                <input value={form.areaOutro} onChange={(e) => setField('areaOutro', e.target.value)} />
              </div>
            )}
          </section>
          <section className="form-section">
            <h3>Habilidades extras e observações</h3>
            <div className="form-group full-width">
              <label>Habilidades extras</label>
              <textarea rows={3} value={form.habilidadesExtras} onChange={(e) => setField('habilidadesExtras', e.target.value)} />
            </div>
            <div className="form-group full-width">
              <label>Observações</label>
              <textarea rows={3} value={form.observaciones} onChange={(e) => setField('observaciones', e.target.value)} />
            </div>
          </section>
        </>
      )}

      {paso === 4 && (
        <>
          <section className="form-section">
            <h3>Vínculo, experiência e disponibilidade</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Vínculo</label>
                <select value={form.vinculo} onChange={(e) => setField('vinculo', e.target.value)}>
                  <option value="">Selecione</option>
                  {VINCULOS.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nível</label>
                <select value={form.nivelExperiencia} onChange={(e) => setField('nivelExperiencia', e.target.value)}>
                  <option value="">Selecione</option>
                  {NIVEIS_EXP.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Anos de experiência</label>
                <input type="number" min="0" value={form.anosExperiencia} onChange={(e) => setField('anosExperiencia', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Raio de atuação (km)</label>
                <input type="number" min="0" value={form.raioKm} onChange={(e) => setField('raioKm', e.target.value)} />
              </div>
            </div>
            <div className="form-group full-width">
              <label>Disponibilidade</label>
              <ListaDosColumnas items={DISPONIBILIDADES} valores={form.disponibilidades} onToggle={(id) => toggle('disponibilidades', id)} />
            </div>
            <div className="form-group full-width">
              <label>Idiomas</label>
              <ListaDosColumnas items={IDIOMAS} valores={form.idiomasAtencion} onToggle={(id) => toggle('idiomasAtencion', id)} />
            </div>
          </section>
          <section className="form-section">
            <h3>Credencial da ocupação</h3>
            <label className="checkbox-item">
              <input type="checkbox" checked={form.temCredencial} onChange={(e) => setField('temCredencial', e.target.checked)} />
              Possuo credencial, conselho de classe, CNH profissional ou equivalente
            </label>
            {form.temCredencial && (
              <div className="form-grid">
                <div className="form-group">
                  <label>Órgão</label>
                  <input value={form.orgaoCredencial} onChange={(e) => setField('orgaoCredencial', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Número</label>
                  <input value={form.numeroCredencial} onChange={(e) => setField('numeroCredencial', e.target.value)} />
                </div>
              </div>
            )}
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input type="checkbox" checked={form.seguroRC} onChange={(e) => setField('seguroRC', e.target.checked)} />
                Tenho seguro de responsabilidade civil
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={form.aceitaNDA} onChange={(e) => setField('aceitaNDA', e.target.checked)} />
                Aceito NDA / sigilo de dados do contratante
              </label>
            </div>
          </section>
          <label className="checkbox-item">
            <input type="checkbox" checked={form.termoResponsabilidade} onChange={(e) => setField('termoResponsabilidade', e.target.checked)} />
            Declaro que a formação e as áreas marcadas correspondem à minha atuação real no entorno do setor de drones. *
          </label>
        </>
      )}

      {erro ? <p className="erro">{erro}</p> : null}

      <div className="paso-contador">
        <span>{paso}/{TOTAL_PASOS}</span>
      </div>

      <div className="form-actions">
        {paso === 1 ? (
          <button type="button" className="btn-cancelar" onClick={() => onCancelar && onCancelar()}>Cancelar</button>
        ) : (
          <button type="button" className="btn-cancelar" onClick={irAtras}>Voltar</button>
        )}
        {paso < TOTAL_PASOS ? (
          <button type="button" className="btn-salvar" onClick={irAdelante}>Continuar</button>
        ) : (
          <button type="submit" className="btn-salvar">Enviar cadastro de profissional</button>
        )}
      </div>
    </form>
  );
}