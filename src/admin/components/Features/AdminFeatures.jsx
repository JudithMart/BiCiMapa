import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import ButtonPink from "../../../shared/components/ButtonPink";
import AdminFormModal from "../AdminFormModal";
import Search from "../Search";
import AdminTable from "../AdminTable";
import FeaturesForm from "../Form/FeaturesForm";
import {
  createNewFeature,
  deleteNewFeature,
  toggleNewFeature,
  updateNewFeature,
} from "../../../services/admin_features.service";

function AdminFeatures({ novedades }) {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    activa: true,
    url: "",
  });

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setForm({
      titulo: feature.titulo || "",
      descripcion: feature.descripcion || "",
      fecha_inicio: feature.fecha_inicio
        ? feature.fecha_inicio.slice(0, 10)
        : "",
      fecha_fin: feature.fecha_fin ? feature.fecha_fin.slice(0, 10) : "",
      activa: feature.activa ?? true,
      url: feature.url || "",
    });
    setOpenModal(true);
  };

  const handleSaveFeature = async (currentForm) => {
    const values = {
      titulo: currentForm.titulo,
      descripcion: currentForm.descripcion,
      fecha_inicio: currentForm.fecha_inicio,
      fecha_fin: currentForm.fecha_fin,
      activa: currentForm.activa,
      url: currentForm.url,
    };

    let error;

    if (selectedFeature) {
      ({ error } = await updateNewFeature(selectedFeature.id, values));
    } else {
      ({ error } = await createNewFeature(values));
    }

    if (error) {
      console.error(error);
      alert("Error al guardar");
      return;
    }

    setOpenModal(false);
    window.location.reload();
  };

  const handleToggleActive = async (feature) => {
    const { error } = await toggleNewFeature(feature.id, !feature.activa);

    if (error) {
      console.error(error);
      alert("Error al actualizar estado");
      return;
    }

    window.location.reload();
  };

  const handleDelete = async (feature) => {
    const confirmacion = window.confirm(
      `¿Eliminar la novedad ${feature.titulo}?`,
    );

    if (!confirmacion) return;

    const { error } = await deleteNewFeature(feature.id);

    if (error) {
      console.error(error);
      alert("Error al eliminar");
      return;
    }

    window.location.reload();
  };

  const columns = [
    {
      header: "Título",
      accessor: "titulo",
      render: (feature) => (
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-center font-medium">
            {feature.titulo || "Sin título"}
          </p>
        </div>
      ),
    },
    {
      header: "Descripción",
      accessor: "descripcion",
      render: (feature) => (
        <p
          className="max-w-[160px] text-xs truncate line-clamp-2"
          title={feature.descripcion}
        >
          {feature.descripcion}
        </p>
      ),
    },
    {
      header: "Fecha inicio",
      accessor: "fecha_inicio",
      render: (feature) => (
        <p
          className="max-w-[100px] text-xs truncate"
          title={feature.fecha_inicio}
        >
          {feature.fecha_inicio ? feature.fecha_inicio.slice(0, 10) : "-"}
        </p>
      ),
    },
    {
      header: "Fecha fin",
      accessor: "fecha_fin",
      render: (feature) => (
        <p className="max-w-[100px] text-xs truncate" title={feature.fecha_fin}>
          {feature.fecha_fin ? feature.fecha_fin.slice(0, 10) : "-"}
        </p>
      ),
    },
    {
      header: "Link",
      accessor: "url",
      render: (feature) => (
        <p className="text-xs  font-extralight text-blue-500 truncate max-w-[100px]">
          {feature.url || "Sin link"}
        </p>
      ),
    },
    {
      header: "Estado",
      accessor: "activa",
      render: (feature) => (
        <button
          onClick={() => handleToggleActive(feature)}
          className={`relative w-12 h-6 rounded-full transition ${
            feature.activa ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
              feature.activa ? "right-1" : "left-1"
            }`}
          />
        </button>
      ),
    },
  ];

  const filteredFeatures = (novedades || []).filter((feature) => {
    const text = search.toLowerCase();

    return Object.values(feature).join(" ").toLowerCase().includes(text);
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Buscar novedad..."
        />

        <div className="-mt-8">
          <ButtonPink
            texto={
              <p className="flex items-center gap-2">
                <IoMdAddCircleOutline className="w-5 h-5" />
                <span className="md:block hidden">Novedad</span>
              </p>
            }
            px="px-4"
            onClick={() => {
              setSelectedFeature(null);
              setForm({
                titulo: "",
                descripcion: "",
                fecha_inicio: "",
                fecha_fin: "",
                activa: true,
              });
              setOpenModal(true);
            }}
          />
        </div>
      </div>

      <div className="pt-10">
        <AdminTable
          columns={columns}
          data={filteredFeatures}
          onEdit={handleEdit}
          onDeactivate={handleDelete}
        />
      </div>

      <AdminFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveFeature}
      >
        <FeaturesForm
          form={form}
          setForm={setForm}
          onSave={handleSaveFeature}
        />
      </AdminFormModal>
    </>
  );
}

export default AdminFeatures;
