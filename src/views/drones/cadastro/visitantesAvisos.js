// ==========================================
// LISTA MOCK SÓ DE VISITANTES / AVISOS DE CURSOS
// SIN BD. DESTINO FUTURO: AVISOS. NO ES CUENTA
// ==========================================

const CHAVE = 'orientese_drones_avisos_visitantes';

function lerLista() {
  try {
    const bruto = sessionStorage.getItem(CHAVE);
    return bruto ? JSON.parse(bruto) : [];
  } catch {
    return [];
  }
}

function gravarLista(lista) {
  sessionStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function listarAvisosVisitantes() {
  return lerLista();
}

// REGISTRA NOME + EMAIL + TELEFONE
// EMAIL REPETIDO: NO DUPLICA; DEVUELVE MENSAJE
export function registrarAvisoVisitante({ nome, email, telefone }) {
  const lista = lerLista();
  const emailNorm = String(email || '').trim().toLowerCase();

  const jaTem = lista.find((item) => item.email === emailNorm);
  if (jaTem) {
    return {
      ok: false,
      mensagem: 'Este e-mail já está na lista de avisos de cursos.',
    };
  }

  const registro = {
    nome: String(nome || '').trim(),
    email: emailNorm,
    telefone: String(telefone || '').trim(),
    criadoEm: new Date().toISOString(),
  };

  lista.push(registro);
  gravarLista(lista);

  return { ok: true, registro };
}