// src/user/components/Route/RouteProgressWidget.jsx
import React from "react";
import { LuBike } from "react-icons/lu";
import { MdChevronRight, MdClose } from "react-icons/md";

function RouteProgressWidget({ bicitasProgress, onClick, onCancel }) {
  if (!bicitasProgress) return null;

  const total = bicitasProgress.ruta?.ruta_lugar?.length || 0;
  const completadas = bicitasProgress.puntoActual - 1;
  const porcentaje = total ? Math.round((completadas * 100) / total) : 0;
  const siguienteNombre = bicitasProgress.lugarActual?.nombre;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-40 mx-auto max-w-[500px]">
      <div className="relative flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full pl-4 pr-2 py-3 shadow-xl border border-white/70">
        <button
          onClick={onClick}
          className="flex items-center gap-3 flex-1 min-w-0 text-left active:scale-[0.98] transition-transform"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#B57A86]/10 shrink-0">
            <LuBike className="text-[#B57A86]" size={20} />
          </div>

          <div className="flex-1 min-w-0">
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

        {/* NUEVO: botón cancelar */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCancel?.();
          }}
          className="flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 shrink-0"
          aria-label="Cancelar ruta"
        >
          <MdClose size={16} />
        </button>
      </div>
    </div>
  );
}

export default RouteProgressWidget;