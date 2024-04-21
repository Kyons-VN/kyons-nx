import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { HomeSvgComponent } from '../home/home.component';
import { TutorSvgComponent } from '../tutor/tutor.component';

@Component({
  selector: 'student-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
})
export class SvgComponent {
  @Input() color = '#94A3B8';
  @Input() name = 'home';
}

@NgModule({
  imports: [CommonModule],
  exports: [SvgComponent],
  declarations: [SvgComponent, HomeSvgComponent, TutorSvgComponent],
  providers: [],
})
export class SvgModule { }
