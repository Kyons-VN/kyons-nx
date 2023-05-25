interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export class User implements IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  constructor({ id, email, firstName, lastName, phone }: IUser) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }

  public static fromJson(json: any): User {
    return new User({
      id: json['id'],
      email: json['email'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      phone: json['mobile_number'].replace('+84', '0'),
    });
  }
}
