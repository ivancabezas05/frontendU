import { useState, useEffect } from "react";
import React from "react";
import styles from "../../styles/libros.module.css";
import ReservaModal from "./reservaModal";
import useFetchData from "@/hooks/useFetchData";
import editorialAPI from "../api/editorial";
import autoresAPI from "../api/autor";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Link from "next/link";

const BookCard = (props) => {
  const { libro, isbn13, librosReservados, setReservaLibros, user } = props;
  const [isReserva, setIsReserva] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [fechaReserva, setFechaReserva] = useState("");
  const [nombreAutor, setNombreAutor] = useState("");
  const [nombreEditorial, setNombreEditorial] = useState("");
  const editorialData = useFetchData(editorialAPI);
  const autorData = useFetchData(autoresAPI);

  const reservarLibro = () => {
    setOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const obtenerSiglas = (titulo) => {
    const tituloDividido = titulo.split(/\s+/); //las palabras del titulo se separan por " " y se almacena en un arreglo
    const primeraSigla = tituloDividido[0][0].toUpperCase();
    const segundaSigla =
      tituloDividido[tituloDividido.length - 1][0].toUpperCase();
    return primeraSigla + segundaSigla;
  };

  const esReservado = () => {
    for (let i = 0; i < librosReservados.length; i++) {
      if (isbn13 === librosReservados[i].isbn) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setIsReserva(esReservado());
  });
  useEffect(() => {
    const autorLibro = autorData.find((autor) => autor.id === libro.autorid);
    if (autorLibro) {
      setNombreAutor(autorLibro.nombre);
    } else {
      setNombreAutor("Autor no encontrado");
    }
  }, [autorData]);

  useEffect(() => {
    const editorialLibro = editorialData.find(
      (editorial) => editorial.id === libro.editorialid
    );
    if (editorialLibro) {
      setNombreEditorial(editorialLibro.nombre);
    } else {
      setNombreEditorial("Editorial no encontrada");
    }
  }, [editorialData]);

  return (
    <>
      <article className={styles.libro}>
        <div className={styles.librocuadro1}>
          <div className={styles.icono3}>
            <span>{obtenerSiglas(libro.titulo)}</span>
          </div>
          <p>{libro.titulo}</p>
        </div>
        <div className={styles.imglibro}>
          <Link href={`../Citas/${libro.id}`} className={styles.libroContainer}>
            <div className={styles.imglibro2}>
              <img
                src={libro.imagen_url ? libro.imagen_url : "/media/mona.jpg"}
                alt={libro.titulo}
              />
            </div>
          </Link>
        </div>
        <div className={styles.informacionlibro}>
          <span className={styles.spaninfo1}>ISBN: {libro.isbn}</span>
          <span className={styles.spaninfo2}>Autor: {nombreAutor}</span>
          <span className={styles.spaninfo2}>
            Editor: {nombreEditorial ? nombreEditorial : "No hay información"}
          </span>
          <span className={styles.spaninfo2}>
            Estado: {isReserva ? "Reservado" : "Disponible"}
          </span>
        </div>
        <Button
          onClick={reservarLibro}
          disabled={isReserva ? true : false}
          className={styles.button}
        >
          Reservar
        </Button>
      </article>
      <ReservaModal
        open={openCalendar}
        handleClose={handleCloseCalendar}
        setOpenAlert={setOpenAlert}
        setFechaReserva={setFechaReserva}
        libro={libro}
        fechaReserva={fechaReserva}
        setIsReserva={setIsReserva}
        setReservaLibros={setReservaLibros}
        user={user}
      />
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle id="alert-dialog-title">
          {"Reserva completada"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`La reserva del recurso se ha realizado con éxito. Este debe ser devuelto hasta el día ${fechaReserva}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAlert()} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
