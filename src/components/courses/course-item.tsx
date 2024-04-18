import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Course } from "@/models/models";
import noImage from "../../../public/sem-foto.png";
import { Button } from "../ui/button";
import DeleteCourse from "./delete-course";
import EditCourse from "./edit-course";
import useApiUrl from "@/hooks/useApiUrl";
import CoursePercentage from "../course-percentage";

type Props = {
  course: Course;
  onPlay: () => void;
  isEditable?: boolean;
  onUpdate: () => void;
};

export default function CourseItem({
  course,
  onPlay,
  isEditable,
  onUpdate,
}: Props) {
  const { apiUrl } = useApiUrl();

  const courseCover = course.isCoverUrl
    ? course.urlCover
    : course.fileCover
    ? `${apiUrl}/uploads/${course.fileCover}`
    : noImage;

  return (
    <Card className="bg-white dark:bg-neutral-900 shadow hover:scale-105 transition-transform space-y-1 border border-purple-100/50 border-b-4 border-b-purple-500/50  hover:border-b-purple-500 overflow-hidden">
      <CardHeader className="p-0 cursor-pointer" onClick={onPlay}>
        <img
          className="  aspect-video shrink-0 w-full"
          src={courseCover}
          alt={course.name}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-4 py-0 pt-2">
        <CardTitle className="text-[hsl(222.2,84%,4.9%)] dark:text-white text-base text-left font-medium">
          {course.name}
        </CardTitle>

        <CoursePercentage courseId={course.id} />
      </CardContent>
      <CardFooter className="p-4 border ">
        <div className="flex gap-4 justify-end w-full">
          {isEditable ? (
            <>
              <EditCourse course={course} onUpdate={onUpdate} />
              <DeleteCourse course={course} onUpdate={onUpdate} />
            </>
          ) : null}
          <Button size="sm" onClick={onPlay}>
            Assistir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
