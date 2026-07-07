function RouteInfo({ form, setForm }) {
  return (
    <div>

      <h2 className="text-primary text-center font-normal text-xl mb-6">
        Información de la ruta
      </h2>

      {/* Nombre */}

      <div className="mb-5">
        <label className="block font-semibold text-texto mb-2">
          Nombre
        </label>

        <input
          type="text"
          value={form.nombre}
          placeholder="Nombre de la ruta"
          onChange={(e) =>
            setForm({
              ...form,
              nombre: e.target.value,
            })
          }
          className="font-sans w-full rounded-xl bg-gray-200 border border-colorAdmin_gray px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Descripción */}

      <div className="mb-5">
        <label className="block font-semibold text-texto mb-2">
          Descripción
        </label>

        <textarea
          rows={4}
          value={form.descripcion}
          placeholder="Describe brevemente la ruta..."
          onChange={(e) =>
            setForm({
              ...form,
              descripcion: e.target.value,
            })
          }
          className="font-sans w-full rounded-xl bg-gray-200 border border-colorAdmin_gray px-4 py-3 resize-none focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Tiempo */}

      <div className="mb-5">
        <label className="block font-semibold text-texto mb-2">
          Tiempo estimado
        </label>

        <input
          type="text"
          value={form.tiempo_estimado}
          placeholder="Ej. 45 min"
          onChange={(e) =>
            setForm({
              ...form,
              tiempo_estimado: e.target.value,
            })
          }
          className="font-sans w-full rounded-xl bg-gray-200 border border-colorAdmin_gray px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Distancia */}

      <div className="mb-5">
        <label className="block font-semibold text-texto mb-2">
          Distancia aproximada (km)
        </label>

        <input
          type="number"
          min="0"
          step="0.1"
          value={form.distancia_km}
          placeholder="Ej. 8.5"
          onChange={(e) =>
            setForm({
              ...form,
              distancia_km: e.target.value,
            })
          }
          className="font-sans w-full rounded-xl bg-gray-200 border border-colorAdmin_gray px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
        />
      </div>

      {/* Estado */}

      <div className="mb-5">
        <label className="block font-semibold text-texto mb-2">
          Estado
        </label>

        <select
          value={String(form.activa)}
          onChange={(e) =>
            setForm({
              ...form,
              activa: e.target.value === "true",
            })
          }
          className="font-sans w-full rounded-xl bg-gray-200 border border-colorAdmin_gray px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="true">Activa</option>
          <option value="false">Inactiva</option>
        </select>
      </div>

    </div>
  );
}

export default RouteInfo;