import { IProgress } from "../../../utils";


export class Progress implements IProgress {
  value = 0;
  label = '';
  total = 1;

  static from(value: number, total: number) {
    const result = new Progress();
    result.value = value;
    let valueLength = value.toString().length;
    let valuePrefix = '';
    while (total.toString().length > valueLength) {
      valuePrefix += '0';
      valueLength++;
    }

    result.label = `${valuePrefix}${value}/${total}`;
    result.total = total;
    return result;
  }

  next() {
    this.value++;
    let valueLength = this.value.toString().length;
    let valuePrefix = '';
    while (this.total.toString().length > valueLength) {
      valuePrefix += '0';
      valueLength++;
    }
    this.label = `${valuePrefix}${this.value}/${this.total}`;
  }

  isComplete() {
    return this.value == this.total;
  }
}