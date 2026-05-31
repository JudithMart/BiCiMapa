import React from 'react'

function ButtonPink({ texto, onClick, px, disabled = false, className = "" }) {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          mt-10 w-full shadow-md font-playfair font-medium py-2 ${px} rounded-lg transition-colors duration-300
          ${disabled
            ? "bg-primary/60 text-white "
            : "bg-primary text-white hover:bg-[#D5B3BD]"
          }
          ${className}
        `}
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {texto}
      </button>
    </div>
  )
}

export default ButtonPink