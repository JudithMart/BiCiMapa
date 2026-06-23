
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonPink from "./ButtonPink";


function AdminUserModal({onClose, nombre, email, telefono, rol, activo, }) {
  return (
    <div className="h-dvh flex items-center justify-center bg-gray-400 overflow-hidden">
      <div
        className="relative flex flex-col
  w-80 md:w-[650px]
  max-h-[90dvh] overflow-y-auto
  rounded-2xl shadow-lg bg-cover bg-center"
      
      >
        {/* Botón de cerrar modal */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-primary
              text-3xl font-bold z-30 
              "
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
        {/* Overlay rosa */}
        <div className="absolute inset-0 bg-secundary opacity-25 rounded-2xl z-10 pointer-events-none"></div>
        <div className="relative z-20 w-full flex flex-col items-center">
          <div
            className="flex items-center w-24 h-24 rounded-3xl bg-cover bg-center mt-20"
            style={{ backgroundImage: "url('/Logo_blanco.webp')" }}
          ></div>
          {/* Mensaje visual de error, éxito o bloqueo */}
          {/* {mensaje && (
            <div
              className={`w-full  px-4 py-1 rounded text-[12px] font-semibold text-center
              ${tipoMensaje === "error" ? "bg-red-100 text-red-700 border border-red-300" : ""}
              ${tipoMensaje === "block" ? "bg-yellow-100 text-yellow-800 border border-yellow-300" : ""}
            `}
            >
              {tipoMensaje === "block" && bloqueado ? (
                <>
                  {mensaje} <br />
                </>
              ) : (
                mensaje
              )}
            </div>
          )} */}
    {/* Input nombre */}
          <div className="mt-8 w-full flex flex-col justify-start pl-6 px-5">
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">Nombre</p>
            <input
              type="text"
              placeholder="Ingrese nombre completo"
              value={nombre}
              maxLength={100}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {/* Input numero */}
          <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">Numero de teléfono</p>
            <input
              type="tel"
              placeholder="Ingrese numero de teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {/* Input email */}
          <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">Email</p>
            <input
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
            {/* SELECCION DE ROL*/}

            <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
              <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">Rol</p>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            {/* sELECCION DE ESTADO ACTIVO O INACTIVO */}
            <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
              <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">Estado</p>
              <select
                value={estado}
                onChange={(e) => setActivo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>

          <div className="mt-2  w-full flex flex-col justify-start pl-6 px-5">
            <ButtonPink
              texto="Guardar cambios"
              px="px-4"
              onClick={}
             
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AdminUserModal