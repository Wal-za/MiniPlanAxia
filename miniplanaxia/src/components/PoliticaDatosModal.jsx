import React, { useState } from "react";

export default function PoliticaDatosModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Texto clickeable para abrir modal */}
      <span
        style={{ color: "blue", textDecoration: "underline", cursor: "pointer", marginLeft: 8 }}
        onClick={() => setIsOpen(true)}
      >
        Acepto los términos y condiciones
      </span>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 10000,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
          onClick={() => setIsOpen(false)} // cerrar modal al hacer click fuera del contenido
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 0,
              maxWidth: 600,
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 24,
              position: "relative",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()} // evitar que el click dentro cierre el modal
          >
            {/* Botón cerrar */}
           

            {/* Título */}
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>
              Política de Tratamiento de Datos Personales – Test de Finanzas Personales
            </h2>

            {/* Contenido */}
            <div style={{ fontSize: 14, color: "#444", lineHeight: 1.5 }}>
              <p><strong>AXIA FINANZAS PERSONALES S.A.S.</strong> (en adelante “Axia”), en cumplimiento de la Ley 1581 de 2012 y normas sobre protección de datos personales en Colombia, informa a los usuarios del Test de Finanzas Personales lo siguiente:</p>
              
              <h3>1. Responsable del tratamiento</h3>
              <ul>
                <li>Razón social: Axia Finanzas Personales S.A.S.</li>
                <li>Correo electrónico: laura.correa@axia.com.co</li>
              </ul>

              <h3>2. Datos personales objeto de tratamiento</h3>
              <p>Axia podrá recolectar y tratar información como:</p>
              <ul>
                <li>Nombre completo</li>
                <li>Número de identificación</li>
                <li>Teléfono y/o celular</li>
                <li>Correo electrónico</li>
                <li>Información financiera de carácter general (hábitos de ahorro, inversión, deudas, etc.)</li>
              </ul>

              <h3>3. Finalidades del tratamiento</h3>
              <ul>
                <li>Elaborar un diagnóstico sobre la situación financiera del participante.</li>
                <li>Contactar al titular para brindarle información relacionada con sus resultados.</li>
                <li>Ofrecer productos, servicios y soluciones de educación y asesoría financiera de Axia.</li>
                <li>Invitar a eventos, charlas, talleres y demás actividades relacionadas con finanzas personales.</li>
                <li>Cumplir con obligaciones legales y contractuales aplicables.</li>
              </ul>

              <h3>4. Derechos del titular de los datos</h3>
              <p>El titular podrá:</p>
              <ul>
                <li>Conocer, actualizar y rectificar sus datos personales.</li>
                <li>Solicitar prueba de la autorización otorgada.</li>
                <li>Ser informado acerca del uso de sus datos.</li>
                <li>Presentar quejas ante la SIC por infracciones a la Ley.</li>
                <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios y garantías legales.</li>
              </ul>

              <h3>5. Medidas de seguridad</h3>
              <p>Axia adoptará las medidas técnicas, administrativas y humanas necesarias para garantizar la seguridad de la información, evitando su pérdida, alteración, uso no autorizado o acceso indebido.</p>

              <h3>6. Vigencia</h3>
              <p>La presente política rige desde su publicación y los datos permanecerán en nuestras bases mientras sean necesarios para las finalidades descritas o hasta que el titular solicite su supresión.</p>
            </div>

            {/* Botón Cerrar inferior */}
            <div style={{ textAlign: "right", marginTop: 24 }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: "#2563EB",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
