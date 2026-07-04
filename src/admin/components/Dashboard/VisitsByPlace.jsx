function VisitsByPlace({ visitsByPlace = [] }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 h-full">

      <h2 className="font-bold text-xl mb-6">
        Visitas por lugar
      </h2>

      <div className="space-y-3">

        {visitsByPlace.map((item) => (

          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <p className="font-medium">
              {item.nombre}
            </p>

            <span className="font-bold text-primary">
              {item.visitas}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default VisitsByPlace;