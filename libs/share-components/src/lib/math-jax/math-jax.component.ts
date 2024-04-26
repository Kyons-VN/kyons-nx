import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MathJaxService } from './math-jax.service';

@Component({
  selector: 'kyonsvn-math-jax',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './math-jax.component.html',
})
export class MathJaxComponent implements OnInit {
  mathJaxService = inject(MathJaxService);

  @ViewChild('mathParagraph') paragraphElement!: ElementRef;
  @Input({ required: true }) mathString!: string;

  ngOnInit() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      console.log('MathJax loaded, rendering math');

      // Insert the input string
      this.paragraphElement.nativeElement.innerHTML = this.mathString;

      // Render the Latex
      this.mathJaxService.render();
    });
  }
}
