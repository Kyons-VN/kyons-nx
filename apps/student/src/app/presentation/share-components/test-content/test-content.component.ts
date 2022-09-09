import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Submission } from '../../../infrastructure/test/submission';
import {
  answerPrefixes,
  TestContent
} from '../../../infrastructure/test/test-content';

@Component({
  selector: 'student-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.scss'],
})
export class TestContentComponent implements OnInit {
  _addedList: number[] = [];
  answerPrefixes!: string[];
  conponentId = '';

  progress = 0;
  @Output() progressEvent = new EventEmitter<number>();

  @Input() content!: TestContent;
  @Output() contentEvent = new EventEmitter<TestContent>();

  @Input() submission!: Submission;
  @Output() submissionEvent = new EventEmitter<Submission>();

  ngOnInit(): void {
    this.answerPrefixes = answerPrefixes;
    this.conponentId = new Date().getTime().toString();
  }

  updateProgress(nextProgress: number) {
    if (!this._addedList.includes(nextProgress)) {
      this.progress += (1 / this.content.questions.length) * 100;
      this._addedList.push(nextProgress);
      this.progressEvent.emit(Math.round(this.progress));
    }
  }

  getNextProgress(index: number) {
    return Math.round(((index + 1) / this.content.questions.length) * 100);
  }

  updateSubmitData(questionId: string, answerId: string) {
    this.submission.submitData[questionId] = answerId;
  }
}
