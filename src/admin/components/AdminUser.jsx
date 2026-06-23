import React from "react";
import AdminTable from "./AdminTable";

function AdminUser({ usuarios }) {
  const columns = [
    {
      header: "Usuario",
      accessor: "nombre",
    },
    {
      header: "Correo",
      accessor: "email",
    },
    {
      header: "Premium",
      accessor: "es_premium",
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.es_premium
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {user.es_premium ? "Premium" : "Básico"}
        </span>
      ),
    },
  ];

  return (
    <div className="pt-24">
      <AdminTable
        columns={columns}
        data={usuarios}
        onEdit={(user) => console.log(user)}
        onDelete={(user) => console.log(user)}
      />
    </div>
  );
}

export default AdminUser;
