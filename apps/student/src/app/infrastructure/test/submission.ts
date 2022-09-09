import { formatDate } from '@angular/common';
import { ISubmission } from '../../domain/knowledge/i-submission';

export class Submission implements ISubmission {
  private _testId = '';
  public get testId(): string {
    return this._testId;
  }
  public set testId(value: string) {
    this._testId = value;
  }
  start: Date = new Date();

  private _end: Date = new Date();
  public get end(): Date {
    return this._end;
  }
  public set end(value: Date) {
    this._end = value;
  }

  private _submitData: { [questionId: string]: string } = {};
  public get submitData(): { [questionId: string]: string } {
    return this._submitData;
  }
  public set submitData(value: { [questionId: string]: string }) {
    this._submitData = value;
  }

  public toJson(): any {
    const result: any = {};
    const submission = Object.keys(this.submitData).map((questionId) => {
      return {
        question_id: Number(questionId),
        answer_key_id: Number(this.submitData[questionId]),
      };
    });
    result.start_time = formatDate(this.start, 'YY-mm-yy hh:mm:ss', 'en_US');
    result.end_time = formatDate(this.end, 'YY-mm-yy hh:mm:ss', 'en_US');
    result.submission = submission;
    return result;
  }
}
