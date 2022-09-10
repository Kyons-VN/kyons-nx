import { Component, Input } from '@angular/core';

@Component({
  selector: 'tutor-questions-progress',
  templateUrl: './questions-progress.component.html',
  styleUrls: ['./questions-progress.component.scss']
})
export class QuestionsProgressComponent {
  @Input() progress: number = 0;
}
