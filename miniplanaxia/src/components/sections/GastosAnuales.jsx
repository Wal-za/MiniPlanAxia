import { useState } from 'react';

function GastosAnuales({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    segurosAnuales: formData.segurosAnuales || '',
    anualidadesFijas: formData.anualidadesFijas || '',
    anualidadesVariables: formData.anualidadesVariables || '',
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onNext(localData);
    }
  };

  const preguntas = [
    {
      label: '¿Realizas pagos anuales por seguros?',
      hint: 'Ejemplo: SOAT, seguro de vida, incapacidad, póliza civil, seguro de vivienda.',
      field: 'segurosAnuales',
    },
    {
      label: '¿Tienes pagos de anualidades fijas?',
      hint: 'Ejemplo: Matrículas de colegio, semestres de universidad, declaración de renta, suscripciones.',
      field: 'anualidadesFijas',
    },
    {
      label: '¿Cuánto gastas en anualidades variables?',
      hint: 'Ejemplo: Vacaciones, diciembre, celebraciones, mantenimientos, ropa anual.',
      field: 'anualidadesVariables',
    },
  ];

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <label>
        {preguntas[step].label}
        <p className="hint">{preguntas[step].hint}</p>
        <input
          type="number"
          value={localData[preguntas[step].field]}
          onChange={(e) =>
            setLocalData({ ...localData, [preguntas[step].field]: e.target.value })
          }
        />
      </label>
      <br />
      <button type="submit">{step < 2 ? 'Siguiente' : 'Continuar'}</button>
    </form>
  );
}

export default GastosAnuales;
