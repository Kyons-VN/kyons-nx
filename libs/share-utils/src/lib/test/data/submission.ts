import { formatDate } from '@angular/common';
import { ISubmission } from '../../knowledge/domain/i-submission';
import { Answer } from './test-content';

export class Submission implements ISubmission {
  start: Date = new Date();
  private _submitData: { [questionId: string]: Answer } = {};

  private _end: Date = new Date();
  private _testId = '';
  public get testId(): string {
    return this._testId;
  }
  public set testId(value: string) {
    this._testId = value;
  }
  public get end(): Date {
    return this._end;
  }
  public set end(value: Date) {
    this._end = value;
  }
  public get submitData(): { [questionId: string]: Answer } {
    return this._submitData;
  }
  public set submitData(value: { [questionId: string]: Answer }) {
    this._submitData = value;
  }
  public hasAnswer(questionId: string): boolean {
    return this.submitData[questionId] !== undefined;
  }
  reset() {
    this._submitData = {};
  }

  public toJson(): any {
    const result: any = {};
    const submission = {
      questions: Object.keys(this.submitData).map(questionId => {
        return {
          id: Number(questionId),
          answer: {
            id: this.submitData[questionId].id,
            value: this.submitData[questionId].value,
          },
        };
      }),
    };
    result.start_time = formatDate(this.start, 'yyyy-MM-dd H:m:s', 'en_US');
    result.end_time = formatDate(this.end, 'yyyy-MM-dd H:m:s', 'en_US');
    result.submission = submission;
    return result;
  }
}
export class SubmissionHtml {
  start: Date = new Date();
  private _submitData: { [questionId: string]: string } = {};
  // private _submitData: string[][] = [];

  private _end: Date = new Date();
  private _testId = '';
  public get testId(): string {
    return this._testId;
  }
  public set testId(value: string) {
    this._testId = value;
  }
  public get end(): Date {
    return this._end;
  }
  public set end(value: Date) {
    this._end = value;
  }
  public get submitData(): { [questionId: string]: string } {
    return this._submitData;
  }
  public set submitData(value: { [questionId: string]: string }) {
    this._submitData = { ...this._submitData, ...value };
  }
  public hasAnswer(questionId: string): boolean {
    return this.submitData[questionId] !== undefined;
  }
  reset() {
    this._submitData = {};
  }

  public toJson(): any {
    const result: any = {};
    //   {
    //     "id": 100,
    //     "user_response": "[[0]]",
    //     "user_response_ui": [["0"]],
    //     "time_taken": 100
    // },
    const submission = Object.keys(this.submitData).map(questionId => {
      return {
        id: Number(questionId),
        question: Number(questionId),
        user_response: `[[${this.submitData[questionId]}]]` as string,
        user_response_ui: [[this.submitData[questionId]]] as string[][],
        time_taken: Math.floor((this.end.getTime() - this.start.getTime()) / 1000),
      };
    });
    result.id = Number(this.testId);
    result.start_time = formatDate(this.start, 'yyyy-MM-dd H:m:s', 'en_US');
    result.end_time = formatDate(this.end, 'yyyy-MM-dd H:m:s', 'en_US');
    result.data = submission;
    return result;
  }
}
