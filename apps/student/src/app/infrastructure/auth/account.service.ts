import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import IAccountStandaloneService from "@domain/knowledge/i-accout-service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export const SERVER_API = environment.serverApi;

@Injectable({
  providedIn: 'root',
})
export class AccountStandaloneService implements IAccountStandaloneService {
  constructor(
    private http: HttpClient,
    backend: HttpBackend,
  ) {
    this.http = new HttpClient(backend);
  }

  // signUp({ email, firstName, lastName, password }: { email: string, firstName: string, lastName: string, password: string }) {
  signUp(email: string, firstName: string, lastName: string, password: string): Observable<any> {
    return this.http.post(
      SERVER_API + '/auth/sign_up',
      { 'email': email, 'family_name': lastName, 'given_name': firstName, 'password': password },
    );

  }

  requestResetPassword(email: string): Observable<any> {
    return this.http.post(
      SERVER_API + '/forgot_password',
      { 'email': email },
    );
  }

  newPassword(email: string, newPassword: string, code: string): Observable<any> {
    return this.http.put(
      SERVER_API + '/forgot_password',
      { 'email': email, 'password': newPassword, 'code': code },
    );
  }
}