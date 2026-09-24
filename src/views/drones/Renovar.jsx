// ==========================================
// ARCHIVO NUEVO: src/views/drones/Renovar.jsx
// RENOVAR = SOLO QUIEN YA CUMPLIO 365 DIAS
// STUB. NO CONFUNDIR CON ACTIVAR
// ==========================================

import React from 'react';

const CIEL = '#BFE8F7';
const AZUL = '#1A8FD0';

export default function Renovar() {
  return (
    <div style={{ background: CIEL, padding: '1.25rem 1.5rem 2rem', color: '#123' }}>
      <h1 style={{ color: AZUL, marginTop: 0 }}>RENOVAR</h1>
      <div
        style={{
          background: '#fff',
          border: `1px solid ${AZUL}`,
          borderRadius: 12,
          padding: '1rem 1.15rem',
        }}
      >
        <p>
          Esta vista es solo para quien ya cumplió 365 días de plan vigente.
        </p>
        <p style={{ marginBottom: 0 }}>
          No sustituye a ACTIVAR (gratuidad de registro oct–dic 2026). El
          contenido de tarifas de renovación entra en otra tanda.
        </p>
      </div>
    </div>
  );
}