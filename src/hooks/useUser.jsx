import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useUser = () => {
  const [usuario, setUsuario] = useState({}); // Inicializar el estado con un objeto vacío

  const router = useRouter();
  useEffect(() => {
    // Recuperar datos del usuario desde localStorage
    const usuarioJSON = localStorage.getItem("usuario");
    const usuarioLocal = JSON.parse(usuarioJSON);

    if (usuarioLocal) {
      // Aquí puedes utilizar los datos del usuario en esta página
      setUsuario(usuarioLocal);
      console.log("Datos del usuario recuperados desde localStorage:", usuarioLocal);
    } else {
      // Si no se encuentra un usuario en localStorage, puedes manejarlo adecuadamente.
      router.push("/login"); // Redirigir al usuario a la página de inicio de sesión si no hay usuario en localStorage.
    }
  }, []); // Esto se ejecutará después de la renderización inicial del componente

  return {usuario}
};

export default useUser