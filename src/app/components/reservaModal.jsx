import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { Modal, Box, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import reservaAPI from "../api/reserva";

dayjs.locale("es");

const ReservaModal = (props) => {
  const {
    open,
    handleClose,
    setFechaReserva,
    setOpenAlert,
    libro,
    fechaReserva,
    setIsReserva,
    user,
  } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.default",
    borderRadius: "2em",
    boxShadow: 24,
  };

  const [value, setValue] = useState(dayjs());
  const [fechaReservada, setFechaReservada] = useState("");
  const [horaReservada, setHoraReservada] = useState("");
  useEffect(() => {
    if (value) {
      const horaActual = dayjs().hour();
      const minutosActuales = dayjs().minute();
      const segundosActuales = dayjs().second();
      var fechaConHora = value
        .set("hour", horaActual)
        .set("minute", minutosActuales)
        .set("second", segundosActuales);
      var fecha = dayjs(value, { format: "DD-MM-YYYY" });
      const hora24Format = dayjs(fechaConHora, { format: "h:mm a" }).format(
        "HH:mm"
      );
      setFechaReservada(fecha);
      setHoraReservada(hora24Format);
    }
  }, [value]);

  const capturarFecha = async () => {
    setFechaReserva(fechaReservada);
    setOpenAlert(true);
    handleClose();
    const fechaActual = new Date();
    const newReserva = {
      fecha_reserva: fechaActual,
      fecha_devolucion: fechaReservada,
      usuarioid: user.id,
      libroid: libro.id,
    };
    const res = await reservaAPI.create(newReserva);
    if (res) {
      setIsReserva(true);
      setValue(dayjs());
    } else {
      alert("Error innesperado");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} maxWidth="sm">
        <Box display="block" p={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DemoContainer components={["DateCalendar"]}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                disablePast
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box
            display="flex"
            justifyContent="flex-end"
            mr={3}
            sx={{ borderRadius: "20px" }}
          >
            <Button
              variant="text"
              size="small"
              sx={{ marginRight: "5px" }}
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
            <Button variant="text" size="small" onClick={capturarFecha}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReservaModal;
