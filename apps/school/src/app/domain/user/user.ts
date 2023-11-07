import { ISchool, IUser } from './i_user';

class School implements ISchool {
  name: string;
  classes: string[];
  constructor({ name: name, classes: classes }: { name: string; classes: string[] }) {
    this.name = name;
    this.classes = classes;
  }
  public static fromJson(json: any): School {
    return new School({ name: json['name'], classes: json['class'] });
  }

  toJson() {
    return {
      name: this.name,
      class: this.classes,
    };
  }
}

class User implements IUser {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  school: School;
  constructor({
    email: email,
    first_name: first_name,
    last_name: last_name,
    username: username,
    school: school,
  }: {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    school: School;
  }) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.school = school;
  }

  public static empty() {
    return new User({
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      school: School.fromJson({ name: '', class: [] }),
    });
  }

  public static fromJson(json: any): User {
    return new User({
      email: json['email'],
      first_name: json['first_name'],
      last_name: json['last_name'],
      username: json['username'],
      school: School.fromJson(json['school']),
    });
  }

  toJson() {
    return {
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      school: this.school.toJson(),
    };
  }
}

export { School, User };
