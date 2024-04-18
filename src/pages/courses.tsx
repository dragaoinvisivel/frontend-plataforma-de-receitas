import { useState, useEffect } from "react";
import { toast } from "sonner";
import CoursesList from "@/components/courses/courses-list";
import { Course } from "@/models/models";
import useApiUrl from "@/hooks/useApiUrl";
import AddCourse from "@/components/courses/add-course";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const { apiUrl } = useApiUrl();

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/courses`);
      if (!response.ok) throw new Error("Falha ao buscar cursos");

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error("Erro ao carregar cursos.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className="w-full mb-4 space-y-8">
        <div className="space-y-6">
          <div className="flex justify-between">
            <h1>Receitas cadastradas {/*({courses.length})*/}</h1>
            <AddCourse onCreate={() => fetchCourses()} />
          </div>
          <section className="mt-10 flex  flex-wrap gap-4 w-full justify-center ">
            <CoursesList courses={courses} isEditable />
          </section>
        </div>
      </div>
    </>
  );
}
