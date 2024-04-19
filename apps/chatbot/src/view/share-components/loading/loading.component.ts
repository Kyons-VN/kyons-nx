import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  standalone: true,
  imports: [LottieComponent],
  selector: 'chatbot-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  options: AnimationOptions = {
    path: './assets/animations/loading.json',
    loop: true,
    autoplay: true,
  };
}
