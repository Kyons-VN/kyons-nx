import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './infrastructure/auth/intercepter';
import { SvgModule } from './presentation/assets/svgs/svg/svg.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { LatestTestsComponent } from './presentation/pages/latest-tests/latest-tests.component';
import { PageNotFoundComponent } from './presentation/pages/page-not-found/page-not-found.component';
import { SignInComponent } from './presentation/pages/sign-in/sign-in.component';
import { SignOutComponent } from './presentation/pages/sign-out/sign-out.component';
import { TestResultComponent } from './presentation/pages/test-result/test-result.component';
import { UpdateGoogleMeetComponent } from './presentation/pages/update-google-meet/update-google-meet.component';
import { UpdateLearningPathComponent } from './presentation/pages/update-learning-path/update-learning-path.component';
import { InputRadioComponent } from './presentation/shares/input-radio/input-radio.component';
import { LeftMenuComponent } from './presentation/shares/left-menu/left-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignOutComponent,
    HomeComponent,
    LeftMenuComponent,
    UpdateLearningPathComponent,
    LatestTestsComponent,
    TestResultComponent,
    InputRadioComponent,
    UpdateGoogleMeetComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // MyDatePickerModule,
    NgCircleProgressModule.forRoot({
      "radius": 50,
      "space": -10,
      "outerStrokeGradient": false,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#06A5FF",
      "innerStrokeColor": "#F1F5F9",
      "innerStrokeWidth": 10,
      "titleFontSize": '36',
      'subtitleFontSize': '24',
      "animateTitle": true,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
      "lazy": true
    }),
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    SvgModule
  ],
  exports: [SvgModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
