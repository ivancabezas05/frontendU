"use client";
import { useState, useEffect } from "react";
import React from "react";
import useUser from "@/hooks/useUser";
import styles from "../../../../../styles/addBook.module.css";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { createLibro } from "@/api/https";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const nombre = useUser();
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [serie, setSerie] = useState("");

  const router = useRouter();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoLibro = {
      titulo: titulo,
      autor: autor,
      ISBN: isbn,
      n_edicion: serie,
    };
    let librosNuevos = JSON.parse(localStorage.getItem("nuevosLibros"));
    createLibro(nuevoLibro).then((res) => {
      librosNuevos.push(res);
      router.push("/BookStore/adminPage/biblioteca");
    });

    localStorage.setItem("nuevosLibros", JSON.stringify(librosNuevos));
    setOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titulo}>Hola, {nombre}</div>
      <article className={styles.contenido}>
        <div className={styles.img_container}>
          <img src="/media/mona.jpg" alt="pongale una imagen ps" />
        </div>
        <div className={styles.form_container}>
          <div className={styles.form_titulo}>INSERTAR NUEVO LIBRO</div>
          <form action="POST" onSubmit={handleSubmit}>
            <TextField
              label="TÍTULO"
              variant="outlined"
              className={styles.inputText}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <TextField
              label="Autor, autores"
              variant="outlined"
              className={styles.inputText}
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            <TextField
              label="ISBN"
              variant="outlined"
              className={styles.inputText}
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <TextField
              label="Serie, tipo"
              variant="outlined"
              className={styles.inputText}
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
            />
            <button
              type="submit"
              className={styles.boton}
              onClick={() => setOpen(true)}
            >
              Guardar
            </button>
          </form>
        </div>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registro Completo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            El recurso se ha grabado con éxito.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
