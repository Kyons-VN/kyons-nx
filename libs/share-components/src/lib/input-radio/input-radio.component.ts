import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from '@share-pipes';
import { Answer } from '@share-utils/data';
import { LatexComponent } from '../latex/latex.component';

@Component({
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, LatexComponent],
  selector: 'kyonsvn-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
})
export class InputRadioComponent {
  // @Input() id!: string;
  @Input() name!: string;
  @Input() answer!: Answer;
  @Input() label!: string;
  @Input() disabled!: boolean;
  @Input() checked!: boolean;
  @Input() color!: string;

  @Input() test!: string;
  // el: HTMLElement;
  // constructor(ref: ElementRef<HTMLElement>) {
  //   this.el = ref.nativeElement;
  // }
}
