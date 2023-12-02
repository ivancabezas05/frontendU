
"use client"
import styles from "../../styles/home.module.css";
import Link from 'next/link';
import {usePathname,useSearchParams } from 'next/navigation';

const Sidebar = () => {
  const path = usePathname();
  const { correo } = useSearchParams();

  // Determinar si estamos en una de las páginas específicas (admin, inicioadmin, biblioteca)
  const isAdminPage = path.startsWith('/BookStore/adminPage');

  // Agregar el parámetro 'correo' a los enlaces de Sidebar
  const correoParam = correo ? `?correo=${correo}` : '';

  return (
    <aside className={styles.barralateral}>
      <ul className={styles.opciones}>
        <li className={styles.li}>
          <Link className={styles.link} href={`${isAdminPage ? '/BookStore/adminPage' : '/BookStore/studentPage'}${correoParam}`}>
            {isAdminPage ? 'Inicio' : 'Principal'}
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} href={`${isAdminPage ? '/BookStore/adminPage/perfil' : '/BookStore/studentPage/perfil'}${correoParam}`}>
            {isAdminPage ? 'Perfil' : 'Perfil'}
          </Link>
        </li>
        <li className={styles.li}>
          <Link  className={styles.link} href={`${isAdminPage ? '/BookStore/adminPage/biblioteca'   : '/BookStore/studentPage/prestamos'}${correoParam}`}>
            {isAdminPage ? 'Biblioteca'   : 'Prestamos'}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;