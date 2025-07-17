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
      hint: 'Ejemplo: Cuenta AFC, fondo de empleados, pensiones voluntarias.',
      field: 'ahorroMensual',
    },
    {
      label: '¿Cuánto gastas en transporte mensualmente?',
      hint: 'Ejemplo: taxis, bus, gasolina, parqueaderos.',
      field: 'transporte',
    },
    {
      label: '¿Cuánto gastas en cuidado personal?',
      hint: 'Ejemplo: celular, ropa, hobbies, medicamentos, peluquería, terapias.',
      field: 'cuidadoPersonal',
    },
    {
      label: '¿Cuánto gastas en comida entre semana?',
      hint: 'Ejemplo: almuerzos en oficina.',
      field: 'comidaOficina',
    },
    {
      label: '¿Cuánto gastas en tu hogar?',
      hint: 'Ejemplo: arriendo, servicios, mercado, administración, mascotas.',
      field: 'gastosHogar',
    },
    {
      label: '¿Cuánto gastas en entretenimiento?',
      hint: 'Ejemplo: cine, restaurantes, salidas sociales.',
      field: 'entretenimiento',
    },
    {
      label: '¿Pagas seguros mensualmente?',
      hint: 'Ejemplo: medicina prepagada, seguro de vida, salud, carro.',
      field: 'segurosMensuales',
    },
    {
      label: '¿Pagas cursos mensualmente?',
      hint: 'Ejemplo: cursos de inglés, yoga, talleres, educación.',
      field: 'cursos',
    },
    {
      label: '¿Tienes hijos? ¿Cuánto gastas en ellos mensualmente?',
      hint: 'Ejemplo: colegio, transporte, mesada, niñera, ropa, psicólogo.',
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
