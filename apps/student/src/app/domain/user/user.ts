interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  school?: string;
  grade?: string;
  city?: string;
  birthdate?: Date;
}

export class User implements IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  school?: string | undefined;
  grade?: string | undefined;
  city?: string | undefined;
  birthdate?: Date | undefined;
  constructor({ id, email, firstName, lastName, phone, school, grade, city, birthdate }: IUser) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.school = school;
    this.grade = grade;
    this.city = city;
    this.birthdate = birthdate;
  }

  public static fromJson(json: any): User {
    return new User({
      id: json['id'],
      email: json['email'],
      firstName: json['first_name'],
      lastName: json['last_name'],
      phone: json['mobile_number'].replace('+84', '0'),
      school: json['school'],
      grade: json['grade'],
      city: json['city'],
      birthdate: new Date(json['birthdate']),
    });
  }

  displayBirthdate(): string {
    // Format dd/mm/YYYY
    const date = new Date(this.birthdate ?? '');
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
