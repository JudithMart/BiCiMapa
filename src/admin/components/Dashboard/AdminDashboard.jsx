

import { FaUserGroup } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineAutoGraph } from "react-icons/md";
import ChallengeSummaryCard from "./ChallengeSummaryCard";
import ChallengeUsersList from "./ChallengeUsersList";
import AdminCard from "./AdminCard";

function AdminDashboard({ stats, challengeUsers }) {
  return (
    <div className="w-full px-6 py-6">

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

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

      </div>

      {/* Dashboard */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2">
          <ChallengeSummaryCard challengeUsers={challengeUsers} />
        </div>

        <ChallengeUsersList challengeUsers={challengeUsers} />

      </div>

    </div>
  );
}

export default AdminDashboard;