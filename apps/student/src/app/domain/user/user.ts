interface IUser {
  id: string;
  email: string;
  name: string;
}

export class User implements IUser {
  id: string;
  email: string;
  name: string;
  constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  fromJson(json: any): User {
    return new User(json['id'], json['email'], json['name']);
  }
}
