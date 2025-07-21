import { useState } from 'react';

function GastosAnuales({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [localData, setLocalData] = useState({
    segurosAnuales: formData.segurosAnuales || '',
    anualidadesFijas: formData.anualidadesFijas || '',
    anualidadesVariables: formData.anualidadesVariables || '',
    impuestos: formData.impuestos || '',
  });

  const preguntas = [
    {
      label: '¿Realizas pagos anuales por seguros?',
      hint: 'Sumatoria de SOAT, seguro de vida, seguro de incapacidad, póliza de responsabilidad civil, seguro de vivienda, etc. Si respondiste sí, escribe el valor anual de estos seguros.',
      field: 'segurosAnuales',
    },
    {
      label: '¿Tienes pagos de anualidades fijas?',
      hint: 'Sumatoria de Matrículas de colegio, semestres de universidad, Pago a contador por declaración de renta, suscripciones, inscripciones a clubes o asociaciones. Si respondiste sí, escribe el valor anual de estos gastos.',
      field: 'anualidadesFijas',
    },
    {
      label: '¿Cuánto gastas en anualidades variables?',
      hint: 'Sumatoria de Vacaciones anuales, gastos de diciembre, celebraciones especiales anuales (cumpleaños especiales, aniversarios y demás), mantenimiento del vehículo, mantenimiento de bienes inmuebles, gastos de ropa anual.',
      field: 'anualidadesVariables',
    },
    {
      label: '¿Pagas impuestos anuales?',
      hint: 'Si es así, por favor escribe la suma de cuánto pagas por: impuesto vehicular, predial, declaración de renta, etc.',
      field: 'impuestos',
    },
  ];

  const handleNext = () => {
    const currentField = preguntas[step].field;
    const currentValue = localData[currentField];

    // Validar solo si el usuario ingresó un valor
    if (currentValue !== '' && (isNaN(currentValue) || parseFloat(currentValue) < 0)) {
      setError('Por favor ingresa un número válido mayor o igual a 0 o deja el campo vacío.');
      return;
    }

    setError('');

    if (step < preguntas.length - 1) {
      setStep(step + 1);
    } else {
      onNext(localData);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const field = preguntas[step].field;

    setLocalData({
      ...localData,
      [field]: value,
    });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      <label>
        <label>{preguntas[step].label}</label>
        <p className="hint">{preguntas[step].hint}</p>
        <input
          type="number"
          placeholder='Escribe aquí tu respuesta...'
          min="0"
          step="0.01"
          value={localData[preguntas[step].field]}
          onChange={handleChange}
        />
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <br />
      <button type="submit">
        {step < preguntas.length - 1 ? 'Siguiente' : 'Continuar'}
      </button>
    </form>
  );
}

export default GastosAnuales;
