import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { LessonCategory, LessonGroup } from '@infrastructure/knowledge/lesson';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { Submission } from '@infrastructure/test/submission';
import { TestContent, TestResult } from '@infrastructure/test/test-content';
import { TestService } from '@infrastructure/test/test.service';
import { AppPaths } from '@presentation/routes';
import { Progress } from '@presentation/share-components/questions-progress/questions-progress.component';
import { fromEvent, Observable } from 'rxjs';

@Component({
  templateUrl: './mock-test-test.component.html',
  styleUrls: ['./mock-test-test.component.scss'],
})
export class MockTestTestComponent implements OnInit {
  paths: AppPaths;
  selectedProgram;
  source: Observable<KeyboardEvent>;
  constructor(private route: ActivatedRoute,
    private router: Router,
    navService: NavigationService, private testService: TestService,
    private loading: LoadingOverlayService,
    knowledgeService: KnowledgeService,
    private clipboard: Clipboard,
  ) {
    this.paths = navService.paths;
    this.selectedProgram = knowledgeService.getSelectedProgram();
    this.source = fromEvent<KeyboardEvent>(document, 'keyup');
  }

  learningGoal!: LearningGoal;
  testProgress = new Progress();
  isTitleHidden = false;
  testContent!: TestContent;
  testSubmission = new Submission();
  isTest = false;
  testResult: TestResult | undefined;
  reviewRenderObject: any[] = [];
  resultRenderObject: any[] = [];
  lessonGroup!: LessonGroup;
  userType!: string;
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isTest = params['test'] ? params['test'] === 'true' : false;
    });
    const learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    const learningGoalName = this.route.snapshot.paramMap.get('name') ?? '';
    this.learningGoal = LearningGoal.fromJson({ id: learningGoalId, name: learningGoalName });
    this.testService.getMockTest(this.learningGoal.id).subscribe({
      next: (value) => {
        if (value.done == true) this.complete = true;
        this.testContent = value;
        this.testSubmission.testId = this.testContent.id;
        this.testProgress = Progress.from(0, value.questions.length);
      },
      complete: () => {
        if (this.complete) {

          alert('B??i ki???m tra ???? l??m r???i');
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
        }
        else {
          if (this.isTest) {
            this.testContent.questions.map((question) => {
              question.answers.map((answer, j) => {
                if (j === 0) this.testSubmission.submitData[question.id] = answer.id;
              });
            });
          }
          const lessonInfos = this.testContent.questions.map(
            (question) =>
              new LessonCategory({
                category: question.category,
                topic: question.topic,
                lessons: [],
              })
          );
          const lessonInfosMap = new Map(
            lessonInfos.map((question) => {
              return [question.topic.id, question];
            })
          );
          const lessonInfosMapArray: LessonCategory[] = [
            ...lessonInfosMap.values(),
          ];

          this.lessonGroup = new LessonGroup({
            id: '',
            lessonCategories: lessonInfosMapArray,
          });
        }
      },
    });
  }

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
    this.isSubmitting = true;
    this.loading.show();
    this.testSubmission.end = new Date();
    this.testService.submitTest(this.testSubmission).subscribe({
      next: (result) => {
        this.testResult = result;
        const topicWrongQuestions = this.testResult.result.topicWrongQuestions;
        const selectedAnswers = this.testResult.review.selectedAnswers;
        const rightAnswers = this.testResult.review.rightAnswers;
        const answerResult = this.testResult.result;
        this.reviewRenderObject = Object.keys(topicWrongQuestions).map(
          (topicId) => {
            const questions = this._getQuestionsFromIds(
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
        this.resultRenderObject = Object.keys(
          this.testResult.result.categories
        ).map((catId, index) => {
          const totalQuestionOfCategory =
            answerResult.maxScore[catId];
          return {
            name: this.lessonGroup.lessonCategories.find(
              (lG) => lG.category.id == catId
            )?.category.name,
            score: Math.round(
              (answerResult.categories[catId] * 100) /
              totalQuestionOfCategory
            ),
          };
        });
        if (this.testResult.canShare()) this.shareLink = this.testResult.getShareableMockTestLink();
        this.loading.hide();
      },
      error: (err) => {
        // TODO: Define error resposes
        console.log(err);
        this.hasError = 'C?? l???i, vui l??ng th??? l???i';
        this.loading.hide();
      },
    });
  }

  copy() {
    this.clipboard.copy(this.shareLink);
    this.isCopied = true;
    setTimeout(() => { this.isCopied = false }, 1000)
  }

  _getTopicNameFromId(topicId: string) {
    return this.lessonGroup.lessonCategories.filter(
      (lC) => lC.topic.id == topicId
    )[0].topic.name;
  }

  _getQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter((q) => questionIds.includes(q.id));
  }

  _getTestQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter((q) => questionIds.includes(q.id));
  }
}