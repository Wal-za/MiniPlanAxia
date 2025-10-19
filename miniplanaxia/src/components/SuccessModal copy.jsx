import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import axios from 'axios';
import './SuccessModal.css';

const SuccessModal = ({ onClose, profitclient, datos, pdf }) => {
  const [pdfFile, setPdfFile] = useState(pdf);
  const [objectData, setObjectData] = useState(datos);

  console.log(pdf)

  const handleSendData = async () => {
    const formData = new FormData();

    try {
      // ✅ Paso 1: Convertir pdfFile a File si es una URL blob
      let fileToSend = pdfFile;

      if (typeof pdfFile === 'string' && pdfFile.startsWith('blob:')) {
        const response = await fetch(pdfFile);
        const blob = await response.blob();
        fileToSend = new File([blob], 'plan_financiero.pdf', {
          type: 'application/pdf',
        });
      }

      // Validar que fileToSend sea File o Blob
      if (!(fileToSend instanceof File || fileToSend instanceof Blob)) {
        alert('El archivo PDF no es válido.');
        return;
      }

      formData.append('pdf', fileToSend);

      // ✅ Agregar objeto JSON si es válido
      if (objectData && typeof objectData === 'object') {
        formData.append('object', JSON.stringify(objectData));
      } else {
        alert('Los datos del objeto no son válidos.');
        return;
      }

      // ✅ Mostrar contenido de FormData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      

      // ✅ Enviar datos al servidor
      const response = await axios.post('http://tester-axia-server.vercel.app/api/Email', formData, {

     // const response = await axios.post('http://localhost:3001/api/Email', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Datos enviados exitosamente');
        onClose(); // Cierra el modal
      } else {
        alert('Hubo un error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Hubo un error al enviar los datos');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Ícono centrado */}
        <div className="modal-icon-container">
          <CheckCircle className="modal-icon" />
        </div>

        {/* Título */}
        <h2 className="modal-title">¡Estamos creando tu plan financiero!</h2>

        {/* Cuerpo */}
        <div className="modal-body">
          {profitclient ? (
            <p>¡Un asesor de Axia se pondrá en contacto contigo!</p>
          ) : (
            <p>¡Síguenos en nuestras redes sociales!</p>
          )}
        </div>

        {/* Botones */}
        <div className="modal-footer">
          <button className="btn-send" onClick={handleSendData}>
            Enviar
          </button>

          <button className="btn-close" onClick={onClose}>
            <X className="close-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
