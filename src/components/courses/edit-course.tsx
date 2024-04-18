import { Course } from "@/models/models";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRef, useState } from "react";

import { toast } from "sonner";
import useApiUrl from "@/hooks/useApiUrl";

type Props = {
  course: Course;
  onUpdate: () => void;
};

export default function EditCourse({ course, onUpdate }: Props) {
  const fileInputRefEdit = useRef<HTMLInputElement>(null);

  const [currentCourse, setCurrentCourse] = useState<Course>(course);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);

  const { apiUrl } = useApiUrl();

  const handleEdit = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("name", currentCourse.name);
    formData.append("path", currentCourse.path);

    if (
      fileInputRefEdit.current &&
      fileInputRefEdit.current.files &&
      fileInputRefEdit.current.files[0]
    ) {
      formData.append("imageFile", fileInputRefEdit.current.files[0]);
    } else if (course.urlCover) {
      formData.append("imageURL", course.urlCover);
    }

    try {
      const response = await fetch(`${apiUrl}/api/courses/${course.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        toast.error(errorMessage);
        return;
      }

      toast.success("Curso atualizado com sucesso!", {
        duration: 2000,
      });

      setIsOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar o curso.", {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
      onUpdate();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setCurrentCourse(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as Course)
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-white text-black outline-none border-none"
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[700px] max-w-80">
        <DialogHeader>
          <DialogTitle className="mb-6">
            Editando - {course?.name || ""}
          </DialogTitle>
        </DialogHeader>
        <div className="my-2 flex items-center gap-4">
          <Label htmlFor="nome" className="text-right">
            Nome do curso
          </Label>
        </div>
        <Input
          type="text"
          id="name"
          name="name"
          value={currentCourse?.name || ""}
          onChange={handleInputChange}
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
                  name="urlCover"
                  value={course?.urlCover || ""}
                  onChange={handleInputChange}
                />
              </div>
              <p className="my-2">Ou</p>
              <div>
                <div className="my-2">
                  <Label htmlFor="capaFile" className="text-right">
                    Anexo
                  </Label>
                </div>
                <Input type="file" id="capaFile" ref={fileInputRefEdit} />
              </div>
            </CardContent>
          </Card>
          <h3>Agora, atualize o diretório do curso.</h3>
          <div className="my-2 flex items-center gap-4">
            <Label htmlFor="path" className="text-right">
              PATH do curso
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-red-500 cursor-pointer underline">Aviso</p>
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
            name="path"
            value={currentCourse.path || ""}
            onChange={handleInputChange}
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleEdit} disabled={isLoading}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
