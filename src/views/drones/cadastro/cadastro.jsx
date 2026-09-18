/* =========================================================
   CASCARÓN DEL WIZARD CADASTRO.
   ORQUESTA PASOS. NO LLEVA COPY DE PLANOS NI EL FORM.
   ========================================================= */
import { useMemo, useState } from "react";
import "./Cadastro.css";
import { PLANES, PASOS, FICHA_VACIA, TIPOS, generarCodigo } from "./cadastroPlanes";
import CadastroPaso1 from "./CadastroPaso1";
import CadastroPaso2 from "./CadastroPaso2";
import CadastroFicha from "./CadastroFicha";
import CadastroPago from "./CadastroPago";

export default function Cadastro() {
  const [pasoVista, setPasoVista] = useState(1);
  const [planoId, setPlanoId] = useState(null);
  const [tipoId, setTipoId] = useState(null);
  const [ficha, setFicha] = useState(FICHA_VACIA);
  const [fichaOk, setFichaOk] = useState(false);
  const [pagoMockOk, setPagoMockOk] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [msg, setMsg] = useState("");

  const plano = planoId ? PLANES[planoId] : null;

  const fichaCompleta = useMemo(() => {
    if (!tipoId) return false;
    if (!ficha.nome.trim() || !ficha.email.trim() || !ficha.nascimento || !ficha.pais.trim() || !ficha.fuso.trim()) {
      return false;
    }
    if (ficha.avisosCursos && ficha.emailConfirm.trim().toLowerCase() !== ficha.email.trim().toLowerCase()) {
      return false;
    }
    if (ficha.querWhatsapp && !ficha.whatsapp.trim()) return false;
    if (ficha.querTelegram && !ficha.telegram.trim()) return false;
    return true;
  }, [ficha, tipoId]);

  function irPaso(n) {
    /* SE PUEDE MIRAR CUALQUIER PASO. NO PAGAR CON FICHA VACÍA. */
    setMsg("");
    setPasoVista(n);
  }

  function elegirPlano(id) {
    setPlanoId(id);
    setTipoId(id === "visitante" ? "visitante" : null);
    setFichaOk(false);
    setPagoMockOk(false);
    setCodigo("");
    setPasoVista(id === "visitante" ? 3 : 2);
  }

  function elegirTipo(id) {
    if (plano && !plano.tiposPermitidos.includes(id)) return;
    setTipoId(id);
    setFichaOk(false);
    setPagoMockOk(false);
    setPasoVista(3);
  }

  function guardarFicha(e) {
    e.preventDefault();
    if (!tipoId) {
      setMsg("Escolha um tipo de cadastro.");
      return;
    }
    if (!fichaCompleta) {
      setMsg("Complete a ficha. Se pediu avisos, confirme o e-mail.");
      return;
    }
    const code = generarCodigo(tipoId);
    setCodigo(code);
    setFichaOk(true);
    if (planoId === "visitante") {
      setPagoMockOk(true);
      try {
        localStorage.setItem(
          "or_cadastro_mock",
          JSON.stringify({ planoId, tipoId, ficha, codigo: code, pagoMockOk: true })
        );
      } catch (_) {}
      setMsg("Cadastro de visitante gravado (mock).");
      setPasoVista(4);
      return;
    }
    setPasoVista(4);
  }

  function confirmarPagoMock() {
    if (!fichaOk) {
      setMsg("Não é possível pagar com ficha vazia.");
      setPasoVista(3);
      return;
    }
    setPagoMockOk(true);
    try {
      localStorage.setItem(
        "or_cadastro_mock",
        JSON.stringify({ planoId, tipoId, ficha, codigo, pagoMockOk: true })
      );
    } catch (_) {}
    setMsg("Pagamento mock confirmado.");
  }

  return (
    <div className="cad-page">
      <header className="cad-top">
        <div>
          <h1>Área de Cadastros</h1>
          <p className="cad-sub">Veja os planos. O pagamento vem no fim.</p>
        </div>
        <div className="cad-step-badge">Passo {pasoVista} de 4</div>
      </header>

      <nav className="cad-path" aria-label="Caminho dos passos">
        {PASOS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`cad-path-item ${pasoVista === p.n ? "is-on" : ""}`}
            onClick={() => irPaso(p.n)}
          >
            <span className="cad-path-n">{p.n}</span>
            <span>{p.titulo}</span>
          </button>
        ))}
      </nav>

      {msg ? <p className="cad-msg">{msg}</p> : null}

      {pasoVista === 1 && <CadastroPaso1 onElegirPlano={elegirPlano} />}
      {pasoVista === 2 && <CadastroPaso2 plano={plano} onElegirTipo={elegirTipo} />}
      {pasoVista === 3 && (
        <CadastroFicha
          tipoId={tipoId}
          planoId={planoId}
          ficha={ficha}
          setFicha={setFicha}
          onSubmit={guardarFicha}
        />
      )}
      {pasoVista === 4 && (
        <CadastroPago
          fichaOk={fichaOk}
          pagoMockOk={pagoMockOk}
          plano={plano}
          planoId={planoId}
          codigo={codigo}
          onIrFicha={() => irPaso(3)}
          onConfirmarPago={confirmarPagoMock}
        />
      )}
    </div>
  );
}