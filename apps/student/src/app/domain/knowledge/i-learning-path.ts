import { Program } from "../../infrastructure/knowledge/program";
import { ILessonItem } from "./i-lesson";

export interface ILearningPath {
  isCompleted: boolean;
  lessonList: ILessonItem[];
  program: Program;
}