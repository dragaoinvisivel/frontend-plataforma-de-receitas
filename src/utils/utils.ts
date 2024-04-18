import { Hierarchy, Lesson } from "@/models/models";

export function organizeLessonsInHierarchy(lessons: Lesson[]): Hierarchy {
  const hierarchy: Hierarchy = {};

  lessons.forEach((lesson) => {
    const pathParts = lesson.hierarchy_path.split("/");
    let currentLevel = hierarchy;

    pathParts.forEach((part, index) => {
      if (index === pathParts.length - 1) {
        if (!currentLevel[part]) {
          currentLevel[part] = [];
        }
        (currentLevel[part] as Lesson[]).push(lesson);
      } else {
        if (!currentLevel[part]) {
          currentLevel[part] = {};
        }
        currentLevel = currentLevel[part] as Hierarchy;
      }
    });
  });
  return hierarchy;
}

export function flattenHierarchy(hierarchy: Hierarchy): Lesson[] {
  const lessons: Lesson[] = [];

  Object.values(hierarchy).forEach((item) => {
    if (Array.isArray(item)) {
      lessons.push(...item);
    } else {
      lessons.push(...flattenHierarchy(item));
    }
  });

  return lessons;
}

export function calculateCompletionPercentage(lessons: Lesson[]): number {
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(
    (lesson) => lesson.isCompleted === 1
  ).length;
  const percentage = (completedLessons / totalLessons) * 100;

  return percentage;
}

export function calculateCourseProgress(lessons: Lesson[]) {
  const completed = lessons.filter((l) => l.isCompleted);
  return (completed.length / lessons.length) * 100;
}

export function getLastViewedLesson(courseId: string) {
  const lastViewed = localStorage.getItem(courseId);

  if (lastViewed) {
    try {
      return JSON.parse(lastViewed) as Lesson;
    } catch {
      return null;
    }
  }

  return null;
}

export function setLastViewedLesson(courseId: string, lesson: Lesson) {
  localStorage.setItem(courseId, JSON.stringify(lesson));
}
