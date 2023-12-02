"use client"

import React, { useMemo } from 'react'
import { useState,useEffect } from 'react'
import BookInfo from './bookInfo'
import ReservaBottom from './reservaBottom'
import {useGetLibro} from "@/api/libro";
import {useGetReservas} from "@/api/reserva";


export default function CitasPage({libroId}) {
  const {libro, libroLoading} = useGetLibro(libroId);
  const {reservas, reservasLoading, reservasEmpty} = useGetReservas();

  const isDisponible = useMemo(()=>{
    if(!libro || reservasEmpty) return true;
    const reserva = reservas.find((res)=>res.libroid === libro.id)
    return reserva ? false : true;
  },[libro, reservas, reservasEmpty])

  return (
    <>
      {libroLoading ? <h1>Loading...</h1> : (
        <>
          <BookInfo libro={libro} isDisponible = {isDisponible}/>
          <ReservaBottom book={libro} isDisponible = {isDisponible} />
        </>
      )}
    </>
  )


  
}
