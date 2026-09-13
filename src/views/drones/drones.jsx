import React from 'react';

export default function Agricultura() {
  return (
    <div className="p-6 bg-white dark:bg-white rounded-xl shadow-md border border-gray-100 max-w-4xl mx-auto my-6 font-sans text-gray-900">
      {/* Encabezado de la Sección */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <span className="inline-block text-xs font-bold uppercase px-2 py-1 rounded bg-green-100 text-green-800 tracking-wider">
          Setor Agrícola
        </span>
        <h2 className="text-3xl font-black text-gray-900 mt-2">Drones no Agronegócio</h2>
        <p className="text-sm text-gray-600 mt-1">
          Informações técnicas, mapeamento de lavouras e pulverização aérea em drones.orientese.com
        </p>
      </div>

      {/* Contenido Informativo / Técnico */}
      <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
        <p className="text-gray-700">
          O uso de aeronaves remotamente pilotadas (RPA) no campo revolucionou a agricultura de precisão no Brasil. 
          Nesta seção, produtores e pilotos encontram os parâmetros necessários para operações eficientes e seguras.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-bold text-green-900 mb-2">🛸 Mapeamento Multiespectral</h4>
            <p className="text-xs text-gray-700">
              Identificação de estresse hídrico, falhas de plantio, contagem de mudas e saúde da lavoura utilizando sensores RGB e NIR.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">💦 Pulverização Inteligente</h4>
            <p className="text-xs text-gray-700">
              Aplicação localizada de defensivos e fertilizantes com alta precisão, reduzindo o desperdício de insumos e amassamento da cultura.
            </p>
          </div>
        </div>

        {/* Nota Legal Integrada */}
        <div className="p-3 bg-gray-50 rounded text-xs text-gray-600 italic border-l-2 border-gray-300">
          Nota: Todas as operações agrícolas com drones no Brasil devem seguir as normativas do MAPA (Ministério da Agricultura), ANAC e DECEA.
        </div>
      </div>
    </div>
  );
}