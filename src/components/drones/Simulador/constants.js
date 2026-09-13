// ==========================================
// Listas fijas: categorías, extras, países, estados
// Carpeta: src/components/Simulador/
//
// value / id / code / precios NO se traducen.
// labelKey apunta a src/Locales/*.json
// label queda por si falta la traducción.
// ==========================================

export const CATEGORIAS_DRONE = [
  { value: 'pesado', labelKey: 'sim.cat.pesado', label: 'Porte Pesado (> 25kg) - Agrícola / Pulverização / Carga' },
  { value: 'subpesado', labelKey: 'sim.cat.subpesado', label: 'Porte Subpesado (2kg a 25kg) - Mapeamento / Laser (LiDAR)' },
  { value: 'medio', labelKey: 'sim.cat.medio', label: 'Porte Médio (250g a 2kg) - Inspeção / Filmagens Profissionais' },
  { value: 'leve', labelKey: 'sim.cat.leve', label: 'Porte Leve (< 250g) - Recreativo / Diversão / Fotos Básicas' }
];

export const ADICIONAIS_VOO = [
  { id: 'noturno', labelKey: 'sim.extra.noturno', label: 'Trabalho Noturno', precoUSD: 40 },
  { id: 'urgencia', labelKey: 'sim.extra.urgencia', label: 'Urgência', precoUSD: 50 },
  { id: 'pressao', labelKey: 'sim.extra.pressao', label: 'Trabalho sob Pressão', precoUSD: 30 },
  { id: 'remota', labelKey: 'sim.extra.remota', label: 'Área Remota', precoUSD: 36 },
  { id: 'deslocamento', labelKey: 'sim.extra.deslocamento', label: 'Deslocamento', precoUSD: 24 },
  { id: 'bateria', labelKey: 'sim.extra.bateria', label: 'Bateria Extra', precoUSD: 16 },
  { id: 'relatorio', labelKey: 'sim.extra.relatorio', label: 'Relatório Técnico', precoUSD: 60 },
  { id: 'seguro', labelKey: 'sim.extra.seguro', label: 'Seguro Operacional', precoUSD: 44 },
  { id: 'edicao', labelKey: 'sim.extra.edicao', label: 'Edição das Imagens', precoUSD: 50 }
];

export const ADICIONAIS_MANUTENCAO = [
  { id: 'noturno', labelKey: 'sim.extra.noturno', label: 'Trabalho Noturno', precoUSD: 40 },
  { id: 'urgencia', labelKey: 'sim.extra.urgencia', label: 'Urgência', precoUSD: 50 },
  { id: 'pressao', labelKey: 'sim.extra.pressao', label: 'Trabalho sob Pressão', precoUSD: 30 }
];

export const DEFEITOS_MANUTENCAO = [
  { id: 'gimbal', labelKey: 'sim.def.gimbal', label: 'Gimbal / câmera (troca completa)', minBRL: 1200, maxBRL: 3500, precoUSD: 686 },
  { id: 'bracos', labelKey: 'sim.def.bracos', label: 'Peças simples (hélices, pés, carcaça)', minBRL: 200, maxBRL: 500, precoUSD: 98 },
  { id: 'motores', labelKey: 'sim.def.motores', label: 'Braço com motor / ESC', minBRL: 400, maxBRL: 1100, precoUSD: 216 },
  { id: 'placa', labelKey: 'sim.def.placa', label: 'Placa principal', minBRL: 800, maxBRL: 2500, precoUSD: 490 },
  { id: 'sensores', labelKey: 'sim.def.sensores', label: 'Cabo flat do gimbal', minBRL: 350, maxBRL: 800, precoUSD: 157 },
  { id: 'atualizacao', labelKey: 'sim.def.atualizacao', label: 'Firmware e testes', minBRL: 80, maxBRL: 180, precoUSD: 35 },
  { id: 'limpeza', labelKey: 'sim.def.limpeza', label: 'Limpeza, calibração e revisão', minBRL: 450, maxBRL: 600, precoUSD: 118 },
  { id: 'controle', labelKey: 'sim.def.controle', label: 'Rádio controle', minBRL: 200, maxBRL: 450, precoUSD: 88 },
  { id: 'homologacao', labelKey: 'sim.def.homologacao', label: 'Homologação ANAC / DECEA / ANATEL', minBRL: 150, maxBRL: 150, precoUSD: 29 }
];

export const PPP_FACTORES = {
  BR: 0.55, AR: 0.38, CL: 0.68, CO: 0.45, MX: 0.52, PE: 0.48,
  UY: 0.72, PY: 0.42, VE: 0.28, DO: 0.48, US: 1.00, ES: 0.85,
  PT: 0.78, FR: 0.90, OTRO: 0.55, DEFAULT: 0.55
};

export const PAISES = [
  { code: 'BR', nomeKey: 'sim.pais.BR', nome: 'Brasil', moeda: 'BRL', locale: 'pt-BR' },
  { code: 'AR', nomeKey: 'sim.pais.AR', nome: 'Argentina', moeda: 'ARS', locale: 'es-AR' },
  { code: 'CL', nomeKey: 'sim.pais.CL', nome: 'Chile', moeda: 'CLP', locale: 'es-CL' },
  { code: 'CO', nomeKey: 'sim.pais.CO', nome: 'Colombia', moeda: 'COP', locale: 'es-CO' },
  { code: 'MX', nomeKey: 'sim.pais.MX', nome: 'México', moeda: 'MXN', locale: 'es-MX' },
  { code: 'PE', nomeKey: 'sim.pais.PE', nome: 'Perú', moeda: 'PEN', locale: 'es-PE' },
  { code: 'UY', nomeKey: 'sim.pais.UY', nome: 'Uruguay', moeda: 'UYU', locale: 'es-UY' },
  { code: 'PY', nomeKey: 'sim.pais.PY', nome: 'Paraguay', moeda: 'PYG', locale: 'es-PY' },
  { code: 'VE', nomeKey: 'sim.pais.VE', nome: 'Venezuela', moeda: 'VES', locale: 'es-VE' },
  { code: 'DO', nomeKey: 'sim.pais.DO', nome: 'República Dominicana', moeda: 'DOP', locale: 'es-DO' },
  { code: 'US', nomeKey: 'sim.pais.US', nome: 'Estados Unidos', moeda: 'USD', locale: 'en-US' },
  { code: 'ES', nomeKey: 'sim.pais.ES', nome: 'España', moeda: 'EUR', locale: 'es-ES' },
  { code: 'PT', nomeKey: 'sim.pais.PT', nome: 'Portugal', moeda: 'EUR', locale: 'pt-PT' },
  { code: 'FR', nomeKey: 'sim.pais.FR', nome: 'Francia', moeda: 'EUR', locale: 'fr-FR' },
  { code: 'OTRO', nomeKey: 'sim.pais.OTRO', nome: 'Otro país', moeda: 'USD', locale: 'en-US' }
];

// Nombres oficiales; no hace falta traducirlos
export const ESTADOS_BRASIL = [
  { code: 'SP', nome: 'São Paulo' }, { code: 'RJ', nome: 'Rio de Janeiro' },
  { code: 'MG', nome: 'Minas Gerais' }, { code: 'RS', nome: 'Rio Grande do Sul' },
  { code: 'PR', nome: 'Paraná' }, { code: 'SC', nome: 'Santa Catarina' },
  { code: 'BA', nome: 'Bahia' }, { code: 'GO', nome: 'Goiás' },
  { code: 'PE', nome: 'Pernambuco' }, { code: 'CE', nome: 'Ceará' },
  { code: 'DF', nome: 'Distrito Federal' }, { code: 'ES', nome: 'Espírito Santo' },
  { code: 'MT', nome: 'Mato Grosso' }, { code: 'MS', nome: 'Mato Grosso do Sul' },
  { code: 'PA', nome: 'Pará' }, { code: 'AM', nome: 'Amazonas' },
  { code: 'MA', nome: 'Maranhão' }, { code: 'PB', nome: 'Paraíba' },
  { code: 'RN', nome: 'Rio Grande do Norte' }, { code: 'AL', nome: 'Alagoas' },
  { code: 'PI', nome: 'Piauí' }, { code: 'SE', nome: 'Sergipe' },
  { code: 'TO', nome: 'Tocantins' }, { code: 'RO', nome: 'Rondônia' },
  { code: 'AC', nome: 'Acre' }, { code: 'AP', nome: 'Amapá' },
  { code: 'RR', nome: 'Roraima' }
];

export const TASAS_CAMBIO_APROX = {
  BRL: 5.10, ARS: 1050, CLP: 950, COP: 4200, MXN: 19.2, PEN: 3.78,
  UYU: 41.5, PYG: 7800, VES: 42, DOP: 60, USD: 1, EUR: 0.92
};