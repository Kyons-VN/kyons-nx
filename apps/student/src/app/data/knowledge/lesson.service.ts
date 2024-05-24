import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { serverApi } from '@data/auth/interceptor';
import { MockTestItem } from '@data/test/test-content';
import ILessonService from '@domain/knowledge/i-lesson-service';
import { Exercise, Submission, TestReviewHtml } from '@share-utils/data';
import { catchError, map, Observable } from 'rxjs';
import { DBHelper } from '../helper/helper';
import { LearningGoal, StudentLearningGoal } from './learning-goal';
import { LearningGoalPath } from './learning-goal-path';
import { LearningPath, LearningPoint, Lesson, LessonGroup } from './lesson';
import { Program } from './program';

const SELECTED_STUDENT_LEARNING_GOAL_KEY = 'selected_student_learning_goal';

@Injectable({
  providedIn: 'root',
})
export class LessonService implements ILessonService {
  http: HttpClient = inject(HttpClient);
  getLearningGoalMockTest(learningGoalId: string) {
    return this.http.get<LearningGoalPath>(`${serverApi()}/api/v2/users/learning_goals/${learningGoalId}/mock_tests`).pipe(
      // return this.http.get<MockTestItem[]>(`${serverApi()}/students/programs`).pipe(
      // catchError(DBHelper.handleError('GET lesson_list', [])),
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

  getStudentLearningGoal(): StudentLearningGoal {
    return new StudentLearningGoal(
      JSON.parse(
        window.localStorage.getItem(SELECTED_STUDENT_LEARNING_GOAL_KEY) ?? JSON.stringify(LearningGoal.empty().toJson())
      )
    );
  }


  getStudentLearningGoals(): Observable<StudentLearningGoal[]> {
    return this.http.get(`${serverApi()}/api/v2/users/learning_goals`).pipe(
      catchError(DBHelper.handleError('GET learning_goals_list', [])),
      map((res: any) => {
        if (res.data == undefined || res.data.length === 0) return [];
        // res = {
        //   data: [
        // {
        //   id: 100,
        //   name: 'Kiểm tra 15 phút',
        //   program_name: 'English 11',
        //   complete_percentage: 100,
        //   ordinal_number: 1,
        //   subject_id: 1,
        // },
        // {
        //   id: 97,
        //   name: 'Kiểm tra 1 tiết',
        //   program_name: 'English 12',
        //   complete_percentage: 70,
        //   ordinal_number: 2,
        //   subject_id: 2,
        // },
        //   ],
        // };

        return res.data.map((item: any) => StudentLearningGoal.fromJson(item));
      })
    );
  }

  selectStudentLearningGoal(learningGoal: StudentLearningGoal): void {
    window.localStorage.setItem(SELECTED_STUDENT_LEARNING_GOAL_KEY, JSON.stringify(learningGoal.toJson()));
  }

  getList(learningGoalId: string): Observable<LearningPath> {
    return this.http.get<LearningGoalPath>(`${serverApi()}/api/v2/users/learning_goals/${learningGoalId}/learning_path`).pipe(
      // return this.http.get<LearningGoalPath>(`${serverApi()}/students/programs').pipe(
      catchError(DBHelper.handleError('GET lesson_list', LearningPath.empty())),
      map((res: any) => {
        // res = {
        //   data:
        //   {
        //     "id": 42,
        //     "progress": 10,
        //     "lessons": [
        //       {
        //         "id": 65,
        //         "progress": 10.0,
        //         "name": "Phủ định một mệnh đề",
        //         "lesson_content": "https://drive.google.com/file/d/..."
        //       }
        //     ]
        //   }

        // }
        return LearningPath.fromJson(res['data']);
      })
    );
  }

  getDetail(id: string): Observable<Lesson> {
    return this.http.get<LessonGroup>(`${serverApi()}/lesson/${id}`).pipe(
      // catchError(DBHelper.handleError('GET lesson_detail')),
      map((res: any) => {
        return Lesson.fromJson(res);
      })
    );
  }

  setContent(content: string) {
    window.localStorage.setItem('content', content);
  }

  getContent() {
    return window.localStorage.getItem('content') ?? '';
  }

  submitExercise(lessonId: string, submission: Submission) {
    const params = {
      "test_question_id": Number(submission.testId),
      "answer_id": Number(Object.values(submission.submitData)[0]),
    }

    return this.http
      .post(`${serverApi()}/api/v2/users/lessons/${lessonId}`, params)
      .pipe(
        catchError(DBHelper.handleError('GET submit_answers', Error)),
        map((res: any) => {
          // res = {
          //   "data": [
          //     {
          //       "id": 152,
          //       "content": "<p><span class=\"undefined\" data-cfc=\"#000000\" data-cfbg=\"transparent\">Trong các câu sau, câu nào không phải là mệnh đề?</span></p>",
          //       "answer_id": 606,
          //       "answer_status": false,
          //       "answers": [
          //         {
          //           "id": 606,
          //           "content": "<p><math xmlns=\"http://www.w3.org/1998/Math/MathML\"><mn>6</mn><mo>&lt;</mo><mn>10</mn><mo>-</mo><mn>4</mn><mo>.</mo></math></p>"
          //         },
          //         {
          //           "id": 605,
          //           "content": "<p>Phương trình&nbsp;<math xmlns=\"http://www.w3.org/1998/Math/MathML\"><msup><mi>x</mi><mn>2</mn></msup><mo>-</mo><mn>3</mn><mi>x</mi><mo>+</mo><mn>2</mn><mo>=</mo><mn>0</mn></math>&nbsp;có nghiệm nguyên.</p>"
          //         },
          //         {
          //           "id": 607,
          //           "content": "<p><span class=\"undefined\" data-cfc=\"#000000\" data-cfbg=\"transparent\">Có bao nhiêu dấu hiệu nhận biết một hình vuông?</span></p>"
          //         },
          //         {
          //           "id": 608,
          //           "content": "<p><span class=\"undefined\" data-cfc=\"#000000\" data-cfbg=\"transparent\">Tam giác cân có hai cạnh bằng nhau.</span></p>"
          //         }
          //       ],
          //       "explanation": "<p><span class=\"undefined\" data-cfc=\"#000000\" data-cfbg=\"transparent\">Lựa chọn C là một hỏi nên không phải là mệnh đề.</span></p>",
          //       "correct_answer": 607
          //     }
          //   ],
          //   "status": "chatbot",
          //   "random_status": "Success"
          // }
          return res;
        })
      );
  }

  getReviewHtml(lessonId: string) {
    return this.http.get(`${serverApi()}/api/v2/users/lessons/${lessonId}/review`).pipe(
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
      .get<LearningPoint[]>(`${serverApi()}/students/self_study_path`, {
        params: params,
      })
      .pipe(
        catchError(DBHelper.handleError('GET self_study_path')),
        map((dataObject: any) => {
          if (dataObject.data.length === 0) return [];
          return dataObject.data.map((dataObject: any) => LearningPoint.fromJson(dataObject));
        })
      );
  }

  createLesson(program: Program, lPDIds: number[]): Observable<string> {
    const params: any = {
      learning_point_difficulty_ids: lPDIds,
      program_id: program.id,
    };
    return this.http.post(`${serverApi()}/students/update_learning_path`, params).pipe(
      catchError(DBHelper.handleError('GET update_learning_path')),
      map(() => {
        return '';
      })
    );
  }

  activateLearningPath(mockTestId: string): Observable<StudentLearningGoal> {
    // next: data => {
    return this.http
      .post(`${serverApi()}/api/v2/users/mock_tests/${mockTestId}/activate_learning_path`, {})
      .pipe(
        catchError(DBHelper.handleError('GET activate_learning_path')),
        map((res: any) => {
          if (res['status'] == undefined || res['user_learning_goal'] == undefined) return StudentLearningGoal.empty();
          return StudentLearningGoal.fromJson(res['user_learning_goal']);
        })
      );
    // },
    // });
  }

  getExercise(lessonId: string): Observable<Exercise> {
    return this.http.get(`${serverApi()}/api/v2/users/lessons/${lessonId}/questions`).pipe(
      // catchError(DBHelper.handleError('GET get_lesson_exercise', [])),
      map((dataObject: any) => {
        const result = Exercise.fromJson(dataObject);
        // result.progress = dataObject['lesson_percentage'];
        return result;
      })
    );
  }
}
