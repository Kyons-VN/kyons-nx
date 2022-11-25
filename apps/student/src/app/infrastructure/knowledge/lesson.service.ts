import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import LearningGoal from './learning-goal';
import { LearningGoalPath } from './learning-goal-path';
import { LearningPoint, LessonGroup } from './lesson';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private http: HttpClient) { }

  getList(selectedProgram: Program, selectedLearningGoal: LearningGoal): Observable<LearningGoalPath | Error> {
    const params = new HttpParams().set('program_id', selectedProgram.id).set('learning_goal_id', selectedLearningGoal.id.toString());
    return this.http.get<LearningGoalPath>(SERVER_API + '/lesson/list', { params: params }).pipe(
      catchError(DBHelper.handleError('GET lesson_list', [])),
      map((data: any) => {
        // data = {
        //   "complete_percentage": 100,
        //   "categories": [
        //     {
        //       "category_id": 1,
        //       "category_name": "Vocabulary",
        //       "completed": true,
        //       "lesson_list": [
        //         {
        //           "id": "ea758892a1870a10703d",
        //           "name": "Unit 2: Personnal Experiences Các họ từ vựng cần nhớ (Word families 1) (English 11)",
        //           "new": false
        //         },
        //         {
        //           "id": "1c05f2011c1ba32bf197",
        //           "name": "Unit 4: Volunteer Work Các họ từ vựng cần nhớ (Word families 2) (English 11)",
        //           "new": false
        //         },
        //         {
        //           "id": "808e1199c490d441340c",
        //           "name": "Unit 3: A Party Vận dụng từ loại trong câu (Word formation) (English 11)",
        //           "new": false
        //         }
        //       ]
        //     }
        //   ]
        // };
        if (data['new_user']) {
          return Error('new_user');
        }
        return LearningGoalPath.fromJson(data);
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
