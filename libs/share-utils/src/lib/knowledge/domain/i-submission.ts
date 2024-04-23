
export interface ISubmission {
  start: Date;
  end: Date;
  submitData: { [questionId: string]: string };
}
