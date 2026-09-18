/* =========================================================
   PASO 2: TIPOS DE CADASTRO SEGÚN EL PLANO.
   SE PUEDE MIRAR TODO. SOLO SE HABILITA LO DEL PLANO.
   ========================================================= */
import { TIPOS } from "./cadastroPlanes";

export default function CadastroPaso2({ plano, onElegirTipo }) {
  return (
    <section>
      <h2>Cadastros disponíveis</h2>
      {!plano && <p>Você pode olhar os tipos. Escolha um plano no passo 1 para habilitar a ficha.</p>}
      <div className="cad-grid">
        {TIPOS.map((t) => {
          const ok = !plano || plano.tiposPermitidos.includes(t.id);
          return (
            <article key={t.id} className={`cad-card ${ok ? "" : "is-off"}`}>
              <h3>{t.nome}</h3>
              <p>Prefixo do código: {t.prefixo}</p>
              {!ok && <p>Não incluso neste plano.</p>}
              <button type="button" disabled={!ok} onClick={() => onElegirTipo(t.id)}>
                {ok ? "Selecionar" : "Bloqueado"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}