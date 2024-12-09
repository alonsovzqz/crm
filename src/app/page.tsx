import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { authenticated } = await authProviderServer.check();

  if (authenticated) {
    redirect("/dashboard");
  }

  redirect("/login");
}
