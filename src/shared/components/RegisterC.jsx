//RegisterC.jsx
import React, { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonPink from "./ButtonPink";

function RegisterC({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'error', 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de contraseña segura
  const esPasswordSeguro = (pwd) => {
    // Al menos 8 caracteres, una mayúscula, un número y un símbolo
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      pwd,
    );
  };

  const handleRegister = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setMensaje("");
    setTipoMensaje("");
    let registroExitoso = false;
    try {
      if (!esPasswordSeguro(password)) {
        setMensaje("Tu contraseña no cumple con los requisitos de seguridad.");
        setTipoMensaje("error");
        return;
      }
    
      const { error } = await registerUser(email, password, nombre, telefono);
      if (error) {
        setMensaje("Error al registrar: " + error.message);
        setTipoMensaje("error");
      } else {
        registroExitoso = true;
        setMensaje(
          "Registro exitoso. Revisa tu correo para activar tu cuenta.",
        );
        setTipoMensaje("success");

        // Evita que el usuario vuelva a dar clic
        setIsSubmitting(true);

        // Cierra el modal después de mostrar el mensaje
        setTimeout(() => {
          onClose?.();
        }, 2500);
      }
    } finally {
      if (!registroExitoso) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="  flex items-center justify-center bg-transparent">
      <div
        className="relative  flex items-center flex-col w-80 md:w-[650px] lg:w-[650px]  md:h-[680px] 
        lg:h-[700px] h-[650px] rounded-2xl shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/Fondos/FondoBicis.jpeg')" }}
      >
       
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-primary
              text-3xl font-bold z-30 transition-transform 
              duration-200 hover:scale-125 hover:rotate-90 active:scale-95"
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
        {/* Overlay rosa */}
        <div className="absolute inset-0 bg-secundary opacity-25 rounded-2xl z-10 pointer-events-none"></div>
        <div className="relative z-20 w-full flex flex-col items-center">
          <div
            className="flex items-center w-24 h-24 rounded-3xl bg-cover bg-center mt-14"
            style={{ backgroundImage: "url('/Logo_blanco.webp')" }}
          ></div>

          {/* Input nombre */}
          <div className="mt-8 w-full flex flex-col justify-start pl-6 px-5">
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
              Nombre
            </p>
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
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
              Numero de teléfono
            </p>
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
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
              Email
            </p>
            <input
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {/* Input contraseña */}
          <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
              Contraseña
            </p>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg mt-1 border font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-primary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              Mínimo 8 caracteres, una mayúscula, un número y un símbolo.
            </span>
          </div>
          <div className="-mt-5 w-full flex flex-col justify-start pl-6 px-5">
            <ButtonPink
              px="px-4"
              texto={isSubmitting ? "Registrando..." : "Registrarse"}
              onClick={handleRegister}
            />
            {mensaje && (
              <div
                className={`mt-1 px-3 py-2 rounded text-sm text-center font-semibold 
                ${tipoMensaje === "error" ? "bg-red-100 text-red-700 border border-red-300" : ""}
                ${tipoMensaje === "success" ? "bg-green-100 text-green-700 border border-green-300" : ""}
              `}
              >
                {mensaje}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterC;
