import { IoClose } from "react-icons/io5";


function UserVisit({ user, visits, loading, error, onClose }) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
          <div>
            <h2 className="font-bold text-texto text-lg">{user.nombre}</h2>
            <p className="text-xs text-gray-500">{user.telefono}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Cerrar"
          >
            <IoClose />
          </button>
        </div>

        {/* Lista de lugares visitados */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {error ? (
            <p className="text-sm text-red-500 text-center py-8">{error}</p>
          ) : loading ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Cargando visitas...
            </p>
          ) : visits.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Este usuario aún no tiene visitas registradas.
            </p>
          ) : (
            visits.map((lugar) => (
              <div key={lugar.id} className="border rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-semibold text-texto">
                    {lugar.nombre}
                  </p>
                  <p className="text-xs text-gray-500 text-right shrink-0 ml-2">
                    {lugar.ultima_visita
                      ? new Date(lugar.ultima_visita).toLocaleDateString(
                          "es-MX",
                          { day: "2-digit", month: "short", year: "numeric" },
                        )
                      : "Sin fecha"}
                  </p>
                </div>

                <div className="flex gap-4 mt-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Total
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {lugar.visitas_totales}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Este mes
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {lugar.visitas_mes}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserVisit;