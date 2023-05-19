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
import { QuestionsProgressComponent, TestContentHtmlComponent } from '@share-components';
import { ExerciseHtml, Progress, QuestionHtml, QuestionReviewHtml, SubmissionHtml } from '@share-utils/data';
import { SafeHtmlPipe } from 'dist/libs/share-pipes';

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

  exercise = ExerciseHtml.empty();
  submission = new SubmissionHtml();
  showIncomplete = false;
  ignoreIncomplete = false;
  lessonId = '';
  question = QuestionHtml.empty();
  questionReview: QuestionReviewHtml | null = null;
  progress = Progress.from(0, 100);
  progressStr = '';
  showHint = false;
  lesson: Lesson = Lesson.empty();
  showComplete = false;
  isSubmitting = false;
  currentForm!: HTMLFormElement;

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
    this.testService.getExercise(this.route.snapshot.params['id']).subscribe({
      next: (exercise: ExerciseHtml) => {
        this.exercise = exercise;
        this.question = exercise.questions[0];
        this.progress.value = exercise.progress ?? 0;
        this.progressStr = (exercise.progress ?? 0).toFixed(2);
        this.loading.hide();
        setTimeout(() => {
          console.log('setTimeout');
          const records: HTMLFormElement[] = this.exerciseElm.nativeElement.querySelectorAll('form');
          records.forEach((form, index) => {
            this.exercise.questions[index].form = form;
            form.addEventListener('click', () => {
              this.currentForm = form;
              // const results: string[][] = [];
              // for (const form of records) {
              const data = new FormData(form);
              const result = data.get('objective_type_select');
              // typeof result == 'string' ? results.push([result]) : results.push([]);
              // }
              const questionId = this.exercise.questions[0].id;
              this.submission.reset();
              this.submission.submitData[questionId] = result?.toString() ?? '';
            });
          });
          this.scrollTopElm.nativeElement.scrollTop = 0;
        }, 100);
      },
      error: e => {
        console.log(e);
        this.loading.hide();
        if (e.error_code == 'NotFound') {
          this.progress.value = 100;
          this.progressStr = '100.00';
          this.showComplete = true;
        }
      },
    });
  }

  testComplete() {
    if (this.isSubmitting) return;
    if (!this.submission.hasAnswer(this.exercise.questions[0].id)) {
      this.showIncomplete = true;
      return;
    } else {
      this.isSubmitting = true;
      this.lessonService.submitExercise(this.lessonId, this.submission).subscribe({
        next: result => {
          console.log(result);
          this.progress.value = result['lesson_percentage'];
          this.progressStr = (result['lesson_percentage'] as number).toFixed(2);
          this.questionReview = QuestionReviewHtml.fromJson(result['result'][0]);
          if (result['lesson_percentage'] == 100) {
            this.showComplete = true;
          }
          this.isSubmitting = false;
          this.scrollTopElm.nativeElement.scrollTop = 0;
          this.currentForm.querySelectorAll('input[type="radio"]').forEach((input, index) => {
            input.setAttribute('disabled', 'disabled');
          });
        },
        error: (e: any) => {
          console.log(e);
          this.isSubmitting = false;
        },
      });
    }
  }

  nextQuestion() {
    this.questionReview = null;
    this._getQuestion();
  }

  submitIncomplete() {
    this.testComplete();
    this.showIncomplete = false;
  }
}
