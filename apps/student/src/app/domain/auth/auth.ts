interface IAuth {
  signIn: (credential: IAuthCredential) => void;
  signOut: () => void;
}

interface IAuthCredential {
  email: string;
  password: string;
  toJson: () => { [key: string]: any };
}

export { IAuth, IAuthCredential };

