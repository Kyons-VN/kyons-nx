import { pick } from "lodash";
import { IAnswer, IQuestion, ITestContent } from "../../domain/knowledge/i-test";

class TestContent implements ITestContent {
  id: string;
  content: Question[];
  private _selectedAnswers: string[] = [];
  public get selectedAnswers(): string[] {
    return this._selectedAnswers;
  }
  public set selectedAnswers(value: string[]) {
    this._selectedAnswers = value;
  }
  private _rightAnswers: string[] = [];
  public get rightAnswers(): string[] {
    return this._rightAnswers;
  }
  public set rightAnswers(value: string[]) {
    this._rightAnswers = value;
  }
  constructor({ id, content, selectedAnswers, rightAnswers }: { id: string, content: Question[], selectedAnswers: string[], rightAnswers: string[] }) {
    this.id = id;
    this.selectedAnswers = selectedAnswers;
    this.rightAnswers = rightAnswers;
    this.content = content;
  }
  static fromJson(dataObject: any): TestContent {
    const _ = pick(dataObject, ['id', 'content', 'test_id', 'data', 'selected_answer', 'right_answer', 'selectedAnswers', 'rightAnswers']);
    _.id = _.test_id;
    _.content = [];
    _.selectedAnswers = _.selected_answer.map((a: number) => a.toString());
    _.rightAnswers = _.right_answer.map((a: number) => a.toString());
    _.content = _.data.map((questionObject: any) => Question.fromJson(questionObject));
    return new TestContent(_);
  }
  static empty(): TestContent {
    return new TestContent({ id: '', content: [], selectedAnswers: [], rightAnswers: [] });
  }
}

class Question implements IQuestion {
  id: string;
  content: string;
  answers: Answer[];

  constructor({ id, content, answers }: { id: string, content: string, answers: Answer[] }) {
    this.id = id;
    this.content = content;
    this.answers = answers;
  }

  static fromJson(dataObject: any): Question {
    const _ = pick(dataObject, ['id', 'content', 'answers', 'answer_keys']);
    _.answers = [];
    _.answers = _.answer_keys.map((answerObject: any) => Answer.fromJson(answerObject));
    return new Question(_);
  }
}

class Answer implements IAnswer {
  id: string;
  order: number;
  value: string;
  content: string;
  constructor({ id, order, value, content }: { id: string, order: number, value: string, content: string }) {
    this.id = id;
    this.order = order;
    this.value = value;
    this.content = content;
  }

  static fromJson(dataObject: any): Answer {
    const _ = pick(dataObject, ['id', 'order', 'value', 'content']);
    _.id = (_.id as number).toString();
    _.value = (_.value as number).toString();
    return new Answer(_);
  }
}


const answerPrefixes = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. '];
export { TestContent, answerPrefixes, Question };

