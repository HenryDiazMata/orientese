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
// UNA FICHA DE MUESTRA. SIN PRECIO NI CONTACTO
// ==========================================
export const VENTAS_INICIALES = [
  {
    id: 'mostra-venta',
    mostra: true,
    titulo: 'AQUI O ITEM',
    categoria: 'outro',
    condicao: 'usado',
    preco: null,
    moeda: 'BRL',
    pais: 'BR',
    estado: 'UF',
    cidade: 'cidade',
    descricao: 'AQUI O QUE OFERECE',
    fotos: [],
    email: '',
    telefone: '',
    whatsapp: '',
    origem: 'mock',
    status: 'publicado',
    createdAt: '2026-10-01T12:00:00.000Z',
    selo: 'MOSTRA'
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
