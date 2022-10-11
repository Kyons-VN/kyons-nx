import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { LearningPath, LearningPoint, LessonGroup, LessonItem } from './lesson';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) { }

  getList(selectedProgram: Program): Observable<LearningPath> {
    const params = new HttpParams().set('program_id', selectedProgram.id);
    return this.http.get(SERVER_API + '/lesson/list', { params: params }).pipe(
      catchError(DBHelper.handleError('GET lesson_list', [])),
      map((data: any) => {
        if (data['completed']) return LearningPath.completed(selectedProgram);
        return LearningPath.fromJson({
          program: selectedProgram,
          isCompleted: false,
          lessonList: data.length === 0 ? [] : data.map((item: any, index: number) =>
            LessonItem.fromJson({ dataObject: item, index: index })
          )
        },);
      })
    );
  }

  getDetail(id: string): Observable<LessonGroup> {
    return this.http.get<LessonGroup>(SERVER_API + `/lesson/${id}`).pipe(
      catchError(DBHelper.handleError('GET lesson_detail')),
      map((dataObject: any) => {
        return LessonGroup.fromJson(id, dataObject);
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
