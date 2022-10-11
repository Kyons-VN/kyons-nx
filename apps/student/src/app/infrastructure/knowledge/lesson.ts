import { pick } from 'lodash';
import { ILearningPath } from '../../domain/knowledge/i-learning-path';
import { ILearningPoint } from '../../domain/knowledge/i-learning-point';
import {
  ILesson,
  ILessonCategory,
  ILessonGroup,
  ILessonItem
} from '../../domain/knowledge/i-lesson';
import { Category } from './category';
import { Program } from './program';
import { Topic } from './topic';

class LessonItem implements ILessonItem {
  index: number;
  id: string;
  priority: number;
  learnedLPDs: number;
  totalLPDs: number;
  isNew?: boolean;

  constructor({
    index,
    id,
    priority,
    learnedLPDs,
    totalLPDs,
    isNew,
  }: {
    index: number;
    id: string;
    priority: number;
    learnedLPDs: number;
    totalLPDs: number;
    isNew?: boolean;
  }) {
    this.index = index;
    this.id = id;
    this.priority = priority;
    this.learnedLPDs = learnedLPDs;
    this.totalLPDs = totalLPDs;
    if (isNew) this.isNew = isNew;
  }

  static fromJson({
    dataObject,
    index,
  }: {
    dataObject: any;
    index: number;
  }): LessonItem {
    dataObject['index'] = index;
    dataObject['learnedLPDs'] = dataObject['studying_lpd'];
    dataObject['totalLPDs'] = dataObject['total_lpd'];
    const _ = pick(dataObject, [
      'index',
      'id',
      'priority',
      'learnedLPDs',
      'totalLPDs',
      'new',
      'isNew',
    ]);
    _.isNew = _.new ?? undefined;
    return new LessonItem(_);
  }
}

class LearningPath implements ILearningPath {
  isCompleted: boolean;
  lessonList: LessonItem[];
  program: Program;

  constructor({ isCompleted, lessonList, program }: { isCompleted: boolean, lessonList: LessonItem[], program: Program }) {
    this.isCompleted = isCompleted;
    this.lessonList = lessonList;
    this.program = program;
  }

  static fromJson(dataObject: any): LearningPath {
    const _ = pick(dataObject, ['completed', 'isCompleted', 'learning_point_difficulty_id', 'lessonList', 'program']);
    _.isCompleted = _.completed;
    return new LearningPath(_);
  }

  static completed(program: Program): LearningPath {
    return new LearningPath({ isCompleted: true, lessonList: [], program: program });
  }
}

class LearningPoint implements ILearningPoint {
  id: string;
  difficultyId: string;
  learningPoint: string;
  topic: Topic;
  lastScore: number;

  constructor({
    id,
    difficultyId,
    learningPoint,
    topic,
    lastScore,
  }: {
    id: string;
    difficultyId: string;
    learningPoint: string;
    topic: Topic;
    lastScore: number;
  }) {
    this.id = id;
    this.difficultyId = difficultyId;
    this.learningPoint = learningPoint;
    this.topic = topic;
    this.lastScore = lastScore;
  }

  static fromJson(dataObject: any): LearningPoint {
    const _ = pick(dataObject, [
      'id',
      'learningPoint',
      'learning_point',
      'difficulty_id',
      'difficultyId',
      'topic_name',
      'topic',
      'topic_id',
      'lastScore',
      'latest_score',
    ]);
    _.learningPoint = _.learning_point;
    _.difficultyId = _.difficulty_id;
    _.topic = Topic.fromJson({
      id: _.topic_id,
      name: _.topic_name,
    });
    _.lastScore = _.latest_score ?? -1;
    return new LearningPoint(_);
  }
}

class LessonGroup implements ILessonGroup {
  id: string;
  lessonCategories: ILessonCategory[];
  constructor({
    id,
    lessonCategories,
  }: {
    id: string;
    lessonCategories: ILessonCategory[];
  }) {
    this.id = id;
    this.lessonCategories = lessonCategories;
  }
  static fromJson(id: string, dataObjects: any[]): LessonGroup {
    // const lessonCategoryObject = dataObjects.map((json) => LessonCategory);
    return new LessonGroup({
      id: id,
      lessonCategories: dataObjects.map((json) =>
        LessonCategory.fromJson(json)
      ),
    });
  }
}

class LessonCategory implements ILessonCategory {
  category: Category;
  topic: Topic;
  lessons: ILesson[];
  constructor({
    category,
    topic,
    lessons,
  }: {
    category: Category;
    topic: Topic;
    lessons: Lesson[];
  }) {
    this.category = category;
    this.lessons = lessons;
    this.topic = topic;
  }
  static fromJson(data: any): LessonCategory {
    const lessonCategoryObjectList = {
      category: {
        id: data['category_id'],
        name: data['category_name'],
      },
      topic: {
        id: data['topic_id'],
        name: data['topic_name'],
      },
      lessons: data['lessons'] as any[],
    };
    return new LessonCategory({
      category: Category.fromJson(lessonCategoryObjectList.category),
      topic: Topic.fromJson(lessonCategoryObjectList.topic),
      lessons: lessonCategoryObjectList.lessons.map((json) =>
        Lesson.fromJson(json)
      ),
    });
  }
  static empty() {
    return new LessonCategory({
      category: Category.empty(),
      topic: Topic.empty(),
      lessons: [],
    });
  }
}

class Lesson implements ILesson {
  id: string;
  name: string;
  content: string;
  learningPointId: string;
  learningPointDifficultyId: string;
  difficultyLevel: number;

  constructor({
    id,
    name,
    content,
    learningPointId,
    difficultyLevel,
    learningPointDifficultyId,
  }: {
    id: string;
    name: string;
    content: string;
    learningPointId: string;
    difficultyLevel: number;
    learningPointDifficultyId: string;
  }) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.learningPointId = learningPointId;
    this.learningPointDifficultyId = learningPointDifficultyId;
    this.difficultyLevel = difficultyLevel;
  }

  static fromJson(data: any): Lesson {
    const _ = pick(data, [
      'id',
      'name',
      'content',
      'learningPointId',
      'difficultyLevel',
      'learningPointDifficultyId',
    ]);
    _.learningPointId = data['learning_point_id'].toString();
    _.learningPointDifficultyId =
      data['learning_point_difficulty_id'].toString();
    _.difficultyLevel = data['difficulty_level'];
    return new Lesson(_);
  }
}

export { LessonItem, LessonGroup, LessonCategory, Lesson, LearningPoint, LearningPath };

