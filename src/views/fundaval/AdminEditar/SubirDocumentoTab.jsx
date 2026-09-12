import React, { useState } from 'react';

// ============================================================================
// COMPONENTE: CARGA DE NUEVOS DOCUMENTOS (RUTA POR DEFECTO AUTOMÁTICA)
// ============================================================================
export default function SubirDocumentoTab({ adminLogueado, documentos, setDocumentos, mostrarNotificacion, esMovil }) {
  const [subirTitulo, setSubirTitulo] = useState('');
  const [subirFecha, setSubirFecha] = useState(new Date().toISOString().split('T')[0]);
  const [subirFormato, setSubirFormato] = useState('pdf');
  const [subirOrigenPeso, setSubirOrigenPeso] = useState('');
  const [subirResumen, setSubirResumen] = useState('');
  const [subirArchivoLocal, setSubirArchivoLocal] = useState(null);
  const [rutaGenerada, setRutaGenerada] = useState('');

  // SELECCIONAR ARCHIVO Y FIJAR LA RUTA POR DEFECTO EN LA CARPETA PUBLIC DE FUNDAVAL
  const handleSeleccionarArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubirArchivoLocal(file);
      setSubirOrigenPeso(`LOCAL (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
      
      // RUTA ESTÁTICA FIXA ASIGNADA AUTOMÁTICAMENTE
      const rutaDefecto = `/subdominios/fundaval.orientese.com/Publicaciones/${file.name}`;
      setRutaGenerada(rutaDefecto);
    }
  };

  // REGISTRAR DOCUMENTO CON LA RUTA POR DEFECTO
  const handleGuardarNuevoDocumento = (e) => {
    e.preventDefault();
    if (!subirTitulo.trim()) return;

    const fechaActual = new Date().toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    const rutaFinal = rutaGenerada || `/subdominios/fundaval.orientese.com/Publicaciones/documento_${Date.now()}.pdf`;

    const nuevoDoc = {
      id: Date.now().toString(),
      titulo: subirTitulo.trim(),
      categoria: 'DOCUMENTOS E INFORMES',
      ano: subirFecha.split('-')[0] || new Date().getFullYear().toString(),
      fechaCarga: subirFecha,
      peso: subirOrigenPeso || 'ARCHIVO SUBIDO',
      tipo: subirFormato,
      url: rutaFinal,
      urlPdf: rutaFinal,
      urlHtml: rutaFinal,
      resumen: subirResumen.trim(),
      contenido: subirResumen.trim(),
      creadoPor: adminLogueado ? (adminLogueado.usuario || adminLogueado.nombre) : 'ADMIN',
      fechaCreacion: fechaActual
    };

    const listaNueva = [nuevoDoc, ...documentos];
    setDocumentos(listaNueva);
    localStorage.setItem('fundaval_docs_custom', JSON.stringify(listaNueva));
    
    mostrarNotificacion('✅ DOCUMENTO REGISTRADO CORRECTAMENTE CON SU RUTA POR DEFECTO.');
    setSubirTitulo('');
    setSubirResumen('');
    setSubirOrigenPeso('');
    setRutaGenerada('');
    setSubirArchivoLocal(null);
  };

  return (
    <form onSubmit={handleGuardarNuevoDocumento} style={{ display: 'grid', gap: '1.25rem', maxWidth: '850px', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: 0, color: '#047857', fontSize: '1.05rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
        📤 CARGAR NUEVO DOCUMENTO AL SUBDOMINIO
      </h3>

      <div style={{ backgroundColor: '#fffbe8', border: '1px solid #ffe58f', padding: '0.85rem 1rem', borderRadius: '6px', fontSize: '0.82rem', color: '#856404', lineHeight: '1.5' }}>
        💡 <strong>POLÍTICA DE GESTIÓN DE DOCUMENTOS:</strong><br />
        Si requiere realizar correcciones de ortografía, fechas o bibliografía a un documento publicado, <u>edítelo en su procesador de texto (Word)</u>, elimine el registro previo y suba el archivo corregido.
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>
          SELECCIONAR ARCHIVO (PDF / DOCX):
        </label>
        <input type="file" accept=".pdf,.docx,.txt" onChange={handleSeleccionarArchivo} required style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem', boxSizing: 'border-box' }} />
      </div>

      {/* DESTINO AUTOMÁTICO ASIGNADO POR DEFECTO */}
      <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.75rem 1rem', borderRadius: '6px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 'BOLD', color: '#0369a1', display: 'block' }}>
          📁 DESTINO ASIGNADO AUTOMÁTICAMENTE EN SERVIDOR:
        </span>
        <code style={{ fontSize: '0.85rem', color: '#0f172a', wordBreak: 'break-all' }}>
          {rutaGenerada || '/subdominios/fundaval.orientese.com/Publicaciones/[nombre_archivo]'}
        </code>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>TÍTULO DEL DOCUMENTO:</label>
        <input type="text" placeholder="EJEMPLO: DIAGNÓSTICO SOCIAL COMUNITARIO" value={subirTitulo} onChange={(e) => setSubirTitulo(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>FECHA:</label>
          <input type="date" value={subirFecha} onChange={(e) => setSubirFecha(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>FORMATO:</label>
          <select value={subirFormato} onChange={(e) => setSubirFormato(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
            <option value="pdf">PDF (.pdf)</option>
            <option value="documento">WORD / TEXTO (.docx / .txt)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>ORIGEN / PESO:</label>
          <input type="text" placeholder="EJ: SUBDOMINIO (1.5 MB)" value={subirOrigenPeso} onChange={(e) => setSubirOrigenPeso(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>BREVE RESUMEN / CONTENIDO:</label>
        <textarea rows="3" placeholder="SINTETICE EL CONTENIDO DEL ARCHIVO..." value={subirResumen} onChange={(e) => setSubirResumen(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}></textarea>
      </div>

      <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'BOLD', cursor: 'pointer', fontSize: '0.9rem' }}>
        💾 PUBLICAR DOCUMENTO EN EL SUBDOMINIO
      </button>
    </form>
  );
}