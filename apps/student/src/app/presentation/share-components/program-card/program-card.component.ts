import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'student-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss'],
})
export class SubjectCardComponent {
  @HostBinding('class') class = 'h-full';
}
