import { ILearningGoal } from "@domain/knowledge/I-learning-goal";
import pick from "lodash-es/pick";

class LearningGoal implements ILearningGoal {
  id: string;
  name: string;
  progress: number;
  maxTopic?: number;
  minTopic?: number;

  constructor({ id, name, progress, maxTopic, minTopic }: {
    id: string, name: string, progress: number, maxTopic?: number,
    minTopic?: number
  }) {
    this.id = id;
    this.name = name;
    this.progress = progress;
    this.maxTopic = maxTopic ?? undefined;
    this.minTopic = minTopic ?? undefined;
  }

  checked = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(dataObject: any): LearningGoal {
    const _ = pick(dataObject, ['id', 'name', 'progress', 'maxTopic', 'minTopic']);
    _.progress = dataObject['progress'] ?? 0;
    _.minTopic = dataObject['min_topic_numb'] ?? 0;
    _.maxTopic = dataObject['max_topic_numb'] ?? 0;
    return new LearningGoal(_);
  }

  static empty() {
    return new LearningGoal({ id: '', name: '', progress: 0 });
  }

  toJson() {
    const result: any = {
      id: this.id,
      name: this.name,
      progress: this.progress,
    };
    if (this.maxTopic) {
      result.maxTopic = this.maxTopic
    }
    if (this.minTopic) {
      result.minTopic = this.minTopic
    }
    return result;
  }
}

export { LearningGoal };

