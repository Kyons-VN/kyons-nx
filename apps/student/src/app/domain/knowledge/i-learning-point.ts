import { ITopic } from './i-topic';

interface ILearningPoint {
  id: string;
  difficultyId: string;
  learningPoint: string;
  topic: ITopic;
  lastScore: number;
}

interface ILearningPointDifficulty {
  id: string;
  content: string;
}

export { ILearningPoint, ILearningPointDifficulty };
