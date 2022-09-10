import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { SERVER_API } from './auth/intercepter';
import { DBHelper } from './helper/helper';

const CURRENT_USER = 'current' + environment.name + 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  async updateCurrentUser(uuid: string, email: string) {
    const params = new HttpParams().set('id', uuid);
    const promise = new Promise((resolve, reject) => {
      firstValueFrom(this.http.get(SERVER_API + '/auth/get_user', {
        params: params
      }).pipe(
        catchError(DBHelper.handleError('GET get_user', null)),
      )).then(
        (res: any) => {
          // Success
          res['uuid'] = uuid;
          window.localStorage.setItem(CURRENT_USER, JSON.stringify(res));
          resolve(true);
        },
        msg => { // Error
          reject(msg);
        }
      );
    });
    return promise;
  }

  getUsername() {
    const currentUser = JSON.parse(window.localStorage.getItem(CURRENT_USER) ?? '{}');
    return currentUser.first_name;
  }

  getUserId() {
    const currentUser = JSON.parse(window.localStorage.getItem(CURRENT_USER) ?? '{}');
    return currentUser.uuid;
  }

  getGoogleMeet() {
    const currentUser = JSON.parse(window.localStorage.getItem(CURRENT_USER) ?? '{}');
    return currentUser.meeting_url;
  }

  setGoogleMeet(link: string) {
    const currentUser = JSON.parse(window.localStorage.getItem(CURRENT_USER) ?? '{}');
    currentUser.meeting_url = link;
    window.localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
  }

  updateGoogleMeet(link: string) {
    const params = {
      'meeting_url': link
    }
    return this.http.post(SERVER_API + '/tutor/update_google_meet', params).pipe(
      catchError(DBHelper.handleError('POST update_google_meet', null)),
      map((data: any) => {
        if ('success' in data && data.success) {
          this.setGoogleMeet(link);
        }
        else {
          data.error = true;
          data.message = data;
        }
        return data;
      })
    );
  }
}
