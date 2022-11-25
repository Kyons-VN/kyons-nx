import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LearningGoal from '@infrastructure/knowledge/learning-goal';
import { Topic } from '@infrastructure/knowledge/topic';
import { catchError, map, Observable } from 'rxjs';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';
import { Program } from '../knowledge/program';
import { UserService } from '../user/user.service';
import { Submission } from './submission';
import { TestContent, TestResult } from './test-content';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getDiagnosticTest(selectedProgram: Program) {
    const params = new HttpParams().set('program_id', selectedProgram.id);
    return this.http
      .get(SERVER_API + '/test/diagnostic_test', { params: params })
      .pipe(
        catchError(DBHelper.handleError('GET diagnostic_test', [])),
        map((dataObject: any) => {
          return TestContent.fromJson(dataObject);
        })
      );
  }

  getTest(lessonId: string, learningGoalId: string): Observable<TestContent> {
    const params = new HttpParams().set('lesson_id', lessonId)
      .set('learning_goal_id', learningGoalId);
    return this.http
      .get(SERVER_API + '/test/get_lesson_test', { params: params })
      .pipe(
        catchError(DBHelper.handleError('GET get_lesson_test', [])),
        map((dataObject: any) => {
          return TestContent.fromJson(dataObject);
        })
      );
  }

  getTestResult(lessonId: string): Observable<TestResult> {
    const params = new HttpParams().set('lesson_id', lessonId);
    return this.http.get(SERVER_API + '/test/result', { params: params }).pipe(
      catchError(DBHelper.handleError('GET get_test_result', [])),
      map((dataObject: any) => {
        return TestResult.fromJson(dataObject);
      })
    );
  }

  skipTest(): Observable<boolean> {
    return this.http.get(SERVER_API + '/test/skip_diagnostic_test').pipe(
      catchError(
        DBHelper.handleError('GET skip_diagnostic_test', Error('Server Error'))
      ),
      map((value) => {
        return true;
      })
    );
  }

  getExercise(lessonId: string, learningGoalId: string): Observable<TestContent> {
    // TODO: remove learning_goal_id
    const params = new HttpParams().set('lesson_id', lessonId)
      .set('learning_goal_id', learningGoalId);
    return this.http
      .get(SERVER_API + '/test/get_lesson_exercise', { params: params })
      .pipe(
        catchError(DBHelper.handleError('GET get_lesson_exercise', [])),
        map((dataObject: any) => {
          return TestContent.fromJson(dataObject);
        })
      );
  }

  submitTest(submission: Submission) {
    let params = {
      test_id: submission.testId,
    };
    params = Object.assign(params, submission.toJson());

    return this.http.post(SERVER_API + '/submit_answers', params).pipe(
      catchError(
        DBHelper.handleError('GET submit_answers', Error('Server Error'))
      ),
      map((res: any) => {
        return TestResult.fromJson(res);
      })
    );
  }

  getLearningGoal(selectedProgram: Program): Observable<LearningGoal[]> {
    const params = new HttpParams().set('program_id', selectedProgram.id);
    return this.http
      .get<LearningGoal[]>(SERVER_API + '/students/learning_goal/list', { params: params })
      // .get<LearningGoal[]>(SERVER_API + '/lesson/list', { params: params })
      .pipe(
        catchError(DBHelper.handleError('GET getLearningGoals', [])),
        map((collections: any) => {
          if (collections.length == 0) return [];
          return collections.map((dataObject: any) => LearningGoal.fromJson(dataObject));
        })
      );
  }

  getTopicsOfLearningGoal(learningGoalId: string) {
    const params = new HttpParams().set('learning_goal_id', learningGoalId);
    return this.http
      .get<Topic[]>(SERVER_API + '/students/learning_goal/details', { params: params })
      .pipe(
        catchError(DBHelper.handleError('GET getLearningGoals', [])),
        map((collections: any) => {
          if (collections.length == 0) return [];
          return collections.map((dataObject: any) => Topic.fromJson(dataObject));
        })
      );
  }

  submitTopics(learningGoalId: string, topicIds: string[]) {
    const params = {
      'master_id': parseInt(learningGoalId),
      'topic_list': topicIds.map((str) => parseInt(str)),
    };

    return this.http.post(SERVER_API + '/students/learning_goal/submit', params).pipe(
      catchError(
        DBHelper.handleError('GET submitTopics', Error('Server Error'))
      ),
      map((res: any) => {
        return LearningGoal.fromJson({ id: res['learning_goal_id'], name: res['learning_goal_name'] ?? '' });
      })
    );
  }

  getMockTest(learningGoalId: string) {
    const params = new HttpParams().set('learning_goal_id', learningGoalId);
    return this.http
      .get(SERVER_API + '/test/learning_goal_test', { params: params })
      // .get(SERVER_API + '/students/learning_goal/list', { params: params })
      .pipe(
        catchError(DBHelper.handleError('GET diagnostic_test', [])),
        map((dataObject: any) => {
          return TestContent.fromJson(dataObject);
        })
      );
  }
}
