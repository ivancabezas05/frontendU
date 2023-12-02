"use client";
import { useState, useEffect } from "react";
import styles from "../../../../../styles/update.module.css";
import useUser from "@/hooks/useUser";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getLibros, updateLibro } from "@/api/https";

export default function UpdateBook() {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [serie, setSerie] = useState("");
  const [nuevoLibro, setNuevoLibro] = useState({});
  const [libreria, setLibreria] = useState([]);
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
    const libreria = async () => {
      await getLibros().then((res) => {
        setLibreria(res);
      });
    };
    libreria();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const libro = {
      id: nuevoLibro.id,
      titulo: titulo,
      autor: autor,
      ISBN: isbn,
      n_edicion: serie,
    };
    updateLibro(libro).then((res) => {
      setNuevoLibro(res);
    });
    const libreriaActualizada = libreria.map((libro) =>
      isbn === libro.ISBN ? nuevoLibro : libro
    );
    localStorage.setItem("nuevosLibros", JSON.stringify(libreriaActualizada));
  };

  const handleBookFound = (e) => {
    setIsbn(e.target.value);
    const libroSeleccionado = libreria.find(
      (libro) => libro.isbn === e.target.value
    );
    setSerie(libroSeleccionado.serie);
    setAutor(libroSeleccionado.autorid);
    setTitulo(libroSeleccionado.titulo);
    setNuevoLibro(libroSeleccionado);
  };

  const nombre = useUser();
  return (
    <div className={styles.container}>
      <div className={styles.titulo}>Hola, {nombre}</div>
      <article className={styles.contenido}>
        <div className={styles.form_titulo}>ACTUALIZAR RECURSO</div>
        <form action="PUT" onSubmit={handleSubmit} className={styles.form}>
          <fieldset>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                ISBN
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={isbn}
                onChange={handleBookFound}
                label="ISBN"
              >
                {libreria.map((libro) => {
                  return (
                    <MenuItem value={libro.isbn}>
                      {libro.isbn} - {libro.titulo}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              label="Serie, tipo"
              variant="outlined"
              className={styles.inputText}
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              disabled={isbn === ""}
            />
          </fieldset>
          <fieldset>
            <TextField
              label="TÍTULO"
              variant="outlined"
              className={styles.inputText}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={isbn === ""}
            />
            <TextField
              label="Autor, autores"
              variant="outlined"
              className={styles.inputText}
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              disabled={isbn === ""}
            />
          </fieldset>
          <button
            type="submit"
            className={styles.boton}
            onClick={() => setOpen(true)}
            disabled={isbn === ""}
          >
            Guardar
          </button>
        </form>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Recurso Actualizado
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            El recurso se ha actualizado con éxito
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
