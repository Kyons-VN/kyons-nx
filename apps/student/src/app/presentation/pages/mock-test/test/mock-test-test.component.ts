import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import LearningGoal from '@infrastructure/knowledge/learning-goal';
import { LessonCategory, LessonGroup } from '@infrastructure/knowledge/lesson';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { Submission } from '@infrastructure/test/submission';
import { TestContent, TestResult } from '@infrastructure/test/test-content';
import { TestService } from '@infrastructure/test/test.service';
import { AppPath } from '@presentation/routes';
import { Progress } from '@presentation/share-components/questions-progress/questions-progress.component';

@Component({
  templateUrl: './mock-test-test.component.html',
  styleUrls: ['./mock-test-test.component.scss'],
})
export class MockTestTestComponent implements OnInit {
  paths: AppPath;
  selectedProgram;
  constructor(private route: ActivatedRoute,
    navService: NavigationService, private testService: TestService,
    private loading: LoadingOverlayService,
    knowledgeService: KnowledgeService,
  ) {
    this.paths = navService.paths;
    this.selectedProgram = knowledgeService.getSelectedProgram();
  }

  learningGold!: LearningGoal;
  progress = new Progress();
  isTitleHidden = false;
  testContent!: TestContent;
  submission = new Submission();
  isTest = false;
  testResult!: TestResult;
  reviewRenderObject: any[] = [];
  resultRenderObject: any[] = [];
  lessonGroup!: LessonGroup;
  userType!: string;
  isSubmitting = false;
  currentIndex = 0;
  progressString = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isTest = params['test'] ? params['test'] === 'true' : false;
    });
    const learningGoalId = this.route.snapshot.paramMap.get('id') ?? '';
    const learningGoalName = this.route.snapshot.paramMap.get('name') ?? '';
    this.learningGold = LearningGoal.fromJson({ id: learningGoalId, name: learningGoalName });
    this.testService.getMockTest(this.learningGold.id).subscribe({
      next: (value) => {
        this.testContent = value;
        this.submission.testId = this.testContent.id;
        this.progress.label = `0/${value.questions.length}`;
      },
      complete: () => {
        if (this.isTest) {
          this.testContent.questions.map((question) => {
            question.answers.map((answer, j) => {
              if (j === 0) this.submission.submitData[question.id] = answer.id;
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
      },
    });
  }

  updateProgress(nextProgress: Progress) {
    this.progress = nextProgress;
  }

  updateSubmission(nextSubmission: Submission) {
    this.submission.submitData = nextSubmission.submitData;
  }

  round(value: number) {
    return Math.round(value);
  }

  testComplete() {
    this.isSubmitting = true;
    this.loading.show();
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
        this.loading.hide();
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