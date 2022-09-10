import { RequestStatus } from "../../infrastructure/models/student";
import { IStudent } from "./student";

export interface IStudentRequest {
  id: string;
  student: IStudent;
  status: RequestStatus;
  url: string;
  learningPointName: string;
}
