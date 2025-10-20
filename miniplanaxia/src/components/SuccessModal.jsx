import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Spinner */}
        <div className="modal-icon-container">
          <div className="loading-spinner"></div>
        </div>

        {/* Título */}
        <h2 className="modal-title text-xl font-semibold mt-4">¡Estamos trabajando en ello!</h2>

        {/* Cuerpo */}
        <div className="modal-body mt-2">
          <p className="text-gray-700">Por favor, espera un momento.</p>
        </div>

      </div>
    </div>
  );
};

export default SuccessModal;
