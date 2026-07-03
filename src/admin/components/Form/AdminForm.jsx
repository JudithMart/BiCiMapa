// src/admin/components/Form/AdminForm.jsx

import ButtonPink from "../../../shared/components/ButtonPink";
import { placeTypes } from "../../../config/placeTypes";
import { uploadPlaceImage } from "../../../services/admin_places.service";

function AdminForm({ form, setForm, onSave }) {
  return (
    <div className="w-full flex flex-col justify-start pl-6 px-5">
      {" "}
      {/* Input nombre */}
      <div className="mt-4 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Nombre
        </p>
        <input
          type="text"
          placeholder="Ingrese nombre completo"
          value={form.nombre}
          maxLength={100}
          onChange={(e) => {
            setForm({
              ...form,

              nombre: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border  bg-gray-300 border-colorAdmin_gray focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {form.imagen_url && (
          <img src={form.imagen_url} className="w-48 rounded-xl mt-4" />
        )}
      </div>
      {/* Input Imagen */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5 ">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Imagen
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];

            if (!file) return;

            const imageUrl = await uploadPlaceImage(file);

            setForm({
              ...form,
              imagen: file,
              imagen_url: imageUrl,
            });
          }}
        />
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
      {/* Input slogan */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Slogan
        </p>
        <input
          type="text"
          placeholder="Ingrese el slogan del lugar"
          value={form.slogan}
          onChange={(e) => {
            setForm({
              ...form,
              slogan: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* Input latitud */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Latitud
        </p>
        <input
          type="text"
          placeholder="Ingrese la latitud del lugar"
          value={form.latitud}
          onChange={(e) => {
            setForm({
              ...form,
              latitud: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* Input longitud */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Longitud
        </p>
        <input
          type="text"
          placeholder="Ingrese la longitud del lugar"
          value={form.longitud}
          onChange={(e) => {
            setForm({
              ...form,
              longitud: e.target.value,
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
      {/* SELECCION DE TIPO */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Tipo
        </p>
        <select
          value={form.id_tipo}
          onChange={(e) =>
            setForm({
              ...form,
              id_tipo: Number(e.target.value),
            })
          }
          className="font-sans w-full px-3 py-2 rounded-lg mt-1 border bg-gray-300 border-colorAdmin_gray"
        >
          {Object.entries(placeTypes).map(([id, type]) => (
            <option key={id} value={id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      {/* MOSTRAR ICONO EN EL MAPA  */}
      <div className="mt-5 w-full flex flex-col pl-6 px-5">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Visibilidad
        </p>

        <div className="flex justify-between items-center mt-2 rounded-xl bg-gray-300 px-4 py-3">
          <div>
            <p className="font-medium">Mostrar en el mapa</p>

            <p className="text-xs text-gray-600">
              Si se desactiva, solo aparecerá al iniciar una ruta.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                visible_mapa: !form.visible_mapa,
              })
            }
            className={`relative w-12 h-6 rounded-full transition
      ${form.visible_mapa ? "bg-green-500" : "bg-gray-400"}`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition
        ${form.visible_mapa ? "right-1" : "left-1"}`}
            />
          </button>
        </div>
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

export default AdminForm;
