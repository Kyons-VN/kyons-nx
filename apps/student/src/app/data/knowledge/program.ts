import { pick } from 'lodash-es';
import { IProgram } from '../../domain/knowledge/i-program';
import { LearningGoal } from './learning-goal';

class Program implements IProgram {
  id: string;
  name: string;
  subjectId: string;
  learningGoal?: LearningGoal;

  constructor({
    id,
    name,
    subjectId,
    learningGoal,
  }: {
    id: string;
    name: string;
    subjectId: string;
    learningGoal?: LearningGoal;
  }) {
    this.id = id;
    this.name = name;
    this.subjectId = subjectId;
    this.learningGoal = learningGoal ?? LearningGoal.empty();
  }

  static empty() {
    return new Program({ id: '', name: '', subjectId: '' });
  }

  static fromJson(dataObject: any): Program {
    const _ = pick(dataObject, ['id', 'name', 'subject_id', 'subjectId', 'learningGoal']);
    _.id = _.id.toString();
    _.subjectId = _.subject_id.toString();
    _.learningGoal = dataObject['learning_goal_id'] ? LearningGoal.fromJson({ id: dataObject['learning_goal_id'], name: dataObject['learning_goal_name'] ?? '' }) : LearningGoal.empty();
    return new Program(_);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      subject_id: this.subjectId,
    };
  }

  isNotEmpty() {
    return this.id != '';
  }
  isEmpty() {
    return this.id == '';
  }
}

export { Program };

