//AdminPlacePage.jsx
import React, { useEffect, useState } from "react";

import { getAllPlaces } from "../../services/admin_places.service";
import AdminPlace from "../components/Place/AdminPlace";

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
