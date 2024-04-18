import { Modules } from "@/models/models";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import LessonListItem from "./lesson-list-item";
import useSelectedLesson from "@/hooks/useSelectedLesson";

import {
  calculateCompletionPercentage,
  setLastViewedLesson,
} from "@/utils/utils";

import { toast } from "sonner";
import ProgressCard from "../progress-card";

type Props = { modules: Modules; onUpdate: () => void; courseId: string };

export default function ModuleList({ modules, onUpdate, courseId }: Props) {
  function handleCompleteLesson() {
    try {
      onUpdate();
    } catch {
      toast.error("erro ao atualizar progresso");
    }
  }

  const { selectLesson, selectedLesson } = useSelectedLesson();

  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full ">
        {Object.entries(modules)
          .sort((a, b) =>
            a[0].localeCompare(b[0], undefined, {
              numeric: true,
              sensitivity: "base",
            })
          )
          .map(([title, lessons], index) => (
            <AccordionItem
              className="p-4 "
              value={`${title}-${index}`}
              key={`${title}-${index}`}
            >
              <AccordionTrigger className="" title={title}>
                <div className=" w-full space-y-2">
                  <span className="line-clamp-1 px-2 text-sm text-left ">
                    {title}
                  </span>

                  <ProgressCard
                    value={calculateCompletionPercentage(lessons)}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {lessons.map((lesson, index) => (
                  <LessonListItem
                    key={lesson.id}
                    lesson={lesson}
                    index={index + 1}
                    onSelect={() => {
                      selectLesson(lesson);
                      setLastViewedLesson(courseId, lesson);
                    }}
                    selectedLessonId={selectedLesson?.id}
                    onComplete={handleCompleteLesson}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
