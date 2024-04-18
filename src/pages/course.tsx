import CoursePercentage from "@/components/course-percentage";
import LastWatchedCard from "@/components/lesson/last-watched-card";
import LessonViewer from "@/components/lesson/lesson-viewer";
import ModuleList from "@/components/lesson/module-list";
import useApiUrl from "@/hooks/useApiUrl";
import useCourseCompletion from "@/hooks/useCourseCompletion";
import useSelectedLesson from "@/hooks/useSelectedLesson";
import { Lesson, Modules } from "@/models/models";
import { getLessons } from "@/services/getLessons";
import { sortLessons } from "@/utils/sort-lessons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {};

export default function CoursePage({}: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<Modules>({});

  const { courseId } = useParams<{ courseId: string }>();
  const { selectedLesson, clearSelection, selectLesson } = useSelectedLesson();
  const { apiUrl } = useApiUrl();

  const { fetchCompletion } = useCourseCompletion();

  async function onFetch(minimal: boolean = false) {
    try {
      if (!minimal) {
        setIsLoading(true);
      }

      const lessons: Lesson[] = await getLessons(apiUrl, Number(courseId));

      sortLessons(lessons);

      if (!minimal) {
        selectLesson(lessons[0]);
      }

      setLessons(lessons);
    } catch {
      console.log("Ocorreu um erro");
    } finally {
      if (!minimal) {
        setIsLoading(false);
      }
    }
  }

  async function onOrganize() {
    const x: any = {};
    lessons.forEach((l) => {
      const moduleName = l.module.split("/", 1)[0];
      if (!x[moduleName]) {
        x[moduleName] = [];
      }
      x[moduleName].push(l);
    });
    setModules(x);
  }

  useEffect(() => {
    onOrganize();
  }, [lessons]);

  useEffect(() => {
    onFetch();
    clearSelection();
  }, [courseId]);

  if (!courseId) {
    return "Sem id de curso";
  }

  if (isLoading) {
    return "Carregando curso...";
  }

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-10 gap-2  ">
      <div className="w-full lg:col-span-7 space-y-4 max-h-max bg-white dark:bg-neutral-900 rounded-md">
        <LessonViewer lesson={selectedLesson} />
        <div className="p-4">
          <h3 className="text-left font-bold">{selectedLesson?.title}</h3>
        </div>
      </div>
      <div className="lg:col-span-3 overflow-y-scroll max-h-screen py-4 bg-white  dark:bg-neutral-900">
        <div className="px-4 border-b pb-4 space-y-2">
          <h2>{selectedLesson?.course_title}</h2>
          <CoursePercentage courseId={Number(courseId)} fromGlobal />
        </div>
        <LastWatchedCard courseId={courseId} />
        <ModuleList
          modules={modules}
          onUpdate={() => {
            onFetch(true);
            fetchCompletion(apiUrl, Number(courseId));
          }}
          courseId={courseId}
        />
      </div>
    </div>
  );
}
