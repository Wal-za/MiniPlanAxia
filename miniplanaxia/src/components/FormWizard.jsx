import React, { useState } from 'react';
import axios from 'axios';
import DatosPersonales from './sections/DatosPersonales';


const sections = [
  { component: DatosPersonales, name: 'Datos Personales' },  
];

export default function FormWizard() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const CurrentSection = sections[sectionIndex].component;
  const sectionName = sections[sectionIndex].name;

  const nextSection = (sectionData) => {
  setFormData(prev => ({ ...prev, ...sectionData }));

  if (sectionIndex < sections.length - 1) {
    setSectionIndex(sectionIndex + 1);
  } else {
    const datosAEnviar = { ...formData, ...sectionData };

    axios.post('http://localhost:3001/api/miniplan', datosAEnviar)
      .then(response => {
        const { mensaje, resumenFinanciero } = response.data;

        console.log('Respuesta del servidor:', mensaje);
        console.log(' Resumen financiero:');

        if (resumenFinanciero && Array.isArray(resumenFinanciero.resumen)) {
          resumenFinanciero.resumen.forEach((linea, index) => {
            console.log(`${index + 1}. ${linea}`);
          });
        } else {
          console.warn('El resumen financiero no se recibió en el formato esperado.');
        }

        alert('¡Formulario completo y enviado con éxito!');
      })
      .catch(error => {
        console.error('Error al enviar el formulario:', error);
        alert('Error al enviar el formulario. Revisa la consola.');
      });

    console.log('📨 Formulario completo (enviado):', datosAEnviar);
  }
};


  const prevSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  return (
    <div  className='container'>
      <h2>Mini Plan Financiero</h2>
      
     

      <CurrentSection
        onNext={nextSection}
        onBack={prevSection}
        formData={formData}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        {sectionIndex > 0 && (
          <button onClick={prevSection}>Atrás</button>
        )}
      </div>
    </div>
  );
}
