import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe, SafeHtmlPipe, SharePipesModule } from '@kyonsvn/share-pipes';
import player from 'lottie-web/build/player/lottie_light';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DEFAULT_TIMEOUT, authInterceptorProviders } from './infrastructure/auth/interceptor';
import { MaterialModule } from './material.module';
import { SvgModule } from './presentation/assets/svgs/svg/svg.component';
import { AccountPageComponent } from './presentation/pages/account-page/account-page.component';
import { FinalExamComponent } from './presentation/pages/final-exam/final-exam.component';
import { KnowledgeComponent } from './presentation/pages/knowledge/knowledge.component';
import { NewLessonPageComponent } from './presentation/pages/new-lesson-page/new-lesson-page.component';
import { PackagePageComponent } from './presentation/pages/package-page/package-page.component';
import { PageNotFoundComponent } from './presentation/pages/page-not-found/page-not-found.component';
import { RatingTutorComponent } from './presentation/pages/rating-tutor/rating-tutor.component';
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
import { TrackingComponent } from './presentation/share-components/tracking/tracking.component';

export function playerFactory() {
  return player;
}

import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en';
import localeVN from '@angular/common/locales/vi';
import { LayoutFullComponent } from '@presentation/layouts/full/layout-full.component';
import { SelectTopicComponent } from '@presentation/pages/mock-test/select-topic/select-topic.component';
import { NgChartsModule } from 'ng2-charts';
import { LayoutDefaultComponent } from './presentation/layouts/default/layout-default.component';
import { AdaptiveTestComponent } from './presentation/pages/adaptive-test/adaptive-test.component';
import { NewUserComponent } from './presentation/pages/new-user/new-user.component';

registerLocaleData(localeVN, 'vi');
registerLocaleData(localeEN, 'en');

@NgModule({
  declarations: [
    AccountPageComponent,
    AppComponent,
    AppInputComponent,
    ConfirmDialogComponent,
    FinalExamComponent,
    InputRadioComponent,
    KnowledgeComponent,
    LayoutDefaultComponent,
    LayoutFullComponent,
    // LearningPathComponent,
    NewLessonPageComponent,
    NewUserComponent,
    PackagePageComponent,
    PageNotFoundComponent,
    // ProfileComponent,
    QuestionsProgressComponent,
    RatingTutorComponent,
    ScoreBarComponent,
    SelectTopicComponent,
    SignOutComponent,
    SubjectCardComponent,
    TestComponent,
    TestContentComponent,
    TestReviewComponent,
    TopMenuComponent,
    TrackingComponent,
    // MockTestResultComponent,
    AdaptiveTestComponent,
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
    LottieModule.forRoot({ player: playerFactory }),
    LoadingComponent,
    NgChartsModule,
    FilterPipe,
    SafeHtmlPipe,
  ],
  exports: [MaterialModule, SvgModule],
  providers: [
    authInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'vi' },
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
