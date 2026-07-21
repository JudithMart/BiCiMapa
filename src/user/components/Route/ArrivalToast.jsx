// src/user/components/ArrivalToast.jsx
import React, { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

function ArrivalToast({ arrivedPlace, nextPlaceName, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!arrivedPlace) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 4000);

    return () => clearTimeout(timer);
  }, [arrivedPlace]);

  if (!arrivedPlace || !visible) return null;

  return (
    <div className="fixed top-44 left-4 right-4 z-50 flex justify-center animate-slide-up">
      <div className="flex items-center gap-2 bg-[#B57A86] text-white rounded-full px-5 py-3 shadow-xl max-w-[420px]">
        <MdCheckCircle size={20} />
        <p className="text-sm font-medium truncate">
          ¡Llegaste a {arrivedPlace.nombre}!
          {nextPlaceName && ` Siguiente: ${nextPlaceName}`}
        </p>
      </div>
    </div>
  );
}

export default ArrivalToast;