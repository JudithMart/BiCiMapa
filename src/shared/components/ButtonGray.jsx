import React from 'react'

function ButtonGray({onClick,texto,px}) {
  return (
     <div>
        <button  onClick={onClick} className={`bg-[#C6C9CC] mt-10 w-full shadow-md
         text-[#4A565B] font-playfair font-medium  
         py-2 ${px} rounded-lg hover:bg-[#b3b3b4] transition-colors duration-300`}
         style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
         {texto}
        </button>
    </div>
  )
}

export default ButtonGray