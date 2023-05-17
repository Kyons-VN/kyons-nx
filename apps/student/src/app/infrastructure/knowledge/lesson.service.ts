import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ILessonService from '@domain/knowledge/i-lesson-service';
import { MockTestItem } from '@infrastructure/test/test-content';
import { SubmissionHtml, TestReviewHtml } from '@share-utils/data';
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

  submitExercise(lessonId: string, submission: SubmissionHtml) {
    return this.http
      .post(SERVER_API + `/students/practice_test/lesson/${lessonId}/submit_answers/adaptive`, submission.toJson())
      .pipe(
        catchError(DBHelper.handleError('GET submit_answers', Error('Server Error'))),
        map((res: any) => {
          res = {};
          res.data = {
            lesson_percentage: 60,
            result: [
              {
                id: 15307291,
                answer_status: true,
                explanation:
                  '<div><div>\n\t\t\t<style type="text/css">\n\t\t\t\t.kLnDsmZC8c49r2Ntz8LHD{display:table;margin-top:0}._33s8iDB86ShboS4mZ56Q4l{margin-left:.7em;width:calc(100% - 3em)}@media screen and (max-width:768px){.kLnDsmZC8c49r2Ntz8LHD{font-size:14px}}.dottedText .JXGtext {transform: rotate(-24deg) !important;}\n\t\t\t</style>\n\t\t\t<div><div class="_33s8iDB86ShboS4mZ56Q4l"><div class="solution"><div></div><div></div><p class="kLnDsmZC8c49r2Ntz8LHD"><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mtext>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</mtext></mrow><annotation encoding="application/x-tex">~~~~~~</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0em;vertical-align:0em;"></span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>=</mo></mrow><annotation encoding="application/x-tex">=</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.36687em;vertical-align:0em;"></span><span class="mrel">=</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1444</mn></mrow><annotation encoding="application/x-tex">1444</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">1</span><span class="mord">4</span><span class="mord">4</span><span class="mord">4</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>+</mo></mrow><annotation encoding="application/x-tex">+</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.66666em;vertical-align:-0.08333em;"></span><span class="mord">+</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>56.25</mn></mrow><annotation encoding="application/x-tex">56.25</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">5</span><span class="mord">6</span><span class="mord">.</span><span class="mord">2</span><span class="mord">5</span></span></span></span></span><span>&nbsp;</span><span> </span></p><p class="kLnDsmZC8c49r2Ntz8LHD"><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mtext>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</mtext></mrow><annotation encoding="application/x-tex">~~~~~~</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0em;vertical-align:0em;"></span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>=</mo></mrow><annotation encoding="application/x-tex">=</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.36687em;vertical-align:0em;"></span><span class="mrel">=</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1500.25</mn></mrow><annotation encoding="application/x-tex">1500.25</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">1</span><span class="mord">5</span><span class="mord">0</span><span class="mord">0</span><span class="mord">.</span><span class="mord">2</span><span class="mord">5</span></span></span></span></span><span>&nbsp;</span><span> </span></p><p class="kLnDsmZC8c49r2Ntz8LHD"><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mtext>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</mtext></mrow><annotation encoding="application/x-tex">~~~~~~</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0em;vertical-align:0em;"></span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span><span class="mspace nobreak">&nbsp;</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>=</mo></mrow><annotation encoding="application/x-tex">=</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.36687em;vertical-align:0em;"></span><span class="mrel">=</span></span></span></span></span><span>&nbsp;</span><span> &nbsp;</span><span><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>38.73</mn></mrow><annotation encoding="application/x-tex">38.73</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.64444em;vertical-align:0em;"></span><span class="mord">3</span><span class="mord">8</span><span class="mord">.</span><span class="mord">7</span><span class="mord">3</span></span></span></span></span><span>&nbsp;</span><span> </span></p><div></div></div><div></div></div></div>\n\t\t</div></div>',
              },
            ],
          };
          return res.data;
        })
      );
  }

  getReviewHtml(lessonId: string) {
    return this.http.get(SERVER_API + `/students/practice_test/lesson/${lessonId}/review`).pipe(
      catchError(DBHelper.handleError('GET practice_test/review', [])),
      map((res: any) => {
        // res = mockTestReviewJson;
        return TestReviewHtml.fromJson(res);
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
