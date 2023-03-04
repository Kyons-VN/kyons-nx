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

  requestResetPassword(email: string) {
    return this.http.post(
      SERVER_API + '/forgot_password',
      { 'email': email },
    );
  }

  newPassword(email: string, newPassword: string, code: string) {
    return this.http.put(
      SERVER_API + '/forgot_password',
      { 'email': email, 'password': newPassword, 'code': code },
    );
  }
}