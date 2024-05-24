import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverApi } from '@data/auth/interceptor';
import IKnowledgeService from '@domain/knowledge/i-knowledge-service';
import { Observable, catchError, map } from 'rxjs';
import { Subject } from '../../domain/knowledge/subject/subject';
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
  // getLearningGoalList() {
  //   return this.http.get(`${serverApi()}/api/v2/`).pipe(
  //     catchError(DBHelper.handleError('GET learning_goal_list', [])),
  //     map((dataObject: any) => {
  //       if (collection.length === 0) return [];
  //       return collection.map((item: any) => Subject.fromJson(item));
  //     })
  //   );
  // }
  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get(`${serverApi()}/api/v2/subjects`).pipe(
      catchError(DBHelper.handleError('GET subjects_list', [])),
      map((dataObject: any) => {
        if (dataObject.data == null || dataObject.data.length === 0) return [];
        return dataObject.data.map((item: any) => Subject.fromJson(item));
      })
    );
  }

  getPrograms(): Observable<Program[]> {
    return this.http.get(`${serverApi()}/students/programs`).pipe(
      catchError(DBHelper.handleError('GET programs_list', [])),
      map((dataObject: any) => {
        if (dataObject.data == null || dataObject.data.length === 0) return [];
        return dataObject.data.map((item: any) => Program.fromJson(item));
      })
    );
  }

  selectProgram(program: Program): void {
    window.localStorage.setItem(SELECTED_PROGRAM_KEY, JSON.stringify(program.toJson()));
  }

  getSelectedProgram(): Program {
    return Program.fromJson(
      JSON.parse(window.localStorage.getItem(SELECTED_PROGRAM_KEY) ?? JSON.stringify(Program.empty().toJson()))
    );
  }

  removeSelectedProgram(): void {
    window.localStorage.removeItem(SELECTED_PROGRAM_KEY);
  }

  selectLearningGoal(learningGoal: LearningGoal): void {
    window.localStorage.setItem(SELECTED_LEARNING_GOAL_KEY, JSON.stringify(learningGoal.toJson()));
  }

  getSelectedLearningGoal(): LearningGoal {
    return new LearningGoal(
      JSON.parse(
        window.localStorage.getItem(SELECTED_LEARNING_GOAL_KEY) ?? JSON.stringify(LearningGoal.empty().toJson())
      )
    );
  }

  selectCategoryId(learningGoal: string): void {
    window.localStorage.setItem(SELECTED_CATEGORY_ID, learningGoal);
  }

  getSelectedCategoryId(): string {
    return window.localStorage.getItem(SELECTED_CATEGORY_ID) ?? '';
  }

  removeSelectedLearningGoal() {
    window.localStorage.removeItem(SELECTED_LEARNING_GOAL_KEY);
  }
}
