import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '@share-pipes';

@Component({
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  selector: 'kyonsvn-input-radio',
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
  // el: HTMLElement;
  // constructor(ref: ElementRef<HTMLElement>) {
  //   this.el = ref.nativeElement;
  // }
}
