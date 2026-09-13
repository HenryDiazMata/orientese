// ==========================================
// somos.jsx
// Página "Quem Somos" - Versão corrigida de tema
// ==========================================

import React from 'react';
import { useTheme } from "../../context/drones/ThemeContext";

export default function Somos() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      <div 
        className="rounded-2xl p-8 shadow-md space-y-5"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          color: isDark ? '#f8fafc' : '#0f172a'
        }}
      >
        
        <h1 
          className="text-2xl md:text-3xl font-extrabold mb-6"
          style={{ color: '#0077C8' }}
        >
          Quem Somos
        </h1>

        <p className="text-sm md:text-base leading-relaxed">
          O{" "}
          <a 
            href="https://drones.orientese.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-semibold underline hover:opacity-80"
            style={{ color: '#0077C8' }}
          >
            drones.orientese.com
          </a>{" "}
          é um ecossistema digital criado por <strong>HD Prodution</strong>, para conectar profissionais, empresas e entusiastas do setor de aeronaves não tripuladas (drones).
        </p>

        <p className="text-sm md:text-base leading-relaxed">
          Nossa missão é facilitar o acesso a orçamentos referenciais, conexão direta entre contratantes e pilotos qualificados, auxiliares de voo, técnicos de manutenção e fornecedores do segmento em todo o Brasil.
        </p>

        <p className="text-sm md:text-base leading-relaxed">
          Nossa função é informar tudo o que consideramos relacionado ao mundo dos drones; portanto, não vendemos drones nem peças, não prestamos serviços de voo, manutenção ou reparos, nem qualquer outro serviço de venda ou aluguel.
        </p>

        <p className="text-sm md:text-base leading-relaxed">
          Somos apenas um meio de informação para quem presta e precisa desses serviços e produtos, tanto no Brasil quanto no resto do mundo, onde este subdomínio seja colocado à disposição dos cidadãos.
        </p>

        <p className="text-sm md:text-base leading-relaxed">
          Você se cadastrar, mediante uma mensalidade o mais acessível possível, para oferecer seus serviços ou ser contratado por quem precise seu serviço.
        </p>

      </div>
    </div>
  );
}