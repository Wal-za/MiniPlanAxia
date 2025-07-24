import React, { useState } from 'react';
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
      console.log('Formulario completo:', { ...formData, ...sectionData });
      alert('¡Formulario completo! Ver consola.');
    }
  };

  const prevSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Mini Plan Financiero</h2>
      <h4 style={{ marginBottom: '10px' }}>
      </h4>

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
