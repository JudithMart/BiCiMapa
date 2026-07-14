import { IoClose, IoDocumentTextOutline } from "react-icons/io5";

/**
 * Modal que muestra el detalle de visitas de un usuario.
 *
 * Props:
 * - user: objeto usuario (nombre, telefono, ...) o null si está cerrado
 * - visits: array de visitas [{ id, fecha_visita, lugar: { nombre } }, ...]
 *           -> ajusta las keys a la forma real que devuelve tu lógica
 * - loading: boolean mientras se cargan las visitas
 * - onClose: cierra el modal
 * - onDownloadPdf: genera y descarga el PDF del mes
 */
function UserVisit({ user, visits, loading, onClose, onDownloadPdf }) {
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

        {/* Lista de visitas */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {loading ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Cargando visitas...
            </p>
          ) : visits.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              Este usuario aún no tiene visitas registradas este mes.
            </p>
          ) : (
            visits.map((visita) => (
              <div
                key={visita.id}
                className="border rounded-xl p-3 flex justify-between items-center"
              >
                <p className="text-sm font-semibold text-texto">
                  {visita.lugar?.nombre}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(visita.fecha_visita).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer con descarga de PDF */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={onDownloadPdf}
            disabled={loading || visits.length === 0}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white py-2 font-semibold disabled:opacity-40"
          >
            <IoDocumentTextOutline />
            Descargar reporte del mes (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserVisit;