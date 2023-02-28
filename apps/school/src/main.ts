import { provideHttpClient } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from '@view/routes';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()), { provide: LOCALE_ID, useValue: 'vi-VN' }, { provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' }, provideHttpClient(), provideLottieOptions({
    player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
  }),
  provideCacheableAnimationLoader(),],
}).catch(err => console.error(err));
