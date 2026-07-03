import PlaceSelector from "./PlaceSelector";
import PlaceCard from "./PlaceCard";

function RoutePlaces({
  form,
  setForm,
  lugares,
  onCreateLugar,
}) {

  const selectedLugares =
    form.lugaresSeleccionados || [];

  const addLugar = (lugar) => {

    const nuevos = [
      ...selectedLugares,
      {
        id: lugar.id,
        nombre: lugar.nombre,
        orden: selectedLugares.length + 1,
        visible_mapa: lugar.visible_mapa,
      },
    ];

    setForm({
      ...form,
      lugaresSeleccionados: nuevos,
    });
  };

  const removeLugar = (id) => {

    const nuevos = selectedLugares
      .filter((l) => l.id !== id)
      .map((l, index) => ({
        ...l,
        orden: index + 1,
      }));

    setForm({
      ...form,
      lugaresSeleccionados: nuevos,
    });
  };

  const moveUp = (index) => {

    if (index === 0) return;

    const copia = [...selectedLugares];

    [copia[index - 1], copia[index]] =
      [copia[index], copia[index - 1]];

    const nuevos = copia.map((lugar, i) => ({
      ...lugar,
      orden: i + 1,
    }));

    setForm({
      ...form,
      lugaresSeleccionados: nuevos,
    });

  };

  const moveDown = (index) => {

    if (index === selectedLugares.length - 1)
      return;

    const copia = [...selectedLugares];

    [copia[index], copia[index + 1]] =
      [copia[index + 1], copia[index]];

    const nuevos = copia.map((lugar, i) => ({
      ...lugar,
      orden: i + 1,
    }));

    setForm({
      ...form,
      lugaresSeleccionados: nuevos,
    });

  };

  return (

    <div>

      <h2 className="text-primary text-center font-normal text-xl mb-4">
        Lugares de la ruta
      </h2>

      <PlaceSelector
        lugares={lugares}
        selectedLugares={selectedLugares}
        onAddLugar={addLugar}
        onCreateLugar={onCreateLugar}
      />

      <div className="mt-5 space-y-3">

        {selectedLugares.length === 0 ? (

          <p className="text-gray-500">
            No has agregado lugares.
          </p>

        ) : (

          selectedLugares.map((lugar, index) => (

            <PlaceCard
              key={lugar.id}
              lugar={lugar}
              index={index}
              total={selectedLugares.length}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
              onDelete={() =>
                removeLugar(lugar.id)
              }
            />

          ))

        )}

      </div>

    </div>

  );
}

export default RoutePlaces;