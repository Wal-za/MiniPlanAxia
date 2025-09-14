import { useState, useEffect } from 'react';
import PoliticaDatosModal from '../PoliticaDatosModal';

export default function FormularioCompletoUnificado({ onNext, formData }) {
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

const preguntas = [
  { label: '¿Qué asesor de Axia Finanzas Personales te recomendó este test?', name: 'recomendadoPor', type: 'text' },
  { label: 'Nombre completo', name: 'nombre', type: 'text' },
  { label: 'Email', name: 'email', type: 'text' },
  { label: 'Celular/Whatsapp', name: 'celular', type: 'text' },
  { label: 'Fecha de nacimiento', name: 'nacimiento', type: 'date' },
  { label: 'Empresa donde trabajas', name: 'empresa', type: 'text' },
  { label: 'Cargo / ocupación', name: 'cargo', type: 'text' },
  { label: 'Administradora de fondo de pensiones', name: 'afp', type: 'text' },
  { label: '¿Cuántas semanas aproximadamente,has aportado al sistema pensional?', name: 'semanasCotizadas', type: 'text' },
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
  { label: '¿Recibes algún ingreso trimestral por cumplimiento?(Si es asi,ingresa el valor mensual que esto representa,de lo contrario déjalo en blanco.)', name: 'ingresoTrimestral', type: 'number' },
  { label: '¿Recibes ingresos adicionales mensuales? (Si es asi, ingresa el valor mensual que esto representa,de lo contrario déjalo en blanco.)', name: 'ingresosAdicionales', type: 'number' },
  {
  label: '¿Recibes prima?',
  name: 'primaAnual',
  type: 'number',
  descripcion: 'Si recibes prima, ingresa el valor total que recibes en el año (suma de la prima de junio y la de diciembre).'
},
{
  label: '¿Recibes bonificaciones? Si no, puedes dejar el valor en blanco.',
  name: 'bonificacionesAnuales',
  type: 'number',
  descripcion: 'Si recibes bonificaciones, ingresa el valor total anual de tus bonos.'
},
  {
    label: '¿Cuanto ahorras mensualmente?',
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
    descripcion: 'Ejemplo: Sumatoria de medicina prepagada, seguro de vida, seguro de salud, o si pagas elseguro del carro mensualmente.'
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
    descripcion: 'Ejemplo: SOAT, seguro de vida, seguro de incapacidad, póliza de responsabilidad civil, seguro de vivienda, etc. Recuerda poner el total que pagas en todo el año por estos seguros.'
  },
  {
    label: '¿Tienes pagos de anualidades fijas?',
    name: 'anualidadesFijas',
    type: 'number',
    descripcion: 'Ejemplo: Matrículas de colegio, semestres de universidad, pago a contador por declaración de renta, suscripciones, inscripciones a clubes o asociaciones.Recuerda poner el valor total que pagas en todo un año por estas categorías.'
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
    descripcion: 'Si es así, por favor escribe cuánto pagas por: impuesto vehicular, predial, declaración de renta, etc.Recuerda poner el valor que pagas en todo un año por esta categoría.'
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
    label: '¿Tienes plan B para tu pensión? (Dejar en blanco si no tienes plan B, y dale clic al botón siguiente)',
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

{
  label: '¿Cuánto destinas de manera mensual a todas las cuotas de tus deudas?',
  name: 'totalDeudasMensuales',
  type: 'number',
  descripcion: 'Incluye la sumatoria de pagos mensuales de tarjetas de crédito, créditos de libre inversión, vehículos, deudas personales, hipotecario, leasing, entre otros.'
},
{
  label: '¿Tienes otros gastos mensuales?',
  name: 'otrosGastosMensuales',
  type: 'number',
  descripcion: 'Sumatoria de ayuda a familiares, diezmos o donaciones, pagos de arriendo de tu consultorio u oficina, asistencia de personal como secretaria o asistente, celulares empresariales, soporte económico a tu cónyuge, celular de tus familiares, entre otros.'
}

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
    setAceptaTerminos(false);
  };

  // ✅ Formatea números con puntos de miles
  const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // ✅ Render de cada pregunta
  const renderPregunta = (pregunta, index) => (
    <div key={index} style={{ marginBottom: '20px' }}>
      <label style={{ fontWeight: '600', fontSize: '18px' }}>
        {pregunta.label}
      </label>
      {pregunta.descripcion && (
        <p style={{ fontSize: '12px', marginTop: '4px', fontWeight: 'normal' }}>
          {pregunta.descripcion}
        </p>
      )}

      {/* ✅ Input de número formateado */}
      {pregunta.type === 'number' ? (
        <input
          type="text"
          placeholder="Escribe aquí tu respuesta..."
          inputMode="numeric"
          value={formatNumber(localData[pregunta.name])}
          onChange={(e) => {
            const raw = e.target.value.replace(/\./g, '').replace(/\D/g, '');
            setLocalData({ ...localData, [pregunta.name]: raw });
          }}
          autoComplete="off"
        />
      ) : pregunta.type === 'text' || pregunta.type === 'date' ? (
        <input
          placeholder="Escribe aquí tu respuesta..."
          type={pregunta.type}
          value={localData[pregunta.name] || ''}
          onChange={(e) =>
            setLocalData({ ...localData, [pregunta.name]: e.target.value })
          }
          autoComplete="off"
        />
      ) : pregunta.type === 'checkbox' ? (
        <div style={{ marginTop: '10px' }}>
          {pregunta.options.map((option, i) => (
            <label key={i} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={(localData[pregunta.name] || []).includes(option)}
                onChange={(e) => {
                  let newValues = [...(localData[pregunta.name] || [])];
                  if (e.target.checked) {
                    newValues.push(option);
                  } else {
                    newValues = newValues.filter((v) => v !== option);
                  }
                  setLocalData({ ...localData, [pregunta.name]: newValues });
                }}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              {option}
            </label>
          ))}
        </div>
      ) : pregunta.type === 'radio' ? (
        <div style={{ marginTop: '10px' }}>
          {pregunta.options.map((option, i) => (
            <label key={i} style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
              <input
                type="radio"
                name={pregunta.name}
                checked={localData[pregunta.name] === option}
                onChange={() => setLocalData({ ...localData, [pregunta.name]: option })}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              {option}
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Barra de progreso */}
      <div style={{ height: '18px', backgroundColor: '#e0e0e0', borderRadius: '6px', marginBottom: '20px' }}>
        <div
          style={{
            height: '8px',
            width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
            backgroundColor: '#007bff',
            borderRadius: '6px',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>

      {/* Pregunta actual */}
      {renderPregunta(preguntas[step], step)}

      {/* Checkbox para aceptar términos SOLO en el último paso */}
      {step === TOTAL_STEPS - 1 && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="checkbox"
            id="terminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            style={{ margin: 0, position: 'relative', top: '1px' }}
          />
          <PoliticaDatosModal />
        </div>
      )}

      {/* Botones de navegación */}
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <button
          onClick={prevStep}
          disabled={step === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: step === 0 ? 'not-allowed' : 'pointer',
            opacity: step === 0 ? 0.5 : 1,
          }}
          type="button"
        >
          Anterior
        </button>

        {step < TOTAL_STEPS - 1 ? (
          <button
            onClick={nextStep}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            type="button"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={nextStep}
            disabled={!aceptaTerminos}
            style={{
              padding: '10px 20px',
              backgroundColor: !aceptaTerminos ? '#999' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: !aceptaTerminos ? 'not-allowed' : 'pointer',
            }}
            type="button"
          >
            Enviar
          </button>
        )}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
       
      </div>
    </div>
  );
}
