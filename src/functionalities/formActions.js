import { updateUser } from "@/api/https";
import usuarioAPI from "../app/api/usuario";

//Usado en página Login
export async function validarLogeo(e, state, router) {
  e.preventDefault();
  const rawUsuario = await usuarioAPI.findAll();
  const userTable = rawUsuario.data;
  const { usuario, contrasena } = state;

  const cuenta = userTable.find(
    (user) =>
      user.correo_electronico === usuario && user.contrasena === contrasena
  );

  if (cuenta) {
    if (cuenta.idtipousuario === 1)
      router.push(
        `/BookStore/studentPage?correo=${cuenta.correo_electronico}&nombre=${cuenta.nombre}`
      );
    else if (cuenta.idtipousuario === 2)
      router.push(
        `/BookStore/adminPage?correo=${usuario}&nombre=${cuenta.nombre}`
      );
    else {
      alert("Sucedio un error inesperado con su cuenta.");
    }
  } else {
    // No coincide la contraseña o usuario
    alert("No coincide la contraseña o usuario o no tiene cuenta.");
  }
  localStorage.setItem("usuario", JSON.stringify(cuenta));
}

//Usado en página Sing in

export async function registrarUsuario(
  e,
  formData,
  setRegistroExitoso,
  router
) {
  e.preventDefault();

  // Validar que los campos se hayan completado
  for (const key in formData) {
    if (
      key !== "password" &&
      key !== "confirmarPassword" &&
      formData[key] === ""
    ) {
      alert("Las credenciales no se rellenaron completamente");
      return;
    }
  }

  // Verificar que las contraseñas coincidan
  if (formData.password !== formData.confirmarPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  let tipoUsu = formData.correo.endsWith("@ulima.com") ? 2 : 1;
  let tipoDoc =
    formData.tipoDocumento === "DNI" || formData.tipoDocumento === "dni"
      ? 1
      : 2;

  // Crear un nuevo objeto de usuario
  const nuevoUsuario = {
    nombre: formData.nombres,
    apellidos: formData.apellidos,
    foto_url: null,
    nro_documento: formData.nroDocumento,
    correo_electronico: formData.correo,
    contrasena: formData.password,
    idioma: "es",
    prefijo: "juanito",
    color: "morado",
    idtipodocumento: tipoDoc,
    idtipousuario: tipoUsu,
  };
  try {
    let res = await usuarioAPI.create(nuevoUsuario);
    if (res) {
      setRegistroExitoso(true);
      router.push("/login");
    } else {
      alert("Algo salió mal con la creación del nuevo usuario");
    }
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    alert("Error al crear el usuario. Por favor, inténtalo de nuevo.");
  }
}

//Usado en recoverPassword

export async function actualizarContrasena(e, state, router) {
  e.preventDefault();
  const { correo, nroDoc, nuevacontra } = state;

  // Verificar si el correo y contraseña existen en los JSON
  const rawUsuario = await usuarioAPI.findAll();
  const userTable = rawUsuario.data;
  const user = userTable.find(
    (usuario) =>
      usuario.correo_electronico === correo && nroDoc === usuario.nro_documento
  );
  if (user) {
    let usuActualizado = { ...user, contrasena: nuevacontra };
    let idUsu = user.id;
    console.log(user);
    let res = await usuarioAPI.update(idUsu, usuActualizado);
    if (res) {
      alert("Contraseña actualizada exitosamente.");
      router.push("/login");
    } else {
      alert("Error innesperado.");
    }
  } else alert("Los valores del correo y número de documento no son válidos.");
}

//Usado en BookStore/adminPage/perfil y en el del studentPage

export async function guardarDatos(
  datosPersonales,
  modo,
  colores,
  idiomas,
  longitudPasaporte,
  longitudDni
) {
  const validTipoDocumento =
    datosPersonales.idtipousuario === 1 || datosPersonales.idtipousuario === 2;
  const validNroDocumento =
    (datosPersonales.idtipousuario === 1 &&
      datosPersonales.nro_documento.length === longitudDni) ||
    (datosPersonales.idtipousuario === 2 &&
      datosPersonales.nro_documento.length === longitudPasaporte);
  const validCorreo =
    (modo === "alumno" &&
      datosPersonales.correo_electronico.endsWith("@gmail.com")) ||
    (modo === "admin" &&
      datosPersonales.correo_electronico.endsWith("@ulima.edu.pe"));
  const validColor = colores.includes(datosPersonales.color);
  const validIdioma = idiomas.includes(datosPersonales.idioma);

  if (!validTipoDocumento) {
    alert("Ingrese DNI o Pasaporte");
    return;
  }

  if (!validNroDocumento) {
    if (datosPersonales.idtipousuario === 1) {
      alert("Ingrese los 8 números de su número de DNI");
    } else {
      alert("Ingrese los 9 dígitos de su pasaporte");
    }
    return;
  }

  if (!validCorreo) {
    if (modo === "alumno") {
      alert("El correo debe terminar en @gmail.com");
    } else if (modo === "admin") {
      alert("El correo debe terminar en @ulima.edu.pe");
    }
    return;
  }

  if (!validColor && modo === "admin") {
    alert(
      "El color ingresado no es válido. Debe ser uno de: " + colores.join(", ")
    );
    return;
  }

  if (!validIdioma && modo === "admin") {
    alert(
      "El idioma ingresado no es válido. Debe ser uno de: " + idiomas.join(", ")
    );
    return;
  }

  await updateUser(datosPersonales);
  const datosLocal = JSON.parse(localStorage.getItem("usuario"));
  console.log(datosLocal);
  // let res = await usuarioAPI.update(datosLocal.id, datosPersonales);
  localStorage.setItem("usuario", JSON.stringify(datosPersonales));
}
