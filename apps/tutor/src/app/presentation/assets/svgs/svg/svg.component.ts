import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { HomeSvgComponent } from '../home/home.component';
import { TutorSvgComponent } from '../tutor/tutor.component';

@Component({
  selector: 'tutor-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss'],
})
export class SvgComponent {

  @Input() color: string = '#94A3B8';
  @Input() name: string = 'home';

}

@NgModule({
  imports: [CommonModule],
  exports: [SvgComponent],
  declarations: [SvgComponent, HomeSvgComponent, TutorSvgComponent],
  providers: [],
})
export class SvgModule { }
