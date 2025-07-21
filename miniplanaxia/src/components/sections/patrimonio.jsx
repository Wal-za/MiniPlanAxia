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
    totalDeudasMensuales: formData.totalDeudasMensuales || '',
    otrosGastosMensuales: formData.otrosGastosMensuales || '',
  });

  const preguntas = [
    {
      label: 'Por favor escribe el valor total de tus activos.',
      hint: 'Sumatoria de Carro, Casa, Cuentas de ahorro, Inversiones en bolsa, fondos de pensiones voluntarias, inversiones en acciones y demás.',
      type: 'number',
      field: 'patrimonio',
    },    
    {
      label: '¿Cuentas con un seguro de vida?',
      type: 'radio',
      field: 'seguroVida',
    },
    {
      label: '¿Tienes alguien que dependa económicamente de ti?',
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
    {
      label: 'Por favor anota la totalidad del valor de tus deudas.',
      hint: 'Sumatoria de tarjetas de crédito, créditos de libre inversión, vehicular, deudas personales, hipotecario, leasing.',
      type: 'number',
      field: 'deuda',
    },
    {
      label: '¿Tienes plan B para tu pensión?',
      hint: 'Puede ser: Fondo de pensiones voluntarias, plan de ahorro mensual, entre otros.',
      type: 'text',
      field: 'planB',
    },    
    {
      label: '¿Cuánto destinas de manera mensual a todas las cuotas de tus deudas?',
      hint: 'Sumatoria de tarjetas de crédito, créditos de libre inversión, vehicular, deudas personales, hipotecario, leasing.',
      type: 'number',
      field: 'totalDeudasMensuales',
    },
    {
      label: '¿Tienes otros gastos mensuales?',
      hint:  'Sumatoria de ayuda a familiares, diezmos o donaciones, pagos de arriendos de tu consultorio u oficina, asistente, secretaria, celulares empresariales, soporte a tu conyugue, celular de tus familiares.',
      type: 'number',
      field: 'otrosGastosMensuales',
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
            placeholder='Escribe aquí tu respuesta...'
            value={localData[current.field]}
            onChange={e => handleChange(current.field, e.target.value)}        
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
