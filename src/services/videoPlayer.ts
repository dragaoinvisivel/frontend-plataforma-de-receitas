import axios from "axios";
import { toast } from "sonner";

export async function completeLesson(apiUrl: string, lessonId: number) {
  if (lessonId) {
    const requestData = {
      lessonId: lessonId,
      progressStatus: "started",
      isCompleted: true,
    };

    toast.success("Aula concluída");

    try {
      await axios.post(`${apiUrl}/api/update-lesson-progress`, requestData);
    } catch {
      toast.error("Erro ao atualizar o progresso da lição");
    }
  }
}
