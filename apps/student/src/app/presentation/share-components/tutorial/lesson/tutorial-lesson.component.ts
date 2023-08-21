import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { LearningGoal } from '@infrastructure/knowledge/learning-goal';
import { Lesson } from '@infrastructure/knowledge/lesson';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { TutorialService } from '@infrastructure/tutorials/tutorial-service';
import { TrackingLessonComponent } from '@presentation/share-components/tracking/tracking-lesson.component';
import {
  InputRadioComponent,
  QuestionsProgressComponent,
  TestContentComponent,
  TestContentHtmlComponent,
  TutorialComponent,
} from '@share-components';
import { OrderBySAPipe, SafeHtmlPipe } from '@share-pipes';
import {
  Exercise,
  Progress,
  Question,
  QuestionReviewHtml,
  Submission,
  TestResult,
  answerPrefixes,
} from '@share-utils/data';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TestContentHtmlComponent,
    QuestionsProgressComponent,
    MatTooltipModule,
    SafeHtmlPipe,
    TrackingLessonComponent,
    TutorialComponent,
    TestContentComponent,
    InputRadioComponent,
    OrderBySAPipe,
  ],
  templateUrl: './tutorial-lesson.component.html',
  styleUrls: ['./tutorial-lesson.component.scss'],
})
export class TutorialLessonComponent implements OnInit {
  paths = inject(NavigationService).paths;
  knowledgeService = inject(KnowledgeService);
  lessonService = inject(LessonService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);
  tutorialService = inject(TutorialService);

  exercise = Exercise.empty();
  submission = new Submission();
  showIncomplete = false;
  ignoreIncomplete = false;
  lessonId = '';
  question = Question.empty();
  questionReview: QuestionReviewHtml | null = null;
  progress = Progress.from(0, 100);
  progressStr = '';
  showHint = false;
  lesson: Lesson = Lesson.empty();
  showComplete = false;
  isSubmitting = false;
  currentForm!: HTMLFormElement;
  isCompleted = false;
  showTutorial = false;
  learningGoal!: LearningGoal;
  tutorialPart = 0;
  showResult = false;
  result!: TestResult;
  currentTestIndex = 0;
  answerPrefixes = answerPrefixes;
  questionElm!: HTMLElement;

  @ViewChild('exerciseElm') exerciseElm!: ElementRef;
  @ViewChild('scrollTopElm') scrollTopElm!: ElementRef;
  // @ViewChild('questionElm') questionElm!: ElementRef;

  ngOnInit(): void {
    this.loading.show();
    this.lessonId = this.route.snapshot.params['id'];
    // if (this.lessonId == 'tutorial') {
    this.lesson = this.tutorialService.getDetail().lessonCategories[0].lessons[0];
    this.exercise = this.tutorialService.getExercise();
    this._initSubmission();
    this.learningGoal = this.tutorialService.getSelectedLearningGoal();
    const answerId = this.exercise.questions[0].answers[1].id;
    setTimeout(() => {
      this.questionElm = document.getElementById(`atutorial-${answerId}`) as HTMLElement;
      this.questionElm.setAttribute('data-tooltip-content', 'Nhấp vào đây để chọn đáp án');
      this.showTutorial = true;
      this.loading.hide();
    }, 200);
    return;
    // } else {
    // this.learningGoal = this.knowledgeService.getSelectedLearningGoal();
    // this.lessonService.getDetail(this.lessonId).subscribe({
    //   next: result => {
    //     this.lesson = result.lessonCategories[0].lessons[0];
    //   },
    // });
    // this._getQuestion();
    // }
  }

  testComplete = () => {
    this.tutorialPart++;
    const result: any = this.tutorialService.submitExercise();
    this.progress.value = result['lesson_percentage'];
    this.progressStr = (result['lesson_percentage'] as number).toFixed(2);
    this.questionReview = QuestionReviewHtml.fromJson(result['result'][0]);
    this.showResult = true;
    setTimeout(() => {
      this.tutorialPart++;
    }, 1000);
  };

  _initSubmission() {
    this.question = this.exercise.questions[0];
    this.progress.value = this.exercise.progress ?? 0;
    this.progressStr = (this.exercise.progress ?? 0).toFixed(2);
    this.loading.hide();
    setTimeout(() => {
      this.scrollTopElm.nativeElement.scrollTop = 0;
      this.scrollTopElm.nativeElement.scrollLeft = 0;
      this.isSubmitting = false;
    }, 2000);
  }

  nextQuestion() {
    if (this.isCompleted) {
      this.showComplete = true;
      return;
    }
    this.currentForm.querySelectorAll('input[type="radio"]').forEach(input => {
      input.removeAttribute('disabled');
    });
    this.currentForm.reset();
  }

  submitIncomplete() {
    this.showIncomplete = false;
  }

  updateSubmitData(questionId: string, answerId: string) {
    this.submission.submitData[questionId] = answerId;
  }

  empty = () => {
    //
  };

  next = () => {
    this.tutorialPart++;
    if (this.tutorialPart == 2) {
      this.submission.submitData[this.question.id] = this.question.answers[1].id;
    }
    if (this.tutorialPart == 5) {
      this.showComplete = true;
    }
  };

  skip() {
    window.document.body.removeAttribute('style');
    this.showTutorial = false;
    this.router.navigate([this.paths.home.path], { replaceUrl: true });
  }
}
