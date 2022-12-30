interface IAuthService {
  signIn: (credential: IAuthCredential) => void;
  signOut: () => void;
}

interface IAuthCredential {
  email: string;
  password: string;
  toJson: () => { [key: string]: string };
}

export { IAuthService, IAuthCredential };

