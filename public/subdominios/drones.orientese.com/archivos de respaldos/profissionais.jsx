import React, { useState } from 'react';

export default function ListaProfissionais() {
  // Lista de respaldo integrada para evitar pantallas en blanco si el JSON falla
  const profesionalesEjemplo = [
    { id: 1, nome: "Carlos Silva", categoria: "Piloto", especialidade: "Mapeamento Agrícola", cidade: "Ribeirão Preto - SP" },
    { id: 2, nome: "Juliana Costa", categoria: "Auxiliar", especialidade: "Observadora de Espaço Aéreo", cidade: "Sorocaba - SP" },
    { id: 3, nome: "Marcos Lima", categoria: "Consertos", especialidade: "Manutenção Preventiva e Calibração", cidade: "Campinas - SP" }
  ];

  const [busca, setBusca] = useState('');

  const profesionalesFiltrados = profesionalesEjemplo.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase()) || 
    p.especialidade.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto my-6 font-sans">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-black text-gray-900">Diretório de Profissionais Cadastrados</h2>
        <p className="text-sm text-gray-600">Encontre advogados, arquitetos, engenheiros, consturores, obreiros especializados próximos a você.</p>
      </div>

      {/* Barra de Búsqueda */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Digite um nome ou especialidade (ex: Agrícola)..." 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista de Tarjetas */}
      <div className="space-y-4">
        {profesionalesFiltrados.map(p => (
          <div key={p.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-gray-900 text-base">{p.nome}</h4>
              <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">{p.categoria} — {p.especialidade}</p>
              <p className="text-xs text-gray-500">📍 {p.cidade}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
              Contatar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}