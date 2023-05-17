import { LearningGoalPath } from "@infrastructure/knowledge/learning-goal-path";
import { LearningPoint, LessonGroup } from "@infrastructure/knowledge/lesson";
import { Program } from "@infrastructure/knowledge/program";
import { Observable } from "rxjs";

export default interface ILessonService {
  getList(learningGoalId: string): Observable<LearningGoalPath | Error>;
  getDetail(id: string): Observable<LessonGroup>;
  getLearningPoint(program: Program): Observable<LearningPoint[]>;
  createLesson(program: Program, lPDIds: number[]): Observable<string>;
  getLearningGoalMockTest(learningGoalId: string): Observable<LearningGoalPath | Error>;
}