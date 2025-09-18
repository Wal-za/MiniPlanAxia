import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import './SuccessModal.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Ícono centrado */}
        <div className="modal-icon-container">
          <CheckCircle className="modal-icon" />
        </div>

        {/* Título */}
        <h2 className="modal-title">¡Formulario Enviado!</h2>

        {/* Cuerpo */}
        <div className="modal-body">
          <p>
            ¡Un asesor de <span className="highlight">Axia</span> se pondrá en contacto contigo!
          </p>
        </div>

        {/* Botón */}
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
