import { LearningPath, Lesson } from '@data/knowledge/lesson';
import { Observable } from 'rxjs';

export default interface ILessonService {
  getList(learningGoalId: string): Observable<LearningPath | Error>;
  getDetail(id: string): Observable<Lesson>;
  // getLearningPoint(program: Program): Observable<LearningPoint[]>;
  // createLesson(program: Program, lPDIds: number[]): Observable<string>;
  // getLearningGoalMockTest(learningGoalId: string): Observable<LearningGoalPath | Error>;
}
