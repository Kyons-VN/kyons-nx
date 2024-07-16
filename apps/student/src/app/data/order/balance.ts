import IBalance from '@domain/order/i-balance';
import { formattedPrice } from '@share-utils/utils';

export default class Balance implements IBalance {
  value: number;
  formatedValue: string;
  constructor(value: number) {
    this.value = value;
    this.formatedValue = formattedPrice(this.value);
  }
  static empty() {
    return new Balance(0);
  }
}
