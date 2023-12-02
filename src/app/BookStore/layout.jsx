import styles from "../../styles/home.module.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

export default function BookStoreLayout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.xd}>
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
//li1="Principal" li2="Perfil" li3="Prestamos"
