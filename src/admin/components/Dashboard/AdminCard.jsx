import React from "react";

function AdminCard({ icono, descripcion, datos, tiempo }) {
  return (
    <div className=" w-[250px] h-[165px] rounded-[30px] bg-white/75 border border-primary shadow-md px-8 py-7 flex flex-col justify-betwe ">
      <div className="flex justify-between">
        <div className=" w-12 h-12 rounded-2xl bg-colorAdmin_gray flex items-center justify-center text-primary text- ">
          {icono}
        </div>

        {tiempo && <p className="text-gray-400 text-sm">{tiempo}</p>}
      </div>
      <div>
        <p className=" uppercase text-gray-500 text-sm tracking-widest font-semibold">
          {descripcion}
        </p>
        <p className=" mt-1 text-primarytext-4xl font-bold font-sans">
          {datos}
        </p>
      </div>
    </div>
  );
}

export default AdminCard;
