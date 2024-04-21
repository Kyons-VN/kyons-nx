import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'student-home-svg',
  templateUrl: './home.component.svg',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSvgComponent {
  @Input() color = '#94A3B8';
}
