import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ILessonService from '@domain/knowledge/i-lesson-service';
import { catchError, map, Observable } from 'rxjs';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { LearningGoal } from './learning-goal';
import { LearningGoalPath } from './learning-goal-path';
import { LearningPoint, LessonGroup } from './lesson';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class LessonService implements ILessonService {
  constructor(private http: HttpClient) { }

  getList(selectedProgram: Program, selectedLearningGoal: LearningGoal): Observable<LearningGoalPath | Error> {
    const params = new HttpParams().set('program_id', selectedProgram.id).set('learning_goal_id', selectedLearningGoal.id.toString());
    return this.http.get<LearningGoalPath>(SERVER_API + '/lesson/list', { params: params }).pipe(
      catchError(DBHelper.handleError('GET lesson_list', [])),
      map((data: any) => {
        if (data['new_user']) {
          return Error('new_user');
        }
        return LearningGoalPath.fromJson(data);
      })
    );
  }

  getDetail(id: string): Observable<LessonGroup> {
    return this.http.get<LessonGroup>(SERVER_API + `/lesson/${id}`).pipe(
      // catchError(DBHelper.handleError('GET lesson_detail')),
      map((res: any) => {
        return LessonGroup.fromJson(id, res);
      })
    );
  }

  getLearningPoint(program: Program): Observable<LearningPoint[]> {
    const params = new HttpParams().set('program_id', program.id);
    return this.http
      .get<LearningPoint[]>(SERVER_API + `/students/self_study_path`, {
        params: params,
      })
      .pipe(
        catchError(DBHelper.handleError('GET self_study_path')),
        map((collection: any) => {
          if (collection.length === 0) return [];
          return collection.map((dataObject: any) =>
            LearningPoint.fromJson(dataObject)
          );
        })
      );
  }

  createLesson(program: Program, lPDIds: number[]): Observable<string> {
    const params: any = {
      learning_point_difficulty_ids: lPDIds,
      program_id: program.id,
    };
    return this.http
      .post<LearningPoint[]>(
        SERVER_API + `/students/update_learning_path`,
        params
      )
      .pipe(
        catchError(DBHelper.handleError('GET update_learning_path')),
        map((collection: any) => {
          return '';
        })
      );
  }
}
