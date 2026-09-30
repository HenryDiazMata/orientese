// ==========================================
// ARCHIVO: src/views/drones/InicioHero.jsx
// INICIO = SOLO CARRUSEL PRE-LANZAMIENTO (5 SLIDES)
// ANCHO 80 % DEL MAIN. FONDO DEL MAIN: BLANCO.
// LOGO:  /logos/drones/DronesOrienteseCom_cortoSF.png
// PEDRON: /Imagenes/Drones/Pedron_01.png
// Espacios publicitarios: DronesView + espacioPub.jsx
// ==========================================

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

const AZUL = '#1A8FD0';
const BLANCO = '#ffffff';
const BORDE_CAJA = '#7EC8D8';
const TEXTO = '#123';

const LOGO_SRC = '/logos/drones/DronesOrienteseCom_cortoSF.png';
const PEDRON_SRC = '/Imagenes/Drones/Pedron_01.png';

const TIEMPO_SLIDE_MS = [9000, 27000, 45000, 54000, 63000];
const TOTAL_SLIDES = 5;

const PRECIOS = {
  INICIANTE: 66,
  LISTA: { PLUS: 99, PRO: 263, ELITE: 329 },
  E1: { PLUS: 89, PRO: 224, ELITE: 263 },
};

const card = {
  background: BLANCO,
  border: `4px solid ${BORDE_CAJA}`,
  borderRadius: 24,
  padding: '1.2rem 1.25rem',
  boxShadow: 'none',
  lineHeight: 1.55,
  fontSize: '1.1rem',
  width: '100%',
  maxWidth: '42em',
  boxSizing: 'border-box',
};

const btn = {
  background: AZUL,
  color: BLANCO,
  border: 'none',
  borderRadius: 8,
  padding: '0.55rem 0.9rem',
  cursor: 'pointer',
  fontWeight: 700,
};

const slideBox = {
  minHeight: 540,
  background: BLANCO,
  border: `1px solid ${AZUL}`,
  borderRadius: 16,
  padding: '1.5rem 2.4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: TEXTO,
};

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
        marginTop: margenArriba,
        marginBottom: margenAbajo,
        display: 'block',
      }}
    />
  );
}

export default function InicioHero({ setCurrentView }) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const ms = TIEMPO_SLIDE_MS[slide] || 9000;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % TOTAL_SLIDES);
    }, ms);
    return () => clearInterval(id);
  }, [slide]);

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
        width: '80%',
        maxWidth: '80%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <section className="drones-carrusel" style={{ position: 'relative' }}>

        {slide === 0 && (
          <article
            style={{
              ...slideBox,
              alignItems: 'left',
              justifyContent: 'left',
              textAlign: 'right',
              gap: '7.2rem',
            }}
          >
            <LogoMarca altura={153} margenArriba={54} margenAbajo={54} />
            <div style={{ textAlign: 'right' }}>
              <h2
                style={{
                  color: AZUL,
                  margin: '0 0 0.25rem',
                  fontSize: '1.75rem',
                  letterSpacing: '0.04em',
                  lineHeight: 1.15,
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

        {slide === 1 && (
          <article
            style={{
              ...slideBox,
              flexDirection: 'row',
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
                height: 270,
                width: 'auto',
                maxWidth: 220,
                objectFit: 'contain',
                marginTop: 0,
                marginBottom: -200,
                alignSelf: 'center',
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

        {slide === 2 && (
          <article style={{ ...slideBox, textAlign: 'center' }}>
            <LogoMarca altura={135} margenArriba={0} margenAbajo={16} />
            <div style={{ ...card, textAlign: 'center' }}>
              <p style={{ marginTop: 0 }}>{t('inicio.slide3P1')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide3P2')}</p>
              <p style={{ marginBottom: 0, fontWeight: 700 }}>{t('inicio.frasePago')}</p>
            </div>
          </article>
        )}

        {slide === 3 && (
          <article style={{ ...slideBox, textAlign: 'center' }}>
            <LogoMarca altura={135} margenArriba={0} margenAbajo={16} />
            <div style={{ ...card, textAlign: 'center' }}>
              <p style={{ margin: 0 }}>{t('inicio.slide4P1')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P2')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P3')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P4')}</p>
              <p style={{ margin: 0 }}>{t('inicio.slide4P5')}</p>
            </div>
          </article>
        )}

        {slide === 4 && (
          <article style={{ ...slideBox, textAlign: 'center' }}>
            <LogoMarca altura={135} margenArriba={0} margenAbajo={16} />
            <div style={{ ...card, textAlign: 'center' }}>
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

        <button
          type="button"
          aria-label={t('inicio.prev')}
          onClick={() => irSlide(slide - 1)}
          style={{
            ...btn,
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.35rem 0.6rem',
          }}
        >
          ‹
        </button>

        <button
          type="button"
          aria-label={t('inicio.next')}
          onClick={() => irSlide(slide + 1)}
          style={{
            ...btn,
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.35rem 0.6rem',
          }}
        >
          ›
        </button>

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

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.6rem',
          marginTop: '1.1rem',
        }}
      >
        <button
          type="button"
          style={btn}
          onClick={() => ir('PROBAR')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#40E0D0';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = AZUL;
            e.currentTarget.style.color = BLANCO;
          }}
        >
          {t('inicio.btnProbar')}
        </button>
        <button
          type="button"
          style={btn}
          onClick={() => ir('PLANES')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#40E0D0';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = AZUL;
            e.currentTarget.style.color = BLANCO;
          }}
        >
          {t('inicio.btnPlanes')}
        </button>
        <button
          type="button"
          style={btn}
          onClick={() => ir('CADASTRO')}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#40E0D0';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = AZUL;
            e.currentTarget.style.color = BLANCO;
          }}
        >
          {t('inicio.btnCadastro')}
        </button>
      </div>
    </div>
  );
}