function VisitsByPlace({ visitsByPlace = [] }) {
  return (
    <div className="xl:h-[360px] bg-white/90 border border-primary shadow-md rounded-3xl w-ful max-w-[600px]  h-[320px]  flex flex-col">
      <h2 className="font-bold text-xl mb-6 text-texto px-6 pt-6 pb-4 ">Visitas por lugar</h2>

      <div className="flex-1 overflow-y-auto px-6 pb-6 ">
        {visitsByPlace.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-4"
          >
            <p className="font-medium">{item.nombre}</p>

            <span className="font-bold text-primary">{item.visitas}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitsByPlace;
