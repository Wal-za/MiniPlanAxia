import { useState } from 'react';
import SelectorObjetivos from './SelectorObjetivos'; // Ajusta la ruta según sea necesario

export default function MetasFinancieras({ onNext, formData }) {
  const [edadPension, setEdadPension] = useState(formData.edadPension || '');
  const [montoPension, setMontoPension] = useState(formData.montoPension || '');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ edadPension, montoPension,  });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ¿A qué edad te quieres pensionar?
        <input
          type="number"
          placeholder='Escribe aquí tu respuesta...'
          value={edadPension}
          onChange={(e) => setEdadPension(e.target.value)}
        />
      </label>
      <label>
        ¿Con cuánto?
        <input
          type="number"
           placeholder='Escribe aquí tu respuesta...'
          value={montoPension}
          onChange={(e) => setMontoPension(e.target.value)}
        />
      </label>      

      <br />
      <button type="submit">Continuar</button>
    </form>
  );
}
