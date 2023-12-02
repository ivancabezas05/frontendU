import styles from "../../styles/home.module.css";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import moment from "moment/moment";

const Panel = ({reservas, texto}) => {
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  return (
    <article className={styles.articulo1}>
      <div className={styles.recuadro1}>
        <div>
          <span className={styles.texto}>{texto}</span>
        </div>
        <div className={styles.contenido}>
          {reservas.slice(0, 3)?.map((item) => {
            return (
              <div className={styles.cuadro} key={`listA-${item.id}`}>
                <div className={styles.contenedorimg}>
                  <img src="/media/retrato.png" alt="imagen" />
                </div>
                <div className={styles.textito}>
                  <p>"{item.libro.titulo}"</p>
                  <span>
                  {moment(item.fecha_reserva).format("L") + " " + moment(item.fecha_reserva).format("LT")}
                  </span>
                </div>
                <div className={styles.imagencuadro}>
                  <img
                    src={item.libro.imagen_url}
                    alt="imagen-libro"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {reservas.length > 3 ? (
          <div className={styles.opcion}>
            <button
              type="button"
              className={styles.button}
              onClick={() => setOpen(true)}
            >
              Ver todo
            </button>
          </div>
        ) : null}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Libros Reservados:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className={styles.contenedorModal}>
              {reservas.map((item) => {
                return (
                  <div className={styles.reservaItemModal} key={`listB-${item.id}`}>
                    <img
                      src={item.libro.imagen_url}
                      alt="imagen-libro"
                    />
                    <div className={styles.details}>
                      <h3>{item.tituloLibro}</h3>
                      <p>
                        {"Fecha límite de entrega: "}
                        {moment(item.fecha_devolucion).format("L") + " " + moment(item.fecha_devolucion).format("LT")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Typography>
        </Box>
      </Modal>
    </article>
  );
};

export default Panel;
