import { IMockTestItem, MockTestStatus } from '@domain/knowledge/i-mock-test';
// import { environment } from '@environments';
import { formattedDate } from '@share-utils/utils';
import { pick } from 'lodash-es';
// import {
//   IAnswer,
//   IAnswerResult,
//   IAnswerReview,
//   IQuestion,
//   ITestContent,
//   ITestResult,
//   TestType,
// } from '../../domain/knowledge/i-test';
// import { Category } from '../knowledge/category';
// import { Topic } from '../knowledge/topic';

// class TestContent implements ITestContent {
//   id: string;
//   questions: Question[];
//   done: boolean;
//   status: MockTestStatus = MockTestStatus.new;
//   constructor({
//     id,
//     content,
//     done,
//     status,
//   }: {
//     id: string;
//     content: Question[];
//     done: boolean;
//     status: MockTestStatus;
//   }) {
//     this.id = id;
//     this.questions = content;
//     this.done = done;
//     this.status = status;
//   }
//   static fromJson(dataObject: any): TestContent {
//     const _ = pick(dataObject, ['id', 'content', 'test_id', 'data', 'done', 'status']);
//     _.id = _.test_id ?? '';
//     _.content = [];
//     _.content = _.data !== undefined ? _.data.map((questionObject: any) => Question.fromJson(questionObject)) : [];
//     _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];

//     return new TestContent(_);
//   }

//   static empty(): TestContent {
//     return new TestContent({ id: '', content: [], done: false, status: MockTestStatus.new });
//   }
// }

// class Question implements IQuestion {
//   id: string;
//   content: string;
//   category: Category;
//   topic: Topic;
//   answers: Answer[];

//   constructor({
//     id,
//     content,
//     answers,
//     category,
//     topic,
//   }: {
//     id: string;
//     content: string;
//     answers: Answer[];
//     category: Category;
//     topic: Topic;
//   }) {
//     this.id = id;
//     this.content = content;
//     this.answers = answers;
//     this.category = category;
//     this.topic = topic;
//   }

//   static fromJson(dataObject: any): Question {
//     const _ = pick(dataObject, [
//       'id',
//       'content',
//       'answers',
//       'answer_keys',
//       'category_name',
//       'category_id',
//       'topic_name',
//       'topic_id',
//       'category',
//       'topic',
//     ]);
//     _.id = (_.id as number).toString();
//     _.answers = [];
//     _.answers = _.answer_keys.map((answerObject: any) => Answer.fromJson(answerObject));
//     _.category = Category.fromJson({
//       id: _.category_id,
//       name: _.category_name,
//     });
//     _.topic = Topic.fromJson({ id: _.topic_id, name: _.topic_name });
//     return new Question(_);
//   }
// }

// class Answer implements IAnswer {
//   id: string;
//   order: number;
//   value: string;
//   content: string;
//   constructor({ id, order, value, content }: { id: string; order: number; value: string; content: string }) {
//     this.id = id;
//     this.order = order;
//     this.value = value;
//     this.content = content;
//   }

//   static fromJson(dataObject: any): Answer {
//     const _ = pick(dataObject, ['id', 'order', 'value', 'content']);
//     _.id = (_.id as number).toString();
//     _.value = (_.value as number).toString();
//     return new Answer(_);
//   }
// }

// class AnswerResult implements IAnswerResult {
//   categories: { [key: string]: number };
//   topics: { [key: string]: number };
//   score: number;
//   maxScore: { [key: string]: number };
//   topicWrongQuestions: { [key: string]: Array<string> };
//   constructor({
//     categories,
//     topics,
//     score,
//     maxScore,
//     topicWrongQuestions,
//   }: {
//     categories: { [key: string]: number };
//     topics: { [key: string]: number };
//     score: number;
//     maxScore: { [key: string]: number };
//     topicWrongQuestions: { [key: string]: Array<string> };
//   }) {
//     this.categories = categories;
//     this.topics = topics;
//     this.score = score;
//     this.maxScore = maxScore;
//     this.topicWrongQuestions = topicWrongQuestions;
//   }
// }

// class AnswerReview implements IAnswerReview {
//   selectedAnswers: string[];
//   rightAnswers: string[];
//   constructor({ selectedAnswers, rightAnswers }: { selectedAnswers: string[]; rightAnswers: string[] }) {
//     this.selectedAnswers = selectedAnswers;
//     this.rightAnswers = rightAnswers;
//   }
// }

// class TestResult implements ITestResult {
//   score: number;
//   result: AnswerResult;
//   review: AnswerReview;
//   ordinalNumber: number;
//   type: TestType;
//   shareReferral?: string;

//   constructor({
//     score,
//     result,
//     review,
//     type,
//     ordinalNumber,
//   }: {
//     score: number;
//     result: AnswerResult;
//     review: AnswerReview;
//     type: TestType;
//     ordinalNumber: number;
//   }) {
//     this.score = score;
//     this.result = result;
//     this.review = review;
//     this.ordinalNumber = ordinalNumber;
//     this.type = type;
//   }

//   static fromJson({
//     total_score,
//     result,
//     review,
//     type,
//     order_number,
//     mocktest_referral,
//   }: {
//     total_score: number;
//     result: any[];
//     review: any;
//     type: string;
//     order_number: number;
//     mocktest_referral?: string;
//   }): TestResult {
//     const maxScore = result.reduce((pre: { [key: string]: number }, element: { [key: string]: any }) => {
//       pre[element['category_id'].toString()] = (pre[element['category_id'].toString()] ?? 0) + 1;
//       return pre;
//     }, {});
//     maxScore['total'] = result.length;
//     const categoryToScoreMap: { [key: string]: number } = result.reduce(
//       (pre: { [key: string]: number }, element: { [key: string]: any }) => {
//         pre[element['category_id'].toString()] = (pre[element['category_id'].toString()] ?? 0) + element['score'];
//         return pre;
//       },
//       {}
//     );
//     const topicToScoreMap: { [key: string]: number } = result
//       // .filter(r => r.score == 1)
//       .reduce((pre: { [key: string]: number }, element: { [key: string]: any }) => {
//         pre[element['topic_id'].toString()] = (pre[element['topic_id'].toString()] ?? 0) + element['score'];
//         return pre;
//       }, {});
//     const topicWrongQuestionMap: { [key: string]: string[] } = result.reduce(
//       (pre: { [key: string]: string[] }, element: { [key: string]: any }) => {
//         if (element['score'] == 0) {
//           pre[element['topic_id'].toString()] = pre[element['topic_id'].toString()] ?? [];
//           pre[element['topic_id'].toString()].push(element['question_id'].toString());
//         }
//         return pre;
//       },
//       {}
//     );
//     const resultScore = result.map(r => r['score']).reduce((pre, current) => pre + current);

//     const answerResult = new AnswerResult({
//       categories: categoryToScoreMap,
//       topics: topicToScoreMap,
//       maxScore: maxScore,
//       score: resultScore,
//       topicWrongQuestions: topicWrongQuestionMap,
//     });

//     const answerReview = new AnswerReview({
//       selectedAnswers: review['selected_answer'].map((e: number) => e.toString()),
//       rightAnswers: review['right_answer'].map((e: number) => e.toString()),
//     });

//     const testResult = new TestResult({
//       score: total_score,
//       result: answerResult,
//       review: answerReview,
//       type: <TestType>TestType[type as keyof typeof TestType],
//       ordinalNumber: order_number,
//     });

//     if (testResult.type == TestType.Mock) {
//       testResult.shareReferral = mocktest_referral ?? '';
//     }

//     return testResult;
//   }

//   isFirst() {
//     return this.ordinalNumber == 1;
//   }

//   canShare() {
//     return this.type == TestType.Mock && this.shareReferral != '';
//   }

//   getShareableMockTestLink() {
//     const origin = window.location.hostname == 'localhost' ? 'http://localhost:4200' : environment.origin;
//     return this.type == TestType.Mock ? `${origin}/share-mocktest/${this.shareReferral}` : '';
//   }
// }

class MockTestItem implements IMockTestItem {
  id: string;
  createdDate: Date;
  status: MockTestStatus;
  score?: number;
  index?: number;
  constructor({
    id,
    createdDate,
    status,
    score,
    index,
  }: {
    id: string;
    createdDate: Date;
    status: MockTestStatus;
    score?: number;
    index?: number;
  }) {
    this.id = id;
    this.createdDate = createdDate;
    this.status = status;
    this.score = score;
    this.index = index;
  }
  static fromJson(dataObject: any, index?: number): MockTestItem {
    const _ = pick(dataObject, ['id', 'createdDate', 'status', 'score', 'index']);
    _.createdDate = new Date(dataObject['created_date']);
    _.status = MockTestStatus[dataObject['status'] as keyof typeof MockTestStatus];
    _.index = index;
    return new MockTestItem(_);
  }

  getFormattedDate() {
    return formattedDate(this.createdDate);
  }
}

// const answerPrefixes = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. '];
export { MockTestItem };

