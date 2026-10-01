// ==========================================
// PROFISSIONAISLISTADADOS.JS
// DATOS Y HELPERS DE LA LISTA (NO ES UI)
// MOCK EN src/data/drones/profissionais.json
// LECTURA DE LOCALSTORAGE
// PAGINACION: CONSTANTES 6 / 15 / 30
// TIPO PERSONA VIAJA EN EL OBJETO; NO ES UN ROL NUEVO
// WIZARD CadastroProfissionais NO SE TOCA AQUI
// ==========================================

import PROFISSIONAIS_JSON from '../../../data/drones/profissionais.json';

export const STORAGE_KEY = 'cadastros_profissionais';
export const OPCOES_POR_PAGINA = [6, 15, 30];
export const POR_PAGINA_PADRAO = 15;

function normalizarTipoPersona(valor) {
  const t = String(valor || '').toLowerCase().trim();
  if (t === 'juridica' || t === 'jurídica' || t === 'pj') return 'juridica';
  return 'fisica';
}

// ==========================================
// CATALOGO MOCK (HASTA CONECTAR BD DRONES)
// ==========================================
export const MOCK_PROFISSIONAIS = (PROFISSIONAIS_JSON || []).map((item) => ({
  ...item,
  tipoPersona: normalizarTipoPersona(item.tipoPersona)
}));

// ==========================================
// VAGAS MOCK (MURAL; CADASTROVAGAS AUN NO CONECTADO)
// UNA FICHA DE MUESTRA. SIN EMPRESA NI PERSONA FALSAS
// ==========================================
export const MOCK_VAGAS = [
  {
    id: 'mostra-vaga',
    titulo: 'AQUI A VAGA',
    empresa: 'NOME DA EMPRESA',
    local: 'cidade - UF',
    contrato: 'AQUI O CONTRATO',
    mostra: true
  }
];

// ==========================================
// MAPEA ALTAS LOCALES AL FORMATO DE CARD
// TIPO PERSONA DEL CLIENTE/PROFESIONAL SI VIENE EN EL ALTA
// ==========================================
export function lerCadastrosLocais() {
  try {
    const bruto = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(bruto)) return [];
    return bruto.map((item) => ({
      id: item.id,
      tipoPersona: normalizarTipoPersona(item.tipoPersona || item.tipoPessoa),
      nome: item.nomeApresentacao || item.pessoaisPortal?.nome || 'Profissional',
      especialidade: (item.areasSetor && item.areasSetor[0]) || 'Profissional afim',
      estado: item.uf || '',
      cidade: item.cidade || '',
      registro: item.id ? String(item.id).slice(0, 8).toUpperCase() : 'LOCAL',
      experiencia: item.nivelExperiencia || item.anosExperiencia || '—',
      pagamento: item.vinculo || '—',
      disponibilidade: (item.disponibilidades && item.disponibilidades[0]) || 'Sob Consulta',
      certificacao: item.temCredencial ? 'Autorizado / Certificado' : 'Autônomo / Independente',
      garantia: 'Sem Garantia',
      whatsapp: item.whatsapp || item.telefone1 || '',
      email: item.pessoaisPortal?.email || '',
      origem: 'local'
    }));
  } catch (e) {
    return [];
  }
}
