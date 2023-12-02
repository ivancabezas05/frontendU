"use client";
import styles from "../../styles/profile.module.css";
import SectionBar from "./sectionBarProfile";
import InputProfile from "./inputProfile";
import ProfilePhoto from "./profilePhoto";
import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { guardarDatos } from "@/functionalities/formActions";
import { getUserId } from "@/api/https";

const FormPerfil = ({ modo, nombre }) => {
  const longitudDni = 8;
  const longitudPasaporte = 9;
  const colores = ["Negro", "Blanco", "Morado"];
  const idiomas = ["español", "inglés"];
  const [open, setOpen] = useState(false);
  const [tipoDoc, setTipoDoc] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] =
    useState("DATOS PERSONALES");
  const [datosPersonales, setDatosPersonales] = useState({
    id: 0,
    nombre: "",
    apellidos: "",
    foto_url: "",
    nro_documento: "",
    correo_electronico: "",
    contrasena: "",
    idioma: "",
    color: "",
    prefijo: "",
    idioma: "",
    idtipodocumento: 0,
    idtipousuario: 0,
  });

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

  const getUsuario = (id) => {
    getUserId(id)
      .then((res) => {
        setDatosPersonales(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const usuarioJSON = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioJSON);
    if (usuario) {
      // setDatosPersonales(usuario);
      usuario.idtipodocumento === 1
        ? setTipoDoc("DNI")
        : setTipoDoc("Pasaporte");
    }
    getUsuario(usuario.id);
  }, []);

  // Función para manejar cambios en los datos personales
  const handleDatosPersonalesChange = (e) => {
    let { name, value } = e.target;
    if (name === "idtipodocumento")
      value = value === "DNI" || value === "dni" ? 1 : 2;
    setDatosPersonales({ ...datosPersonales, [name]: value });
  };

  // Función para guardar los cambios en el localStorage
  const handleSave = (e) => {
    e.preventDefault();
    guardarDatos(
      datosPersonales,
      modo,
      colores,
      idiomas,
      longitudPasaporte,
      longitudDni
    );
    setOpen(true);
  };

  return (
    <section className={styles.parte2}>
      <div className={styles.titulo2}>
        <span>Hola, {nombre}</span>
      </div>
      <article className={styles.articulo1}>
        <div className={styles.recuadro1}>
          <div className={styles.cuadro1}>
            <ProfilePhoto modo={modo} />
          </div>
          <div className={styles.cuadro2}>
            <SectionBar
              setOpcionSeleccionada={setOpcionSeleccionada}
              modo={modo}
            />
            {modo === "admin" ? (
              <form className={styles.formulario} action="">
                {/* Renderizar inputs basados en la opción seleccionada */}
                {opcionSeleccionada === "DATOS PERSONALES" && (
                  <>
                    <InputProfile
                      placeholder="Nombres"
                      inputType="text"
                      required
                      name="nombre"
                      value={datosPersonales.nombre || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Tipo de Documento"
                      inputType="text"
                      name="idtipodocumento"
                      required
                      value={tipoDoc || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Apellidos"
                      inputType="text"
                      required
                      name="apellidos"
                      value={datosPersonales.apellidos || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Nro de Documento"
                      inputType="text"
                      name="nro_documento"
                      required
                      value={datosPersonales.nro_documento || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <button
                      type="button"
                      className={styles.Button}
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                  </>
                )}
                {opcionSeleccionada === "CUENTA" && (
                  <>
                    <InputProfile
                      placeholder="Correo"
                      inputType="email"
                      name="correo_electronico"
                      required
                      value={datosPersonales.correo_electronico || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Password"
                      inputType="password"
                      name="contrasena"
                      required
                      value={datosPersonales.contrasena || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <button
                      type="button"
                      className={styles.Button}
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                  </>
                )}
                {opcionSeleccionada === "PREFERENCIAS" && (
                  <>
                    <InputProfile
                      placeholder="Color"
                      inputType="text"
                      name="color"
                      required
                      value={datosPersonales.color || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Prefijo"
                      inputType="text"
                      name="prefijo"
                      required
                      value={datosPersonales.prefijo || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Idioma"
                      inputType="text"
                      name="idioma"
                      required
                      value={datosPersonales.idioma || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <button
                      type="button"
                      className={styles.Button}
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                  </>
                )}
              </form>
            ) : modo === "alumno" ? (
              <form className={styles.formulario} action="">
                {/* Renderizar inputs basados en la opción seleccionada */}
                {opcionSeleccionada === "DATOS PERSONALES" && (
                  <>
                    <InputProfile
                      placeholder="Nombres"
                      inputType="text"
                      name="nombre"
                      value={datosPersonales.nombre || ""}
                      onChange={handleDatosPersonalesChange}
                      required
                    />
                    <InputProfile
                      placeholder="Tipo de Documento"
                      inputType="text"
                      name="idtipodocumento"
                      required
                      value={tipoDoc || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Apellidos"
                      inputType="text"
                      name="apellidos"
                      required
                      value={datosPersonales.apellidos || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Nro de Documento"
                      inputType="text"
                      name="nro_documento"
                      required
                      value={datosPersonales.nro_documento || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <button
                      type="button"
                      className={styles.Button}
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                  </>
                )}
                {opcionSeleccionada === "CUENTA" && (
                  <>
                    <InputProfile
                      placeholder="Correo"
                      inputType="email"
                      name="correo_electronico"
                      required
                      value={datosPersonales.correo_electronico || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <InputProfile
                      placeholder="Password"
                      inputType="password"
                      name="contrasena"
                      required
                      value={datosPersonales.contrasena || ""}
                      onChange={handleDatosPersonalesChange}
                    />
                    <button
                      type="button"
                      className={styles.Button}
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                  </>
                )}
              </form>
            ) : null}
          </div>
        </div>
      </article>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Datos Guardados correctamente
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Haga click afuera del modal para volver a la página`}
          </Typography>
        </Box>
      </Modal>
    </section>
  );
};

export default FormPerfil;
