function ChallengeSummaryCard({ challengeUsers }) {

  const total = challengeUsers.length;

  const completados = challengeUsers.filter(
    (u) => u.completado
  ).length;

  const progreso = challengeUsers.filter(
    (u) =>
      !u.completado &&
      u.visitas_completadas > 0
  ).length;

  const sinIniciar = challengeUsers.filter(
    (u) =>
      u.visitas_completadas === 0
  ).length;

  const porcentaje = total
    ? Math.round((completados / total) * 100)
    : 0;

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 h-full">

      <h2 className="text-2xl font-bold">
        Reto mensual
      </h2>

      <p className="text-gray-500 mt-1">
        {challengeUsers[0]?.reto_mensual.nombre}
      </p>

      <div className="mt-8">

        <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">

          <div
            className="bg-primary h-full"
            style={{
              width: `${porcentaje}%`,
            }}
          />

        </div>

        <p className="text-center mt-3 font-semibold">

          {completados} de {total} usuarios completaron

        </p>

      </div>

      <div className="grid grid-cols-3 gap-5 mt-10">

        <div className="rounded-2xl bg-green-50 p-5">

          <p className="text-3xl font-bold text-green-600">
            {completados}
          </p>

          <p className="text-sm mt-2">
            Completados
          </p>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-5">

          <p className="text-3xl font-bold text-yellow-600">
            {progreso}
          </p>

          <p className="text-sm mt-2">
            En progreso
          </p>

        </div>

        <div className="rounded-2xl bg-red-50 p-5">

          <p className="text-3xl font-bold text-red-600">
            {sinIniciar}
          </p>

          <p className="text-sm mt-2">
            Sin iniciar
          </p>

        </div>

      </div>

    </div>
  );
}

export default ChallengeSummaryCard;