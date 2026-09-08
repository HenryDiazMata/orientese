// ==========================================
// constants.js - Motor de cálculo referencial
// ==========================================

export const PRECIOS_BASE = {
  taxaBaseVoo: 90,          // USD
  valorFoto: 0.30,          // USD por foto
  taxaDiagnostico: 36       // USD
};

// Precios por hectárea en USD (basados en mercado Brasil 2026)
export const PRECO_POR_HECTARE = {
  'Pulverização / Agrícola': 11.0,
  'Mapeamento Aéreo / Fotogrametria': 9.0,
  'Levantamento Topográfico / Ortomosaico': 10.0,
  'Monitoramento de Saúde da Lavoura (NDVI)': 7.0,
  'Mapeamento de Áreas de Pastagem': 6.0,
  'Contagem de Gado / Rebanho': 5.5,
  'Contagem de Ovinos / Caprinos': 5.5,
  'Contagem de Frutos / Pomares': 6.5,
  DEFAULT: 8.0
};

// Servicios que requieren campo de hectáreas
export const SERVICOS_COM_HECTARES = [
  'Pulverização / Agrícola',
  'Mapeamento Aéreo / Fotogrametria',
  'Levantamento Topográfico / Ortomosaico',
  'Monitoramento de Saúde da Lavoura (NDVI)',
  'Mapeamento de Áreas de Pastagem',
  'Contagem de Gado / Rebanho',
  'Contagem de Ovinos / Caprinos',
  'Contagem de Frutos / Pomares'
];

export const CATEGORIAS_DRONE = [
  { value: 'pesado', label: 'Porte Pesado (> 25kg) - Agrícola / Pulverização / Carga' },
  { value: 'subpesado', label: 'Porte Subpesado (2kg a 25kg) - Mapeamento / Laser (LiDAR)' },
  { value: 'medio', label: 'Porte Médio (250g a 2kg) - Inspeção / Filmagens Profissionais' },
  { value: 'leve', label: 'Porte Leve (< 250g) - Recreativo / Diversão / Fotos Básicas' }
];

export const ADICIONAIS_VOO = [
  { id: 'noturno', label: 'Trabalho Noturno', precoUSD: 40 },
  { id: 'urgencia', label: 'Urgência', precoUSD: 50 },
  { id: 'pressao', label: 'Trabalho sob Pressão', precoUSD: 30 },
  { id: 'remota', label: 'Área Remota', precoUSD: 36 },
  { id: 'deslocamento', label: 'Deslocamento', precoUSD: 24 },
  { id: 'bateria', label: 'Bateria Extra', precoUSD: 16 },
  { id: 'relatorio', label: 'Relatório Técnico', precoUSD: 60 },
  { id: 'seguro', label: 'Seguro Operacional', precoUSD: 44 },
  { id: 'edicao', label: 'Edição das Imagens', precoUSD: 50 }
];

export const DEFEITOS_MANUTENCAO = [
  { id: 'gimbal', label: 'Conserto/Troca de Gimbal/Câmera', precoUSD: 90 },
  { id: 'bracos', label: 'Troca de Braços / Shell / Carcaça', precoUSD: 60 },
  { id: 'motores', label: 'Substituição de Motores / ESC', precoUSD: 50 },
  { id: 'placa', label: 'Reparo em Placa Mãe / Módulo GPS', precoUSD: 100 },
  { id: 'sensores', label: 'Calibração / Troca de Sensores', precoUSD: 40 },
  { id: 'atualizacao', label: 'Atualização de Firmware & Testes', precoUSD: 30 },
  { id: 'limpeza', label: 'Limpeza Química & Desoxidação', precoUSD: 44 },
  { id: 'controle', label: 'Manutenção no Rádio Controle', precoUSD: 36 },
  { id: 'urgencia_m', label: 'Serviço de Urgência Técnico', precoUSD: 40 }
];

// Factores PPP (USD = 1.00)
export const PPP_FACTORES = {
  BR: 0.55,
  AR: 0.38,
  CL: 0.68,
  CO: 0.45,
  MX: 0.52,
  PE: 0.48,
  UY: 0.72,
  PY: 0.42,
  VE: 0.28,
  DO: 0.48,
  US: 1.00,
  ES: 0.85,
  PT: 0.78,
  FR: 0.90,
  OTRO: 0.55,
  DEFAULT: 0.55
};

export const PAISES = [
  { code: 'BR', nome: 'Brasil', moeda: 'BRL', locale: 'pt-BR' },
  { code: 'AR', nome: 'Argentina', moeda: 'ARS', locale: 'es-AR' },
  { code: 'CL', nome: 'Chile', moeda: 'CLP', locale: 'es-CL' },
  { code: 'CO', nome: 'Colombia', moeda: 'COP', locale: 'es-CO' },
  { code: 'MX', nome: 'México', moeda: 'MXN', locale: 'es-MX' },
  { code: 'PE', nome: 'Perú', moeda: 'PEN', locale: 'es-PE' },
  { code: 'UY', nome: 'Uruguay', moeda: 'UYU', locale: 'es-UY' },
  { code: 'PY', nome: 'Paraguay', moeda: 'PYG', locale: 'es-PY' },
  { code: 'VE', nome: 'Venezuela', moeda: 'VES', locale: 'es-VE' },
  { code: 'DO', nome: 'República Dominicana', moeda: 'DOP', locale: 'es-DO' },
  { code: 'US', nome: 'Estados Unidos', moeda: 'USD', locale: 'en-US' },
  { code: 'ES', nome: 'España', moeda: 'EUR', locale: 'es-ES' },
  { code: 'PT', nome: 'Portugal', moeda: 'EUR', locale: 'pt-PT' },
  { code: 'FR', nome: 'Francia', moeda: 'EUR', locale: 'fr-FR' },
  { code: 'OTRO', nome: 'Otro país', moeda: 'USD', locale: 'en-US' }
];

// Tasas de cambio aproximadas (actualizar periódicamente)
export const TASAS_CAMBIO_APROX = {
  BRL: 5.10,
  ARS: 1050,
  CLP: 950,
  COP: 4200,
  MXN: 19.2,
  PEN: 3.78,
  UYU: 41.5,
  PYG: 7800,
  VES: 42,
  DOP: 60,
  USD: 1,
  EUR: 0.92
};