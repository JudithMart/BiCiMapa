import React from 'react'

function ButtonPink({texto,onClick}) {
  return (
    <div>
        <button  onClick={onClick} className="bg-primary mt-10 w-full shadow-md
         text-white font-playfair font-semibold 
         py-2 px-4 rounded-lg hover:bg-[#D5B3BD] transition-colors duration-300">
         {texto}
        </button>
    </div>
  )
}

export default ButtonPink