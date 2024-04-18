import { Lesson } from "@/models/models";
import { Player } from "../player/player";
import useApiUrl from "@/hooks/useApiUrl";
import { updateWatchedTime } from "@/services/updateWatchedTime";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const isDocumentFile = (url: string): boolean => {
  return (
    url.toLowerCase().endsWith(".txt") ||
    url.toLowerCase().endsWith(".pdf") ||
    url.toLowerCase().endsWith(".html")
  );
};

const getResourcePath = (lesson: Lesson): string => {
  return `/serve-content?path=${encodeURIComponent(
    lesson.pdf_url || lesson.video_url || ""
  )}`;
};

type Props = {
  lesson: Lesson | null;
};

export default function LessonViewer({ lesson }: Props) {
  const [elapsedTime, setElapsedTime] = useState<number>(
    lesson?.time_elapsed || 0
  );
  const { apiUrl } = useApiUrl();
  const isDocument = lesson
    ? isDocumentFile(lesson.pdf_url || lesson.video_url)
    : false;
  const currentLessonIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!lesson) return;

    const fetchElapsedTime = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/lessons/${lesson.id}`);
        setElapsedTime(Number(res.data.elapsedTime));
      } catch (error) {
        console.error("Erro ao buscar o tempo decorrido da aula:", error);
      }
    };

    fetchElapsedTime();

    currentLessonIdRef.current = lesson.id;
  }, [lesson, apiUrl]);

  const handleTimeUpdate = (currentTime: number) => {
    if (!lesson) return;
    const lessonId = currentLessonIdRef.current ?? lesson.id;
    updateWatchedTime(apiUrl, lessonId, currentTime);
  };

  if (!lesson) {
    return null;
  }

  return (
    <div className="flex-1 ">
      {isDocument ? (
        <iframe
          className="w-full h-full aspect-[9/16]"
          src={`${apiUrl}${getResourcePath(lesson)}`}
        ></iframe>
      ) : (
        <Player
          title={lesson.title}
          src={`${apiUrl}${getResourcePath(lesson)}`}
          lessonId={currentLessonIdRef.current ?? lesson.id}
          onTimeUpdate={handleTimeUpdate}
          timeElapsed={elapsedTime}
        />
      )}
    </div>
  );
}
