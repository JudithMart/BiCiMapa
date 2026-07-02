import { useMemo, useState } from "react";
import { LuChevronDown, LuSearch } from "react-icons/lu";

function PlaceSelector({
  lugares = [],
  selectedLugares = [],
  onAddLugar,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const availablePlaces = useMemo(() => {
    const selectedIds = new Set(selectedLugares.map((l) => l.id));

    return lugares.filter((lugar) => {
      if (selectedIds.has(lugar.id)) return false;

      return lugar.nombre
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [lugares, selectedLugares, search]);

  return (
    <div className="relative">

      {/* Botón */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center rounded-xl bg-gray-200 px-4 py-3 border border-colorAdmin_gray hover:bg-gray-300 transition"
      >
        <span className="font-medium">
          Agregar lugar
        </span>

        <LuChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full rounded-xl bg-white shadow-xl border border-gray-200 z-50">

          {/* Buscador */}

          <div className="p-3 border-b">

            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3">

              <LuSearch />

              <input
                type="text"
                placeholder="Buscar lugar..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-transparent py-2 outline-none"
              />

            </div>

          </div>

          {/* Lista */}

          <div className="max-h-72 overflow-y-auto">

            {availablePlaces.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No hay lugares disponibles
              </p>
            ) : (
              availablePlaces.map((lugar) => (
                <button
                  key={lugar.id}
                  type="button"
                  onClick={() => {
                    onAddLugar(lugar);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-primary/10 transition border-b last:border-b-0"
                >
                  <p className="font-semibold">
                    {lugar.nombre}
                  </p>

                  <p className="text-xs text-gray-500 truncate">
                    {lugar.slogan}
                  </p>
                </button>
              ))
            )}

          </div>

        </div>
      )}
    </div>
  );
}

export default PlaceSelector;