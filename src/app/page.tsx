import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Painel do Síndico
        </h1>
        <p className="max-w-md text-muted-foreground">
          Triagem de chamados e acionamento de fornecedores via WhatsApp.
        </p>
      </div>
      <Button data-testid="cta-comecar">Começar</Button>
    </main>
  );
}
