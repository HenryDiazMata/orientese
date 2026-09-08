import React, { useState } from 'react';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const REGEX_CARACTERES_INVALIDOS = /[ "'\\]/;

export default function AuxiliaresView() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: 'SP',
    disponibilidadeDeslocamento: 'Sim, regional e viagens',
    usuario: '',
    senha: '',
    confirmarSenha: '',
    funcoes: []
  });

  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFuncaoToggle = (funcao) => {
    setFormData((prev) => {
      const exists = prev.funcoes.includes(funcao);
      return {
        ...prev,
        funcoes: exists
          ? prev.funcoes.filter((f) => f !== funcao)
          : [...prev.funcoes, funcao]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones de contraseña
    if (formData.senha.length < 8) {
      setErroSenha('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (REGEX_CARACTERES_INVALIDOS.test(formData.senha)) {
      setErroSenha('A senha não pode conter espaços, aspas (\' ou ") ou barra invertida (\\).');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErroSenha('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    setErroSenha('');
    setCadastroSucesso(true);
  };

  return (
    <div className="auxiliares-container" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="form-section">
        <h3>📝 Cadastro Rápido de Auxiliar de Campo</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
          Se você não é piloto, preencha este formulário simples para oferecer apoio em operações de Drones.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
            
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                required
                placeholder="Seu nome"
              />
            </div>

            <div className="form-group">
              <label>WhatsApp / Telefone *</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(00) 90000-0000"
              />
            </div>

            <div className="form-group">
              <label>E-Mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="form-group">
              <label>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
                placeholder="Sua cidade"
              />
            </div>

            <div className="form-group">
              <label>Estado (UF) *</label>
              <select name="estado" value={formData.estado} onChange={handleChange}>
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Disponibilidade para Deslocamento?</label>
              <select
                name="disponibilidadeDeslocamento"
                value={formData.disponibilidadeDeslocamento}
                onChange={handleChange}
              >
                <option value="Sim, regional e viagens">Sim, regional e viagens</option>
                <option value="Apenas local / mesma cidade">Apenas local / mesma cidade</option>
                <option value="Apenas no meu estado">Apenas no meu estado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nome de Usuário (Login) *</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
                placeholder="Ex: joao.auxiliar"
              />
            </div>

            {/* CAMPO SENHA */}
            <div className="form-group">
              <label>Senha *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 8 caracteres"
                  style={{ paddingRight: '40px', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    padding: 0
                  }}
                  title={mostrarSenha ? "Ocultar senha" : "Ver senha"}
                >
                  {mostrarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* CAMPO CONFIRMAR SENHA */}
            <div className="form-group">
              <label>Confirmar Senha *</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={mostrarConfirmarSenha ? 'text' : 'password'}
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  placeholder="Repita a mesma senha"
                  style={{ paddingRight: '40px', width: '100%' }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    padding: 0
                  }}
                  title={mostrarConfirmarSenha ? "Ocultar senha" : "Ver senha"}
                >
                  {mostrarConfirmarSenha ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

          </div>

          {/* CUADRO INFORMATIVO DE REGLAS DE SENHA */}
          <div style={{
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '12px',
            marginTop: '15px',
            fontSize: '12px',
            color: 'var(--text-muted)'
          }}>
            <strong>🔒 Requisitos da Senha:</strong>
            <ul style={{ margin: '6px 0 0 18px', padding: 0 }}>
              <li>Mínimo de 8 caracteres.</li>
              <li><strong>NÃO</strong> são permitidos espaços em branco, aspas (' ") ou barra invertida (\).</li>
            </ul>
          </div>

          {erroSenha && (
            <div style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem', marginTop: '10px' }}>
              ⚠️ {erroSenha}
            </div>
          )}

          {/* FUNÇÕES */}
          <div style={{ marginTop: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
              Funções que pode desempenhar em campo:
            </label>
            <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {[
                'Observador Visual (SARPAS/DECEA)',
                'Apoio Logístico & Transporte',
                'Gestão de Baterias & Geradores',
                'Assistente de Pulverização / Calda'
              ].map((funcao) => (
                <label key={funcao} className="checkbox-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={formData.funcoes.includes(funcao)}
                    onChange={() => handleFuncaoToggle(funcao)}
                  />
                  {funcao}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit" style={{ marginTop: '20px', width: '100%' }}>
            Cadastrar como Auxiliar
          </button>
        </form>

        {cadastroSucesso && (
          <div className="success-card" style={{ marginTop: '20px' }}>
            🎉 Cadastro de Auxiliar realizado com sucesso!
          </div>
        )}
      </div>
    </div>
  );
}