import { NextPage } from "next";
import { ComponentType } from "react";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
type AuthProps = {
  children?: React.ReactNode;
};

export function withAuth<P extends object>(
  WrappedComponent: NextPage<P> | ComponentType<P>
) {
  const AuthenticatedComponent = async (props: P & AuthProps) => {
    // Recupera el token del header de la solicitud
    const cookieStore = await cookies();
    const res = cookieStore.get("access_token");
    const token = res?.value;
    if (!token) {
      // Si no hay token, redirigir o mostrar una página de error
      return redirect("/auth");
    }

    try {
      // Decodifica el token
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo en segundos
      if (decoded.exp && decoded.exp < currentTime) {
        // Si el token ha expirado
        return redirect("/auth");
      }

      // Si todo es válido, continúa
      return <WrappedComponent {...props} />;
    } catch (error) {
      // Si hay un error al decodificar el token
      console.error("Token decoding error =>", error);
      return redirect("/auth");
    }
  };

  return AuthenticatedComponent;
}
