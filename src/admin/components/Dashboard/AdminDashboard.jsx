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
    <div className="w-full px-4 md:px-6 xl:px-8 py-2 2xl:px-44 ">
      {" "}
      {/* Primera fila */}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {" "}
        <AdminCard
          icono={<FaUserGroup />}
          descripcion="Usuarios"
          datos={stats.totalUsuarios}
        />{" "}
        <AdminCard
          icono={<GrUserNew />}
          descripcion="Premium"
          datos={stats.premiumUsuarios}
        />{" "}
        <AdminCard
          icono={<LiaPlaceOfWorshipSolid />}
          descripcion="Lugares"
          datos={stats.totalLugares}
        />{" "}
      </div>{" "}
      {/* Segunda parte */}{" "}
      <div className="mt-8 flex flex-col xl:flex-row gap-8">
        {" "}
        {/* Izquierda */}{" "}
        <div className="flex-1 2xl:flex-2 ">
          {" "}
          {/* Cards inferiores */}{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-2 2xl:gap-10 gap-6">
            {" "}
            <AdminCard
              icono={<RiDiscountPercentFill />}
              descripcion="Promociones"
              datos={stats.promocionesActivas}
            />{" "}
            <AdminCard
              icono={<MdOutlineAutoGraph />}
              descripcion="Visitas"
              datos={stats.totalVisitas}
            />{" "}
          </div>{" "}
          <div className="mt-8">
            {" "}
            <VisitsByPlace visitsByPlace={visitsByPlace} />{" "}
          </div>{" "}
        </div>{" "}
        {/* Derecha */}{" "}
        <div className="xl:w-[320px] shrink-0">
          {" "}
          <ChallengeUsersList challengeUsers={challengeUsers} />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default AdminDashboard;
