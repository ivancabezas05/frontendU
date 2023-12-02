
"use client"

import styles from "../../../styles/home.module.css";
import Panel from "../../components/panel";
import {usePanel} from "@/hooks/usePanel";

export default function homeStudentPage() {
  // Hooks
  const {
    nombre,
    reservasLoading,
    ultimasReservas,
    masPedidos,
  } = usePanel();

  // Resto de tu código de la página de inicio del alumno
  return (
    <section className={styles.parte2}>
      <div className={styles.titulo2}>
        <span>Bienvenido, {nombre}!</span> {/* Mostramos el nombre aquí */}
      </div>
      {!reservasLoading ? (
        <>
          <Panel texto="Últimas Reservas" reservas={ultimasReservas} admin={true} />
          <Panel texto="Próximos a vencer" reservas={masPedidos} admin={true} />
        </>
      ) : (
        <h1>Loading...</h1>
      ) }

    </section>
  );
};
