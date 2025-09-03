import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function PoliticaDatosModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Texto clickeable */}
      <span
        style={{
          marginLeft: "8px",
          color: "#007BFF",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => setOpen(true)}
      >
        Acepto los términos y condiciones
      </span>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        {/* Fondo oscuro */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Contenedor del modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-2xl w-full rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[80vh]">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-bold">
                Política de Tratamiento de Datos Personales – Test de Finanzas Personales
              </Dialog.Title>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido */}
            <div className="text-sm space-y-4 text-gray-700">
              <p>
                <strong>AXIA FINANZAS PERSONALES S.A.S.</strong> (en adelante
                “Axia”), en cumplimiento de la Ley 1581 de 2012 y normas sobre
                protección de datos personales en Colombia, informa a los
                usuarios del Test de Finanzas Personales lo siguiente:
              </p>

              <div>
                <strong>1. Responsable del tratamiento</strong>
                <ul className="list-disc pl-5">
                  <li>Razón social: Axia Finanzas Personales S.A.S.</li>
                  <li>Correo electrónico: laura.correa@axia.com.co</li>
                </ul>
              </div>

              <div>
                <strong>2. Datos personales objeto de tratamiento</strong>
                <p>Axia podrá recolectar y tratar información como:</p>
                <ul className="list-disc pl-5">
                  <li>Nombre completo</li>
                  <li>Número de identificación</li>
                  <li>Teléfono y/o celular</li>
                  <li>Correo electrónico</li>
                  <li>
                    Información financiera de carácter general (hábitos de
                    ahorro, inversión, deudas, etc.)
                  </li>
                </ul>
              </div>

              <div>
                <strong>3. Finalidades del tratamiento</strong>
                <ul className="list-disc pl-5">
                  <li>
                    Elaborar un diagnóstico sobre la situación financiera del
                    participante.
                  </li>
                  <li>
                    Contactar al titular para brindarle información relacionada
                    con sus resultados.
                  </li>
                  <li>
                    Ofrecer productos, servicios y soluciones de educación y
                    asesoría financiera de Axia.
                  </li>
                  <li>
                    Invitar a eventos, charlas, talleres y demás actividades
                    relacionadas con finanzas personales.
                  </li>
                  <li>
                    Cumplir con obligaciones legales y contractuales aplicables.
                  </li>
                </ul>
              </div>

              <div>
                <strong>4. Derechos del titular de los datos</strong>
                <p>El titular podrá:</p>
                <ul className="list-disc pl-5">
                  <li>Conocer, actualizar y rectificar sus datos personales.</li>
                  <li>Solicitar prueba de la autorización otorgada.</li>
                  <li>Ser informado acerca del uso de sus datos.</li>
                  <li>
                    Presentar quejas ante la SIC por infracciones a la Ley.
                  </li>
                  <li>
                    Revocar la autorización y/o solicitar la supresión del dato
                    cuando no se respeten los principios y garantías legales.
                  </li>
                </ul>
              </div>

              <div>
                <strong>5. Medidas de seguridad</strong>
                <p>
                  Axia adoptará las medidas técnicas, administrativas y humanas
                  necesarias para garantizar la seguridad de la información,
                  evitando su pérdida, alteración, uso no autorizado o acceso
                  indebido.
                </p>
              </div>

              <div>
                <strong>6. Vigencia</strong>
                <p>
                  La presente política rige desde su publicación y los datos
                  permanecerán en nuestras bases mientras sean necesarios para
                  las finalidades descritas o hasta que el titular solicite su
                  supresión.
                </p>
              </div>
            </div>

            {/* Botón de cierre */}
            <div className="mt-6 text-right">
              <button
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
