import { pick } from "lodash";
import { ILPD } from "src/app/domain/knowledge/i-learning-point-difficulty";

export class LPD implements ILPD {
  id: string;
  difficulty: number;
  learningPoint: string;
  topic: string;
  program: string;

  constructor({ id, difficulty, learningPoint, topic, program }: { id: string, difficulty: number, learningPoint: string, topic: string, program: string }) {
    this.id = id;
    this.difficulty = difficulty;
    this.learningPoint = learningPoint;
    this.topic = topic;
    this.program = program;
  }

  static fromJson(dataObject: any): LPD {
    const _ = pick(dataObject, ['id', 'difficulty', 'difficulty_id', 'learning_point', 'learningPoint', 'topic', 'program']);
    _.difficulty = _.difficulty_id;
    _.learningPoint = _.learning_point;
    return new LPD(_);
  }
}
