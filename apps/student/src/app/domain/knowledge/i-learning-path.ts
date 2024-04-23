import { ILessonItem } from "./i-lesson";

export interface ILearningPath {
  isCompleted: boolean;
  isEmpty: boolean;
  lessons: ILessonItem[];
  progress: number;
  id: string;
}