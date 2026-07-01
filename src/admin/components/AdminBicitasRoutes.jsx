//    AdminBicitasRoutes.jsx
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  deleteRoute,
  toggleRoute,
  updateRoute,
  createRoute,
  clearPlacesFromRoute,
  addPlaceToRoute,
} from "../../services/admin_bicitas.service";
import RoutesBicitasForm from "./Form/RoutesBicitasForm";
import ButtonPink from "../../shared/components/ButtonPink";
import AdminFormModal from "./AdminFormModal";
import Search from "./Search";
import AdminTable from "./AdminTable";
import { useEffect } from "react";
import { getAllPlaces } from "../../services/admin_bicitas.service";

function AdminBicitasRoutes({ rutas }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const { data } = await getAllPlaces();

      setLugares(data || []);
    };

    loadPlaces();
  }, []);

  // useEffect(() => {
  //   loadLugares();
  // }, []);

  // const loadLugares = async () => {
  //   const { data } = await getAllPlaces();
  //   setLugares(data || []);
  // };

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    orden: "",
    tiempo_estimado: "",
    distancia_km: "",
    activa: true,
    lugaresSeleccionados: [],
  });

  const handleEdit = (route) => {
    setSelectedPlace(route);
    setForm({
      nombre: route.nombre || "",
      descripcion: route.descripcion || "",
      orden: route.orden ?? "",
      tiempo_estimado: route.tiempo_estimado || "",
      distancia_km: route.distancia_km ?? "",
      activa: route.activa ?? true,
      lugaresSeleccionados:
        route.ruta_lugar?.map((item) => ({
          id: item.lugar.id,
          nombre: item.lugar.nombre,
          orden: item.orden,
        })) || [],
    });
    setOpenModal(true);
  };

  const handleActivo = async (route) => {
    await toggleRoute(route.id, route.activa);

    window.location.reload();
  };

  const handleSaveRoute = async (form) => {
    let values = {
      ...form,
      orden: form.orden === "" ? null : Number(form.orden),
      distancia_km:
        form.distancia_km === "" ? null : Number(form.distancia_km),
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
          ruta_id: savedRoute.id,
          lugar_id: lugar.id,
          orden: lugar.orden,
        }));

        await addPlaceToRoute(inserts);
      }
    }

    setOpenModal(false);
    window.location.reload();
  };

  const handleDelete = async (route) => {
    const confirmacion = window.confirm(`¿Eliminar a ${route.nombre}?`);

    if (!confirmacion) return;

    const { error } = await deleteRoute(route.id);

    console.log(error);
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
    // {
    //   header: "Orden",
    //   accessor: "orden",
    //   render: (route) => (
    //     <p
    //       className=" max-w-[100px] text-xs truncate line-clamp-2"
    //       title={route.orden}
    //     >
    //       {route.orden}
    //     </p>
    //   ),
    // },
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
                orden: "",
                tiempo_estimado: "",
                distancia_km: "",
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
        />
      </AdminFormModal>
    </>
  );
}

export default AdminBicitasRoutes;
