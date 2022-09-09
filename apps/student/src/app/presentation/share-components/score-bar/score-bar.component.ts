import { Component, HostBinding, Input } from '@angular/core';
import { TestResult } from '../../../infrastructure/test/test-content';

@Component({
  selector: 'student-score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.scss'],
})
export class ScoreBarComponent {
  @HostBinding('class') class = 'w-full flex gap-2';

  @Input() totalTiles = 5;
  @Input() testResult!: TestResult;

  getTotalColorTiles() {
    // return Math.round(this.testResult.result.rightAnswers / this.testResult.result.totalQuestions * this.totalTiles);
  }
}
