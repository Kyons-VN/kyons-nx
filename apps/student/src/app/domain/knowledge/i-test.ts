import { Category } from '@data/knowledge/category';
import { Topic } from '@data/knowledge/topic';

interface ITestContent {
  id: string;
  questions: IQuestion[];
  done: boolean;
}

interface IQA {
  question: IQuestion;
}

interface IQuestion {
  id: string;
  content: string;
  answers: IAnswer[];
  category: Category;
  topic: Topic;
}

interface IAnswer {
  id: string;
  order: number;
  value: string;
  content: string;
}

enum TestType {
  Mock, Lesson, Exercise
}

interface ITestResult {
  score: number;
  result: IAnswerResult;
  review: IAnswerReview;
  ordinalNumber: number;
  type: TestType;
  shareReferral?: string;

  isFirst: () => boolean;
  canShare: () => boolean;
  getShareableMockTestLink?: () => string;
}

interface IAnswerResult {
  categories: { [key: string]: number };
  topics: { [key: string]: number };
  score: number;
  maxScore: { [key: string]: number };
  topicWrongQuestions: { [key: string]: Array<string> };
}

interface IAnswerReview {
  selectedAnswers: Array<string>;
  rightAnswers: Array<string>;
}

export {
  IAnswer, IAnswerResult,
  IAnswerReview, IQA,
  IQuestion, ITestContent, ITestResult,
  TestType
};

