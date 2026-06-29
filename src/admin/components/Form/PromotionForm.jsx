//promotionForm.jsx
import React from "react";
import ButtonPink from "../../../shared/components/ButtonPink";
import AdminLugarSelector from "../AdminLugarSelector";


function PromotionForm({ form, setForm, onSave, lugares }) {
  return (
    <div className="w-full flex flex-col justify-start pl-6 px-5">
      {" "}
      {/* Nombre lugar */}
      <div className="mt-4 w-full flex justify-center pl-6 px-5">
        <AdminLugarSelector
          lugares={lugares}
          value={form.id_lugar}
          onChange={(lugar) =>
            setForm({
              ...form,
              id_lugar: lugar.id,
              nombreLugar: lugar.nombre,
            })
          }
        />
        {/* <p className=" text-primary font-bold text-xl md:text-lg lg:text-xl ">
          {form.nombreLugar ? form.nombreLugar : "Nombre del lugar"}
        </p> */}
      </div>
      {/* Input descripción */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Descripción
        </p>
        <input
          type="text"
          placeholder="Ingresa una breve descripción del lugar"
          value={form.descripcion}
          onChange={(e) => {
            setForm({
              ...form,
              descripcion: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* Input descripción */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Descuento
        </p>
        <input
          type="text"
          placeholder="Ingresa el descuento de la promoción"
          value={form.descuento}
          onChange={(e) => {
            setForm({
              ...form,
              descuento: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* SELECCION DE ESTADO ACTIVO O INACTIVO */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Estado
        </p>
        <select
          value={String(form.activo)}
          onChange={(e) =>
            setForm({
              ...form,
              activo: e.target.value === "true",
            })
          }
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>
      <div className=" mb-8 flex justify-center">
        <ButtonPink
          texto="Guardar cambios"
          px="px-4"
          onClick={() => onSave(form)}
        />
      </div>
    </div>
  );
}

export default PromotionForm;
