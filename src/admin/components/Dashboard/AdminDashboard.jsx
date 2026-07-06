import { FaUserGroup } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineAutoGraph } from "react-icons/md";

import AdminCard from "./AdminCard";
import ChallengeUsersList from "./ChallengeUsersList";
import VisitsByPlace from "./VisitsByPlace";

function AdminDashboard({ stats, challengeUsers, visitsByPlace }) {
  return (
    <div className="w-full px-4 lg:px-8 py-6">

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Panel izquierdo */}
        <div className="xl:col-span-8">

          {/* Cards superiores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <AdminCard
              icono={<FaUserGroup />}
              descripcion="Usuarios"
              datos={stats.totalUsuarios}
            />

            <AdminCard
              icono={<GrUserNew />}
              descripcion="Premium"
              datos={stats.premiumUsuarios}
            />

            <AdminCard
              icono={<LiaPlaceOfWorshipSolid />}
              descripcion="Lugares"
              datos={stats.totalLugares}
            />

          </div>

          {/* Cards inferiores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full lg:w-[70%]">

            <AdminCard
              icono={<RiDiscountPercentFill />}
              descripcion="Promociones"
              datos={stats.promocionesActivas}
            />

            <AdminCard
              icono={<MdOutlineAutoGraph />}
              descripcion="Visitas"
              datos={stats.totalVisitas}
            />

          </div>

          {/* Tabla */}
          <div className="mt-8">

            <VisitsByPlace
              visitsByPlace={visitsByPlace}
            />

          </div>

        </div>

        {/* Panel derecho */}
        <div className="xl:col-span-4">

          <ChallengeUsersList
            challengeUsers={challengeUsers}
          />

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
