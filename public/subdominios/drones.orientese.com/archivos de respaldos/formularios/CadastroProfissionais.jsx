import { useState } from 'react';
import './CadastroProfissionais.css';

export default function CadastroProfissionais({ onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cidadeEstado: '',
    portfolio: '',
    especialidade: 'Piloto de Drone Comercial',
    outraEspecialidade: '',
    especialidadesSecundarias: '',
    foto: null,
    status: 'disponivel',
    termoVeracidade: false,
    termoMensalidade: false,
    termoResponsabilidade: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do Perfil:', formData);
    alert('Perfil salvo com sucesso!');
    if (onCancel) onCancel();
  };

  const handleExcluir = () => {
    if (window.confirm('Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.')) {
      alert('Perfil excluído da plataforma.');
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="cadastro-pro-card">
      <div className="cadastro-pro-header">
        <h2>CADASTRO</h2>
        <p>Preencha os dados essenciais para exibição no diretório.</p>
      </div>

      <form onSubmit={handleSubmit} className="cadastro-pro-form">
        
        {/* 1. INFORMAÇÕES PRINCIPAIS (8 CAMPOS EN 4 FILAS DE 2) */}
        <div className="form-section">
          <h3>Informações Principais</h3>
          
          {/* FILA 1: 1. Nome Completo | 2. Telefone */}
          <div className="form-row">
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nome"
                placeholder="Ex. Carlos Mendoza"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone de Contato (WhatsApp / Telegram) *</label>
              <input
                type="text"
                name="telefone"
                placeholder="+55 11 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* FILA 2: 3. Cidade/Estado | 4. Link/Portfólio */}
          <div className="form-row">
            <div className="form-group">
              <label>Cidade / Estado *</label>
              <input
                type="text"
                name="cidadeEstado"
                placeholder="Ex. São Paulo, SP"
                value={formData.cidadeEstado}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Link para Portfólio / LinkedIn (Opcional)</label>
              <input
                type="url"
                name="portfolio"
                placeholder="https://instagram.com/seu_perfil"
                value={formData.portfolio}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FILA 3: 5. Especialidade Principal | 6. Outra (Especifique) */}
          <div className="form-row">
            <div className="form-group">
              <label>Especialidade Principal *</label>
              <select
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                required
              >
                <optgroup label="Drones, Aviação e Tecnologia">
                  <option value="Piloto de Drone Comercial">Piloto de Drone Comercial</option>
                  <option value="Piloto de Drone (Estagiário / Aprendiz)">Piloto de Drone (Estagiário / Aprendiz)</option>
                  <option value="Piloto de Aviação Agrícola (Avioneta)">Piloto de Aviação Agrícola (Avioneta)</option>
                  <option value="Técnico em Manutenção de Drones">Técnico em Manutenção de Drones</option>
                  <option value="Fotógrafo / Videomaker Aéreo">Fotógrafo / Videomaker Aéreo</option>
                  <option value="Técnico de Telecomunicações / Conectividade Rural">Técnico de Telecomunicações / Conectividade Rural</option>
                </optgroup>

                <optgroup label="Engenharia, Geociências e Agronomia">
                  <option value="Agrônomo / Engenheiro Agrônomo">Agrônomo / Engenheiro Agrônomo</option>
                  <option value="Engenheiro Agrícola">Engenheiro Agrícola</option>
                  <option value="Engenheiro Florestal">Engenheiro Florestal</option>
                  <option value="Engenheiro Civil / Cartógrafo">Engenheiro Civil / Cartógrafo</option>
                  <option value="Geólogo / Topógrafo / Geógrafo">Geólogo / Topógrafo / Geógrafo</option>
                  <option value="Arquitetura e Paisagismo Rural">Arquitetura e Paisagismo Rural</option>
                  <option value="Técnico Agrícola / Agropecuária">Técnico Agrícola / Agropecuária</option>
                </optgroup>

                <optgroup label="Saúde Animal, Gestão e Consultoria">
                  <option value="Médico Veterinário">Médico Veterinário</option>
                  <option value="Zootecnista / Nutricionista Animal">Zootecnista / Nutricionista Animal</option>
                  <option value="Consultor Ambiental / Biólogo">Consultor Ambiental / Biólogo</option>
                  <option value="Gestor / Administrador de Propriedade Rural">Gestor / Administrador de Propriedade Rural</option>
                  <option value="Advogado / Consultoria Jurídica Agrária">Advogado / Consultoria Jurídica Agrária</option>
                </optgroup>

                <optgroup label="Operações, Logística e Campo">
                  <option value="Operador de Máquinas Agrícolas">Operador de Máquinas Agrícolas</option>
                  <option value="Motorista / Logística e Carga Pesada">Motorista / Logística e Carga Pesada</option>
                  <option value="Segurança / Vigilante Rural">Segurança / Vigilante Rural</option>
                  <option value="Cozinheiro(a) / Alimentação para Equipes">Cozinheiro(a) / Alimentação para Equipes</option>
                  <option value="Trabalhador Rural / Peão / Campeiro">Trabalhador Rural / Peão / Campeiro</option>
                  <option value="Auxiliar Geral de Campo">Auxiliar Geral de Campo</option>
                </optgroup>

                <optgroup label="Outras Especialidades">
                  <option value="Outro">Outro (Especificar no perfil)</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label>Outra (Especifique)</label>
              <input
                type="text"
                name="outraEspecialidade"
                maxLength={60}
                placeholder="Ex. Consultor de Irrigação (Resuma em poucas palavras)"
                title="Resuma a sua atividade em poucas palavras (máx. 60 caracteres)"
                value={formData.outraEspecialidade}
                onChange={handleChange}
                disabled={formData.especialidade !== 'Outro'}
                required={formData.especialidade === 'Outro'}
                className={formData.especialidade !== 'Outro' ? 'input-disabled' : ''}
              />
            </div>
          </div>

          {/* FILA 4: 7. Especialidades Secundárias | 8. Foto de Frente Atualizada */}
          <div className="form-row">
            <div className="form-group">
              <label>Especialidades Secundárias (Opcional)</label>
              <input
                type="text"
                name="especialidadesSecundarias"
                placeholder="Ex. Fotografia Aérea, Edição de Vídeo"
                value={formData.especialidadesSecundarias}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Foto de Frente Atualizada *</label>
              <input
                type="file"
                name="foto"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, foto: e.target.files[0] })}
              />
            </div>
          </div>
        </div>

        {/* 2. STATUS DE DISPONIBILIDADE */}
        <div className="form-section">
          <h3>Status de Disponibilidade</h3>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="disponivel"
                checked={formData.status === 'disponivel'}
                onChange={handleChange}
              />
              <span>🟢 <strong>Disponível:</strong> Pronto para aceitar serviços.</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="ocupado"
                checked={formData.status === 'ocupado'}
                onChange={handleChange}
              />
              <span>🟡 <strong>Em Projeto / Ocupado:</strong> Trabalhando no momento.</span>
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="status"
                value="pausa"
                checked={formData.status === 'pausa'}
                onChange={handleChange}
              />
              <span>🔴 <strong>Em Pausa / Férias:</strong> Ocultar das buscas temporariamente.</span>
            </label>
          </div>
        </div>

        {/* 3. TERMOS E DECLARAÇÕES */}
        <div className="form-section">
          <h3>Termos e Declarações</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termoVeracidade"
                checked={formData.termoVeracidade}
                onChange={handleChange}
                required
              />
              <span>Declaro que as informações e certificações fornecidas são verdadeiras.</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termoMensalidade"
                checked={formData.termoMensalidade}
                onChange={handleChange}
                required
              />
              <span>Entendo que alterar meu status para "Em Pausa" não suspende a cobrança da mensalidade do plano ativo (quando aplicável).</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termoResponsabilidade"
                checked={formData.termoResponsabilidade}
                onChange={handleChange}
                required
              />
              <span>Aceito que <strong>drones.orientese.com</strong> é um espaço informativo. A plataforma não se responsabiliza por contratações ou serviços prestados por terceiros.</span>
            </label>
          </div>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="form-actions">
          <button type="submit" className="btn-salvar">
            Salvar Perfil
          </button>
          {onCancel && (
            <button type="button" className="btn-cancelar" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>

        {/* ZONA DE PERIGO / EXCLUIR */}
        <div className="danger-zone">
          <h4>Excluir Perfil</h4>
          <p>Ao excluir seu perfil, seus dados e visibilidade nas buscas serão removidos permanentemente.</p>
          <button type="button" className="btn-excluir" onClick={handleExcluir}>
            Excluir Perfil da Plataforma
          </button>
        </div>

      </form>
    </div>
  );
}