'use client';

import styles from "../../../styles/home.module.css";
import Panel from "../../components/panel";
import _ from "lodash";
import {usePanel} from "@/hooks/usePanel";

export default function HomeAdminPage() {
  // Hooks
  const {
    nombre,
    reservasLoading,
    ultimasReservas,
    masPedidos,
  } = usePanel();
  
  return (
    <section className={styles.parte2}>
      <div className={styles.titulo2}>
        <span>Bienvenido, {nombre}!</span>
      </div>
      {!reservasLoading ? (
        <>
          <Panel texto="Últimas Reservas" reservas={ultimasReservas} admin={true} />
          <Panel texto="Los más pedidos" reservas={masPedidos} admin={true} />
        </>
      ) : (
        <h1>Loading...</h1>
      ) }
      
    </section>
  );
}
