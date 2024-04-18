import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-theme-toggle";
import { useNavigate } from "react-router-dom";
import APIUrl from "./api-url";

function Header() {
  let navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <div className="relative min-h-20 p-6 shadow-md bg-white dark:shadow-white/10 dark:bg-neutral-900">
      <div className="flex justify-between items-center">
        <div
          onClick={() => handleNavigate("/")}
          className="inline-flex flex-wrap gap-3 cursor-pointer font-medium text-xl"
        >
          <Cookie className="w-8 h-8" /> Receitas
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <APIUrl />
          <Button onClick={() => handleNavigate("/receitas")} variant="link">
            Gestão de Receitas
          </Button>

          <Button
            onClick={() => handleNavigate("/configuracoes")}
            variant="link"
          >
            Configurações
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
