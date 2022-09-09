import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'student-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  @HostBinding('class') class = 'h-full';
}
