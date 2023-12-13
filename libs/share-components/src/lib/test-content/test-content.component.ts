import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
// import { Submission } from '@infrastructure/test/submission';
// import {
//   answerPrefixes,
//   TestContent
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderBySAPipe, SafeHtmlPipe } from '@share-pipes';
import { Answer, Progress, Submission, TestContent, answerPrefixes } from '@share-utils/data';
import { Subscription } from 'rxjs';
import { InputRadioComponent } from '../input-radio/input-radio.component';
import { TutorialComponent } from '../tutorial/tutorial.component';

export class AnswerTutorialScript {
  value: string;
  tooltipContent: string;
  tooltipPosition: 'top' | 'bottom';
  event: [string, () => void] | null;
  constructor({
    value,
    tooltipContent,
    tooltipPosition,
    event,
  }: {
    value: string;
    tooltipContent: string;
    tooltipPosition?: 'top' | 'bottom';
    event?: [string, () => void];
  }) {
    this.value = value;
    this.tooltipContent = tooltipContent;
    this.tooltipPosition = tooltipPosition ?? 'top';
    this.event = event ?? null;
  }
}

export class QuestionTutorialScript {
  tooltipContent: string;
  scripts: AnswerTutorialScript[];
  delay: number;
  skipCallback: () => void;
  constructor(
    tooltipContent: string | null,
    scripts: AnswerTutorialScript[],
    skipCallback: () => void,
    delay?: number
  ) {
    this.tooltipContent = tooltipContent ?? 'Đọc câu hỏi và chọn đáp án phù hợp';
    this.scripts = scripts;
    this.skipCallback = skipCallback;
    this.delay = delay ?? 0;
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, InputRadioComponent, OrderBySAPipe, SafeHtmlPipe, TutorialComponent, FormsModule],
  selector: 'kyonsvn-test-content',
  templateUrl: './test-content.component.html',
  styleUrls: ['./test-content.component.scss'],
})
export class TestContentComponent implements OnInit, OnDestroy, OnChanges {
  _addedList: number[] = [];
  answerPrefixes!: string[];
  conponentId = '';
  subscription!: Subscription;
  showTutorialWithDelay = false;
  showGoTo = false;
  goTo = 0;

  @Input() showTutorial = false;
  @Input() tutorialScript!: QuestionTutorialScript;
  scriptElements!: HTMLElement[];
  scriptEvents!: ([string, () => void] | null)[];

  @Input() showResult = false;
  @Output() showResultEvent = new EventEmitter<boolean>();

  @Input() currentIndex!: number;
  @Output() currentIndexEvent = new EventEmitter<number>();

  progress = new Progress();
  @Output() progressEvent = new EventEmitter<Progress>();

  @Input() content!: TestContent;
  @Output() contentEvent = new EventEmitter<TestContent>();

  @Input() submission!: Submission;
  @Output() submissionEvent = new EventEmitter<Submission>();

  @Input() isActive!: boolean;

  @Output() nextCallback = new EventEmitter<void>();
  @Output() previousCallback = new EventEmitter<void>();

  @Input() backTutorial?: () => void;

  @ViewChild('goToElm') goToElm!: ElementRef;

  @HostListener('window:keyup', ['$event'])
  keyEvent(e: KeyboardEvent) {
    if (!this.isActive) return;

    const question = this.content.questions[this.currentIndex];
    const answers = question.answers;
    const currentSubmitDataLength = Object.keys(this.submission.submitData).length;
    if (['1', '2', '3', '4'].includes(e.key)) {
      if (this.showResult) {
        return;
      }
      // this.submission.submitData[question.id] = answers[parseInt(e.key) - 1].id;
      this.updateSubmitData(question.id, answers[parseInt(e.key) - 1]);

      if (currentSubmitDataLength != Object.keys(this.submission.submitData).length) {
        // this.progress.next();
        this.updateProgress(this.progress.value + 1);
      }
    }
    if (e.key == ' ') {
      // if (!this.showResult) {
      //   this.showResult = true;
      //   this.showResultEvent.emit(this.showResult);
      //   return;
      // } else {
      //   this.showResult = false;
      //   this.showResultEvent.emit(this.showResult);
      // }
      // if (currentSubmitDataLength == this.content.questions.length) {
      if (e.shiftKey) {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
        if (this.currentIndex > Object.keys(this.submission.submitData).length - 1) return;
        // if (!this.showResult) {
        //   this.showResult = true;
        //   this.showResultEvent.emit(this.showResult);
        //   return;
        // } else {
        //   if (this.currentIndex < this.content.questions.length - 1) {
        //     this.currentIndex++;
        //   }
        // }

        // } else {
        //   if (this.progress.value > this.currentIndex) {
        //     this.currentIndex++;
        //   }
      }
    }
    if (e.key == 'g') {
      this.goTo = this.currentIndex + 1;
      this.showGoTo = true;
      setTimeout(() => {
        this.goToElm.nativeElement.focus();
      }, 100);
    }
    if (e.key == 'Escape') {
      if (this.showGoTo) this.showGoTo = false;
      if (document.activeElement != null) (document.activeElement as HTMLElement).blur();
    }
    if (e.key == 'ArrowLeft') {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
    if (e.key == 'ArrowRight') {
      if (this.currentIndex < this.content.questions.length - 1) {
        this.currentIndex++;
      }
    }
    this.currentIndexEvent.emit(this.currentIndex);
  }

  ngOnInit(): void {
    this.answerPrefixes = answerPrefixes;
    this.conponentId = new Date().getTime().toString();
    // if (this.showTutorial) {
    //   setTimeout(() => {
    //     this.content.questions.map((question, index) => {
    //       question.answers.map(answer => {
    //         if (this.tutorialScript.scripts[index].value == answer.value) {
    //           const elm = new ElementRef(document.getElementById(`${this.conponentId}-${question.id}-${answer.id}`));
    //           if (elm.nativeElement == null) return;
    //           elm.nativeElement?.setAttribute(
    //             'data-tooltip-content',
    //             this.tutorialScript.scripts[index].tooltipContent
    //           );
    //           this.scriptElements.push(elm.nativeElement);
    //           this.scriptEvents.push(this.tutorialScript.scripts[index].event ?? null);
    //         }
    //       });
    //     });
    //   }, this.tutorialScript.delay);
    // }
    this.goTo = this.currentIndex + 1;
  }

  goToIndex() {
    this.currentIndex = this.goTo - 1;
    this.currentIndexEvent.emit(this.currentIndex);
    this.showGoTo = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showTutorial'] && changes['showTutorial'].currentValue) {
      // setTimeout(() => {
      // this.showTutorialWithDelay = true;
      const scriptElements: HTMLElement[] = [];
      const scriptEvents: ([string, () => void] | null)[] = [];
      this.content.questions.map((question, index) => {
        question.answers.map(answer => {
          if (!this.tutorialScript.scripts[index]) return;
          if (this.currentIndex !== index) return;
          if (this.tutorialScript.scripts[index].value == answer.value.toString()) {
            const answerId = `atutorial-${answer.id}`;
            const answerElm = new ElementRef(document.getElementById(answerId));
            if (answerElm.nativeElement == null) return;
            // if (questionElm.nativeElement == null) return;
            // questionElm.nativeElement?.setAttribute('data-tooltip-content', this.tutorialScript.tooltipContent);
            answerElm.nativeElement?.setAttribute(
              'data-tooltip-content',
              this.tutorialScript.scripts[index].tooltipContent
            );
            // scriptElements.push(questionElm.nativeElement);
            scriptElements.push(answerElm.nativeElement);
            scriptEvents.push(this.tutorialScript.scripts[index].event);
          }
        });
      });
      this.scriptElements = scriptElements;
      scriptEvents.push(null);
      this.scriptEvents = scriptEvents;
      // }, 1000);
    } else if (changes['showTutorial'] && !changes['showTutorial'].currentValue) {
      this.showTutorialWithDelay = false;
    }
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
