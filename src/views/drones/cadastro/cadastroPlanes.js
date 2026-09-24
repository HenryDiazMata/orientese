export const LEYENDAS_PLANOS = [
  "A fatura dos planos pagos sai na moeda local, no câmbio do dia do pagamento.",
  "A renovação dos planos pagos começa no dia seguinte ao vencimento e usa a tarifa do ano anterior.",
  "Visitante não cria senha, não tem perfil e não renova. Só marca avisos de cursos.",
];

export const LEYENDA_MONEDA_LOCAL = LEYENDAS_PLANOS[0];
export const TEXTO_RENOVACION = LEYENDAS_PLANOS[1];

const VISITANTE = {
  id: "visitante",
  nome: "Visitante",
  dirigidoA: "Quem só quer avisos de cursos e consultar o conteúdo público.",
  precoUsd: 0,
  pago: false,
  beneficios: [
    "Conteúdo público: profissionais, empresas, anunciantes, cursos e usados",
    "Avisos de cursos (sem senha, sem perfil, sem renovação)",
    "Simulador 2×/dia no fuso",
    "Não publica",
  ],
};

const PLUS = {
  id: "plus",
  nome: "Plus",
  dirigidoA: "Profissional ou empresa em início de presença.",
  precoUsd: 120,
  pago: true,
  beneficios: [
    "Ficha no diretório",
    "Publicação conforme o plano",
    "Renovação no dia seguinte ao vencimento, tarifa do ano anterior",
  ],
  beneficiosExtra: [],
};

const PRO = {
  id: "pro",
  nome: "Pro",
  dirigidoA: "Quem precisa de mais presença no diretório.",
  precoUsd: 240,
  pago: true,
  beneficios: [
    "Ficha no diretório",
    "Publicação conforme o plano",
    "Renovação no dia seguinte ao vencimento, tarifa do ano anterior",
  ],
  beneficiosExtra: [],
};

const ELITE = {
  id: "elite",
  nome: "Elite",
  dirigidoA: "Máxima presença no subdomínio.",
  precoUsd: 480,
  pago: true,
  beneficios: [
    "Ficha no diretório",
    "Publicação conforme o plano",
    "Renovação no dia seguinte ao vencimento, tarifa do ano anterior",
  ],
  beneficiosExtra: [],
};

export const PLANES = {
  visitante: VISITANTE,
  plus: PLUS,
  pro: PRO,
  elite: ELITE,
};

export const PLANOS = [VISITANTE, PLUS, PRO, ELITE];

export const TIPOS_CADASTRO = [
  {
    id: "visitante",
    nome: "Visitante",
    dirigidoA: "Quem só quer consultar o conteúdo público e receber avisos de cursos.",
    paraQuem: "Quem só quer consultar o conteúdo público e receber avisos de cursos.",
    alcance:
      "Avisos de cursos. Sem senha, sem perfil, sem renovar. Não publica.",
  },
  {
    id: "profissional",
    nome: "Profissional",
    dirigidoA: "Pilotos, auxiliares, técnicos e afins.",
    paraQuem: "Pilotos, auxiliares, técnicos e afins.",
    alcance: "Ficha profissional (foto 3×4). Publica e aparece no diretório.",
  },
  {
    id: "empresa",
    nome: "Empresa",
    dirigidoA: "Empresas e anunciantes do setor.",
    paraQuem: "Empresas e anunciantes do setor.",
    alcance: "Ficha da empresa. Publica e aparece no diretório.",
  },
];

export const TIPOS = TIPOS_CADASTRO;

export function planoPorId(planoId) {
  return PLANES[planoId] || PLANOS.find((p) => p.id === planoId) || null;
}

export function planoEsPago(planoId) {
  const plano = planoPorId(planoId);
  return !!(plano && plano.pago);
}