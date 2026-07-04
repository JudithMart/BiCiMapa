import React from "react";

function AdminCard({ icono, descripcion, datos }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">

      <div className="flex items-center justify-between">

        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
          {icono}
        </div>

        <p className="text-3xl font-bold text-primary">
          {datos}
        </p>

      </div>

      <p className="mt-5 text-gray-500 uppercase text-sm tracking-wide">
        {descripcion}
      </p>

    </div>
  );
}

export default AdminCard;
