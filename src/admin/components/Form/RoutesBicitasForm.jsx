import React, { useMemo, useState } from 'react'
import ButtonPink from "../../../shared/components/ButtonPink";

function RoutesBicitasForm({ form, setForm, onSave, lugares = [] }) {
  const [openLugares, setOpenLugares] = useState(false);

  const selectedLugares = useMemo(
    () => form.lugaresSeleccionados || [],
    [form.lugaresSeleccionados],
  );

  const availableLugares = useMemo(() => {
    const selectedIds = new Set(selectedLugares.map((lugar) => lugar.id));

    return lugares.filter((lugar) => !selectedIds.has(lugar.id));
  }, [lugares, selectedLugares]);

  const addLugar = (lugar) => {
    setForm({
      ...form,
      lugaresSeleccionados: [
        ...selectedLugares,
        { id: lugar.id, nombre: lugar.nombre, orden: selectedLugares.length + 1 },
      ],
    });
    setOpenLugares(false);
  };

  const removeLugar = (lugarId) => {
    setForm({
      ...form,
      lugaresSeleccionados: selectedLugares.filter((lugar) => lugar.id !== lugarId),
    });
  };

  const updateOrden = (lugarId, orden) => {
    setForm({
      ...form,
      lugaresSeleccionados: selectedLugares.map((lugar) =>
        lugar.id === lugarId ? { ...lugar, orden } : lugar,
      ),
    });
  };

  return (
    <div className="w-full flex flex-col justify-start pl-6 px-5">
      {" "}
      {/* Nombre lugar */}
      <div className="mt-4 w-full flex justify-center pl-6 px-5">
        <p className=" text-primary font-bold text-xl md:text-lg lg:text-xl ">  
        Nombre de la ruta
        </p>
        <input
          type="text"
          placeholder="Ingresa el nombre de la ruta"
          value={form.nombre}
          onChange={(e) => {
            setForm({
              ...form,
              nombre: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* Input descripción */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Descripción
        </p>
        <input
          type="text"
          placeholder="Ingresa una breve descripción del lugar"
          value={form.descripcion}
          onChange={(e) => {
            setForm({
              ...form,
              descripcion: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Orden
        </p>
        <input
          type="number"
          min="1"
          step="1"
          placeholder="Ingresa el orden de la ruta"
          value={form.orden}
          onChange={(e) => {
            setForm({
              ...form,
              orden: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Tiempo estimado
        </p>
        <input
          type="text"
          placeholder="Ej. 45 min"
          value={form.tiempo_estimado}
          onChange={(e) => {
            setForm({
              ...form,
              tiempo_estimado: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Distancia estimada
        </p>
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="Ej. 8.4"
          value={form.distancia_km}
          onChange={(e) => {
            setForm({
              ...form,
              distancia_km: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Lugares
        </p>

        <div className="relative mt-1">
          <button
            type="button"
            onClick={() => setOpenLugares((value) => !value)}
            className="w-full flex items-center justify-between font-sans px-3 py-2 rounded-lg border bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span>
              {availableLugares.length
                ? "Seleccionar lugar"
                : "No hay más lugares disponibles"}
            </span>
            <span className={`transition-transform ${openLugares ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>

          {openLugares && availableLugares.length > 0 && (
            <div className="absolute z-20 mt-2 w-full rounded-lg border border-colorAdmin_gray bg-white shadow-xl max-h-60 overflow-auto">
              {availableLugares.map((lugar) => (
                <button
                  key={lugar.id}
                  type="button"
                  onClick={() => addLugar(lugar)}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left hover:bg-gray-100"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-texto truncate">{lugar.nombre}</p>
                    <p className="text-xs text-gray-500 truncate">{lugar.slogan}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          {selectedLugares.length === 0 ? (
            <p className="text-sm text-gray-500">Aún no agregas lugares a la ruta.</p>
          ) : (
            selectedLugares.map((lugar) => (
              <div
                key={lugar.id}
                className="flex items-center gap-3 rounded-lg border border-colorAdmin_gray bg-white px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-texto truncate">{lugar.nombre}</p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={lugar.orden}
                  onChange={(e) => updateOrden(lugar.id, Number(e.target.value))}
                  className="w-20 rounded-lg border bg-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Orden de ${lugar.nombre}`}
                />

                <button
                  type="button"
                  onClick={() => removeLugar(lugar.id)}
                  className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200"
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
     
  
      {/* SELECCION DE ESTADO ACTIVO O INACTIVO */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
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
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
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

export default RoutesBicitasForm