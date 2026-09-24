// ==========================================
// PASO 2 — TIPO DE CADASTRO
// VISITANTE: CASILLA DE AVISO DE CURSOS + MODAL. SEM CONTA / SEM FICHA
// PLAN PAGO: VISITANTE BLOQUEADO
// CTA SELECIONAR = MISMAS CLASES QUE LOS CARDS DE PLANOS
// UI EN PT. COMENTARIOS EN CASTELLANO Y MAYÚSCULAS
// ==========================================

import { useState } from 'react';
import ModalAvisoCursos from '../../../components/drones/modals/ModalAvisoCursos';
import { TIPOS_CADASTRO, planoEsPago } from './cadastroPlanes';

export default function CadastroPaso2({
  planoId,
  tipoCadastro,
  onSelecionarTipo,
}) {
  const [modalAvisoAberto, setModalAvisoAberto] = useState(false);
  const [querAviso, setQuerAviso] = useState(false);
  const [avisoEnviado, setAvisoEnviado] = useState(false);

  const pago = planoEsPago(planoId);

  const handleSelecionar = (tipoId, bloqueado) => {
    if (bloqueado) return;
    onSelecionarTipo(tipoId);
    if (tipoId !== 'visitante') {
      setQuerAviso(false);
      setModalAvisoAberto(false);
    }
  };

  const handleCheckAviso = (e) => {
    const marcado = e.target.checked;
    setQuerAviso(marcado);
    setModalAvisoAberto(marcado);
  };

  const handleCerrarModal = () => {
    setModalAvisoAberto(false);
    if (!avisoEnviado) setQuerAviso(false);
  };

  return (
    <section className="cadastro-paso cadastro-paso-2">
      <h2 className="cadastro-paso-titulo">Cadastros</h2>
      <p className="cadastro-paso-sub">
        Escolha o tipo de cadastro de acordo com o plano selecionado.
      </p>

      <div className="cadastro-cards">
        {TIPOS_CADASTRO.map((tipo) => {
          const bloqueado = tipo.id === 'visitante' && pago;
          const ativo = tipoCadastro === tipo.id && !bloqueado;

          return (
            <article
              key={tipo.id}
              className={`cadastro-card ${ativo ? 'cadastro-card-ativo' : ''} ${
                bloqueado ? 'cadastro-card-bloqueado' : ''
              }`}
            >
              <h3 className="cadastro-card-nome">{tipo.nome}</h3>
              <p className="cadastro-card-para">{tipo.paraQuem}</p>
              <p className="cadastro-card-alcance">{tipo.alcance}</p>

              {bloqueado && (
                <p className="cadastro-card-bloqueio">
                  Disponível apenas no cadastro gratuito.
                </p>
              )}

              <button
                type="button"
                className="cadastro-card-cta"
                disabled={bloqueado}
                onClick={() => handleSelecionar(tipo.id, bloqueado)}
              >
                Selecionar
              </button>
            </article>
          );
        })}
      </div>

      {tipoCadastro === 'visitante' && !pago && (
        <div className="cadastro-aviso-box">
          <label className="cadastro-aviso-check">
            <input
              type="checkbox"
              checked={querAviso}
              onChange={handleCheckAviso}
            />
            <span>
              Quero receber avisos de cursos relacionados a drones e afins
              (piloto, manutenção, mecânica, mapeamento, etc.).
            </span>
          </label>

          {avisoEnviado && (
            <p className="cadastro-aviso-ok">
              Pedido enviado. Você receberá avisos neste e-mail.
            </p>
          )}
        </div>
      )}

      <ModalAvisoCursos
        isOpen={modalAvisoAberto}
        onClose={handleCerrarModal}
        onEnviado={() => {
          setAvisoEnviado(true);
          setQuerAviso(true);
        }}
      />
    </section>
  );
}