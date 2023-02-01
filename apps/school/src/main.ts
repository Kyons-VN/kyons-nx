import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from '@view/routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()), { provide: LOCALE_ID, useValue: 'vi-VN' }, { provide: DEFAULT_CURRENCY_CODE, useValue: 'VND' }],
}).catch(err => console.error(err));
