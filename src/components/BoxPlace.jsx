import React from 'react'

function BoxPlace({ nombre_lugar, imagen_lugar, visitado, fecha_visita }) {
  return (
    <div className={`flex items-center gap-4 rounded shadow p-3 ${visitado ? 'bg-green-50' : 'bg-white'}`}>
      {imagen_lugar && (
        <img src={imagen_lugar} alt={nombre_lugar} className="w-16 h-16 object-cover rounded" />
      )}
      <div>
        <p className={`font-semibold ${visitado ? 'text-green-700' : 'text-primary'}`}>{nombre_lugar}</p>
        {visitado ? (
          <>
            <span className="inline-block px-2 py-1 text-xs bg-green-200 text-green-800 rounded">Visitado</span>
            {fecha_visita && <p className="text-xs text-gray-500 mt-1">Visitado el: {fecha_visita}</p>}
          </>
        ) : (
          <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">Por visitar</span>
        )}
      </div>
    </div>
  );
}

export default BoxPlace