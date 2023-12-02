"use client";

import { useState, useEffect } from "react";
import library from "../../../../../public/fakeData/library.json";
import React from "react";
import styles from "../../../../styles/biblioteca.module.css";
import SearchResult from "@/app/components/searchResultPrestamo";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useGetLibros } from "@/api/libro";

export default function BooksPage() {
  // Hooks
  const { libros: librosAll, librosLoading } = useGetLibros();

  // States
  const [libros, setLibros] = useState([]);
  const [keywords, setKeywords] = useState("");

  // Events
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      let newData = librosAll.filter((libro) =>
        libro.titulo.toLowerCase().includes(keywords)
      );
      setLibros(newData);
    }
  };

  const handleChange = (e) => {
    let valueEnMinuscula = e.target.value.toLowerCase();
    setKeywords(valueEnMinuscula);
  };

  // Efect API
  useEffect(() => {
    setLibros(librosAll);
  }, [librosAll]);

  // Render
  return (
    <>
      {librosLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section className={styles.parte2}>
          <div className={styles.titulo2}>
            <span>Biblioteca</span>
            <div className={styles.buttonContainer}>
              <Link href={"./biblioteca/agregarLibro"}>
                <button className={styles.botontitulo}>
                  Añadir un nuevo recurso
                </button>
              </Link>
              <Link href={"./biblioteca/actualizarLibro"}>
                <button className={styles.botontitulo}>
                  Actualizar un recurso
                </button>
              </Link>
              <Link href={"./biblioteca/eliminarLibro"}>
                <button className={styles.botontitulo}>
                  Eliminar un recurso
                </button>
              </Link>
            </div>
          </div>
          <div>
            <TextField
              placeholder="Ej: code"
              label="Ingrese la(s) palabra(s) clave"
              variant="outlined"
              className={styles.inputText}
              value={keywords}
              onChange={handleChange}
              onKeyDown={handleSearch}
            />
          </div>
          {keywords ? (
            <p className={styles.aviso}>Presione ENTER para filtrar</p>
          ) : (
            ""
          )}
          <SearchResult results={libros} />
        </section>
      )}
    </>
  );
}
