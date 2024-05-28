import { Component, HostBinding } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  @HostBinding('class') class = 'h-full';
}
