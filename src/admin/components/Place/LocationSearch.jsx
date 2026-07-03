import { useState } from "react";
import { LuSearch, LuMapPin } from "react-icons/lu";

function LocationSearch({ form, setForm }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPlace = async () => {
    if (search.trim().length < 3) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
          `${search}, Morelia, Michoacán`,
        )}&country=mx&bbox=-101.245,19.655,-101.125,19.760&limit=5&access_token=${
          import.meta.env.VITE_MAPBOX_TOKEN
        }`,
      );

      const data = await response.json();

      setResults(data.features || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const selectPlace = (item) => {
    setForm({
      ...form,
      latitud: item.geometry.coordinates[1],
      longitud: item.geometry.coordinates[0],
    });

    setSearch(item.properties.full_address || item.properties.name);

    setResults([]);
  };

  return (
    <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
      <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
        Ubicación
      </p>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Buscar lugar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchPlace();
            }
          }}
          className="flex-1 font-sans px-3 py-2 rounded-lg bg-gray-300 border border-colorAdmin_gray"
        />

        <button
          type="button"
          onClick={searchPlace}
          className="bg-primary text-white rounded-lg px-4"
        >
          <LuSearch />
        </button>
      </div>

      {loading && <p className="text-sm mt-2 text-gray-500">Buscando...</p>}

      {results.length > 0 && (
        <div className="mt-2 rounded-lg border bg-white max-h-60 overflow-y-auto">
          {results.map((item) => (
            <button
              key={item.properties.mapbox_id}
              type="button"
              onClick={() => selectPlace(item)}
              className="w-full text-left px-3 py-3 hover:bg-primary/10 border-b last:border-none flex gap-2"
            >
              <LuMapPin className="mt-1 text-primary" />

              <div>
                <p className="font-medium">{item.properties.name}</p>

                <p className="text-xs text-gray-500">
                  {item.properties.full_address}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {form.latitud && form.longitud && (
        <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm">
          <p>
            <strong>Latitud:</strong> {form.latitud}
          </p>

          <p>
            <strong>Longitud:</strong> {form.longitud}
          </p>
        </div>
      )}
    </div>
  );
}

export default LocationSearch;
