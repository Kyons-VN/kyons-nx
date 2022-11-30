import { ILearningGoal } from "@domain/knowledge/I-learning-goal";
import pick from "lodash-es/pick";

class LearningGoal implements ILearningGoal {
  id: string;
  name: string;
  constructor({ id, name }: { id: string, name: string }) {
    this.id = id;
    this.name = name;
  }

  checked = false;

  static fromJson(dataObject: any): LearningGoal {
    const _ = pick(dataObject, ['id', 'name']);

    return new LearningGoal(_);
  }

  static empty() {
    return new LearningGoal({ id: '', name: '' });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export { LearningGoal };

