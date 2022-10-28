import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'student-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  options: AnimationOptions = {
    "path": "./assets/animations/loading.json",
    "loop": true,
    "autoplay": true
  };
}
