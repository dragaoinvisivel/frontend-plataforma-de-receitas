import { Course } from "@/models/models";
import axios from "axios";

export async function getAllCourses(apiUrl: string) {
  try {
    const res = await axios.get<Course[]>(`${apiUrl}/api/courses`);

    return res.data;
  } catch {
    return null;
  }
}
