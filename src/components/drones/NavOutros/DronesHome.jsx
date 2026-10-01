// ==========================================
// ARCHIVO: src/components/drones/NavOutros/DronesHome.jsx
// VISTA: BIENVENIDA (CASE 'BIENVENIDA' EN DronesView.jsx)
// COPY INSTITUCIONAL + ENLACES INTERNOS
// NO MONTAR EspacioPub AQUI: YA LO PINTA DronesView
//   AL FINAL DE LA PAGINA (PAGINA_POR_VISTA.BIENVENIDA = 'inicio')
//   COMPONENTE: src/components/drones/espacioPub.jsx
//   PARA APAGARLO O CAMBIAR paginaId: EDITAR DronesView.jsx
// NO ES TIENDA NI INTERMEDIARIO
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';

// ==========================================
// PALETA DRONES — EDITAR COLORES AQUI
// ==========================================
const CIEL = '#BFE8F7';
const AZUL = '#1A8FD0';
const TINTA = '#123';

export const DronesHome = ({ setCurrentView }) => {
  // ==========================================
  // NAVEGACION INTERNA DEL HUB
  // DESTINO = ID DEL SWITCH EN DronesView.jsx
  // SIEMPRE SUBE AL TOPE
  // ==========================================
  const ir = (viewId) => {
    if (setCurrentView) {
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==========================================
  // ENLACE CON CLASE .drones-welcome-link (drones.css)
  // ==========================================
  const Link = ({ to, children }) => (
    <button
      type="button"
      className="drones-welcome-link"
      onClick={() => ir(to)}
    >
      {children}
    </button>
  );

  return (
    <div
      className="drones-home"
      style={{ background: CIEL, color: TINTA, minHeight: 'auto' }}
    >
      {/* ==========================================
          BLOQUE 1 — H1 + SUBTITULO
          CLASES: .drones-home-intro / .drones-home-title
          ========================================== */}
      <section className="drones-home-intro">
        <h1 className="drones-home-title" style={{ color: AZUL }}>
          BIENVENIDA
        </h1>
        <p
          className="drones-home-title"
          style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: AZUL }}
        >
          Portal (hub) informativo dedicado al sector de Drones.
        </p>
      </section>

      {/* ==========================================
          BLOQUE 2 — TEXTO INSTITUCIONAL
          CLASE: .drones-welcome
          ========================================== */}
      <article className="drones-welcome" style={{ color: TINTA }}>

        {/* ---------- PARRAFO: QUE ES EL HUB ---------- */}
        <p>
          Bienvenido a <strong>drones.orientese.com</strong>, espacio
          informativo del mundo de las aeronaves no tripuladas en{' '}
          <strong>orientese.com</strong>. Aquí puede encontrar a quienes
          trabajan o quieren trabajar con Drones en el mundo, es decir,{' '}
          <Link to="PILOTOS">pilotos</Link>,{' '}
          <Link to="AUXILIARES">auxiliares de vuelo</Link>, técnicos de{' '}
          <Link to="MANUTENCAO">mantenimiento</Link> y{' '}
          <Link to="CONSERTOS">reparación</Link>,{' '}
          <Link to="PROFISSIONAIS">profesionales</Link> del sector y
          empresas que venden, prestan o contratan servicios aéreos, entre
          otras actividades. Esperamos que Usted haga de
          drones.orientese.com su referente y preferido.
        </p>

        {/* ---------- PARRAFO: VISITANTE / CADASTRO / PLAN / ACTIVAR / INICIANTE / RENOVAR ---------- */}
        <p>
          Usted puede usarlo como <Link to="PLANES">VISITANTE</Link> o
          como un miembro físico o jurídico, según el Tipo de Usuario que
          considere sea el que mejor se ajusta a su perfil y/o al tipo de
          actividad que desempeña, una vez registrado en{' '}
          <Link to="CADASTRO">CADASTRO (Registro)</Link> solo le faltará
          seleccionar el <Link to="PLANES">PLAN</Link> que más le
          convenga y <Link to="ACTIVAR">ACTIVARLO</Link>. Si no le
          interesa alguno, también puede registrarse como{' '}
          <Link to="PLANES">INICIANTE</Link> y luego cambiar al PLAN que
          le sea más favorable, pudiéndose{' '}
          <Link to="RENOVAR">RENOVAR</Link> el PLAN ACTIVADO una vez
          vencido el año de su duración.
        </p>

        {/* ---------- PARRAFO: NO VENDE / NO INTERMEDIA ---------- */}
        <p>
          Aclaramos que drones.orientese.com no vende productos ni
          servicios, tampoco intermedia en las negociaciones que se
          produzcan u ofrezcan por los miembros según el plan adquirido:
          solo informa lo que los miembros registrados pueden ofrecer.
        </p>

        {/* ---------- PARRAFO: PUENTE A SECCIONES DEL MENU ----------
            REGISTRADOS → PILOTOS (NO HAY CASE REGISTRADOS)
            VACANTES    → VAGAS
            VENTAS      → VENTAS (TABLERO EN VENTA; NO IR A DRONES)
            ANUNCIANTES → ANUNCIANTES (VITRINA COMPLETA)
            PRESUPUESTOS→ ORÇAMENTOS
            ========================================== */}
        <p>
          Sea como <Link to="PLANES">VISITANTE</Link> o como miembro{' '}
          <Link to="PLANES">INICIANTE</Link>, puede consultar el
          directorio o las secciones donde los miembros{' '}
          <Link to="PILOTOS">REGISTRADOS</Link> ofrecen sus productos y
          servicios, contactar y contratar, de manera fija o temporal, al
          profesional, técnico o empleado de su interés. También puede ver
          la sección de solicitud de personal (
          <Link to="VAGAS">VACANTES</Link>
          ), que publican los miembros con ese beneficio según el PLAN
          adquirido; también puede usar la sección de{' '}
          <Link to="VENTAS">VENTAS</Link>, donde hay Drones, accesorios o
          partes usadas ofrecidos por los miembros con ese beneficio; y la
          vitrina de{' '}
          <Link to="ANUNCIANTES">ANUNCIANTES / PATROCINADORES</Link>, a
          quienes contactar de manera privada, para hacer sus pedidos de
          productos nuevos o los servicios requeridos. Además puede usar
          el <Link to="ORÇAMENTOS">Simulador de Presupuestos</Link> como
          referencia de mercado —no como precio oficial— y por las veces
          diarias o mensuales permitidas.
        </p>

        {/* ---------- PARRAFO: PAGO AL ACTIVAR — SIN PRECIOS NI CUOTAS DEL HUB ---------- */}
        <p>
          El PLAN que a bien haya seleccionado se paga íntegro al momento
          de <Link to="ACTIVAR">ACTIVARLO</Link> con su tarjeta de crédito
          internacional. Usted pagará a su banco con las cuotas que el
          mismo le permita; drones.orientese.com no define cuotas ni las
          cobra.
        </p>

        {/* ---------- PARRAFO: DIRECTORIO, NO MARKETPLACE ---------- */}
        <p>
          El sitio está pensado para orientar: quién hace qué, quién busca
          equipo o personal, y cuál orden de magnitud puede tener un
          servicio. El site drones.orientese.com no cobra comisiones por
          los negocios entre los miembros o con visitantes. Úselo con la
          calma de un directorio, no con la prisa de un marketplace: el
          site muestra quién existe y cómo encontrarlo. No obliga a
          decidir ahora ni cierra el negocio. Quien necesita un piloto o
          la pieza de un Drone, localizada en la sección respectiva,
          contacta, negocia y contrata por su cuenta, de manera directa,
          sin intermediarios, sin comisiones o tasa. Paga según lo
          acordado con quien haya contratado.
        </p>

        {/* ---------- PARRAFO: CIERRE ----------
            PORTAL CENTRAL SOLO MENCIONADO (SIN RUTA INVENTADA)
            ========================================== */}
        <p>
          Una vez más le damos la <Link to="BIENVENIDA">BIENVENIDA</Link>{' '}
          a drones.orientese.com y al portal orientese.com, donde se irán
          montando otros espacios con otras funcionalidades y temas.
          Esperamos le sea de utilidad y agradable permanencia.
        </p>
      </article>

      {/* ==========================================
          ESPACIOPUB NO SE RENDERIZA EN ESTE ARCHIVO
          LO MONTA DronesView.jsx DEBAJO DE ESTA VISTA
          ========================================== */}
    </div>
  );
};

export default DronesHome;