//LoginC.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  loginUser,
  resetPassword,
  getUsuario,
} from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonPink from "./ButtonPink";

function LoginC({ onClose, onShowRegister, onAuthSuccess }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [intentos, setIntentos] = useState(() => {
    const saved = localStorage.getItem("login_intentos");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [bloqueado, setBloqueado] = useState(() => {
    const saved = localStorage.getItem("login_bloqueado");
    return saved === "true";
  });
  const [timer, setTimer] = useState(() => {
    const saved = localStorage.getItem("login_timer");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // 'error', 'success', 'block'
  const { setUserAuth, refreshUser } = useAuth();

  const activarBloqueo = React.useCallback((segundos = 300) => {
    const blockUntil = Date.now() + segundos * 1000;
    setBloqueado(true);
    setTimer(segundos);
    localStorage.setItem("login_block_until", String(blockUntil));
    localStorage.setItem("login_bloqueado", "true");
  }, []);

  // Guardar en localStorage cuando cambian los valores

  React.useEffect(() => {
    localStorage.setItem("login_intentos", intentos);
    localStorage.setItem("login_bloqueado", bloqueado);
    localStorage.setItem("login_timer", timer);
  }, [intentos, bloqueado, timer]);

  React.useEffect(() => {
    const blockUntil = localStorage.getItem("login_block_until");

    if (blockUntil && Date.now() < blockUntil) {
      setBloqueado(true);
      setTimer(Math.ceil((blockUntil - Date.now()) / 1000));
    } else if (blockUntil) {
      // Limpia estados antiguos de bloqueo cuando ya expiraron
      localStorage.removeItem("login_block_until");
      localStorage.removeItem("login_bloqueado");
      localStorage.removeItem("login_timer");
      localStorage.removeItem("login_intentos");
      setBloqueado(false);
      setTimer(0);
      setIntentos(0);
    }
  }, []);

  React.useEffect(() => {
    let timeout;

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
            localStorage.removeItem("login_intentos");
            localStorage.removeItem("login_bloqueado");
            localStorage.removeItem("login_timer");
            localStorage.removeItem("login_block_until");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timeout);
  }, [bloqueado, timer]);

  const handleLogin = async () => {
    if (bloqueado) {
      setMensaje(
        "Has superado el número máximo de intentos. Intenta más tarde.",
      );
      setTipoMensaje("block");
      return;
    }
    const { user, error } = await loginUser(email, password);
    if (error || !user) {
      setIntentos((prev) => {
        const newIntentos = prev + 1;

        if (newIntentos >= 5) {
          activarBloqueo(300); // 5 minutos

          setMensaje("Has superado el número máximo de intentos.");
          setTipoMensaje("block");
        } else {
          setMensaje("Correo o contraseña incorrectos");
          setTipoMensaje("error");
        }

        return newIntentos;
      });
    } else {
      setUserAuth(user);

      await refreshUser();
      const { data} = await getUsuario(user.id);

      if (!data.activo) {
       

        setMensaje("Tu cuenta ha sido desactivada.");

        setTipoMensaje("error");

        return;
      }

      
      setMensaje("Inicio de sesión exitoso");

      onAuthSuccess?.();
    

      if (!data) {
        setMensaje("No se encontró información del usuario.");
        setTipoMensaje("error");
        return;
      }

      if (data.rol === "admin") {
        navigate("/bicitas_historicas_manager");
      } else {
        navigate("/mapa");
      }
    }
  };

  const handleReset = async () => {
    if (!email) {
      setMensaje("Por favor ingresa tu correo electrónico.");
      setTipoMensaje("error");
      return;
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensaje("Correo no existe y/o está mal escrito");
      setTipoMensaje("error");
      return;
    }

    await resetPassword(email);
    setMensaje(
      "Si el correo existe, se ha enviado un correo para restablecer tu contraseña.",
    );
    setTipoMensaje("success");
  };

  return (
    <div className="h-dvh flex items-center justify-center bg-transparent overflow-hidden">
      <div
        className="relative flex flex-col
  w-80 md:w-[650px]
  max-h-[90dvh] overflow-y-auto
  rounded-2xl shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/Fondos/FondoBicis.jpeg')" }}
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
          {mensaje && (
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
          )}
          <div className="mt-10 w-full flex flex-col justify-start pl-6 px-5 ">
            <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">
              Email
            </p>
            <input
              type="email"
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
            <button className="flex items-center mt-2" onClick={handleReset}>
              <p className=" text-xs font-extralight text-texto hover:underline ml-1">
                Olvidé mi contraseña
              </p>
            </button>
          </div>
          <div className="mt-2  w-full flex flex-col justify-start pl-6 px-5">
            <ButtonPink
              texto="Iniciar sesión"
              px="px-4"
              onClick={handleLogin}
              disabled={bloqueado}
            />
          </div>
          <p className="font-thin text-[11px] py-4">
            {bloqueado ? (
              <span className="text-red-500">
                Demasiados intentos. Intenta de nuevo en 5 min.
              </span>
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
