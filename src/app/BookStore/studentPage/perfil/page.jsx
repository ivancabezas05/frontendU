"use client";

import { usePathname } from "next/navigation";
import FormPerfil from "@/app/components/formProfile";
import useUser from "@/hooks/useUser";
import { Suspense } from "react";
import Loading from "../../loading";

export default function ProfilePage() {
  const path = usePathname();
  const {usuario} = useUser();
  const isAdminPage = path.startsWith("/BookStore/adminPage");

  

  return (
    <Suspense fallback={<Loading />}>
      <FormPerfil modo={isAdminPage ? "admin" : "alumno"} nombre={usuario?.nombre || ''} />
    </Suspense>
  );
}
