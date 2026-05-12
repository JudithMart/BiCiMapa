import React from "react";

function BoxVerification({ nombreLugar, descripcion, descuento, imagenLugar }) {
  return (
    <div className="flex items-center gap-4 rounded-xl shadow-md p-3 bg-white/90">
      {imagenLugar && (
        <img
          src={imagenLugar}
          alt={nombreLugar}
          className="w-16 h-16 object-cover rounded-lg"
        />
      )}
     
        <div className="flex flex-col   items-start">
          <p className="font-bold text-texto ">{nombreLugar}</p>
          <p className="font-light text-texto text-sm ">{descuento}</p>

      
      </div>
    </div>
  );
}

export default BoxVerification;
