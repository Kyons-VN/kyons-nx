import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms-of-service.component.html',
})
export class TermsOfServiceComponent {
  @HostBinding('class') class = 'bg-white flex w-full h-full';
}
