// ==========================================
// PAGINAS DONDE PUEDE APARECER UN AVISO
// MAXIMO 6 HUECOS POR PAGINA (REGLA DE VITRINA)
// CLAVES ESTABLES — NO CAMBIAR SIN MIGRAR DATOS
// ==========================================

export const MAX_HUECOS_POR_PAGINA = 6;

export const PAGINAS_VITRINA = [
  { id: 'inicio', label: 'Início / Bienvenida' },
  { id: 'planes', label: 'Planes' },
  { id: 'activar', label: 'Activar' },
  { id: 'renovar', label: 'Renovar' },
  { id: 'presupuestos', label: 'Presupuestos' },
  { id: 'registro', label: 'Registro' },
  { id: 'registrados', label: 'Registrados (listados)' },
  { id: 'vagas', label: 'Vacantes' },
  { id: 'anunciantes', label: 'Anunciantes / Patrocinadores' },
  { id: 'usados', label: 'Usados' },
];

export const PAISES_VITRINA = [
  { code: 'BR', label: 'Brasil', moeda: 'BRL' },
  { code: 'AR', label: 'Argentina', moeda: 'ARS' },
  { code: 'UY', label: 'Uruguay', moeda: 'UYU' },
  { code: 'PY', label: 'Paraguay', moeda: 'PYG' },
  { code: 'CL', label: 'Chile', moeda: 'CLP' },
  { code: 'BO', label: 'Bolivia', moeda: 'BOB' },
  { code: 'PE', label: 'Perú', moeda: 'PEN' },
  { code: 'CO', label: 'Colombia', moeda: 'COP' },
  { code: 'EC', label: 'Ecuador', moeda: 'USD' },
  { code: 'MX', label: 'México', moeda: 'MXN' },
  { code: 'US', label: 'Estados Unidos', moeda: 'USD' },
  { code: 'ES', label: 'España', moeda: 'EUR' },
  { code: 'PT', label: 'Portugal', moeda: 'EUR' },
  { code: 'OT', label: 'Otro', moeda: '' },
];

export const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

// PASOS DE DURACION (DIAS)
export const PASOS_DURACION_DIAS = [15, 30, 90, 180, 365];

// ==========================================
// PRECIOS DE REFERENCIA BETA (BRL)
// NO ES COBRO. HUB INFORMATIVO. CHECKOUT = OTRO TEMA
// BASE = 30 DIAS + 1 PAGINA
// ANUNCIANTE  R$ 149
// PATROCINADOR R$ 249  (destacado)
// PAGINA EXTRA: + R$ 79 anunciante / + R$ 129 patrocinador
// PRORRATEO LINEAL POR DIAS (paso minimo 15)
// ==========================================
export const PRECIO_REF = {
  moneda: 'BRL',
  baseDias: 30,
  anunciante: { base30d: 149, paginaExtra: 79 },
  patrocinador: { base30d: 249, paginaExtra: 129 },
};

export function calcularValorReferencia({ modalidade, paginasCount, dias }) {
  const tipo = modalidade === 'patrocinador' ? PRECIO_REF.patrocinador : PRECIO_REF.anunciante;
  const pags = Math.max(1, Number(paginasCount) || 1);
  const d = Math.max(15, Number(dias) || 30);
  const base = tipo.base30d + tipo.paginaExtra * (pags - 1);
  const valor = Math.round((base * d) / PRECIO_REF.baseDias);
  return valor;
}

export function etiquetaDuracion(dias) {
  const n = Number(dias);
  if (n === 365) return '12 meses';
  if (n === 180) return '6 meses';
  if (n === 90) return '90 dias';
  if (n === 30) return '30 dias';
  if (n === 15) return '15 dias';
  return `${n} dias`;
}
