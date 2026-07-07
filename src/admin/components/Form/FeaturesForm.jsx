import ButtonPink from "../../../shared/components/ButtonPink";

function FeaturesForm({ form, setForm, onSave }) {
  return (
    <div className="w-full flex flex-col justify-start pl-6 px-5 pb-6">
      <div className="mt-4 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Título
        </p>

        <input
          type="text"
          placeholder="Ingrese título de la novedad"
          value={form.titulo}
          maxLength={120}
          onChange={(e) => {
            setForm({
              ...form,
              titulo: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Descripción
        </p>

        <textarea
          rows={4}
          value={form.descripcion}
          onChange={(e) => {
            setForm({
              ...form,
              descripcion: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe la novedad..."
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Fecha de inicio
        </p>

        <input
          type="date"
          value={form.fecha_inicio}
          onChange={(e) => {
            setForm({
              ...form,
              fecha_inicio: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Fecha de fin
        </p>

        <input
          type="date"
          value={form.fecha_fin}
          onChange={(e) => {
            setForm({
              ...form,
              fecha_fin: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Estado
        </p>

        <select
          value={String(form.activa)}
          onChange={(e) =>
            setForm({
              ...form,
              activa: e.target.value === "true",
            })
          }
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="true">Activa</option>
          <option value="false">Inactiva</option>
        </select>
      </div>

      <div className="mb-8 flex justify-center">
        <ButtonPink texto="Guardar cambios" px="px-4" onClick={() => onSave(form)} />
      </div>
    </div>
  )
}

export default FeaturesForm