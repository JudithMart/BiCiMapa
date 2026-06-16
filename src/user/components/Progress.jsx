import React from 'react'
import { LuBike } from "react-icons/lu";

function Progress({
  completadas,
  total,
  porcentaje,
  mostrarTexto = true,
  texto = "lugares visitados",
  mostrarTitulo = true,
  titulo = "Recorrido",
  colorTexto,
  tamanoTexto
}) {
  return (
       <div >
              <div className="flex gap-20 ">
                {mostrarTitulo && <p className="text-texto font-bold ">{titulo}</p>}
                <p className={`text-${colorTexto} font-normal text-${tamanoTexto}`}>
                  {completadas} de {total} lugares {texto}
                </p>
              </div>
              {/* Barra de progreo */}
              <div className="relative w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                  className="bg-primary/60 h-4 rounded-full"
                  style={{
                    width: `${porcentaje}%`,
                  }}
                ></div>
                {/* Icono de la bici avanzando */}
                <div
                  className="absolute bottom-0 -translate-y-1/2"
                  style={{
                    left: `calc(${porcentaje}% - 16px)`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <LuBike size={32} className="text-primary drop-shadow-lg" />
                </div>
              </div>
              {mostrarTexto && (
                total - completadas === 0 ? (
                  <p className="font-light text-texto mt-3 text-sm text-center">
                    Felicidades completaste el reto ve a{" "}
                    <span className="text-primary font-semibold">BiCitas</span> y
                    reclama tu premio
                  </p>
                ) : (
                  <p className="font-light text-texto mt-3 text-sm">
                    Visita{" "}
                    <span className="font-semibold">
                      {" "}
                      {total - completadas} lugares más
                    </span>{" "}
                    y obten una promo en
                    <span className="text-primary font-semibold "> BiCitas</span>
                  </p>
                )
              )}
            </div>
  )
}

export default Progress