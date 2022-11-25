import pick from "lodash-es/pick";

export default class LearningGoal {
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