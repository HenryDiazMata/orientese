import React from 'react';

export default function NosotrosPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '800px', margin: '0 auto' }}>
      <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 1rem 0' }}>ACERCA DE FUNDAVAL</h3>
      <p style={{ lineHeight: '1.7', color: '#334155' }}>
        FUNDAVAL ES LA FUNDACIÓN PARA EL DESARROLLO SOCIAL, CAMPESINO Y DE EMPRENDIMIENTO ASOCIADA AL PORTAL ORIÉNTESE. NUESTRA MISIÓN ES PROMOVER LA EDUCACIÓN COMUNITARIA, DEFENDER LOS DERECHOS SOCIALES Y DOTAR DE HERRAMIENTAS TÉCNICAS Y LEGALES A COMUNIDADES CAMPESINAS Y DE PESCA ARTESANAL.
      </p>
      <h4 style={{ color: '#047857', marginTop: '1.5rem' }}>NUESTROS OBJETIVOS</h4>
      <ul style={{ lineHeight: '1.8', color: '#334155' }}>
        <li>FACILITAR EL ACCESO LIBRE A DOCUMENTACIÓN LEGAL Y FORMATIVA.</li>
        <li>CAPACITAR EN PROYECTOS PRODUCTIVOS Y SOSTENIBLES.</li>
        <li>FOMENTAR EL EMPRENDIMIENTO SOCIAL Y COMUNITARIO.</li>
      </ul>
    </div>
  );
}