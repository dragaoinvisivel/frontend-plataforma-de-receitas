import { Lesson } from "@/models/models";

import axios from "axios";

export async function getLessons(
  apiUrl: string,
  courseId: number
): Promise<Lesson[]> {
  try {
    const res = await axios.get<Lesson[]>(
      `${apiUrl}/api/courses/${courseId}/lessons`
    );

    return res.data;
  } catch {
    return [];
  }
}
