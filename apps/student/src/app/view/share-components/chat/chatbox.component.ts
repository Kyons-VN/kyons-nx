import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FileData, Image } from '@data/file/file-model';
import { FileService } from '@data/file/file.service';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { FileSelectionComponent } from '../file-selection/file-selection.component';

@Component({
  selector: 'student-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule, LottieComponent, MatMenuModule, FileSelectionComponent],
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent implements OnChanges, AfterViewInit {
  accetp = inject(FileService).accept;
  text: string = '';
  options: AnimationOptions = {
    path: './assets/animations/loading.json',
    loop: true,
    autoplay: true,
  };
  isInit: boolean = false;
  image: Image | null = null;
  showFileSelection = false;

  @Input() isThinking: boolean = false;
  @Input() isGaming: boolean = false;
  @Output() sendMessage = new EventEmitter<string>();
  @Output() endGame = new EventEmitter<void>();
  @Output() selectFile = new EventEmitter<File>();
  @Output() selectFileFromStorage = new EventEmitter<FileData>();
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
      if (file.size > 5 * 1024 * 1024) {
        alert("Không thể tải file lớn hơn 5 MB");
        return;
      }
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

  onSelectFileFromStorage(file: FileData) {
    this.image = Image.fromFileData(file);
    if (this.image == null) return;
    this.showFileSelection = false;
    this.selectFileFromStorage.emit(file);
    this.selectImage.emit(this.image);
  }
}
