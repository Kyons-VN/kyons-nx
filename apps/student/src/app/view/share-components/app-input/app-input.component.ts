import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
})
export class AppInputComponent {
  @Input() placeholder = '';
}
