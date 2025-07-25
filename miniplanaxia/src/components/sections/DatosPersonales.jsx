import { useState } from 'react';

export default function FormularioCompletoUnificado({ onNext, formData }) {

  const preguntas = [
    { label: '¿Qué asesor de Axia Finanzas Personales te recomendó este test?', name: 'recomendadoPor', type: 'text' },
    { label: 'Nombre completo', name: 'nombre', type: 'text' },
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
        'Proteger mi dinero ante cualquier riesgo',
        'Ahorrar impuestos'
      ]
    },
    { label: '¿Cuál es el ingreso neto que entra a tu cuenta de manera mensual?', hint: '', name: 'ingresoNetoMensual', type: 'number' },
    { label: '¿Recibes algún ingreso trimestral por cumplimiento?', hint: 'Si es así inserta el valor mensual (si es trimestral divídelo en 3)', name: 'ingresoTrimestral', type: 'number' },
    { label: '¿Recibes ingresos adicionales mensuales?', hint: 'Como arriendos, préstamos, entre otros', name: 'ingresosAdicionales', type: 'number' },
    { label: '¿Recibes prima?', hint: 'Pon el valor total de lo que recibes en el año (suma prima de junio y diciembre)', name: 'primaAnual', type: 'number' },
    { label: '¿Recibes bonificaciones?', hint: 'Si es así, pon el valor de tu bono anual', name: 'bonificacionesAnuales', type: 'number' },
    { label: '¿Realizas algún tipo de ahorro mensual?', hint: 'Cuenta AFC, fondo de empleados, pensiones voluntarias...', name: 'ahorroMensual', type: 'number' },
    { label: '¿Cuánto gastas en transporte mensualmente?', hint: 'Ejemplo: taxis, bus, gasolina, etc.', name: 'transporte', type: 'number' },
    { label: '¿Cuánto gastas en cuidado personal?', hint: 'Celular, ropa, hobbies, medicamentos, etc.', name: 'cuidadoPersonal', type: 'number' },
    { label: '¿Cuánto gastas en comida entre semana?', hint: 'Sumatoria de almuerzos mensuales en la oficina.', name: 'comidaOficina', type: 'number' },
    { label: '¿Cuánto gastas en tu hogar?', hint: 'Arriendo, servicios, mercado, mascota, etc.', name: 'gastosHogar', type: 'number' },
    { label: '¿Cuánto gastas en entretenimiento?', hint: 'Cine, rumba, restaurantes, etc.', name: 'entretenimiento', type: 'number' },
    { label: '¿Pagas seguros mensualmente?', hint: 'Medicina prepagada, seguro de vida, salud, carro...', name: 'segurosMensuales', type: 'number' },
    { label: '¿Pagas cursos mensualmente?', hint: 'Inglés, talleres, yoga, educación, etc.', name: 'cursos', type: 'number' },
    { label: '¿Tienes hijos? ¿Cuánto gastas en ellos mensualmente?', hint: 'Colegio, transporte, mesada, pañales, ropa...', name: 'hijos', type: 'number' },
    { label: '¿Realizas pagos anuales por seguros?', hint: 'SOAT, vida, incapacidad, vivienda, etc.', name: 'segurosAnuales', type: 'number' },
    { label: '¿Tienes pagos de anualidades fijas?', hint: 'Colegio, universidad, contador, suscripciones, etc.', name: 'anualidadesFijas', type: 'number' },
    { label: '¿Cuánto gastas en anualidades variables?', hint: 'Vacaciones, diciembre, aniversarios, mantenimiento...', name: 'anualidadesVariables', type: 'number' },
    { label: '¿Pagas impuestos anuales?', hint: 'Vehicular, predial, renta, etc.', name: 'impuestos', type: 'number' },
    { label: 'Por favor escribe el valor total de tus activos.', hint: 'Sumatoria de Carro, Casa, Cuentas de ahorro, Inversiones en bolsa, fondos de pensiones voluntarias, inversiones en acciones y demás.', type: 'number', name: 'patrimonio' },
    { label: '¿Cuentas con un seguro de vida?', type: 'radio', name: 'seguroVida', options: ['Sí', 'No'] },
    { label: '¿Tienes alguien que dependa económicamente de ti?', type: 'radio', name: 'tieneHijosDependientes', options: ['Sí', 'No'] },
    { label: '¿Cuentas con un seguro de incapacidad?', type: 'radio', name: 'seguroIncapacidad', options: ['Sí', 'No'] },
    { label: '¿Tienes póliza de salud?', type: 'radio', name: 'polizaSalud', options: ['Sí', 'No'] },
    { label: '¿Cuentas con un fondo de emergencia?', type: 'radio', name: 'fondoEmergencia', options: ['Sí', 'No'] },
    { label: '¿Tienes plan B para tu pensión?', hint: 'Puede ser: Fondo de pensiones voluntarias, plan de ahorro mensual, entre otros.', type: 'text', name: 'planB' },
    { label: 'Por favor anota la totalidad del valor de tus deudas.', hint: 'Sumatoria de tarjetas de crédito, créditos de libre inversión, vehicular, deudas personales, hipotecario, leasing.', type: 'number', name: 'deuda' },
    { label: '¿Cuánto destinas de manera mensual a todas las cuotas de tus deudas?', hint: 'Sumatoria de tarjetas de crédito, créditos de libre inversión, vehicular, deudas personales, hipotecario, leasing.', type: 'number', name: 'totalDeudasMensuales' },
    { label: '¿Tienes otros gastos mensuales?', hint: 'Sumatoria de ayuda a familiares, diezmos o donaciones, pagos de arriendos de tu consultorio u oficina, asistente, secretaria, celulares empresariales, soporte a tu cónyuge, celular de tus familiares.', type: 'number', name: 'otrosGastosMensuales' },
  ];

  const TOTAL_STEPS = preguntas.length;

  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    ...formData,
    ...preguntas.reduce((acc, pregunta) => {
      acc[pregunta.name] = formData[pregunta.name] || '';
      return acc;
    }, {}),
  });

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      onNext(localData); 
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
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
          <div className={"checkboxObjetivos"}key={idx}>
            <input
              type="checkbox"
              checked={localData[pregunta.name].includes(option)}
              onChange={() => {
                const newObj = { ...localData };
                if (newObj[pregunta.name].includes(option)) {
                  newObj[pregunta.name] = newObj[pregunta.name].filter(
                    (item) => item !== option
                  );
                } else {
                  newObj[pregunta.name] = [
                    ...newObj[pregunta.name],
                    option,
                  ];
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
      </div>
    </div>
  );
}
