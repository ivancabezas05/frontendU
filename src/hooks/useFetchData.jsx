import { useEffect, useState } from "react";

export default function useFetchData(api){
  const [datos,setDatos] = useState([]);
    useEffect(()=>{
      const obtenerDatos = async () => {
        try {
          const res = await api.findAll();
          const rawData = res.data;
          console.log("Datos Cargados:", rawData);
          setDatos(rawData);
        } catch (error) {
          console.error("Error inesperado:", error);
          throw error;
        }
      };
      obtenerDatos();
    },[api])
    return datos;
}