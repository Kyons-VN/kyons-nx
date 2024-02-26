import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./find-me/find-me.component').then(m => m.ChatbotFindMeComponent),
  },
];
