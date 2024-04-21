import { LearningGoalPath } from '@data/knowledge/learning-goal-path';
import { LessonGroup } from '@data/knowledge/lesson';
import { Observable } from 'rxjs';

export default interface ILessonService {
  getList(learningGoalId: string): Observable<LearningGoalPath | Error>;
  getDetail(id: string): Observable<LessonGroup>;
  // getLearningPoint(program: Program): Observable<LearningPoint[]>;
  // createLesson(program: Program, lPDIds: number[]): Observable<string>;
  // getLearningGoalMockTest(learningGoalId: string): Observable<LearningGoalPath | Error>;
}
