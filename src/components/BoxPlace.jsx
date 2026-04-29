import React from 'react'
import { GrStatusGood } from "react-icons/gr";


function BoxPlace({ nombre_lugar, imagen_lugar, visitado, fecha_visita, fecha_expiracion }) {
  return (
    <div className="flex items-center gap-4 rounded-xl shadow-md p-3 bg-white/90">
      {imagen_lugar && (
        <img src={imagen_lugar} alt={nombre_lugar} className="w-16 h-16 object-cover rounded-lg" />
      )}
      <div className="flex justify-between w-full items-center">
        <div className='mt-2'>
          <p className="font-bold text-texto">{nombre_lugar}</p>
            {fecha_visita ? (
              <p className="text-xs text-gray-500 ">
                Visitado el: {fecha_visita.split('T')[0]}
              </p>
            ) : (
              fecha_expiracion ? (
                <p className="text-xs text-gray-500 ">
                  Tienes hasta: {fecha_expiracion.split('T')[0]}
                </p>
              ) : null
            )}
              {/* PONER FECHA DE CIERRE DE CUENTA */}
        </div>
        <div className="flex flex-col items-end">
          {visitado ? (
            <div className='flex bg-[#F0FDF4]'>
              <GrStatusGood className='text-[#16A34A] mt-1 ml-2' />
              <span className="px-2 py-1 text-xs  text-[#16A34A] font-medium rounded">Visitado</span>
            </div>
          ) : (
            <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded font-medium">Por visitar</span>
          )}
        </div>
      </div>
     
    </div>
  );
}
// FALTA PONER LA FECHA EN QUE SE VA A CERRAR EL PERFIL

export default BoxPlace