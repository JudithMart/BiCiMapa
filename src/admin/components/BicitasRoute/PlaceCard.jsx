import { LuArrowUp, LuArrowDown, LuTrash2 } from "react-icons/lu";

function PlaceCard({ lugar, index, total, onMoveUp, onMoveDown, onDelete }) {
  console.log(lugar);
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-texto truncate">{lugar.nombre}</p>

        <p className="text-xs text-gray-500 mt-1">Orden #{lugar.orden}</p>

        {lugar.visible_mapa ? (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
            Visible en ruta
          </span>
        ) : (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
            Visible en mapa
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={index === 0}
          onClick={onMoveUp}
          className={`
            p-2 rounded-lg transition
            ${
              index === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary/10 text-primary"
            }
          `}
        >
          <LuArrowUp size={18} />
        </button>

        <button
          type="button"
          disabled={index === total - 1}
          onClick={onMoveDown}
          className={`
            p-2 rounded-lg transition
            ${
              index === total - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-primary/10 text-primary"
            }
          `}
        >
          <LuArrowDown size={18} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="p-2 rounded-lg text-red-500 hover:bg-red-100 transition"
        >
          <LuTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default PlaceCard;
