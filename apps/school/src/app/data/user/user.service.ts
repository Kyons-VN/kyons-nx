import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SERVER_API } from '../auth/interceptor';
import { DBHelper } from '../helper/helper';

export const CURRENT_USER = 'current' + environment.name + 'User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // http = inject(HttpClient);

  async updateCurrentUser(uuid: string, email: string) {
    const params = new HttpParams().set('id', uuid);
    const promise = new Promise((resolve, reject) => {
      firstValueFrom(
        inject(HttpClient)
          .get(SERVER_API + '/auth/get_user', {
            params: params,
          })
          .pipe(catchError(DBHelper.handleError('GET get_user', null)))
      ).then(
        (res: any) => {
          // Success
          res['uuid'] = uuid;
          window.localStorage.setItem(CURRENT_USER, JSON.stringify(res));
          resolve(true);
        },
        (msg) => {
          // Error
          reject(msg);
        }
      );
    });
    return promise;
  }

  getUsername() {
    const currentUser = JSON.parse(
      window.localStorage.getItem(CURRENT_USER) ?? '{}'
    );
    return currentUser.first_name;
  }
  getUserType() {
    const currentUser = JSON.parse(
      window.localStorage.getItem(CURRENT_USER) ?? '{}'
    );
    return currentUser.study_type;
  }

  getUserId() {
    const currentUser = JSON.parse(
      window.localStorage.getItem(CURRENT_USER) ?? '{}'
    );
    return currentUser.uuid;
  }

  removeCurrentUser() {
    window.localStorage.removeItem(CURRENT_USER);
  }
}
