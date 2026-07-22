import { Building2 } from "lucide-react";
import type { Metadata } from "next";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Entrar — Painel do Síndico",
};

export default function LoginPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-12">
      {/* Fundo branco com brilho azul claro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-background to-background"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <Card className="w-full max-w-sm gap-0 p-2 shadow-xl shadow-primary/5">
        <CardHeader className="justify-items-center gap-4 pt-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <Building2 className="size-7" />
          </div>
          <div className="grid gap-1.5">
            <CardTitle className="text-xl">Painel do Síndico</CardTitle>
            <CardDescription className="text-balance">
              Entre para gerenciar chamados e fornecedores do seu condomínio.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 px-6 py-8">
          <GoogleSignInButton />
          <p className="text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com os Termos de Uso e a Política de
            Privacidade.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
