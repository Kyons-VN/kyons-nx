import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'student-tutor-svg',
  templateUrl: './tutor.component.svg',
  styleUrls: ['./tutor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorSvgComponent {
  @Input() color = '#94A3B8';
}
