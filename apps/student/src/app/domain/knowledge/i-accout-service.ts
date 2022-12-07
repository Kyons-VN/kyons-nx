
export default interface IAccountStandaloneService {
  signUp(email: string, firstName: string, lastName: string, password: string): void
  requestResetPassword(email: string): void;
  newPassword(email: string, newPassword: string, code: string): void;
}