import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient, private userService: UserService) {}

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

  getTest(lessonId: string): Observable<TestContent> {
    const params = new HttpParams().set('lesson_id', lessonId);
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

  getExercise(lessonId: string): Observable<TestContent> {
    const params = new HttpParams().set('lesson_id', lessonId);
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
}
