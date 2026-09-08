// ==========================================
// AuthContext.jsx
// Gerencia autenticação e sessão do usuário
// ==========================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_USERS = 'drones_orientese_users';
const STORAGE_SESSION = 'drones_orientese_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carrega sessão ao iniciar
  useEffect(() => {
    try {
      const session = localStorage.getItem(STORAGE_SESSION);
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (e) {
      console.error('Erro ao carregar sessão:', e);
    }
    setLoading(false);
  }, []);

  // Lista de usuários cadastrados
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

  // Registrar novo usuário (chamado após cadastro de piloto, etc.)
  const registerUser = (dadosCadastro) => {
    const users = getUsers();
    const email = (dadosCadastro.email || '').toLowerCase().trim();

    if (users.some((u) => u.email === email)) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const novoUsuario = {
      ...dadosCadastro,
      email,
      tipo: dadosCadastro.tipo || 'piloto',
      id: Date.now().toString(),
    };

    // Não guardar confirmarSenha
    delete novoUsuario.confirmarSenha;

    users.push(novoUsuario);
    saveUsers(users);
    return { success: true, user: novoUsuario };
  };

  // Login
  const login = (email, senha) => {
    const users = getUsers();
    const emailNorm = (email || '').toLowerCase().trim();
    const found = users.find(
      (u) => u.email === emailNorm && u.senha === senha
    );

    if (!found) {
      return { success: false, message: 'E-mail ou senha incorretos.' };
    }

    // Sessão sem a senha
    const { senha: _, ...userSession } = found;
    setUser(userSession);
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(userSession));
    return { success: true, user: userSession };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION);
  };

  // Atualizar perfil
  const updateUser = (dadosAtualizados) => {
    const users = getUsers();
    const email = user?.email;
    const idx = users.findIndex((u) => u.email === email);

    if (idx === -1) return { success: false, message: 'Usuário não encontrado.' };

    const atualizado = {
      ...users[idx],
      ...dadosAtualizados,
      email: users[idx].email, // e-mail não muda
    };
    delete atualizado.confirmarSenha;

    users[idx] = atualizado;
    saveUsers(users);

    const { senha: _, ...userSession } = atualizado;
    setUser(userSession);
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(userSession));
    return { success: true, user: userSession };
  };

  // Recuperação de senha - solicitar código
  const requestPasswordReset = (email) => {
    const users = getUsers();
    const emailNorm = (email || '').toLowerCase().trim();
    const found = users.find((u) => u.email === emailNorm);

    if (!found) {
      return { success: false, message: 'E-mail não encontrado no sistema.' };
    }

    // Código simulado (em produção seria enviado por e-mail)
    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    const resetData = {
      email: emailNorm,
      codigo,
      expira: Date.now() + 15 * 60 * 1000, // 15 minutos
    };
    localStorage.setItem('drones_orientese_reset', JSON.stringify(resetData));

    // Em desenvolvimento mostramos o código no console e no retorno
    console.log('[DEV] Código de recuperação:', codigo);
    return {
      success: true,
      message: 'Código gerado. (Em produção seria enviado por e-mail)',
      codigoDev: codigo, // só para testes sem backend
    };
  };

  // Redefinir senha com código
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
        isAuthenticated: Boolean(user),
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}