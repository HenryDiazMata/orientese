import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// COMPONENTE MODULAR DE AUTENTICACIÓN (LOGIN Y REGISTRO)
function AuthPage({ onBackHome, onLoginSuccess }) {
  const { t } = useTranslation('orientese');
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);

  // ESTADOS DEL FORMULARIO
  const [formData, setFormData] = useState({ fullName: '', nombre: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // MANEJO DE CAMBIOS EN LOS INPUTS
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (e.target.name === 'fullName' || e.target.name === 'nombre') {
      setFormData({ ...formData, fullName: value, nombre: value });
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
    setErrorMessage('');
  };

  // LIMPIAR CAMPOS DEL FORMULARIO
  const resetForm = () => {
    setFormData({ fullName: '', nombre: '', email: '', password: '' });
    setErrorMessage('');
    setShowPassword(false);
  };

  // MANEJO DEL ENVÍO AL BACKEND (PHP)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (authMode === 'register' && (!formData.nombre || !formData.email || !formData.password)) {
      setErrorMessage(t('auth.errors.requiredFields', 'Todos los campos son obligatorios.'));
      setLoading(false);
      return;
    }

    if (authMode === 'login' && (!formData.email || !formData.password)) {
      setErrorMessage(t('auth.errors.requiredFields', 'Por favor, completa todos los campos.'));
      setLoading(false);
      return;
    }

    try {
      const endpoint = authMode === 'login' 
        ? 'https://orientese.com/api/auth/login.php' 
        : 'https://orientese.com/api/auth/register.php';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(authMode === 'login' ? '¡Sesión iniciada con éxito!' : '¡Usuario registrado correctamente!');
        if (onLoginSuccess) onLoginSuccess(result.user);
        resetForm();
      } else {
        setErrorMessage(result.message || t('auth.errors.invalidCredentials', 'Credenciales incorrectas.'));
      }
    } catch (error) {
      setErrorMessage(t('auth.errors.serverError', 'Error al conectar con el servidor. Intenta de nuevo.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <button className="btn-back-home" onClick={onBackHome}>
        {t('common.backHome', '← Volver al inicio')}
      </button>

      <div className="auth-wrapper">
        <div className="auth-info">
          <h2>{t('auth.info.title', 'Únete a la plataforma Orientese')}</h2>
          <p>{t('auth.info.subtitle', 'Crea tu cuenta para acceder a todos nuestros servicios.')}</p>
          <ul className="auth-features-list">
            <li>✔ <span>{t('auth.info.ofertas', 'Acceso a promociones y cupones exclusivos.')}</span></li>
            <li>✔ <span>{t('auth.info.drones', 'Gestión de servicios aéreos e inspección.')}</span></li>
            <li>✔ <span>{t('auth.info.panelDesc', 'Administra tus proyectos desde un solo lugar.')}</span></li>
          </ul>
        </div>

        <div className="auth-form-container">
          <h3>{authMode === 'login' ? t('auth.form.loginTitle', 'Iniciar Sesión') : t('auth.form.registerTitle', 'Crear Cuenta')}</h3>
          <p>{t('auth.form.registerSubtitle', 'Ingresa tus datos a continuación')}</p>

          {errorMessage && (
            <div className="auth-error-banner">
              {errorMessage}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            {authMode === 'register' && (
              <div className="form-group">
                <label>{t('auth.form.fullNameLabel', 'Nombre completo')}</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder={t('auth.form.fullNamePlaceholder', 'Tu nombre')} 
                />
              </div>
            )}

            <div className="form-group">
              <label>{t('auth.form.emailLabel', 'Correo electrónico')}</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="correo@ejemplo.com" 
              />
            </div>

            <div className="form-group">
              <label>{t('auth.form.passwordLabel', 'Contraseña')}</label>
              <div className="password-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••" 
                  style={{ width: '100%', paddingRight: '40px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading 
                ? 'Procesando...' 
                : authMode === 'login' 
                  ? t('auth.form.loginButton', 'Iniciar sesión') 
                  : t('auth.form.registerButton', 'Registrarse')}
            </button>
          </form>

          <div className="auth-switch">
            <span>
              {authMode === 'login' ? t('auth.switch.noAccount', '¿Aún no tienes una cuenta?') : t('auth.switch.hasAccount', '¿Ya tienes una cuenta?')}
            </span>
            <button 
              className="btn-link-inline" 
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                resetForm();
              }}
            >
              {authMode === 'login' ? t('auth.form.registerButton', 'Registrarse') : t('auth.form.loginButton', 'Iniciar sesión')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;