import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KnowledgeService } from '../../../infrastructure/knowledge/knowledge.service';
import {
  LessonCategory,
  LessonGroup
} from '../../../infrastructure/knowledge/lesson';
import { Program } from '../../../infrastructure/knowledge/program';
import { NavigationService } from '../../../infrastructure/navigation/navigation.service';
import { Submission } from '../../../infrastructure/test/submission';
import {
  TestContent,
  TestResult
} from '../../../infrastructure/test/test-content';
import { TestService } from '../../../infrastructure/test/test.service';
import { UserService } from '../../../infrastructure/user/user.service';
import { AppPath } from '../../routes';

@Component({
  selector: 'student-diagnostic-test',
  templateUrl: './diagnostic-test.component.html',
  styleUrls: ['./diagnostic-test.component.scss'],
})
export class DiagnosticTestComponent implements OnInit {
  paths: AppPath;
  selectedProgram: Program;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private testService: TestService,
    navService: NavigationService,
    userService: UserService,
    knowledgeService: KnowledgeService
  ) {
    this.paths = navService.paths;
    this.userType = userService.getUserType();
    this.selectedProgram = knowledgeService.getSelectedProgram();
  }

  @HostBinding('class') class = 'h-full';

  progress = 0;
  isTitleHidden = false;
  testContent!: TestContent;
  submission!: Submission;
  isTest = false;
  testResult!: TestResult;
  reviewRenderObject: any[] = [];
  resultRenderObject: any[] = [];
  lessonGroup!: LessonGroup;
  userType!: string;
  isSubmitting = false;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isTest = params['test'] ? params['test'] === 'true' : false;
    });
    this.submission = new Submission();
    this.testService.getDiagnosticTest(this.selectedProgram).subscribe({
      next: (value) => {
        this.testContent = value;
        this.submission.testId = this.testContent.id;
      },
      complete: () => {
        this.testContent.questions.map((question) => {
          question.answers.map((answer, j) => {
            if (j === 0) this.submission.submitData[question.id] = answer.id;
          });
        });
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
      },
    });
  }

  testComplete() {
    this.isSubmitting = true;
    this.submission.end = new Date();
    this.testService.submitTest(this.submission).subscribe({
      next: (result) => {
        this.testResult = result;
      },
      complete: () => {
        const topicWrongQuestions = this.testResult.result.topicWrongQuestions;
        const selectedAnswers = this.testResult.review.selectedAnswers;
        const rightAnswers = this.testResult.review.rightAnswers;
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
            this.testResult.result.maxScore[catId];
          return {
            name: this.lessonGroup.lessonCategories.find(
              (lG) => lG.category.id == catId
            )?.category.name,
            score: Math.round(
              (this.testResult.result.categories[catId] * 100) /
              totalQuestionOfCategory
            ),
          };
        });
      },
    });
  }

  onScroll(e: Event) {
    if (e.target !== null && e.target) {
      const scrolltop = (<HTMLDivElement>e.target).scrollTop;
      this.isTitleHidden = scrolltop > 100;
    }
  }

  updateProgress(nextProgress: number) {
    this.progress = nextProgress;
  }

  updateSubmission(nextSubmission: Submission) {
    this.submission.submitData = nextSubmission.submitData;
  }

  skipTest() {
    this.testService.skipTest().subscribe({
      next: (value) => {
        if (value === true) this.router.navigate([this.paths.learningPath]);
      },
    });
  }
  _getTopicNameFromId(topicId: string) {
    return this.lessonGroup.lessonCategories.filter(
      (lC) => lC.topic.id == topicId
    )[0].topic.name;
  }

  _getQuestionsFromIds(questionIds: string[]) {
    return this.testContent.questions.filter((q) => questionIds.includes(q.id));
  }
}
