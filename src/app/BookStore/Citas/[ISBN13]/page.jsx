import librosData from "../../../../../public/fakeData/library.json";
import styles from "../../../../styles/details.module.css";
import CitasPage from "@/app/components/citas";
export const dynamicParams = true;

export default async function LibroDetalle({ params }) {
  
  return (
    <section className={styles.detailContainer}>
    <div className={styles.title}>
      <span>Citas</span>
    </div>
    <CitasPage libroId={params.ISBN13}/>
    </section>
  )
}
