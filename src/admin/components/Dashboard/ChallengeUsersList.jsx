function ChallengeUsersList({ challengeUsers }) {
  return (
    <div
      className="rounded-[30px] bg-white/85 border border-primary shadow-md h-[340px] flex flex-col"
    >
      <h2 className="px-6 pt-6 pb-4 font-bold text-texto text-xl mb-5">
        Usuarios del reto
      </h2>

      <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-6 space-y-4">
        {challengeUsers.map((user) => {
          const porcentaje = Math.round(
            (user.visitas_completadas / user.reto_mensual.visitas_requeridas) *
              100,
          );

          return (
            <div key={user.usuario.id} className="border rounded-2xl p-4">
              <div className="flex flex-col px-2 ">
                <p className="font-semibold text-sm text-texto">
                  {user.usuario.nombre}
                </p>

                <p className="text-xs font-sans text-gray-500">
                  {user.usuario.telefono}
                </p>
              </div>

              <div className="mt-2">
                <div className="flex justify-between text-xs font-sans">
                  <span>
                    {user.visitas_completadas}/
                    {user.reto_mensual.visitas_requeridas}
                  </span>

                  <span>{porcentaje}%</span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full ${
                      porcentaje === 100
                        ? "bg-green-500"
                        : porcentaje >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(porcentaje, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChallengeUsersList;
