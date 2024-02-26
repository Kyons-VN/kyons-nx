import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatbotFindMeComponent } from './find-me/find-me.component';

@Component({
  standalone: true,
  imports: [ChatbotFindMeComponent, RouterModule],
  selector: 'chatbot-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
