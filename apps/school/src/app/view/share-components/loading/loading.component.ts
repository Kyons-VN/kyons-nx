import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';

@Component({
  standalone: true,
  imports: [CommonModule, LottieModule],
  selector: 'school-loading',
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
