import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'chatbot-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule, LottieComponent],
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent implements OnChanges, AfterViewInit {
  text: string = '';
  options: AnimationOptions = {
    path: './assets/animations/loading.json',
    loop: true,
    autoplay: true,
  };
  isInit: boolean = false;
  @Input() isThinking: boolean = false;
  @Output() sendMessage = new EventEmitter<string>();
  @ViewChild('askInput') askInputElm!: ElementRef;

  ngAfterViewInit(): void {
    this.isInit = true;
  }

  ask() {
    if (this.text === '') return;
    this.sendMessage.emit(this.text.replace(/\n/g, '<br>'));
    this.text = '';
  }

  onCtrlEnter() {
    this.text += '\n';
  }

  onEnter() {
    this.ask();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isInit) return;
    if (changes['isThinking']) {
      if (!changes['isThinking'].currentValue) {
        setTimeout(() => {
          this.askInputElm.nativeElement.focus();
        }, 100);
      }
    }
  }
}
