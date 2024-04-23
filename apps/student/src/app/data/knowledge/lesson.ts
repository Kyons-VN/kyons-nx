import { pick } from 'lodash-es';
import { ILearningPath } from '../../domain/knowledge/i-learning-path';
import { ILearningPoint } from '../../domain/knowledge/i-learning-point';
import { ILesson, ILessonCategory, ILessonGroup, ILessonItem } from '../../domain/knowledge/i-lesson';
import { Category } from './category';
import { Topic } from './topic';

class LessonItem implements ILessonItem {
  id: string;
  name: string;
  isNew: boolean;
  progress?: number;
  content = '';

  constructor({ id, name, progress }: { id: string; name: string; progress?: number }) {
    this.id = id;
    this.isNew = progress != 100;
    this.name = name;
    this.progress = progress;
  }

  static fromJson(dataObject: any): LessonItem {
    const _ = pick(dataObject, ['name', 'id', 'progress', 'lesson_content']);
    const lesson = new LessonItem(_);
    lesson.content = _.lesson_content;
    return lesson;
  }

  static waiting(): LessonItem {
    return new LessonItem({ id: '-1', name: 'NEW' });
  }

  static complete(): LessonItem {
    return new LessonItem({ id: '-2', name: 'COMPLETE' });
  }
}

class LearningPath implements ILearningPath {
  id: string;
  isCompleted: boolean;
  isEmpty: boolean;
  lessons: LessonItem[];
  progress: number;

  constructor({
    lessons,
    progress,
    id,
  }: {
    id: string;
    lessons: LessonItem[];
    progress: number;
  }) {
    this.isCompleted = progress == 100;
    this.lessons = lessons;
    this.progress = progress;
    this.isEmpty = lessons.length == 0;
    this.id = id;
  }

  static fromJson(dataObject: any): LearningPath {
    const _ = pick(dataObject, ['id', 'lessons', 'progress']);
    _.lessons = _.lessons.map((lessonJson: any) => LessonItem.fromJson(lessonJson));
    _.id = _.id.toString();
    _.progress = Number(_.progress).toFixed(2);
    return new LearningPath(_);
  }

  static completed(data: any[]): LearningPath {
    return new LearningPath({
      progress: 100,
      lessons: data.length === 0 ? [] : data.map((item: any) => LessonItem.fromJson({ dataObject: item })),
      id: '',
    });
  }

  static empty() {
    return new LearningPath({
      progress: 0,
      lessons: [],
      id: '',
    })
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
  lessonCategories: LessonCategory[];
  constructor({ id, lessonCategories }: { id: string; lessonCategories: LessonCategory[] }) {
    this.id = id;
    this.lessonCategories = lessonCategories;
  }
  static fromJson(id: string, dataObjects: any[]): LessonGroup {
    // const lessonCategoryObject = dataObjects.map((json) => LessonCategory);
    return new LessonGroup({
      id: id,
      lessonCategories: dataObjects.map(json => LessonCategory.fromJson(json)),
    });
  }
}

class LessonCategory implements ILessonCategory {
  category: Category;
  topic: Topic;
  lessons: Lesson[];
  constructor({ category, topic, lessons }: { category: Category; topic: Topic; lessons: Lesson[] }) {
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
      lessons: lessonCategoryObjectList.lessons.map(json => Lesson.fromJson(json)),
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
    const _ = pick(data, ['id', 'name', 'content', 'learningPointId', 'difficultyLevel', 'learningPointDifficultyId']);
    _.learningPointId = data['learning_point_id'].toString();
    _.learningPointDifficultyId = data['learning_point_difficulty_id'].toString();
    _.difficultyLevel = data['difficulty_level'];
    return new Lesson(_);
  }

  static empty() {
    return new Lesson({
      id: '',
      name: '',
      content: '',
      learningPointId: '',
      difficultyLevel: 0,
      learningPointDifficultyId: '',
    });
  }

  isEmpty() {
    return this.id === '';
  }
}

export { LearningPath, LearningPoint, Lesson, LessonCategory, LessonGroup, LessonItem };

