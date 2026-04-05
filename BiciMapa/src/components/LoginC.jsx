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


function LoginC({ onClose, onShowRegister, onAuthSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [intentos, setIntentos] = useState(() => {
    const saved = localStorage.getItem('login_intentos');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [bloqueado, setBloqueado] = useState(() => {
    const saved = localStorage.getItem('login_bloqueado');
    return saved === 'true';
  });
  const [timer, setTimer] = useState(() => {
    const saved = localStorage.getItem('login_timer');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'error', 'success', 'block'

  // Guardar en localStorage cuando cambian los valores
  React.useEffect(() => {
    localStorage.setItem('login_intentos', intentos);
    localStorage.setItem('login_bloqueado', bloqueado);
    localStorage.setItem('login_timer', timer);
  }, [intentos, bloqueado, timer]);

  React.useEffect(() => {
    let timeout;
    if (intentos >= 5 && !bloqueado) {
      setBloqueado(true);
      setTimer(300); // 5 minutos = 300 segundos
      setMensaje("Has superado el número máximo de intentos. Intenta más tarde.");
      setTipoMensaje("block");
    }
    if (bloqueado && timer > 0) {
      timeout = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timeout);
            setBloqueado(false);
            setIntentos(0);
            setMensaje("");
            setTipoMensaje("");
            // Limpiar localStorage
            localStorage.removeItem('login_intentos');
            localStorage.removeItem('login_bloqueado');
            localStorage.removeItem('login_timer');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timeout);
  }, [intentos, bloqueado, timer]);

  const handleLogin = async () => {
    if (bloqueado) {
      setMensaje("Has superado el número máximo de intentos. Intenta más tarde.");
      setTipoMensaje("block");
      return;
    }
    const { user, error } = await loginUser(email, password);
    if (error || !user) {
      setIntentos(prev => prev + 1);
      if (intentos + 1 >= 5) {
        setMensaje("Has superado el número máximo de intentos. Intenta más tarde.");
        setTipoMensaje("block");
      } else {
        setMensaje("Correo o contraseña incorrectos");
        setTipoMensaje("error");
      }
      return;
    } else {
      setMensaje("Inicio de sesión exitoso");
      if (onAuthSuccess) onAuthSuccess();
      console.log("Usuario logeado:", user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div
        className="relative flex items-center flex-col w-80 md:w-[650px] md:h-[600px] lg:h-[600px] lg:w-[650px] h-[550px] rounded-2xl shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/Fondos/Login.jpeg')" }}
      >
        {/* Botón de cerrar modal */}
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
            className="flex items-center w-24 h-24 rounded-3xl bg-cover bg-center mt-20"
            style={{ backgroundImage: "url('/Logo_blanco.webp')" }}
          ></div>
        {/* Mensaje visual de error, éxito o bloqueo */}
        {mensaje && (
          <div
            className={`w-full  px-4 py-1 rounded text-[12px] font-semibold text-center
              ${tipoMensaje === 'error' ? 'bg-red-100 text-red-700 border border-red-300' : ''}
              ${tipoMensaje === 'block' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : ''}
            `}
          >
            {tipoMensaje === 'block' && bloqueado ? (
              <>
                {mensaje} <br />
              </>
            ) : (
              mensaje
            )}
          </div>
        )}
        <div className="mt-10 w-full flex flex-col justify-start pl-6 px-5">
          <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
            Email
          </p>
          <input
            type="text"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg  mt-1 border font-playfair font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={bloqueado}
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
              className="w-full px-3 py-2 rounded-lg mt-1 border font-thin border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              disabled={bloqueado}
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
          <ButtonPink texto="Iniciar sesión" onClick={handleLogin} disabled={bloqueado} />
        </div>
        <p className="font-thin text-[11px] mt-3">
          {bloqueado ? (
            <span className="text-red-500">Demasiados intentos. Intenta de nuevo en 5 min.</span>
          ) : (
            <>
              No tienes cuenta?
              <button
                type="button"
                className="text-primary hover:underline ml-1"
                onClick={onShowRegister}
              >
                Regístrate aquí
              </button>
            </>
          )}
        </p>
      </div>
    </div>
    </div>
  );
}

export default LoginC;
