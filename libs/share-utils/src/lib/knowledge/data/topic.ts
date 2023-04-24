import { ITopic } from "../domain";

export class Topic implements ITopic {
  id: string;
  name: string;
  checked = false;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  static empty(): Topic {
    return new Topic({ id: '', name: '' });
  }

  static fromJson(json: any): Topic {
    return new Topic({ 'id': json.id.toString(), 'name': json.name });
  }
}
