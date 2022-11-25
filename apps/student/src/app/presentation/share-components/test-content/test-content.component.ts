import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Submission } from '../../../infrastructure/test/submission';
import {
  answerPrefixes,
  TestContent
} from '../../../infrastructure/test/test-content';
import { Progress } from '../questions-progress/questions-progress.component';

@Component({
  selector: 'student-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.scss'],
})
export class TestContentComponent implements OnInit {
  _addedList: number[] = [];
  answerPrefixes!: string[];
  conponentId = '';

  @Input() currentIndex!: number;
  progress = new Progress();
  @Output() progressEvent = new EventEmitter<Progress>();

  @Input() content!: TestContent;
  @Output() contentEvent = new EventEmitter<TestContent>();

  @Input() submission!: Submission;
  @Output() submissionEvent = new EventEmitter<Submission>();

  ngOnInit(): void {
    this.answerPrefixes = answerPrefixes;
    this.conponentId = new Date().getTime().toString();
  }

  updateProgress(nextProgressValue: number) {
    if (!this._addedList.includes(nextProgressValue)) {
      this._addedList.push(nextProgressValue);
      const newProgress = Progress.from(this.progress.value + 1, this.content.questions.length);
      this.progress = newProgress;
      this.progressEvent.emit(this.progress);
    }
  }

  getNextProgress(index: number) {
    // return Math.round(((index + 1) / this.content.questions.length) * 100);
    return index + 1;
  }

  updateSubmitData(questionId: string, answerId: string) {
    this.submission.submitData[questionId] = answerId;
    // this.submissionEvent.emit(this.submission);
  }
}
