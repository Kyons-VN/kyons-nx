import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IKnowledgeService from '@domain/knowledge/i-knowledge-service';
import { Observable, catchError, map } from 'rxjs';
import { Subject } from '../../domain/subject/subject';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { LearningGoal, StudentLearningGoal } from './learning-goal';
import { Program } from './program';

const SELECTED_PROGRAM_KEY = 'selected_program';
const SELECTED_LEARNING_GOAL_KEY = 'selected_learning_goal';
const SELECTED_STUDENT_LEARNING_GOAL_KEY = 'selected_student_learning_goal';
const SELECTED_CATEGORY_ID = 'selected_category_id';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService implements IKnowledgeService {
  constructor(private http: HttpClient) {}

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
    window.localStorage.setItem(SELECTED_PROGRAM_KEY, JSON.stringify(program.toJson()));
    if (program.learningGoal) {
      this.selectLearningGoal(program.learningGoal);
    }
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

  selectStudentLearningGoal(learningGoal: StudentLearningGoal): void {
    window.localStorage.setItem(SELECTED_STUDENT_LEARNING_GOAL_KEY, JSON.stringify(learningGoal.toJson()));
  }

  getStudentLearningGoal(): StudentLearningGoal {
    return new StudentLearningGoal(
      JSON.parse(
        window.localStorage.getItem(SELECTED_STUDENT_LEARNING_GOAL_KEY) ?? JSON.stringify(LearningGoal.empty().toJson())
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

  getStudentLearningGoals(): Observable<StudentLearningGoal[]> {
    return this.http.get(SERVER_API + '/students/master_learning_goals').pipe(
      catchError(DBHelper.handleError('GET learning_goals_list', [])),
      map((res: any) => {
        if (res.data.length === 0) return [];
        // res = {
        //   data: [
        //     {
        //       id: 100,
        //       name: 'Kiểm tra 15 phút',
        //       program_name: 'English 11',
        //       complete_percentage: 100,
        //       ordinal_number: 1,
        //       subject_id: 1,
        //     },
        //     {
        //       id: 97,
        //       name: 'Kiểm tra 1 tiết',
        //       program_name: 'English 12',
        //       complete_percentage: 70,
        //       ordinal_number: 2,
        //       subject_id: 2,
        //     },
        //   ],
        // };

        return res.data.map((item: any) => StudentLearningGoal.fromJson(item));
      })
    );
  }
}
