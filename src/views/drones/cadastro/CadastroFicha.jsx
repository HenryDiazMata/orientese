/* =========================================================
   PASO 3: FICHA. VISITANTE INCLUYE PAÍS/FUSO, AVISOS Y WPP/TG.
   PROFISSIONAL INCLUYE FOTO 3X4.
   ========================================================= */
import { TIPOS } from "./cadastroPlanes";

export default function CadastroFicha({ tipoId, planoId, ficha, setFicha, onSubmit }) {
  const tipo = TIPOS.find((t) => t.id === tipoId);

  function onFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFicha((f) => ({ ...f, foto34: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  return (
    <section>
      <h2>Ficha {tipo ? `— ${tipo.nome}` : ""}</h2>
      {!tipoId && <p>Escolha um tipo no passo 2 (ou visitante no passo 1).</p>}
      {tipoId && (
        <form className="cad-form" onSubmit={onSubmit}>
          <label>
            Nome
            <input value={ficha.nome} onChange={(e) => setFicha({ ...ficha, nome: e.target.value })} required />
          </label>
          <label>
            E-mail
            <input type="email" value={ficha.email} onChange={(e) => setFicha({ ...ficha, email: e.target.value })} required />
          </label>
          <label>
            Data de nascimento
            <input type="date" value={ficha.nascimento} onChange={(e) => setFicha({ ...ficha, nascimento: e.target.value })} required />
          </label>
          <label>
            País
            <input value={ficha.pais} onChange={(e) => setFicha({ ...ficha, pais: e.target.value })} required />
          </label>
          <label>
            Fuso
            <input value={ficha.fuso} onChange={(e) => setFicha({ ...ficha, fuso: e.target.value })} required />
          </label>

          {tipoId === "profissional" && (
            <label>
              Foto 3x4
              <input type="file" accept="image/*" onChange={onFoto} />
              {ficha.foto34 ? <img src={ficha.foto34} alt="Foto 3x4" className="cad-foto" /> : null}
            </label>
          )}

          <label className="cad-check">
            <input
              type="checkbox"
              checked={ficha.avisosCursos}
              onChange={(e) => setFicha({ ...ficha, avisosCursos: e.target.checked })}
            />
            Quero avisos de cursos
          </label>
          {ficha.avisosCursos && (
            <label>
              Confirmar e-mail para avisos
              <input
                type="email"
                value={ficha.emailConfirm}
                onChange={(e) => setFicha({ ...ficha, emailConfirm: e.target.value })}
                required
              />
            </label>
          )}

          <label className="cad-check">
            <input
              type="checkbox"
              checked={ficha.querWhatsapp}
              onChange={(e) => setFicha({ ...ficha, querWhatsapp: e.target.checked })}
            />
            Pedir informação no WhatsApp
          </label>
          {ficha.querWhatsapp && (
            <label>
              WhatsApp
              <input value={ficha.whatsapp} onChange={(e) => setFicha({ ...ficha, whatsapp: e.target.value })} />
            </label>
          )}

          <label className="cad-check">
            <input
              type="checkbox"
              checked={ficha.querTelegram}
              onChange={(e) => setFicha({ ...ficha, querTelegram: e.target.checked })}
            />
            Telegram
          </label>
          {ficha.querTelegram && (
            <label>
              Usuário Telegram
              <input value={ficha.telegram} onChange={(e) => setFicha({ ...ficha, telegram: e.target.value })} />
            </label>
          )}

          <button type="submit" className="btn-pro">
            {planoId === "visitante" ? "Concluir cadastro visitante" : "Salvar ficha e ir ao pagamento"}
          </button>
        </form>
      )}
    </section>
  );
}