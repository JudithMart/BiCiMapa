//    AdminBicitasRoutes.jsx
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  deleteRoute,
  toggleRoute,
  updateRoute,
  createRoute,
  clearPlacesFromRoute,
  addPlaceToRoute,
} from "../../../services/admin_bicitas.service";
import RoutesBicitasForm from "../Form/RoutesBicitasForm";
import ButtonPink from "../../../shared/components/ButtonPink";
import AdminFormModal from "../AdminFormModal";
import Search from "../Search";
import AdminTable from "../AdminTable";
import AdminForm from "../Form/PlaceForm";
import { createUniqueSlug } from "../../utils/slug";
import {
  createPlace,
  getAllPlaces,
  uploadPlaceImage,
} from "../../../services/admin_places.service";

function AdminBicitasRoutes({ rutas }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openLugarModal, setOpenLugarModal] = useState(false);
  const [search, setSearch] = useState("");
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const { data } = await getAllPlaces();

      setLugares(data || []);
    };

    loadPlaces();
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tiempo_estimado: "",
    distancia_km: "",
    activa: true,
    lugaresSeleccionados: [],
  });

  const [lugarForm, setLugarForm] = useState({
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
    visible_mapa: false,
  });

  const handleEdit = (route) => {
    setSelectedPlace(route);
    setForm({
      nombre: route.nombre || "",
      descripcion: route.descripcion || "",
      tiempo_estimado: route.tiempo_estimado || "",
      distancia_km: route.distancia_km ?? "",
      activa: route.activa ?? true,
      lugaresSeleccionados:
        route.ruta_lugar?.map((item) => ({
          id: item.lugar.id,
          nombre: item.lugar.nombre,
          orden: item.orden,
          visible_mapa: item.lugar.visible_mapa ?? false,
        })) || [],
    });
    setOpenModal(true);
  };

  const handleActivo = async (route) => {
    await toggleRoute(route.id, route.activa);

    window.location.reload();
  };

  const handleSaveRoute = async (form) => {
    const values = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      tiempo_estimado: form.tiempo_estimado,
      distancia_km: form.distancia_km === "" ? null : Number(form.distancia_km),
      activa: form.activa,
      visible_mapa: form.visible_mapa,
      
    };

    delete values.lugaresSeleccionados;

    let error;
    let savedRoute = selectedPlace;

    if (selectedPlace) {
      ({ error } = await updateRoute(selectedPlace.id, values));
    } else {
      const { data } = await createRoute(values);

  
      savedRoute = data;
    }

    if (error) {
      console.error(error);
      alert("Error al guardar");
      return;
    }

    if (savedRoute?.id) {
      await clearPlacesFromRoute(savedRoute.id);

      if (form.lugaresSeleccionados?.length) {
        const inserts = form.lugaresSeleccionados.map((lugar) => ({
          id_ruta: savedRoute.id,
          id_lugar: lugar.id,
          orden: lugar.orden,
          
        }));

        await addPlaceToRoute(inserts);
      }
    }

    setOpenModal(false);
    window.location.reload();
  };

  const handleOpenLugarModal = () => {
    setLugarForm({
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
      visible_mapa: false,
    });

    setOpenLugarModal(true);
  };

  const handleSaveLugar = async (form) => {
    let values = { ...form };

    if (form.imagen) {
      const imageUrl = await uploadPlaceImage(form.imagen);
      values.imagen_url = imageUrl;
    }

    delete values.imagen;
    values.slug = createUniqueSlug(
      values.nombre,
      lugares.map((lugar) => lugar.slug),
    );

    const { data, error } = await createPlace(values);

    if (error) {
      console.error("Error al guardar lugar:", error);
      alert(
        error?.code === "23505"
          ? "Ya existe un lugar con ese nombre. Prueba con otro nombre."
          : "Error al guardar",
      );
      return;
    }

    setLugares((current) => [data, ...current]);
    setOpenLugarModal(false);
  };

  const handleDelete = async (route) => {
    const confirmacion = window.confirm(`¿Eliminar a ${route.nombre}?`);

    if (!confirmacion) return;

    await deleteRoute(route.id);

    window.location.reload();
  };

  const columns = [
    {
      header: "Ruta",
      accessor: "nombre",
      render: (route) => (
        <div>
          <p className="text-xs text-start font-medium">
            {route.nombre || route.lugar?.nombre || "Sin nombre"}
          </p>
        </div>
      ),
    },
    {
      header: "Descripción",
      accessor: "descripcion",
      render: (route) => (
        <p
          className=" max-w-[100px] text-xs truncate line-clamp-2"
          title={route.descripcion}
        >
          {route.descripcion}
        </p>
      ),
    },
    {
      header: "Lugares",
      accessor: "ruta_lugar",
      render: (route) => {
        const lugares = route.ruta_lugar
          ?.slice()
          .sort((a, b) => a.orden - b.orden)
          .map((x) => x.lugar?.nombre)
          .filter(Boolean)
          .join(", ");

        return lugares || "Sin lugares";
      },
    },
    {
      header: "Tiempo estimado",
      accessor: "tiempo_estimado",
      render: (route) => (
        <p
          className=" max-w-[100px] text-xs truncate line-clamp-2"
          title={route.tiempo_estimado}
        >
          {route.tiempo_estimado}
        </p>
      ),
    },
    {
      header: "Distancia estimada",
      accessor: "distancia_km",
      render: (route) => (
        <p
          className=" max-w-[100px] text-xs truncate line-clamp-2"
          title={route.distancia_km}
        >
          {route.distancia_km}
        </p>
      ),
    },
    {
      header: "Estado",
      accessor: "activa",
      render: (route) => (
        <button
          onClick={() => handleActivo(route)}
          className={`
              relative w-12 h-6 rounded-full transition
              ${route.activa ? "bg-green-500" : "bg-gray-300"}
            `}
        >
          <span
            className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition
                ${route.activa ? "right-1" : "left-1"}
              `}
          />
        </button>
      ),
    },
  ];
  const filteredPlaces = rutas.filter((route) => {
    const text = search.toLowerCase();

    return Object.values(route).join(" ").toLowerCase().includes(text);
  });
  return (
    <>
      <div className="flex justify-between items-center  gap-2 ">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Buscar ruta..."
        />
        <div className="-mt-8 ">
          <ButtonPink
            texto={
              <p className=" flex items-center gap-2">
                <IoMdAddCircleOutline className="w-5 h-5" />
                <span className="md:block hidden">Ruta</span>
              </p>
            }
            px="px-4"
            onClick={() => {
              setSelectedPlace(null);

              setForm({
                nombre: "",
                descripcion: "",
                tiempo_estimado: "",
                distancia_km: "",
                activa: true,
                lugaresSeleccionados: [],
              });

              setOpenModal(true);
            }}
          />
        </div>
      </div>
      <div className="pt-10">
        <AdminTable
          columns={columns}
          data={filteredPlaces}
          onEdit={handleEdit}
          onDeactivate={(place) => handleDelete(place)}
        />
      </div>{" "}
      <AdminFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveRoute}
      >
        {" "}
        <RoutesBicitasForm
          form={form}
          setForm={setForm}
          onSave={handleSaveRoute}
          lugares={lugares}
          onCreateLugar={handleOpenLugarModal}
        />
      </AdminFormModal>

      <AdminFormModal
        open={openLugarModal}
        onClose={() => setOpenLugarModal(false)}
      >
        <AdminForm
          form={lugarForm}
          setForm={setLugarForm}
          onSave={handleSaveLugar}
        />
      </AdminFormModal>
    </>
  );
}

export default AdminBicitasRoutes;
