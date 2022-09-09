import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-questions-progress',
  templateUrl: './questions-progress.component.html',
  styleUrls: ['./questions-progress.component.scss'],
})
export class QuestionsProgressComponent {
  @Input() progress: number = 0;
}
