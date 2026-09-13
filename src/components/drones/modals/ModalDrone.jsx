import { useState } from 'react';
import './ModalDrone.css';

export default function ModalDrone({ isOpen, onClose, dados }) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen || !dados) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div className="modal-drone-overlay">
      <div className={`modal-drone-card ${isClosing ? 'drone-fly-out' : 'drone-fly-in'}`}>
        <button className="btn-close-x" onClick={handleClose}>✕</button>

        <div className="modal-header">
          <span className="badge-especialidade">{dados.especialidade}</span>
          
          <span className="modal-nome-prof">
            {dados.nome || dados.nombre || 'Profissional'}
          </span>

          <p className="modal-sub">📍 {dados.cidade} - {dados.estado} | 📄 {dados.registro}</p>
        </div>

        <div className="modal-details">
          <div><strong>Experiência:</strong> {dados.experiencia}</div>
          <div><strong>Disponibilidade:</strong> {dados.disponibilidade}</div>
          <div><strong>Selo / Qualificação:</strong> {dados.certificacao}</div>
          <div><strong>Garantia Oferecida:</strong> {dados.garantia}</div>
          <div><strong>Formas de Pagamento:</strong> {dados.pagamento}</div>
        </div>

        <div className="modal-actions">
          <a 
            href={`https://wa.me/${dados.whatsapp}?text=Olá%20${encodeURIComponent(dados.nome || '')},%20encontrei%20seu%20perfil%20no%20Drones%20Orientese.`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp"
          >
            💬 WhatsApp
          </a>
          <a href={`mailto:${dados.email}`} className="btn-email">
            ✉️ E-mail
          </a>
        </div>

        <button className="btn-fechar" onClick={handleClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}