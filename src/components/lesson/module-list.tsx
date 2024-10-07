import { useState } from "react";
import { Modules } from "@/models/models";
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
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  function handleCompleteLesson() {
    try {
      onUpdate();
    } catch {
      toast.error("Erro ao atualizar progresso");
    }
  }

  const { selectLesson, selectedLesson } = useSelectedLesson();

  const toggleModule = (title: string) => {
    setExpandedModules((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div>
      {Object.entries(modules)
        .sort((a, b) =>
          a[0].localeCompare(b[0], undefined, {
            numeric: true,
            sensitivity: "base",
          })
        )
        .map(([title, lessons], index) => (
          <div key={`${title}-${index}`} className="mb-4">
            <div
              onClick={() => toggleModule(title)}
              className="cursor-pointer text-left px-4 py-2 hover:bg-gray-100"
            >
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {expandedModules.includes(title) && (
              <div className="p-4 border-l border-gray-300 bg-white">
                <ProgressCard value={calculateCompletionPercentage(lessons)} />

                {/* Renderizando aulas e materiais na ordem correta */}
                {lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id}>
                    {/* Renderiza a aula */}
                    <LessonListItem
                      lesson={lesson}
                      index={lessonIndex + 1}
                      onSelect={() => {
                        selectLesson(lesson);
                        setLastViewedLesson(courseId, lesson);
                      }}
                      selectedLessonId={selectedLesson?.id}
                      onComplete={handleCompleteLesson}
                      onSeek={() => {}}
                    />

                    {/* Renderizando os materiais correspondentes */}
                    {lesson.materials?.map((material, materialIndex) => (
                      <LessonListItem
                        key={material.id} // Usando o ID do material
                        lesson={material} // Passando o material como lição
                        index={`${lessonIndex + 1}-${materialIndex + 1}`} // Ajustando o índice
                        onSelect={() => {
                          selectLesson(material);
                          setLastViewedLesson(courseId, material);
                        }}
                        selectedLessonId={selectedLesson?.id}
                        onComplete={handleCompleteLesson}
                        onSeek={() => {}}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
