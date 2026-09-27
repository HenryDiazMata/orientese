// ==========================================
// CATALOGO DE TIPOS DE REGISTRO / CADASTRO
// NO HAY PRECIOS AQUI. LOS PRECIOS VIVEN EN PLANES.
// VISITANTE-BETA NO ES UN TIPO DE ESTE HUB.
// SI EL USUARIO COMPLETA UNO DE ESTOS FORMULARIOS
// DEJA DE SER VISITANTE-BETA Y QUEDA EN EL PLAN ELEGIDO.
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

export const TIPOS_CADASTRO = [
  {
    id: 'hacendado',
    form: 'usuario',
    nomeKey: 'cadastro.tipoHacendado',
    paraKey: 'cadastro.paraHacendado',
    alcanceKey: 'cadastro.alcanceHacendado',
    tiempoKey: 'cadastro.tiempoHacendado',
  },
  {
    id: 'piloto',
    form: 'piloto',
    nomeKey: 'cadastro.tipoPiloto',
    paraKey: 'cadastro.paraPiloto',
    alcanceKey: 'cadastro.alcancePiloto',
    tiempoKey: 'cadastro.tiempoPiloto',
  },
  {
    id: 'auxiliar',
    form: 'auxiliar',
    nomeKey: 'cadastro.tipoAuxiliar',
    paraKey: 'cadastro.paraAuxiliar',
    alcanceKey: 'cadastro.alcanceAuxiliar',
    tiempoKey: 'cadastro.tiempoAuxiliar',
  },
  {
    id: 'manutencao',
    form: 'manutencao',
    nomeKey: 'cadastro.tipoManutencao',
    paraKey: 'cadastro.paraManutencao',
    alcanceKey: 'cadastro.alcanceManutencao',
    tiempoKey: 'cadastro.tiempoManutencao',
  },
  {
    id: 'conserto',
    form: 'conserto',
    nomeKey: 'cadastro.tipoConserto',
    paraKey: 'cadastro.paraConserto',
    alcanceKey: 'cadastro.alcanceConserto',
    tiempoKey: 'cadastro.tiempoConserto',
  },
  {
    id: 'profissional',
    form: 'profissional',
    nomeKey: 'cadastro.tipoProfissional',
    paraKey: 'cadastro.paraProfissional',
    alcanceKey: 'cadastro.alcanceProfissional',
    tiempoKey: 'cadastro.tiempoProfissional',
  },
];

export const TIPOS = TIPOS_CADASTRO;

export function tipoPorId(tipoId) {
  return TIPOS_CADASTRO.find((t) => t.id === tipoId) || null;
}

// ==========================================
// COMPATIBILIDAD CON ARCHIVOS VIEJOS DEL WIZARD
// NO USAR PARA MOSTRAR PRECIOS NI PAGO
// ==========================================
export function planoEsPago() {
  return false;
}

export function planoPorId() {
  return null;
}

export const PLANES = {};
export const PLANOS = [];
export const LEYENDAS_PLANOS = [];