import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { SERVER_API } from './auth/intercepter';
import { DBHelper } from './helper/helper';
import { Student, StudentRequest, StudentTest } from './models/student';
import { TestContent } from './models/test-content';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient, private userService: UserService) { }

  getRequests() {
    const tutorId = this.userService.getUserId();
    const params = new HttpParams().set('tutor_id', tutorId);
    const observable = this.http.get<StudentRequest[]>(SERVER_API + '/tutor/student_requests', { params: params }).pipe(
      catchError(DBHelper.handleError('GET student_requests', Error('error'))),
      map((dataObject: any) => dataObject.map((data: any) => StudentRequest.fromJson(data)))
    );
    return observable;
  }

  startSession(requestId: string) {
    const tutorId = this.userService.getUserId();
    const params = {
      'room_id': parseInt(requestId),
      'tutor_id': tutorId
    }
    return this.http.post(SERVER_API + '/tutor/start_session', params).pipe(
      catchError(DBHelper.handleError('POST start_session')),
    );
  }

  endSession(roomId: string, studentId: string) {
    const params = {
      'student_id': studentId,
      'room_id': roomId
    }
    return this.http.post(SERVER_API + '/tutor/end_session', params).pipe(
      catchError(DBHelper.handleError('POST end_session')),
      map((data) => {
        console.log(data);
        return data;
      }),
    );
  }

  getLatestTests(): Observable<StudentTest[]> {
    return this.http.get(SERVER_API + '/tutor/latest_test').pipe(
      catchError(DBHelper.handleError('GET lastest_test', Error('error'))),
      map((data: any) => {
        return data.map((dataObject: any) => StudentTest.fromJson(dataObject));
      }),
    );
  }

  getLPDs(testId: string): Observable<Array<any>> {
    const params = new HttpParams().set('test_id', testId);
    return this.http.get<Array<any>>(SERVER_API + '/tutor/learning_point_difficulty_list', { params: params }).pipe(
      catchError(DBHelper.handleError('GET learning_point_difficulty_list', [])),
    );
  }

  updateLearningPath(lPDList: number[], testId: string) {
    return this.http.post(SERVER_API + '/tutor/update_learning_path', {
      test_id: testId,
      learning_point_difficulty_ids: lPDList
    }).pipe(
      catchError(DBHelper.handleError('POST end_session', {})),
      map((data) => {
        console.log(data);
        return data;
      }),
    );
  }

  getStudentInfo(studentId: string): Observable<Student> {
    const params = new HttpParams().set('id', studentId);
    return this.http.get(SERVER_API + '/auth/get_user', { params: params }).pipe(
      catchError(DBHelper.handleError('GET get_user', {})),
      map((dataObject) => {
        console.log(dataObject);
        return Student.fromJson(dataObject);
      }),
    );
  }

  getTest(testId: string): Observable<any> {
    const params = new HttpParams().set('test_id', testId);
    return this.http.get(SERVER_API + '/tutor/review_test', { params: params }).pipe(
      catchError(DBHelper.handleError('GET review_test', {})),
      map((dataObject) => {
        return TestContent.fromJson(dataObject);
      }),
    );
  }

}
