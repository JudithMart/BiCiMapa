import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonPink from "./ButtonPink";
import { loginUser } from "../services/auth.service";
//import { registerUser, loginUser, logoutUser, getCurrentUser } from '../services/auth.service';
// Registrar usuario
// const handleRegister = async () => {
//   // Datos de prueba
//   const email = 'aguimtz.2003@gmail.com';
//   const password = 'password123';

//Login
//   const loginResult = await loginUser(email, password);
//   if (loginResult.user) {
//     alert('El usuario ya está registrado.');
//     return;
//   }

// Si el login falla, intentar registrar
//   const { user, error } = await registerUser(email, password);
//   console.log('Respuesta de Supabase al registrar:', { user, error });
//   if (error) {
//     alert('Error al registrar: ' + error.message);
//   } else {
//     alert('Registro exitoso');
//   }
// };

// Cerrar sesión
// const handleLogout = async () => {
//   const { error } = await logoutUser();
//   console.log('Logout:', error);
// };

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  // Obtener usuario actual
//   const handleGetUser = async () => {
//     const { user, error } = await getCurrentUser();
//     console.log("Usuario actual:", user, error);
//   };
  //Iniciar sesión
  const handleLogin = async () => {
    const { user, error } = await loginUser(
      usuario,
      password,
    );
    console.log("Login:", user, error);
  };
//   "password123

  return (
    <div className="min-h-screen  flex items-center justify-center bg-transparent">
      <div
        className=" flex items-center flex-col w-80 md:w-[650px] md:h-[55vh] lg:h-[65vh] 
        lg:w-[650px] h-[65vh] rounded-2xl shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/Fondos/Login.jpeg')" }}
      >
        <div
          className="flex items-center w-24 h-24 rounded-3xl  bg-cover bg-center mt-20 "
          style={{ backgroundImage: "url('/Logo_blanco.webp')" }}
        ></div>
        <div className="mt-10 w-full flex flex-col justify-start pl-6 px-5">
          <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
            Usuario
          </p>
          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin 
             border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
          <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
            Contraseña
          </p>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg mt-1 border font-thin
            border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-primary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
          <ButtonPink texto="Iniciar sesión" onClick={handleLogin} />
        </div>
        <p className="font-thin text-[11px] mt-3">
          No tienes cuenta?
          <a href="/register" className="text-primary hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
