// ==========================================
// ARCHIVO: src/components/drones/NavOutros/DronesHome.jsx
// VISTA BIENVENIDA
// Sin cards fijas de anuncios. EspacioPub va en DronesView.
// ==========================================

import React from 'react';

const FRASE_PAGO =
  'El plan se paga íntegro al cadastrarse. Si su tarjeta internacional admite cuotas, las condiciones las fija su banco, no drones.orientese.com.';

const CIEL = '#BFE8F7';
const AZUL = '#1A8FD0';
const TINTA = '#123';

export const DronesHome = ({ setCurrentView }) => {
  const ir = (viewId) => {
    if (setCurrentView) {
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="drones-home" style={{ background: CIEL, color: TINTA, minHeight: 'auto' }}>
      <section className="drones-home-intro">
        <h1 className="drones-home-title" style={{ color: AZUL }}>
          BIENVENIDA
        </h1>
        <p
          className="drones-home-title"
          style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: AZUL }}
        >
          Portal especializado del sector de drones
        </p>
      </section>

      <article className="drones-welcome" style={{ color: TINTA }}>
        <p>
          Bienvenido a <strong>drones.orientese.com</strong>, espacio informativo
          del mundo de las aeronaves no tripuladasen en <strong>orientese.com</strong>.
        </p>

        <p>
          <strong>Drones.orientese.com</strong> reúne, en un solo lugar, a quienes
          trabajan o quieren trabajar con drones: pilotos, auxiliares de vuelo,
          técnicos de mantenimiento y reparación, profesionales del sector y
          empresas que prestan o contratan servicios aéreos.
        </p>

        <p>
          Puede usarlo como <strong>VISITANTE</strong> o como{' '}
          <strong>MIEMBRO</strong>, registrándose en el plan anual que mejor le
          parezca.
        </p>

        <p>
          Drones.orientese.com no vende productos ni intermedia en las
          negociaciones que se produzcan u ofrezcan los miembros según el plan
          adquirido: solo informa lo que los miembros registrados del site pueden
          ofrecer.
        </p>

        <p>
          Visitante o miembro puede consultar el directorio o mural de los{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('PILOTOS')}>
            miembros registrados
          </button>{' '}
          que ofrecen sus servicios, y contactar y contratar, de manera fija o
          temporal, al profesional, técnico o empleado de su interés. También
          puede ver la sección de solicitud de personal (
          <button type="button" className="drones-welcome-link" onClick={() => ir('VAGAS')}>
            Vagas
          </button>
          ), que publican los miembros con ese beneficio según el plan adquirido;
          la sección de{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('DRONES')}>
            USADOS
          </button>
          , donde hay drones o partes usadas en buen estado ofrecidos por los
          miembros con ese beneficio; y la vitrina de{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('ANUNCIANTES')}>
            ANUNCIANTES / PATROCINADORES
          </button>
          , a quienes contactar para pedidos de productos o servicios. Además
          puede usar el simulador de{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('ORÇAMENTOS')}>
            ORÇAMENTOS
          </button>{' '}
          como referencia de mercado —no como precio oficial— y por las veces
          diarias permitidas.
        </p>

        <p>
          Al hacerse miembro mediante{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('CADASTRO')}>
            CADASTRO (Registro)
          </button>{' '}
          accede a los beneficios de su plan (PLUS, PRO o ELITE) durante 365
          días: editar su ficha y, según el plan, publicar avisos de solicitud de
          personal, ofrecer en venta o alquiler partes, accesorios o equipos
          usados en buen estado, y otros beneficios que el ofertante destine a
          miembros y/o visitantes (avisos o invitaciones a cursos, descuentos u
          otros). El detalle de cada plan está en{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('PLANES')}>
            PLANES
          </button>{' '}
          y la opción de hacerse miembro está en{' '}
          <button type="button" className="drones-welcome-link" onClick={() => ir('CADASTRO')}>
            CADASTRO (Registro)
          </button>
          . El costo de membresía se sitúa en un rango accesible, pensado para no
          ser una barrera.
        </p>

        <p>{FRASE_PAGO}</p>

        <p>
          El sitio está pensado para orientar: quién hace qué, quién busca equipo
          o gente, y qué orden de magnitud tiene un servicio.{' '}
          <strong>Drones.orientese.com no cobra comisiones</strong> por los
          negocios entre miembros o con visitantes. Úselo con la calma de un
          directorio, no con la prisa de un marketplace: el site muestra quién
          existe y cómo encontrarlo. No obliga a decidir ahora ni cierra el
          negocio. Quien quiere un piloto o una pieza localiza en el mural y
          luego contacta, negocia y contrata por su cuenta.
        </p>
      </article>
    </div>
  );
};

export default DronesHome;