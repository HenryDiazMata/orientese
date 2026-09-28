// ==========================================
// ARCHIVO: src/context/drones/AuthContext.jsx
// AUTH DRONES + PUENTE SSO DEL PORTAL ORIENTESE
// NO VENDE. NO INTERMEDIA. SIN PRECIOS
// UNA CUENTA, UN PANEL, UNA CLAVE, VARIOS ROLES
// CLAVE SOLO SI AUN NO EXISTE
// NO PISA NOMBRE / EMAIL / PAIS YA ESCRITOS
// NO TOCA EL WIZARD DE PROFISSIONAIS
// SI EL PORTAL CIERRA: DRONES A MI PERFIL
// UN SOLO USEEFFECT DE SESION
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// ==========================================
// CLAVES REALES DE LOCALSTORAGE (NO INVENTADAS)
// ==========================================
const STORAGE_USERS = 'drones_orientese_users';
const STORAGE_SESSION = 'drones_orientese_session';
const STORAGE_SSO = 'orientese.sso';
const STORAGE_ORIENTESE_USER = 'orientese_user';
const EVENTO_SSO = 'orientese-sso-cambio';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LISTA LOCAL DE CUENTAS DEL SUBDOMINIO DRONES
  // ==========================================
  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS) || '[]');
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  };

  // ==========================================
  // LEE JSON SIN TIRAR LA APP SI ESTA ROTO
  // ==========================================
  const leerJson = (clave) => {
    try {
      const bruto = localStorage.getItem(clave);
      if (!bruto) return null;
      return JSON.parse(bruto);
    } catch {
      return null;
    }
  };

  // ==========================================
  // PAIS DEL PORTAL: paisConta (EJ. BR)
  // ==========================================
  const normalizarPais = (bruto) => {
    const codigo = String(bruto || '').trim().toUpperCase();
    return codigo || '';
  };

  // ==========================================
  // BUSCA CUENTA DRONES POR EMAIL
  // ==========================================
  const usuarioLocalPorEmail = (email) => {
    const emailNorm = (email || '').toLowerCase().trim();
    if (!emailNorm) return null;
    return getUsers().find((u) => (u.email || '').toLowerCase().trim() === emailNorm) || null;
  };

  // ==========================================
  // CLAVE DRONES: SOLO SI YA EXISTE EN EL REGISTRO
  // ==========================================
  const tieneClaveDrones = (registro) => {
    if (!registro) return false;
    return Boolean(
      registro.hasDronesPassword ||
      registro.senhaDrones ||
      registro.senha
    );
  };

  // ==========================================
  // SESION PORTAL = orientese.sso / orientese_user
  // drones.user NO ES SESION (ES FICHA)
  // ==========================================
  const haySesionPortal = () => {
    return Boolean(
      localStorage.getItem(STORAGE_SSO) ||
      localStorage.getItem(STORAGE_ORIENTESE_USER)
    );
  };

  const leerIngresoOrientese = () => {
    if (!haySesionPortal()) return null;

    const sso = leerJson(STORAGE_SSO) || {};
    const portalUser = leerJson(STORAGE_ORIENTESE_USER) || {};

    const nome =
      sso.nome ||
      portalUser.nome ||
      portalUser.nombre ||
      portalUser.nomeCompleto ||
      portalUser.fullName ||
      portalUser.name ||
      '';

    const email = (sso.email || portalUser.email || '').toLowerCase().trim();

    const pais = normalizarPais(
      sso.paisConta ||
      portalUser.paisConta ||
      portalUser.pais
    );

    if (!nome && !email && !pais) return null;
    return { nome, email, pais };
  };

  // ==========================================
  // ARMA user PARA FICHAS SSO (READONLY)
  // PRIORIDAD: LO YA ESCRITO EN SESION / USERS
  // DESPUES: ORIENTESE.SSO
  // ==========================================
  const hidratarUserDesdeOrientese = (sesionActual) => {
    const ingreso = leerIngresoOrientese();
    if (!ingreso && !sesionActual) return null;

    const emailBase = (sesionActual && sesionActual.email) || (ingreso && ingreso.email) || '';
    const local = usuarioLocalPorEmail(emailBase);

    const nombreSesion =
      (sesionActual && (sesionActual.nomeCompleto || sesionActual.nome || sesionActual.name)) || '';
    const paisSesion =
      (sesionActual && (sesionActual.pais || sesionActual.country || sesionActual.paisCodigo || sesionActual.paisConta)) || '';

    const nomeFinal =
      nombreSesion ||
      (local && (local.nomeCompleto || local.nome)) ||
      (ingreso && ingreso.nome) ||
      '';

    const emailFinal = emailBase || (local && local.email) || '';

    const paisFinal =
      normalizarPais(paisSesion) ||
      normalizarPais(local && (local.pais || local.paisConta)) ||
      (ingreso && ingreso.pais) ||
      '';

    const yaClave = tieneClaveDrones(local) || tieneClaveDrones(sesionActual);

    const hidratado = {
      ...(local || {}),
      ...(sesionActual || {}),
      nome: nomeFinal,
      nomeCompleto: (sesionActual && sesionActual.nomeCompleto) || (local && local.nomeCompleto) || nomeFinal,
      name: (sesionActual && sesionActual.name) || nomeFinal,
      email: emailFinal,
      pais: paisFinal,
      paisConta: paisFinal,
      country: (sesionActual && sesionActual.country) || paisFinal,
      paisCodigo: (sesionActual && sesionActual.paisCodigo) || paisFinal,
      hasDronesPassword: yaClave,
      origemSso: true,
    };

    // ==========================================
    // NUNCA DEJAR CLAVE EN LA SESION DEL CONTEXTO
    // ==========================================
    delete hidratado.senha;
    delete hidratado.confirmarSenha;
    delete hidratado.senhaDrones;

    return hidratado;
  };

  // ==========================================
  // PERSISTE SESION DRONES PARA LAS FICHAS
  // ==========================================
  const persistirSesion = (userSession) => {
    if (!userSession) {
      localStorage.removeItem(STORAGE_SESSION);
      return;
    }
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(userSession));
  };

  // ==========================================
  // SIN PORTAL: LIMPIA SOLO SESION DRONES
  // CON PORTAL: HIDRATA NOMBRE / EMAIL / PAIS
  // ==========================================
  const sincronizarConPortal = () => {
    try {
      if (!haySesionPortal()) {
        setUser(null);
        persistirSesion(null);
        setLoading(false);
        return;
      }

      const sesion = leerJson(STORAGE_SESSION);
      const hidratado = hidratarUserDesdeOrientese(sesion);
      if (hidratado && (hidratado.email || hidratado.nome)) {
        setUser(hidratado);
        persistirSesion(hidratado);
      } else if (sesion) {
        setUser(sesion);
      }
    } catch (e) {
      console.error('Erro ao carregar sessão:', e);
    }
    setLoading(false);
  };

  // ==========================================
  // UN SOLO EFECTO: MONTA + ESCUCHA CIERRE/APERTURA
  // ==========================================
  useEffect(() => {
    sincronizarConPortal();

    const onStorage = (ev) => {
      if (
        ev.key === STORAGE_SSO ||
        ev.key === STORAGE_ORIENTESE_USER ||
        ev.key === null
      ) {
        sincronizarConPortal();
      }
    };

    const onAvisoPortal = () => {
      sincronizarConPortal();
    };

    const onFoco = () => {
      sincronizarConPortal();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(EVENTO_SSO, onAvisoPortal);
    window.addEventListener('focus', onFoco);
    document.addEventListener('visibilitychange', onFoco);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(EVENTO_SSO, onAvisoPortal);
      window.removeEventListener('focus', onFoco);
      document.removeEventListener('visibilitychange', onFoco);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==========================================
  // ALTA / OTRO ROL. SI EL EMAIL SSO YA ESTA: ACTUALIZA
  // NO BLOQUEA EL INGRESO DEL PORTAL
  // ==========================================
  const registerUser = (dadosCadastro) => {
    const users = getUsers();
    const email = (dadosCadastro.email || '').toLowerCase().trim();
    const idx = users.findIndex((u) => u.email === email);
    const yaClave = idx !== -1 && tieneClaveDrones(users[idx]);

    const novoUsuario = {
      ...(idx !== -1 ? users[idx] : {}),
      ...dadosCadastro,
      email,
      tipo: dadosCadastro.tipo || (idx !== -1 ? users[idx].tipo : 'piloto'),
      id: (idx !== -1 && users[idx].id) || Date.now().toString(),
      hasDronesPassword: yaClave || Boolean(dadosCadastro.senha) || Boolean(dadosCadastro.hasDronesPassword),
    };

    delete novoUsuario.confirmarSenha;

    if (idx === -1) {
      users.push(novoUsuario);
    } else {
      users[idx] = novoUsuario;
    }
    saveUsers(users);

    const { senha: _s, senhaDrones: _sd, ...userSession } = novoUsuario;
    const hidratado = hidratarUserDesdeOrientese(userSession);
    setUser(hidratado);
    persistirSesion(hidratado);
    return { success: true, user: hidratado };
  };

  // ==========================================
  // LOGIN CON CLAVE DEL SUBDOMINIO (NO ES ALTA PORTAL)
  // SIN SESION PORTAL NO DEJA SESION DRONES ABIERTA
  // ==========================================
  const login = (email, senha) => {
    if (!haySesionPortal()) {
      setUser(null);
      persistirSesion(null);
      return { success: false, message: 'Inicie sessão no portal Orientese.' };
    }

    const users = getUsers();
    const emailNorm = (email || '').toLowerCase().trim();
    const found = users.find(
      (u) => u.email === emailNorm && u.senha === senha
    );

    if (!found) {
      return { success: false, message: 'E-mail ou senha incorretos.' };
    }

    const { senha: _, ...userSession } = found;
    const hidratado = hidratarUserDesdeOrientese(userSession);
    setUser(hidratado);
    persistirSesion(hidratado);
    return { success: true, user: hidratado };
  };

  // ==========================================
  // SALE SOLO DE DRONES. NO BORRA ORIENTESE.SSO
  // ==========================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
  };

  // ==========================================
  // ACTUALIZA FICHA. EMAIL NO CAMBIA
  // NO PISA NOMBRE / PAIS SI YA HABIA VALOR
  // ==========================================
  const updateUser = (dadosAtualizados) => {
    const users = getUsers();
    const email = (user && user.email) || (dadosAtualizados && dadosAtualizados.email);
    const emailNorm = (email || '').toLowerCase().trim();
    let idx = users.findIndex((u) => u.email === emailNorm);

    if (idx === -1 && emailNorm) {
      users.push({
        email: emailNorm,
        id: Date.now().toString(),
        tipo: dadosAtualizados.tipo || 'usuario',
      });
      idx = users.length - 1;
    }

    if (idx === -1) return { success: false, message: 'Usuário não encontrado.' };

    const actualNombre = users[idx].nomeCompleto || users[idx].nome || '';
    const actualPais = users[idx].pais || users[idx].paisConta || '';

    const atualizado = {
      ...users[idx],
      ...dadosAtualizados,
      email: users[idx].email || emailNorm,
      nomeCompleto: dadosAtualizados.nomeCompleto || actualNombre,
      nome: dadosAtualizados.nome || users[idx].nome || actualNombre,
      pais: dadosAtualizados.pais || actualPais,
      paisConta: dadosAtualizados.paisConta || dadosAtualizados.pais || actualPais,
      hasDronesPassword: tieneClaveDrones(users[idx]) || Boolean(dadosAtualizados.hasDronesPassword),
    };
    delete atualizado.confirmarSenha;

    users[idx] = atualizado;
    saveUsers(users);

    const { senha: _, senhaDrones: _sd, ...userSession } = atualizado;
    const hidratado = hidratarUserDesdeOrientese(userSession);
    setUser(hidratado);
    persistirSesion(hidratado);
    return { success: true, user: hidratado };
  };

  // ==========================================
  // RECUPERACION SIMULADA (SIN BACKEND)
  // ==========================================
  const requestPasswordReset = (email) => {
    const users = getUsers();
    const emailNorm = (email || '').toLowerCase().trim();
    const found = users.find((u) => u.email === emailNorm);

    if (!found) {
      return { success: false, message: 'E-mail não encontrado no sistema.' };
    }

    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    const resetData = {
      email: emailNorm,
      codigo,
      expira: Date.now() + 15 * 60 * 1000,
    };
    localStorage.setItem('drones_orientese_reset', JSON.stringify(resetData));
    console.log('[DEV] Código de recuperação:', codigo);
    return {
      success: true,
      message: 'Código gerado. (Em produção seria enviado por e-mail)',
      codigoDev: codigo,
    };
  };

  const resetPassword = (email, codigo, novaSenha) => {
    try {
      const resetData = JSON.parse(localStorage.getItem('drones_orientese_reset') || '{}');
      const emailNorm = (email || '').toLowerCase().trim();

      if (
        resetData.email !== emailNorm ||
        resetData.codigo !== codigo ||
        Date.now() > resetData.expira
      ) {
        return { success: false, message: 'Código inválido ou expirado.' };
      }

      if (novaSenha.length < 8) {
        return { success: false, message: 'A nova senha deve ter no mínimo 8 caracteres.' };
      }

      const users = getUsers();
      const idx = users.findIndex((u) => u.email === emailNorm);
      if (idx === -1) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      users[idx].senha = novaSenha;
      users[idx].hasDronesPassword = true;
      saveUsers(users);
      localStorage.removeItem('drones_orientese_reset');
      return { success: true, message: 'Senha redefinida com sucesso! Faça login.' };
    } catch {
      return { success: false, message: 'Erro ao redefinir senha.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user && (user.email || user.nome)),
        login,
        logout,
        registerUser,
        updateUser,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// HOOK QUE USAN HEADER Y FICHAS DRONES
// SIN ESTE EXPORT HEADER ROMPE
// ==========================================
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}