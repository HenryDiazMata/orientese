// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroUsuario.jsx
// FICHA CONTRATANTE / HACENDADO
// PF = LISTA DE PRODUCTORES (SOLO SI MARCA APARECER)
// PJ = DIRECTORIO DE EMPRESAS (NOMBRE + CONTACTO)
// NO ES COMPRA DE PLAN. NO HAY CHECKOUT
// UNA CUENTA DRONES = UN USUARIO + UNA CLAVE
// CLAVE SOLO SI AUN NO EXISTE EN EL SUBDOMINIO
// NOMBRE DE USUARIO: VIENE DEL PORTAL O SE CREA AQUI
// SIN TEMA DARK. ESTILO: CADASTROFORM.CSS
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../i18n';
import { useAuth } from '../../../context/drones/AuthContext';
import './CadastroForm.css';

// ==========================================
// LISTAS FIJAS DE LA FICHA (AUN SIN I18N POR ITEM)
// ==========================================
const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const TIPOS_USUARIO = [
  'Fazendeiro / Produtor Rural',
  'Construtora / Incorporadora',
  'Empresa de Engenharia / Topografia',
  'Empresa Tecnológica / Startup',
  'Empresa Elétrica / Energia',
  'Ganadeiro / Pecuarista',
  'Outro',
];

const SERVICOS_SOLICITADOS = [
  'Mapeamento Aéreo / Fotogrametria',
  'Inspeção Visual Predial/Industrial',
  'Filmagem e Fotografia Profissional',
  'Pulverização / Agrícola',
  'Contagem de Gado / Rebanho',
  'Contagem de Ovinos / Caprinos',
  'Contagem de Frutos / Pomares',
  'Monitoramento de Saúde da Lavoura (NDVI)',
  'Mapeamento de Áreas de Pastagem',
  'Inspeção de Linhas de Transmissão / Torres',
  'Levantamento Topográfico / Ortomosaico',
  'Outros serviços com drones',
];

// ==========================================
// CLAVE: SIN ESPACIOS, COMILLAS NI BARRA INVERTIDA
// ==========================================
const REGEX_CARACTERES_INVALIDOS = /[ "'\\]/;

export default function CadastroUsuario({
  usuarioParaEditar = null,
  onSalvar,
  onCancelar,
}) {
  // ==========================================
  // I18N DEL SUBDOMINIO. NO USAR EL I18N DEL PORTAL
  // ==========================================
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const { user, registerUser, updateUser } = useAuth();
  const isEditing = Boolean(usuarioParaEditar);

  // ==========================================
  // DATOS YA EXISTENTES EN ORIENTESE / SESION
  // SI HAY NOMBRE, EMAIL O USUARIO: NO PEDIR OTRO
  // ==========================================
  const nomePortal =
    (user && (user.nomeCompleto || user.nome || user.name)) ||
    (usuarioParaEditar && usuarioParaEditar.nomeCompleto) ||
    '';
  const emailPortal =
    (user && user.email) || (usuarioParaEditar && usuarioParaEditar.email) || '';
  const usuarioPortal =
    (user && (user.usuario || user.username || user.userName)) ||
    (usuarioParaEditar && usuarioParaEditar.usuario) ||
    '';
  const fotoPortal =
    (user && (user.fotoUrl || user.foto)) ||
    (usuarioParaEditar && usuarioParaEditar.fotoUrl) ||
    null;

  // ==========================================
  // CLAVE DE DRONES: SOLO EN EL PRIMER ROL DEL SUBDOMINIO
  // ==========================================
  const yaTieneClaveDrones = Boolean(user && (user.hasDronesPassword || user.senhaDrones));
  const pedirClave = !isEditing && !yaTieneClaveDrones;
  const usuarioFijo = Boolean(usuarioPortal);

  const [formData, setFormData] = useState(
    usuarioParaEditar || {
      tipoPessoa: 'PF',
      nomeCompleto: nomePortal,
      razaoSocial: '',
      nomeFantasia: '',
      cpf: '',
      cnpj: '',
      dataNascimento: '',
      fotoPerfil: null,
      tipoUsuario: '',
      servicosSolicitados: [],
      areaPropriedadeHa: '',
      estadosInteresse: [],
      frequenciaUso: 'ocasional',
      aparecerListaProdutores: false,
      publicarNome: true,
      publicarZona: true,
      publicarWhatsapp: false,
      publicarEmail: false,
      aceitaContatoComercial: true,
      endereco: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: 'SP',
      },
      email: emailPortal,
      telefone1: '',
      telegram: '',
      observacoes: '',
      status: 'Ativo',
      motivoPausa: '',
      dataInicioPausa: '',
      dataFimPausa: '',
      usuario: usuarioPortal,
      senha: '',
      confirmarSenha: '',
    }
  );

  const [fotoPreview, setFotoPreview] = useState(fotoPortal);
  const [cadastroResultado, setCadastroResultado] = useState(null);
  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [mostrarConfirmacaoRetiro, setMostrarConfirmacaoRetiro] = useState(false);

  // ==========================================
  // CAMPOS SIMPLES + CHECKBOX
  // ==========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // ==========================================
  // DIRECCION ANIDADA
  // ==========================================
  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value },
    }));
  };

  // ==========================================
  // LISTAS MULTIPLES (SERVICIOS / ESTADOS)
  // ==========================================
  const handleArrayToggle = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      const exists = currentList.includes(value);
      return {
        ...prev,
        [category]: exists
          ? currentList.filter((item) => item !== value)
          : [...currentList, value],
      };
    });
  };

  // ==========================================
  // FOTO / LOGO. TOPE 2 MB
  // ==========================================
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setErroSenha(t('cadastroUsuario.fotoPesada', { defaultValue: 'El archivo debe tener máximo 2 MB.' }));
      return;
    }
    setFormData((prev) => ({ ...prev, fotoPerfil: file }));
    setFotoPreview(URL.createObjectURL(file));
  };

  // ==========================================
  // CODIGO INTERNO F-... (PF) O E-... (PJ)
  // ==========================================
  const generarCodigoCadastro = (tipoPessoa, dataNasc) => {
    const tipo = tipoPessoa === 'PF' ? 'F' : 'E';
    let nascFormateada = '00000000';
    if (dataNasc && tipoPessoa === 'PF') {
      const parts = dataNasc.split('-');
      if (parts.length === 3) nascFormateada = `${parts[2]}${parts[1]}${parts[0]}`;
    } else {
      const hoje = new Date();
      nascFormateada = `${String(hoje.getDate()).padStart(2, '0')}${String(hoje.getMonth() + 1).padStart(2, '0')}${hoje.getFullYear()}`;
    }
    const hoje = new Date();
    return `${tipo}-${nascFormateada}-${String(hoje.getDate()).padStart(2, '0')}${String(hoje.getMonth() + 1).padStart(2, '0')}${hoje.getFullYear()}-1`;
  };

  // ==========================================
  // ENVIO: NO COBRA. SOLO GUARDA FICHA / PERFIL
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioFinal = (usuarioPortal || formData.usuario || '').trim();
    if (!usuarioFinal) {
      setErroSenha(t('cadastroUsuario.usuarioOblig', { defaultValue: 'Indique un nombre de usuario.' }));
      return;
    }

    if (pedirClave) {
      if ((formData.senha || '').length < 8) {
        setErroSenha(t('cadastroUsuario.senhaCurta', { defaultValue: 'La contraseña debe tener al menos 8 caracteres.' }));
        return;
      }
      if (REGEX_CARACTERES_INVALIDOS.test(formData.senha)) {
        setErroSenha(t('cadastroUsuario.senhaInvalida', { defaultValue: 'La contraseña no puede tener espacios, comillas ni barra invertida.' }));
        return;
      }
      if (formData.senha !== formData.confirmarSenha) {
        setErroSenha(t('cadastroUsuario.senhaDistinta', { defaultValue: 'Las contraseñas no coinciden.' }));
        return;
      }
    }

    if (formData.tipoPessoa === 'PF' && !formData.cpf) {
      setErroSenha(t('cadastroUsuario.cpfOblig', { defaultValue: 'CPF obligatorio para persona física.' }));
      return;
    }
    if (formData.tipoPessoa === 'PJ' && !formData.cnpj) {
      setErroSenha(t('cadastroUsuario.cnpjOblig', { defaultValue: 'CNPJ obligatorio para persona jurídica.' }));
      return;
    }

    setErroSenha('');

    const registroCompleto = {
      ...formData,
      usuario: usuarioFinal,
      nomeCompleto: nomePortal || formData.nomeCompleto,
      email: emailPortal || formData.email,
      codigoRegistro: formData.codigoRegistro || generarCodigoCadastro(formData.tipoPessoa, formData.dataNascimento),
      dataCadastro: formData.dataCadastro || new Date().toLocaleString('pt-BR'),
      disponibilidade: formData.status || 'Ativo',
      tipo: 'usuario',
      listaDestino: formData.tipoPessoa === 'PJ' ? 'empresas' : 'produtores',
      roles: ['hacendado'],
      hasDronesPassword: pedirClave || yaTieneClaveDrones,
      fotoUrl: fotoPreview || formData.fotoUrl || null,
    };

    if (!isEditing) {
      const result = registerUser(registroCompleto);
      if (!result.success) {
        setErroSenha(result.message);
        return;
      }
    } else {
      const result = updateUser(registroCompleto);
      if (!result.success) {
        setErroSenha(result.message || t('cadastroUsuario.erroUpdate', { defaultValue: 'Error al actualizar el perfil.' }));
        return;
      }
    }

    setCadastroResultado(registroCompleto);
    if (onSalvar) onSalvar(registroCompleto);
  };

  // ==========================================
  // BAJA DEL SUBDOMINIO (NO BORRA EL PORTAL)
  // ==========================================
  const handleRetiro = () => {
    const registroCancelado = {
      ...formData,
      status: 'Cancelado',
      dataCancelamento: new Date().toLocaleString('pt-BR'),
    };
    updateUser(registroCancelado);
    setCadastroResultado(registroCancelado);
    setMostrarConfirmacaoRetiro(false);
  };

  return (
    <div className="cadastro-container">
      {/* ==========================================
          CABECERA DE ESTA FICHA (NO LA FRASE DEL GRID)
          ========================================== */}
      <div className="cadastro-header">
        <h2>
          {isEditing
            ? t('cadastroUsuario.tituloEdit', { defaultValue: 'Editar perfil de usuario / contratante' })
            : t('cadastroUsuario.titulo', { defaultValue: 'Registro de usuario / contratante' })}
        </h2>
        <p>
          {t('cadastroUsuario.sub', {
            defaultValue: 'Al completar el formulario nace su panel de perfil.',
          })}
        </p>
      </div>

      {/* ==========================================
          VERACIDAD + LEYENDA INFORMATIVA DEL SITE
          ========================================== */}
      <div className="aviso-box">
        <strong>{t('cadastroUsuario.veracidadTitulo', { defaultValue: 'Declaración de veracidad de la información' })}</strong>
        <p>
          {t('cadastroUsuario.veracidadTexto', {
            defaultValue:
              'Al completar este formulario declara que todos los datos son verdaderos, exactos y de su entera responsabilidad. Datos falsos pueden suspender el perfil.',
          })}
        </p>
        <p className="help-text">
          {t('cadastroUsuario.leyendaInfo', {
            defaultValue:
              'El portal drones.orientese.com ofrece solo un servicio informativo. No vende drones ni piezas ni presta servicios. Cualquier anuncio publicado es de exclusiva responsabilidad del usuario.',
          })}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ==========================================
            BLOQUE 1: PF O PJ + DATOS CIVILES
            ========================================== */}
        <section className="form-section">
          <h3>1. {t('cadastroUsuario.bloque1', { defaultValue: 'Datos del contratante' })}</h3>
          <div className="form-group full-width">
            <label>{t('cadastroUsuario.tipoPessoa', { defaultValue: 'Tipo de persona' })} *</label>
            <div className="radio-group">
              <label className="radio-item">
                <input type="radio" name="tipoPessoa" value="PF" checked={formData.tipoPessoa === 'PF'} onChange={handleChange} disabled={isEditing} />
                {t('cadastroUsuario.pf', { defaultValue: 'Persona física (hacendado / productor)' })}
              </label>
              <label className="radio-item">
                <input type="radio" name="tipoPessoa" value="PJ" checked={formData.tipoPessoa === 'PJ'} onChange={handleChange} disabled={isEditing} />
                {t('cadastroUsuario.pj', { defaultValue: 'Persona jurídica (empresa)' })}
              </label>
            </div>
          </div>

          <div className="form-grid">
            {formData.tipoPessoa === 'PF' ? (
              <>
                <div className="form-group full-width">
                  <label>{t('cadastroUsuario.nome', { defaultValue: 'Nombre completo' })} *</label>
                  <input type="text" name="nomeCompleto" value={nomePortal || formData.nomeCompleto} onChange={handleChange} required readOnly={Boolean(nomePortal)} />
                </div>
                <div className="form-group">
                  <label>CPF *</label>
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required placeholder="000.000.000-00" />
                </div>
                <div className="form-group">
                  <label>{t('cadastroUsuario.nascimento', { defaultValue: 'Fecha de nacimiento' })} *</label>
                  <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                </div>
              </>
            ) : (
              <>
                <div className="form-group full-width">
                  <label>{t('cadastroUsuario.razao', { defaultValue: 'Razón social' })} *</label>
                  <input type="text" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t('cadastroUsuario.fantasia', { defaultValue: 'Nombre comercial' })}</label>
                  <input type="text" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>CNPJ *</label>
                  <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required placeholder="00.000.000/0000-00" />
                </div>
              </>
            )}
            <div className="form-group full-width">
              <label>{t('cadastroUsuario.foto', { defaultValue: 'Foto / logo (opcional)' })}</label>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFotoChange} />
              <span className="help-text">{t('cadastroUsuario.fotoHelp', { defaultValue: 'Formatos: JPG, PNG o WebP. Máximo: 2 MB.' })}</span>
              {fotoPreview && <img src={fotoPreview} alt="Preview" className="preview-photo" />}
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOQUE 2: CONTACTO. TELEFONO 2 = TELEGRAM
            ========================================== */}
        <section className="form-section">
          <h3>2. {t('cadastroUsuario.bloque2', { defaultValue: 'Contacto y dirección' })}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>E-mail *</label>
              <input type="email" name="email" value={emailPortal || formData.email} onChange={handleChange} required disabled={isEditing || Boolean(emailPortal)} />
            </div>
            <div className="form-group">
              <label>WhatsApp *</label>
              <input type="tel" name="telefone1" value={formData.telefone1} onChange={handleChange} required placeholder="(00) 90000-0000" />
            </div>
            <div className="form-group">
              <label>Telegram ({t('cadastroUsuario.opcional', { defaultValue: 'opcional' })})</label>
              <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="@usuario" />
            </div>
            <div className="form-group">
              <label>CEP *</label>
              <input type="text" name="cep" value={formData.endereco.cep} onChange={handleEnderecoChange} required />
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroUsuario.logradouro', { defaultValue: 'Dirección completa' })} *</label>
              <input type="text" name="logradouro" value={formData.endereco.logradouro} onChange={handleEnderecoChange} required />
            </div>
            <div className="form-group">
              <label>{t('cadastroUsuario.cidade', { defaultValue: 'Ciudad' })} *</label>
              <input type="text" name="cidade" value={formData.endereco.cidade} onChange={handleEnderecoChange} required />
            </div>
            <div className="form-group">
              <label>{t('cadastroUsuario.estado', { defaultValue: 'Estado (UF)' })} *</label>
              <select name="estado" value={formData.endereco.estado} onChange={handleEnderecoChange}>
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOQUE 3: USO. AREA Y ESTADOS SEPARADOS
            SERVICIOS Y UF EN DOS COLUMNAS
            ========================================== */}
        <section className="form-section">
          <h3>3. {t('cadastroUsuario.bloque3', { defaultValue: 'Perfil de uso' })}</h3>
          <div className="form-group full-width">
            <label>{t('cadastroUsuario.tipoUsuario', { defaultValue: 'Tipo de usuario' })} *</label>
            <select name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} required>
              <option value="">{t('cadastroUsuario.seleccione', { defaultValue: 'Seleccione...' })}</option>
              {TIPOS_USUARIO.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="form-group full-width">
            <label>{t('cadastroUsuario.servicos', { defaultValue: 'Principales servicios que solicita' })}</label>
            <div className="checkbox-group checkbox-group-2col">
              {SERVICOS_SOLICITADOS.map((servico) => (
                <label key={servico} className="checkbox-item">
                  <input type="checkbox" checked={formData.servicosSolicitados.includes(servico)} onChange={() => handleArrayToggle('servicosSolicitados', servico)} />
                  {servico}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>{t('cadastroUsuario.areaHa', { defaultValue: 'Área aproximada de la propiedad (ha)' })}</label>
            <input type="number" name="areaPropriedadeHa" value={formData.areaPropriedadeHa} onChange={handleChange} placeholder="150" />
          </div>
          <div className="form-group">
            <label>{t('cadastroUsuario.frequencia', { defaultValue: 'Frecuencia de uso esperada' })}</label>
            <select name="frequenciaUso" value={formData.frequenciaUso} onChange={handleChange}>
              <option value="ocasional">{t('cadastroUsuario.freq1', { defaultValue: 'Ocasional (1-3 veces al año)' })}</option>
              <option value="regular">{t('cadastroUsuario.freq2', { defaultValue: 'Regular (mensual)' })}</option>
              <option value="intensivo">{t('cadastroUsuario.freq3', { defaultValue: 'Intensivo (semanal o más)' })}</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>{t('cadastroUsuario.estados', { defaultValue: 'Estados de interés' })}</label>
            <div className="checkbox-group checkbox-group-2col">
              {ESTADOS_BRASIL.map((uf) => (
                <label key={uf} className="checkbox-item">
                  <input type="checkbox" checked={formData.estadosInteresse.includes(uf)} onChange={() => handleArrayToggle('estadosInteresse', uf)} />
                  {uf}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOQUE 4: VISIBILIDAD
            PF ELIGE SI APARECE Y QUE SE PUBLICA
            PJ VA AL DIRECTORIO DE EMPRESAS
            SIN CASILLA DE PRESUPUESTOS AUTOMATICOS
            ========================================== */}
        <section className="form-section">
          <h3>4. {t('cadastroUsuario.bloque4', { defaultValue: 'Visibilidad y contacto' })}</h3>

          {formData.tipoPessoa === 'PF' && (
            <>
              <label className="checkbox-item">
                <input type="checkbox" name="aparecerListaProdutores" checked={formData.aparecerListaProdutores} onChange={handleChange} />
                {t('cadastroUsuario.aparecerPf', { defaultValue: 'Quiero aparecer en la lista de productores / hacendados (REGISTRADOS).' })}
              </label>
              {formData.aparecerListaProdutores && (
                <div className="checkbox-group">
                  <p className="help-text">{t('cadastroUsuario.publicoHelp', { defaultValue: 'Solo se publica lo marcado:' })}</p>
                  <label className="checkbox-item">
                    <input type="checkbox" name="publicarNome" checked={formData.publicarNome} onChange={handleChange} />
                    {t('cadastroUsuario.pubNome', { defaultValue: 'Publicar nombre para mostrar' })}
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" name="publicarZona" checked={formData.publicarZona} onChange={handleChange} />
                    {t('cadastroUsuario.pubZona', { defaultValue: 'Publicar ciudad / estado' })}
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" name="publicarWhatsapp" checked={formData.publicarWhatsapp} onChange={handleChange} />
                    {t('cadastroUsuario.pubWpp', { defaultValue: 'Publicar WhatsApp' })}
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" name="publicarEmail" checked={formData.publicarEmail} onChange={handleChange} />
                    {t('cadastroUsuario.pubEmail', { defaultValue: 'Publicar e-mail' })}
                  </label>
                </div>
              )}
            </>
          )}

          {formData.tipoPessoa === 'PJ' && (
            <p className="help-text">
              {t('cadastroUsuario.aparecerPj', {
                defaultValue:
                  'La empresa aparecerá en el directorio de personas jurídicas (REGISTRADOS) con el nombre comercial o razón social y la forma de contacto indicada.',
              })}
            </p>
          )}

          <label className="checkbox-item">
            <input type="checkbox" name="aceitaContatoComercial" checked={formData.aceitaContatoComercial} onChange={handleChange} />
            {t('cadastroUsuario.pref2', {
              defaultValue:
                'Acepto contacto comercial y novedades del portal o de miembros del subdominio (pilotos, profesionales, auxiliares, anunciantes / patrocinadores, etc.).',
            })}
          </label>

          <div className="form-group full-width">
            <label>{t('cadastroUsuario.obs', { defaultValue: 'Observaciones adicionales' })}</label>
            <textarea name="observacoes" rows="3" value={formData.observacoes} onChange={handleChange} />
          </div>
        </section>

        {/* ==========================================
            BLOQUE 5: SOLO EDICION. PAUSA / BAJA
            ========================================== */}
        {isEditing && (
          <section className="form-section">
            <h3>5. {t('cadastroUsuario.bloque5', { defaultValue: 'Estado y pausa' })}</h3>
            <div className="form-group">
              <label>{t('cadastroUsuario.status', { defaultValue: 'Estado actual' })}</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Ativo">{t('cadastroUsuario.ativo', { defaultValue: 'Activo' })}</option>
                <option value="Pausado">{t('cadastroUsuario.pausado', { defaultValue: 'Pausado' })}</option>
              </select>
            </div>
            {formData.status === 'Pausado' && (
              <div className="form-section">
                <div className="form-group">
                  <label>{t('cadastroUsuario.motivoPausa', { defaultValue: 'Motivo de la pausa' })}</label>
                  <select name="motivoPausa" value={formData.motivoPausa} onChange={handleChange}>
                    <option value="">{t('cadastroUsuario.seleccione', { defaultValue: 'Seleccione...' })}</option>
                    <option value="ferias">{t('cadastroUsuario.ferias', { defaultValue: 'Vacaciones' })}</option>
                    <option value="viagem">{t('cadastroUsuario.viagem', { defaultValue: 'Viaje' })}</option>
                    <option value="doenca">{t('cadastroUsuario.doenca', { defaultValue: 'Salud' })}</option>
                    <option value="outro">{t('cadastroUsuario.outro', { defaultValue: 'Otro' })}</option>
                  </select>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>{t('cadastroUsuario.inicioPausa', { defaultValue: 'Inicio de la pausa' })}</label>
                    <input type="date" name="dataInicioPausa" value={formData.dataInicioPausa} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>{t('cadastroUsuario.fimPausa', { defaultValue: 'Previsión de retorno' })}</label>
                    <input type="date" name="dataFimPausa" value={formData.dataFimPausa} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}
            <div className="danger-zone">
              <h4>{t('cadastroUsuario.retiroTitulo', { defaultValue: 'Retiro / baja' })}</h4>
              <p>{t('cadastroUsuario.retiroTexto', { defaultValue: 'El perfil se desactiva en este subdominio.' })}</p>
              <button type="button" className="btn-excluir" onClick={() => setMostrarConfirmacaoRetiro(true)}>
                {t('cadastroUsuario.retiroBtn', { defaultValue: 'Solicitar retiro / dar de baja' })}
              </button>
            </div>
          </section>
        )}

        {/* ==========================================
            BLOQUE 6: USUARIO ARRIBA. CLAVE DEBAJO
            SI YA HAY USUARIO DEL PORTAL: SOLO LECTURA
            SI YA HAY CLAVE DRONES: NO PEDIR OTRA
            ========================================== */}
        <section className="form-section">
          <h3>6. {t('cadastroUsuario.bloque6', { defaultValue: 'Usuario y contraseña del subdominio drones' })}</h3>
          <div className="form-group full-width">
            <label>{t('cadastroUsuario.usuario', { defaultValue: 'Nombre de usuario' })} *</label>
            <input
              type="text"
              name="usuario"
              value={usuarioPortal || formData.usuario}
              onChange={handleChange}
              required
              readOnly={usuarioFijo}
            />
            <span className="help-text">
              {usuarioFijo
                ? t('cadastroUsuario.usuarioPortal', { defaultValue: 'Este nombre ya viene del registro en orientese.com.' })
                : t('cadastroUsuario.usuarioNuevo', { defaultValue: 'Primer registro: elija un nombre de usuario. Queda atado a esta única cuenta de drones.' })}
            </span>
          </div>
          {pedirClave && (
            <div className="form-grid">
              <div className="form-group">
                <label>{t('cadastroUsuario.senha', { defaultValue: 'Contraseña' })} *</label>
                <div className="password-wrap">
                  <input type={mostrarSenha ? 'text' : 'password'} name="senha" value={formData.senha} onChange={handleChange} required={pedirClave} />
                  <button type="button" className="password-toggle" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? t('cadastroUsuario.ocultar', { defaultValue: 'Ocultar' }) : t('cadastroUsuario.mostrar', { defaultValue: 'Mostrar' })}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>{t('cadastroUsuario.confirmar', { defaultValue: 'Confirmar contraseña' })} *</label>
                <div className="password-wrap">
                  <input type={mostrarConfirmarSenha ? 'text' : 'password'} name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required={pedirClave} />
                  <button type="button" className="password-toggle" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                    {mostrarConfirmarSenha ? t('cadastroUsuario.ocultar', { defaultValue: 'Ocultar' }) : t('cadastroUsuario.mostrar', { defaultValue: 'Mostrar' })}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {erroSenha && <p className="erro">{erroSenha}</p>}

        {/* ==========================================
            CTA PERFIL (CUENTA) + VOLVER A LA DERECHA
            ========================================== */}
        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {isEditing
              ? t('cadastroUsuario.salvar', { defaultValue: 'Guardar perfil' })
              : t('cadastroUsuario.finalizar', { defaultValue: 'Finalizar perfil (cuenta)' })}
          </button>
          {onCancelar && (
            <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
              {t('cadastroUsuario.volver', { defaultValue: 'Volver al inicio' })}
            </button>
          )}
        </div>
      </form>

      {/* ==========================================
          CONFIRMACION DE BAJA
          ========================================== */}
      {mostrarConfirmacaoRetiro && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <h3>{t('cadastroUsuario.confirmarRetiro', { defaultValue: 'Confirmar retiro' })}</h3>
            <div className="form-actions">
              <button type="button" className="btn-cancelar" onClick={() => setMostrarConfirmacaoRetiro(false)}>
                {t('cadastroUsuario.cancelar', { defaultValue: 'Cancelar' })}
              </button>
              <button type="button" className="btn-excluir" onClick={handleRetiro}>
                {t('cadastroUsuario.confirmar', { defaultValue: 'Confirmar retiro' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          RESULTADO. NO HAY PAGO AQUI
          ========================================== */}
      {cadastroResultado && (
        <div className="success-card">
          <h3>
            {cadastroResultado.status === 'Cancelado'
              ? t('cadastroUsuario.cancelado', { defaultValue: 'Perfil desactivado' })
              : t('cadastroUsuario.ok', { defaultValue: 'Perfil guardado' })}
          </h3>
          {cadastroResultado.status !== 'Cancelado' && (
            <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
          )}
        </div>
      )}
    </div>
  );
}