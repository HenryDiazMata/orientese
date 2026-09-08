import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);

  // Estados para los campos
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  // Estado para visibilidad de contraseñas (Mostrar/Ocultar)
  const [showPassword, setShowPassword] = useState(false);

  // Estado para errores de validación
  const [errorMessage, setErrorMessage] = useState('');
  const [errorFields, setErrorFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Limpia el error del campo en tiempo real
    if (errorFields.includes(name)) {
      const updatedErrors = errorFields.filter(field => field !== name);
      setErrorFields(updatedErrors);
      if (updatedErrors.length === 0) setErrorMessage('');
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setErrorFields([]);
    setFormData({ nome: '', email: '', senha: '', confirmarSenha: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrorFields([]);

    if (!isLogin) {
      // 1. Validar longitud mínima
      if (formData.senha.length < 8) {
        setErrorMessage(t('contactForm.errors.minLength'));
        setErrorFields(['senha']);
        return;
      }

      // 2. Validar caracteres no válidos
      const invalidCharsRegex = /[ '"\\]/;
      if (invalidCharsRegex.test(formData.senha)) {
        setErrorMessage(t('contactForm.errors.invalidChars'));
        setErrorFields(['senha']);
        return;
      }

      // 3. Validar coincidencia
      if (formData.senha !== formData.confirmarSenha) {
        setErrorMessage(t('contactForm.errors.passwordMismatch'));
        setErrorFields(['senha', 'confirmarSenha']);
        return;
      }
    }

    alert(isLogin ? t('contactForm.alerts.loginSuccess') : t('contactForm.alerts.registerSuccess'));
    setFormData({ nome: '', email: '', senha: '', confirmarSenha: '' });
  };

  return (
    <section id="contato" className="contact-section">
      <h2 className="section-title">
        {isLogin ? t('contactForm.titleLogin') : t('contactForm.titleRegister')}
      </h2>
      <p className="contact-subtitle">
        {isLogin 
          ? t('contactForm.subtitleLogin') 
          : t('contactForm.subtitleRegister')}
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="nome">{t('contactForm.labels.fullName')}</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder={t('contactForm.placeholders.fullName')}
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">{t('contactForm.labels.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo Senha */}
        <div className="form-group">
          <label htmlFor="senha">{t('contactForm.labels.password')}</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="senha"
              name="senha"
              placeholder={t('contactForm.placeholders.password')}
              value={formData.senha}
              onChange={handleChange}
              className={errorFields.includes('senha') ? 'input-error' : ''}
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? t('contactForm.tooltips.hidePassword') : t('contactForm.tooltips.showPassword')}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {!isLogin && (
            <small className="field-help">
              {t('contactForm.helpText')}
            </small>
          )}
        </div>

        {/* Campo Confirmar Senha */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmarSenha">{t('contactForm.labels.confirmPassword')}</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder={t('contactForm.placeholders.confirmPassword')}
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={errorFields.includes('confirmarSenha') ? 'input-error' : ''}
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? t('contactForm.tooltips.hidePassword') : t('contactForm.tooltips.showPassword')}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
        )}

        {/* Mensaje de Error */}
        {errorMessage && (
          <div className="error-message">
            ⚠️ {errorMessage}
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? t('contactForm.buttons.login') : t('contactForm.buttons.register')}
        </button>
      </form>

      <div className="toggle-auth-container">
        <button 
          type="button" 
          className="toggle-auth-btn"
          onClick={handleToggleMode}
        >
          {isLogin 
            ? t('contactForm.toggle.noAccount') 
            : t('contactForm.toggle.hasAccount')}
        </button>
      </div>
    </section>
  );
}