"use client";
import React from "react";
import styles from "../../styles/details.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function ReservaBottom({ book, isDisponible }) {
  const [value, setValue] = useState(dayjs());
  const [fechaReservada, setFechaReservada] = useState("");
  const [horaReservada, setHoraReservada] = useState("");
  const [correo, setCorreo] = useState("");
  const [librosReservados, setLibrosReservados] = useState("");
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const horaActual = dayjs().hour();
    const minutosActuales = dayjs().minute();
    const segundosActuales = dayjs().second();
    var fechaConHora = value
      .set("hour", horaActual)
      .set("minute", minutosActuales)
      .set("second", segundosActuales);
      var fecha = dayjs(value, { format: 'DD-MM-YYYY' });
      const hora24Format = dayjs(fechaConHora, { format: 'h:mm a' }).format('HH:mm');
    setFechaReservada(fecha);
    setHoraReservada(hora24Format);
  }, [value]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    let correoUsuario = usuario.correo;
    let librosReservados =
      JSON.parse(localStorage.getItem("reservas")) || [];
    setCorreo(correoUsuario);
    setLibrosReservados(librosReservados);
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsDisponible(false);
    setOpen(true);
    capturarFecha();
  };

  const capturarFecha = () => {
    let reservas = JSON.parse(localStorage.getItem("reservas"));
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; 
    const dia = fechaActual.getDate();
    const horas = fechaActual.getHours();
    const minutos = fechaActual.getMinutes();
    const segundos = fechaActual.getSeconds();
    const milisegundos = fechaActual.getMilliseconds();
    const numeroUnico = parseInt(`${año}${mes}${dia}${horas}${minutos}${segundos}${milisegundos}${Math.floor(Math.random() * 1000)}`);
    const newReserva = {
      idReserva: numeroUnico,
      correoAlumno: correo,
      tituloLibro: book.titulo,
      anio: fechaReservada.year(),
      mes: fechaReservada.month() + 1,
      dia: fechaReservada.day(),
      hora: horas,
      minuto: minutos,
    };
    reservas.push(newReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    setReservaLibros(reservas);
    setValue(dayjs());
  };

  return (
    <article className={styles.reservaBottom}>
      <div className={styles.subtitle}>
        <span>Reservar</span>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
        <form className={styles.formReserva} onSubmit={handleSubmit}>
          <DateField
            label="Ingrese una fecha límite"
            value={value}
            onChange={handleChange}
            format="DD/MM/YYYY"
          />
          <button
            className={styles.boton}
            type="submit"
            disabled={!isDisponible}
            style={!isDisponible ? { backgroundColor: "black",color:"orange" } : {}}
          >
            Reservar
          </button>
        </form>
      </LocalizationProvider>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reserva Completada
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`La reserva del recurso se ha realizado con éxito. Este debe ser devuelto hasta el día ${fechaReservada}.`}
          </Typography>
        </Box>
      </Modal>
    </article>
  );
}
