// src/admin/components/AdminUser.jsx
import React, { useState } from "react";
import AdminTable from "../AdminTable";
import {
  togglePremium,
  deactivateUser,
  updateUser,
} from "../../../services/admin_user.service";
import AdminFormModal from "../AdminFormModal";
import UserForm from "../Form/UserForm";
import Search from "../Search";

function AdminUser({ usuarios }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    rol: "user",
    activo: true,
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setForm({
      nombre: user.nombre || "",
      telefono: user.telefono || "",
      email: user.email || "",
      rol: user.rol || "user",
      activo: user.activo,
    });
    setOpenModal(true);
  };

  const handleSaveUser = async (form) => {
    const { error } = await updateUser(selectedUser.id, form);

    if (error) {
      console.error(error);
      alert("Error al guardar: " + error.message);
      return;
    }

    setOpenModal(false);

    window.location.reload();
  };

  const handlePremium = async (user) => {
    const { error } = await togglePremium(user.id, user.es_premium);
    if (error) {
      alert("No se pudo actualizar el estado premium");
      return;
    }

    window.location.reload();
  };

  const handleDeactivate = async (user) => {
    if (user.rol === "admin") {
      alert("No puedes desactivar un administrador.");
      return;
    }

    const confirmacion = window.confirm(`¿Desactivar a ${user.nombre}?`);

    if (!confirmacion) return;

    const { error } = await deactivateUser(user.id);
    if (error) {
      alert("No se pudo desactivar al usuario");
      return;
    }

    window.location.reload();
  };

  const columns = [
    {
      header: "Usuario",
      accessor: "nombre",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {user.nombre?.charAt(0)}
          </div>

          <div>
            <p className="font-medium">{user.nombre}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Teléfono",
      accessor: "telefono",
    },
    {
      header: "Rol",
      accessor: "rol",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.rol === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.rol}
        </span>
      ),
    },
    {
      header: "Premium",
      accessor: "es_premium",
      render: (user) => (
        <button
          onClick={() => handlePremium(user)}
          className={`
        relative w-12 h-6 rounded-full transition
        ${user.es_premium ? "bg-green-500" : "bg-gray-300"}
      `}
        >
          <span
            className={`
          absolute top-1 w-4 h-4 bg-white rounded-full transition
          ${user.es_premium ? "right-1" : "left-1"}
        `}
          />
        </button>
      ),
    },
    {
      header: "Estado",
      accessor: "activo",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.activo
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  const filteredUsers = usuarios.filter((user) => {
    const text = search.toLowerCase();

    return Object.values(user).join(" ").toLowerCase().includes(text);
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Buscar usuario..."
        />
      </div>
      <div className="pt-10">
        <AdminTable
          columns={columns}
          data={filteredUsers}
          onEdit={handleEdit}
          onDeactivate={(user) => handleDeactivate(user)}
          onPremiumToggle={(user) => handlePremium(user)}
        />
      </div>{" "}
      <AdminFormModal
        open={openModal}
        user={selectedUser}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveUser}
      >
        {" "}
        <UserForm form={form} setForm={setForm} onSave={handleSaveUser} />
      </AdminFormModal>
    </>
  );
}

export default AdminUser;
