import { Lesson } from "@/models/models";
import { formatDuration } from "@/utils/format-duration";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import useApiUrl from "@/hooks/useApiUrl";
import { cn } from "@/lib/utils";

type Props = {
  lesson: Lesson;
  selectedLessonId: number | undefined;
  index: number;
  onSelect: () => void;
  onComplete: () => void;
};

export default function LessonListItem({
  lesson,
  selectedLessonId,
  index,
  onSelect,
  onComplete,
}: Props) {
  const [isCompleted, setIsCompleted] = useState(Boolean(lesson.isCompleted));
  const { apiUrl } = useApiUrl();

  async function toggleIsCompleted() {
    setIsCompleted((v) => !v);
    try {
      await axios.post(`${apiUrdl}/api/update-lesson-progress`, {
        lessonId: lesson.id,
        isCompleted: !isCompleted,
      });
      onComplete();
    } catch {
      toast.error("Erro ao concluir aula");
    }
  }

  return (
    <div
      key={lesson.id}
      className={cn(
        `flex justify-between items-center w-full h-16 my-6 border-2 shadow-sm rounded-md transition-transform hover:border-purple-500`,
        selectedLessonId === lesson.id
          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:text-white"
          : "dark:bg-neutral-900 bg-neutral-50"
      )}
    >
      <div
        className="w-10/12 cursor-pointer flex gap-2 items-center"
        onClick={onSelect}
      >
        <code className="h-full pl-4">{index}</code>

        <p
          className="flex-1 line-clamp-2 text-left text-xs overflow-hidden"
          title={lesson.title} // Tooltip com o título completo
        >
          {lesson.title}
        </p>

        <code className="bg-purple-100 dark:bg-neutral-500/20 max-w-min p-1 rounded-sm shrink-0 h-6 text-xs">
          {lesson.video_url ? 'Vídeo' : 'PDF'} {/* Exibindo tipo de conteúdo */}
        </code>

        {lesson.duration !== "0" && (
          <code className="p-1 bg-blue-500/20 rounded-md px-2 text-xs dark:text-neutral-300">
            {formatDuration(Number(lesson.duration))}
          </code>
        )}
      </div>
      <div className="w-1/12">
        <Checkbox checked={isCompleted} onCheckedChange={toggleIsCompleted} />
      </div>
    </div>
  );
}
