export type Course = {
  id: number;
  fileCover?: string;
  isCoverUrl: number;
  name: string;
  path: string;
  urlCover?: string;
};

export type Lesson = {
  id: number;
  module: string;
  progressStatus: string;
  hierarchy_path: string;
  course_title: string;
  isCompleted: number;
  title: string;
  video_url: string;
  time_elapsed?: number;
  duration: string;
  pdf_url: string;
};

export type Module = Record<string, any>;

export type Modules = { [k: string]: Lesson[] };

export type Hierarchy = {
  [key: string]: Hierarchy | Lesson[];
};
