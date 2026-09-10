import React from 'react';

export default function ContactoPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>CONTACTO Y CONSULTAS</h3>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>ESCRÍBANOS PARA SOLICITAR CAPACITACIONES COMUNITARIAS O ASESORÍA EN PROYECTOS.</p>
      
      <form onSubmit={(e) => { e.preventDefault(); alert('¡MENSAJE ENVIADO CORRECTAMENTE A FUNDAVAL!'); }} style={{ display: 'grid', gap: '1rem' }}>
        <input type="text" placeholder="SU NOMBRE O NOMBRE DE LA COMUNIDAD" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <input type="email" placeholder="CORREO ELECTRÓNICO DE CONTACTO" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
        <textarea rows="4" placeholder="¿EN QUÉ ÁREA REQUIERE APOYO O ASESORÍA?" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}></textarea>
        <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          ENVIAR CONSULTA
        </button>
      </form>
    </div>
  );
}