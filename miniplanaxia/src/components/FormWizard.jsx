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

    axios.post('https://server-axia.vercel.app/api/miniplan', datosAEnviar, {
    //axios.post('http://localhost:3001/api/miniplan', datosAEnviar, {
      responseType: 'blob'  // 🔥 Muy importante para recibir el PDF
    })
    .then(response => {
      // Crear una URL temporal para el PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Abrir el PDF en una nueva pestaña
      window.open(url, '_blank');

      console.log('✅ PDF generado y abierto en una nueva pestaña.');
      alert('¡Formulario completo y resumen generado con éxito!');
    })
    .catch(error => {
      console.error('❌ Error al enviar el formulario:', error);
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
