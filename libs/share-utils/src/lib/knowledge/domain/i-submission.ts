import { IAnswer } from '../../domain';

export interface ISubmission {
  start: Date;
  end: Date;
  submitData: { [questionId: string]: IAnswer };
}
