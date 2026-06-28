//AdminPlace.jsx
import React, { useState } from "react";
import ButtonPink from "../../shared/components/ButtonPink";
import AdminFormModal from "./AdminFormModal";
import AdminForm from "./Form/AdminForm";
import Search from "./Search";
import AdminTable from "./AdminTable";
import {
  toggleConvenio,
  updatePlace,
  uploadPlaceImage,
  deletePlace,
  createPlace,
} from "../../services/admin_places.service";

function AdminPlace({ lugares }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    slogan: "",
    imagen: "",
    latitud: "",
    longitud: "",
    es_convenio: false,
    activo: true,
  });

  const handleEdit = (place) => {
    setSelectedPlace(place);
    setForm({
      nombre: place.nombre || "",
      descripcion: place.descripcion || "",
      slogan: place.slogan || "",
      imagen: place.imagen || "",
      latitud: place.latitud || "",
      longitud: place.longitud || "",
      es_convenio: place.es_convenio || false,
      activo: place.activo,
      id_tipo: place.id_tipo,
    });
    setOpenModal(true);
  };

  const handleSavePlace = async (form) => {
    let values = { ...form };

    // subir imagen
    if (form.imagen) {
      const imageUrl = await uploadPlaceImage(form.imagen);
      values.imagen_url = imageUrl;
    }

    delete values.imagen;

    let error;

    if (selectedPlace) {
      ({ error } = await updatePlace(selectedPlace.id, values));
    } else {
      ({ error } = await createPlace(values));
    }

    if (error) {
      console.error(error);
      alert("Error al guardar");
      return;
    }

    setOpenModal(false);
    window.location.reload();
  };

  const handleConvenio = async (place) => {
    await toggleConvenio(place.id, place.es_convenio);

    window.location.reload();
  };

  const handleDelete = async (place) => {
    const confirmacion = window.confirm(`¿Eliminar a ${place.nombre}?`);

    if (!confirmacion) return;

   const { error } = await deletePlace(place.id);

console.log(error);
  };

  const columns = [
    {
      header: "Lugar",
      accessor: "nombre",
      render: (place) => (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {place.imagen_url ? (
              <img
                src={place.imagen_url}
                alt={place.nombre}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              place.nombre?.charAt(0)
            )}
          </div>

          <div>
            <p className="text-xs text-center font-medium">{place.nombre}</p>
            <p className="text-xs text-center text-gray-500 uppercase">
              {place.tipo.nombre}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Descripción",
      accessor: "descripcion",
      render: (place) => (
        <p
          className=" max-w-[100px] text-xs truncate line-clamp-2"
          title={place.descripcion}
        >
          {place.descripcion}
        </p>
      ),
    },
    {
      header: "Slogan",
      accessor: "slogan",
      render: (place) => (
        <p className=" max-w-[80px] text-xs truncate" title={place.slogan}>
          {place.slogan}
        </p>
      ),
    },

    {
      header: "Latitud",
      accessor: "latitud",
      render: (place) => (
        <p className=" max-w-[50px] text-xs truncate" title={place.latitud}>
          {place.latitud}
        </p>
      ),
    },
    {
      header: "Longitud",
      accessor: "longitud",
      render: (place) => (
        <p className=" max-w-[50px] text-xs truncate" title={place.longitud}>
          {place.longitud}
        </p>
      ),
    },
    {
      header: "Convenio",
      accessor: "es_convenio",
      render: (place) => (
        <button
          onClick={() => handleConvenio(place)}
          className={`
        relative w-12 h-6 rounded-full transition
        ${place.es_convenio ? "bg-green-500" : "bg-gray-300"}
      `}
        >
          <span
            className={`
          absolute top-1 w-4 h-4 bg-white rounded-full transition
          ${place.es_convenio ? "right-1" : "left-1"}
        `}
          />
        </button>
      ),
    },
    {
      header: "Estado",
      accessor: "activo",
      render: (place) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            place.activo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {place.activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];
  const filteredPlaces = lugares.filter((place) => {
    const text = search.toLowerCase();

    return Object.values(place).join(" ").toLowerCase().includes(text);
  });

  return (
    <>
      <div className="flex justify-between items-center ">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Buscar lugar..."
        />
        <div className="-mt-8">
          <ButtonPink
            texto="Agregar Lugar"
            px="px-4"
            onClick={() => {
              setSelectedPlace(null);

              setForm({
                nombre: "",
                descripcion: "",
                slogan: "",
                imagen: null,
                imagen_url: "",
                latitud: "",
                longitud: "",
                activo: true,
                es_convenio: false,
                id_tipo: 1,
              });

              setOpenModal(true);
            }}
          />
        </div>
      </div>
      <div className="pt-10 ">
        <AdminTable
          columns={columns}
          data={filteredPlaces}
          onEdit={handleEdit}
          onDeactivate={(place) => handleDelete(place)}
          onPremiumToggle={(place) => handleConvenio(place)}
        />
      </div>
      <AdminFormModal
        open={openModal}
        user={selectedPlace}
        onClose={() => setOpenModal(false)}
        onSave={handleSavePlace}
      >
        {" "}
        <AdminForm form={form} setForm={setForm} onSave={handleSavePlace} />
      </AdminFormModal>
    </>
  );
}

export default AdminPlace;
