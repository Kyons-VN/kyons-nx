import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-questions-progress',
  templateUrl: './questions-progress.component.html',
  styleUrls: ['./questions-progress.component.scss'],
})
export class QuestionsProgressComponent {
  @Input() progress = new Progress();
}

export class Progress {
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
}