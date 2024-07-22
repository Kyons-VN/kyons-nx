import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'student-task-item-svg',
  templateUrl: './task-item-bg.component.svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemBGComponent {
  @Input() lineColor = '#94A3B8';
  @Input() shapeColor = '#FB923C';
}
