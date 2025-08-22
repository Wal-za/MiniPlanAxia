import { useState, useEffect } from 'react';

export default function FormularioCompletoUnificado({ onNext, formData }) {
  const preguntas = [
    { label: '¿Qué asesor de Axia Finanzas Personales te recomendó este test?', name: 'recomendadoPor', type: 'text' },
    { label: 'Nombre completo', name: 'nombre', type: 'text' },
    { label: 'Email', name: 'Email', type: 'text' },
    { label: 'Celular/Whatsapp', name: 'celular', type: 'text' },
    { label: 'Fecha de nacimiento', name: 'nacimiento', type: 'date' },
    { label: 'Empresa donde trabajas', name: 'empresa', type: 'text' },
    { label: 'Cargo / ocupación', name: 'cargo', type: 'text' },
    { label: 'Administradora de fondo de pensiones', name: 'afp', type: 'text' },
    { label: '¿Cuántas semanas has aportado al sistema pensional?', name: 'semanasCotizadas', type: 'text' },
    { label: '¿A qué edad te quieres pensionar?', name: 'edadPension', type: 'number' },
    { label: '¿Con cuánto?', name: 'montoPension', type: 'number' },
    {
      label: 'Selecciona tus objetivos',
      name: 'objetivos',
      type: 'checkbox',
      options: [
        'Educación universitaria de mis hijos',
        'Viajar cada año',
        'Libertad financiera',
        'Pensionarme joven',
        'Salir de las deudas',
        'Invertir',        
        'Ahorrar impuestos',
        'Proteger mi dinero ante cualquier riesgo',
      ],
    },
    { label: '¿Cuál es el ingreso neto que entra a tu cuenta de manera mensual?', name: 'ingresoNetoMensual', type: 'number' },
    { label: '¿Recibes algún ingreso trimestral por cumplimiento?', name: 'ingresoTrimestral', type: 'number' },
    { label: '¿Recibes ingresos adicionales mensuales?', name: 'ingresosAdicionales', type: 'number' },
    { label: '¿Recibes prima?', name: 'primaAnual', type: 'number' },
    { label: '¿Recibes bonificaciones?', name: 'bonificacionesAnuales', type: 'number' },
    { label: '¿Realizas algún tipo de ahorro mensual?', name: 'ahorroMensual', type: 'number' },
    { label: '¿Cuánto gastas en transporte mensualmente?', name: 'transporte', type: 'number' },
    { label: '¿Cuánto gastas en cuidado personal?', name: 'cuidadoPersonal', type: 'number' },
    { label: '¿Cuánto gastas en comida entre semana?', name: 'comidaOficina', type: 'number' },
    { label: '¿Cuánto gastas en tu hogar?', name: 'gastosHogar', type: 'number' },
    { label: '¿Cuánto gastas en entretenimiento?', name: 'entretenimiento', type: 'number' },
    { label: '¿Pagas seguros mensualmente?', name: 'segurosMensuales', type: 'number' },
    { label: '¿Pagas cursos mensualmente?', name: 'cursos', type: 'number' },
    { label: '¿Tienes hijos? ¿Cuánto gastas en ellos mensualmente?', name: 'hijos', type: 'number' },
    { label: '¿Realizas pagos anuales por seguros?', name: 'segurosAnuales', type: 'number' },
    { label: '¿Tienes pagos de anualidades fijas?', name: 'anualidadesFijas', type: 'number' },
    { label: '¿Cuánto gastas en anualidades variables?', name: 'anualidadesVariables', type: 'number' },
    { label: '¿Pagas impuestos anuales?', name: 'impuestos', type: 'number' },
    { label: 'Por favor escribe el valor total de tus activos.', name: 'patrimonio', type: 'number' },
    { label: '¿Cuentas con un seguro de vida?', type: 'radio', name: 'seguroVida', options: ['Sí', 'No'] },
    { label: '¿Tienes alguien que dependa económicamente de ti?', type: 'radio', name: 'tieneHijosDependientes', options: ['Sí', 'No'] },
    { label: '¿Cuentas con un seguro de incapacidad?', type: 'radio', name: 'seguroIncapacidad', options: ['Sí', 'No'] },
    { label: '¿Tienes póliza de salud?', type: 'radio', name: 'polizaSalud', options: ['Sí', 'No'] },
    { label: '¿Cuentas con un fondo de emergencia?', type: 'radio', name: 'fondoEmergencia', options: ['Sí', 'No'] },
    { label: '¿Tienes plan B para tu pensión?', name: 'planB', type: 'text' },
    { label: 'Por favor anota la totalidad del valor de tus deudas.', name: 'deuda', type: 'number' },
    { label: '¿Cuánto destinas de manera mensual a todas las cuotas de tus deudas?', name: 'totalDeudasMensuales', type: 'number' },
    { label: '¿Tienes otros gastos mensuales?', name: 'otrosGastosMensuales', type: 'number' },
  ];

  const TOTAL_STEPS = preguntas.length;

  const storedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('formularioData')) || {} : {};
  const storedStep = typeof window !== 'undefined' ? parseInt(localStorage.getItem('formularioStep'), 10) || 0 : 0;

  const [step, setStep] = useState(storedStep);
  const [localData, setLocalData] = useState(() =>
    preguntas.reduce((acc, pregunta) => {
      acc[pregunta.name] =
        storedData[pregunta.name] ||
        formData[pregunta.name] ||
        (pregunta.type === 'checkbox' ? [] : '');
      return acc;
    }, {})
  );

  useEffect(() => {
    localStorage.setItem('formularioData', JSON.stringify(localData));
  }, [localData]);

  useEffect(() => {
    localStorage.setItem('formularioStep', step.toString());
  }, [step]);

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {

      localStorage.removeItem('formularioData');
      localStorage.removeItem('formularioStep');
      localStorage.removeItem('wizardData');
      localStorage.removeItem('wizardStep');
      
      onNext(localData);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const restartForm = () => {
    localStorage.removeItem('formularioData');
    localStorage.removeItem('formularioStep');
    setStep(0);
    setLocalData(
      preguntas.reduce((acc, pregunta) => {
        acc[pregunta.name] = pregunta.type === 'checkbox' ? [] : '';
        return acc;
      }, {})
    );
  };

  const renderPregunta = (pregunta, index) => (
    <div key={index}>
      <label>{pregunta.label}</label>
      {pregunta.hint && <small>{pregunta.hint}</small>}

      {pregunta.type !== 'checkbox' && pregunta.type !== 'radio' ? (
        <input
          placeholder='Escribe aquí tu respuesta...'
          type={pregunta.type}
          value={localData[pregunta.name] || ''}
          onChange={(e) =>
            setLocalData({ ...localData, [pregunta.name]: e.target.value })
          }
        />
      ) : pregunta.type === 'checkbox' ? (
        pregunta.options.map((option, idx) => (
          <div className="checkboxObjetivos" key={idx}>
            <input
              type="checkbox"
              checked={localData[pregunta.name].includes(option)}
              onChange={() => {
                const newObj = { ...localData };
                if (newObj[pregunta.name].includes(option)) {
                  newObj[pregunta.name] = newObj[pregunta.name].filter((item) => item !== option);
                } else {
                  newObj[pregunta.name] = [...newObj[pregunta.name], option];
                }
                setLocalData(newObj);
              }}
            />
            <label>{option}</label>
          </div>
        ))
      ) : pregunta.type === 'radio' ? (
        pregunta.options.map((option, idx) => (
          <div key={idx}>
            <input
              type="radio"
              name={pregunta.name}
              value={option}
              checked={localData[pregunta.name] === option}
              onChange={() =>
                setLocalData({ ...localData, [pregunta.name]: option })
              }
            />
            <label>{option}</label>
          </div>
        ))
      ) : null}
    </div>
  );

  return (
    <div>
      {renderPregunta(preguntas[step], step)}

      <div className='contaiButtons'>
        <button onClick={prevStep} disabled={step === 0}>
          Anterior
        </button>
        <button onClick={nextStep}>
          {step === TOTAL_STEPS - 1 ? 'Enviar' : 'Siguiente'}
        </button>

      {  /*     
      <button onClick={restartForm} >Reiniciar formulario</button>
      */}        
      </div>
    </div>
  );
}
