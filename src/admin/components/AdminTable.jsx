// AdminTable.jsx

import { LuPencil, LuTrash2 } from "react-icons/lu";

function AdminTable({
  columns = [],
  data = [],
  onEdit,
 
  onDeactivate,
}) {
  return (
    <div className="rounded-3xl bg-white/75 border-2 border-primary shadow-md ">

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto max-h-[70vh] overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-5 text-left text-xs uppercase tracking-wider text-gray-500"
                >
                  {column.header}
                </th>
              ))}

              <th className="px-6 py-5 text-left text-xs uppercase tracking-wider text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 hover:bg-white/50 transition"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="px-6 py-5 text-sm text-gray-700 font-sans"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.accessor]}
                  </td>
                ))}

                <td className="px-6 py-5">
                  <div className="flex gap-4">
                    <button
                      onClick={() => onEdit?.(row)}
                      className="text-primary hover:scale-110 transition"
                    >
                      <LuPencil size={18} />
                    </button>

                    <button
                      onClick={() => onDeactivate?.(row)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-10 text-gray-400"
                >
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4 p-4">
        {data.map((row) => (
          <div
            key={row.id}
            className="bg-white rounded-2xl p-4 shadow"
          >
            {columns.map((column) => (
              <div
                key={column.accessor}
                className="flex justify-between py-1"
              >
                <span className="font-medium text-gray-500">
                  {column.header}
                </span>

                <span className="text-gray-700">
                  {column.render
                    ? column.render(row)
                    : row[column.accessor]}
                </span>
              </div>
            ))}

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => onEdit?.(row)}
                className="text-primary"
              >
                <LuPencil size={18} />
              </button>

              <button
                onClick={() =>  onDeactivate?.(row)}
                className="text-red-500"
              >
                <LuTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTable;
