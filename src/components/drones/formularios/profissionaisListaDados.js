// ==========================================
// PROFISSIONAISLISTADADOS.JS
// DATOS Y HELPERS DE LA LISTA (NO ES UI)
// MOCK + LECTURA DE LOCALSTORAGE
// PAGINACION: CONSTANTES 6 / 15 / 30
// ==========================================

export const STORAGE_KEY = 'cadastros_profissionais';
export const OPCOES_POR_PAGINA = [6, 15, 30];
export const POR_PAGINA_PADRAO = 15;

// ==========================================
// CATALOGO MOCK (HASTA CONECTAR BD DRONES)
// ==========================================
export const MOCK_PROFISSIONAIS = [
  {
    id: 1,
    nome: 'Carlos Eduardo',
    especialidade: 'Piloto de Drone',
    estado: 'SP',
    cidade: 'Ribeirão Preto',
    registro: 'ANAC-10293',
    experiencia: '100h+',
    pagamento: 'PJ / NF',
    disponibilidade: 'Imediata',
    certificacao: 'Autorizado / Certificado',
    garantia: '3 Meses',
    whatsapp: '5516999998888',
    email: 'carlos.piloto@example.com'
  },
  {
    id: 2,
    nome: 'Mariana Silva',
    especialidade: 'Agrônomo',
    estado: 'MG',
    cidade: 'Uberlândia',
    registro: 'CREA-98765',
    experiencia: 'Especialista',
    pagamento: 'CLT / Diária',
    disponibilidade: 'Finais de Semana',
    certificacao: 'Autônomo / Independente',
    garantia: 'Sem Garantia',
    whatsapp: '5534988887777',
    email: 'mariana.agro@example.com'
  },
  {
    id: 3,
    nome: 'Roberto Alves',
    especialidade: 'Técnico em Manutenção',
    estado: 'PR',
    cidade: 'Cascavel',
    registro: 'CREA-43210',
    experiencia: 'Especialista',
    pagamento: 'PJ / NF',
    disponibilidade: 'Imediata',
    certificacao: 'Autorizado / Certificado',
    garantia: '6 Meses',
    whatsapp: '5545977776666',
    email: 'roberto.fix@example.com'
  },
  {
    id: 4,
    nome: 'Ana Souza',
    especialidade: 'Fotógrafo / Videomaker',
    estado: 'SP',
    cidade: 'Campinas',
    registro: 'Portfólio',
    experiencia: 'Estagiário',
    pagamento: 'Diária',
    disponibilidade: 'Sob Consulta',
    certificacao: 'Autônomo / Independente',
    garantia: '1 Mês',
    whatsapp: '5519966665555',
    email: 'ana.foto@example.com'
  }
];

// ==========================================
// VAGAS MOCK (MURAL; CADASTROVAGAS AUN NO CONECTADO)
// ==========================================
export const MOCK_VAGAS = [
  { id: 1, titulo: 'Piloto para Pulverização de Cana', empresa: 'Usina Santa Maria', local: 'Ribeirão Preto - SP', contrato: 'Safra / Temporário' },
  { id: 2, titulo: 'Mapeamento Agrícola com Drones', empresa: 'AgroGeo Topografia', local: 'Uberlândia - MG', contrato: 'PJ / Prestação de Serviço' },
  { id: 3, titulo: 'Técnico de Manutenção DJI', empresa: 'DroneFix Soluções', local: 'Cascavel - PR', contrato: 'CLT' }
];

// ==========================================
// MAPEA ALTAS LOCALES AL FORMATO DE CARD
// ==========================================
export function lerCadastrosLocais() {
  try {
    const bruto = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(bruto)) return [];
    return bruto.map((item) => ({
      id: item.id,
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