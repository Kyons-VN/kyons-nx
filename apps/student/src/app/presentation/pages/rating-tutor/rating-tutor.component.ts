import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: './rating-tutor.component.html',
  styleUrls: ['./rating-tutor.component.scss'],
})
export class RatingTutorComponent {
  @HostBinding('class') class = 'h-full';
}
