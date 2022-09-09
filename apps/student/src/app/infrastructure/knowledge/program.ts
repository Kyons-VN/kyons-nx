import { pick } from 'lodash';
import { IProgram } from '../../domain/knowledge/i-program';

class Program implements IProgram {
  id: string;
  name: string;
  subjectId: string;

  constructor({
    id,
    name,
    subjectId,
  }: {
    id: string;
    name: string;
    subjectId: string;
  }) {
    this.id = id;
    this.name = name;
    this.subjectId = subjectId;
  }

  static empty() {
    return new Program({ id: '', name: '', subjectId: '' });
  }

  static fromJson(dataObject: any): Program {
    const _ = pick(dataObject, ['id', 'name', 'subject_id', 'subjectId']);
    _.id = _.id.toString();
    _.subjectId = _.subject_id.toString();
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
