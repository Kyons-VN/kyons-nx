interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  school: ISchool;
}

interface ISchool {
  name: string;
  classes: string[];
}

export { IUser, ISchool };

