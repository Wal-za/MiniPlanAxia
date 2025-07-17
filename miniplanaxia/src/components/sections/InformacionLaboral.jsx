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

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const preguntas = [
    { label: 'Empresa donde trabajas', name: 'empresa' },
    { label: 'Cargo / ocupación', name: 'cargo' },
    { label: 'Administradora de fondo de pensiones', name: 'afp' },
    { label: '¿Cuántas semanas has aportado?', name: 'semanasCotizadas' }
  ];

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <label>{preguntas[step].label}
        <input
          type="text"
          value={localData[preguntas[step].name]}
          onChange={(e) => handleChange(preguntas[step].name, e.target.value)}
        />
      </label>
      <br />
      <button type="submit">{step < 3 ? 'Siguiente' : 'Continuar'}</button>
    </form>
  );
}
