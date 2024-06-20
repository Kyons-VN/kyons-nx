import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Image } from '@data/chat/chat-model';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'student-chatbox',
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
  image: Image | null = null;

  @Input() isThinking: boolean = false;
  @Input() isGaming: boolean = false;
  @Output() sendMessage = new EventEmitter<string>();
  @Output() endGame = new EventEmitter<void>();
  @Output() selectFile = new EventEmitter<File>();
  @Output() selectImage = new EventEmitter<Image>();
  @Output() removeImage = new EventEmitter<Image>();
  @ViewChild('askInput') askInputElm!: ElementRef;

  ngAfterViewInit(): void {
    this.isInit = true;
  }

  ask() {
    if (this.text === '') return;
    this.sendMessage.emit(this.text.replace(/\n/g, '<br>'));
    this.text = '';
    this.image = null;
  }

  onCtrlEnter() {
    this.text += '\n';
  }

  onEnter() {
    this.ask();
  }

  onDeleteFile() {
    if (this.image == null) return;
    this.removeImage.emit(this.image);
    this.image = null;
  }

  onFileSelected($event: Event) {
    if ($event.target == null) return;
    const target = $event.target as HTMLInputElement;
    // convertFile(files[0]).subscribe(base64 => {
    //   this.image = base64;
    // });
    const reader = new FileReader();
    if (target.files && target.files[0]) {
      const file = target.files[0];
      reader.readAsDataURL(target.files[0]);
      this.image = new Image(file.name, file.type, file.size);
      this.selectFile.emit(file);
      this.selectImage.emit(this.image);
      reader.onloadend = this.onloadend.bind(this, reader);
    }
  }

  onloadend(reader: FileReader) {
    if (this.image == null) return;
    const result = reader.result as string;
    const splits = result.split(',');
    this.image.base64 = reader.result as string;
    if (splits[0].includes('image/png')) {
      this.image.mimeType = 'image/png'
    }
    else if (splits[0].includes('image/jpg')) {
      this.image.mimeType = 'image/jpg'
    }
    this.selectImage.emit(this.image);
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

  exit() {
    this.endGame.emit()
  }
}
