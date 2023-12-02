"use client"
import useUser from "@/hooks/useUser";
import { usePathname } from "next/navigation"
import FormPerfil from "@/app/components/formProfile"

export default function ProfilePage() {
  const path = usePathname();
  const {usuario} = useUser();
  const isAdminPage = path.startsWith('/BookStore/adminPage');
  
  return (
      <FormPerfil modo={isAdminPage?"admin":"alumno"} nombre={usuario?.nombre || ''} />
  )
}
