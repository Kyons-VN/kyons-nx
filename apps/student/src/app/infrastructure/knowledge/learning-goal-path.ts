import pick from "lodash-es/pick";
import { Category } from "./category";
import { LessonItem } from "./lesson";
export class LearningGoalPath {
  progress: number;
  lessonCategories: LearningGoalCategory[];
  constructor({ progress, lessonCategories }: { progress: number, lessonCategories: LearningGoalCategory[] }) {
    this.progress = progress;
    this.lessonCategories = lessonCategories;
  }
  static fromJson(dataObject: any): LearningGoalPath {
    const _ = pick(dataObject, ['progress', 'lessonCategories']);
    _.progress = parseInt(dataObject['complete_percentage']);
    _.lessonCategories = (dataObject['categories'] as any[]).map((lCJson) => LearningGoalCategory.fromJson(lCJson));
    return new LearningGoalPath(_);
  }
  static empty() {
    return new LearningGoalPath({ progress: 0, lessonCategories: [] });
  }

  getCategories() {
    return this.lessonCategories.map((l) => l.category);
  }

  getUncompletedCategories() {
    return this.lessonCategories.filter((l) => !l.isCompleted);
  }

  getLearningGoalCategory(categoryId: string) {
    return this.lessonCategories.filter((lGC) => lGC.category.id == categoryId)[0];
  }
}

export class LearningGoalCategory {
  isCompleted = false;
  category: Category;
  lessons: LessonItem[];
  constructor({
    category,
    isCompleted,
    lessons,
  }: {
    category: Category,
    isCompleted: boolean,
    lessons: LessonItem[],
  }) {
    this.category = category;
    this.lessons = lessons;
    this.isCompleted = isCompleted;
  }
  static fromJson(data: any): LearningGoalCategory {
    const lessonCategoryObjectList = {
      category: Category.fromJson({
        id: data['category_id'],
        name: data['category_name'],
      }),
      isCompleted: data['completed'],
      lessons: (data['lesson_list'] as any[]).map((json) =>
        LessonItem.fromJson(json))
    };
    return new LearningGoalCategory(lessonCategoryObjectList);
  }
  static empty() {
    return new LearningGoalCategory({
      category: Category.empty(),
      isCompleted: false,
      lessons: [],
    });
  }
}