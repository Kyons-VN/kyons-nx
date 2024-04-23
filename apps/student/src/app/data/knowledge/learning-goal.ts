import { ILearningGoal } from '@domain/knowledge/I-learning-goal';
import pick from 'lodash-es/pick';
import { Program } from './program';

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
  // progress?: number;
  maxTopic?: number;
  minTopic?: number;
  // canSelectTopic: boolean;
  // mockTestTemplates: MockTestTemplate[];
  // totalQuestions: number;
  // duration: number;

  constructor({
    id,
    name,
    // progress,
    maxTopic,
    minTopic,
    // canSelectTopic,
    // mockTestTemplates,
    // totalQuestions,
    // duration,
  }: {
    id: string;
    name: string;
    // progress?: number;
    maxTopic?: number;
    minTopic?: number;
    // canSelectTopic: boolean;
    // mockTestTemplates: MockTestTemplate[];
    // totalQuestions?: number;
    // duration?: number;
  }) {
    this.id = id;
    this.name = name;
    // this.progress = progress ?? 0;
    this.maxTopic = maxTopic ?? -1;
    this.minTopic = minTopic ?? -1;
    // this.canSelectTopic = canSelectTopic;
    // this.mockTestTemplates = mockTestTemplates;
    // this.totalQuestions = totalQuestions ?? 0;
    // this.duration = duration ?? 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(dataObject: any): LearningGoal {
    const _ = pick(dataObject, [
      'id',
      'name',
      // 'progress',
      'maxTopic',
      'minTopic',
      // 'canSelectTopic',
      // 'mockTestTemplates',
      // 'totalQuestions',
      // 'duration',
    ]);
    _.id = dataObject['id'].toString();
    // _.progress = dataObject['progress'];
    _.minTopic = dataObject['minimum_topic'];
    _.maxTopic = dataObject['maximum_topic'];
    // _.canSelectTopic = dataObject['allow_select'] ?? false;
    // _.mockTestTemplates = dataObject['mock_test_templates'].map((mockTestTemplateJson: any) =>
    //   MockTestTemplate.fromJson(mockTestTemplateJson)
    // );
    // _.totalQuestions = dataObject['numb_questions'] ?? 0;
    // _.duration = dataObject['mock_test_duration'] ?? 0;
    return new LearningGoal(_);
  }

  static empty() {
    return new LearningGoal({ id: '', name: '' });
  }

  toJson() {
    const result: any = {
      id: this.id,
      name: this.name,
      // progress: this.progress,
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
  program: Program;
  progress: number;

  constructor({
    id,
    name,
    program,
    progress,
  }: {
    id: string;
    name: string;
    program: Program;
    progress: number;
  }) {
    this.id = id;
    this.name = name;
    this.program = program;
    this.progress = progress;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(dataObject: any): StudentLearningGoal {
    const _ = pick(dataObject, ['id', 'name', 'program', 'progress']);
    _.id = dataObject['id'].toString();
    _.progress = parseInt((_.progress ?? 0).toString());
    _.program = Program.fromJson(dataObject['program'])

    return new StudentLearningGoal(_);
  }

  static empty() {
    return new StudentLearningGoal({
      id: '',
      name: '',
      program: Program.empty(),
      progress: 0,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      program: this.program,
      progress: this.progress,
    };
  }

  isEmpty() {
    return this.id === '';
  }
}

export { LearningGoal, MockTestTemplate, StudentLearningGoal };

