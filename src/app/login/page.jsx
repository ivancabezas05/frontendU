"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../styles/login.module.css";
import Input from "../components/inputForm";
import { validarLogeo } from "../../functionalities/formActions";


export default function LoginPage() {
  const [state, setState] = useState({ usuario: "", contrasena: "" });
  const router = useRouter();

  const mngmtChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleForm = (e) => {
    validarLogeo(e, state, router);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.contenido}>
        <span className={styles.titulo1}>Sistema de reserva de Libros</span>
        <form className={styles.registro} onSubmit={handleForm}>
          <Input
            inputType="text"
            spanText="Usuario o Correo"
            name="usuario"
            value={state.usuario}
            onChange={mngmtChange}
          />
          <div className={styles.label2}>
            <Input
              inputType="password"
              spanText="Contraseña"
              name="contrasena"
              value={state.contrasena}
              onChange={mngmtChange}
            />
            <div className={styles.opcion}>
              <span>
                <button className={styles.button1}>
                  <Link href="./recoverPassword">Olvidé mi contraseña</Link>
                </button>
              </span>
            </div>
          </div>
          <div className={styles.botones}>
            <button className={styles.button1}>
              <Link href="./signIn">Registro usuario</Link>
            </button>
            <button className={styles.button2} type="submit">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
