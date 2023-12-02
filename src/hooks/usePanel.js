'use client';

import useUser from "@/hooks/useUser";
import {useGetReservas} from "@/api/reserva";
import {useGetLibros} from "@/api/libro";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

export const usePanel = () => {
    // Hooks
    const {usuario} = useUser()
    const {reservas, reservasLoading} = useGetReservas();
    const {libros, librosLoading} = useGetLibros();
  
    // States
    const [ultimasReservas, setUltimasReservas] = useState([]);
    const [masPedidos, setMasPedidos] = useState([]);
  
    // Methods
    const init = useCallback(() => {
      if (reservasLoading || librosLoading || !usuario) return;
  
      // Set libro
      let reservasLibro = reservas.map((reserva) => {
        const libro = libros.find((libro) => libro.id === reserva.libroid);
        reserva.libro = libro;
        return reserva;
      });

      // Validations
      if(usuario.idtipousuario === 1){
        reservasLibro = reservasLibro.filter((reserva) => reserva.usuarioid === usuario.id);
      }
  
      // Ultimas reservas
      const ultimasReservas = _.orderBy(reservasLibro, ['fecha_reserva'], ['desc']); 
      setUltimasReservas(ultimasReservas);
  
      // Mas pedidos
      const cuentaLibros = _.countBy(reservasLibro, 'libroid');
      const obtenerCuenta = (reserva) => cuentaLibros[reserva.libroid];
      const reservasOrdenadas = _.orderBy(reservasLibro, [obtenerCuenta], ['desc']);
      const reservasUnicas = _.uniqBy(reservasOrdenadas, 'libroid');
      setMasPedidos(reservasUnicas);
  
    }, [reservasLoading, librosLoading, reservas, libros, usuario]);
  
    useEffect(() => {
      init();
    }, [reservasLoading, librosLoading, reservas, libros, usuario, init]);

  return {
    nombre: usuario?.nombre || '',
    reservas, 
    reservasLoading,
    ultimasReservas,
    masPedidos,
  };
}