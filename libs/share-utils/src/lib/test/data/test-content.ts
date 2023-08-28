// import { IMockTestItem, MockTestStatus } from '@domain/knowledge/i-mock-test';
// // import { environment } from '@environments/environment';
import { pick } from 'lodash-es';
import { IAnswer, IAnswerResult, IAnswerReview, IQuestion, ITestContent, ITestResult, TestType } from '../domain';
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

// export enum MockTestStatus {
//   new,
//   pending,
//   error,
// }

export class TestContentHtml {
  id: string;
  questions: QuestionHtml[];
  done: boolean;
  status: MockTestStatus;
  constructor({
    id,
    content,
    done,
    status,
  }: {
    id: string;
    content: QuestionHtml[];
    done: boolean;
    status: MockTestStatus;
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
        ? (dataObject['data'] as any[]).map((questionObject: any) => QuestionHtml.fromJson(questionObject))
        : [];
    _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];

    return new TestContentHtml(_);
  }

  static empty(): TestContentHtml {
    return new TestContentHtml({ id: '', content: [], done: false, status: MockTestStatus.pending });
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
  createdAt: Date;

  constructor({
    id,
    score,
    status,
    createdAt,
  }: {
    id: string;
    score: number;
    status: MockTestStatus;
    createdAt: Date;
  }) {
    this.id = id;
    this.score = score;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromJson(dataObject: any): MockTestResult {
    const _ = pick(dataObject, ['id', 'score', 'status', 'createdAt']);
    _.id = dataObject['id'].toString();
    _.score = dataObject['score'] ?? 0;
    _.createdAt = new Date(dataObject['created_at']);
    _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];
    const shareReferral = dataObject['mocktest_referral'] ?? '';
    const result = new MockTestResult(_);
    if (shareReferral !== '') {
      result.shareReferral = shareReferral;
    }
    return result;
  }

  static empty(): MockTestResult {
    return new MockTestResult({ id: '', score: 0, status: MockTestStatus.pending, createdAt: new Date() });
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
  data: Array<QuestionReview>;
  constructor(data: Array<QuestionReview>) {
    this.data = data;
  }

  static fromJson(dataObject: any): TestReviewHtml {
    const data = (dataObject['data'] as any[]).map((questionObject: any) => QuestionReview.fromJson(questionObject));
    return new TestReviewHtml(data);
  }

  static empty() {
    return new TestReviewHtml([]);
  }
}

export class QuestionReview {
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

  static fromJson(dataObject: any): QuestionReview {
    const _ = pick(dataObject, ['id', 'question', 'answers', 'explanation', 'isCorrect', 'hint']);
    _.id = dataObject['id'].toString();
    _.question = dataObject['question'] ?? '';
    _.answers = dataObject['answers'] ?? '';
    _.explanation = dataObject['explanation'] ?? '';
    _.isCorrect = dataObject['answer_status'] as boolean;
    return new QuestionReview(_);
  }

  static empty(): QuestionReview {
    return new QuestionReview({
      id: '',
      question: '',
      answers: '',
      explanation: '',
      isCorrect: false,
    });
  }
}
class TestContent implements ITestContent {
  id: string;
  topicName: string;
  questions: Question[];
  done: boolean;
  status: MockTestStatus;
  constructor({
    id,
    questions,
    done,
    topicName,
    status,
  }: {
    id: string;
    questions: Question[];
    done: boolean;
    topicName: string;
    status: MockTestStatus;
  }) {
    this.id = id;
    this.questions = questions;
    this.done = done ?? false;
    this.topicName = topicName;
    this.status = status;
  }
  static fromJson(dataObject: any): TestContent {
    const _ = pick(dataObject, [
      'id',
      'content',
      'test_id',
      'questions',
      'done',
      'learning_point_name',
      'topicName',
      'status',
    ]);
    _.id = _.test_id ?? '';
    _.topicName = _.learning_point_name ?? '';
    // _.content = [];
    _.questions =
      _.questions !== undefined ? _.questions.map((questionObject: any) => Question.fromJson(questionObject)) : [];

    _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];

    return new TestContent(_);
  }

  static empty(): TestContent {
    return new TestContent({ id: '', questions: [], done: false, topicName: '', status: MockTestStatus.pending });
  }
}

class Exercise {
  questions: Question[];
  progress: number;
  constructor({ questions, progress }: { questions: Question[]; progress: number }) {
    this.progress = progress;
    this.questions = questions;
  }
  static fromJson(dataObject: any): Exercise {
    const _ = pick(dataObject, ['questions', 'progress', 'lesson_percentage']);
    _.questions = dataObject['questions'].map((questionObject: any) => Question.fromJson(questionObject));
    _.progress = _.lesson_percentage ?? 0;

    return new Exercise(_);
  }

  static empty(): Exercise {
    return new Exercise({ questions: [], progress: 0 });
  }
}

enum DifficultyLevel {
  easy,
  meidum,
  hard,
}

class Question implements IQuestion {
  id: string;
  content: string;
  hint?: string;
  difficulty?: DifficultyLevel;
  // topic: Topic;
  answers: Answer[];

  constructor({
    id,
    content,
    answers,
    hint,
    difficulty,
  }: // category,
  // topic,
  {
    id: string;
    content: string;
    answers: Answer[];
    // category: Category;
    // topic: Topic;
    hint?: string;
    difficulty?: DifficultyLevel;
  }) {
    this.id = id;
    this.content = content;
    this.answers = answers;
    this.hint = hint;
    this.difficulty = difficulty;
    // this.topic = topic;
  }

  static fromJson(dataObject: any): Question {
    const _ = pick(dataObject, [
      'id',
      'content',
      'answers',
      'hint',
      'difficulty',
      // 'category_id',
      // 'topic_name',
      // 'topic_id',
      // 'category',
      // 'topic',
    ]);
    // _.content = dataObject['question'] ?? '';
    _.id = (_.id as number).toString();
    // _.answers = [];
    _.answers = dataObject['answers'].map((answerObject: any) => Answer.fromJson(answerObject));
    // _.category = Category.fromJson({
    //   id: _.category_id,
    //   name: _.category_name,
    // });
    // _.topic = Topic.fromJson({ id: _.topic_id, name: _.topic_name });
    // _.content = dataObject['question'];
    _.difficulty = DifficultyLevel[dataObject['difficulty'] as keyof typeof DifficultyLevel];
    return new Question(_);
  }

  static empty(): Question {
    return new Question({ id: '', content: '', answers: [], hint: '', difficulty: DifficultyLevel.easy });
  }
}

class Answer implements IAnswer {
  id: string;
  order: number;
  value: string;
  content: string;
  isCorrect: boolean;
  explanation: string;
  constructor({
    id,
    order,
    value,
    content,
    isCorrect,
    explanation,
  }: {
    id: string;
    order: number;
    value: string;
    content: string;
    isCorrect: boolean;
    explanation: string;
  }) {
    this.id = id;
    this.order = order;
    this.value = value;
    this.content = content;
    this.isCorrect = isCorrect;
    this.explanation = explanation;
  }

  static fromJson(dataObject: any): Answer {
    const _ = pick(dataObject, ['id', 'order', 'value', 'content', 'is_correct', 'isCorrect', 'explanation']);
    // _.id = dataObject['id'] ? dataObject['id'].toString() : '';
    // _.value = (_.value as number).toString();
    _.isCorrect = _.is_correct ?? false;
    // TODO: Remove hardcode
    // _.id = new Date().getTime().toString();
    // _.content = '<b><u><i>Answer content</i></u></b>';
    // _.value = _.id;
    return new Answer(_);
  }
}

class AnswerResult implements IAnswerResult {
  categories: { [key: string]: number };
  topics: { [key: string]: number };
  score: number;
  maxScore: { [key: string]: number };
  topicWrongQuestions: { [key: string]: Array<string> };
  constructor({
    categories,
    topics,
    score,
    maxScore,
    topicWrongQuestions,
  }: {
    categories: { [key: string]: number };
    topics: { [key: string]: number };
    score: number;
    maxScore: { [key: string]: number };
    topicWrongQuestions: { [key: string]: Array<string> };
  }) {
    this.categories = categories;
    this.topics = topics;
    this.score = score;
    this.maxScore = maxScore;
    this.topicWrongQuestions = topicWrongQuestions;
  }
}

class AnswerReview implements IAnswerReview {
  selectedAnswers: string[];
  rightAnswers: string[];
  constructor({ selectedAnswers, rightAnswers }: { selectedAnswers: string[]; rightAnswers: string[] }) {
    this.selectedAnswers = selectedAnswers;
    this.rightAnswers = rightAnswers;
  }
}

class TestResult implements ITestResult {
  score: number;
  result: AnswerResult;
  review: AnswerReview;
  ordinalNumber: number;
  type: TestType;
  shareReferral?: string;

  constructor({
    score,
    result,
    review,
    type,
    ordinalNumber,
  }: {
    score: number;
    result: AnswerResult;
    review: AnswerReview;
    type: TestType;
    ordinalNumber: number;
  }) {
    this.score = score;
    this.result = result;
    this.review = review;
    this.ordinalNumber = ordinalNumber;
    this.type = type;
  }

  static fromJson({
    total_score,
    result,
    review,
    type,
    order_number,
    mocktest_referral,
  }: {
    total_score: number;
    result: any[];
    review: any;
    type: string;
    order_number: number;
    mocktest_referral?: string;
  }): TestResult {
    const maxScore = result.reduce((pre: { [key: string]: number }, element: { [key: string]: any }) => {
      pre[element['category_id'].toString()] = (pre[element['category_id'].toString()] ?? 0) + 1;
      return pre;
    }, {});
    maxScore['total'] = result.length;
    const categoryToScoreMap: { [key: string]: number } = result.reduce(
      (pre: { [key: string]: number }, element: { [key: string]: any }) => {
        pre[element['category_id'].toString()] = (pre[element['category_id'].toString()] ?? 0) + element['score'];
        return pre;
      },
      {}
    );
    const topicToScoreMap: { [key: string]: number } = result
      // .filter(r => r.score == 1)
      .reduce((pre: { [key: string]: number }, element: { [key: string]: any }) => {
        pre[element['topic_id'].toString()] = (pre[element['topic_id'].toString()] ?? 0) + element['score'];
        return pre;
      }, {});
    const topicWrongQuestionMap: { [key: string]: string[] } = result.reduce(
      (pre: { [key: string]: string[] }, element: { [key: string]: any }) => {
        if (element['score'] == 0) {
          pre[element['topic_id'].toString()] = pre[element['topic_id'].toString()] ?? [];
          pre[element['topic_id'].toString()].push(element['question_id'].toString());
        }
        return pre;
      },
      {}
    );
    const resultScore = result.map(r => r['score']).reduce((pre, current) => pre + current);

    const answerResult = new AnswerResult({
      categories: categoryToScoreMap,
      topics: topicToScoreMap,
      maxScore: maxScore,
      score: resultScore,
      topicWrongQuestions: topicWrongQuestionMap,
    });

    const answerReview = new AnswerReview({
      selectedAnswers: review['selected_answer'].map((e: number) => e.toString()),
      rightAnswers: review['right_answer'].map((e: number) => e.toString()),
    });

    const testResult = new TestResult({
      score: total_score,
      result: answerResult,
      review: answerReview,
      type: <TestType>TestType[type as keyof typeof TestType],
      ordinalNumber: order_number,
    });

    if (testResult.type == TestType.Mock) {
      testResult.shareReferral = mocktest_referral ?? '';
    }

    return testResult;
  }

  isFirst() {
    return this.ordinalNumber == 1;
  }

  canShare() {
    return this.type == TestType.Mock && this.shareReferral != '';
  }

  getShareableMockTestLink() {
    // const origin = window.location.hostname == 'localhost' ? 'http://localhost:4200' : environment.origin;
    return this.type == TestType.Mock ? `/share-mocktest/${this.shareReferral}` : '';
  }
}

const answerPrefixes = ['Đáp án 1: ', 'Đáp án 2: ', 'Đáp án 3: ', 'Đáp án 4: ', 'Đáp án 5: ', 'Đáp án 6: '];
export { TestContent, answerPrefixes, TestResult, Answer, AnswerResult, Question, Exercise };
