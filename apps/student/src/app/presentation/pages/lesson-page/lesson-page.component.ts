import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KnowledgeService } from '@infrastructure/knowledge/knowledge.service';
import { Lesson } from '@infrastructure/knowledge/lesson';
import { LessonService } from '@infrastructure/knowledge/lesson.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { TestService } from '@infrastructure/test/test.service';
import { TrackingLessonComponent } from '@presentation/share-components/tracking/tracking-lesson.component';
import { ExerciseContentComponent, QuestionsProgressComponent } from '@share-components';
import { SafeHtmlPipe } from '@share-pipes';
import { Exercise, Progress, Question, QuestionReview, Submission } from '@share-utils/data';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExerciseContentComponent,
    QuestionsProgressComponent,
    MatTooltipModule,
    SafeHtmlPipe,
    TrackingLessonComponent,
  ],
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit {
  paths = inject(NavigationService).paths;
  knowledgeService = inject(KnowledgeService);
  learningGoal = this.knowledgeService.getSelectedLearningGoal();
  lessonService = inject(LessonService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  testService = inject(TestService);
  loading = inject(LoadingOverlayService);

  exercise = Exercise.empty();
  submission = new Submission();
  showIncomplete = false;
  ignoreIncomplete = false;
  lessonId = '';
  question = Question.empty();
  questionReview: QuestionReview | null = null;
  progress = Progress.from(0, 100);
  progressStr = '';
  showHint = false;
  lesson: Lesson = Lesson.empty();
  showComplete = false;
  isSubmitting = false;
  // currentForm!: HTMLFormElement;
  isCompleted = false;
  isOutOfSubscription = false;
  currentTestIndex = 0;

  @ViewChild('exerciseElm') exerciseElm!: ElementRef;
  @ViewChild('scrollTopElm') scrollTopElm!: ElementRef;

  ngOnInit(): void {
    this.loading.show();
    this.lessonId = this.route.snapshot.params['id'];
    this.lessonService.getDetail(this.lessonId).subscribe({
      next: result => {
        this.lesson = result.lessonCategories[0].lessons[0];
      },
    });
    this._getQuestion();
  }

  _getQuestion() {
    this.isSubmitting = true;
    this.testService.getExercise(this.route.snapshot.params['id']).subscribe({
      next: (exercise: Exercise) => {
        this.exercise = exercise;
        this.question = exercise.questions[0];
        this.progress.value = exercise.progress ?? 0;
        this.progressStr = (exercise.progress ?? 0).toFixed(2);
        this.loading.hide();
        setTimeout(() => {
          this.scrollTopElm.nativeElement.scrollTop = 0;
          this.scrollTopElm.nativeElement.scrollLeft = 0;
          this.isSubmitting = false;
        }, 2000);
      },
      error: e => {
        console.log(e);
        this.loading.hide();
        if (e.error_code == 'NotFound') {
          this.progress.value = 100;
          this.progressStr = '100.00';
          this.showComplete = true;
        } else if (e.error_code == 'OutOfSubscription') {
          this.isOutOfSubscription = true;
        }
        this.isSubmitting = false;
      },
    });
  }

  // updateProgress(nextProgress: Progress) {
  //   this.progress = nextProgress;
  // }

  updateSubmission(nextSubmission: Submission) {
    this.submission.submitData = nextSubmission.submitData;
  }

  testComplete() {
    if (this.isSubmitting) return;
    const records: HTMLFormElement[] = this.exerciseElm.nativeElement.querySelectorAll('form');
    const data = new FormData(records[0]);
    const result = data.get('objective_type_select');
    console.log(result);
    if (!this.submission.hasAnswer(this.exercise.questions[0].id)) {
      this.showIncomplete = true;
      return;
    } else {
      this.isSubmitting = true;
      console.log('testComplete');
      // this.currentForm.querySelectorAll('input[type="radio"]').forEach((input, index) => {
      //   input.setAttribute('disabled', 'disabled');
      // });
      this.lessonService.submitExercise(this.lessonId, this.submission).subscribe({
        next: result => {
          console.log(result.result[0].answer_status);
          this.progress.value = result['lesson_percentage'];
          this.progressStr = (result['lesson_percentage'] as number).toFixed(2);
          this.questionReview = QuestionReview.fromJson(result['result'][0]);
          if (result['lesson_percentage'] == 100) {
            this.isCompleted = true;
          }
          this.isSubmitting = false;
          this.scrollTopElm.nativeElement.scrollTop = 0;
          this.scrollTopElm.nativeElement.scrollLeft = 0;
        },
        error: (e: any) => {
          console.log(e);
          this.isSubmitting = false;
        },
      });
    }
  }

  nextQuestion() {
    if (this.isCompleted) {
      this.showComplete = true;
      return;
    }
    // this.currentForm.querySelectorAll('input[type="radio"]').forEach(input => {
    //   input.removeAttribute('disabled');
    // });
    // this.currentForm.reset();
    this.questionReview = null;
    this._getQuestion();
  }

  submitIncomplete() {
    this.testComplete();
    this.showIncomplete = false;
  }
}
