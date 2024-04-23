import { pick } from 'lodash-es';
import { IProgram } from '../../domain/knowledge/i-program';

class Program implements IProgram {
  id: string;
  name: string;

  constructor({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) {
    this.id = id;
    this.name = name;
  }

  static empty() {
    return new Program({ id: '', name: '' });
  }

  static fromJson(dataObject: any): Program {
    const _ = pick(dataObject, ['id', 'name']);
    _.id = _.id.toString();
    return new Program(_);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
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

