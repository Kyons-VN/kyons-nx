import { Category } from "@infrastructure/knowledge/category";
import { LearningGoalCategory } from "@infrastructure/knowledge/learning-goal-path";
import { LessonItem } from "@infrastructure/knowledge/lesson";

interface ILearningGoalPath {
  progress: number;
  lessonCategories: LearningGoalCategory[];
  getCategories(): Category[];
  getUncompletedLearningGoalCategories(): LearningGoalCategory[];
  getLearningGoalCategoryById(categoryId: string): LearningGoalCategory;
}
interface ILearningGoalCategory {
  isCompleted: boolean;
  category: Category;
  lessons: LessonItem[];
}
export { ILearningGoalCategory, ILearningGoalPath };

