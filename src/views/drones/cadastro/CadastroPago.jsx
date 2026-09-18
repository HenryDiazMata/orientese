/* =========================================================
   PASO 4: PAGO MOCK.
   SE PUEDE MIRAR. NO SE CONFIRMA SIN FICHA.
   CTA DE PERFIL SOLO DESPUÉS DEL MOCK (O ALTA GRÁTIS).
   ========================================================= */

export default function CadastroPago({ fichaOk, pagoMockOk, plano, planoId, codigo, onIrFicha, onConfirmarPago }) {
  return (
    <section>
      <h2>Pagamento</h2>

      {!fichaOk && (
        <p>
          Você pode ver esta etapa. Não há pagamento com ficha vazia.{" "}
          <button type="button" onClick={onIrFicha}>
            Ir à ficha
          </button>
        </p>
      )}

      {fichaOk && planoId === "visitante" && (
        <p>
          Visitante não paga. Código: <strong>{codigo}</strong>
        </p>
      )}

      {fichaOk && planoId !== "visitante" && !pagoMockOk && (
        <div>
          <p>
            Plano {plano?.nome} — US$ {plano?.precoUsd} / ano. Mock apenas. Sem checkout real.
          </p>
          <p>Código reservado: {codigo}</p>
          <button type="button" className="btn-elite" onClick={onConfirmarPago}>
            Confirmar pagamento mock
          </button>
        </div>
      )}

      {pagoMockOk && (
        <div>
          <p>
            Cadastro ativo (mock). Código {codigo}.
          </p>
          <a href="/perfil">Entrar no meu perfil</a>
        </div>
      )}
    </section>
  );
}