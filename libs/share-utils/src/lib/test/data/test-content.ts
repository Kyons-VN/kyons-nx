// import { IMockTestItem, MockTestStatus } from '@domain/knowledge/i-mock-test';
// // import { environment } from '@environments/environment';
import { pick } from 'lodash-es';
import { MockTestStatus } from '../domain/i_test_content';
// import {
//   IAnswer,
//   IAnswerResult,
//   IAnswerReview,
//   IQuestionHtml,
//   ITestContent,
//   ITestResultHtml,
//   TestType
// } from '../../domain/knowledge/i-test';
// import { Category } from '../knowledge/category';
// import { Topic } from '../knowledge/topic';

export enum MockTestHtmlStatus {
  new,
  pending,
  error,
}

export class TestContentHtml {
  id: string;
  questions: QuestionHtml[];
  done: boolean;
  status: MockTestHtmlStatus;
  constructor({
    id,
    content,
    done,
    status,
  }: {
    id: string;
    content: QuestionHtml[];
    done: boolean;
    status: MockTestHtmlStatus;
  }) {
    this.id = id;
    this.questions = content;
    this.done = done;
    this.status = status;
  }
  static fromJson(dataObject: any): TestContentHtml {
    const _ = pick(dataObject, ['id', 'content', 'done', 'status']);
    _.id = dataObject['test_id'] ?? '';
    _.content = [];
    _.content =
      dataObject['data'] !== undefined
        ? (dataObject['data'] as any[])
            .map((questionObject: any) => QuestionHtml.fromJson(questionObject))
            .sort((a, b) => a.id.localeCompare(b.id))
        : [];
    _.status = MockTestHtmlStatus[dataObject['status'] as keyof typeof MockTestHtmlStatus];

    return new TestContentHtml(_);
  }

  static empty(): TestContentHtml {
    return new TestContentHtml({ id: '', content: [], done: false, status: MockTestHtmlStatus.new });
  }
}

export class ExerciseHtml {
  progress?: number;
  questions: QuestionHtml[];
  constructor({ questions }: { questions: QuestionHtml[] }) {
    this.questions = questions;
  }
  static fromJson(dataObject: any): ExerciseHtml {
    const _ = pick(dataObject, ['questions']);
    _.questions = (dataObject['questions'] as any[]).map((questionObject: any) =>
      QuestionHtml.fromJson(questionObject)
    );
    return new ExerciseHtml(_);
  }

  static empty() {
    return new ExerciseHtml({ questions: [] });
  }
}

export class QuestionHtml {
  id: string;
  content: string;
  answers = ['0', '1', '2', '3'];
  html: string;
  form?: HTMLFormElement;
  hint?: string;

  constructor({ id, content, html, hint }: { id: string; content: string; html: string; hint?: string }) {
    this.id = id;
    this.content = content;
    this.html = html;
    this.hint = hint;
  }

  static fromJson(dataObject: any): QuestionHtml {
    const _ = pick(dataObject, ['id', 'content', 'html', 'hint']);
    _.id = (_.id as number).toString();
    _.content = dataObject['question'] ?? '';
    _.html = dataObject['answers'] ?? '';
    _.hint = dataObject['hint'];
    return new QuestionHtml(_);
  }

  static empty() {
    return new QuestionHtml({ id: '', content: '', html: '' });
  }
}

// class AnswerResult {
//   categories: { [key: string]: number };
//   topics: { [key: string]: number };
//   score: number;
//   maxScore: { [key: string]: number };
//   topicWrongQuestionHtmls: { [key: string]: Array<string> };
//   constructor({
//     categories,
//     topics,
//     score,
//     maxScore,
//     topicWrongQuestionHtmls,
//   }: {
//     categories: { [key: string]: number };
//     topics: { [key: string]: number };
//     score: number;
//     maxScore: { [key: string]: number };
//     topicWrongQuestionHtmls: { [key: string]: Array<string> };
//   }) {
//     this.categories = categories;
//     this.topics = topics;
//     this.score = score;
//     this.maxScore = maxScore;
//     this.topicWrongQuestionHtmls = topicWrongQuestionHtmls;
//   }
// }

// class AnswerReview implements IAnswerReview {
//   selectedAnswers: string[];
//   rightAnswers: string[];
//   constructor({
//     selectedAnswers,
//     rightAnswers,
//   }: {
//     selectedAnswers: string[];
//     rightAnswers: string[];
//   }) {
//     this.selectedAnswers = selectedAnswers;
//     this.rightAnswers = rightAnswers;
//   }
// }

// export enum MockTestStatus {
//   new,
//   mock_test_submitted,
//   learning_path_activated,
// }

export class MockTestResult {
  id: string;
  score: number;
  status: MockTestStatus;
  shareReferral?: string;

  constructor({ id, score, status }: { id: string; score: number; status: MockTestStatus }) {
    this.id = id;
    this.score = score;
    this.status = status;
  }

  static fromJson(dataObject: any): MockTestResult {
    const _ = pick(dataObject, ['id', 'score', 'status']);
    _.id = dataObject['id'].toString();
    _.score = dataObject['score'] ?? 0;
    _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];
    const shareReferral = dataObject['mocktest_referral'] ?? '';
    const result = new MockTestResult(_);
    if (shareReferral !== '') {
      result.shareReferral = shareReferral;
    }
    return result;
  }
}

// class MockTestItem implements IMockTestItem {
//   id: string;
//   createdDate: Date;
//   status: MockTestStatus;
//   score?: number;
//   index?: number;
//   constructor({
//     id,
//     createdDate,
//     status,
//     score,
//     index
//   }: {
//     id: string;
//     createdDate: Date;
//     status: MockTestStatus;
//     score?: number;
//     index?: number;
//   }) {
//     this.id = id;
//     this.createdDate = createdDate;
//     this.status = status;
//     this.score = score;
//     this.index = index;
//   }
//   static fromJson(dataObject: any, index?: number): MockTestItem {
//     const _ = pick(dataObject, ['id', 'createdDate', 'status', 'score', 'index']);
//     _.createdDate = new Date(dataObject['created_date']);
//     _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];
//     _.index = index;
//     return new MockTestItem(_);
//   }
// }

// const answerPrefixes = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. '];
// export { TestContent, answerPrefixes, TestResultHtml, AnswerResult, MockTestItem };

export class TestReviewHtml {
  data: Array<QuestionReviewHtml>;
  constructor(data: Array<QuestionReviewHtml>) {
    this.data = data;
  }

  static fromJson(dataObject: any): TestReviewHtml {
    const data =
      (dataObject['data'] as any[])
        .map((questionObject: any) => QuestionReviewHtml.fromJson(questionObject))
        .sort((a, b) => a.id.localeCompare(b.id)) ?? [];
    return new TestReviewHtml(data);
  }
}

export class QuestionReviewHtml {
  id: string;
  content: string;
  html: string;
  explanation: string;
  isCorrectAnswer: boolean;
  constructor({
    id,
    question,
    answers,
    explanation,
    isCorrect,
  }: {
    id: string;
    question: string;
    answers: string;
    explanation: string;
    isCorrect: boolean;
  }) {
    this.id = id;
    this.content = question;
    this.html = answers;
    this.explanation = explanation;
    this.isCorrectAnswer = isCorrect;
  }

  static fromJson(dataObject: any): QuestionReviewHtml {
    const _ = pick(dataObject, ['id', 'question', 'answers', 'explanation', 'isCorrect', 'hint']);
    _.id = dataObject['id'].toString();
    _.question = dataObject['question'] ?? '';
    _.answers = dataObject['answers'] ?? '';
    _.explanation = dataObject['explanation'] ?? '';
    _.isCorrect = dataObject['answer_status'] as boolean;
    return new QuestionReviewHtml(_);
  }

  static empty(): QuestionReviewHtml {
    return new QuestionReviewHtml({
      id: '',
      question: '',
      answers: '',
      explanation: '',
      isCorrect: false,
    });
  }
}
