import React, { useState, useEffect } from 'react';

// IMPORTACIÓN AUTOMÁTICA DE DATOS
import fundavalData from '../data/fundavalData.json';

// IMPORTACIÓN DE COMPONENTES ESTRUCTURALES
import FundavalHeader from '../components/FundavalHeader';
import FundavalFooter from '../components/FundavalFooter';

// IMPORTACIÓN DE VISTAS AUTÓNOMAS
import InicioPage from './fundaval/InicioPage';
import DocumentosPage from './fundaval/DocumentosPage';
import PodcastPage from './fundaval/PodcastPage';
import ServiciosPage from './fundaval/ServiciosPage';
import NosotrosPage from './fundaval/NosotrosPage';
import ContactoPage from './fundaval/ContactoPage';
import AdminPage from './fundaval/AdminPage';

export default function FundavalView({ onNavigate }) {

  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [documentos, setDocumentos] = useState(fundavalData || []);
  const [modoAdmin, setModoAdmin] = useState(false);

  const [serviciosFundaval, setServiciosFundaval] = useState([
    { id: 1, titulo: "CAPACITACIÓN AGRÍCOLA Y CAMPESINA", desc: "TALLERES EN TÉCNICAS SOSTENIBLES, MANEJO DE SUELOS, CULTIVOS ORGÁNICOS Y OPTIMIZACIÓN DE COSECHAS.", icono: "🌾" },
    { id: 2, titulo: "APOYO E IMPULSO AL PESCADOR ARTESANAL", desc: "ASESORÍA EN BUENAS PRÁCTICAS PESQUERAS, NORMATIVAS VIGENTES, CADENAS DE FRÍO Y ASOCIATIVIDAD COMUNITARIA.", icono: "🐟" },
    { id: 3, titulo: "FORMACIÓN EN DERECHOS HUMANOS Y SOCIALES", desc: "TALLERES COMUNITARIOS SOBRE DERECHOS FUNDAMENTALES, GESTIÓN SOCIAL Y FORTALECIMIENTO DE ORGANIZACIONES.", icono: "⚖️" },
    { id: 4, titulo: "EMPRENDIMIENTO Y FORMACIÓN EN OFICIOS", desc: "ACOMPAÑAMIENTO EN EL DISEÑO DE PLANES DE NEGOCIO RURAL, FINANZAS BÁSICAS Y PROYECTOS PRODUCTIVOS.", icono: "💡" }
  ]);

  const [datosContacto, setDatosContacto] = useState({
    direccion: "Av. Principal Comunitaria, Edificio Fundaval, Sede Central",
    telefono: "+58 (212) 555-0199 / +58 (414) 000-0000",
    email: "contacto@fundaval.orientese.com",
    horario: "Lunes a Viernes de 8:00 AM a 4:00 PM"
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* ENCABEZADO PRINCIPAL */}
      <FundavalHeader 
        pestanaActiva={pestanaActiva}
        setPestanaActiva={setPestanaActiva}
        modoAdmin={modoAdmin}
        setModoAdmin={setModoAdmin}
        totalDocumentos={documentos.length}
      />

      {/* CONTENEDOR DE PÁGINAS */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        
        {/* SI EL MODO ADMIN ESTÁ ACTIVO, SE MUESTRA ÚNICAMENTE EL PANEL DE ADMINISTRACIÓN */}
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

      {/* PIE DE PÁGINA */}
      <FundavalFooter onNavigate={onNavigate} />

    </div>
  );
}