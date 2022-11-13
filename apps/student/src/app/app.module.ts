import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharePipesModule } from '@kyonsvn/share-pipes';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DragScrollModule } from 'ngx-drag-scroll';
// import { KeysPipe } from '../../../../libs/share-pipes/keys.pipe';
// import { OrderByPipe } from '../../../../libs/share-pipes/order-by.pipe';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './infrastructure/auth/interceptor';
import { MaterialModule } from './material.module';
import { SvgModule } from './presentation/assets/svgs/svg/svg.component';
import { ClassProgramComponent } from './presentation/pages/class-program/class-program.component';
import { DiagnosticTestDecisionComponent } from './presentation/pages/diagnostic-test-decision/diagnostic-test-decision.component';
import { DiagnosticTestComponent } from './presentation/pages/diagnostic-test/diagnostic-test.component';
import { FinalExamComponent } from './presentation/pages/final-exam/final-exam.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { KnowledgeComponent } from './presentation/pages/knowledge/knowledge.component';
import { LearningPathComponent } from './presentation/pages/learning-path/learning-path.component';
import { LessonPageComponent } from './presentation/pages/lesson-page/lesson-page.component';
import { MockTestTestComponent } from './presentation/pages/mock-test/test/mock-test-test.component';
import { NewLessonPageComponent } from './presentation/pages/new-lesson-page/new-lesson-page.component';
import { PackagePageComponent } from './presentation/pages/package-page/package-page.component';
import { PageNotFoundComponent } from './presentation/pages/page-not-found/page-not-found.component';
import { ProfileComponent } from './presentation/pages/profile/profile.component';
import { RatingTutorComponent } from './presentation/pages/rating-tutor/rating-tutor.component';
import { SignInComponent } from './presentation/pages/sign-in/sign-in.component';
import { SignOutComponent } from './presentation/pages/sign-out/sign-out.component';
import { TestComponent } from './presentation/pages/test/test.component';
import { AppInputComponent } from './presentation/share-components/app-input/app-input.component';
import { IvyCarouselModule } from './presentation/share-components/carousel/carousel.module';
import { ConfirmDialogComponent } from './presentation/share-components/confirm-dialog/confirm-dialog.component';
import { InputRadioComponent } from './presentation/share-components/input-radio/input-radio.component';
import { LoadingComponent } from './presentation/share-components/loading/loading.component';
import { SubjectCardComponent } from './presentation/share-components/program-card/program-card.component';
import { QuestionsProgressComponent } from './presentation/share-components/questions-progress/questions-progress.component';
import { ScoreBarComponent } from './presentation/share-components/score-bar/score-bar.component';
import { TestContentComponent } from './presentation/share-components/test-content/test-content.component';
import { TestReviewComponent } from './presentation/share-components/test-review/test-review.component';
import { TopMenuComponent } from './presentation/share-components/top-menu/top-menu.component';
import { TrackingLessonComponent } from './presentation/share-components/tracking/tracking-lesson.component';
import { TrackingComponent } from './presentation/share-components/tracking/tracking.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    TopMenuComponent,
    SubjectCardComponent,
    ClassProgramComponent,
    PageNotFoundComponent,
    TestComponent,
    AppInputComponent,
    DiagnosticTestDecisionComponent,
    DiagnosticTestComponent,
    LearningPathComponent,
    QuestionsProgressComponent,
    LessonPageComponent,
    InputRadioComponent,
    SignOutComponent,
    ProfileComponent,
    KnowledgeComponent,
    RatingTutorComponent,
    ConfirmDialogComponent,
    TestContentComponent,
    TestReviewComponent,
    ScoreBarComponent,
    TrackingComponent,
    TrackingLessonComponent,
    NewLessonPageComponent,
    FinalExamComponent,
    LoadingComponent,
    PackagePageComponent,
    MockTestTestComponent,
    // Pipes
    // OrderByPipe,
    // KeysPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 50,
      space: -10,
      outerStrokeGradient: false,
      outerStrokeWidth: 10,
      outerStrokeColor: '#06A5FF',
      innerStrokeColor: '#F1F5F9',
      innerStrokeWidth: 10,
      titleFontSize: '36',
      subtitleFontSize: '24',
      animateTitle: true,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      clockwise: true,
      startFromZero: false,
      lazy: true,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SvgModule,
    IvyCarouselModule,
    SharePipesModule,
    DragScrollModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [MaterialModule, SvgModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
