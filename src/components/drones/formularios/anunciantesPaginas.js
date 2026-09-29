// ==========================================
// ARCHIVO COMPLETO:
// src/components/drones/formularios/anunciantesPaginas.js
// PAGINAS Y PRECIOS DE ESPACIOS PUBLICITARIOS
// MAXIMO 6 ESPACIOS POR PAGINA DEL HUB
// CLAVES ESTABLES — NO CAMBIAR SIN MIGRAR DATOS
// BETA: VALOR = REFERENCIA. NO HAY COBRO AQUI
// ==========================================

export const MAX_ESPACIOS_POR_PAGINA = 6;
export const MAX_PATROCINADORES_POR_PAGINA = 2;

// COMPAT: NOMBRE VIEJO USADO EN ARCHIVOS ANTERIORES
export const MAX_HUECOS_POR_PAGINA = MAX_ESPACIOS_POR_PAGINA;

export const PAGINAS_VITRINA = [
  { id: 'inicio', label: 'Início / Bienvenida' },
  { id: 'planes', label: 'Planes' },
  { id: 'activar', label: 'Activar' },
  { id: 'renovar', label: 'Renovar' },
  { id: 'presupuestos', label: 'Presupuestos' },
  { id: 'registro', label: 'Registro' },
  { id: 'pilotos', label: 'Pilotos' },
  { id: 'auxiliares', label: 'Auxiliares' },
  { id: 'consertos', label: 'Consertos / técnicos' },
  { id: 'manutencao', label: 'Manutenção' },
  { id: 'profissionais', label: 'Profissionais' },
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

// PLAZOS DE VIGENCIA (DIAS). SIN 15 — MARCA NO ES CLASIFICADO
export const PASOS_DURACION_DIAS = [30, 90, 180, 365];

// ==========================================
// PRECIOS DE REFERENCIA BETA — LISTA EN USD
// COBRO FUTURO: MONEDA LOCAL AL CAMBIO DEL DIA
// FX REF (28/09/2026, SOLO LEYENDA): 1 USD ≈ 5,22 BRL
// BASE = 30 DIAS + 1 PAGINA
// ANUNCIANTE   USD 28,54  · EXTRA +15,13   (≈ R$ 149 / +79)
// PATROCINADOR USD 47,70  · EXTRA +24,71   (≈ R$ 249 / +129)
// PRORRATEO LINEAL SOBRE 30 DIAS
// ==========================================
export const FX_REF_BRL_POR_USD = 5.22;

export const LEYENDA_PRECIO =
  'Preço de referência em USD. Quando houver cobrança, o valor na moeda local segue o câmbio do dia.';

export const PRECIO_REF = {
  moneda: 'USD',
  baseDias: 30,
  fxRefBRL: FX_REF_BRL_POR_USD,
  anunciante: {
    base30d: 28.54,
    paginaExtra: 15.13,
    base30dBRL: 149,
    paginaExtraBRL: 79,
  },
  patrocinador: {
    base30d: 47.7,
    paginaExtra: 24.71,
    base30dBRL: 249,
    paginaExtraBRL: 129,
  },
};

export function calcularValorReferencia({ modalidade, paginasCount, dias }) {
  const tipo = modalidade === 'patrocinador' ? PRECIO_REF.patrocinador : PRECIO_REF.anunciante;
  const pags = Math.max(1, Number(paginasCount) || 1);
  const d = Math.max(30, Number(dias) || 30);
  const base = tipo.base30d + tipo.paginaExtra * (pags - 1);
  const usd = Math.round(((base * d) / PRECIO_REF.baseDias) * 100) / 100;
  const brl = Math.round(usd * FX_REF_BRL_POR_USD);
  return { usd, brl };
}

export function formatUSD(n) {
  return `USD ${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function etiquetaDuracion(dias) {
  const n = Number(dias);
  if (n === 365) return '12 meses';
  if (n === 180) return '6 meses';
  if (n === 90) return '90 dias';
  if (n === 30) return '30 dias';
  return `${n} dias`;
}

// ORDEN DE LECTURA DE LOS 6 ESPACIOS (NO ES MAPA FIJO DE PANTALLA)
export function etiquetaEspacio(n) {
  return `Espaço publicitário ${n}`;
}
