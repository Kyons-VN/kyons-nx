import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '@data/event/event.service';
import { QuestionsProgressComponent, TestContentComponent } from '@share-components';
import { Progress, Submission, TestContent } from '@share-utils/data';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TestContentComponent,
    QuestionsProgressComponent,
    MatTooltipModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  route = inject(ActivatedRoute);
  service = inject(EventService);
  fb = inject(FormBuilder);

  testContent!: TestContent;
  eventId!: string;
  testSubmission = new Submission();
  testProgress = new Progress();
  currentTestIndex = 0;
  showResult = false;
  title!: string;
  showWaitlistPopup = false;
  only3Questions = true;
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  signUpForm: FormGroup = this.fb.group({});
  shouldValidate = false;
  showSuccessPopup = false;
  showFailPopup = false;
  failMessage = '';

  @ViewChild('emailElm') emailElm!: ElementRef;

  ngOnInit(): void {
    this.only3Questions = this.route.snapshot.queryParams['full'] !== 'true';
    this.testContent = this.service.getEvent(this.only3Questions);
    console.log(this.testContent);
    // this.title = this.testContent.topicName;
    this.testProgress = Progress.from(0, this.testContent.questions.length);
    this.signUpForm.addControl('email', this.email);
  }

  updateProgress(nextProgress: Progress) {
    this.testProgress = nextProgress;
  }

  updateSubmission(nextSubmission: Submission) {
    this.testSubmission.submitData = nextSubmission.submitData;
  }

  testComplete() {
    if (!this.shouldValidate) this.shouldValidate = true;
    if (this.email.invalid) return;
    const score = Object.keys(this.testSubmission.submitData).filter(questionId => {
      return (
        this.testSubmission.submitData[questionId] ===
        this.testContent.questions
          .find(question => question.id === questionId)
          ?.answers.find(answer => answer.isCorrect)?.id
      );
    }).length;

    console.log(score);

    this.service.submitTest({ event: this.title, email: this.email.value, score: score }).subscribe({
      next: () => {
        this.showWaitlistPopup = false;
        this.showSuccessPopup = true;
      },
      error: error => {
        console.log(error);

        this.showWaitlistPopup = false;
        this.showFailPopup = true;
        if (error.status === 403) {
          this.failMessage = 'Sự kiện đã kết thúc';
        } else if (error.status === 409) {
          this.failMessage = 'Bạn đã tham gia sự kiện này mất rồi';
        } else {
          this.failMessage = 'Hệ thống gặp sự cố';
        }
      },
    });
  }

  handleNextQuestion() {
    if (this.showResult) {
      this.currentTestIndex++;
      this.showResult = false;
    } else {
      this.showResult = true;
    }
  }
}
