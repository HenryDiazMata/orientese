import React, { useState } from 'react';

// IMPORTACIÓN DE COMPONENTES MODULARES DESDE AdminEditar
import SubirDocumentoTab from './AdminEditar/SubirDocumentoTab';
import MultimediaTab from './AdminEditar/MultimediaTab';
import ServiciosTab from './AdminEditar/ServiciosTab';
import ContactoTab from './AdminEditar/ContactoTab';

const MAX_ADMINS = 3;

// COMPONENTE PRINCIPAL ORQUESTADOR DEL PANEL ADMINISTRATIVO
export default function AdminPage({ 
  esMovil, 
  documentos, 
  setDocumentos, 
  serviciosFundaval, 
  setServiciosFundaval, 
  datosContacto, 
  setDatosContacto 
}) {
  const [claveMasterActual, setClaveMasterActual] = useState(() => {
    return localStorage.getItem('fundaval_clave_master') || 'fundaval2026';
  });

  const [listaAdmins, setListaAdmins] = useState(() => {
    const guardados = localStorage.getItem('fundaval_admins_list');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [adminLogueado, setAdminLogueado] = useState(() => {
    const sesion = localStorage.getItem('fundaval_admin_sesion');
    return sesion ? JSON.parse(sesion) : null;
  });

  const [verClaveLogin, setVerClaveLogin] = useState(false);
  const [verClaveRegistro, setVerClaveRegistro] = useState(false);
  const [verClaveMasterReg, setVerClaveMasterReg] = useState(false);
  const [modoRegistro, setModoRegistro] = useState(false);
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputClave, setInputClave] = useState('');
  const [inputClaveMaster, setInputClaveMaster] = useState('');
  const [nuevaMasterInput, setNuevaMasterInput] = useState('');
  const [mostrarModalMaster, setMostrarModalMaster] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');

  const [seccionAdmin, setSeccionAdmin] = useState('subir_doc');
  const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

  // NOTIFICACIÓN VISUAL TEMPORAL
  const mostrarNotificacion = (texto, tipo = 'exito') => {
    setMensajeNotificacion({ texto, tipo });
    setTimeout(() => setMensajeNotificacion(null), 4000);
  };

  // AUTENTICACIÓN
  const handleLogin = (e) => {
    e.preventDefault();
    if (listaAdmins.length === 0) {
      if (inputClave === claveMasterActual) {
        const adminGeneral = { usuario: 'Admin Principal', id: '1' };
        setAdminLogueado(adminGeneral);
        localStorage.setItem('fundaval_admin_sesion', JSON.stringify(adminGeneral));
        setErrorAuth('');
        return;
      }
    }

    const adminEncontrado = listaAdmins.find(
      (a) => a.usuario.toLowerCase() === inputUsuario.trim().toLowerCase() && a.clave === inputClave
    );

    if (adminEncontrado) {
      setAdminLogueado(adminEncontrado);
      localStorage.setItem('fundaval_admin_sesion', JSON.stringify(adminEncontrado));
      setErrorAuth('');
    } else {
      setErrorAuth('Usuario o contraseña incorrectos.');
    }
  };

  const handleRegistrarAdmin = (e) => {
    e.preventDefault();
    if (listaAdmins.length >= MAX_ADMINS) {
      setErrorAuth(`Límite alcanzado: Máximo ${MAX_ADMINS} administradores permitidos.`);
      return;
    }

    if (inputClaveMaster !== claveMasterActual) {
      setErrorAuth('La Clave Máster de Autorización es incorrecta.');
      return;
    }

    const existe = listaAdmins.some((a) => a.usuario.toLowerCase() === inputUsuario.trim().toLowerCase());
    if (existe) {
      setErrorAuth('El nombre de usuario ya existe.');
      return;
    }

    const nuevoAdmin = {
      id: Date.now().toString(),
      usuario: inputUsuario.trim(),
      clave: inputClave,
      fechaRegistro: new Date().toLocaleDateString('es-ES')
    };

    const nuevaLista = [...listaAdmins, nuevoAdmin];
    setListaAdmins(nuevaLista);
    localStorage.setItem('fundaval_admins_list', JSON.stringify(nuevaLista));

    setAdminLogueado(nuevoAdmin);
    localStorage.setItem('fundaval_admin_sesion', JSON.stringify(nuevoAdmin));
    
    setInputUsuario('');
    setInputClave('');
    setInputClaveMaster('');
    setErrorAuth('');
    setModoRegistro(false);
  };

  const handleCambiarClaveMaster = (e) => {
    e.preventDefault();
    if (!nuevaMasterInput.trim()) return;

    setClaveMasterActual(nuevaMasterInput.trim());
    localStorage.setItem('fundaval_clave_master', nuevaMasterInput.trim());
    setNuevaMasterInput('');
    setMostrarModalMaster(false);
    mostrarNotificacion('✅ CLAVE MÁSTER ACTUALIZADA CON ÉXITO.');
  };

  const handleDarseDeBaja = () => {
    if (window.confirm(`¿ESTÁ SEGURO DE ELIMINAR SU CUENTA ("${adminLogueado.usuario}")?`)) {
      const listaFiltrada = listaAdmins.filter((a) => a.id !== adminLogueado.id);
      setListaAdmins(listaFiltrada);
      localStorage.setItem('fundaval_admins_list', JSON.stringify(listaFiltrada));
      localStorage.removeItem('fundaval_admin_sesion');
      setAdminLogueado(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fundaval_admin_sesion');
    setAdminLogueado(null);
  };

  if (!adminLogueado) {
    return (
      <div style={{ maxWidth: '440px', margin: '2.5rem auto', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.25rem' }}>🔒 ACCESO ADMINISTRATIVO</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
            {modoRegistro ? 'REGISTRO DE NUEVO ADMINISTRADOR' : 'INGRESE CON SU CUENTA'}
          </p>
        </div>

        {!modoRegistro ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {listaAdmins.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>USUARIO:</label>
                <input type="text" placeholder="Nombre de usuario" value={inputUsuario} onChange={(e) => setInputUsuario(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>CONTRASEÑA:</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={verClaveLogin ? 'text' : 'password'} placeholder="••••••••" value={inputClave} onChange={(e) => setInputClave(e.target.value)} required style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setVerClaveLogin(!verClaveLogin)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {verClaveLogin ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {errorAuth && <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'BOLD' }}>{errorAuth}</span>}

            <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#047857', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', cursor: 'pointer' }}>
              INGRESAR AL PANEL
            </button>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
              <button type="button" onClick={() => { setModoRegistro(true); setErrorAuth(''); }} style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'BOLD' }}>
                + REGISTRAR UN NUEVO ADMINISTRADOR ({listaAdmins.length}/{MAX_ADMINS})
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegistrarAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>NUEVO USUARIO:</label>
              <input type="text" value={inputUsuario} onChange={(e) => setInputUsuario(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>CONTRASEÑA PERSONAL:</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={verClaveRegistro ? 'text' : 'password'} value={inputClave} onChange={(e) => setInputClave(e.target.value)} required style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setVerClaveRegistro(!verClaveRegistro)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {verClaveRegistro ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>CLAVE MÁSTER DE AUTORIZACIÓN:</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={verClaveMasterReg ? 'text' : 'password'} value={inputClaveMaster} onChange={(e) => setInputClaveMaster(e.target.value)} required style={{ width: '100%', padding: '0.7rem 2.5rem 0.7rem 0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                <button type="button" onClick={() => setVerClaveMasterReg(!verClaveMasterReg)} style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                  {verClaveMasterReg ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {errorAuth && <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'BOLD' }}>{errorAuth}</span>}

            <button type="submit" style={{ padding: '0.8rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', cursor: 'pointer' }}>
              CREAR CUENTA ADMINISTRATIVA
            </button>

            <button type="button" onClick={() => { setModoRegistro(false); setErrorAuth(''); }} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}>
              ← VOLVER AL LOGIN
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: esMovil ? '1.25rem' : '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
      
      {mensajeNotificacion && (
        <div style={{
          backgroundColor: mensajeNotificacion.tipo === 'error' ? '#fef2f2' : mensajeNotificacion.tipo === 'info' ? '#f0f9ff' : '#ecfdf5',
          border: `1px solid ${mensajeNotificacion.tipo === 'error' ? '#fca5a5' : mensajeNotificacion.tipo === 'info' ? '#bae6fd' : '#6ee7b7'}`,
          color: mensajeNotificacion.tipo === 'error' ? '#991b1b' : mensajeNotificacion.tipo === 'info' ? '#0369a1' : '#065f46',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          marginBottom: '1.25rem',
          fontWeight: 'BOLD',
          fontSize: '0.85rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <span>{mensajeNotificacion.texto}</span>
          <button onClick={() => setMensajeNotificacion(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'BOLD' }}>✕</button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontSize: '1.3rem', fontWeight: '800' }}>
            ⚙️ PANEL ADMINISTRATIVO FUNDAVAL
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
            SESIÓN ACTIVA COMO: <span style={{ color: '#047857', fontWeight: 'BOLD' }}>{adminLogueado.usuario}</span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setMostrarModalMaster(!mostrarModalMaster)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'BOLD' }}>
            🔑 CLAVE MÁSTER
          </button>
          <button onClick={handleDarseDeBaja} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'BOLD' }}>
            ❌ DARSE DE BAJA
          </button>
          <button onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'BOLD' }}>
            🔒 SALIR
          </button>
        </div>
      </div>

      {mostrarModalMaster && (
        <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #0284c7', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <form onSubmit={handleCambiarClaveMaster} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'BOLD', color: '#0369a1' }}>NUEVA CLAVE MÁSTER:</span>
            <input type="text" value={nuevaMasterInput} onChange={(e) => setNuevaMasterInput(e.target.value)} required style={{ padding: '0.4rem 0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }} />
            <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', fontSize: '0.8rem', cursor: 'pointer' }}>ACTUALIZAR</button>
            <button type="button" onClick={() => setMostrarModalMaster(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem' }}>CANCELAR</button>
          </form>
        </div>
      )}

      {/* MENÚ SIMPLIFICADO DE 4 SECCIONES UNIFICADAS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {[
          { id: 'subir_doc', label: '📤 SUBIR NUEVO DOCUMENTO' },
          { id: 'multimedia', label: '🎙️ PODCAST / VIDEO / BLOGS' },
          { id: 'servicios', label: '💼 MODIFICAR SERVICIOS' },
          { id: 'contacto', label: '📞 SEDE Y CONTACTO' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setSeccionAdmin(btn.id)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: seccionAdmin === btn.id ? '#059669' : '#cbd5e1',
              backgroundColor: seccionAdmin === btn.id ? '#ecfdf5' : '#ffffff',
              color: seccionAdmin === btn.id ? '#047857' : '#475569',
              fontWeight: seccionAdmin === btn.id ? '700' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* RENDERIZADO CONDICIONAL DE SUBCOMPONENTES UNIFICADOS */}
      {seccionAdmin === 'subir_doc' && <SubirDocumentoTab adminLogueado={adminLogueado} documentos={documentos} setDocumentos={setDocumentos} mostrarNotificacion={mostrarNotificacion} esMovil={esMovil} />}
      {seccionAdmin === 'multimedia' && <MultimediaTab mostrarNotificacion={mostrarNotificacion} esMovil={esMovil} />}
      {seccionAdmin === 'servicios' && <ServiciosTab serviciosFundaval={serviciosFundaval} setServiciosFundaval={setServiciosFundaval} mostrarNotificacion={mostrarNotificacion} esMovil={esMovil} />}
      {seccionAdmin === 'contacto' && <ContactoTab datosContacto={datosContacto} setDatosContacto={setDatosContacto} mostrarNotificacion={mostrarNotificacion} esMovil={esMovil} />}

    </div>
  );
}