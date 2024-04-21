import { Category } from "@data/knowledge/category";
import { LearningGoalCategory } from "@data/knowledge/learning-goal-path";
import { LessonItem } from "@data/knowledge/lesson";

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

