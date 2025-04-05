"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingInicial from "@/components/layout.tsx/LoadingInicial";
import { useCurrentLogin } from "@/services/auth/useCurrentLogin";

export default function Home() {
  const { data: currentLogin } = useCurrentLogin();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentLogin && currentLogin.length > 0) {
        router.push("/engine");
      } else {
        router.push("/auth");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [currentLogin, router]);

  return <LoadingInicial />;
}
