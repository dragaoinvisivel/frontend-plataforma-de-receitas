import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { toast } from "sonner";
import useApiUrl from "@/hooks/useApiUrl";
import { Loader2 } from "lucide-react";

type Props = {
  onCreate: () => void;
};

export default function AddCourse({ onCreate }: Props) {
  const [courseName, setCourseName] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [coursePath, setCoursePath] = useState<string>("");
  const [isLoadingManualInsertion, setIsLoadingManualInsertion] = useState<boolean>(false);
  const [isLoadingAutoInsertion, setIsLoadingAutoInsertion] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { apiUrl } = useApiUrl();

  const automaticallyAddCourses = async () => {
    try {
      setIsLoadingAutoInsertion(true);
      await fetch(`${apiUrl}/api/courses/add-all`, { method: "POST" });
      onCreate();
    } catch (_) {
      toast.error("Erro ao adicionar cursos automaticamente", {
        duration: 2000,
      });
    } finally {
      setIsLoadingAutoInsertion(false);
      onCreate();
    }
  }

  const handleSubmit = async () => {
    setIsOpen(false);
    setIsLoadingManualInsertion(true);
    const formData = new FormData();

    formData.append("name", courseName);
    formData.append("path", coursePath);

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      formData.append("imageFile", fileInputRef.current.files[0]);
    } else if (imageURL) {
      formData.append("imageURL", imageURL);
    }

    try {
      const response = await fetch(`${apiUrl}/api/courses`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        toast.error(errorMessage.error);
        setIsLoadingManualInsertion(false);

        return;
      }

      const result = await response.json();
      toast.success(`Curso adicionado: ${result.name}`, {
        duration: 2000,
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
      onCreate();
    } catch (error) {
      toast.error("Erro ao adicionar registro.", {
        duration: 2000,
        action: {
          label: "Ok",
          onClick: () => ``,
        },
      });
    } finally {
      setIsLoadingManualInsertion(false);
      onCreate();
      setCourseName("");
      setImageURL("");
      setCoursePath("");
    }
  };

  return (
    <div className="flex gap-4 items-center">
      {isLoadingAutoInsertion || isLoadingManualInsertion && (
        <div className="flex justify-center bg-neutral-100 dark:bg-neutral-800 px-8 py-2 rounded-md text-sm items-center">
          <Loader2 className="animate-spin h-4 mr-4" />
          <p>Salvando curso...</p>
        </div>
      )}

      <Button onClick={automaticallyAddCourses}>Adicionar automaticamente</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"link"}>Adicionar manualmente</Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[700px] max-w-80">
          <DialogHeader>
            <DialogTitle className="mb-6">Cadastro</DialogTitle>
          </DialogHeader>
          <div className="my-2 flex items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome do curso
            </Label>
          </div>
          <Input
            type="text"
            id="nome"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <div>
            <h3>Quer colocar alguma capa? se sim, só escolher...</h3>
            <Card className="w-full my-4">
              <CardContent>
                <div>
                  <div className="my-2">
                    <Label htmlFor="capaUrl" className="text-right">
                      URL da imagem
                    </Label>
                  </div>
                  <Input
                    type="url"
                    id="capaUrl"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                  />
                </div>
                <p className="my-2">Ou</p>
                <div>
                  <div className="my-2">
                    <Label htmlFor="capaFile" className="text-right">
                      Anexo
                    </Label>
                  </div>
                  <Input type="file" id="capaFile" ref={fileInputRef} />
                </div>
              </CardContent>
            </Card>
            <h3>Agora, defina o PATH.</h3>
            <div className="my-2 flex items-center gap-4">
              <Label htmlFor="path" className="text-right">
                PATH do curso
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-red-500 cursor-pointer underline">
                      Aviso
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Por motivos de segurança, os navegadores não permitem a
                      coleta do path por input, deve ser adicionado manualmente.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="text"
              id="path"
              value={coursePath}
              onChange={(e) => setCoursePath(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSubmit}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
