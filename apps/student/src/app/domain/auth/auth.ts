interface IAuth {
  signIn: (credential: IAuthCredential) => void;
  signOut: () => void;
  resetPassword: (email: string) => void;
  newPassword: (email: string, newPassword: string, code: string) => void;
}

interface IAuthCredential {
  email: string;
  password: string;
  toJson: () => { [key: string]: any };
}

export { IAuth, IAuthCredential };

