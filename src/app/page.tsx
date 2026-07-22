import { redirect } from "next/navigation";

import { getCurrentUser } from "@/app/_lib/auth/get-current-user";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Olá, {user.name.split(" ")[0]}
      </h1>
      <p className="max-w-md text-muted-foreground">
        Seu painel de chamados e fornecedores aparece aqui.
      </p>
    </main>
  );
}
