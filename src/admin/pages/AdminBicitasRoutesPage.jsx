import React, { useEffect, useState } from 'react'
import AdminBicitasRoutes from '../components/AdminBicitasRoutes'
import {getAllRoutes } from '../../services/admin_bicitas.service'

function AdminBicitasRoutesPage() {

 const [rutas, setRutas] = useState([]);

   useEffect(() => {
    const fetchRutas = async () => {
      const { data, error } = await getAllRoutes();
      if (error) {
        console.error("Error fetching routes:", error);
      } else {
        setRutas(data);
      }
    };

    fetchRutas();
  }, []);



  return (
    <div><AdminBicitasRoutes rutas={rutas} /></div>
  )
}

export default AdminBicitasRoutesPage