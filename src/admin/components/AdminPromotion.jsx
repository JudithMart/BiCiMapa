//admin_promotion.service.js
import React, { useState } from "react";
import ButtonPink from "../../shared/components/ButtonPink";
import AdminFormModal from "./AdminFormModal";
import AdminForm from "./Form/AdminForm";
import Search from "./Search";
import AdminTable from "./AdminTable";
import { IoQrCodeOutline } from "react-icons/io5";
import {
  updatePromotion,
  deletePromotion,
  togglePromotion,
  createPromotion,
  createToken,
  getLastToken,
  generateNewToken,
} from "../../services/admin_promotion.service";
import PromotionForm from "./Form/PromotionForm";
import AdminModalQR from "./AdminModalQR";

function AdminPromotion({ promociones }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [openQR, setOpenQR] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);

  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [form, setForm] = useState({
    id_lugar: "",
    descripcion: "",
    descuento: "",
    activa: true,
  });

  const handleEdit = (promocion) => {
    setSelectedPlace(promocion);
    setForm({
      id_lugar: promocion.id_lugar || "",
      nombreLugar: promocion.lugar.nombre || "",
      descripcion: promocion.descripcion || "",
      descuento: promocion.descuento || "",
      activa: promocion.activa || true,
    });
    setOpenModal(true);
  };

  const handleActivo = async (place) => {
    await togglePromotion(place.id, place.activo);

    window.location.reload();
  };

  const handleGenerateQR = async (promotion) => {
    //¿Existe uno?
    const { data: tokenActual } = await getLastToken(promotion.id);

    let token = tokenActual;

    //Si no existe, crear uno
    if (!tokenActual) {
      const { data } = await createToken(promotion);
      token = data;
      console.log("DATA:", data);
    }

    setSelectedPromotion(promotion);
    setSelectedToken(token);

    setOpenQR(true);
  };

  const handleGenerateNewToken = async () => {
    const { data } = await generateNewToken(selectedPromotion);

    setSelectedToken(data);

    setSelectedPromotion((prev) => ({
      ...prev,
      token_lugar: [data],
    }));
    window.location.reload();
  };

  const handleSavePromotion = async (form) => {
    let values = { ...form };
    let error;
    if (selectedPlace) {
      ({ error } = await updatePromotion(selectedPlace.id, values));
    } else {
      ({ error } = await createPromotion(values));
    }

    if (error) {
      console.error(error);
      alert("Error al guardar");
      return;
    }

    setOpenModal(false);
    window.location.reload();
  };

  const handleDelete = async (place) => {
    const confirmacion = window.confirm(`¿Eliminar a ${promociones.nombre}?`);

    if (!confirmacion) return;

    const { error } = await deletePromotion(place.id);

    console.log(error);
  };

  const columns = [
    {
      header: "Lugar",
      accessor: "nombre",
      render: (place) => (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {place.lugar.imagen_url ? (
              <img
                src={place.lugar.imagen_url}
                alt={place.lugar.nombre}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              place.lugar.nombre?.charAt(0)
            )}
          </div>

          <div>
            <p className="text-xs text-center font-medium">
              {place.lugar.nombre}
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
      header: "Descuento",
      accessor: "descuento",
      render: (place) => (
        <p className=" max-w-[80px] text-xs truncate" title={place.descuento}>
          {place.descuento}
        </p>
      ),
    },
    {
      header: "Estado",
      accessor: "activa",
      render: (place) => (
        <button
          onClick={() => handleActivo(place)}
          className={`
            relative w-12 h-6 rounded-full transition
            ${place.activa ? "bg-green-500" : "bg-gray-300"}
          `}
        >
          <span
            className={`
              absolute top-1 w-4 h-4 bg-white rounded-full transition
              ${place.activa ? "right-1" : "left-1"}
            `}
          />
        </button>
      ),
    },
    {
      header: "Ver QR",
      accessor: "qr",
      render: (promotion) => (
        <div className="flex justify-start px-2 ">
          <button
            onClick={() => handleGenerateQR(promotion)}
            className="text-3xl  text-primary hover:text-primary-dark transition"
          >
            <IoQrCodeOutline />
          </button>
        </div>
      ),
    },
    {
      header: "Token",
      accessor: "token",

      render: (promotion) => {
        const tokenActivo = promotion.token_lugar?.find((t) => t.activo);

        return tokenActivo?.token ?? "Sin generar";
      },
    },
  ];
  const filteredPlaces = promociones.filter((place) => {
    const text = search.toLowerCase();

    return Object.values(place).join(" ").toLowerCase().includes(text);
  });
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Buscar promociones o lugares..."
        />
      </div>
      <div className="pt-10">
        <AdminTable
          columns={columns}
          data={filteredPlaces}
          onEdit={handleEdit}
          onDeactivate={(place) => handleDelete(place)}
        />
        <AdminModalQR
          open={openQR}
          token={selectedToken}
          onClose={() => setOpenQR(false)}
          promotion={selectedPromotion}
          onGenerateNew={handleGenerateNewToken}
        />
      </div>{" "}
      <AdminFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSavePromotion}
      >
        {" "}
        <PromotionForm
          form={form}
          setForm={setForm}
          onSave={handleSavePromotion}
        />
      </AdminFormModal>
    </>
  );
}

export default AdminPromotion;
