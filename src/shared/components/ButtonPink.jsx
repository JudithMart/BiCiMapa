import React from 'react'

function ButtonPink({texto,onClick,px}) {
  return (
    <div>
        <button  onClick={onClick} className={`bg-primary mt-10 w-full shadow-md
         text-white font-playfair font-medium 
         py-2 ${px} rounded-lg hover:bg-[#D5B3BD] transition-colors duration-300`}
         style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
         {texto}
        </button>
    </div>
  )
}

export default ButtonPink