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
  {
  label: '¿Recibes prima?',
  name: 'primaAnual',
  type: 'number',
  descripcion: 'Si recibes prima, ingresa el valor total que recibes en el año (suma de la prima de junio y la de diciembre).'
},
{
  label: '¿Recibes bonificaciones?',
  name: 'bonificacionesAnuales',
  type: 'number',
  descripcion: 'Si recibes bonificaciones, ingresa el valor total anual de tus bonos.'
},
  {
    label: '¿Realizas algún tipo de ahorro mensual?',
    name: 'ahorroMensual',
    type: 'number',
    descripcion: 'Ejemplo: Cuenta AFC, fondo de empleados, pensiones voluntarias. Si es así, pon la sumatoria del valor mensual.'
  },
  {
    label: '¿Cuánto gastas en transporte mensualmente?',
    name: 'transporte',
    type: 'number',
    descripcion: 'Ejemplo: sumatoria de taxis, bus, gasolina, otros.'
  },
  {
    label: '¿Cuánto gastas en cuidado personal?',
    name: 'cuidadoPersonal',
    type: 'number',
    descripcion: 'Ejemplo: Sumatoria de celular, ropa, hobbies, medicamentos, peluquería, terapias, etc.'
  },
  {
    label: '¿Cuánto gastas en comida entre semana?',
    name: 'comidaOficina',
    type: 'number',
    descripcion: 'Ejemplo: Sumatoria de almuerzos mensuales en la oficina.'
  },
  {
    label: '¿Cuánto gastas en tu hogar?',
    name: 'gastosHogar',
    type: 'number',
    descripcion: 'Incluye sumatoria de administración o arriendo, mercados, gas, luz, agua, servicio doméstico, domicilios, mascota.'
  },
  {
    label: '¿Cuánto gastas en entretenimiento?',
    name: 'entretenimiento',
    type: 'number',
    descripcion: 'Sumatoria de salidas a cine, rumba, restaurantes, etc.'
  },
  {
    label: '¿Pagas seguros mensualmente?',
    name: 'segurosMensuales',
    type: 'number',
    descripcion: 'Ejemplo: Sumatoria de medicina prepagada, seguro de vida, seguro de salud, seguro del carro.'
  },
  {
    label: '¿Pagas cursos mensualmente?',
    name: 'cursos',
    type: 'number',
    descripcion: 'Sumatoria de cursos de inglés, talleres, yoga, educativos, etc. Pon el valor mensual destinado.'
  },
  {
  label: '¿Tienes hijos? ¿Cuánto gastas en ellos mensualmente?',
  name: 'hijos',
  type: 'number',
  descripcion: 'Si respondiste que sí, anota el valor mensual de los gastos destinados a ellos. Ejemplo: Sumatoria de colegio, transporte, mesada, cursos extracurriculares, pañales, leche, niñera, ropa, psicólogo. Si no tienes hijos, deja este campo en blanco.'
  },
  {
    label: '¿Realizas pagos anuales por seguros?',
    name: 'segurosAnuales',
    type: 'number',
    descripcion: 'Ejemplo: SOAT, seguro de vida, seguro de incapacidad, póliza de responsabilidad civil, seguro de vivienda, etc.'
  },
  {
    label: '¿Tienes pagos de anualidades fijas?',
    name: 'anualidadesFijas',
    type: 'number',
    descripcion: 'Ejemplo: Matrículas de colegio, semestres de universidad, pago a contador por declaración de renta, suscripciones, inscripciones a clubes o asociaciones.'
  },
  {
    label: '¿Cuánto gastas en anualidades variables?',
    name: 'anualidadesVariables',
    type: 'number',
    descripcion: 'Sumatoria de vacaciones anuales, gastos de diciembre, celebraciones especiales anuales (cumpleaños, aniversarios), mantenimiento del vehículo o inmuebles, gastos de ropa anual.'
  },
  {
    label: '¿Pagas impuestos anuales?',
    name: 'impuestos',
    type: 'number',
    descripcion: 'Si es así, por favor escribe cuánto pagas por: impuesto vehicular, predial, declaración de renta, etc.'
  },
  {
  label: 'Por favor escribe el valor total de tus activos.',
  name: 'patrimonio',
  type: 'number',
  descripcion: 'Ejemplo: Sumatoria de carro, casa, cuentas de ahorro, inversiones en bolsa, fondos de pensiones voluntarias, inversiones en acciones y demás.'
  },

  { label: '¿Cuentas con un seguro de vida?', type: 'radio', name: 'seguroVida', options: ['Sí', 'No'] },
  { label: '¿Tienes alguien que dependa económicamente de ti?', type: 'radio', name: 'tieneHijosDependientes', options: ['Sí', 'No'] },
  { label: '¿Cuentas con un seguro de incapacidad?', type: 'radio', name: 'seguroIncapacidad', options: ['Sí', 'No'] },
  { label: '¿Tienes póliza de salud?', type: 'radio', name: 'polizaSalud', options: ['Sí', 'No'] },
  { label: '¿Cuentas con un fondo de emergencia?', type: 'radio', name: 'fondoEmergencia', options: ['Sí', 'No'] },
  {
    label: '¿Tienes plan B para tu pensión?',
    name: 'planB',
    type: 'text',
    descripcion: 'Puede ser: Fondo de pensiones voluntarias, plan de ahorro mensual, inversiones u otro tipo de respaldo económico. escribe cuál es tu plan B.'
  },
  {
  label: 'Por favor anota la totalidad del valor de tus deudas.',
  name: 'deuda',
  type: 'number',
  descripcion: 'Incluye: Sumatoria de tarjetas de crédito, créditos de libre inversión, vehicular, deudas personales, hipotecario, leasing.'
  },

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

// Función para formatear números con separadores de miles
const formatNumber = (value) => {
  if (!value) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Función para renderizar la pregunta
const renderPregunta = (pregunta, index) => (
  <div key={index}>
    <label>{pregunta.label}</label>

    {/* Hint opcional */}
    {pregunta.hint && <small>{pregunta.hint}</small>}

    {/* Descripción opcional */}
    {pregunta.descripcion && (
      <small style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
        {pregunta.descripcion}
      </small>
    )}

    {/* Input de texto, número (formateado), etc */}
    {pregunta.type !== 'checkbox' && pregunta.type !== 'radio' ? (
      <input
        placeholder='Escribe aquí tu respuesta...'
        type={pregunta.type === 'number' ? 'text' : pregunta.type}
        value={
          pregunta.type === 'number'
            ? formatNumber(localData[pregunta.name] || '')
            : localData[pregunta.name] || ''
        }
        onChange={(e) => {
          const rawValue = e.target.value.replace(/\./g, ''); // eliminar puntos
          
          if (pregunta.type === 'number') {
            // solo permite dígitos
            if (/^\d*$/.test(rawValue)) {
              setLocalData({ ...localData, [pregunta.name]: rawValue });
            }
          } else {
            setLocalData({ ...localData, [pregunta.name]: e.target.value });
          }
        }}
      />
    ) : pregunta.type === 'checkbox' ? (
      pregunta.options.map((option, idx) => (
        <div className="checkboxObjetivos" key={idx}>
          <input
            type="checkbox"
            checked={localData[pregunta.name]?.includes(option)}
            onChange={() => {
              const newObj = { ...localData };
              if (newObj[pregunta.name].includes(option)) {
                newObj[pregunta.name] = newObj[pregunta.name].filter(
                  (item) => item !== option
                );
              } else {
                newObj[pregunta.name] = [
                  ...(newObj[pregunta.name] || []),
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

      {  /*     
      <button onClick={restartForm} >Reiniciar formulario</button>
      */}        
      </div>
    </div>
  );
}
