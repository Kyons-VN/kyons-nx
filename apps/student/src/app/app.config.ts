import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { VAPID_KEY } from '@angular/fire/compat/messaging';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { authInterceptorProviders, DEFAULT_TIMEOUT } from '@data/auth/interceptor';
import { notificationServiceProvider } from '@data/notification/notification.service';
import { environment } from '@environments';
import { NgCircleProgressModule } from 'ng-circle-progress'; // Add the missing import statement
import { provideLottieOptions } from 'ngx-lottie';
import { firebaseProviders } from './firebase.config';
import { languageProviders } from './language.config';
import { routes } from './view/routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLottieOptions({ player: () => import('lottie-web') }),
    authInterceptorProviders,
    firebaseProviders,
    languageProviders,
    { provide: VAPID_KEY, useValue: environment.vapidKey },
    { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    notificationServiceProvider,
    importProvidersFrom(
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
      })),
    provideAnimations()
  ],
};