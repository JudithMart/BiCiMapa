import React from "react";
import ButtonPink from "../../../shared/components/ButtonPink";

function ChallengeForm({ form, setForm, lugares, onSave }) {
  return (
    <div className="w-full flex flex-col justify-start pl-6 px-5 pb-6">
      <div className="mt-4 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Nombre
        </p>
        <input
          type="text"
          placeholder="Ingrese nombre del reto"
          value={form.nombre}
          maxLength={100}
          onChange={(e) => {
            setForm({
              ...form,
              nombre: e.target.value,
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
          onChange={(e) =>
            setForm({
              ...form,
              descripcion: e.target.value,
            })
          }
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray resize-none"
          placeholder="Describe el reto..."
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
          Visitas requeridas
        </p>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Ingrese la cantidad de visitas"
          value={form.visitas_requeridas}
          onChange={(e) => {
            setForm({
              ...form,
              visitas_requeridas: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col pl-6 px-5">
        <p className="font-semibold">Lugares del reto</p>

        <div className="mt-3 grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
          {lugares.map((lugar) => {
            const seleccionado = form.lugares.includes(lugar.id);

            return (
              <label
                key={lugar.id}
                className="flex items-center gap-2 text-sm bg-gray-200 rounded-lg p-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={seleccionado}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({
                        ...form,
                        lugares: [...form.lugares, lugar.id],
                      });
                    } else {
                      setForm({
                        ...form,
                        lugares: form.lugares.filter((id) => id !== lugar.id),
                      });
                    }
                  }}
                />

                {lugar.nombre}
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Estado
        </p>
        <select
          value={String(form.activo)}
          onChange={(e) =>
            setForm({
              ...form,
              activo: e.target.value === "true",
            })
          }
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className=" mb-8 flex justify-center">
        <ButtonPink
          texto="Guardar cambios"
          px="px-4"
          onClick={() => onSave(form)}
        />
      </div>
    </div>
  );
}

export default ChallengeForm;
