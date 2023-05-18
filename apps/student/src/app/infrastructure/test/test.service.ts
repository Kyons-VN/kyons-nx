import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Topic } from '@infrastructure/knowledge/topic';
import { Observable, catchError, map } from 'rxjs';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { Program } from '../knowledge/program';
import { UserService } from '../user/user.service';
import { Submission } from './submission';
import { TestContent, TestResult } from './test-content';

import { ExerciseHtml, MockTestResult, SubmissionHtml, TestContentHtml, TestReviewHtml } from '@share-utils/data';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getDiagnosticTest(selectedProgram: Program) {
    const params = new HttpParams().set('program_id', selectedProgram.id);
    return this.http.get(SERVER_API + '/test/diagnostic_test', { params: params }).pipe(
      catchError(DBHelper.handleError('GET diagnostic_test', [])),
      map((dataObject: any) => {
        return TestContent.fromJson(dataObject);
      })
    );
  }

  getTest(lessonId: string, learningGoalId: string): Observable<TestContent> {
    const params = new HttpParams().set('lesson_id', lessonId).set('learning_goal_id', learningGoalId);
    return this.http.get(SERVER_API + '/test/get_lesson_test', { params: params }).pipe(
      catchError(DBHelper.handleError('GET get_lesson_test', [])),
      map((dataObject: any) => {
        return TestContent.fromJson(dataObject);
      })
    );
  }

  getTestResult(type: string, id: string): Observable<TestResult> {
    const params = new HttpParams().set(`${type}_id`, id);
    return this.http.get(SERVER_API + '/test/result', { params: params }).pipe(
      catchError(DBHelper.handleError('GET get_test_result', [])),
      map((dataObject: any) => {
        return TestResult.fromJson(dataObject);
      })
    );
  }

  skipTest(): Observable<boolean> {
    return this.http.get(SERVER_API + '/test/skip_diagnostic_test').pipe(
      catchError(DBHelper.handleError('GET skip_diagnostic_test', Error('Server Error'))),
      map(value => {
        return true;
      })
    );
  }

  getExercise(lessonId: string): Observable<ExerciseHtml> {
    return this.http.get(SERVER_API + `/students/practice_test/get/adaptive_question/${lessonId}`).pipe(
      // catchError(DBHelper.handleError('GET get_lesson_exercise', [])),
      map((dataObject: any) => {
        const result = ExerciseHtml.fromJson(dataObject);
        result.progress = dataObject['lesson_percentage'];
        return result;
      })
    );
  }

  submitTest(submission: Submission) {
    let params = {
      test_id: submission.testId,
    };
    params = Object.assign(params, submission.toJson());

    return this.http.post(SERVER_API + '/submit_answers', params).pipe(
      catchError(DBHelper.handleError('GET submit_answers', Error('Server Error'))),
      map((res: any) => {
        return TestResult.fromJson(res);
      })
    );
  }

  submitTestHtml(submission: SubmissionHtml) {
    return this.http
      .post(SERVER_API + `/students/mock_tests/${submission.testId}/submit_answers/non_adaptive`, submission.toJson())
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
        .get<LearningGoal[]>(SERVER_API + '/students/learning_goal/list', { params: params })
        // .get<LearningGoal[]>(SERVER_API + '/lesson/list', { params: params })
        .pipe(
          // catchError(DBHelper.handleError('GET getLearningGoals', [])),
          map((collections: any) => {
            if (collections.length == 0) return [];
            return collections.map((dataObject: any) => LearningGoal.fromJson(dataObject));
          })
        )
    );
  }

  getTopicsOfLearningGoal(learningGoalId: string) {
    const params = new HttpParams().set('learning_goal_id', learningGoalId);
    return this.http.get<Topic[]>(SERVER_API + '/students/learning_goal/details', { params: params }).pipe(
      catchError(DBHelper.handleError('GET getLearningGoals', [])),
      map((collections: any) => {
        if (collections.length == 0) return [];
        return collections.map((dataObject: any) => Topic.fromJson(dataObject));
      })
    );
  }

  submitTopics(learningGoalId: string, topicIds: string[]) {
    const params = {
      master_id: parseInt(learningGoalId),
      topic_list: topicIds.map(str => parseInt(str)),
    };

    return this.http.post(SERVER_API + '/students/learning_goal/submit', params).pipe(
      catchError(DBHelper.handleError('GET submitTopics', Error('Server Error'))),
      map((res: any) => {
        return res['test_id'];
      })
    );
  }

  getMockTest(learningGoalId: string) {
    const params = new HttpParams().set('learning_goal_id', learningGoalId);
    return (
      this.http
        .get(SERVER_API + '/test/learning_goal_test', { params: params })
        // .get(SERVER_API + '/students/learning_goal/list', { params: params })
        .pipe(
          catchError(DBHelper.handleError('GET diagnostic_test', [])),
          map((dataObject: any) => {
            return TestContent.fromJson(dataObject);
          })
        )
    );
  }

  getMockTestHtml(testId: string) {
    return this.http.get(SERVER_API + `/students/mock_tests/${testId}/questions`).pipe(
      // catchError(DBHelper.handleError('GET diagnostic_test', [])),
      map((dataObject: any) => {
        // dataObject = mockTestJson;

        return TestContentHtml.fromJson(dataObject);
      })
    );
  }

  getShareMockTestInfoFromRef(ref: string) {
    return this.http.get(`${SERVER_API}/students/reference/mocktest/${ref}`).pipe(
      map(({ given_name, total_score, learning_goal }: any) => {
        return {
          fromUsername: given_name,
          score: total_score,
          learningGoal: LearningGoal.fromJson(learning_goal),
        };
      })
    );
  }

  getMockTestResult(mockTestId: string, learningGoalId: string) {
    return this.http
      .get(SERVER_API + `/students/learning_goal/${learningGoalId}/mock_tests?mock_test_id=${mockTestId}`)
      .pipe(
        catchError(DBHelper.handleError('GET subjects_list', [])),
        map((res: any) => {
          return TestResult.fromJson(res.data);
        })
      );
  }

  getMockTestReviewHtml(mockTestId: string, learningGoalId: string) {
    return this.http.get(SERVER_API + `/students/mock_tests/${mockTestId}/review`).pipe(
      catchError(DBHelper.handleError('GET mock_tests/review', [])),
      map((res: any) => {
        // res = mockTestReviewJson;
        return TestReviewHtml.fromJson(res);
      })
    );
  }

  getMockTestResultHtml(mockTestId: string, learningGoalId?: string) {
    return this.http.get(SERVER_API + `/students/mock_tests/${mockTestId}`).pipe(
      catchError(DBHelper.handleError('GET mock_tests', [])),
      map((res: any) => {
        // res = {
        //   data: {
        //     id: 1,
        //     created_date: '2023-01-01 15:50:45',
        //     status: 'learning_path_activated',
        //     score: 7,
        //     share_referral: 'asd',
        //   },
        // };
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
    return this.http.get(SERVER_API + `/students/probability_index`, { params: queryParams }).pipe(
      catchError(DBHelper.handleError('GET subjects_list', [])),
      map((res: any) => {
        if (res.data == null) return undefined;
        return res.data.toFixed(2) as number;
      })
    );
  }
}
