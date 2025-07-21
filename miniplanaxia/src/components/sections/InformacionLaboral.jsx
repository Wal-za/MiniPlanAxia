import { useState } from 'react';

export default function InformacionLaboral({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    empresa: formData.empresa || '',
    cargo: formData.cargo || '',
    afp: formData.afp || '',
    semanasCotizadas: formData.semanasCotizadas || '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onNext(localData);
    }
  };

  const handleBack = () => {
  if (step > 0) {
    setStep(step - 1);
  console.log("no se puede ")
  }
};


  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const preguntas = [
    { label: 'Empresa donde trabajas', name: 'empresa' },
    { label: 'Cargo / ocupación', name: 'cargo' },
    { label: 'Administradora de fondo de pensiones', name: 'afp' },
    { label: '¿Cuantas semanas has aportado al sistema pensional?', name: 'semanasCotizadas' }
  ];

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <label>{preguntas[step].label}
        <input
          type="text"
          placeholder='Escribe aquí tu respuesta...'
          value={localData[preguntas[step].name]}
          onChange={(e) => handleChange(preguntas[step].name, e.target.value)}
        />
      </label>
      <br />
       <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button type="button" onClick={handleBack}>Atrás</button>
      <button type="submit">{step < 2 ? 'Siguiente' : 'Continuar'}</button>
      </div>
    </form>
  );
}
