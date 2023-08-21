import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal, StudentLearningGoal } from '@infrastructure/knowledge/learning-goal';
import { LessonGroup } from '@infrastructure/knowledge/lesson';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TutorialService } from '@infrastructure/tutorials/tutorial-service';
import { LoadingComponent } from '@presentation/share-components/loading/loading.component';
// import { Progress } from '@presentation/share-components/questions-progress/questions-progress.component';
import {
  AnswerTutorialScript,
  QuestionTutorialScript,
  QuestionsProgressComponent,
  TestContentComponent,
  TutorialComponent,
} from '@share-components';
import { MockTestResult, Progress, Submission, TestContent } from '@share-utils/data';
import { Observable, fromEvent } from 'rxjs';

const TEST_DURATION = 90 * 60 * 1000;

@Component({
  standalone: true,
  imports: [
    TestContentComponent,
    CommonModule,
    QuestionsProgressComponent,
    MatTooltipModule,
    RouterModule,
    LoadingComponent,
    TutorialComponent,
  ],

  templateUrl: './tutorial-test.component.html',
  styleUrls: ['./tutorial-test.component.scss'],
})
export class TutorialTestComponent implements OnInit {
  paths = inject(NavigationService).paths;
  // selectedProgram;
  source!: Observable<KeyboardEvent>;
  elm = inject(ElementRef);
  route = inject(ActivatedRoute);
  router = inject(Router);
  testService = inject(TutorialService);
  loading = inject(LoadingOverlayService);
  knowledgeService = inject(KnowledgeService);
  clipboard = inject(Clipboard);
  tutorialService = inject(TutorialService);

  learningGoal = LearningGoal.empty();
  studentLearningGoal = StudentLearningGoal.empty();
  testProgress = new Progress();
  isTitleHidden = false;
  testContent = TestContent.empty();
  testSubmission = new Submission();
  isTest = false;
  testResult: MockTestResult | undefined;
  reviewRenderObject: any[] = [];
  resultRenderObject: any[] = [];
  lessonGroup!: LessonGroup;
  userType = '';
  isSubmitting = false;
  currentTestIndex = 0;
  progressString = '';
  hasError = '';
  complete = false;
  testReviewRenderObject: any[] = [];
  testResultRenderObject: any[] = [];
  isSharing = false;
  shareLink = '';
  isCopied = false;
  isPending = true;
  counter = 0;
  counterTime = new Date(this.counter);
  Math = Math;
  showIncomplete = false;
  showHavingTime = false;
  ignoreIncomplete = false;
  ignoreHavingTime = false;
  mockTestId!: string;
  showResult = false;
  tutorialScript!: QuestionTutorialScript;
  tutorialPart = 0;

  @ViewChild('testContentElm') testContentElm!: ElementRef;
  @ViewChild('scrollElm') scrollElm!: ElementRef;
  @ViewChild('scrollXsElm') scrollXsElm!: ElementRef;

  ngOnInit(): void {
    // this.selectedProgram = this.knowledgeService.getSelectedProgram();
    this.source = fromEvent<KeyboardEvent>(document, 'keyup');
    this.route.queryParams.subscribe(params => {
      this.isTest = params['test'] ? params['test'] === 'true' : false;
    });
    this.mockTestId = this.route.snapshot.paramMap.get('id') ?? '';
    this.learningGoal = this.tutorialService.getSelectedLearningGoal();
    this.getMockTest();
  }

  // ngAfterViewInit(): void {
  //   if (!this.testContentElm) return;
  // }

  skipCallback() {
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }

  startTime = () => {
    setInterval(() => {
      this.counter -= 1000;
      this.counterTime = new Date(this.counter);
      if (this.counter < 0) {
        this.ignoreHavingTime = true;
        this.ignoreIncomplete = true;
        this.testComplete();
      }
    }, 1000);
    this.tutorialPart = 1;
  };

  getMockTest() {
    this.testContent = this.testService.getMockTest();
    this.testProgress = Progress.from(0, this.testContent.questions.length);
    this.counter = TEST_DURATION;
    this.tutorialScript = new QuestionTutorialScript(
      null,
      [
        new AnswerTutorialScript({
          value: '2',
          tooltipContent: 'Bấm vào đây để chọn câu trả lời',
          event: [
            'click',
            () => {
              this.testSubmission.submitData[this.testContent.questions[this.currentTestIndex].id] =
                this.testContent.questions[this.currentTestIndex].answers[3];
              this.tutorialPart++;
            },
          ],
        }),
        new AnswerTutorialScript({
          value: '2',
          tooltipContent: 'Làm tiếp câu tiếp theo',
          event: [
            'click',
            () => {
              this.testSubmission.submitData[this.testContent.questions[this.currentTestIndex].id] =
                this.testContent.questions[this.currentTestIndex].answers[2];
              this.tutorialPart++;
            },
          ],
        }),
      ],
      this.skipCallback,
      0
    );
    this.isPending = false;
  }

  preTutorial = () => {
    if ([3].includes(this.tutorialPart)) this.currentTestIndex--;
    if (this.tutorialPart == 5) {
      this.currentTestIndex = 1;
      this._centerCurrentIndexXs();
      this._centerCurrentIndex();
    }
    this.tutorialPart--;
  };

  nextTutorial = () => {
    if ([2].includes(this.tutorialPart)) this.currentTestIndex++;
    this.tutorialPart++;
    if (this.tutorialPart == 5) {
      this.currentTestIndex = this.testContent.questions.length - 1;
      this._centerCurrentIndexXs();
      this._centerCurrentIndex();
    }
    if (this.tutorialPart == 7) {
      this.router.navigate([this.paths.mockTestResult.path.replace(':id', 'tutorial1')]);
    }
  };

  updateProgress(nextProgress: Progress) {
    this.testProgress = nextProgress;
  }

  updateSubmission(nextSubmission: Submission) {
    this.testSubmission.submitData = nextSubmission.submitData;
  }

  round(value: number) {
    return Math.round(value);
  }

  testComplete() {
    if (this.isSubmitting) return;
    // for (const input of a) {
    //   console.log(input.checked);
    //   input.
    // }
    // a.map((input) => {});
    // const groupsOfFour = Array.from(records, record => {
    //   const group = [];
    //   for (let i = 0; i < 4; i++) {
    //     if (record) {
    //       group.push(record);
    //       // record = record.nextSibling;
    //     }
    //   }
    //   return group;
    // });

    // Print each group of 4 records
    // for (const group of groupsOfFour as any[]) {
    //   console.log(group);
    // }
    if (
      !this.ignoreIncomplete &&
      Object.keys(this.testSubmission.submitData).length < this.testContent.questions.length
    ) {
      this.showIncomplete = true;
      return;
    }
    if (!this.ignoreHavingTime && this.counter > 5 * 60 * 1000) {
      this.showHavingTime = true;
      return;
    }
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.loading.show();
    this.testSubmission.end = new Date();
  }

  copy() {
    this.clipboard.copy(this.shareLink);
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 1000);
  }

  previousPage() {
    this.scrollElm.nativeElement.scrollLeft -= 400;
  }
  nextPage() {
    this.scrollElm.nativeElement.scrollLeft += 400;
  }

  scrollLeft() {
    this.currentTestIndex--;
    this._centerCurrentIndexXs();
  }
  scrollRight() {
    this.currentTestIndex++;
    this._centerCurrentIndexXs();
    this._centerCurrentIndex();
  }

  _centerCurrentIndex() {
    const currentElm = this.scrollElm.nativeElement.querySelectorAll('button')[this.currentTestIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollElm.nativeElement.offsetWidth;
    this.scrollElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
  }

  _centerCurrentIndexXs() {
    const currentElm = this.scrollXsElm.nativeElement.querySelectorAll('button')[this.currentTestIndex];
    const currentElmLeft = currentElm.offsetLeft - this.scrollXsElm.nativeElement.offsetLeft;
    const currentElmWidth = currentElm.offsetWidth;
    const currentElmCenter = currentElmLeft + currentElmWidth / 2;
    const scrollElmWidth = this.scrollXsElm.nativeElement.offsetWidth;
    this.scrollXsElm.nativeElement.scrollLeft = currentElmCenter - scrollElmWidth / 2;
  }

  submitIncomplete() {
    if (!this.ignoreHavingTime && this.counter > 5 * 60 * 1000) {
      this.showHavingTime = true;
    } else {
      this.testComplete();
    }
    this.showIncomplete = false;
  }

  submitHavingTime() {
    if (
      !this.ignoreIncomplete &&
      Object.keys(this.testSubmission.submitData).length < this.testContent.questions.length
    ) {
      this.showIncomplete = true;
    } else {
      this.testComplete();
    }
    this.showHavingTime = false;
  }

  goToResult() {
    this.router.navigate([this.paths.mockTestReview.path.replace(':id', this.mockTestId)]);
  }

  goToReview() {
    this.router.navigate([this.paths.mockTestReview.path.replace(':id', this.mockTestId)]);
  }

  skip() {
    window.document.body.removeAttribute('style');
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }

  _getTopicNameFromId(topicId: string) {
    return this.lessonGroup.lessonCategories.filter(lC => lC.topic.id == topicId)[0].topic.name;
  }

  _getQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter(q => questionIds.includes(q.id));
  }

  _getTestQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter(q => questionIds.includes(q.id));
  }
}
