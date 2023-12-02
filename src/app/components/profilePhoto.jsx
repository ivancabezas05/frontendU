import styles from "../../styles/profile.module.css";
import React, { useState, useEffect } from "react";
import usuarioAPI from "../api/usuario"

const ProfilePhoto = ({ modo }) => {
  const [imagenURL, setImagenURL] = useState(null);

  useEffect(() => {
    // Recuperar la URL de la imagen del almacenamiento local al cargar el componente
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.foto_url) {
      setImagenURL(usuario.foto_url);
    }
  }, [modo]);

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const newImagenURL = e.target.result;
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        usuario.foto_url = newImagenURL;

        try {
          let res = await usuarioAPI.update(usuario.id, usuario);
          if (res) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
            alert("Imagen actualizada con éxito");
            setImagenURL(newImagenURL);
          } else {
            alert("Error inesperado al actualizar en el servidor");
          }
        } catch (error) {
          console.error("Error al actualizar en el servidor:", error);
          alert("Error inesperado al actualizar en el servidor");
        }
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const handleCambiarImagen = async () => {
    if (imagenURL) {
      setImagenURL(null);
      const usuario = JSON.parse(localStorage.getItem("usuario"));
        usuario.foto_url = "";
        await usuarioAPI.update(usuario.id,usuario);
        localStorage.setItem("usuario",JSON.stringify(usuario));
    }
  };

  return (
    <div className={styles.contenedorphoto}>
      {imagenURL && (
        <div className={styles.elementos}>
          <img src={imagenURL} alt="imagen" />
          <button onClick={handleCambiarImagen}>Cambiar Imagen</button>
        </div>
      )}
      {!imagenURL && (
        <div className={styles.Botoncambiar}>
          <input
            type="file"
            id="cargarimagen"
            accept="image"
            name="foto_url"
            onChange={handleImagenChange}
          />
          <label htmlFor="cargarimagen">Agregar imagen</label>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
