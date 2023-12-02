"use client"
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../../styles/home.module.css";

const Header = () => {
  const path = usePathname();
  const isAdminPage = path.startsWith("/BookStore/adminPage");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={styles.barra}>
      <div className={styles.icono1}>
        <img src="/media/menu-hamburguesa.png" alt="toggle" />
      </div>
      <span className={styles.titulobarra}>
        {isAdminPage ? "Administrador de biblioteca" : "Biblioteca"}
      </span>
      <div className={styles.dropdown}>
        <div className={styles.iconoUsuario} onClick={handleClick} tabIndex={0}>
          <img src="/media/usuario.png" alt="usuario" />
        </div>
        {dropdownOpen && (
          <div className={styles.dropdown_body}>
            <Link href="/login">Cerrar Sesión</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
