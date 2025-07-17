import { useState } from 'react';

function PatrimonioYRiesgos({ onNext, onBack, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    patrimonio: formData.patrimonio || '',
    deuda: formData.deuda || '',
    planB: formData.planB || '',
    seguroVida: formData.seguroVida || '',
    tieneHijosDependientes: formData.tieneHijosDependientes || '',
    seguroIncapacidad: formData.seguroIncapacidad || '',
    polizaSalud: formData.polizaSalud || '',
    fondoEmergencia: formData.fondoEmergencia || '',
  });

  const preguntas = [
    {
      label: 'Por favor escribe el valor total de tus activos.',
      hint: 'Ejemplo: Carro, Casa, Cuentas de ahorro, inversiones en bolsa, fondos de pensiones voluntarias, etc.',
      type: 'number',
      field: 'patrimonio',
    },
    {
      label: 'Por favor anota la totalidad del valor de tus deudas.',
      hint: 'Ejemplo: tarjetas de crédito, créditos de libre inversión, vehicular, deudas personales, hipotecario, leasing.',
      type: 'number',
      field: 'deuda',
    },
    {
      label: '¿Tienes plan B para tu pensión?',
      hint: 'Ejemplo: Fondo de pensiones voluntarias, plan de ahorro mensual, entre otros.',
      type: 'text',
      field: 'planB',
    },
    {
      label: '¿Cuentas con un seguro de vida?',
      type: 'radio',
      field: 'seguroVida',
    },
    {
      label: '¿Tienes hijos o alguien que dependa económicamente de ti?',
      type: 'radio',
      field: 'tieneHijosDependientes',
    },
    {
      label: '¿Cuentas con un seguro de incapacidad?',
      type: 'radio',
      field: 'seguroIncapacidad',
    },
    {
      label: '¿Tienes póliza de salud?',
      type: 'radio',
      field: 'polizaSalud',
    },
    {
      label: '¿Cuentas con un fondo de emergencia?',
      type: 'radio',
      field: 'fondoEmergencia',
    },
  ];

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < preguntas.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onNext(localData); // final de la sección
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    } else {
      onBack(); // volver a la sección anterior
    }
  };

  const current = preguntas[step];

  return (
    <form onSubmit={e => { e.preventDefault(); handleNext(); }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontWeight: 'bold' }}>{current.label}</label>
        {current.hint && <p style={{ fontSize: '0.9rem', color: '#ddd' }}>{current.hint}</p>}

        {/* Campo de entrada dinámico */}
        {current.type === 'radio' ? (
          <div>
            <label>
              <input
                type="radio"
                name={current.field}
                value="si"
                checked={localData[current.field] === 'si'}
                onChange={() => handleChange(current.field, 'si')}
              />
              Sí
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <input
                type="radio"
                name={current.field}
                value="no"
                checked={localData[current.field] === 'no'}
                onChange={() => handleChange(current.field, 'no')}
              />
              No
            </label>
          </div>
        ) : (
          <input
            type={current.type}
            value={localData[current.field]}
            onChange={e => handleChange(current.field, e.target.value)}
            required
          />
        )}
      </div>

      {/* Botones de navegación */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button type="button" onClick={handleBack}>Atrás</button>
        <button type="submit">
          {step < preguntas.length - 1 ? 'Siguiente' : 'Finalizar sección'}
        </button>
      </div>
    </form>
  );
}

export default PatrimonioYRiesgos;
