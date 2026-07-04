// src/admin/pages/AdminUserPage.jsx
import React, { useEffect, useState } from 'react'
import AdminUser from '../components/User/AdminUser'
import {getAllUsers } from '../../services/admin_user.service'

function AdminUserPage() {
  const [usuarios, setUsuarios] = useState([]);

   useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await getAllUsers();
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsuarios(data);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div><AdminUser usuarios={usuarios} /></div>
  )
}



export default AdminUserPage