"use client";

import { useState, useEffect } from "react";
import styles from "../../../../../styles/update.module.css";


import Modal from "@mui/material/Modal";
import useUser from "@/hooks/useUser";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useGetLibros} from "@/api/libro";

export default function DeleteBookPage() {
  const [open, setOpen] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [nuevoLibro, setNuevoLibro] = useState({});
  const [libreria, setLibreria] = useState([]);

  const {libros, librosLoading} = useGetLibros();

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
    let librosNuevos = JSON.parse(localStorage.getItem("nuevosLibros"));
    setLibreria(librosNuevos);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const libreriaActualizada = libreria.filter((libro)=>isbn != libro.ISBN);
    localStorage.setItem("nuevosLibros",JSON.stringify(libreriaActualizada));
  };

  const handleBookFound = (e) => {
    setIsbn(e.target.value);
  };

  const { usuario } = useUser();
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>Hola, {usuario.nombre}</div>
      <article className={styles.contenido}>
        <div className={styles.form_titulo}>ELIMINAR RECURSO</div>
        <form action="DELETE" onSubmit={handleSubmit} className={styles.form}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">ISBN</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={isbn}
              onChange={handleBookFound}
              label="ISBN"
            >
              {libreria.map((libro) => {
                return <MenuItem value={libro.ISBN}>{libro.ISBN}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <button
            type="submit"
            className={styles.boton}
            onClick={() => setOpen(true)}
            disabled={isbn === ""}
          >
            {isbn===""?"Selecciona un libro":"Eliminar"}
          </button>
        </form>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Recurso Eliminado
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            El recurso se ha eliminado con éxito
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
