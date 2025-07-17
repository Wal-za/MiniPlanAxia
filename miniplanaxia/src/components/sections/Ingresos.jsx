import { useState } from 'react';

function Ingresos({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    ingresoNetoMensual: formData.ingresoNetoMensual || '',
    ingresoTrimestral: formData.ingresoTrimestral || '',
    ingresosAdicionales: formData.ingresosAdicionales || '',
    primaAnual: formData.primaAnual || '',
    bonificacionesAnuales: formData.bonificacionesAnuales || '',
  });

  const preguntas = [
    {
      label: '¿Cuál es el ingreso neto que entra a tu cuenta de manera mensual?',
      field: 'ingresoNetoMensual',
    },
    {
      label: '¿Recibes algún ingreso trimestral por cumplimiento? Si es así, inserta el valor mensual (si es trimestral divídelo en 3)',
      field: 'ingresoTrimestral',
    },
    {
      label: '¿Recibes ingresos adicionales mensuales como arriendos, préstamos, entre otros?',
      field: 'ingresosAdicionales',
    },
    {
      label: 'Si recibes prima, pon el valor total de lo que recibes en el año (suma prima de junio y prima de diciembre)',
      field: 'primaAnual',
    },
    {
      label: '¿Recibes bonificaciones? Si es así pon el valor de tu bono anual',
      field: 'bonificacionesAnuales',
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
      <button type="submit">{step < preguntas.length - 1 ? 'Siguiente' : 'Continuar'}</button>
    </form>
  );
}

export default Ingresos;
