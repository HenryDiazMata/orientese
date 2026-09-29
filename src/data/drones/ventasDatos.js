// ==========================================
// ARCHIVO COMPLETO: src/data/drones/ventasDatos.js
// DATOS MOCK DEL TABLERO EN VENTA
// NO ES VITRINA DE MARCA. SON BIENES.
// EL HUB NO INTERMEDIA LA TRANSACCION
// ==========================================

export const CATEGORIAS_VENTA = [
  { id: 'drone', label: 'Drone' },
  { id: 'peca', label: 'Peça' },
  { id: 'acessorio', label: 'Acessório' },
  { id: 'outro', label: 'Outro' },
];

export const CONDICOES_VENTA = [
  { id: 'novo', label: 'Novo' },
  { id: 'usado', label: 'Usado' },
];

export const ESTADOS_BRASIL_VENTA = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
  'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
];

export const STORAGE_VENTAS = 'drones.ventas.itens.v1';

// ==========================================
// ITENS DE EJEMPLO (BETA LOCAL)
// ==========================================
export const VENTAS_INICIALES = [
  {
    id: 1001,
    titulo: 'DJI Mini 4 Pro Fly More',
    categoria: 'drone',
    condicao: 'usado',
    preco: 4200,
    moeda: 'BRL',
    pais: 'BR',
    estado: 'SP',
    cidade: 'Campinas',
    descricao: 'Pacote Fly More. Baterias com ciclos baixos. Sem trincos. Venda direta com o dono.',
    fotos: [],
    email: 'vendedor.mini4@example.com',
    telefone: '',
    whatsapp: '19999990001',
    origem: 'mock',
    status: 'publicado',
    createdAt: '2026-09-01T12:00:00.000Z',
  },
  {
    id: 1002,
    titulo: 'DJI Agras T40 — seminovo',
    categoria: 'drone',
    condicao: 'usado',
    preco: 185000,
    moeda: 'BRL',
    pais: 'BR',
    estado: 'MT',
    cidade: 'Sorriso',
    descricao: 'Pulverização. Revisado. Horas e notas na conversa com o vendedor.',
    fotos: [],
    email: 'agro.t40@example.com',
    telefone: '6533330002',
    whatsapp: '65999990002',
    origem: 'mock',
    status: 'publicado',
    createdAt: '2026-08-20T12:00:00.000Z',
  },
  {
    id: 1003,
    titulo: 'Hélice 9455S par (phantom)',
    categoria: 'peca',
    condicao: 'novo',
    preco: 89,
    moeda: 'BRL',
    pais: 'BR',
    estado: 'PR',
    cidade: 'Curitiba',
    descricao: 'Par novo, lacrado. Envio combinado com o comprador.',
    fotos: [],
    email: 'pecas.curitiba@example.com',
    telefone: '',
    whatsapp: '41999990003',
    origem: 'mock',
    status: 'publicado',
    createdAt: '2026-09-10T12:00:00.000Z',
  },
  {
    id: 1004,
    titulo: 'Controle RC-N2 + cabo',
    categoria: 'acessorio',
    condicao: 'novo',
    preco: 650,
    moeda: 'BRL',
    pais: 'BR',
    estado: 'RJ',
    cidade: 'Niterói',
    descricao: 'Acessório novo. Nota e garantia do vendedor particular.',
    fotos: [],
    email: 'acessorios.rj@example.com',
    telefone: '2122220004',
    whatsapp: '21999990004',
    origem: 'mock',
    status: 'publicado',
    createdAt: '2026-09-15T12:00:00.000Z',
  },
];

export function formatPrecoBRL(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function etiquetaCategoria(id) {
  const found = CATEGORIAS_VENTA.find((c) => c.id === id);
  return found ? found.label : id || '—';
}

export function etiquetaCondicao(id) {
  const found = CONDICOES_VENTA.find((c) => c.id === id);
  return found ? found.label : id || '—';
}

export function carregarItensVentas() {
  try {
    const raw = localStorage.getItem(STORAGE_VENTAS);
    if (!raw) return [...VENTAS_INICIALES];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...VENTAS_INICIALES];
    const locales = parsed.filter((i) => i && i.origem === 'local');
    return [...locales, ...VENTAS_INICIALES];
  } catch {
    return [...VENTAS_INICIALES];
  }
}

export function guardarItemVenta(item) {
  try {
    const raw = localStorage.getItem(STORAGE_VENTAS);
    const prev = raw ? JSON.parse(raw) : [];
    const lista = Array.isArray(prev) ? prev : [];
    lista.unshift(item);
    localStorage.setItem(STORAGE_VENTAS, JSON.stringify(lista));
  } catch {
    /* IGNORAR SI LOCALSTORAGE FALLA */
  }
}
