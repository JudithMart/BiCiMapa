import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import ButtonPink from "../../../shared/components/ButtonPink";
import AdminFormModal from "../AdminFormModal";
import Search from "../Search";
import AdminTable from "../AdminTable";
import ChallengeForm from "../Form/ChallengeForm";
import {
  createChallenge,
  deleteChallenge,
  updateChallenge,
} from "../../../services/admin_challenge.service";

function AdminChallenge({ reto, lugares }) {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    visitas_requeridas: "",
    activo: true,
    lugares: [],
  });

  const handleEdit = (challenge) => {
    setSelectedChallenge(challenge);
    setForm({
      nombre: challenge.nombre || "",
      descripcion: challenge.descripcion || "",
      fecha_inicio: challenge.fecha_inicio || "",
      fecha_fin: challenge.fecha_fin || "",
      visitas_requeridas: challenge.visitas_requeridas ?? "",
      activo: challenge.activo ?? true,
      lugares: challenge.reto_lugares?.map((r) => r.id_lugar) || [],
    });
    setOpenModal(true);
  };

  const handleSaveChallenge = async (form) => {
    const values = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin,
      visitas_requeridas: Number(form.visitas_requeridas),
      activo: form.activo,
    };

    const lugares = form.lugares;
    let error;

    if (selectedChallenge) {
      ({ error } = await updateChallenge(
        selectedChallenge.id,
        values,
        lugares
      ));
    } else {
      ({ error } = await createChallenge(values, lugares));
    }

    if (error) {
      console.error(error);
      alert("Error al guardar");
      return;
    }

    setOpenModal(false);
    window.location.reload();
  };

  const handleDelete = async (challenge) => {
    const confirmacion = window.confirm(`¿Eliminar a ${challenge.nombre}?`);

    if (!confirmacion) return;

    const { error } = await deleteChallenge(challenge.id);

    console.log(error);
    window.location.reload();
  };

  const handleToggleActivo = async (challenge) => {
    const { error } = await updateChallenge(
      challenge.id,
      {
        activo: !challenge.activo,
      },
      challenge.id,
    );

    if (error) {
      console.error(error);
      alert("Error al actualizar estado");
      return;
    }

    window.location.reload();
  };

  const columns = [
    {
      header: "Reto",
      accessor: "nombre",
      render: (challenge) => (
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-center font-medium">
            {challenge.nombre || "Sin nombre"}
          </p>
        </div>
      ),
    },
    {
      header: "Descripción",
      accessor: "descripcion",
      render: (challenge) => (
        <p
          className=" max-w-[100px] text-xs truncate line-clamp-2"
          title={challenge.descripcion}
        >
          {challenge.descripcion}
        </p>
      ),
    },
    {
      header: "Fecha inicio",
      accessor: "fecha_inicio",
      render: (challenge) => (
        <p
          className="max-w-[100px] text-xs truncate"
          title={challenge.fecha_inicio}
        >
          {challenge.fecha_inicio}
        </p>
      ),
    },
    {
      header: "Fecha fin",
      accessor: "fecha_fin",
      render: (challenge) => (
        <p
          className="max-w-[100px] text-xs truncate"
          title={challenge.fecha_fin}
        >
          {challenge.fecha_fin}
        </p>
      ),
    },
    {
      header: "Visitas requeridas",
      accessor: "visitas_requeridas",
      render: (challenge) => (
        <p
          className="max-w-[100px] text-xs truncate"
          title={challenge.visitas_requeridas}
        >
          {challenge.visitas_requeridas}
        </p>
      ),
    },
    {
      header: "Lugares",
      accessor: "lugares",
      render: (challenge) => (
        <div className="flex flex-col gap-1">
          {challenge.reto_lugares?.map((item) => (
            <span key={item.id_lugar} className="text-xs ">
              {item.lugar.nombre}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Estado",
      accessor: "activo",
      render: (challenge) => (
        <button
          onClick={() => handleToggleActivo(challenge)}
          className={`
              relative w-12 h-6 rounded-full transition
              ${challenge.activo ? "bg-green-500" : "bg-gray-300"}
            `}
        >
          <span
            className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition
                ${challenge.activo ? "right-1" : "left-1"}
              `}
          />
        </button>
      ),
    },
  ];

  const filteredChallenges = reto.filter((challenge) => {
    const text = search.toLowerCase();

    return Object.values(challenge).join(" ").toLowerCase().includes(text);
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Buscar reto..."
        />

        <div className="-mt-8">
          <ButtonPink
            texto={
              <p className="flex items-center gap-2">
                <IoMdAddCircleOutline className="w-5 h-5" />
                <span className="md:block hidden">Reto</span>
              </p>
            }
            px="px-4"
            onClick={() => {
              setSelectedChallenge(null);
              setForm({
                nombre: "",
                fecha_inicio: "",
                fecha_fin: "",
                visitas_requeridas: "",
                activo: true,
                lugares: [],
              });
              setOpenModal(true);
            }}
          />
        </div>
      </div>

      <div className="pt-10">
        <AdminTable
          columns={columns}
          data={filteredChallenges}
          onEdit={handleEdit}
          onDeactivate={handleDelete}
        />
      </div>

      <AdminFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveChallenge}
      >
        <ChallengeForm
          form={form}
          setForm={setForm}
          onSave={handleSaveChallenge}
          lugares={lugares}
        />
      </AdminFormModal>
    </>
  );
}

export default AdminChallenge;
