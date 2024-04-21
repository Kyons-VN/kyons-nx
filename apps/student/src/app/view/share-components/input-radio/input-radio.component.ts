import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
})
export class InputRadioComponent {
  @Input() name!: string;
  @Input() value!: string;
  @Input() label!: string;
  @Input() disabled!: boolean;
  @Input() checked!: boolean;
  @Input() color!: string;
}
