import { useState, useEffect } from "react";
import axios from "axios";
import useApiUrl from "@/hooks/useApiUrl";
import Loading from "./loading";

import useCourseCompletion from "@/hooks/useCourseCompletion";
import ProgressCard from "./progress-card";

type Props = {
  courseId: number;
  fromGlobal?: boolean;
};

function CoursePercentage({ courseId, fromGlobal = false }: Props) {
  const [completionPercentage, setCompletionPercentage] = useState<
    number | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { apiUrl } = useApiUrl();

  const {
    isLoading: globalLoading,
    completionPercentage: globalPercentage,
    fetchCompletion,
  } = useCourseCompletion();

  const percentage = fromGlobal ? globalPercentage : completionPercentage;

  useEffect(() => {
    if (fromGlobal) {
      fetchCompletion(apiUrl, courseId);
      return;
    }

    const fetchCompletionPercentage = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/courses/${courseId}/completed_percentage`
        );
        const data = response.data;
        setCompletionPercentage(data.completion_percentage);
      } catch (error) {
        console.error(
          "Erro ao buscar a porcentagem de conclusão do curso:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletionPercentage();
  }, []);

  return (
    <div>
      {(fromGlobal ? globalLoading : isLoading) ? (
        <Loading />
      ) : (
        <div>
          {percentage !== null ? (
            <ProgressCard value={percentage} />
          ) : (
            <div className="text-xs text-red-500">
              Erro ao carregar a porcentagem de conclusão do curso
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CoursePercentage;
