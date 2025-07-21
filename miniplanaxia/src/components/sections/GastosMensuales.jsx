import { useState } from 'react';

function GastosMensuales({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    ahorroMensual: formData.ahorroMensual || '',
    transporte: formData.transporte || '',
    cuidadoPersonal: formData.cuidadoPersonal || '',
    comidaOficina: formData.comidaOficina || '',
    gastosHogar: formData.gastosHogar || '',
    entretenimiento: formData.entretenimiento || '',
    segurosMensuales: formData.segurosMensuales || '',
    cursos: formData.cursos || '',
    hijos: formData.hijos || '',
  });

  const preguntas = [
    {
      label: '¿Realizas algún tipo de ahorro mensual?',
      hint: 'Cuenta AFC, fondo de empleados, pensiones voluntarias, Si es así, pon la sumatoria del valor mensual',
      field: 'ahorroMensual',
    },
    {
      label: '¿Cuánto gastas en transporte mensualmente?',
      hint: 'Ejemplo: sumatoria de taxis, bus, gasolina, otros',
      field: 'transporte',
    },
    {
      label: '¿Cuánto gastas en cuidado personal?',
      hint: 'Sumatoria de  celular, ropa, hobbies, medicamentos, peluquería, terapias, etc.',
      field: 'cuidadoPersonal',
    },
    {
      label: '¿Cuánto gastas en comida entre semana?',
      hint: 'Sumatoria de almuerzos mensuales en la oficina.',
      field: 'comidaOficina',
    },
    {
      label: '¿Cuánto gastas en tu hogar?',
      hint: 'incluyendo administración o arriendo, mercados, gas, luz, agua, servicio doméstico, domicilios, mascota',
      field: 'gastosHogar',
    },
    {
      label: '¿Cuánto gastas en entretenimiento?',
      hint:  'Sumatoria de Salidas a cine, rumba, restaurantes',
      field: 'entretenimiento',
    },
    {
      label: '¿Pagas seguros mensualmente?',
      hint:  'Si es así pon el valor mensual de estos seguros. Ejemplo: Sumatoria de Medicina prepagada, seguro de vida, seguro de salud, seguro del carro. ',
      field: 'segurosMensuales',
    },
    {
      label: '¿Pagas cursos mensualmente?',
      hint:  'Sumatoria de Cursos de inglés, talleres, yoga, educativos.. Pon el valor mensual destinado.',
      field: 'cursos',
    },
    {
      label: '¿Tienes hijos? ¿Cuánto gastas en ellos mensualmente?',
      hint:  'Si respondiste que sí, anota el valor mensual de los gastos destinados a ellos. Ejemplo: Sumatoria de Colegio, transporte, mesada, cursos extracurriculares, pañales, leche, niñera, ropa, psicólogo.',
      field: 'hijos',
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
        <p className="hint">{preguntas[step].hint}</p>
        <input
          type="number"
          placeholder='Escribe aquí tu respuesta...'
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

export default GastosMensuales;
