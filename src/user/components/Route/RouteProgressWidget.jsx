// src/user/components/RouteProgressWidget.jsx
import React from "react";
import { LuBike } from "react-icons/lu";
import { MdChevronRight } from "react-icons/md";

function RouteProgressWidget({ bicitasProgress, onClick }) {
  if (!bicitasProgress) return null;

  const total = bicitasProgress.ruta?.ruta_lugar?.length || 0;
  const completadas = bicitasProgress.puntoActual - 1;
  const porcentaje = total ? Math.round((completadas * 100) / total) : 0;
  const siguienteNombre = bicitasProgress.lugarActual?.nombre;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 left-4 right-4 z-40 mx-auto max-w-[500px]
                 flex items-center gap-3 bg-white/95 backdrop-blur-md
                 rounded-full px-4 py-3 shadow-xl border border-white/70
                 active:scale-[0.98] transition-transform"
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#B57A86]/10 shrink-0">
        <LuBike className="text-[#B57A86]" size={20} />
      </div>

      <div className="flex-1 min-w-0 text-left">
        <p className="text-xs text-[#4A565B] font-medium truncate">
          {completadas} de {total} · Siguiente: {siguienteNombre || "—"}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div
            className="bg-[#B57A86] h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>

      <MdChevronRight className="text-gray-400 shrink-0" size={20} />
    </button>
  );
}

export default RouteProgressWidget;