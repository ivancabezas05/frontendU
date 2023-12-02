const URL = "http://localhost:3001";

// app.use("/usuario", usuarioRoutes)
// app.use("/reserva", reservaRoutes)
// app.use("/libro", libroRoutes)
// app.use("/categoria", categoriaRoutes)
// app.use("/autor", autorRoutes)
// app.use("/editorial", editorialRoutes)
// app.use("/tipodocumento", tipodocumentoRoutes)
// app.use("/tipousuario", tipousuarioRoutes)

export const endpoint = {
  reserva: {
    list: () => `${URL}/reserva`,
  },
  usuario: {
    list: () => `${URL}/usuario`,
    id: (id) => `${URL}/usuario/${id}`,
  },
  libro: {
    list: () => `${URL}/libro`,
    id: (id) => `${URL}/libro/${id}`,
  },
};
