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
   <div className="w-full px-8 py-6">

      {/* Cards */}

      <div className="flex flex-wrap gap-8  ">
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
      
          <ChallengeUsersList challengeUsers={challengeUsers} />
     
      </div>

      {/* Contenido */}

      <div className="grid grid-cols-12  h-22 ">
        <div className="col-span-7 h-full">
          <VisitsByPlace visitsByPlace={visitsByPlace} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
