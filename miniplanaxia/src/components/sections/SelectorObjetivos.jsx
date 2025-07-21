import React, { useState, useEffect } from 'react';

export default function SelectorObjetivos({ onNext, formData }) {
  const opciones = [
    'Educación universitaria de mis hijos',
    'Viajar cada año',
    'Libertad financiera',
    'Pensionarme joven',
    'Salir de las deudas',
    'Invertir',
    'Proteger mi dinero ante cualquier riesgo',
    'Ahorrar impuestos',
  ];

  // Inicializar con datos previos si existen en formData
  const [objetivos, setObjetivos] = useState(formData.objetivos || []);

  const toggleObjetivo = (item) => {
    setObjetivos((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ objetivos });  // Pasamos solo esta sección
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <fieldset style={{ border: '1px solid #ccc', padding: '1rem' }}>
        <legend style={{ fontWeight: 'bold' }}>
          Escoge qué objetivos quisieras trabajar:
        </legend>
        {opciones.map((item) => (
          <label key={item} style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={objetivos.includes(item)}
              onChange={() => toggleObjetivo(item)}
              style={{ marginRight: '0.5rem' }}
            />

            <strong>{item}</strong>
          </label>
        ))}
      </fieldset>

      <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Siguiente
      </button>
    </form>
  );
}
