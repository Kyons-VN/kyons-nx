import { HttpBackend, HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export const SERVER_API = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class AccountStandaloneService {
  http: HttpClient;
  constructor() {
    console.log('Create');
    const backend = inject(HttpBackend);
    this.http = new HttpClient(backend);
  }

  requestResetPassword(username: string) {
    return this.http.post(
      SERVER_API + '/student/forgot_password',
      { 'username': username },
    );
  }

  newPassword(username: string, newPassword: string, code: string) {
    return this.http.put(
      SERVER_API + '/student/update_password',
      { 'username': username, 'password': newPassword, 'validation_code': code },
    );
  }
}