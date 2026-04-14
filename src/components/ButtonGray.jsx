import React from 'react'

function ButtonGray({onClick,texto,px}) {
  return (
     <div>
        <button  onClick={onClick} className={`bg-[#C6C9CC] mt-10 w-full shadow-md
         text-[#4A565B] font-playfair font-semibold 
         py-2 ${px} rounded-lg hover:bg-[#b3b3b4] transition-colors duration-300`}>
         {texto}
        </button>
    </div>
  )
}

export default ButtonGray