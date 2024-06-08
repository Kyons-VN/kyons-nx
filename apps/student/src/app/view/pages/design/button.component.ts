import { Component, HostBinding } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './button.component.html',
})
export class TestButtonComponent {
  @HostBinding('class') class = 'h-full';
}