import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import './SuccessModal.css';

const SuccessModal = ({ onClose,profitclient }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Ícono centrado */}
        <div className="modal-icon-container">
          <CheckCircle className="modal-icon" />
        </div>

        {/* Título */}
        <h2 className="modal-title">¡Estamos creando tu plan financiero !</h2>

        {/* Cuerpo */}
        <div className="modal-body">
        {profitclient&& <p>
            ¡Un asesor de Axia se pondrá en contacto contigo.!
          </p>}

          {!profitclient&& <p>
            ¡Síguenos en nuestras redes sociales.!
          </p>}
          
         
        </div>

        {/* Botón */}
      
      </div>
    </div>
  );
};

export default SuccessModal;
