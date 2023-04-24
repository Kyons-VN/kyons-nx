import { Route } from '@angular/router';
import { FlashcardComponent } from './pages/flashcard/flashcard.component';
import { WaitingListComponent } from './pages/waiting-list/waiting-list.component';

class AppPaths {
  home = { name: 'Trang chủ', path: '/' };
  waitingList = { name: 'Trang chờ', path: '/waitlist/' };
}

const appRoutes: Route[] = [
  {
    path: 'waitlist',
    component: WaitingListComponent,
  },
  {
    path: 'flashcard/:id',
    component: FlashcardComponent,
  },
  {
    path: '**',
    redirectTo: 'waitlist'
  },
];

export { appRoutes, AppPaths };

