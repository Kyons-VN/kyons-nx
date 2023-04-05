import { Route } from '@angular/router';
import { WaitingListComponent } from './pages/waiting-list/waiting-list.component';

class AppPaths {
  home = { name: 'Trang chủ', path: '/' };
  waitingList = { name: 'Trang chờ', path: '/waiting-list/' };
}

const appRoutes: Route[] = [
  {
    path: 'waiting-list',
    component: WaitingListComponent,
  },
  {
    path: '**',
    component: WaitingListComponent,
  },
];

export { appRoutes, AppPaths };
