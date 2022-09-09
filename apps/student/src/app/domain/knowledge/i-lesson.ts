import { ICategory } from './i-category';
import { ITopic } from './i-topic';

interface ILessonItem {
  index: number;
  id: string;
}

interface ILessonGroup {
  id: string;
  lessonCategories: ILessonCategory[];
}

interface ILessonCategory {
  category: ICategory;
  topic: ITopic;
  lessons: ILesson[];
}

interface ILesson {
  id: string;
  name: string;
  content: string;
  learningPointId: string;
  learningPointDifficultyId: string;
  difficultyLevel: number;
}

export { ILessonItem, ILessonGroup, ILessonCategory, ILesson };
