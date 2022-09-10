interface IAuth {
  signIn: (credential: IAuthCredential) => void;
  signOut: Function;
}

interface IAuthCredential {
  email: string;
  password: string;
  toJson: () => { [key: string]: any };
}

export { IAuth, IAuthCredential }
