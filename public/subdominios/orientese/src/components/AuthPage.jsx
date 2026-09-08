import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * AuthPage
 * Ubicación: src/components/AuthPage.jsx
 * Propósito: Formulario especializado para Login y Registro Unificado (SSO) conectado a la API PHP.
 */
export default function AuthPage({ onBack, onLoginSuccess }) {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de control para peticiones HTTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Datos del formulario de usuario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // URL de la API apuntando a producción
  const API_BASE_URL = 'https://orientese.com/api/auth';

  // Actualización de campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  // Procesamiento del formulario y comunicación con el Backend PHP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validaciones básicas en el cliente
    if (formData.password.length < 6) {
      setError(t('auth.errors.shortPassword', 'A senha deve ter pelo menos 6 caracteres.'));
      return;
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError(t('auth.errors.passwordMismatch', 'As senhas não coincidem.'));
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegister ? `${API_BASE_URL}/register.php` : `${API_BASE_URL}/login.php`;
      
      const payload = isRegister 
        ? { nombre: formData.fullName, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data.status === 'error') {
        const errorMsg = data?.message || `Error del servidor (código ${response.status})`;
        throw new Error(errorMsg);
      }

      if (isRegister) {
        // Confirmación explícita del registro
        setSuccessMessage(t('auth.success.registered', '¡Registro exitoso! Ahora puedes iniciar sesión.'));
        setIsRegister(false);
        setFormData({ fullName: '', email: formData.email, password: '', confirmPassword: '' });
      } else {
        // Inicio de sesión exitoso
        setSuccessMessage(t('auth.success.loggedIn', '¡Sesión iniciada con éxito!'));
        
        if (onLoginSuccess && typeof onLoginSuccess === 'function') {
          onLoginSuccess(data.user);
        }
        
        // Redirección garantizada al inicio
        setTimeout(() => {
          if (onBack && typeof onBack === 'function') {
            onBack();
          }
        }, 1200);
      }

    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Botón para regresar al Home principal */}
      <button className="btn-back-home" onClick={onBack} disabled={loading}>
        {t('common.backHome', '← Voltar ao início')}
      </button>

      <div className="auth-wrapper">
        <div className="auth-form-container">
          <h3>
            {isRegister 
              ? t('auth.form.registerTitle', 'Criar Conta Unificada') 
              : t('auth.form.loginTitle', 'Entrar')}
          </h3>
          
          <p className="auth-subtitle-info">
            {isRegister 
              ? t('auth.info.subtitle', 'Accede a herramientas de cálculo, directorios profesionales y contenidos especializados en nuestros subdominios con un solo usuario y contraseña.') 
              : t('auth.form.loginSubtitle', 'Acesse sua conta para continuar em todos os nossos subdomínios.')}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Campo: Nombre Completo (Solo en Registro) */}
            {isRegister && (
              <div className="form-group">
                <label>{t('auth.form.fullNameLabel', 'Nome Completo')}</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={t('auth.form.fullNamePlaceholder', 'Seu Nome')}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            )}

            {/* Campo: Correo Electrónico */}
            <div className="form-group">
              <label>{t('auth.form.emailLabel', 'E-mail')}</label>
              <input
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Campo: Contraseña */}
            <div className="form-group">
              <label>{t('auth.form.passwordLabel', 'Senha')}</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Campo: Confirmar Contraseña (Solo en Registro) */}
            {isRegister && (
              <div className="form-group">
                <label>{t('auth.form.confirmPasswordLabel', 'Confirmar Senha')}</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
            )}

            {!isRegister && (
              <div className="forgot-password-link">
                <a href="#forgot">{t('auth.form.forgotPassword', 'Esqueceu a senha?')}</a>
              </div>
            )}

            {/* Banners informativos */}
            {successMessage && <div className="auth-success-banner" style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>}
            {error && <div className="auth-error-banner" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            {/* Botón de envío */}
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading 
                ? t('common.loading', 'Processando...') 
                : (isRegister 
                    ? t('auth.form.registerButton', 'Cadastrar') 
                    : t('auth.form.loginButton', 'Entrar'))}
            </button>
          </form>

          <div className="auth-switch">
            {isRegister 
              ? t('auth.switch.hasAccount', 'Já tem uma conta?') 
              : t('auth.switch.noAccount', 'Não tem uma conta?')}
            <button
              type="button"
              className="btn-link-inline"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setSuccessMessage('');
              }}
              disabled={loading}
            >
              {isRegister 
                ? t('auth.switch.loginBtn', 'Entrar') 
                : t('auth.switch.registerBtn', 'Cadastrar-se')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}