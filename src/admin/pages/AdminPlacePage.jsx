//AdminPlacePage.jsx
import React, { useEffect, useState } from "react";
import AdminPlace from "../components/AdminPlace";
import { getAllPlaces } from "../../services/admin_places.service";

function AdminPlacePage() {

  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const fetchLugares = async () => {
      const { data, error } = await getAllPlaces();
      if (error) {
        console.error("Error fetching places:", error);
      } else {
        setLugares(data);
      }
    };

    fetchLugares();
  }, []);

  return (
    <div>
      <AdminPlace lugares={lugares}  />
    </div>
  );
}

export default AdminPlacePage;
