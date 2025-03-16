"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingInicial from "@/components/layout.tsx/LoadingInicial";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (session) {
        router.push("/engine");
      } else {
        router.push("/auth");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [session, router]);

  return <LoadingInicial />;
}
