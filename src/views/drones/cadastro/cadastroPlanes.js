/* =========================================================
   DATOS Y HELPERS SOLO DE CADASTRO.
   PRECIOS USD = COMPARACIÓN EN PANTALLA. NO ES CHECKOUT REAL.
   NO REABRIR PRODUCTO NI CUPOS YA DEFINIDOS.
   ========================================================= */

export const PRECIOS_USD = {
  plus: 120,
  pro: 240,
  elite: 480,
};

export const PLANES = {
  visitante: {
    id: "visitante",
    nome: "Visitante",
    dirigidoA: "Quem quer conhecer o site sem publicar",
    precoUsd: 0,
    tiposPermitidos: ["visitante"],
    beneficios: [
      "Áreas públicas do site: listas de profissionais e empresas, Anunciantes / Patrocinadores, cursos e peças usadas (somente leitura)",
      "Simulador: 2 usos por dia no fuso local",
      "Ver opções de plano",
      "Não publica vaga nem usado",
    ],
    beneficiosExtra: [],
  },
  plus: {
    id: "plus",
    nome: "Plus",
    dirigidoA: "Para quem começa a publicar vagas ou usados",
    precoUsd: PRECIOS_USD.plus,
    tiposPermitidos: ["profissional", "empresa"],
    beneficios: [
      "Publicar no mural conforme o tipo cadastrado (profissional ou empresa)",
      "Até 2 vagas por semana e 3 usados por semana",
      "Simulador: 5 usos por dia no fuso local",
      "Destaque no Elite não incluso; pode ser contratado à parte",
      "Renovação: tarifa do ano anterior, a partir do dia seguinte ao vencimento.",
    ],
    beneficiosExtra: [
      "Plano de 365 dias. Upgrade paga só a diferença. Sem reembolso.",
    ],
  },
  pro: {
    id: "pro",
    nome: "Pro",
    dirigidoA: "Para operação contínua de vagas e usados",
    precoUsd: PRECIOS_USD.pro,
    tiposPermitidos: ["profissional", "empresa"],
    beneficios: [
      "Publicar no mural conforme o tipo cadastrado (profissional ou empresa)",
      "Até 7 vagas por semana e 9 usados por semana",
      "Simulador: 7 usos por dia no fuso local",
      "Destaque no Elite não incluso; pode ser contratado à parte",
      "Renovação: tarifa do ano anterior, a partir do dia seguinte ao vencimento.",
    ],
    beneficiosExtra: [
      "Plano de 365 dias. Upgrade paga só a diferença. Sem reembolso.",
    ],
  },
  elite: {
    id: "elite",
    nome: "Elite",
    dirigidoA: "Para máxima exposição no mural e no destaque",
    precoUsd: PRECIOS_USD.elite,
    tiposPermitidos: ["profissional", "empresa"],
    beneficios: [
      "Publicar no mural conforme o tipo cadastrado (profissional ou empresa)",
      "Até 9 vagas por semana e 15 usados por semana",
      "Simulador: 12 usos por dia no fuso local",
      "Destaque no Elite incluso conforme o pacote deste plano",
      "Renovação: tarifa do ano anterior, a partir do dia seguinte ao vencimento.",
    ],
    beneficiosExtra: [
      "Plano de 365 dias. Upgrade/downgrade sem reembolso em dinheiro.",
    ],
  },
};

/* =========================================================
   OBSERVACIÓN IMPORTANTE AL LADO DEL BLOQUE VISITANTE.
   LA RENOVACIÓN NO VA AQUÍ: VA RESALTADA EN CADA PLAN PAGO.
   ========================================================= */
export const LEYENDAS_PLANOS = [
  "Planos pagos duram 365 dias.",
  "Não há reembolso em dinheiro.",
  "Upgrade: paga só a diferença do período restante.",
  "Downgrade: vale a partir do dia seguinte ao vencimento.",
  "Créditos eventuais ficam na plataforma (dias), nunca em transferência.",
  "A fatura sai na moeda local no câmbio do dia do pagamento.",
];

/* =========================================================
   PREFIJOS POR TIPO. PROFISSIONAL NO NACE COMO P-
   ========================================================= */
export const TIPOS = [
  { id: "visitante", nome: "Visitante", prefixo: "V-" },
  { id: "profissional", nome: "Profissional", prefixo: "PRF-" },
  { id: "empresa", nome: "Empresa", prefixo: "EMP-" },
];

export const PASOS = [
  { n: 1, id: "planos", titulo: "Planos e benefícios" },
  { n: 2, id: "tipos", titulo: "Cadastros" },
  { n: 3, id: "ficha", titulo: "Preencher ficha" },
  { n: 4, id: "pagamento", titulo: "Pagamento" },
];

export const FICHA_VACIA = {
  nome: "",
  email: "",
  emailConfirm: "",
  nascimento: "",
  pais: "",
  fuso: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
  avisosCursos: false,
  querWhatsapp: false,
  querTelegram: false,
  whatsapp: "",
  telegram: "",
  foto34: "",
};

export function generarCodigo(tipoId) {
  const tipo = TIPOS.find((t) => t.id === tipoId) || TIPOS[0];
  const n = String(Math.floor(100000 + Math.random() * 900000));
  return `${tipo.prefixo}${n}`;
}