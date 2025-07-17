import { useState } from 'react';

function Impuestos({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    impuestoVehicular: formData.impuestoVehicular || '',
    impuestoPredial: formData.impuestoPredial || '',
    declaracionRenta: formData.declaracionRenta || '',
    otrosImpuestos: formData.otrosImpuestos || '',
  });

  const preguntas = [
    {
      label: '¿Cuánto pagas anualmente por impuesto vehicular?',
      field: 'impuestoVehicular',
    },
    {
      label: '¿Cuánto pagas anualmente por impuesto predial?',
      field: 'impuestoPredial',
    },
    {
      label: '¿Cuánto pagas anualmente por declaración de renta?',
      field: 'declaracionRenta',
    },
    {
      label: '¿Tienes otros impuestos anuales? Especifica el total',
      field: 'otrosImpuestos',
    },
  ];

  const handleNext = () => {
    if (step < preguntas.length - 1) {
      setStep(step + 1);
    } else {
      onNext(localData);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <label>
        {preguntas[step].label}
        <input
          type="number"
          value={localData[preguntas[step].field]}
          onChange={(e) =>
            setLocalData({ ...localData, [preguntas[step].field]: e.target.value })
          }
        />
      </label>
      <br />
      <button type="submit">{step < preguntas.length - 1 ? 'Siguiente' : 'Finalizar sección'}</button>
    </form>
  );
}

export default Impuestos;
