import { useState } from 'react';

function Deudas({ onNext, formData }) {
  const [step, setStep] = useState(0);
  const [localData, setLocalData] = useState({
    totalDeudasMensuales: formData.totalDeudasMensuales || '',
    otrosGastosMensuales: formData.otrosGastosMensuales || '',
  });

  const handleNext = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      onNext(localData);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
      {step === 0 && (
        <label>
          ¿Cuánto destinas de manera mensual a todas las cuotas de tus deudas?
          <p className="hint">
            Incluye: tarjetas de crédito, créditos de libre inversión, vehicular, personales, hipotecario, leasing.
          </p>
          <input
            type="number"
            value={localData.totalDeudasMensuales}
            onChange={(e) => setLocalData({ ...localData, totalDeudasMensuales: e.target.value })}
          />
        </label>
      )}
      {step === 1 && (
        <label>
          ¿Tienes otros gastos mensuales?
          <p className="hint">
            Ejemplo: ayuda a familiares, diezmos, donaciones, arriendos de oficina, asistente, soporte a tu cónyuge, celular de familiares.
          </p>
          <input
            type="number"
            value={localData.otrosGastosMensuales}
            onChange={(e) => setLocalData({ ...localData, otrosGastosMensuales: e.target.value })}
          />
        </label>
      )}
      <br />
      <button type="submit">{step < 1 ? 'Siguiente' : 'Continuar'}</button>
    </form>
  );
}

export default Deudas;
