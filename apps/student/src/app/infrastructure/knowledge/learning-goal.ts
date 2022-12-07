import { ILearningGoal } from "@domain/knowledge/I-learning-goal";
import pick from "lodash-es/pick";

class LearningGoal implements ILearningGoal {
  id: string;
  name: string;
  progress: number;
  constructor({ id, name, progress }: { id: string, name: string, progress: number }) {
    this.id = id;
    this.name = name;
    this.progress = progress;
  }

  checked = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(dataObject: any): LearningGoal {
    const _ = pick(dataObject, ['id', 'name', 'progress']);
    _.progress = dataObject['progress'] ?? 0;
    return new LearningGoal(_);
  }

  static empty() {
    return new LearningGoal({ id: '', name: '', progress: 0 });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      progress: this.progress,
    };
  }
}

export { LearningGoal };

