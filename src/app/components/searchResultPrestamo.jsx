"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/formPrestamo.module.css";
import BookCard from "./bookCard";
import librosAPI from "../api/libro";
import reservaAPI from "../api/reserva";
import useFetchData from "@/hooks/useFetchData";

function SearchResult({ results }) {
  const [user, setUser] = useState({});
  const [reservaLibros, setReservaLibros] = useState([]);
  const [librosReservados, setlibrosReservados] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 3;
  const reservaData = useFetchData(reservaAPI);
  const librosData = useFetchData(librosAPI);
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    setUser(usuario || {});
    setReservaLibros(reservaData);
    const librosRes = reservaData.filter((reserva)=>reserva.idusuario === usuario.id);
    setlibrosReservados(librosRes);
  }, []);


  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const booksToDisplay = results.slice(startIndex, endIndex);

  return (
    <div style={{ width: "100%" }}>
      {booksToDisplay.length > 0 ? (
        <div className={styles.resultadosGrid}>
          {booksToDisplay.map((libro, index) => (
            <div key={`list-${libro.id}`} className={styles.resultadoBox}>
              <BookCard
                isbn13={libro.isbn}
                libro={libro}
                librosReservados={librosReservados}
                setReservaLibros={setReservaLibros}
                user ={user}
      
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
      <div className={styles.busquedalibro}>
        <button
          className={styles.botoncambio}
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className={styles.botoncambio}
          onClick={handleNextPage}
          disabled={endIndex >= results.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default SearchResult;
