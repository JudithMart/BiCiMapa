function ChallengeUsersList({ challengeUsers }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 h-full">
      <h2 className="font-bold text-xl mb-5">Usuarios del reto</h2>

      <div className="space-y-4 max-h-[520px] overflow-y-auto">
        {challengeUsers.map((user) => {
          const porcentaje = Math.round(
            (user.visitas_completadas / user.reto_mensual.visitas_requeridas) *
              100,
          );

          return (
            <div key={user.usuario.id} className="border rounded-2xl p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{user.usuario.nombre}</p>

                  <p className="text-xs text-gray-500">
                    {user.usuario.telefono}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    user.completado
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.completado ? "Completado" : "En progreso"}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm">
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
