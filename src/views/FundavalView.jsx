// IMPORTACIONES PRINCIPALES DE REACT Y HOOKS
import React, { useState, useEffect } from 'react';

// IMPORTACIÓN AUTOMÁTICA DE DATOS LOCALES
import fundavalData from '../data/fundavalData.json';

// IMPORTACIÓN DE COMPONENTES ESTRUCTURALES DESDE LA NUEVA CARPETA FUNDAVAL_HEADERFOOTER
import FundavalHeader from '../components/fundaval_HeaderFooter/FundavalHeader';
import FundavalFooter from '../components/fundaval_HeaderFooter/FundavalFooter';

// IMPORTACIÓN DE VISTAS AUTÓNOMAS DE FUNDAVAL
import InicioPage from './fundaval/InicioPage';
import DocumentosPage from './fundaval/DocumentosPage';
import PodcastPage from './fundaval/PodcastPage';
import ServiciosPage from './fundaval/ServiciosPage';
import NosotrosPage from './fundaval/NosotrosPage';
import ContactoPage from './fundaval/ContactoPage';
import AdminPage from './fundaval/AdminPage';

export default function FundavalView({ onNavigate }) {

  // ESTADO PARA MANEJAR EL DISEÑO RESPONSIVO (MÓVIL / ESCRITORIO)
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ESTADOS GLOBALES DE LA VISTA FUNDAVAL
  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [documentos, setDocumentos] = useState(fundavalData || []);
  const [modoAdmin, setModoAdmin] = useState(false);

  // ESTADO DE SERVICIOS SOCIALES Y CAPACITACIONES
  const [serviciosFundaval, setServiciosFundaval] = useState([
    { id: 1, titulo: "CAPACITACIÓN AGRÍCOLA Y CAMPESINA", desc: "TALLERES EN TÉCNICAS SOSTENIBLES, MANEJO DE SUELOS, CULTIVOS ORGÁNICOS Y OPTIMIZACIÓN DE COSECHAS.", icono: "🌾" },
    { id: 2, titulo: "APOYO E IMPULSO AL PESCADOR ARTESANAL", desc: "ASESORÍA EN BUENAS PRÁCTICAS PESQUERAS, NORMATIVAS VIGENTES, CADENAS DE FRÍO Y ASOCIATIVIDAD COMUNITARIA.", icono: "🐟" },
    { id: 3, titulo: "FORMACIÓN EN DERECHOS HUMANOS Y SOCIALES", desc: "TALLERES COMUNITARIOS SOBRE DERECHOS FUNDAMENTALES, GESTIÓN SOCIAL Y FORTALECIMIENTO DE ORGANIZACIONES.", icono: "⚖️" },
    { id: 4, titulo: "EMPRENDIMIENTO Y FORMACIÓN EN OFICIOS", desc: "ACOMPAÑAMIENTO EN EL DISEÑO DE PLANES DE NEGOCIO RURAL, FINANZAS BÁSICAS Y PROYECTOS PRODUCTIVOS.", icono: "💡" }
  ]);

  // ESTADO DE DATOS INSTITUCIONALES DE CONTACTO
  const [datosContacto, setDatosContacto] = useState({
    direccion: "Av. Principal Comunitaria, Edificio Fundaval, Sede Central",
    telefono: "+58 (212) 555-0199 / +58 (414) 000-0000",
    email: "contacto@fundaval.orientese.com",
    horario: "Lunes a Viernes de 8:00 AM a 4:00 PM"
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* ENCABEZADO EXCLUSIVO DE FUNDAVAL DESDE FUNDAVAL_HEADERFOOTER */}
      <FundavalHeader 
        pestanaActiva={pestanaActiva}
        setPestanaActiva={setPestanaActiva}
        modoAdmin={modoAdmin}
        setModoAdmin={setModoAdmin}
        totalDocumentos={documentos.length}
      />

      {/* CONTENEDOR CENTRAL DE PÁGINAS INTERNAS */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        
        {/* VISTA CONDICIONAL: MODO ADMIN O PÁGINAS INTERNAS */}
        {modoAdmin ? (
          <AdminPage 
            esMovil={esMovil}
            documentos={documentos}
            setDocumentos={setDocumentos}
            serviciosFundaval={serviciosFundaval}
            setServiciosFundaval={setServiciosFundaval}
            datosContacto={datosContacto}
            setDatosContacto={setDatosContacto}
          />
        ) : (
          <>
            {pestanaActiva === 'inicio' && (
              <InicioPage 
                esMovil={esMovil} 
                documentos={documentos} 
                serviciosFundaval={serviciosFundaval} 
                setPestanaActiva={setPestanaActiva} 
              />
            )}

            {pestanaActiva === 'documentos' && (
              <DocumentosPage 
                esMovil={esMovil} 
                documentos={documentos} 
              />
            )}

            {pestanaActiva === 'podcast' && <PodcastPage documentos={documentos} />}

            {pestanaActiva === 'servicios' && <ServiciosPage esMovil={esMovil} serviciosFundaval={serviciosFundaval} />}

            {pestanaActiva === 'nosotros' && <NosotrosPage />}

            {pestanaActiva === 'contacto' && <ContactoPage datosContacto={datosContacto} />}
          </>
        )}

      </div>

      {/* PIE DE PÁGINA EXCLUSIVO DE FUNDAVAL DESDE FUNDAVAL_HEADERFOOTER */}
      <FundavalFooter onNavigate={onNavigate} />

    </div>
  );
}