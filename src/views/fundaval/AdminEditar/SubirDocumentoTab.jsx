import React, { useState } from 'react';

// COMPONENTE PARA LA CARGA DE NUEVOS DOCUMENTOS AL SUBDOMINIO
export default function SubirDocumentoTab({ adminLogueado, documentos, setDocumentos, mostrarNotificacion, esMovil }) {
  const [subirTitulo, setSubirTitulo] = useState('');
  const [subirFecha, setSubirFecha] = useState(new Date().toISOString().split('T')[0]);
  const [subirFormato, setSubirFormato] = useState('pdf');
  const [subirOrigenPeso, setSubirOrigenPeso] = useState('');
  const [subirResumen, setSubirResumen] = useState('');
  const [subirRutaManual, setSubirRutaManual] = useState('');
  const [subirArchivoLocal, setSubirArchivoLocal] = useState(null);

  // MANEJAR LA SELECCIÓN DE ARCHIVOS Y GENERAR LA RUTA POR DEFECTO
  const handleSeleccionarArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubirArchivoLocal(file);
      setSubirOrigenPeso(`LOCAL (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
      // GENERA LA RUTA RELATIVA EXACTA PARA EVITAR REDIRECCIONES AL DOMINIO PRINCIPAL
      setSubirRutaManual(`/subdominios/fundaval.orientese.com/publicaciones/${file.name}`);
    }
  };

  // REGISTRAR Y GUARDAR EL DOCUMENTO EN LA LISTA
  const handleGuardarNuevoDocumento = (e) => {
    e.preventDefault();
    if (!subirTitulo.trim()) return;

    const fechaActual = new Date().toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
    
    // DEFINIR RUTA DEFINITIVA DEL ARCHIVO
    const rutaDefinitiva = subirRutaManual.trim() || 
      (subirArchivoLocal ? `/subdominios/fundaval.orientese.com/publicaciones/${subirArchivoLocal.name}` : '');

    const nuevoDoc = {
      id: Date.now().toString(),
      titulo: subirTitulo.trim(),
      categoria: 'DOCUMENTOS E INFORMES',
      ano: subirFecha.split('-')[0] || new Date().getFullYear().toString(),
      fechaCarga: subirFecha,
      peso: subirOrigenPeso || 'ARCHIVO SUBIDO',
      tipo: subirFormato,
      
      // MANTENER LA URL HOMOGÉNEA EN TODOS LOS CAMPOS POSIBLES
      url: rutaDefinitiva,
      urlPdf: rutaDefinitiva,
      urlHtml: rutaDefinitiva,
      
      resumen: subirResumen.trim(),
      contenido: subirResumen.trim(),
      creadoPor: adminLogueado.usuario,
      fechaCreacion: fechaActual
    };

    const listaNueva = [nuevoDoc, ...documentos];
    setDocumentos(listaNueva);
    localStorage.setItem('fundaval_docs_custom', JSON.stringify(listaNueva));
    
    mostrarNotificacion('✅ DOCUMENTO REGISTRADO CORRECTAMENTE EN EL SUBDOMINIO.');
    setSubirTitulo('');
    setSubirResumen('');
    setSubirOrigenPeso('');
    setSubirRutaManual('');
    setSubirArchivoLocal(null);
  };

  return (
    <form onSubmit={handleGuardarNuevoDocumento} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: 0, color: '#047857', fontSize: '1.05rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
        📤 CARGAR NUEVO DOCUMENTO AL SUBDOMINIO (1 ARCHIVO POR VEZ)
      </h3>

      <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #6ee7b7', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: '#065f46' }}>
        📌 <strong>IMPORTANTE:</strong> ASEGÚRESE DE QUE LA RUTA COINCIDA CON LA UBICACIÓN EN EL SUBDOMINIO PARA QUE EL BOTÓN "LEER" NO REDIRIJA AL DOMINIO PRINCIPAL.
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>
          SELECCIONAR ARCHIVO DESDE SU DISPOSITIVO:
        </label>
        <input type="file" accept=".pdf,.docx,.txt" onChange={handleSeleccionarArchivo} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>
          RUTA INTERNA EN EL SUBDOMINIO O URL DIRECTA:
        </label>
        <input 
          type="text" 
          placeholder="/subdominios/fundaval.orientese.com/publicaciones/mi_archivo.pdf" 
          value={subirRutaManual} 
          onChange={(e) => setSubirRutaManual(e.target.value)} 
          required
          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
        />
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
        💾 PUBLICAR EN SUBDOMINIO
      </button>
    </form>
  );
}