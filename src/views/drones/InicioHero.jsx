// ==========================================
// ARCHIVO: src/views/drones/InicioHero.jsx
// INICIO = SOLO CARRUSEL PRE-LANZAMIENTO (5 SLIDES)
// ANCHO 80 % DEL MAIN. FONDO DEL MAIN: BLANCO.
// LOGO:  /logos/drones/DronesOrienteseCom_cortoSF.png
// PEDRON: /Imagenes/Drones/Pedron_01.png
//
// COMO EDITAR A LINEA:
//   textAlign: 'left' | 'center' | 'right'     → TEXTO
//   alignItems / alignSelf: 'flex-start' | 'center' | 'flex-end'
//     flex-start = IZQUIERDA (en fila) o ARRIBA (en columna)
//     flex-end   = DERECHA   (en fila) o ABAJO  (en columna)
//   marginTop / marginBottom en img o LogoMarca → SUBIR / BAJAR IMAGEN
//   lineHeight → INTERLINEADO DEL TEXTO
//   border / borderRadius → GROSOR Y REDONDEO DE CAJA
// ==========================================

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

// ---------- PALETA (NO BEIGE / NO OXIDO / NO DARK) ----------
const AZUL = '#1A8FD0';          // AZUL LOGO / TITULOS / BOTONES
const BLANCO = '#ffffff';        // FONDO MAIN Y CAJAS
const BORDE_CAJA = '#7EC8D8';    // LINEA CELESTE DE LAS CAJAS (FOTOS)
const TEXTO = '#123';            // COLOR DE PARRAFOS

// ---------- RUTAS PUBLICAS (CARPETA public/ DE VITE) ----------
const LOGO_SRC = '/logos/drones/DronesOrienteseCom_cortoSF.png';
const PEDRON_SRC = '/Imagenes/Drones/Pedron_01.png';

// ---------- CARRUSEL ----------
const TIEMPO_SLIDE_MS = [9000, 27000, 45000, 54000, 63000];  // AUTOPLAY LENTO (MILISEGUNDOS)
const TOTAL_SLIDES = 5;

// ---------- PRECIOS E1 (POR SI SE REUSAN; SLIDE 4 YA NO MUESTRA TARJETAS) ----------
const PRECIOS = {
  INICIANTE: 66,
  LISTA: { PLUS: 99, PRO: 263, ELITE: 329 },
  E1: { PLUS: 89, PRO: 224, ELITE: 263 },
};

// ---------- CAJA DE TEXTO (GROSOR, COLOR DE LINEA, FONDO, REDONDEO) ----------
const card = {
  background: BLANCO,            // FONDO DE LA CAJA
  border: `4px solid ${BORDE_CAJA}`, // GROSOR 4px / COLOR CELESTE
  borderRadius: 24,              // REDONDEO TIPO FOTO
  padding: '1.2rem 1.25rem',
  boxShadow: 'none',
  lineHeight: 1.55,              // INTERLINEADO DE PARRAFOS DENTRO DE LA CAJA
  fontSize: '1.1rem',   // SUBÍ A 1.1rem / 1.2rem  |  BAJÁ A 0.9rem
  width: '100%',
  maxWidth: '42em',     // ANCHO LIGA AL TAMAÑO DE LETRA
  boxSizing: 'border-box',
};

// ---------- BOTONES (OPCIONALES; EL MENU IZQUIERDO BASTA) ----------
const btn = {
  background: AZUL,
  color: BLANCO,
  border: 'none',
  borderRadius: 8,
  padding: '0.55rem 0.9rem',
  cursor: 'pointer',
  fontWeight: 700,
};

// ---------- MARCO DE CADA SLIDE ----------
const slideBox = {
  minHeight: 540,
  background: BLANCO,            // FONDO DEL SLIDE
  border: `1px solid ${AZUL}`,   // GROSOR 1px / COLOR AZUL LOGO
  borderRadius: 16,
  padding: '1.5rem 2.4rem',
  display: 'flex',
  flexDirection: 'column',       // COLUMNA: ARRIBA = LOGO, ABAJO = TEXTO
  alignItems: 'center',          // CENTRO HORIZONTAL DE HIJOS
  justifyContent: 'center',      // CENTRO VERTICAL DEL BLOQUE
  textAlign: 'center',           // TEXTO CENTRADO POR DEFECTO
  color: TEXTO,
};

// ---------- LOGO DEL SLIDE ----------
// altura = TAMANO. marginTop negativo = SUBE. marginBottom = BAJA EL SIGUIENTE BLOQUE.
function LogoMarca({ altura = 153, margenArriba = 0, margenAbajo = 0 }) {
  return (
    <img
      src={LOGO_SRC}
      alt="drones.orientese.com"
      style={{
        height: altura,
        width: '80%',
        maxWidth: '100%',
        objectFit: 'contain',
        marginTop: margenArriba,     // SUBIR / BAJAR LOGO
        marginBottom: margenAbajo,
        display: 'block',
      }}
    />
  );
}

export default function InicioHero({ setCurrentView }) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const [slide, setSlide] = useState(0);

  // ---------- AUTOPLAY LENTO ----------
  useEffect(() => {
    const ms = TIEMPO_SLIDE_MS[slide] || 9000;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % TOTAL_SLIDES);
    }, ms);
    return () => clearInterval(id);
  }, [slide]);

  // ---------- IR A OTRA VISTA DEL HUB (ID INTERNO SIGUE SIENDO CADASTRO) ----------
  const ir = (vista) => {
    if (setCurrentView) {
      setCurrentView(vista);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const irSlide = (n) => setSlide((n + TOTAL_SLIDES) % TOTAL_SLIDES);

  return (
    <div
      className="drones-inicio-hero"
      style={{
        background: BLANCO,
        padding: '1.25rem 1.5rem 2rem',
        color: TEXTO,
        width: '80%',              // ANCHO MAXIMO DEL CARRUSEL
        maxWidth: '80%',
        margin: '0 auto',          // CENTRADO EN EL MAIN
        boxSizing: 'border-box',
      }}
    >
      {/* ========== CONTENEDOR DEL CARRUSEL ========== */}
      <section className="drones-carrusel" style={{ position: 'relative' }}>

        {/* ========== SLIDE 1: LOGO CENTRADO ARRIBA + TITULO CENTRADO ABAJO ========== */}
        {/* PARA LOGO IZQ / TEXTO DER: flexDirection:'row', justifyContent:'space-between' */}
        {slide === 0 && (
          <article
            style={{
              ...slideBox,
              alignItems: 'left',
              justifyContent: 'left',
              textAlign: 'right',
              gap: '7.2rem',         // SEPARACION VERTICAL LOGO ↔ TITULO
            }}
          >
            <LogoMarca
              altura={153}
              margenArriba={54}       // SUBE EL LOGO: poné -12 / -24
              margenAbajo={54}
            />
            <div style={{ textAlign: 'right' }}>
              <h2
                style={{
                  color: AZUL,
                  margin: '0 0 0.25rem',
                  fontSize: '1.75rem',
                  letterSpacing: '0.04em',
                  lineHeight: 1.15,  // INTERLINEADO DEL TITULO
                  fontWeight: 800,
                }}
              >
                {t('inicio.slide1Titulo')}
              </h2>
              <p
                style={{
                  color: AZUL,
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  fontSize: '1.25rem',
                  lineHeight: 1.3,
                }}
              >
                {t('inicio.slide1Sub')}
              </p>
            </div>
          </article>
        )}

        {/* ========== SLIDE 2: PEDRON IZQUIERDA + LOGO Y CAJA A LA DERECHA ========== */}
        {slide === 1 && (
          <article
            style={{
              ...slideBox,
              flexDirection: 'row',     // FILA: IZQ PEDRON / DER TEXTO
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '1.5rem',
            }}
          >
            <img
              src={PEDRON_SRC}
              alt=""
              style={{
                height: 270,            // TAMANO PEDRON
                width: 'auto',
                maxWidth: 220,
                objectFit: 'contain',
                marginTop: 0,           // SUBIR PEDRON: marginTop negativo
                marginBottom: -200,        // BAJAR PEDRON: marginTop positivo
                alignSelf: 'center',    // 'flex-start' = ARRIBA, 'flex-end' = ABAJO
              }}
            />
            <div style={{ flex: '1 1 300px', maxWidth: '42em', textAlign: 'center' }}>
              <LogoMarca altura={135} margenArriba={0} margenAbajo={12} />
              <div style={{ ...card, textAlign: 'center' }}>
                <p style={{ marginTop: 0, marginBottom: '0.75rem' }}>{t('inicio.slide2P1')}</p>
                <p style={{ margin: 0 }}>{t('inicio.slide2P2')}</p>
              </div>
            </div>
          </article>
       )}
        {/* ========== SLIDE 3: LOGO CENTRO + CAJA REGISTRO / ACTIVAR / PAGO ========== */}
        {slide === 2 && (
          <article style={{ ...slideBox, textAlign: 'center' }}>
            <LogoMarca altura={135} margenArriba={0} margenAbajo={16} />
            <div style={{ ...card, textAlign: 'center', }}>
              <p style={{ marginTop: 0 }}>{t('inicio.slide3P1')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide3P2')}</p>
              <p style={{ marginBottom: 0, fontWeight: 700 }}>{t('inicio.frasePago')}</p>
            </div>
          </article>
        )}

        {/* ========== SLIDE 4: LOGO CENTRO + CAJA PLANES / REGISTRO (SIN TARJETAS) ========== */}
        {slide === 3 && (
          <article style={{ ...slideBox, textAlign: 'center' }}>
            <LogoMarca altura={135} margenArriba={0} margenAbajo={16} />
            <div style={{ ...card, textAlign: 'center', }}>
              <p style={{ margin: 0 }}>{t('inicio.slide4P1')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P2')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P3')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P4')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P5')}</p>
            </div>
          </article>
        )}

        {/* ========== SLIDE 5: LOGO CENTRO + CAJA PROMO 60 DIAS / CUPO 1800 POR PLAN ========== */}
        {slide === 4 && (
          <article style={{ ...slideBox, textAlign: 'center' }}>
            <LogoMarca altura={135} margenArriba={0} margenAbajo={16} />
            <div style={{ ...card, textAlign: 'center', }}>
              <p style={{ margin: 0 }}>{t('inicio.slide5P1')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide5P2')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide5P3')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide5P4')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide5P5')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide5P6')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide5P7')}</p>
            </div>
          </article>
        )}

        {/* ========== FLECHA IZQUIERDA ========== */}
        <button
          type="button"
          aria-label={t('inicio.prev')}
          onClick={() => irSlide(slide - 1)}
          style={{
            ...btn,
            position: 'absolute',
            left: 8,                    // PEGAR / ALEJAR FLECHA IZQ
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.35rem 0.6rem',
          }}
        >
          ‹
        </button>

        {/* ========== FLECHA DERECHA ========== */}
        <button
          type="button"
          aria-label={t('inicio.next')}
          onClick={() => irSlide(slide + 1)}
          style={{
            ...btn,
            position: 'absolute',
            right: 8,                   // PEGAR / ALEJAR FLECHA DER
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.35rem 0.6rem',
          }}
        >
          ›
        </button>

        {/* ========== PUNTOS ========== */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={t('inicio.punto', { n: i + 1 })}
              onClick={() => setSlide(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: `1px solid ${AZUL}`,
                background: i === slide ? AZUL : BLANCO,
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      {/* ========== HUECOS ANUNCIANTES / PATROCINADORES (DEBAJO DEL CARRUSEL) ========== */}
      <aside
        className="drones-inicio-anunciantes"
        style={{
          marginTop: '1.25rem',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: '0 0 0.7rem',
            fontWeight: 700,
            color: AZUL,
            letterSpacing: '0.06em',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
          }}
        >
          {t('inicio.espacioAnunciantes')
}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.7rem',
          }}
        >
          <article style={{ ...card, minHeight: 96 }} />
          <article style={{ ...card, minHeight: 96 }} />
          <article style={{ ...card, minHeight: 96 }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.7rem',
          }}
        >
          <article style={{ ...card, minHeight: 96 }} />
          <article style={{ ...card, minHeight: 96 }} />
          <article style={{ ...card, minHeight: 96 }} />
        </div>
      </aside>
    </div>
  );
}