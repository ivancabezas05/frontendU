import SearchResult from "./searchResultPrestamo";
import styles from "../../styles/prestamos.module.css";

function ResultBooks({ results }) {
  const handleClick = () =>{
    window.location.reload()
  }
  return (
    <div className={styles.resultContainer}>
      <div className={styles.titulo2}>
        <span>Búsqueda - Resultados</span>
        <div className={styles.botones2}>
          <button className={styles.boton2} onClick={handleClick}>
            Volver a buscar
          </button>
        </div>
      </div>
      <h6 className={styles.h1}>Resultados de la Búsqueda: </h6>
      <article>
        <div className={styles.recuadro1}>
          <div className={styles.resultadoBox}>
            <SearchResult results={results} />
          </div>
        </div>
      </article>
    </div>
  );
}

export default ResultBooks;
