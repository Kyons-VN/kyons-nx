import { Component, Input } from '@angular/core';

@Component({
  selector: 'tutor-input',
  templateUrl: './tutor-input.component.html',
  styleUrls: ['./tutor-input.component.scss']
})
export class AppInputComponent {
  @Input() placeholder = '';
}
