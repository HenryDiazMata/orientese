// ==========================================
// ARCHIVO COMPLETO: src/views/drones/Activar.jsx
// ACTIVAR = GRATUIDAD OCT–DIC 2026
// NO ES RENOVACION. NO ES CHECKOUT (ESO VA EN OTRA TANDA).
// CARDS AL 80% DEL MAIN. FONDO CIELO SUAVE.
// VIÑETAS CON FAVICON DRONES. LINKS ACTIVA → PLANES.
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS PARA EDICIONES FUTURAS.
// ==========================================

import React from 'react';

// ==========================================
// LEYENDAS FIJAS. NO INVENTAR PRECIOS AQUI.
// ==========================================
const FRASE_PAGO =
  'El plan se paga íntegro al cadastrarse. Si su tarjeta internacional admite cuotas, las condiciones las fija su banco, no drones.orientese.com.';

const FRASE_INFORMATIVO =
  'drones.orientese.com ofrece solo un servicio informativo. No vende drones ni piezas ni presta servicios. Cualquier anuncio publicado es de exclusiva responsabilidad del usuario.';

// ==========================================
// FAVICON PUBLICO DE DRONES (VIÑETAS)
// SI NO SE VE: CAMBIAR PATH O PASAR A GUIONES
// ==========================================
const FAVICON_DRONES = '/favicon/drones/favicom.png';

// ==========================================
// PALETA DRONES. SIN DARK
// CIELO OFICIAL + FONDO MAS CLARO (SOSIEGO)
// ==========================================
const CIEL = '#BFE8F7';
const CIEL_CLARO = '#D7F1FA';
const CIEL_MAS_CLARO = '#EAF7FC';
const AZUL = '#1A8FD0';

// ==========================================
// FONDO DE LA VISTA (DEGRADADO SUAVE)
// ==========================================
const wrap = {
  background: `linear-gradient(180deg, ${CIEL} 0%, ${CIEL_CLARO} 42%, ${CIEL_MAS_CLARO} 100%)`,
  padding: '1.25rem 1.5rem 2rem',
  color: '#123',
  minHeight: '100%',
};

// ==========================================
// COLUMNA AL 80% DEL MAIN, CENTRADA
// ==========================================
const col = {
  width: '80%',
  maxWidth: '80%',
  margin: '0 auto',
};

// ==========================================
// CARD BLANCA CON BORDE AZUL
// ==========================================
const box = {
  background: '#fff',
  border: `1px solid ${AZUL}`,
  borderRadius: 12,
  padding: '1rem 1.15rem',
  marginBottom: '1rem',
};

// ==========================================
// BOTONES CTA → HOY VAN A PLANES
// ==========================================
const btn = {
  background: AZUL,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.6rem 1rem',
  cursor: 'pointer',
  fontWeight: 700,
};

// ==========================================
// ENLACE EN TEXTO (PALABRA ACTIVA / ACTIVAR)
// ES BUTTON PARA NO ROMPER EL ROUTER INTERNO
// ==========================================
const linkBtn = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  color: AZUL,
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'underline',
  font: 'inherit',
};

// ==========================================
// LISTA SIN NUMEROS. ICONO + TEXTO
// ==========================================
const lista = {
  listStyle: 'none',
  margin: '0.35rem 0 0',
  padding: 0,
};

const item = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.55rem',
  marginBottom: '0.65rem',
};

// ==========================================
// TAMAÑO DEL FAVICON EN VIÑETA (18 PX)
// SUBIR A 20–22 SI SE VE CHICO
// ==========================================
const ico = {
  width: 18,
  height: 18,
  flexShrink: 0,
  marginTop: 3,
  objectFit: 'contain',
};

// ==========================================
// UNA LINEA CON FAVICON. NO NUMERAR
// ==========================================
function Viñeta({ children }) {
  return (
    <li style={item}>
      <img src={FAVICON_DRONES} alt="" style={ico} />
      <span>{children}</span>
    </li>
  );
}

export default function Activar({ setCurrentView }) {
  // ==========================================
  // CAMBIA LA VISTA DEL ORQUESTADOR Y SUBE AL TOPE
  // ==========================================
  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==========================================
  // DESTINO TEMPORAL: PLANES
  // CUANDO EXISTA CONFIRMAR/CHECKOUT, CAMBIAR EL ID
  // ==========================================
  const LinkActiva = ({ children }) => (
    <button type="button" style={linkBtn} onClick={() => ir('PLANES')}>
      {children}
    </button>
  );

  return (
    <div style={wrap}>
      <div style={col}>
        {/* ==========================================
            TITULO DE LA VISTA
            ========================================== */}
        <h1 style={{ color: AZUL, marginTop: 0 }}>ACTIVAR</h1>

        {/* ==========================================
            CARD 1: GANCHO + PRUEBA BETA + BOLSAS
            ========================================== */}
        <section style={box}>
          <p style={{ marginTop: 0, fontWeight: 700 }}>
            Te registraste durante la promoción de gratuidad de registro y uso de
            planes. Ahora <LinkActiva>ACTIVA</LinkActiva>.
          </p>
          <ul style={lista}>
            <Viñeta>Promoción BETA octubre–diciembre 2026 sin costo.</Viñeta>
            <Viñeta>
              Prueba del simulador de presupuestos con cantidades limitadas
              durante esta promoción. Las cantidades de uso del simulador de
              presupuesto para los planes ya activados son: Visitante 8,
              Iniciante 30+2, Plus 40+5, Pro 50+10, Élite 60+15.
            </Viñeta>
            <Viñeta>
              Al <LinkActiva>ACTIVAR</LinkActiva> a más tardar el 31 de diciembre
              de 2026, puedes mantener o cambiar de plan sin costo adicional.
            </Viñeta>
            <Viñeta>
              Pagas solo el precio de la etapa vigente del plan que estés
              escogiendo y le das uso sin diferencia alguna de precio, dado que
              es el inicio.
            </Viñeta>
          </ul>
        </section>

        {/* ==========================================
            CARD 2: REGLAS, CUPOS, ETAPAS, DESCUENTOS
            ETAPA 1 INICIA 1 ENE 2027 (NO 2026)
            ========================================== */}
        <section style={box}>
          <ul style={{ ...lista, marginTop: 0 }}>
            <Viñeta>
              Al <LinkActiva>ACTIVAR</LinkActiva> a más tardar el 31 dic 2026 UTC
              (o solicitud por e-mail a contacto@drones.orientese.com hasta el 15
              ene 2027):
            </Viñeta>
            <Viñeta>El plan queda operativo 365 días desde el 1 ene 2027.</Viñeta>
            <Viñeta>
              Los extras del simulador solo se aplican desde esa vigencia.
            </Viñeta>
            <Viñeta>
              El descuento es el de la etapa al pagar, que asegura tu cupo de
              los primeros 1800 a nivel mundial, al momento de registrarte como
              usuario en la modalidad que a bien decidas, sea como piloto, como
              auxiliar, como técnico, como profesional, como persona jurídica o
              física.
            </Viñeta>
            <Viñeta>
              Las promociones de lanzamiento que inician el 1 de enero de 2027
              tienen una duración de 30 días lineales o al agotarse la cantidad
              de los primeros 1800 mundiales.
            </Viñeta>
            <Viñeta>
              Una vez alcanzado el primer año, las renovaciones tendrán el
              beneficio de conservar la tarifa con la cual iniciaste tu PLAN y
              para la segunda renovación usarás la del año anterior.
            </Viñeta>
            <Viñeta>
              Si decides cambiar de PLAN en esa renovación no pagas alguna
              diferencia sino solo el costo del PLAN que estés tomando.
            </Viñeta>
            <Viñeta>
              La promoción de lanzamiento es por ETAPAS y para los primeros 1800
              registrados y activados de cada uno de los PLANES.
            </Viñeta>
            <Viñeta>
              Los primeros 1800 registrados y activados del PLAN PLUS, del PLAN
              PRO y del PLAN ÉLITE a nivel mundial. Los del PLAN INICIANTE no
              están incluidos en estas etapas.
            </Viñeta>
            <Viñeta>
              Quien se registró en el período de octubre a diciembre del año
              2026 está asegurando su cupo de esos primeros 1800 en su primera
              etapa, aunque al iniciarse esa etapa el 1 de enero de 2027 ya
              haya sido superado el cupo de los primeros 1800 de esa ETAPA 1.
            </Viñeta>
            <Viñeta>
              Las ETAPAS tienen sus propios descuentos. La ETAPA 1 contempla los
              descuentos de 10% al PLAN PLUS, del 15% al PLAN PRO y del 20% al
              PLAN ÉLITE. Esta etapa inicia el 1 de enero de 2027 y termina 30
              días después o al agotarse los primeros 1800 a nivel mundial.
            </Viñeta>
            <Viñeta>
              Inmediatamente inicia la ETAPA 2 y, agotado el cupo de los
              primeros 1800 de cada plan o los 30 días, inicia la ETAPA 3.
            </Viñeta>
            <Viñeta>
              Si agotado el tiempo de los 30 días de una ETAPA un plan no agotó
              la cantidad determinada de los 1800, la ETAPA siguiente entra en
              vigencia. Nos reservamos el derecho a renovar una etapa en uno o
              más países.
            </Viñeta>
            <Viñeta>
              <LinkActiva>ACTIVA</LinkActiva> tu PLAN antes del 31 de diciembre
              de 2026 y disfruta esos descuentos. Activaste, aprovechaste.
            </Viñeta>
          </ul>
        </section>

        {/* ==========================================
            CARD 3: PAGO INTEGRO + LEYENDA INFORMATIVA
            ========================================== */}
        <section style={box}>
          <p style={{ marginTop: 0 }}>{FRASE_PAGO}</p>
          <p style={{ marginBottom: 0 }}>{FRASE_INFORMATIVO}</p>
        </section>

        {/* ==========================================
            CTA. MISMO DESTINO TEMPORAL: PLANES
            ========================================== */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button type="button" style={btn} onClick={() => ir('PLANES')}>
            ACTIVAR MI PLAN
          </button>
          <button type="button" style={btn} onClick={() => ir('PLANES')}>
            ACTIVAR Y SUBIR DE PLAN
          </button>
        </div>
      </div>
    </div>
  );
}
