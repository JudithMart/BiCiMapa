import { useState } from "react";
import { getPlacesVisitedByUser } from "../../../services/admin.service";
import UserVisit from "./UserVisit";

function ChallengeUsersList({ challengeUsers }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [visitsError, setVisitsError] = useState(null);

  const handleSelectUser = async (usuario) => {
    setSelectedUser(usuario);
    setLoadingVisits(true);
    setVisitsError(null);

    const { data, error } = await getPlacesVisitedByUser(usuario.id);

    if (error) {
      console.error(error);
      setVisitsError("No se pudieron cargar las visitas de este usuario.");
      setVisits([]);
    } else {
      setVisits(data || []);
    }

    setLoadingVisits(false);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setVisits([]);
    setVisitsError(null);
  };
  return (
    <div className="w-full xl:w-[320px] rounded-[30px] bg-white/85 border border-primary shadow-md h-[500px] flex flex-col xl:h-[545px]">
      <h2 className="px-6 pt-6 pb-4 font-bold text-texto text-xl mb-5">
        Usuarios premium 
      </h2>

      <div className="flex-1    overflow-y-auto px-6 pb-6 space-y-4">
        {challengeUsers.map((user) => {
          const porcentaje =
            user.reto_mensual.visitas_requeridas > 0
              ? Math.round(
                  (user.visitas_completadas /
                    user.reto_mensual.visitas_requeridas) *
                    100,
                )
              : 0;
          return (
            <button
              onClick={() => handleSelectUser(user.usuario)}
              key={user.usuario.id}
              className=" text-start border rounded-2xl p-4 w-full "
            >
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
                          : "bg-primary"
                    }`}
                    style={{
                      width: `${Math.min(porcentaje, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <UserVisit
        user={selectedUser}
        visits={visits}
        loading={loadingVisits}
        error={visitsError}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default ChallengeUsersList;
