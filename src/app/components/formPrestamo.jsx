"use client"
import React, { useState, useRef } from 'react';
import styles from '../../styles/formPrestamo.module.css';

function FormPrestamo(props) {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const categoryInputRef = useRef(null);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);
  }

  const handleCategoryInputKeyDown = (e) => {
    if (e.key === 'Enter' && categoryInputRef.current.value.trim() !== '') {
      const newCategory = categoryInputRef.current.value.trim();
      setCategories([...categories, newCategory]);
      categoryInputRef.current.value = '';
    }
  }

  const removeCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  }

  const handleSearch = () => {
    props.onSearch(searchText, categories);
  }

  return (
    <div >
    <div className={styles.busqueda}>
        <div className={styles.lupa}>
            <img src="/media/lupa.png" alt="lupa" />
        </div>
      <div className={styles.info}>
        
        <label className={styles.placeholder} htmlFor="">Ingresa la palabra clave</label>
        <input
          className={styles.input}
          type="text"
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
            
    </div>


    <div>
      <div className={styles.busqueda4}>
      <div className={styles.lupa2}>
            <img src="/media/lupa.png" alt="lupa" />
        </div>
      <div className={styles.info}>
        <label className={styles.placeholder} htmlFor="">Tipo de recurso</label>
        <input
          className={styles.input3}
          ref={categoryInputRef}
          type="text"
          onKeyDown={handleCategoryInputKeyDown}
        />
        </div>
    </div>
    <div className={styles.categoryTagContainer}>
        {categories.map((category, index) => (
          <div key={index} className={styles.categoryTag}>
            {category} <button className={styles.categoryX} onClick={() => removeCategory(index)}>x</button>
          </div>
        ))}
        </div>
    </div>
    
    <div className={styles.botones}>
                        <button className={styles.boton1}>Limpiar</button>
                        <button className={styles.boton2} onClick={handleSearch}>Buscar</button>
                </div>
        
    </div>
  );
}

export default FormPrestamo;
