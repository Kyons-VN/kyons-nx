import { Subject } from "@domain/subject/subject";
import { LearningGoal } from "@infrastructure/knowledge/learning-goal";
import { Program } from "@infrastructure/knowledge/program";
import { Observable } from "rxjs";

export default interface IKnowledgeService {
  getSubjects(): Observable<Subject[]>;
  getPrograms(): Observable<Program[]>;
  selectProgram(program: Program): void;
  getSelectedProgram(): Program;
  removeSelectedProgram(): void;
  selectLearningGoad(learningGoal: LearningGoal): void;
  getSelectedLearningGoal(): LearningGoal;
  selectCategoryId(learningGoal: string): void;
  getSelectedCategoryId(): string;
  removeSelectedLearningGoal(): void;
}