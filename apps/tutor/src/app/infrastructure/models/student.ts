import { pick } from "lodash";
import { IStudent } from "../../domain/student/student";
import { IStudentRequest } from "../../domain/student/student-request";
import { IStudentTest } from "../../domain/student/student-test";

class Student implements IStudent {
  id: string;
  firstName: string;
  lastName: string;
  link: string;
  constructor({ id, first_name, last_name, link }: { id: string, first_name: string, last_name: string, link: string }) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.link = link ?? '';
  }

  static fromJson(dataObject: any): Student {
    const _ = pick(dataObject, ['id', 'first_name', 'last_name', 'link']);
    return new Student(_);
  }

  getFullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }
}

class StudentRequest implements IStudentRequest {
  id: string;
  student: IStudent;
  status: RequestStatus = RequestStatus.NEW;
  url: string;
  learningPointName: string;
  constructor({ id, student, status, url, learningPointName }: { id: string, student: Student, status: RequestStatus, url: string, learningPointName: string }) {
    this.id = id.toString();
    this.student = student;
    this.status = status ?? RequestStatus.NEW;
    this.url = url ??= '';
    this.learningPointName = learningPointName ??= '';
  }

  static fromJson(dataObject: any): StudentRequest {
    const _ = pick(dataObject, ['id', 'student', 'status', 'url', 'google_meet', 'learningPointName', 'learning_point_name']);
    const _student = pick(_.student, ['id', 'first_name', 'last_name', 'messenger_url', 'link']);
    _student.link = _student.messenger_url;
    _.status = pickStatus(_.status);
    _.url = _.google_meet;
    _.student = Student.fromJson(pick(_student, ['id', 'first_name', 'last_name', 'link']));
    _.learningPointName = _.learning_point_name;
    return new StudentRequest(_);
  }
}

enum RequestStatus {
  NEW,
  PROCESSING,
  STOP,
  END,
}

function pickStatus(statusStr: string): RequestStatus {
  return RequestStatus[statusStr as keyof typeof RequestStatus];
}

class StudentTest implements IStudentTest {
  id: string;
  score: number;
  student: IStudent;
  constructor({ id, student, score }: { id: string, student: Student, score: number }) {
    this.id = id.toString();
    this.student = student;
    this.score = score
  }

  static fromJson(dataObject: any): StudentTest {
    const _ = pick(dataObject, ['id', 'student', 'score']);
    const _student = pick(_.student, ['id', 'first_name', 'last_name']);
    _.student = Student.fromJson(pick(_student, ['id', 'first_name', 'last_name', 'link']));
    return new StudentTest(_);
  }
}

export { Student, StudentRequest, RequestStatus, pickStatus, StudentTest };

