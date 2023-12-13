import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OrderBySAPipe, SafeHtmlPipe } from '@share-pipes';
import { Answer, Progress, Question, Submission, answerPrefixes } from '@share-utils/data';
import { Subscription } from 'rxjs';
import { InputRadioComponent } from '../input-radio/input-radio.component';
// import {
//   answerPrefixes,
//   TestContent

@Component({
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, InputRadioComponent, OrderBySAPipe],
  selector: 'kyonsvn-exercise-content',
  templateUrl: './exercise-content.component.html',
  styleUrls: ['./exercise-content.component.scss'],
})
export class ExerciseContentComponent implements OnInit, OnDestroy {
  _addedList: number[] = [];
  answerPrefixes!: string[];
  conponentId = '';
  subscription!: Subscription;

  @Input() showResult = false;

  @Input() progress!: Progress;
  @Input() question!: Question;
  @Output() contentEvent = new EventEmitter<Question[]>();

  @Input() submission!: Submission;
  @Output() submissionEvent = new EventEmitter<Submission>();

  @Input() isActive!: boolean;

  @Output() completeCallback = new EventEmitter<void>();

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    if (!this.isActive) return;

    if (['1', '2', '3', '4'].includes(e.key)) {
      // this.submission.submitData[question.id] = answers[parseInt(e.key) - 1].id;
      // this.updateSubmitData(question.id, answers[parseInt(e.key) - 1].id)
      // if (currentSubmitDataLength != Object.keys(this.submission.submitData).length) {
      // this.progress.next();
      // this.updateProgress(this.progress.value + 1);
      // }
    }
    if (e.key == ' ') {
      this.completeCallback.emit();
    }
  }

  ngOnInit(): void {
    this.answerPrefixes = answerPrefixes;
    this.conponentId = new Date().getTime().toString();
  }

  ngOnDestroy(): void {
    if (this.subscription != undefined) this.subscription.unsubscribe();
  }

  // updateProgress(nextProgressValue: number) {
  //   if (!this._addedList.includes(nextProgressValue)) {
  //     this._addedList.push(nextProgressValue);
  //     const newProgress = Progress.from(this.progress.value + 1, this.questions.length);
  //     this.progress = newProgress;
  //     this.progressEvent.emit(this.progress);
  //   }
  // }

  getNextProgress(index: number) {
    // return Math.round(((index + 1) / this.content.questions.length) * 100);
    return index + 1;
  }

  updateSubmitData(questionId: string, answer: Answer) {
    this.submission.submitData[questionId] = answer;
    this.submissionEvent.emit(this.submission);
  }
}
