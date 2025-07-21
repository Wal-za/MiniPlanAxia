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
      hint: '',
      field: 'ingresoNetoMensual',
    },
    {
      label: '¿Recibes algún ingreso trimestral por cumplimiento?',
      hint:  'Si es así inserta el valor mensual (si es trimestral divídelo en 3)',
      field: 'ingresoTrimestral',
    },
    {
      label: '¿Recibes ingresos adicionales mensuales?',
      hint:  'como arriendos, prestamos, entre otros',
      field: 'ingresosAdicionales',
    },
    {
      label: '¿Recibes prima?',
      hint:  'pon el valor total de lo que recibes en el año (suma prima de junio y prima de Diciembre)',
      field: 'primaAnual',
    },
    {
      label: '¿Recibes bonificaciones?',
      hint:  'Si es así pon el valor de tu bono anual',
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

  const currentPregunta = preguntas[step];

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <div>
        <label style={{ fontWeight: 'bold' }}>{currentPregunta.label}</label>
        <p>{currentPregunta.hint}</p>

       
        <input
          id={currentPregunta.field}
          type="number"
          placeholder='Escribe aquí tu respuesta...'
          value={localData[currentPregunta.field]}
          onChange={(e) =>
            setLocalData({ ...localData, [currentPregunta.field]: e.target.value })
          }
        />
      </div>
      <br />
      <button type="submit">
        {step < preguntas.length - 1 ? 'Siguiente' : 'Continuar'}
      </button>
    </form>
  );
}

export default Ingresos;
