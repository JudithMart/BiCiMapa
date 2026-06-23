import React, { useEffect, useState } from 'react'
import AdminUser from '../components/AdminUser'
import {getAllUsers } from '../../services/admin.service'

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