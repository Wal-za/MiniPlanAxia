import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatosPersonales from './sections/DatosPersonales';
//import SuccessModal from './SuccessModal';


import SuccessModal from './SuccessModal copy';
const sections = [
  { component: DatosPersonales, name: 'Datos Personales' },
];

export default function FormWizard() {
  const storedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wizardData')) || {} : {};
  const storedStep = typeof window !== 'undefined' ? parseInt(localStorage.getItem('wizardStep'), 10) || 0 : 0;

  const [sectionIndex, setSectionIndex] = useState(storedStep);
  const [formData, setFormData] = useState(storedData);
  const [modalOpen, setModalOpen] = useState(false);
  const [profitclient,setProfitclient]=useState(false);
  const [pdf, setPdf] = useState(null);

  const CurrentSection = sections[sectionIndex].component;


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
    return;
  }

  // Convertir campos vacíos a null
  for (const key in cleanedFormData) {
    const value = cleanedFormData[key];
    if (value === '' || value === undefined) {
      cleanedFormData[key] = null;
    }
  }

  // Mostrar mensaje de carga
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
  loadingDiv.style.display = 'none';
  document.body.appendChild(loadingDiv);

  // Función que maneja el envío del formulario
  const enviarFormulario = () => {
  

    setModalOpen(true);
    const safeNumber = (value) => {
      if (typeof value === 'string') {
          // Limpiar la cadena de caracteres no numéricos (excepto el punto decimal)
          // Esto es útil si los números vienen con comas, símbolos de moneda, etc.
          const cleaned = value.replace(/[^0-9.]/g, '');
          if (cleaned === '') {
              return 0; // Si la cadena limpia está vacía, devuelve 0
          }
          return Number(cleaned);
      }
      // Si no es una cadena, o es undefined/null/0, Number(value || 0) lo manejará
      return Number(value || 0); // Si es undefined o null, se convierte a 0
  };

  const patrimonio = safeNumber(newFormData.patrimonio);
const ahorroMensual = safeNumber(newFormData.ahorroMensual);

// Todas las variables utilizadas en el cálculo de sobrante también deben ser numéricas.
const ingresoNetoMensual = safeNumber(newFormData.ingresoNetoMensual);
const gastosHogar = safeNumber(newFormData.gastosHogar);
const segurosMensuales = safeNumber(newFormData.segurosMensuales);
const cursos = safeNumber(newFormData.cursos);
const comidaOficina = safeNumber(newFormData.comidaOficina);
const cuidadoPersonal = safeNumber(newFormData.cuidadoPersonal);
const entretenimiento = safeNumber(newFormData.entretenimiento);
const hijos = safeNumber(newFormData.hijos);
const totalDeudasMensuales = safeNumber(newFormData.totalDeudasMensuales);
const otrosGastosMensuales = safeNumber(newFormData.otrosGastosMensuales);
  
  
   

  const sobrante=(ingresoNetoMensual-ahorroMensual-gastosHogar-segurosMensuales-cursos-comidaOficina-cuidadoPersonal-entretenimiento-hijos-totalDeudasMensuales-otrosGastosMensuales)
    const profitClient=(ahorroMensual>=400000||patrimonio>=40000000||sobrante>=400000)?true:false;
    setProfitclient(profitClient)
 
    
   return axios.post('https://server-axia.vercel.app/api/miniplan', newFormData, {
    //return axios.post('http://localhost:3001/api/miniplan', newFormData, {

      responseType: 'blob'
    });

   
  };

  // Manejo de éxito
  const manejarRespuesta = (response) => {

    
  
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdf(blob)
    try {
      const ventanaPdf = window.open(url, '_blank');

      if (ventanaPdf) {
        localStorage.removeItem('formularioData');
        localStorage.removeItem('formularioStep');
        localStorage.removeItem('wizardData');
        localStorage.removeItem('wizardStep');
        //setModalOpen(false);

        setTimeout(() => {
         // window.location.replace('https://axia.com.co/');
        }, 3000);
      } else {
        alert('No se pudo abrir el PDF. Tu navegador puede estar bloqueando ventanas emergentes.');
      }
    } catch (error) {
      console.error('Error al intentar abrir el PDF:', error);
      alert('No se pudo abrir el PDF.');
    }
  };

  // Manejo de error
  const manejarError = (error) => {
    console.error('❌ Error al enviar el formulario:', error);
    alert('Error al enviar el formulario. Revisa la consola.');
  };

  // Enviar y reintentar si es necesario
  enviarFormulario()
    .then(manejarRespuesta)
    .catch((error) => {
      if (error.code === 'ERR_NETWORK') {
        console.warn('Primer intento falló por red. Reintentando...');
        setTimeout(() => {
          enviarFormulario()
            .then(manejarRespuesta)
            .catch(manejarError);
        }, 1000);
      } else {
        manejarError(error);
      }
    })
    .finally(() => {
      const loadingElem = document.getElementById('axia-loading-message');
      if (loadingElem) {
        loadingElem.remove();
      }
    });
};

//

  const prevSection = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
    }
  };

  return (
    // 1. Usa un Fragmento de React (<>) como elemento raíz.
    <>
      {/* 2. Mantén todo el contenido de tu página dentro de su contenedor */}
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

      {/* 3. Renderiza el modal FUERA y DESPUÉS del contenedor. */}
      {/* Ahora es un "hermano" del div.container, no un "hijo". */}
      {/*modalOpen && <SuccessModal profitclient={profitclient} onClose={() => setModalOpen(false)}  />*/}
      {modalOpen && <SuccessModal profitclient={profitclient} datos={formData} pdf={pdf} onClose={() => setModalOpen(false)}  />}
    </>
  );
}

