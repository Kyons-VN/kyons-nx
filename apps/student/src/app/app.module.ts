import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharePipesModule } from '@kyonsvn/share-pipes';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DragScrollModule } from 'ngx-drag-scroll';
// import { KeysPipe } from '../../../../libs/share-pipes/keys.pipe';
// import { OrderByPipe } from '../../../../libs/share-pipes/order-by.pipe';
import player from 'lottie-web/build/player/lottie_light';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './infrastructure/auth/interceptor';
import { MaterialModule } from './material.module';
import { SvgModule } from './presentation/assets/svgs/svg/svg.component';
import { AccountPageComponent } from './presentation/pages/account-page/account-page.component';
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
import { SignOutComponent } from './presentation/pages/sign-out/sign-out.component';
import { TestComponent } from './presentation/pages/test/test.component';
import { AppInputComponent } from './presentation/share-components/app-input/app-input.component';
import { IvyCarouselModule } from './presentation/share-components/carousel/carousel.module';
import { ClassProgramComponent } from './presentation/share-components/class-program/class-program.component';
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

import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en';
import localeVN from '@angular/common/locales/vi';
import { SelectLearningGoalComponent } from '@presentation/pages/mock-test/select-learning-goal/select-learning-goal.component';
import { SelectTopicComponent } from '@presentation/pages/mock-test/select-topic/select-topic.component';
import { MockTestSelectProgramComponent } from './presentation/pages/mock-test/select-program/select-program.component';
import { NewUserComponent } from './presentation/pages/new-user/new-user.component';

registerLocaleData(localeVN, 'vi');
registerLocaleData(localeEN, 'en');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SubjectCardComponent,
    ClassProgramComponent,
    PageNotFoundComponent,
    TestComponent,
    AppInputComponent,
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
    AccountPageComponent,
    MockTestSelectProgramComponent,
    SelectLearningGoalComponent,
    SelectTopicComponent,
    NewUserComponent,
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
  providers: [authInterceptorProviders, { provide: LOCALE_ID, useValue: 'vi' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
