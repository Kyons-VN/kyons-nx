import { LearningGoal, StudentLearningGoal } from '@data/knowledge/learning-goal';
import { Program } from '@data/knowledge/program';
import { Subject } from '@domain/knowledge/subject/subject';
import { Observable } from 'rxjs';

export default interface IKnowledgeService {
  getSubjects(): Observable<Subject[]>;
  getPrograms(): Observable<Program[]>;
  selectProgram(program: Program): void;
  getSelectedProgram(): Program;
  removeSelectedProgram(): void;
  selectLearningGoal(learningGoal: LearningGoal): void;
  getSelectedLearningGoal(): LearningGoal;
  selectCategoryId(learningGoal: string): void;
  getSelectedCategoryId(): string;
  removeSelectedLearningGoal(): void;
  getStudentLearningGoals(): Observable<StudentLearningGoal[]>;
}
