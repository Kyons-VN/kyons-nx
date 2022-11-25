import { ICategory } from '../../domain/knowledge/i-category';

export class Category implements ICategory {
  id: string;
  name: string;

  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  static empty(): Category {
    return new Category({ id: '', name: '' });
  }

  static fromJson(json: any): Category {
    return new Category({ 'id': json.id.toString(), 'name': json.name });
  }
}
