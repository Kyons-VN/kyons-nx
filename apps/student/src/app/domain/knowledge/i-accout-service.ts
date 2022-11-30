import { Observable } from "rxjs";

export default interface IAccountStandaloneService {
  signUp(email: string, firstName: string, lastName: string, password: string): Observable<any>;
  requestResetPassword(email: string): Observable<any>;
  newPassword(email: string, newPassword: string, code: string): Observable<any>;
}