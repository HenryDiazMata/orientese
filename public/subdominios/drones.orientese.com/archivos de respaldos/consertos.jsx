import React from 'react';

export default function Consertos() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 max-w-4xl mx-auto my-6 font-sans">
      {/* Cabeçalho da Seção */}
      <div className="border-b pb-4 mb-6">
        <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-red-100 text-red-800 tracking-wider">
          Oficina Técnica
        </span>
        <h2 className="text-3xl font-black text-gray-900 mt-2">Consertos e Reparos de Drones</h2>
        <p className="text-sm text-gray-600 mt-1">
          Especialistas em recuperação de equipamentos após quedas ou falhas mecânicas em drones.orientese.com
        </p>
      </div>

      {/* Conteúdo Técnico */}
      <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
        <p>
          Acidentes acontecem, mas a tecnologia atual permite a recuperação de grande parte das aeronaves. 
          Nossos técnicos cadastrados realizam diagnósticos precisos para devolver seu equipamento aos ares com segurança e garantia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
            <h4 className="font-bold text-red-900 mb-2">🔧 Reparos Estruturais e Motores</h4>
            <p className="text-xs text-gray-600">
              Troca de braços rompidos (hastes), substituição de hélices danificadas, motores queimados e carcaças (shells) comprometidas após impactos.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">📷 Conserto de Gimbal e Câmeras</h4>
            <p className="text-xs text-gray-600">
              Alinhamento e troca de cabos flat rompidos, reparo no sistema estabilizador do gimbal e substituição de lentes ou sensores trincados.
            </p>
          </div>
        </div>

        {/* Nota */}
        <div className="p-3 bg-gray-50 rounded text-[11px] text-gray-500 italic border-l-2 border-gray-300">
          Nota: O valor do conserto varia drasticamente dependendo da disponibilidade de peças de reposição (originais ou paralelas) e da taxa de importação de componentes no Brasil.
        </div>
      </div>
    </div>
  );
}
