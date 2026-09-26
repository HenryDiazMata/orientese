// ==========================================
// HUB CADASTRO / REGISTRO
// ID DE VISTA EN EL ORQUESTADOR: CADASTRO
// ES = REGISTRO | PT = CADASTRO
// ELIGE TIPO → MONTA EL FORMULARIO YA EXISTENTE
// NO MUESTRA PRECIOS. NO HAY PASO PAGAMENTO.
// VISITANTE-BETA NO SE OFRECE AQUI.
// AL COMPLETAR EL FORMULARIO NACE EL PANEL DE PERFIL.
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

const FRASE_PAGO =
  'El plan se paga íntegro al cadastrarse. Si su tarjeta internacional admite cuotas, las condiciones las fija su banco, no drones.orientese.com.';

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

  const renderFicha = () => {
    const volver = () => setTipoId(null);

    if (tipoId === 'hacendado') {
      return <CadastroUsuario onSalvar={irPerfil} onCancelar={volver} />;
    }
    if (tipoId === 'piloto') {
      return <CadastroPiloto onSalvar={irPerfil} />;
    }
    if (tipoId === 'auxiliar') {
      return <CadastroAuxiliar onSalvar={irPerfil} onCancelar={volver} />;
    }
    if (tipoId === 'manutencao') {
      return <CadastroManutencao onSalvar={irPerfil} onCancelar={volver} />;
    }
    if (tipoId === 'conserto') {
      return <CadastroConserto onSalvar={irPerfil} onCancelar={volver} />;
    }
    if (tipoId === 'profissional') {
      return (
        <CadastroProfissionais
          onSalvar={irPerfil}
          onCancelar={volver}
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
          <p className="cad-sub">
            {t('cadastro.sub', {
              defaultValue:
                'Elija el tipo de registro. Al completar el formulario nace su panel de perfil.',
            })}
          </p>
        </div>
      </div>

      <p className="cad-frase-pago">
        {t('inicio.frasePago', { defaultValue: FRASE_PAGO })}
      </p>

      {tipoId ? (
        <div className="cad-ficha-wrap">
          <button type="button" className="cad-volver" onClick={() => setTipoId(null)}>
            {t('common.back', { defaultValue: 'Volver' })}
          </button>
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