// src/admin/components/AdminUser.jsx
import React, { useState } from "react";
import AdminTable from "./AdminTable";
import AdminUserModal from "./AdminUserModal";
import {
  togglePremium,
  deactivateUser,
  updateUser,
} from "../../services/admin.service";

function AdminUser({ usuarios }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleSaveUser = async (userData) => {
    const { error } = await updateUser(selectedUser.id, userData);

    if (error) {
      alert("Error al actualizar usuario");
      return;
    }

    alert("Usuario actualizado");

    setOpenModal(false);

    window.location.reload();
  };

  const handlePremium = async (user) => {
    await togglePremium(user.id, user.es_premium);

    window.location.reload();
  };

  const handleDeactivate = async (user) => {
    if (user.rol === "admin") {
      alert("No puedes desactivar un administrador.");
      return;
    }

    const confirmacion = window.confirm(`¿Desactivar a ${user.nombre}?`);

    if (!confirmacion) return;

    await deactivateUser(user.id);

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

  return (
    <div className="pt-24">
      <AdminTable
        columns={columns}
        data={usuarios}
        onEdit={handleEdit}
        onDeactivate={(user) => handleDeactivate(user)}
        onPremiumToggle={(user) => handlePremium(user)}
      />
    </div>
  );
}

export default AdminUser;
