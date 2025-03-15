import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession();
  console.log("Test --------------> passed");
  console.log("session ==>", session);

  if (session) {
    redirect("/engine");
  } else {
    redirect("/auth");
  }
}
