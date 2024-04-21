import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LearningGoal } from '@data/knowledge/learning-goal';
import { Observable, catchError, map } from 'rxjs';
import { serverApi } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { Program } from '../knowledge/program';
import { UserService } from '../user/user.service';
// import { Submission } from './submission';
// import { TestContent, TestResult } from './test-content';

import { Exercise, MockTestResult, Submission, TestContent, TestResult, TestReviewHtml, Topic } from '@share-utils/data';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getDiagnosticTest(selectedProgram: Program) {
    const params = new HttpParams().set('program_id', selectedProgram.id);
    return this.http.get(`${serverApi()}/api/v2/test/diagnostic_test`, { params: params }).pipe(
      catchError(DBHelper.handleError('GET diagnostic_test', [])),
      map((dataObject: any) => {
        return TestContent.fromJson(dataObject);
      })
    );
  }

  getTest(lessonId: string, learningGoalId: string): Observable<TestContent> {
    const params = new HttpParams().set('lesson_id', lessonId).set('learning_goal_id', learningGoalId);
    return this.http.get(`${serverApi()}/api/v2/test/get_lesson_test`, { params: params }).pipe(
      catchError(DBHelper.handleError('GET get_lesson_test', [])),
      map((dataObject: any) => {
        return TestContent.fromJson(dataObject);
      })
    );
  }

  getTestResult(type: string, id: string): Observable<TestResult> {
    const params = new HttpParams().set(`${type}_id`, id);
    return this.http.get(`${serverApi()}/api/v2/test/result`, { params: params }).pipe(
      catchError(DBHelper.handleError('GET get_test_result', [])),
      map((dataObject: any) => {
        return TestResult.fromJson(dataObject);
      })
    );
  }

  skipTest(): Observable<boolean> {
    return this.http.get(`${serverApi()}/api/v2/test/skip_diagnostic_test`).pipe(
      catchError(DBHelper.handleError('GET skip_diagnostic_test', Error('Server Error'))),
      map(() => {
        return true;
      })
    );
  }

  getExercise(lessonId: string): Observable<Exercise> {
    return this.http.get(`${serverApi()}/api/v2/users/practice_test/get/adaptive_question/${lessonId}`).pipe(
      // catchError(DBHelper.handleError('GET get_lesson_exercise', [])),
      map((dataObject: any) => {
        const result = Exercise.fromJson(dataObject);
        // result.progress = dataObject['lesson_percentage'];
        return result;
      })
    );
  }

  // submitTest(submission: Submission) {
  //   let params = {
  //     test_id: submission.testId,
  //   };
  //   params = Object.assign(params, submission.toJson());

  //   return this.http.post(`${serverApi()}/submit_answers`, params).pipe(
  //     catchError(DBHelper.handleError('GET submit_answers', Error('Server Error'))),
  //     map((res: any) => {
  //       return TestResult.fromJson(res);
  //     })
  //   );
  // }

  submitTest(submission: Submission) {
    console.log(submission.toJson());
    return this.http
      .post(`${serverApi()}/api/v2/users/mock_tests/${submission.testId}/submit_answers/non_adaptive`, submission.toJson())
      .pipe(
        catchError(DBHelper.handleError('GET submit_answers', Error('Server Error')))
        // map((res: any) => {
        //   return res;
        // })
      );
  }

  getLearningGoal(selectedProgram: Program): Observable<LearningGoal[]> {
    const params = new HttpParams().set('program_id', selectedProgram.id);
    return (
      this.http
        .get<LearningGoal[]>(`${serverApi()}/api/v2/learning_goals`, { params: params })
        // .get<LearningGoal[]>(`${serverApi()}/lesson/list', { params: params })
        .pipe(
          // catchError(DBHelper.handleError('GET getLearningGoals', [])),
          map((collections: any) => {
            // collections = [
            //   {
            //     id: 1,
            //     name: 'Mock Test 3811(old mapping)',
            //     min_topic_numb: 9,
            //     max_topic_numb: 9,
            //     numb_questions: 50,
            //     mock_test_duration: 90,
            //     program_id: 1,
            //     status: 'enabled',
            //     topic_list: '[65, 66, 67, 68, 69, 70, 71, 72, 73]',
            //     created_at: '2023-05-08T06:17:07.704+07:00',
            //     updated_at: '2023-05-18T19:41:11.095+07:00',
            //     allow_select: false,
            //     mock_test_templates: [
            //       {
            //         id: 3811,
            //         name: 'Đề thi mô phỏng do Kyons biên soạn',
            //       },
            //     ],
            //   },
            //   {
            //     id: 3,
            //     name: 'mock test 4278 (Trial Test1)',
            //     min_topic_numb: 9,
            //     max_topic_numb: 9,
            //     numb_questions: 50,
            //     mock_test_duration: 0,
            //     program_id: 1,
            //     status: 'enabled',
            //     topic_list: '[65, 66, 67, 68, 69, 70, 71, 72, 73]',
            //     created_at: '2023-05-08T06:17:07.704+07:00',
            //     updated_at: '2023-05-08T06:17:07.704+07:00',
            //     allow_select: false,
            //     mock_test_templates: [
            //       {
            //         id: 3811,
            //         name: 'Đề thi mô phỏng do Kyons biên soạn',
            //       },
            //       {
            //         id: 3421,
            //         name: 'Đề thi năm 2023',
            //       },
            //     ],
            //   },
            // ];
            if (collections.length == 0) return [];
            return collections.map((dataObject: any) => LearningGoal.fromJson(dataObject));
          })
        )
    );
  }

  getTopicsOfLearningGoal(learningGoalId: string): Observable<{ learningGoal: LearningGoal, topics: Topic[] }> {
    return this.http.get<LearningGoal>(`${serverApi()}/api/v2/learning_goals/${learningGoalId}/topics`).pipe(
      catchError(DBHelper.handleError('GET getLearningGoals', { learningGoal: LearningGoal.empty(), topics: [] })),
      map((res: any) => {
        if (res['id'] == undefined) return { learningGoal: LearningGoal.empty(), topics: [] };
        return { learningGoal: LearningGoal.fromJson(res), topics: res['topics'].map((dataObject: any) => Topic.fromJson(dataObject)) };
        // if (collections.length == 0) return [];
        // return collections.map((dataObject: any) => Topic.fromJson(dataObject));
      })
    );
  }

  submitTopics(learningGoalId: string, topicIds: string[]) {
    const params = {
      master_id: parseInt(learningGoalId),
      topics: topicIds.map(str => parseInt(str)),
    };

    return this.http.post(`${serverApi()}/api/v2/users/mock_tests`, params).pipe(
      catchError(DBHelper.handleError('GET submitTopics', Error('Server Error'))),
      map((res: any) => {
        return res['test_id'];
      })
    );
  }

  getMockTest(testId: string) {
    return (
      this.http
        .get(`${serverApi()}/api/v2/users/mock_tests/${testId}/questions`)
        // .get(`${serverApi()}/students/learning_goal/list', { params: params })
        .pipe(
          catchError(DBHelper.handleError('GET diagnostic_test', [])),
          map((dataObject: any) => {
            return TestContent.fromJson(dataObject);
          })
        )
    );
  }

  // getMockTestHtml(testId: string) {
  //   return this.http.get(`${serverApi()}/students/mock_tests/${testId}/questions`).pipe(
  //     // catchError(DBHelper.handleError('GET diagnostic_test', [])),
  //     map((dataObject: any) => {
  //       // dataObject = mockTestJson;

  //       return TestContentHtml.fromJson(dataObject);
  //     })
  //   );
  // }

  getShareMockTestInfoFromRef(ref: string) {
    return this.http.get(`${serverApi()}/api/v2/users/reference/mocktest/${ref}`).pipe(
      map(({ given_name, total_score, learning_goal }: any) => {
        return {
          fromUsername: given_name,
          score: total_score,
          learningGoal: LearningGoal.fromJson(learning_goal),
        };
      })
    );
  }

  // getMockTestResult(mockTestId: string, learningGoalId: string) {
  //   return this.http
  //     .get(`${serverApi()}/students/learning_goal/${learningGoalId}/mock_tests?mock_test_id=${mockTestId}`)
  //     .pipe(
  //       catchError(DBHelper.handleError('GET subjects_list', [])),
  //       map((res: any) => {
  //         return TestResult.fromJson(res.data);
  //       })
  //     );
  // }

  getMockTestReviewHtml(mockTestId: string) {
    return this.http.get(`${serverApi()}/api/v2/users/mock_tests/${mockTestId}/review`).pipe(
      catchError(DBHelper.handleError('GET mock_tests/review', TestReviewHtml.empty())),
      map((res: any) => {
        // res = mockTestReviewJson;
        return TestReviewHtml.fromJson(res);
      })
    );
  }

  getMockTestResult(mockTestId: string) {
    return this.http.get(`${serverApi()}/api/v2/users/mock_tests/${mockTestId}`).pipe(
      catchError(DBHelper.handleError('GET mock_tests', MockTestResult.empty())),
      map((res: any) => {
        return MockTestResult.fromJson(res);
      })
    );
  }

  getProbabilityIndex({
    testId,
    learningGoalId,
  }: {
    testId?: string;
    learningGoalId?: string;
  }): Observable<number | undefined> {
    let queryParams = new HttpParams();
    if (testId != null) {
      queryParams = new HttpParams().set('mock_test_id', testId);
    } else if (learningGoalId != null) {
      queryParams = new HttpParams().set('student_master_learning_goal_id', learningGoalId);
    }
    return this.http.get(`${serverApi()}/students/probability_index`, { params: queryParams }).pipe(
      catchError(DBHelper.handleError('GET subjects_list', [])),
      map((res: any) => {
        if (res.data == null) return undefined;
        return res.data.toFixed(2) as number;
      })
    );
  }
}
