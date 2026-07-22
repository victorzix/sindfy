import { GoogleIcon } from "@/components/icons/google-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Botão "Entrar com Google". É um link real (`<a>`) porque o login inicia uma
 * navegação de página inteira para o fluxo OAuth em /api/auth/google.
 */
export function GoogleSignInButton() {
  return (
    <a
      href="/api/auth/google"
      data-testid="google-sign-in"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-11 w-full gap-3 text-[0.95rem] font-medium",
      )}
    >
      <GoogleIcon className="size-5" />
      Entrar com Google
    </a>
  );
}
