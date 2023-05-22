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
import { TestService } from '@infrastructure/test/test.service';
import { LoadingComponent } from '@presentation/share-components/loading/loading.component';
// import { Progress } from '@presentation/share-components/questions-progress/questions-progress.component';
import { QuestionsProgressComponent, TestContentHtmlComponent } from '@share-components';
import { MockTestHtmlStatus, MockTestResult, Progress, SubmissionHtml, TestContentHtml } from '@share-utils/data';
import { Observable, fromEvent } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    TestContentHtmlComponent,
    CommonModule,
    QuestionsProgressComponent,
    MatTooltipModule,
    RouterModule,
    LoadingComponent,
  ],

  templateUrl: './mock-test-test.component.html',
  styleUrls: ['./mock-test-test.component.scss'],
})
export class MockTestTestComponent implements OnInit {
  paths = inject(NavigationService).paths;
  // selectedProgram;
  source!: Observable<KeyboardEvent>;
  elm = inject(ElementRef);
  route = inject(ActivatedRoute);
  router = inject(Router);
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  knowledgeService = inject(KnowledgeService);
  clipboard = inject(Clipboard);

  learningGoal = LearningGoal.empty();
  studentLearningGoal = StudentLearningGoal.empty();
  testProgress = new Progress();
  isTitleHidden = false;
  testContent = TestContentHtml.empty();
  testSubmission = new SubmissionHtml();
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
  counter = 90 * 60 * 1000;
  counterTime = new Date(this.counter);
  Math = Math;
  showIncomplete = false;
  showHavingTime = false;
  ignoreIncomplete = false;
  ignoreHavingTime = false;
  mockTestId!: string;

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
    this.learningGoal = this.knowledgeService.getSelectedLearningGoal();
    this.getMockTestHtml();
  }

  // ngAfterViewInit(): void {
  //   if (!this.testContentElm) return;
  // }

  getMockTestHtml() {
    if (!this.isPending) return;
    this.testService.getMockTestHtml(this.mockTestId).subscribe({
      next: value => {
        this.isPending = value.status == MockTestHtmlStatus.pending;
        if (this.isPending) {
          setTimeout(() => {
            this.getMockTestHtml();
          }, 5000);
          return;
        }
        if (value.done == true) this.complete = true;
        this.testContent = value;
        this.testSubmission.testId = this.testContent.id;
        this.testProgress = Progress.from(0, value.questions.length);
        this.testService.getMockTestResultHtml(this.mockTestId).subscribe({
          next: mockTest => {
            const duration = 90 * 60 * 1000;
            this.counter = mockTest.createdAt.getTime() + duration - Date.now();
            this.counterTime = new Date(this.counter);
            // setTimeout(() => {
            setInterval(() => {
              this.counter -= 1000;
              this.counterTime = new Date(this.counter);
              if (this.counter < 0) {
                this.ignoreHavingTime = true;
                this.ignoreIncomplete = true;
                this.testComplete();
              }
            }, 1000);
            // }, 2000);
            this.loading.hide();
          },
        });
      },
      error: err => {
        this.hasError = err.error_code;
        this.loading.hide();
      },
      complete: () => {
        if (this.complete) {
          alert('Bài kiểm tra đã làm rồi');
          this.router.navigate([this.paths.mockTest.path]);
          // this.testService.getTestResult('lesson', learningGoalId).subscribe({
          //   next: (value) => {
          //     this.testResult = value;
          //   },
          //   complete: () => {
          //     const topicWrongQuestions =
          //       this.testResult?.result.topicWrongQuestions ?? {};
          //     const selectedAnswers =
          //       this.testResult?.review.selectedAnswers ?? [];
          //     const rightAnswers = this.testResult?.review.rightAnswers ?? [];
          //     this.testReviewRenderObject = Object.keys(topicWrongQuestions).map(
          //       (topicId) => {
          //         const questions = this._getTestQuestionsFromIds(
          //           topicWrongQuestions[topicId]
          //         ).map((question) => {
          //           return {
          //             content: question.content,
          //             selected: question.answers.filter((answer) =>
          //               selectedAnswers.includes(answer.id)
          //             )[0].content,
          //             right: question.answers.filter((answer) =>
          //               rightAnswers.includes(answer.id)
          //             )[0].content,
          //           };
          //         });
          //         return {
          //           topic: this._getTopicNameFromId(topicId),
          //           questions: questions,
          //         };
          //       }
          //     );
          //     this.testResultRenderObject = Object.keys(
          //       this.testResult?.result.categories ?? []
          //     ).map((catId) => {
          //       const totalQuestionOfCategory =
          //         this.testResult?.result.maxScore[catId] ?? 0;
          //       return {
          //         name: this.lessonGroup.lessonCategories.find(
          //           (lG) => lG.category.id == catId
          //         )?.category.name,
          //         score: Math.round(
          //           ((this.testResult?.result.categories[catId] ?? 0) * 100) /
          //           totalQuestionOfCategory
          //         ),
          //       };
          //     });
          //   },
          // });
        } else {
          setTimeout(() => {
            const records: HTMLFormElement[] = this.testContentElm.nativeElement.querySelectorAll('form');
            Array.from(records).map((form, index) => {
              this.testContent.questions[index].form = form;
              form.addEventListener('click', () => {
                const results: string[][] = [];
                for (const form of records) {
                  const data = new FormData(form);
                  const result = data.get('objective_type_select');
                  if (typeof result == 'string') {
                    results.push([result]);
                  } else {
                    results.push([]);
                  }
                }
                const questionId = this.testContent.questions[this.currentTestIndex].id;
                this.testSubmission.submitData[questionId] = results[this.currentTestIndex][0];
                console.log(results[this.currentTestIndex][0]);
              });
            });
          }, 1000);
          // this.testContent.questions.map((question,i) => {
          //   question.formData =
          // });
          // if (this.isTest) {
          //   this.testContent.questions.map((question) => {
          //     question.answers.map((answer, j) => {
          //       if (j === 0) this.testSubmission.submitData[question.id] = answer.id;
          //     });
          //   });
          // }
          // const lessonInfos = this.testContent.questions.map(
          //   (question) =>
          //     new LessonCategory({
          //       category: question.category,
          //       topic: question.topic,
          //       lessons: [],
          //     })
          // );
          // const lessonInfosMap = new Map(
          //   lessonInfos.map((question) => {
          //     return [question.topic.id, question];
          //   })
          // );
          // const lessonInfosMapArray: LessonCategory[] = [
          //   ...lessonInfosMap.values(),
          // ];
          // this.lessonGroup = new LessonGroup({
          //   id: '',
          //   lessonCategories: lessonInfosMapArray,
          // });
        }
      },
    });
  }

  updateProgress(nextProgress: Progress) {
    this.testProgress = nextProgress;
  }

  updateSubmission(nextSubmission: SubmissionHtml) {
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
    const records: HTMLFormElement[] = this.testContentElm.nativeElement.querySelectorAll('form');
    const results: string[][] = [];
    Array.from(records).map((r, i) => {
      const data = new FormData(r);
      const result = data.get('objective_type_select');
      if (typeof result == 'string') {
        results.push([result]);
      } else {
        results.push(['5']);
      }
      const questionId = this.testContent.questions[i].id;
      this.testSubmission.submitData[questionId] = results[i][0];
      i++;
    });
    console.log(this.testSubmission.toJson());
    this.testSubmission.end = new Date();
    this.testService.submitTestHtml(this.testSubmission).subscribe({
      next: (result: any) => {
        this.knowledgeService.selectLearningGoal(this.learningGoal);
        this.loading.hide();
        this.router.navigate([this.paths.mockTestResult.path.replace(':id', this.mockTestId)]);
      },
      error: (err: any) => {
        // TODO: Define error resposes
        console.log(err);
        this.hasError = 'Có lỗi, vui lòng thử lại';
        this.loading.hide();
      },
    });
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
