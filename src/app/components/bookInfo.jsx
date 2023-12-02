"use client";
import styles from "../../styles/details.module.css";
import { useState, useEffect } from "react";
export default function BookInfo({ libro,isDisponible }) {
  const [categories, setCategories] = useState([]);
  console.log(libro)

  return (
    <article className={styles.bookInfo}>
      <div className={styles.bookInfo_header}>
        <h1>{libro.titulo}</h1>
        <p className={styles.estado}>{isDisponible?"Disponible":"Reservado"}</p>
      </div>
      <div className={styles.bookInfo_details}>
        <img
          src={libro.imagen_url ?? "/media/mona.jpg"}
          alt="foto del libro"
          className={styles.imgBook}
        />
        <p className={styles.descpBook}>
          {libro.descripcion}
        </p>
        <div className={styles.editorial}>
          <h2>Editorial</h2>
          {/* <p>{book.editorial?book.editorial:"No hay información"}</p> */}
        </div>
      </div>
      <div className={styles.bookInfo_topic}>
        <h2>Tópicos</h2>
        {categories.length > 0?(
        <div className={styles.categoryTagContainer}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryTag}>
              {category}
            </div>
          ))}
        </div>):
        <p>No hay informacion sobre las categorias</p>}
      </div>
    </article>
  );
}
