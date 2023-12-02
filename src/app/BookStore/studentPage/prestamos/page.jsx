"use client";

import { useEffect, useState } from "react";
import libreriaAPI from "../../../api/libro";
import autoresAPI from "../../../api/autor";
import styles from "../../../../styles/prestamos.module.css";
import FormPrestamo from "@/app/components/formPrestamo";
import ResultBooks from "@/app/components/resultBooksPrestamo";
import useFetchData from "@/hooks/useFetchData";

const PrestamosPage = () => {
  const autorData = useFetchData(autoresAPI);
  const libros = useFetchData(libreriaAPI);   
  useEffect(() => { 
    setLibraryData(libros);
  },[libros])
  // Resto de tu código de la página de inicio del alumno

  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [libraryData, setLibraryData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Nuevo estado para mostrar resultados
  const [tituloCheckbox, setTituloCheckbox] = useState(false);
  const [autorCheckbox, setAutorCheckbox] = useState(false);
  const [serieCheckbox, setSerieCheckbox] = useState(false);
  const [isbnCheckbox, setIsbnCheckbox] = useState(false);
  const [tituloTexto, setTituloTexto] = useState("");
  const [autores, setAutores] = useState("");
  const [nEdicion, setnEdicion] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleSearch = async (text, categories) => {
    setSearchText(text);
    setCategories(categories);
    console.log(libraryData);
    let textResults = libraryData.filter((libro) =>
      libro.titulo.toLowerCase().includes(text.toLowerCase())
    );

    /*if (categories.length > 0) {
        textResults = textResults.filter((libro) => {
        const libroCategorias = (libro.categoria || "").toLowerCase();
        return categories.some((category) =>
          libroCategorias.includes(category.toLowerCase())
        );
      });  
    }*/

    if(tituloTexto){
      textResults = textResults.filter((libro) =>
      libro.titulo.toLowerCase().includes(tituloTexto.toLowerCase())
    );}
    console.log(autorData);
    const idAutor = autorData.find((autor)=>autor.nombre === autores);
    if(idAutor){
      textResults = textResults.filter((libro) =>
      libro.autorid === idAutor)
      }

    if (nEdicion) {
      let serie = parseInt(nEdicion);
      textResults = textResults.filter((libro) => {
        return libro["serie"] === serie;
      });
    }

    if(isbn){
      textResults = textResults.filter((libro) =>
      libro.isbn().includes(isbn)
    );}
    setSearchResults(textResults);
    setShowResults(true); // Mostrar resultados después de la búsqueda
  };

  const handleTituloCheckboxChange = () => {
    setTituloCheckbox(!tituloCheckbox);
  };

  const handleAutorCheckboxChange = () => {
    setAutorCheckbox(!autorCheckbox);
  };

  const handleSerieCheckboxChange = () => {
    setSerieCheckbox(!serieCheckbox);
  };

  const handleIsbnCheckboxChange = () => {
    setIsbnCheckbox(!isbnCheckbox);
  };

  return showResults ? (
    <ResultBooks results={searchResults}/>
  ) : (
    <section className={styles.parte2}>
      <div className={styles.titulo2}>
        <span>Búsqueda</span>
      </div>
      <article className={styles.articulo1}>
        <div className={styles.recuadro1}>
          <div className={styles.Barrasprestamo}>
            <FormPrestamo onSearch={handleSearch} />
          </div>
          <div className={styles.checkbox_container}>
            <div className={styles.checkboxs}>
              <span>Incluir búsqueda en</span>
              <div>
                <input
                  type="checkbox"
                  checked={tituloCheckbox}
                  onChange={handleTituloCheckboxChange}
                />
                <span>Título</span>
                {tituloCheckbox && (
                  <input
                    type="text"
                    name="titulo"
                    value={tituloTexto}
                    onChange={(e) => setTituloTexto(e.target.value)}
                  />
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={autorCheckbox}
                  onChange={handleAutorCheckboxChange}
                />
                <span>Autor, autores</span>
                {autorCheckbox && (
                  <input
                    type="text"
                    name="autor,autores"
                    value={autores}
                    onChange={(e) => setAutores(e.target.value)}
                  />
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={serieCheckbox}
                  onChange={handleSerieCheckboxChange}
                />
                <span>Serie</span>
                {serieCheckbox && (
                  <input
                    type="text"
                    name="serie"
                    value={nEdicion}
                    onChange={(e) => setnEdicion(e.target.value)}
                  />
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={isbnCheckbox}
                  onChange={handleIsbnCheckboxChange}
                />
                <span>ISBN</span>
                {isbnCheckbox && (
                  <input
                    type="text"
                    name="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default PrestamosPage;
