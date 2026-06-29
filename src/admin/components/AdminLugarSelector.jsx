import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CiSearch } from "react-icons/ci";

function AdminLugarSelector({
  lugares,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = lugares.find((l) => l.id === value);

  const filtered = lugares.filter(
    (l) =>
      l.nombre.toLowerCase().includes(search.toLowerCase()) ||
      l.slogan.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full relative  ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gray-200 rounded-xl px-4 py-3 flex justify-between items-center "
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img
              src={selected.imagen_url}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="text-left">
              <p className="font-semibold">{selected.nombre}</p>
            </div>
          </div>
        ) : (
          "Seleccionar lugar"
        )}
        <ChevronDown
          className={`transition-transform text-texto ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 rounded-xl bg-gray-200 shadow-xl border ">
          <div className="relative">
            <CiSearch className="absolute left-3 top-3 text-gray-400 " />
            <input
              placeholder="Buscar lugar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-10 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          />
          </div>

          {filtered.map((lugar) => (
            <div
              key={lugar.id}
              onClick={() => {
                onChange(lugar);

                setOpen(false);

                setSearch("");
              }}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={lugar.imagen_url}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-normal font-sans">{lugar.nombre}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminLugarSelector;
