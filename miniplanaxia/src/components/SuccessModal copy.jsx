import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';
import './SuccessModal.css';

const SuccessModal = ({ onClose, profitclient, datos, pdf }) => {
  const [pdfFile, setPdfFile] = useState(pdf);
  const [objectData, setObjectData] = useState(datos);

  const handleSendData = async () => {
    const formData = new FormData();

    try {
      let fileToSend = pdfFile;

      if (typeof pdfFile === 'string' && pdfFile.startsWith('blob:')) {
        const response = await fetch(pdfFile);
        const blob = await response.blob();
        fileToSend = new File([blob], 'plan_financiero.pdf', {
          type: 'application/pdf',
        });
      }

      if (!(fileToSend instanceof File || fileToSend instanceof Blob)) {
        alert('El archivo PDF no es válido.');
        return;
      }

      if (fileToSend instanceof File && fileToSend.type !== 'application/pdf') {
        alert('El archivo no es un PDF válido.');
        return;
      }

      const blob = new Blob([fileToSend], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      /* 
            const ventanaPdf = window.open(url, '_blank');
      
           if (!ventanaPdf) {
              alert('No se pudo abrir el PDF. Tu navegador puede estar bloqueando ventanas emergentes.');
              return;
            }*/

      formData.append('pdf', fileToSend);

      if (objectData && typeof objectData === 'object') {
        formData.append('object', JSON.stringify(objectData));
      } else {
        alert('Los datos del objeto no son válidos.');
        return;
      }

      // const response = await axios.post('http://localhost:3001/api/Email', formData, {
      const response = await axios.post('https://server-axia.vercel.app/api/Email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // if (response.status === 200) {
      if (true) {
        localStorage.removeItem('formularioData');
        localStorage.removeItem('formularioStep');
        localStorage.removeItem('wizardData');
        localStorage.removeItem('wizardStep');

        setTimeout(() => {
          window.location.replace('https://axia.com.co/');
        }, 1000);

        onClose();
      } else {
        console.log('Hubo un error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      console.log('Hubo un error al enviar los datos');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-container">
          <CheckCircle className="modal-icon" />
        </div>
        <h2 className="modal-title">¡Listo!</h2>
        <div className="modal-body">
          {profitclient ? (
            <p>¡Un asesor de Axia se pondrá en contacto contigo!</p>
          ) : (
            <p>¡Síguenos en nuestras redes sociales!</p>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-send" onClick={handleSendData}>
            Ver plan financiero..
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
