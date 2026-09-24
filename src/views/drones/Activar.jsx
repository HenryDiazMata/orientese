// ==========================================
// ARCHIVO NUEVO: src/views/drones/Activar.jsx
// ACTIVAR = GRATUIDAD OCT–DIC 2026
// NO LLAMAR RENOVACION. PAGA SOLO LA ETAPA DEL PLAN QUE CONFIRMA.
// ==========================================

import React from 'react';

const FRASE_PAGO =
  'El plan se paga íntegro al cadastrarse. Si su tarjeta internacional admite cuotas, las condiciones las fija su banco, no drones.orientese.com.';

const CIEL = '#BFE8F7';
const AZUL = '#1A8FD0';

const box = {
  background: '#fff',
  border: `1px solid ${AZUL}`,
  borderRadius: 12,
  padding: '1rem 1.15rem',
  marginBottom: '1rem',
};

const btn = {
  background: AZUL,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.6rem 1rem',
  cursor: 'pointer',
  fontWeight: 700,
};

export default function Activar({ setCurrentView }) {
  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: CIEL, padding: '1.25rem 1.5rem 2rem', color: '#123' }}>
      <h1 style={{ color: AZUL, marginTop: 0 }}>ACTIVAR</h1>

      <section style={box}>
        <p style={{ marginTop: 0, fontWeight: 700 }}>
          Te registraste durante la promoción de gratuidad de registro y uso de
          planes. Ahora ACTIVA.
        </p>
        <p style={{ marginBottom: 0 }}>
          Octubre–diciembre 2026 sin costo: prueba del simulador (bolsas reales:
          Visitante 5, Iniciante 10, Plus 36/45, Pro 72/90, Élite 96/120). Al
          activar puedes mantener, SUBIR o BAJAR de plan. Pagas solo el precio de
          la etapa vigente del plan que confirmas. Sin prorrateo: el año aún no
          corrió.
        </p>
      </section>

      <section style={box}>
        <p style={{ marginTop: 0 }}>
          Al activar hasta el 31 dic 2026 UTC (o solicitud por e-mail a
          contacto@drones.orientese.com hasta el 15 ene 2027):
        </p>
        <ol>
          <li>
            El plan queda operativo 365 días desde el 1 ene 2027. Los extras del
            simulador solo desde esa vigencia.
          </li>
          <li>
            El descuento es el de la etapa al pagar. E1 no es eterno (vale ese año;
            la 1ª renovación intenta conservar la tarifa de activación; la 2ª usa
            la tarifa del año de la 1ª renovación).
          </li>
          <li>
            Cupo: 1800 altas pagadas PLUS / PRO / ÉLITE por etapa visible.
            INICIANTE no come cupo. Quien reservó y al activar SUBE de plan entra
            aunque el tope público esté lleno; el 1801 no se muestra en el HERO.
          </li>
        </ol>
        <p style={{ marginBottom: 0 }}>
          El descuento se aplica al plan que elijas AL ACTIVAR. Activaste,
          aprovechaste.
        </p>
      </section>

      <section style={box}>
        <p style={{ margin: 0 }}>
          Variante corta: Registrado en la gratuidad oct–dic 2026. Activa hasta el
          31 dic 2026 UTC (solicitud hasta el 15 ene 2027). Pagas la etapa del plan
          que confirmas. Vigencia 1 ene 2027–1 ene 2028.
        </p>
      </section>

      <p style={box}>{FRASE_PAGO}</p>

      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button type="button" style={btn} onClick={() => ir('PLANES')}>
          ACTIVAR MI PLAN
        </button>
        <button type="button" style={btn} onClick={() => ir('PLANES')}>
          ACTIVAR Y SUBIR DE PLAN
        </button>
      </div>
    </div>
  );
}