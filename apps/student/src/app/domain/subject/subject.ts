import { pick } from 'lodash-es';
import { Program } from '../../infrastructure/knowledge/program';
import { IProgram } from '../knowledge/i-program';
import { SubjectStatus } from './status';

interface ISubject {
  id: number;
  name: string;
  label: string;
  status: SubjectStatus;
  createdAt: Date;
  programs: IProgram[];
}

class Subject implements ISubject {
  id!: number;
  name!: string;
  label!: string;
  status!: SubjectStatus;
  createdAt!: Date;
  programs!: Program[];

  static fromJson(data: any): Subject {
    const _ = pick(data, [
      'id',
      'name',
      'label',
      'status',
      'createdAt',
      'programs',
    ]);
    _.createdAt = new Date(data['created_at']);
    _.programs = _.programs.map((json: any) => Program.fromJson(json));
    return _ as Subject;
  }
}

export { Subject };

