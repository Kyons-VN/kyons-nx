import { pick } from 'lodash';
import {
  IAnswer,
  IAnswerResult,
  IAnswerReview,
  IQuestion,
  ITestContent,
  ITestResult,
} from '../../domain/knowledge/i-test';
import { Category } from '../knowledge/category';
import { Topic } from '../knowledge/topic';

class TestContent implements ITestContent {
  id: string;
  questions: Question[];
  done: boolean;
  constructor({
    id,
    content,
    done,
  }: {
    id: string;
    content: Question[];
    done: boolean;
  }) {
    this.id = id;
    this.questions = content;
    this.done = done;
  }
  static fromJson(dataObject: any): TestContent {
    const _ = pick(dataObject, ['id', 'content', 'test_id', 'data', 'done']);
    _.id = _.test_id ?? '';
    _.content = [];
    _.content =
      _.data !== undefined
        ? _.data.map((questionObject: any) => Question.fromJson(questionObject))
        : [];

    return new TestContent(_);
  }

  static empty(): TestContent {
    return new TestContent({ id: '', content: [], done: false });
  }
}

class Question implements IQuestion {
  id: string;
  content: string;
  category: Category;
  topic: Topic;
  answers: Answer[];

  constructor({
    id,
    content,
    answers,
    category,
    topic,
  }: {
    id: string;
    content: string;
    answers: Answer[];
    category: Category;
    topic: Topic;
  }) {
    this.id = id;
    this.content = content;
    this.answers = answers;
    this.category = category;
    this.topic = topic;
  }

  static fromJson(dataObject: any): Question {
    const _ = pick(dataObject, [
      'id',
      'content',
      'answers',
      'answer_keys',
      'category_name',
      'category_id',
      'topic_name',
      'topic_id',
      'category',
      'topic',
    ]);
    _.id = (_.id as number).toString();
    _.answers = [];
    _.answers = _.answer_keys.map((answerObject: any) =>
      Answer.fromJson(answerObject)
    );
    _.category = Category.fromJson({
      id: _.category_id,
      name: _.category_name,
    });
    _.topic = Topic.fromJson({ id: _.topic_id, name: _.topic_name });
    return new Question(_);
  }
}

class Answer implements IAnswer {
  id: string;
  order: number;
  value: string;
  content: string;
  constructor({
    id,
    order,
    value,
    content,
  }: {
    id: string;
    order: number;
    value: string;
    content: string;
  }) {
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
  constructor({
    selectedAnswers,
    rightAnswers,
  }: {
    selectedAnswers: string[];
    rightAnswers: string[];
  }) {
    this.selectedAnswers = selectedAnswers;
    this.rightAnswers = rightAnswers;
  }
}

class TestResult implements ITestResult {
  score: number;
  result: AnswerResult;
  review: AnswerReview;
  constructor({
    score,
    result,
    review,
  }: {
    score: number;
    result: AnswerResult;
    review: AnswerReview;
  }) {
    this.score = score;
    this.result = result;
    this.review = review;
  }
  static fromJson({
    total_score,
    result,
    review,
  }: {
    total_score: number;
    result: any[];
    review: any;
  }): TestResult {
    const maxScore = result.reduce(
      (pre: { [key: string]: number }, element: { [key: string]: any }) => {
        pre[element['category_id'].toString()] =
          (pre[element['category_id'].toString()] ?? 0) + 1;
        return pre;
      },
      {}
    );
    maxScore['total'] = result.length;
    const categoryToScoreMap: { [key: string]: number } = result
      // .filter(r => r.score == 1)
      .reduce(
        (pre: { [key: string]: number }, element: { [key: string]: any }) => {
          pre[element['category_id'].toString()] =
            (pre[element['category_id'].toString()] ?? 0) + element['score'];
          return pre;
        },
        {}
      );
    const topicToScoreMap: { [key: string]: number } = result
      // .filter(r => r.score == 1)
      .reduce(
        (pre: { [key: string]: number }, element: { [key: string]: any }) => {
          pre[element['topic_id'].toString()] =
            (pre[element['topic_id'].toString()] ?? 0) + element['score'];
          return pre;
        },
        {}
      );
    const topicWrongQuestionMap: { [key: string]: string[] } = result.reduce(
      (pre: { [key: string]: string[] }, element: { [key: string]: any }) => {
        if (element['score'] == 0) {
          pre[element['topic_id'].toString()] =
            pre[element['topic_id'].toString()] ?? [];
          pre[element['topic_id'].toString()].push(
            element['question_id'].toString()
          );
        }
        return pre;
      },
      {}
    );
    const resultScore = result
      .map((r) => r['score'])
      .reduce((pre, current) => pre + current);

    const answerResult = new AnswerResult({
      categories: categoryToScoreMap,
      topics: topicToScoreMap,
      maxScore: maxScore,
      score: resultScore,
      topicWrongQuestions: topicWrongQuestionMap,
    });

    const answerReview = new AnswerReview({
      selectedAnswers: review['selected_answer'].map((e: number) =>
        e.toString()
      ),
      rightAnswers: review['right_answer'].map((e: number) => e.toString()),
    });

    return new TestResult({
      score: total_score,
      result: answerResult,
      review: answerReview,
    });
  }
}

const answerPrefixes = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. '];
export { TestContent, answerPrefixes, TestResult, AnswerResult };
