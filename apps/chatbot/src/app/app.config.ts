import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { VAPID_KEY } from '@angular/fire/compat/messaging';
import { provideRouter } from '@angular/router';
import { authInterceptorProviders } from '@data/auth/interceptor';
import { notificationServiceProvider } from '@data/notification/notification.service';
import { environment } from '@environments';
import player from 'lottie-web/build/player/lottie_light';
import { provideLottieOptions } from 'ngx-lottie';
import { routes } from '../view/routes';
import { firebaseProviders } from './firebase.config';
import { languageProviders } from './language.config';

export function playerFactory() {
  return player;
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLottieOptions({ player: playerFactory }),
    authInterceptorProviders,
    firebaseProviders,
    languageProviders,
    { provide: VAPID_KEY, useValue: environment.vapidKey },
    notificationServiceProvider,
  ],
};
