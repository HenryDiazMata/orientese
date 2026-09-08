import React from 'react';

export const DronesHome = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12 font-sans">
      
      {/* Sección Descripción */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Portal Especializado do Setor de Drones
        </h1>
        <p className="text-sm md:text-base leading-relaxed">
          Bem-vindo ao subdomínio oficial do{" "}
          <a 
            href="https://drones.orientese.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold underline hover:opacity-80"
          >
            drones.orientese.com
          </a>
          . Um ecossistema completo focado em conectar pilotos, auxiliares de voo, técnicos de manutenção, prestadores de serviços e empresas do segmento de aeronaves não tripuladas.
        </p>
      </section>

      {/* Sección de Tarjetas Reactivas */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xs font-bold tracking-widest uppercase">
            Parceiros / Espaço para Anunciantes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1 */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all shadow-sm">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
              Espaço Disponível
            </span>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Anuncie Sua Oficina Aqui</h3>
            <p className="text-xs text-gray-600 leading-normal">
              Destaque seus serviços de manutenção preventiva e reparos no portal.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all shadow-sm">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
              Espaço Disponível
            </span>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Peças e Componentes</h3>
            <p className="text-xs text-gray-600 leading-normal">
              Baterias, hélices, motores e gimbals com links diretos para seu e-commerce.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all shadow-sm">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
              Espaço Disponível
            </span>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Seguros RETA & ANAC</h3>
            <p className="text-xs text-gray-600 leading-normal">
              Assessoria completa para pilotos e empresas operarem 100% regulamentados.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DronesHome;