import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatosPersonales from './sections/DatosPersonales';

const sections = [
  { component: DatosPersonales, name: 'Datos Personales' },
];

export default function FormWizard() {
  const storedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wizardData')) || {} : {};
  const storedStep = typeof window !== 'undefined' ? parseInt(localStorage.getItem('wizardStep'), 10) || 0 : 0;

  const [sectionIndex, setSectionIndex] = useState(storedStep);
  const [formData, setFormData] = useState(storedData);

  const CurrentSection = sections[sectionIndex].component;

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('wizardData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('wizardStep', sectionIndex.toString());
  }, [sectionIndex]);

const nextSection = (sectionData) => {
  const newFormData = { ...formData, ...sectionData };

  const cleanedFormData = {};
  for (const key in newFormData) {
    const value = newFormData[key];

    if (typeof value === 'string' && /^\d{1,3}(\.\d{3})*$/.test(value)) {
      cleanedFormData[key] = value.replace(/\./g, ''); 
    } else {
      cleanedFormData[key] = value; 
    }
  }

  setFormData(newFormData);

  if (sectionIndex < sections.length - 1) {
    setSectionIndex(sectionIndex + 1);
  } else {

    // *** Agrego conversión de campos vacíos a null ***
    for (const key in cleanedFormData) {
      const value = cleanedFormData[key];
      if (value === '' || value === undefined) {
        cleanedFormData[key] = null;
      }
    }

    // --- Mostrar mensaje de carga ---
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'axia-loading-message';
    loadingDiv.textContent = 'Axia Cargando...';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '10px';
    loadingDiv.style.right = '10px';
    loadingDiv.style.padding = '10px 20px';
    loadingDiv.style.backgroundColor = '#000';
    loadingDiv.style.color = '#fff';
    loadingDiv.style.fontWeight = 'bold';
    loadingDiv.style.borderRadius = '5px';
    loadingDiv.style.zIndex = '9999';
    document.body.appendChild(loadingDiv);

    axios.post('https://server-axia.vercel.app/api/miniplan', newFormData, {
    
    //axios.post('http://localhost:3001/api/miniplan', cleanedFormData, {
      responseType: 'blob'
    })
    .then(response => {
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    const ventanaPdf = window.open(url, '_blank');

    if (ventanaPdf) {
        localStorage.removeItem('formularioData');
        localStorage.removeItem('formularioStep');
        localStorage.removeItem('wizardData');
        localStorage.removeItem('wizardStep');

        setTimeout(function() {
            window.location.replace('https://axia.com.co/'); 
        }, 3000);  
    } else {
        alert('No se pudo abrir el PDF. Por favor, habilita las ventanas emergentes en tu navegador.');
  }
})
    .catch(error => {
      console.error('❌ Error al enviar el formulario:', error);
      alert('Error al enviar el formulario. Revisa la consola.');
    })
    .finally(() => {
      // --- Quitar mensaje de carga ---
      const loadingElem = document.getElementById('axia-loading-message');
      if (loadingElem) {
        loadingElem.remove();
      }
    });

    
  }
};

//

  const prevSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  return (
    <div className='container'>
      <h2></h2>

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
