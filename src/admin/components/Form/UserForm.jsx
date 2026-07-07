
import ButtonPink from "../../../shared/components/ButtonPink";

function UserForm({ form, setForm, onSave }) {
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
      </div>
      {/* Input numero */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Numero de teléfono
        </p>
        <input
          type="tel"
          placeholder="Ingrese numero de teléfono"
          value={form.telefono}
          onChange={(e) => {
            setForm({
              ...form,
              telefono: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* Input email */}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Email
        </p>
        <input
          type="email"
          placeholder="Ingrese su email"
          value={form.email}
          onChange={(e) => {
            setForm({
              ...form,
              email: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {/* SELECCION DE ROL*/}
      <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
        <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
          Rol
        </p>
        <select
          value={form.rol}
          onChange={(e) => {
            setForm({
              ...form,
              rol: e.target.value,
            });
          }}
          className="font-sans w-full px-3 py-2 rounded-lg  mt-1 border   bg-gray-300 border-colorAdmin_gray  focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
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

export default UserForm;
