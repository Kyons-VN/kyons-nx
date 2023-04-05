import { IAuthCredential } from '@domain/auth/i-auth-service';

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
