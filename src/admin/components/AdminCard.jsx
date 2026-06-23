import React from "react";

function AdminCard({icono,  descripcion, datos, tiempo}) {
  return (
    <div className="flex flex-col gap-3 justify-start rounded-3xl bg-white/75  border-2 px-10 py-10 border-primary  shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center
         bg-colorAdmin_gray rounded-xl h-10 w-10 text-primary text-xl">
          {icono}
        </div>
        <p className="text-primary font-bold">{tiempo}</p>
      </div>

      <p className="text-texto font-semibold text-xl uppercase">{descripcion}</p>
      
      <p className="text-2xl font-bold text-primary font-sans">{datos}</p>
    </div>
  );
}

export default AdminCard;
