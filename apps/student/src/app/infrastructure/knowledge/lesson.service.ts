import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ILessonService from '@domain/knowledge/i-lesson-service';
import { MockTestItem } from '@infrastructure/test/test-content';
import { Observable, catchError, map } from 'rxjs';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { LearningGoalPath } from './learning-goal-path';
import { LearningPoint, LessonGroup } from './lesson';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class LessonService implements ILessonService {
  getLearningGoalMockTest(learningGoalId: string) {
    return this.http.get<LearningGoalPath>(SERVER_API + `/students/learning_goal/${learningGoalId}/mock_tests`).pipe(
      // return this.http.get<MockTestItem[]>(SERVER_API + `/students/programs`).pipe(
      catchError(DBHelper.handleError('GET lesson_list', [])),
      map((res: any) => {
        // res = {
        //   "data": [
        //     {
        //       "id": 1,
        //       "created_date": "2023-01-01 15:50:45",
        //       "status": "learning_path_deactivated",
        //       "score": 8
        //     },
        //     {
        //       "id": 6,
        //       "created_date": "2023-01-10 10:53:20",
        //       "status": "learning_path_deactivated",
        //       "score": 8
        //     },
        //     {
        //       "id": 12,
        //       "created_date": "2023-01-12 10:53:20",
        //       "status": "learning_path_activated",
        //       "score": 3
        //     },
        //     {
        //       "id": 68,
        //       "created_date": "2023-03-15 10:53:20",
        //       "status": "mock_test_submitted",
        //       "score": 6
        //     },
        //     {
        //       "id": 100,
        //       "created_date": "2023-04-02 10:53:20",
        //       "status": "mock_test_submitted",
        //       "score": 6
        //     },
        //     {
        //       "id": 101,
        //       "created_date": "2023-04-02 11:53:20",
        //       "status": "new"
        //     },
        //     {
        //       "id": 102,
        //       "created_date": "2023-04-02 12:53:20",
        //       "status": "new"
        //     }
        //   ]
        // }
        const result = res['data'].map((item: any, i: number) => MockTestItem.fromJson(item, i));
        return result;
      })
    );
  }
  constructor(private http: HttpClient) {}

  getList(learningGoalId: string): Observable<LearningGoalPath> {
    return this.http.get<LearningGoalPath>(SERVER_API + `/students/learning_goal/${learningGoalId}/lessons`).pipe(
      // return this.http.get<LearningGoalPath>(SERVER_API + '/students/programs').pipe(
      catchError(DBHelper.handleError('GET lesson_list', [])),
      map((data: any) => {
        // if (data['new_user']) {
        //   return Error('new_user');
        // }
        // data = {
        //   complete_percentage: '65',
        //   categories: [
        //     {
        //       category_id: 1,
        //       category_name: 'Thi Toán THPT Quốc gia',
        //       completed: false,
        //       lesson_list: [
        //         {
        //           id: 'c88bf3d931b812d21001',
        //           name: 'Tổ hợp - Xác suất',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21002',
        //           name: 'Cấp số cộng - Cấp số nhân',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21003',
        //           name: 'Hình học không gian (khoảng cách - góc)',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21004',
        //           name: 'Hàm số',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21005',
        //           name: 'Mũ - Logarit',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21006',
        //           name: 'Hình học không gian (bài toán thể tích)',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21007',
        //           name: 'Lesson 7',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21008',
        //           name: 'Lesson 8',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21009',
        //           name: 'Lesson 9',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21010',
        //           name: 'Lesson 10',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21011',
        //           name: 'Lesson 11',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21012',
        //           name: 'Lesson 12',
        //           new: false,
        //         },
        //         {
        //           id: 'c88bf3d931b812d21013',
        //           name: 'Lesson 13',
        //           new: true,
        //           lesson_percentage: 65,
        //         },
        //       ],
        //     },
        //   ],
        // };
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
          return collection.map((dataObject: any) => LearningPoint.fromJson(dataObject));
        })
      );
  }

  createLesson(program: Program, lPDIds: number[]): Observable<string> {
    const params: any = {
      learning_point_difficulty_ids: lPDIds,
      program_id: program.id,
    };
    return this.http.post<LearningPoint[]>(SERVER_API + `/students/update_learning_path`, params).pipe(
      catchError(DBHelper.handleError('GET update_learning_path')),
      map((collection: any) => {
        return '';
      })
    );
  }

  activateLearningPath(mockTestId: string): Observable<string> {
    // next: data => {
    return this.http
      .post<LearningPoint[]>(SERVER_API + `/students/mock_test/${mockTestId}/activate_learning_path`, {})
      .pipe(
        catchError(DBHelper.handleError('GET activate_learning_path')),
        map((collection: any) => {
          return '';
        })
      );
    // },
    // });
  }
}
