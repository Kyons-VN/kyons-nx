import { IAuthCredential } from '../../../app/domain/auth/auth';

export class AuthCredential implements IAuthCredential {
  email: string;
  password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }

  toJson() {
    return {
      username: this.email,
      password: this.password,
    };
  }
}
