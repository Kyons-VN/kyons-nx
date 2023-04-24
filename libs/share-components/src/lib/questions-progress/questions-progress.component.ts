import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Progress } from '@utils/knowledge/data/progress';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'kyonsvn-questions-progress',
  templateUrl: './questions-progress.component.html',
  styleUrls: ['./questions-progress.component.scss'],
})
export class QuestionsProgressComponent {
  @Input() progress = Progress.from(0, 3);
}
