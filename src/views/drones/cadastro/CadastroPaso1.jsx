/* =========================================================
   PASO 1: VISITANTE + OBSERVACIÓN IMPORTANTE.
   LUEGO CARDS PLUS / PRO / ELITE.
   NOMBRE + A QUIÉN VA + PRECIO + BENEFÍCIOS + MAIS.
   ========================================================= */
import { useState } from "react";
import { PLANES, LEYENDAS_PLANOS } from "./cadastroPlanes";

function CardPlan({ plan, className, onElegir }) {
  const [aberto, setAberto] = useState(false);

  return (
    <article className={`cad-card ${className}`}>
      <h3>{plan.nome}</h3>
      <p className="cad-dirigido">{plan.dirigidoA}</p>
      <p className="cad-price">US$ {plan.precoUsd} / ano</p>
      <p className="cad-price-note">Na fatura o total sai na moeda local, câmbio do dia.</p>

      <h4 className="cad-ben-title">Benefícios</h4>
      <ul>
        {plan.beneficios.map((b) => (
          <li key={b} className={b.startsWith("Renovação") ? "cad-ben-destaque" : undefined}>
            {b}
          </li>
        ))}
      </ul>

      {plan.beneficiosExtra?.length > 0 && (
        <>
          <button type="button" className="cad-mais" onClick={() => setAberto((v) => !v)}>
            {aberto ? "Menos" : "Mais"}
          </button>
          {aberto && (
            <ul className="cad-extra">
              {plan.beneficiosExtra.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </>
      )}

      <button type="button" className={`btn-${plan.id}`} onClick={() => onElegir(plan.id)}>
        Continuar com {plan.nome}
      </button>
    </article>
  );
}

export default function CadastroPaso1({ onElegirPlano }) {
  const v = PLANES.visitante;

  return (
    <section>
      <div className="cad-grid cad-grid-top">
        <article className="cad-visit">
          <h2>Visitante gratuito</h2>
          <p className="cad-dirigido">{v.dirigidoA}</p>
          <h4 className="cad-ben-title">Benefícios</h4>
          <ul>
            {v.beneficios.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <button type="button" className="btn-ghost" onClick={() => onElegirPlano("visitante")}>
            Cadastrar como visitante
          </button>
        </article>

        <aside className="cad-normas">
          <h2>Observação importante</h2>
          {LEYENDAS_PLANOS.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </aside>
      </div>

      <div className="cad-grid">
        <CardPlan plan={PLANES.plus} className="cad-plus" onElegir={onElegirPlano} />
        <CardPlan plan={PLANES.pro} className="cad-pro" onElegir={onElegirPlano} />
        <CardPlan plan={PLANES.elite} className="cad-elite" onElegir={onElegirPlano} />
      </div>
    </section>
  );
}