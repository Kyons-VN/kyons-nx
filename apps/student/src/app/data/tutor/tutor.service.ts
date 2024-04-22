// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError } from 'rxjs';
// import { DBHelper } from '../helper/helper';
// import { UserService } from '../user/user.service';

// @Injectable({ providedIn: 'root' })
// export class TutorService {
//   constructor(private http: HttpClient, private userService: UserService) {}
//   requestTutor(lpdId: string): Observable<string> {
//     const params = {
//       learning_point_difficulty_id: Number(lpdId),
//       // 'student_id': this.userService.getUserId(),
//     };
//     return this.http.post(`${serverApi()}/tutor/request_tutor', params).pipe(
//       catchError(DBHelper.handleError('POST request_tutor', null)),
//       map((res: any) => res['session_id'] ?? '')
//     );
//   }
//   checkSessionStatus(sessionId: string): Observable<any> {
//     const params = new HttpParams().set('session_id', sessionId);
//     return this.http
//       .get(`${serverApi()}/tutor/check_class_status', { params: params })
//       .pipe(catchError(DBHelper.handleError('POST check_class_status', null)));
//   }
// }
