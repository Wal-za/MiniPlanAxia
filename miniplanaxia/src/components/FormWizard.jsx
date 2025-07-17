import { useState } from 'react';
import DatosPersonales from './sections/DatosPersonales';
import InformacionLaboral from './sections/InformacionLaboral';
import MetasFinancieras from './sections/MetasFinancieras';
import Ingresos from './sections/Ingresos';
import GastosMensuales from './sections/GastosMensuales';
import GastosAnuales from './sections/GastosAnuales';
import Deudas from './sections/Deudas';
import Impuestos from './sections/Impuestos';
import Patrimonio from './sections/patrimonio';

const sections = [
  DatosPersonales,
  InformacionLaboral,
  MetasFinancieras,
  Ingresos,
  GastosMensuales,
  GastosAnuales,
  Deudas,
  Impuestos,
  Patrimonio,
];

export default function FormWizard() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const CurrentSection = sections[sectionIndex];

  const nextSection = (sectionData) => {
    setFormData(prev => ({ ...prev, ...sectionData }));
    if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
    } else {
      console.log('Formulario completo:', { ...formData, ...sectionData });
      alert('¡Formulario completo! Ver consola.');
    }
  };

  return (
    <div>
      <h2>Mini Plan Financiero</h2>
      
      <CurrentSection onNext={nextSection} formData={formData} />
    </div>
  );
}
