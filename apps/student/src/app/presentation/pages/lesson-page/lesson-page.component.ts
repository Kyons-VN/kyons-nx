import {
  Component,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'lodash';
import { interval, Subscription } from 'rxjs';
import { Lesson, LessonGroup } from '../../../infrastructure/knowledge/lesson';
import { LessonService } from '../../../infrastructure/knowledge/lesson.service';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { Submission } from '../../../infrastructure/test/submission';
import {
  TestContent,
  TestResult
} from '../../../infrastructure/test/test-content';
import { TestService } from '../../../infrastructure/test/test.service';
import { TutorService } from '../../../infrastructure/tutor/tutor.service';
import { UserService } from '../../../infrastructure/user/user.service';
import { AppPath } from '../../routes';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel
} from '../../share-components/confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'h-full';
  paths: AppPath;
  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private tutorService: TutorService,
    public dialog: MatDialog,
    private testService: TestService,
    navService: NavigationService,
    userService: UserService
  ) {
    this.paths = navService.paths;
    this.userType = userService.getUserType();
  }

  selectedLessonIndex = 0;

  selectedLPDId = '';
  selectedLessonContent = '';
  hide: { [lCIndex: number]: any } = {};
  confirm = false;
  lessonGroupId!: string;
  lessonGroup!: LessonGroup;
  tabIndex = 0;
  testProgress = 0;
  exerciseProgress = 0;
  testContent!: TestContent;
  exerciseContent!: TestContent;
  testSubmission!: Submission;
  exerciseSubmission!: Submission;
  testResult: TestResult | undefined;
  exerciseResult: TestResult | undefined;
  firstLessonId = '';
  lastLessonId = '';
  lCIndex = 0;
  hideMenuSM = false;
  selectedLPDName = '';
  waiting = false;
  ready = false;
  meetingUrl = '';
  complete = false;

  lessonIdsList: string[] = [];
  idToIndexMap!: { id: string; index: number };
  lessonsList: Lesson[] = [];
  selectedLesson!: Lesson;

  subscription!: Subscription;
  interval!: Subscription;

  exerciseReviewRenderObject: any[] = [];
  exerciseResultRenderObject: any[] = [];
  testReviewRenderObject: any[] = [];
  testResultRenderObject: any[] = [];
  userType: string;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.tabIndex != 0) return;
    if (event.key == 'ArrowLeft') {
      this.pre();
    } else if (event.key == 'ArrowRight') {
      this.next();
    }
  }

  ngOnInit(): void {
    this.lessonGroupId = this.route.snapshot.paramMap.get('id') ?? '';
    this.subscription = this.lessonService
      .getDetail(this.lessonGroupId)
      .subscribe({
        next: (lessonGroup: LessonGroup) => {
          this.lessonGroup = lessonGroup;
          this.lessonsList = this.lessonGroup.lessonCategories
            .map((lessonCat) => lessonCat.lessons)
            .reduce((acc, next) => acc.concat(next));
          this.lessonIdsList = this.lessonsList.map((lesson) => lesson.id);
          this.loadContent(0);
        },
      });
    this.testSubmission = new Submission();
    this.exerciseSubmission = new Submission();
    this.testService.getTest(this.lessonGroupId).subscribe({
      next: (value) => {
        if (value.done == true) this.complete = true;
        this.testContent = value;
        this.testSubmission.testId = value.id;
      },
      complete: () => {
        if (!this.complete) return;
        this.testService.getTestResult(this.lessonGroupId).subscribe({
          next: (value) => {
            this.testResult = value;
          },
          complete: () => {
            const topicWrongQuestions =
              this.testResult?.result.topicWrongQuestions ?? {};
            const selectedAnswers =
              this.testResult?.review.selectedAnswers ?? [];
            const rightAnswers = this.testResult?.review.rightAnswers ?? [];
            this.testReviewRenderObject = Object.keys(topicWrongQuestions).map(
              (topicId) => {
                const questions = this._getTestQuestionsFromIds(
                  topicWrongQuestions[topicId]
                ).map((question) => {
                  return {
                    content: question.content,
                    selected: question.answers.filter((answer) =>
                      selectedAnswers.includes(answer.id)
                    )[0].content,
                    right: question.answers.filter((answer) =>
                      rightAnswers.includes(answer.id)
                    )[0].content,
                  };
                });
                return {
                  topic: this._getTopicNameFromId(topicId),
                  questions: questions,
                };
              }
            );
            this.testResultRenderObject = Object.keys(
              this.testResult?.result.categories ?? []
            ).map((catId) => {
              const totalQuestionOfCategory =
                this.testResult?.result.maxScore[catId] ?? 0;
              return {
                name: this.lessonGroup.lessonCategories.find(
                  (lG) => lG.category.id == catId
                )?.category.name,
                score: Math.round(
                  ((this.testResult?.result.categories[catId] ?? 0) * 100) /
                  totalQuestionOfCategory
                ),
              };
            });
          },
        });
      },
    });
    this.testService.getExercise(this.lessonGroupId).subscribe({
      next: (value) => {
        this.exerciseContent = value;
        this.exerciseSubmission.testId = value.id;
      },
    });
  }

  reset(): void {
    this.testProgress = 0;
    this.exerciseProgress = 0;
  }

  requestTutor(learningPointId: string) {
    const message = 'Yêu cầu gia sư trợ giúp?';
    const dialogData = new ConfirmDialogModel('Xác nhận', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
      minWidth: '300px',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.confirm = dialogResult;
      if (!dialogResult) return;
      this.tutorService.requestTutor(learningPointId).subscribe({
        next: (sessionId: string) => {
          this.waitingTutor(sessionId);
        },
      });
    });
  }

  waitingTutor(sessionId: string) {
    this.waiting = true;
    const requestInterval = interval(5000);
    const subscription = requestInterval.subscribe((n) => {
      console.log(`It's been ${n + 1} times since subscribing!`);
      this.tutorService.checkSessionStatus(sessionId).subscribe({
        next: ({ status, tutor_info }: { status: string; tutor_info: any }) => {
          console.log(status, tutor_info);
          if (status === 'PROCESSING') {
            subscription.unsubscribe();
            this.tutorReady(tutor_info.meeting_url);
          }
        },
        error: () => {
          this.waiting = false;
          subscription.unsubscribe();
        },
      });
    });
  }

  tutorReady(meetingUrl: string) {
    this.waiting = false;
    this.meetingUrl = meetingUrl;
    this.ready = true;
  }

  updateTestProgress(nextProgress: number) {
    this.testProgress = nextProgress;
  }
  updateExerciseProgress(nextProgress: number) {
    this.exerciseProgress = nextProgress;
  }

  updateTestSubmission(nextSubmission: Submission) {
    this.testSubmission.submitData = nextSubmission.submitData;
  }

  updateExerciseSubmission(nextSubmission: Submission) {
    this.exerciseSubmission.submitData = nextSubmission.submitData;
  }

  refresh(): void {
    window.location.reload();
  }

  testComplete() {
    this.testSubmission.end = new Date();
    this.testService.submitTest(this.testSubmission).subscribe({
      next: (result) => {
        this.testResult = result;
        // const topicWrongQuestions = this.testResult.result.topicWrongQuestions;
        // const selectedAnswers = this.testResult.review.selectedAnswers;
        // const rightAnswers = this.testResult.review.rightAnswers;
        // this.testReviewRenderObject = Object.keys(topicWrongQuestions).map((topicId) => {
        //   const questions = this._getTestQuestionsFromIds(topicWrongQuestions[topicId]).map((question) => {
        //     return {
        //       'content': question.content,
        //       'selected': question.answers.filter((answer) => selectedAnswers.includes(answer.id))[0].content,
        //       'right': question.answers.filter((answer) => rightAnswers.includes(answer.id))[0].content,
        //     };
        //   })
        //   return {
        //     'topic': this._getTopicNameFromId(topicId),
        //     'questions': questions,
        //   };
        // })
      },
      complete: () => {
        const topicWrongQuestions =
          this.testResult?.result.topicWrongQuestions ?? {};
        const selectedAnswers = this.testResult?.review.selectedAnswers ?? [];
        const rightAnswers = this.testResult?.review.rightAnswers ?? [];
        this.testReviewRenderObject = Object.keys(topicWrongQuestions).map(
          (topicId) => {
            const questions = this._getTestQuestionsFromIds(
              topicWrongQuestions[topicId]
            ).map((question) => {
              return {
                content: question.content,
                selected: question.answers.filter((answer) =>
                  selectedAnswers.includes(answer.id)
                )[0].content,
                right: question.answers.filter((answer) =>
                  rightAnswers.includes(answer.id)
                )[0].content,
              };
            });
            return {
              topic: this._getTopicNameFromId(topicId),
              questions: questions,
            };
          }
        );
        this.testResultRenderObject = Object.keys(
          this.testResult?.result.categories ?? {}
        ).map((catId) => {
          const totalQuestionOfCategory =
            this.testResult?.result.maxScore[catId] ?? 0;
          return {
            name: this.lessonGroup.lessonCategories.find(
              (lG) => lG.category.id == catId
            )?.category.name,
            score: Math.round(
              ((this.testResult?.result.categories[catId] ?? 0) * 100) /
              totalQuestionOfCategory
            ),
          };
        });
      },
    });
  }

  exerciseComplete() {
    this.exerciseSubmission.end = new Date();
    this.testService.submitTest(this.exerciseSubmission).subscribe({
      next: (result) => {
        this.exerciseResult = result;
        // const topicWrongQuestions = this.exerciseResult.result.topicWrongQuestions;
        // const selectedAnswers = this.exerciseResult.review.selectedAnswers;
        // const rightAnswers = this.exerciseResult.review.rightAnswers;
        // this.exerciseReviewRenderObject = Object.keys(topicWrongQuestions).map((topicId) => {
        //   const questions = this._getExerciseQuestionsFromIds(topicWrongQuestions[topicId]).map((question) => {
        //     return {
        //       'content': question.content,
        //       'selected': question.answers.filter((answer) => selectedAnswers.includes(answer.id))[0].content,
        //       'right': question.answers.filter((answer) => rightAnswers.includes(answer.id))[0].content,
        //     };
        //   })
        //   return {
        //     'topic': this._getTopicNameFromId(topicId),
        //     'questions': questions,
        //   };
        // });
      },
      complete: () => {
        const topicWrongQuestions =
          this.exerciseResult?.result.topicWrongQuestions ?? {};
        const selectedAnswers =
          this.exerciseResult?.review.selectedAnswers ?? [];
        const rightAnswers = this.exerciseResult?.review.rightAnswers ?? [];
        this.exerciseReviewRenderObject = Object.keys(topicWrongQuestions).map(
          (topicId) => {
            const questions = this._getExerciseQuestionsFromIds(
              topicWrongQuestions[topicId]
            ).map((question) => {
              return {
                content: question.content,
                selected: question.answers.filter((answer) =>
                  selectedAnswers.includes(answer.id)
                )[0].content,
                right: question.answers.filter((answer) =>
                  rightAnswers.includes(answer.id)
                )[0].content,
              };
            });
            return {
              topic: this._getTopicNameFromId(topicId),
              questions: questions,
            };
          }
        );
        this.exerciseResultRenderObject = Object.keys(
          this.exerciseResult?.result.categories ?? 0
        ).map((catId) => {
          const totalQuestionOfCategory =
            this.exerciseResult?.result.maxScore[catId] ?? 0;
          return {
            name: this.lessonGroup.lessonCategories.find(
              (lG) => lG.category.id == catId
            )?.category.name,
            score: Math.round(
              ((this.exerciseResult?.result.categories[catId] ?? 0) * 100) /
              totalQuestionOfCategory
            ),
          };
        });
      },
    });
  }

  // loadContent(lCIndex: number, lPDIndex: number) {
  //   this.lCIndex = lCIndex;
  //   this.lPDIndex = lPDIndex;
  //   this.selectedLPDContent = this.lesson.learningPoints[lCIndex].lPDs[lPDIndex].content;
  //   this.selectedLPDId = this.lesson.learningPoints[lCIndex].lPDs[lPDIndex].id;
  //   this.selectedLPDName = this.lesson.learningPoints[lCIndex].name + ' / Cấp độ ' + (lPDIndex + 1);
  // }

  loadContent(lessonIndex: number) {
    this.selectedLessonIndex = lessonIndex;
    this.selectedLesson = this.lessonsList[lessonIndex];
    this.selectedLessonContent = this.selectedLesson.content;
  }

  loadContentFromLessonId(lessonId: string) {
    const lessonIndex = this.lessonIdsList.indexOf(lessonId);
    this.loadContent(lessonIndex);
  }

  pre() {
    if (this.selectedLessonIndex > 0)
      this.loadContent(this.selectedLessonIndex - 1);
  }

  next() {
    if (this.selectedLessonIndex < this.lessonIdsList.length - 1)
      this.loadContent(this.selectedLessonIndex + 1);
  }

  redoExercise() {
    this.exerciseResult = undefined;
  }

  ngOnDestroy(): void {
    if (this.interval !== undefined) this.interval.unsubscribe();
  }

  closeTutorPopup() {
    delay(() => {
      this.ready = false;
    }, 1000);
  }

  _getTopicNameFromId(topicId: string) {
    return this.lessonGroup.lessonCategories.filter(
      (lC) => lC.topic.id == topicId
    )[0].topic.name;
  }

  _getExerciseQuestionsFromIds(questionIds: string[]) {
    return this.exerciseContent.questions.filter((q) =>
      questionIds.includes(q.id)
    );
  }

  _getTestQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter((q) => questionIds.includes(q.id));
  }
}
