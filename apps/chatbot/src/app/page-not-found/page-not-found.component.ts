import { Component, HostBinding } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  @HostBinding('class') class = 'h-full';
}
