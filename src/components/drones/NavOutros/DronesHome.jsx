// ==========================================
// RUTA: src/components/drones/NavOutros/DronesHome.jsx
// PORTADA DEL SUBDOMINIO DRONES
// AQUI SE EDITA EL TITULO, EL TEXTO Y LAS 3 TARJETAS
// ==========================================

import React from 'react';

export const DronesHome = () => {
  return (
    <div className="drones-home">

      {/* TITULO Y TEXTO DE BIENVENIDA */}
      <section className="drones-home-intro">
        <h1 className="drones-home-title">
          Portal Especializado do Setor de Drones
        </h1>
        <p className="drones-home-text">
          Bem-vindo ao subdomínio oficial do{' '}
          <a
            href="https://drones.orientese.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            drones.orientese.com
          </a>
          . Um ecossistema completo focado em conectar pilotos, auxiliares de voo,
          técnicos de manutenção, prestadores de serviços e empresas do segmento
          de aeronaves não tripuladas.
        </p>
      </section>

      {/* TRES TARJETAS DE ANUNCIANTES */}
      <section className="drones-home-ads">
        <h2 className="drones-home-ads-title">
          Parceiros / Espaço para Anunciantes
        </h2>

        <div className="drones-home-grid">
          <div className="drones-home-card">
            <span className="drones-home-badge">Espaço Disponível</span>
            <h3>Anuncie Sua Oficina Aqui</h3>
            <p>Destaque seus serviços de manutenção preventiva e reparos no portal.</p>
          </div>

          <div className="drones-home-card">
            <span className="drones-home-badge">Espaço Disponível</span>
            <h3>Peças e Componentes</h3>
            <p>Baterias, hélices, motores e gimbals com links diretos para seu e-commerce.</p>
          </div>

          <div className="drones-home-card">
            <span className="drones-home-badge">Espaço Disponível</span>
            <h3>Seguros RETA & ANAC</h3>
            <p>Assessoria completa para pilotos e empresas operarem 100% regulamentados.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DronesHome;