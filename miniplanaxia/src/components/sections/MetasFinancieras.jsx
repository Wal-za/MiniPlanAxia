import { useState } from 'react';

export default function MetasFinancieras({ onNext, formData }) {
  const [edadPension, setEdadPension] = useState(formData.edadPension || '');
  const [montoPension, setMontoPension] = useState(formData.montoPension || '');
  const [objetivos, setObjetivos] = useState(formData.objetivos || []);

  const opciones = [
    'Educación universitaria de mis hijos',
    'Viajar cada año',
    'Libertad financiera',
    'Pensionarme joven',
    'Salir de las deudas',
    'Invertir',
    'Proteger mi dinero ante cualquier riesgo',
    'Ahorrar impuestos'
  ];

  const toggleObjetivo = (item) => {
    setObjetivos(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ edadPension, montoPension, objetivos });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ¿A qué edad te quieres pensionar?
        <input
          type="number"
          value={edadPension}
          onChange={(e) => setEdadPension(e.target.value)}
        />
      </label>
      <label>
        ¿Con cuánto?
        <input
          type="number"
          value={montoPension}
          onChange={(e) => setMontoPension(e.target.value)}
        />
      </label>
      <fieldset>
        <legend>Escoge qué objetivos quisieras trabajar:</legend>
        {opciones.map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={objetivos.includes(item)}
              onChange={() => toggleObjetivo(item)}
            />
            {item}
          </label>
        ))}
      </fieldset>
      <br />
      <button type="submit">Continuar</button>
    </form>
  );
}
