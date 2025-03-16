import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import { ComponentType } from "react";
import { authOptions } from "@/lib/auth";

type AuthProps = {
  children?: React.ReactNode;
};

export function withAuth<P extends object>(
  WrappedComponent: NextPage<P> | ComponentType<P>
) {
  const AuthenticatedComponent = async (props: P & AuthProps) => {
    const session = await getServerSession(authOptions);
    console.log("session => ", session);
    if (!session) {
      redirect("/auth");
      return null; // Para evitar errores de renderizado
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}
