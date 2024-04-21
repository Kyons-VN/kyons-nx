import { Program } from '@data/knowledge/program';
import { pick } from 'lodash-es';
import { IProgram } from '../i-program';
import { SubjectStatus } from './status';

interface ISubject {
  id: number;
  name: string;
  // label: string;
  status: SubjectStatus;
  // createdAt: Date;
  programs: IProgram[];
}

class Subject implements ISubject {
  id!: number;
  name!: string;
  // label!: string;
  status!: SubjectStatus;
  // createdAt!: Date;
  programs!: Program[];
  constructor(data: ISubject) {
    Object.assign(this, data);
  }

  static fromJson(data: any): Subject {
    const _ = pick(data, [
      'id',
      'name',
      // 'label',
      'status',
      // 'createdAt',
      'programs',
    ]);
    // _.createdAt = new Date(data['created_at']);
    _.programs = _.programs.map((json: any) => Program.fromJson(json));
    return new Subject(_);
  }
}

export { Subject };

