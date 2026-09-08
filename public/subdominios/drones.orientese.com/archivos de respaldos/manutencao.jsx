import React from 'react';

export default function Manutencao() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 max-w-4xl mx-auto my-6 font-sans">
      {/* Cabeçalho da Seção */}
      <div className="border-b pb-4 mb-6">
        <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-teal-100 text-teal-800 tracking-wider">
          Prevenção e Cuidados
        </span>
        <h2 className="text-3xl font-black text-gray-900 mt-2">Manutenção Preventiva</h2>
        <p className="text-sm text-gray-600 mt-1">
          Aumente a vida útil do seu drone e evite quedas com revisões periódicas em drones.orientese.com
        </p>
      </div>

      {/* Conteúdo Técnico */}
      <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
        <p>
          Drones são equipamentos de altíssima precisão tecnológica. A poeira agrícola, a maresia ou o simples desgaste natural 
          exigem que os pilotos realizem revisões constantes. A manutenção preventiva sai muito mais barata que o conserto de uma queda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-teal-50/50 rounded-lg border border-teal-100">
            <h4 className="font-bold text-teal-900 mb-2">⚙️ Calibração de Sistemas</h4>
            <p className="text-xs text-gray-600">
              Ajuste fino de bússola (compass), IMU (Unidade de Medida Inercial), sensores de visão anti-colisão e calibração do Rádio Controle.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2">🧹 Limpeza Interna e Firmware</h4>
            <p className="text-xs text-gray-600">
              Desoxidação de placas, limpeza de resíduos agrícolas (muito comum em drones de pulverização), testes de integridade de baterias e atualização de software.
            </p>
          </div>
        </div>

        {/* Nota */}
        <div className="p-3 bg-gray-50 rounded text-[11px] text-gray-500 italic border-l-2 border-gray-300">
          Recomendação: Para drones agrícolas (como a linha DJI Agras), recomenda-se a manutenção preventiva a cada 50 ou 100 horas de voo ativas.
        </div>
      </div>
    </div>
  );
}