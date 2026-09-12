import React, { useState } from 'react';

// COMPONENTE PARA AGREGAR Y EDITAR LOS SERVICIOS DE LA FUNDACIÓN
export default function ServiciosTab({ serviciosFundaval, setServiciosFundaval, mostrarNotificacion, esMovil }) {
  const [srvEditandoId, setSrvEditandoId] = useState(null);
  const [srvTitulo, setSrvTitulo] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvIcono, setSrvIcono] = useState('🌱');

  // GUARDAR O ACTUALIZAR SERVICIO EXISTENTE
  const handleGuardarServicio = (e) => {
    e.preventDefault();
    if (!srvTitulo.trim()) return;

    if (srvEditandoId) {
      const actualizados = serviciosFundaval.map((s) => {
        if (s.id === srvEditandoId) {
          return { ...s, titulo: srvTitulo.trim(), desc: srvDesc.trim(), icono: srvIcono };
        }
        return s;
      });

      setServiciosFundaval(actualizados);
      localStorage.setItem('fundaval_servicios_custom', JSON.stringify(actualizados));
      mostrarNotificacion('✅ ÁREA DE SERVICIO ACTUALIZADA.');
      setSrvEditandoId(null);
    } else {
      const nuevoSrv = {
        id: Date.now(),
        titulo: srvTitulo.trim(),
        desc: srvDesc.trim(),
        icono: srvIcono
      };

      const nuevos = [...serviciosFundaval, nuevoSrv];
      setServiciosFundaval(nuevos);
      localStorage.setItem('fundaval_servicios_custom', JSON.stringify(nuevos));
      mostrarNotificacion('✅ NUEVO SERVICIO REGISTRADO.');
    }

    setSrvTitulo('');
    setSrvDesc('');
    setSrvIcono('🌱');
  };

  // CARGAR SERVICIO EN EL FORMULARIO PARA CORREGIRLO
  const handleCargarEditar = (s) => {
    setSrvEditandoId(s.id);
    setSrvTitulo(s.titulo);
    setSrvDesc(s.desc);
    setSrvIcono(s.icono);
  };

  // ELIMINAR REGISTRO DE SERVICIO
  const handleEliminarServicio = (id) => {
    if (window.confirm('¿DESEA ELIMINAR ESTE SERVICIO DE LA LISTA?')) {
      const nuevos = serviciosFundaval.filter((s) => s.id !== id);
      setServiciosFundaval(nuevos);
      localStorage.setItem('fundaval_servicios_custom', JSON.stringify(nuevos));
      mostrarNotificacion('🗑️ SERVICIO ELIMINADO.', 'info');
    }
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <form onSubmit={handleGuardarServicio} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: 0, color: srvEditandoId ? '#0284c7' : '#047857', fontSize: '1.05rem', borderLeft: `4px solid ${srvEditandoId ? '#0284c7' : '#059669'}`, paddingLeft: '0.5rem' }}>
          {srvEditandoId ? '✏️ EDITANDO SERVICIO EXISTENTE' : '➕ AGREGAR NUEVO SERVICIO'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 4fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>ÍCONO:</label>
            <input type="text" value={srvIcono} onChange={(e) => setSrvIcono(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1.2rem', textAlign: 'center', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>TÍTULO DEL SERVICIO:</label>
            <input type="text" value={srvTitulo} onChange={(e) => setSrvTitulo(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>DESCRIPCIÓN:</label>
          <textarea rows="3" value={srvDesc} onChange={(e) => setSrvDesc(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}></textarea>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" style={{ padding: '0.85rem 1.5rem', backgroundColor: srvEditandoId ? '#0284c7' : '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'BOLD', cursor: 'pointer', fontSize: '0.9rem' }}>
            {srvEditandoId ? 'GUARDAR CAMBIOS' : 'GUARDAR SERVICIO'}
          </button>
          {srvEditandoId && (
            <button type="button" onClick={() => { setSrvEditandoId(null); setSrvTitulo(''); setSrvDesc(''); }} style={{ padding: '0.85rem 1.5rem', backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'BOLD', cursor: 'pointer', fontSize: '0.9rem' }}>
              CANCELAR
            </button>
          )}
        </div>
      </form>

      {/* VISTA DE SERVICIOS REGISTRADOS */}
      <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 0.75rem 0', color: '#0f172a', fontSize: '0.95rem' }}>💼 SERVICIOS REGISTRADOS ({serviciosFundaval.length})</h4>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {serviciosFundaval.map((s) => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontSize: '1.1rem' }}>{s.icono} </span>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{s.titulo}</strong>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>{s.desc}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => handleCargarEditar(s)} style={{ padding: '0.35rem 0.65rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'BOLD', cursor: 'pointer' }}>
                  ✏️ EDITAR
                </button>
                <button onClick={() => handleEliminarServicio(s.id)} style={{ padding: '0.35rem 0.65rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'BOLD', cursor: 'pointer' }}>
                  🗑️ BORRAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}