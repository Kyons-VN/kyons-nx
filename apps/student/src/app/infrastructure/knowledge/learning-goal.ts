import { ILearningGoal } from '@domain/knowledge/I-learning-goal';
import pick from 'lodash-es/pick';

class MockTestTemplate {
  id: string;
  name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  static fromJson(dataObject: any): MockTestTemplate {
    return new MockTestTemplate(pick(dataObject, ['id', 'name']));
  }

  static empty() {
    return new MockTestTemplate({ id: '', name: '' });
  }
}

class LearningGoal implements ILearningGoal {
  id: string;
  name: string;
  progress: number;
  maxTopic?: number;
  minTopic?: number;
  canSelectTopic: boolean;
  mockTestTemplates: MockTestTemplate[];
  totalQuestions: number;
  duration: number;

  constructor({
    id,
    name,
    progress,
    maxTopic,
    minTopic,
    canSelectTopic,
    mockTestTemplates,
    totalQuestions,
    duration,
  }: {
    id: string;
    name: string;
    progress: number;
    maxTopic?: number;
    minTopic?: number;
    canSelectTopic: boolean;
    mockTestTemplates: MockTestTemplate[];
    totalQuestions?: number;
    duration?: number;
  }) {
    this.id = id;
    this.name = name;
    this.progress = progress;
    this.maxTopic = maxTopic ?? undefined;
    this.minTopic = minTopic ?? undefined;
    this.canSelectTopic = canSelectTopic;
    this.mockTestTemplates = mockTestTemplates;
    this.totalQuestions = totalQuestions ?? 0;
    this.duration = duration ?? 0;
  }

  checked = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(dataObject: any): LearningGoal {
    const _ = pick(dataObject, [
      'id',
      'name',
      'progress',
      'maxTopic',
      'minTopic',
      'canSelectTopic',
      'mockTestTemplates',
      'totalQuestions',
      'duration',
    ]);
    _.id = dataObject['id'].toString();
    _.progress = dataObject['progress'] ?? 0;
    _.minTopic = dataObject['min_topic_numb'] ?? 0;
    _.maxTopic = dataObject['max_topic_numb'] ?? 0;
    _.canSelectTopic = dataObject['allow_select'] ?? false;
    _.mockTestTemplates = dataObject['mock_test_templates'].map((mockTestTemplateJson: any) =>
      MockTestTemplate.fromJson(mockTestTemplateJson)
    );
    _.totalQuestions = dataObject['numb_questions'] ?? 0;
    _.duration = dataObject['mock_test_duration'] ?? 0;
    return new LearningGoal(_);
  }

  static empty() {
    return new LearningGoal({ id: '', name: '', progress: 0, canSelectTopic: false, mockTestTemplates: [] });
  }

  toJson() {
    const result: any = {
      id: this.id,
      name: this.name,
      progress: this.progress,
    };
    if (this.maxTopic) {
      result.maxTopic = this.maxTopic;
    }
    if (this.minTopic) {
      result.minTopic = this.minTopic;
    }
    return result;
  }
}
// StudentLearningGoal json example: {
//   "id": 97,
//   "name": "Kiểm tra 1 tiết",
//   "program_name": "English 12",
//   "complete_percentage": 0,
//   "ordinal_number": 2
// }
class StudentLearningGoal {
  id: string;
  name: string;
  programName: string;
  subjectId: string;
  completePercentage: number;
  order: number;

  constructor({
    id,
    name,
    programName,
    completePercentage,
    order,
    subjectId,
  }: {
    id: string;
    name: string;
    programName: string;
    completePercentage: number;
    order: number;
    subjectId: string;
  }) {
    this.id = id;
    this.name = name;
    this.programName = programName;
    this.completePercentage = completePercentage;
    this.order = order;
    this.subjectId = subjectId;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(dataObject: any): StudentLearningGoal {
    const _ = pick(dataObject, ['id', 'name', 'programName', 'completePercentage', 'order', 'subjectId']);
    _.id = dataObject['id'].toString();
    _.completePercentage = dataObject['complete_percentage'] ?? 0;
    _.order = dataObject['ordinal_number'];
    _.subjectId = dataObject['subject_id'] != undefined ? dataObject['subject_id'].toString() : '1';
    _.programName = dataObject['program_name'] ?? '';

    return new StudentLearningGoal(_);
  }

  static empty() {
    return new StudentLearningGoal({
      id: '',
      name: '',
      programName: '',
      completePercentage: 0,
      order: 0,
      subjectId: '',
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      programName: this.programName,
      completePercentage: this.completePercentage,
      order: this.order,
      subjectId: this.subjectId,
    };
  }

  isEmpty() {
    return this.id === '';
  }
}

export { LearningGoal, StudentLearningGoal, MockTestTemplate };
