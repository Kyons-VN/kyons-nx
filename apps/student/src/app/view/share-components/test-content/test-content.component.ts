import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
// import { Submission } from '@data/test/submission';
// import {
//   answerPrefixes,
//   TestContent
// } from '@data/test/test-content';
import { Answer, Submission, TestContent, answerPrefixes } from '@share-utils/data';
import { Subscription } from 'rxjs';
import { Progress } from '../questions-progress/questions-progress.component';

@Component({
  selector: 'student-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.scss'],
})
export class TestContentComponent implements OnInit, OnDestroy {
  _addedList: number[] = [];
  answerPrefixes!: string[];
  conponentId = '';
  subscription!: Subscription;

  @Input() currentIndex!: number;
  @Output() currentIndexEvent = new EventEmitter<number>();

  progress = new Progress();
  @Output() progressEvent = new EventEmitter<Progress>();

  @Input() content!: TestContent;
  @Output() contentEvent = new EventEmitter<TestContent>();

  @Input() submission!: Submission;
  @Output() submissionEvent = new EventEmitter<Submission>();

  @Input() isActive!: boolean;

  @Output() completeCallback = new EventEmitter<void>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    if (!this.isActive) return;

    const question = this.content.questions[this.currentIndex];
    const answers = question.answers;
    const currentSubmitDataLength = Object.keys(this.submission.submitData).length;
    if (['1', '2', '3', '4'].includes(e.key)) {
      // this.submission.submitData[question.id] = answers[parseInt(e.key) - 1].id;
      this.updateSubmitData(question.id, answers[parseInt(e.key) - 1]);

      if (currentSubmitDataLength != Object.keys(this.submission.submitData).length) {
        // this.progress.next();
        this.updateProgress(this.progress.value + 1);
      }
    }
    if (e.key == ' ') {
      if (currentSubmitDataLength == this.content.questions.length) {
        this.completeCallback.emit();
      } else {
        if (this.progress.value > this.currentIndex) {
          this.currentIndex++;
          this.currentIndexEvent.emit(this.currentIndex);
        }
      }
    }
  }

  ngOnInit(): void {
    this.answerPrefixes = answerPrefixes;
    this.conponentId = new Date().getTime().toString();
  }

  ngOnDestroy(): void {
    if (this.subscription != undefined) this.subscription.unsubscribe();
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

  updateSubmitData(questionId: string, answer: Answer) {
    this.submission.submitData[questionId] = answer;
    this.submissionEvent.emit(this.submission);
  }
}
