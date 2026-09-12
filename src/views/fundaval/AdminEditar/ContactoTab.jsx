import React from 'react';

export default function ContactoTab({ datosContacto, setDatosContacto, mostrarNotificacion, esMovil }) {
  const handleGuardarContacto = (e) => {
    e.preventDefault();
    localStorage.setItem('fundaval_contacto_custom', JSON.stringify(datosContacto));
    mostrarNotificacion('✅ Datos institucionales actualizados.');
  };

  return (
    <form onSubmit={handleGuardarContacto} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: 0, color: '#047857', fontSize: '1.05rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
        Actualizar Teléfonos y Dirección Institucional
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Teléfonos:</label>
          <input type="text" value={datosContacto.telefono} onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Correo Público:</label>
          <input type="email" value={datosContacto.email} onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Dirección:</label>
        <input type="text" value={datosContacto.direccion} onChange={(e) => setDatosContacto({ ...datosContacto, direccion: e.target.value })} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
      </div>

      <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
        Actualizar Datos Institucionales
      </button>
    </form>
  );
}