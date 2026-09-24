// ==========================================
// CASCARÓN WIZARD CADASTRO
// PASOS: PLANOS → CADASTROS → FICHA → PAGAMENTO
// VISITANTE NO AVANZA A FICHA NI A PAGO
// NO TOCA HEADER / FOOTER / APP.CSS DEL PORTAL
// UI EN PT. COMENTARIOS EN CASTELLANO Y MAYÚSCULAS
// ==========================================

import { useState } from 'react';
import './Cadastro.css';
import { planoEsPago } from './cadastroPlanes';
import CadastroPaso1 from './CadastroPaso1';
import CadastroPaso2 from './CadastroPaso2';
import CadastroFicha from './CadastroFicha';
import CadastroPago from './CadastroPago';

export default function Cadastro() {
  const [paso, setPaso] = useState(1);
  const [planoId, setPlanoId] = useState(null);
  const [tipoCadastro, setTipoCadastro] = useState(null);

  const pago = planoEsPago(planoId);
  const tipoValido =
    tipoCadastro && !(pago && tipoCadastro === 'visitante');
  const esVisitante = tipoCadastro === 'visitante' && !pago;

  const handlePlano = (id) => {
    setPlanoId(id);
    const nuevoPago = planoEsPago(id);
    if (nuevoPago && tipoCadastro === 'visitante') {
      setTipoCadastro(null);
    }
  };

  const irSiguiente = () => {
    if (paso === 1 && !planoId) return;
    if (paso === 2 && !tipoValido) return;
    if (paso === 2 && esVisitante) return;
    if (paso < 4) setPaso(paso + 1);
  };

  const irAnterior = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  return (
    <div className="cadastro-wizard">
      <header className="cadastro-wizard-header">
        <h1>Cadastro</h1>
        <ol className="cadastro-pasos-nav">
          <li className={paso === 1 ? 'ativo' : ''}>Planos</li>
          <li className={paso === 2 ? 'ativo' : ''}>Cadastros</li>
          <li className={paso === 3 ? 'ativo' : ''}>Ficha</li>
          <li className={paso === 4 ? 'ativo' : ''}>Pagamento</li>
        </ol>
      </header>

      {paso === 1 && (
        <CadastroPaso1 planoId={planoId} onSelecionarPlano={handlePlano} />
      )}

      {paso === 2 && (
        <CadastroPaso2
          planoId={planoId}
          tipoCadastro={tipoCadastro}
          onSelecionarTipo={setTipoCadastro}
        />
      )}

      {paso === 3 && (
        <CadastroFicha planoId={planoId} tipoCadastro={tipoCadastro} />
      )}

      {paso === 4 && (
        <CadastroPago planoId={planoId} tipoCadastro={tipoCadastro} />
      )}

      <footer className="cadastro-wizard-acciones">
        {paso > 1 && (
          <button type="button" className="cadastro-card-cta" onClick={irAnterior}>
            Voltar
          </button>
        )}

        {paso === 2 && esVisitante && (
          <p className="cadastro-paso-sub">
            Visitante não preenche ficha nem pagamento. Use o aviso de cursos
            se quiser receber novidades.
          </p>
        )}

        {paso < 4 && !esVisitante && (
          <button
            type="button"
            className="cadastro-card-cta"
            disabled={
              (paso === 1 && !planoId) || (paso === 2 && !tipoValido)
            }
            onClick={irSiguiente}
          >
            Continuar
          </button>
        )}
      </footer>
    </div>
  );
}