import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

export const SERVER_API = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class AccountStandaloneService {
  constructor(
    private http: HttpClient,
    backend: HttpBackend,
  ) {
    this.http = new HttpClient(backend);
  }

  // signUp({ email, firstName, lastName, password }: { email: string, firstName: string, lastName: string, password: string }) {
  signUp(email: string, firstName: string, lastName: string, password: string, ref?: any) {
    const params: any = { 'email': email, 'family_name': lastName, 'given_name': firstName, 'password': password };
    if (ref) {
      params['referral'] = {
        'mocktest_referral': ref
      };
    }
    return this.http.post(
      SERVER_API + '/auth/sign_up',
      params,
    );
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