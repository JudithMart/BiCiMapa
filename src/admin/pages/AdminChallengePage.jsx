import React, { useEffect, useState } from 'react'
import AdminChallenge from '../components/Challenge/AdminChallenge'
import { getAllChallenges } from '../../services/admin_challenge.service'

import { getAllPlaces } from "../../services/admin_places.service";

function AdminChallengePage() {

     const [reto, setReto] = useState([]);
     const [lugares, setLugares] = useState([]);

        useEffect(() => {
        const loadPlaces = async () => {
          const { data } = await getAllPlaces();
          setLugares(data || []);
        }
        loadPlaces();
        }, []);
        
       useEffect(() => {
        const fetchChallenges = async () => {
          const { data, error } = await getAllChallenges();
          if (error) {
            console.error("Error fetching challenges:", error);
          } else {
            setReto(data);
          }
        };
    
        fetchChallenges();
      }, []);
    
  return (
    <div><AdminChallenge reto={reto}  lugares={lugares} /></div>
  )
}

export default AdminChallengePage