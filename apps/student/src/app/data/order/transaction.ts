import { formattedDate, formattedPrice } from '@utils/formats';
import pick from 'lodash-es/pick';

export class Transaction {
  id: string;
  quantity: number;
  amount: number;
  packageName: string;
  createdAt: Date;
  constructor({
    id,
    quantity,
    amount,
    packageName,
    createdAt,
  }: {
    id: string;
    quantity: number;
    amount: number;
    packageName: string;
    createdAt: Date;
  }) {
    this.id = id;
    this.quantity = quantity;
    this.amount = amount;
    this.packageName = packageName;
    this.createdAt = createdAt;
  }

  static fromJson(data: any): Transaction {
    const _ = pick(data, ['id', 'quantity', 'amount', 'packageName', 'createdAt']);
    _.id = String(data['id']);
    _.packageName = data['package_name'];
    _.createdAt = new Date(data['created_at']);

    return new Transaction(_);
  }

  static empty() {
    return new Transaction({ id: '', quantity: 0, amount: 0, packageName: '', createdAt: new Date() });
  }

  formatedTime() {
    return formattedDate(this.createdAt);
  }

  formatedAmount() {
    return formattedPrice(this.amount);
  }
}

export class TransactionList {
  total: number;
  list: Transaction[];
  constructor({ total, list }: { total: number; list: Transaction[] }) {
    this.total = total;
    this.list = list;
  }
  static empty() {
    return new TransactionList({ total: 0, list: [] as Transaction[] });
  }
}
