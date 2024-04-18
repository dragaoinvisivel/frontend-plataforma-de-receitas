import { Lesson } from "@/models/models";
import { create } from "zustand";

interface LessonStore {
  selectedLesson: Lesson | null;
  selectLesson: (lesson: Lesson) => void;
  clearSelection: () => void;
}

const useSelectedLesson = create<LessonStore>((set) => ({
  selectedLesson: null,
  selectLesson: (lesson: Lesson) => set({ selectedLesson: lesson }),
  clearSelection: () => set({ selectedLesson: null }),
}));

export default useSelectedLesson;
