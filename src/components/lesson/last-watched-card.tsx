import useSelectedLesson from "@/hooks/useSelectedLesson";
import { Lesson } from "@/models/models";
import { getLastViewedLesson, setLastViewedLesson } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
  courseId: string;
};

export default function LastWatchedCard({ courseId }: Props) {
  const [lesson, setLesson] = useState<Lesson | undefined>();

  const { selectLesson, selectedLesson } = useSelectedLesson();

  useEffect(() => {
    const lastWatched = getLastViewedLesson(courseId);

    console.log({ lastWatched });

    if (lastWatched?.id != selectedLesson?.id && lastWatched != null) {
      setLesson(lastWatched);
      console.log("ultima aula assistida não é a atual");
    }
  }, []);

  if (!lesson) {
    return null;
  }

  return (
    <div className="p-4 text-sm border space-y-2">
      <p className="">
        <strong>Ultimo Conteúdo aberto:</strong> {lesson.title}{" "}
      </p>
      <div className="space-x-4">
        <Button
          size="sm"
          onClick={() => {
            selectLesson(lesson);
            setLesson(undefined);
          }}
        >
          Visualizar
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setLesson(undefined);
          }}
        >
          Ignorar
        </Button>
      </div>
    </div>
  );
}
