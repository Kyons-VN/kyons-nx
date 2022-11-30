import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IKnowledgeService from '@domain/knowledge/i-knowledge-service';
import { catchError, map, Observable } from 'rxjs';
import { Subject } from '../../domain/subject/subject';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { LearningGoal } from './learning-goal';
import { Program } from './program';

const SELECTED_PROGRAM_KEY = 'selected_program';
const SELECTED_LEARNING_GOAL_KEY = 'selected_learning_goal';
const SELECTED_CATEGORY_ID = 'selected_category_id';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService implements IKnowledgeService {
  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get(SERVER_API + '/subjects').pipe(
      catchError(DBHelper.handleError('GET subjects_list', [])),
      map((collection: any) => {
        if (collection.length === 0) return [];
        return collection.map((item: any) => Subject.fromJson(item));
      })
    );
  }

  getPrograms(): Observable<Program[]> {
    return this.http.get(SERVER_API + '/students/programs').pipe(
      catchError(DBHelper.handleError('GET programs_list', [])),
      map((collection: any) => {
        if (collection.length === 0) return [];
        return collection.map((item: any) => Program.fromJson(item));
      })
    );
  }

  selectProgram(program: Program): void {
    window.localStorage.setItem(
      SELECTED_PROGRAM_KEY,
      JSON.stringify(program.toJson())
    );
    if (program.learningGoal) {
      this.selectLearningGoad(program.learningGoal);
    }
  }

  getSelectedProgram(): Program {
    return Program.fromJson(
      JSON.parse(
        window.localStorage.getItem(SELECTED_PROGRAM_KEY) ??
        JSON.stringify(Program.empty().toJson())
      )
    );
  }

  removeSelectedProgram(): void {
    window.localStorage.removeItem(SELECTED_PROGRAM_KEY);
  }

  selectLearningGoad(learningGoal: LearningGoal): void {
    window.localStorage.setItem(
      SELECTED_LEARNING_GOAL_KEY,
      JSON.stringify(learningGoal.toJson())
    );
  }

  getSelectedLearningGoal(): LearningGoal {
    return LearningGoal.fromJson(
      JSON.parse(
        window.localStorage.getItem(SELECTED_LEARNING_GOAL_KEY) ??
        JSON.stringify(LearningGoal.empty().toJson())
      )
    );
  }

  selectCategoryId(learningGoal: string): void {
    window.localStorage.setItem(
      SELECTED_CATEGORY_ID,
      learningGoal
    );
  }

  getSelectedCategoryId(): string {
    return window.localStorage.getItem(SELECTED_CATEGORY_ID) ?? '';
  }

  removeSelectedLearningGoal() {
    window.localStorage.removeItem(SELECTED_LEARNING_GOAL_KEY);
  }
}
