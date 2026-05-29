
import React, { useState } from 'react';
import { updatePassword } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const { error } = await updatePassword(password);
    if (!error) {
      navigate("/");
    }
   
  };


  return (
    <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
      <p className=" text-texto font-semibold text-base md:text-lg lg:text-xl ">Contraseña</p>
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
      <button
        className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        onClick={handleUpdate}
      >
        Actualizar contraseña
      </button>
    </div>
  );
}

export default ResetPassword