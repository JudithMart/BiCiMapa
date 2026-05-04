import React from "react";

function CouponsC({ promociones }) {
  return (
    <div
      className="relative flex items-center flex-col w-full h-screen
         bg-cover bg-center "
      style={{ backgroundImage: "url('/Fondos/FondoCafe.png')" }}
    >
      <div
        className="py-8  mt-1 w-full bg-[#ffffff]/75 flex items-center rounded-b-2xl 
      shadow-lg "
      >
        <div className=" rounded-full w-40 h-[85px]  ">
          <img
            className="bg-cover  h-full w-full"
            src="\Avatar\Avatar.png"
          ></img>
        </div>
        <div>
          <p className="text-texto -ml-5 text-2xl font-bold">Promociones de 
            <br/> <span className="text-primary font-light">{promociones[0]?.lugar?.nombre || "Lugar"}</span></p>
        </div>
      </div>
    </div>
  );
}

export default CouponsC;
