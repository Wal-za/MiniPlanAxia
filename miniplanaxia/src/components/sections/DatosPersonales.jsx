import { useState } from 'react';

export default function DatosPersonales({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    recomendadoPor: formData.recomendadoPor || '',
    nombre: formData.nombre || '',
    nacimiento: formData.nacimiento || '',
  });

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onNext(localData);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      {step === 0 && (
        <label>
          ¿Qué asesor de Axia Finanzas Personales te recomendó este test?
          <input
            type="text"
            value={localData.recomendadoPor}
            onChange={(e) => setLocalData({ ...localData, recomendadoPor: e.target.value })}
          />
        </label>
      )}
      {step === 1 && (
        <label>
          Nombre completo
          <input
            type="text"
            value={localData.nombre}
            onChange={(e) => setLocalData({ ...localData, nombre: e.target.value })}
          />
        </label>
      )}
      {step === 2 && (
        <label>
          Fecha de nacimiento
          <input
            type="date"
            value={localData.nacimiento}
            onChange={(e) => setLocalData({ ...localData, nacimiento: e.target.value })}
          />
        </label>
      )}
      <br />
      <button type="submit">{step < 2 ? 'Siguiente' : 'Continuar'}</button>
    </form>
  );
}
