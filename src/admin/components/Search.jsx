// src/admin/components/AdminSearch.jsx

import { LuSearch } from "react-icons/lu";

function Search({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="relative w-full md:w-1/2 mt-8 ">
      <LuSearch
        size={20}
        className="absolute left-4 top-1/3 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-12
          pr-4
          py-3
          rounded-xl
           border-2 border-primary
          bg-white/90
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-colorAdmin_gray
        "
      />
      -
    </div>
  );
}

export default Search;
