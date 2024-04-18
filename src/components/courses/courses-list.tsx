import { Course } from "@/models/models";
import { getAllCourses } from "@/services/getAllCourses";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import CourseItem from "./course-item";
import useApiUrl from "@/hooks/useApiUrl";

type Props = {
  isEditable?: boolean;
  courses: Course[] | null;
};

export default function CoursesList({
  isEditable = false,
  courses: providedCourses,
}: Props) {
  const [courses, setCourses] = useState<Course[] | null>();

  const navigate = useNavigate();
  const { apiUrl } = useApiUrl();

  function handlePlayButtonClick(courseId: number) {
    navigate(`/receitas/${courseId}`);
  }

  const loadCourses = async () => {
    try {
      const courses = await getAllCourses(apiUrl);

      if (courses) {
        setCourses(courses);
        return;
      }
      toast.error("Erro ao carregar cursos.");
    } catch (error) {
      toast.error("Erro ao carregar cursos.");
    }
  };

  useEffect(() => {
    if (providedCourses && providedCourses.length > 0) {
      setCourses(providedCourses);
    } else {
      loadCourses();
    }
  }, [providedCourses]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  w-full ">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              onPlay={() => handlePlayButtonClick(course.id)}
              isEditable={isEditable}
              onUpdate={() => loadCourses()}
            />
          ))
        ) : (
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <CardHeader>
              <CardTitle className="text-[hsl(222.2,84%,4.9%)] dark:text-white text-center">
                Nenhum curso encontrado!
              </CardTitle>
            </CardHeader>
            <CardDescription className=" px-4 pb-4 text-center">
              Que tal cadastrar o primeiro?
            </CardDescription>
          </Card>
        )}
      </div>
    </>
  );
}
