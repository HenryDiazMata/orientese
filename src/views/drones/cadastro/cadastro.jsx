// ==========================================
// HUB CADASTRO / REGISTRO
// ID DE VISTA EN EL ORQUESTADOR: CADASTRO
// ES = REGISTRO | PT = CADASTRO
// ELIGE TIPO → MONTA EL FORMULARIO YA EXISTENTE
// NO MUESTRA PRECIOS. NO HAY PASO PAGAMENTO.
// SIN CAJA DE FRASE DE PAGO (ESA VA EN INICIO / PLANES / ACTIVAR)
// VISITANTE-BETA NO SE OFRECE AQUI
// AL COMPLETAR EL FORMULARIO NACE EL PANEL DE PERFIL
// TIEMPO ESTIMADO VA EN CADA CARD, NO DENTRO DE LA FICHA
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../../components/drones/i18n';
import '../css/Cadastro.css';
import { TIPOS_CADASTRO } from './cadastroPlanes';

import CadastroUsuario from '../../../components/drones/formularios/CadastroUsuario.jsx';
import CadastroPiloto from '../../../components/drones/formularios/CadastroPiloto.jsx';
import CadastroAuxiliar from '../../../components/drones/formularios/CadastroAuxiliar.jsx';
import CadastroManutencao from '../../../components/drones/formularios/CadastroManutencao.jsx';
import CadastroConserto from '../../../components/drones/formularios/CadastroConserto.jsx';
import CadastroProfissionais from '../../../components/drones/formularios/CadastroProfissionais.jsx';

export default function Cadastro({ setCurrentView }) {
  // ==========================================
  // INSTANCIA PROPIA. NO CAER AL FALLBACK PT-BR DEL PORTAL
  // ==========================================
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const [tipoId, setTipoId] = useState(null);

  const titulo = t('nav.register', {
    defaultValue: t('inicio.btnCadastro', { defaultValue: 'REGISTRO' }),
  });

  // ==========================================
  // AL GUARDAR FICHA: SALE DEL BETA Y ENTRA AL PERFIL
  // ==========================================
  const irPerfil = () => {
    if (typeof setCurrentView === 'function') {
      setCurrentView('PERFIL');
    }
  };

  // ==========================================
  // VOLVER DEL FORM: INICIO DEL SUBDOMINIO
  // ==========================================
  const irInicio = () => {
    if (typeof setCurrentView === 'function') {
      setCurrentView('INICIO');
    }
  };

  const renderFicha = () => {
    if (tipoId === 'hacendado') {
      return (
        <CadastroUsuario
          onSalvar={irPerfil}
          onCancelar={irInicio}
        />
      );
    }
    if (tipoId === 'piloto') {
      return <CadastroPiloto onSalvar={irPerfil} onCancelar={irInicio} />;
    }
    if (tipoId === 'auxiliar') {
      return <CadastroAuxiliar onSalvar={irPerfil} onCancelar={irInicio} />;
    }
    if (tipoId === 'manutencao') {
      return <CadastroManutencao onSalvar={irPerfil} onCancelar={irInicio} />;
    }
    if (tipoId === 'conserto') {
      return <CadastroConserto onSalvar={irPerfil} onCancelar={irInicio} />;
    }
    if (tipoId === 'profissional') {
      return (
        <CadastroProfissionais
          onSalvar={irPerfil}
          onCancelar={irInicio}
          onVerLista={() => setCurrentView && setCurrentView('PROFISSIONAIS')}
        />
      );
    }
    return null;
  };

  return (
    <div className="cad-page">
      <div className="cad-top">
        <div>
          <h1>{titulo}</h1>
          {/* ==========================================
              SUBTITULO SOLO EN EL GRID. NUNCA "ELIJA EL TIPO"
              ========================================== */}
          {!tipoId && (
            <p className="cad-sub">
              {t('cadastro.sub', {
                defaultValue: 'Al completar el formulario nace su panel de perfil.',
              })}
            </p>
          )}
        </div>
      </div>

      {tipoId ? (
        <div className="cad-ficha-wrap">
          {renderFicha()}
        </div>
      ) : (
        <div className="cad-grid-tipos">
          {TIPOS_CADASTRO.map((tipo) => (
            <article
              key={tipo.id}
              className={`cad-card-tipo ${tipoId === tipo.id ? 'is-on' : ''}`}
            >
              <h3>{t(tipo.nomeKey, { defaultValue: tipo.id })}</h3>
              <p>{t(tipo.paraKey, { defaultValue: '' })}</p>
              <p>{t(tipo.alcanceKey, { defaultValue: '' })}</p>
              {/* ==========================================
                  TIEMPO ESTIMADO POR TIPO. CLAVE EN cadastroPlanes
                  ========================================== */}
              <p className="cad-tiempo">
                {t(tipo.tiempoKey, {
                  defaultValue: 'Tiempo estimado: tómese el tiempo con calma.',
                })}
              </p>
              <button
                type="button"
                className="cad-card-cta"
                onClick={() => setTipoId(tipo.id)}
              >
                {t('cadastro.seleccionar', { defaultValue: 'Seleccionar' })}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}