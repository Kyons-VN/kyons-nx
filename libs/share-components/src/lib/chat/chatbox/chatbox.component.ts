import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FileData, FilePlaceholder } from '@share-utils/data';
import { IFileService } from '@share-utils/domain';
import { getBase64 } from '@share-utils/utils';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { FileSelectionComponent } from '../file-selection/file-selection.component';

@Component({
  selector: 'chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule, LottieComponent, MatMenuModule, FileSelectionComponent],
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent implements OnInit, OnChanges, AfterViewInit {
  accept!: string;
  text: string = '';
  options: AnimationOptions = {
    path: './assets/animations/loading.json',
    loop: true,
    autoplay: true,
  };
  isInit: boolean = false;
  placeholder: FilePlaceholder | null = null;
  showFileSelection = false;
  file: File | null = null;
  shouldSplit: boolean = false;
  scrollHeightLevel = 1;

  @Input() isThinking: boolean = false;
  @Input() isGaming: boolean = false;
  @Input() hasFileFeature: boolean = false;
  @Input() fileService!: IFileService;
  @Output() sendMessage = new EventEmitter<string>();
  @Output() endGame = new EventEmitter<void>();
  @Output() selectFile = new EventEmitter<File>();
  @Output() selectFileFromStorage = new EventEmitter<FileData>();
  @Output() selectImage = new EventEmitter<FilePlaceholder>();
  @Output() removeImage = new EventEmitter<FilePlaceholder>();
  @ViewChild('askInput') askInputElm!: ElementRef;

  ngOnInit(): void {
    this.accept = this.fileService?.accept || '';
  }

  ngAfterViewInit(): void {
    this.isInit = true;
  }

  ask() {
    if (this.text === '') return;
    this.sendMessage.emit(this.text.replace(/\n/g, '<br>'));
    this.text = '';
    this.placeholder = null;
  }

  onCtrlEnter() {
    this.text += '\n';
  }

  onEnter() {
    this.ask();
  }

  onDeleteFile() {
    if (!this.hasFileFeature) return;
    if (this.placeholder == null) return;
    this.removeImage.emit(this.placeholder);
    this.placeholder = null;
  }

  async onFileSelected($event: Event) {
    if (!this.hasFileFeature) return;
    if ($event.target == null) return;
    const target = $event.target as HTMLInputElement;
    // const reader = new FileReader();
    if (target.files && target.files[0]) {
      const file = target.files[0];
      if (file.type.split('/')[0] !== 'image' && file.size > 5 * 1024 * 1024) {
        alert("Không thể tải ảnh lớn hơn 5 MB");
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        alert("Không thể tải tập tin lớn hơn 15 MB");
      }
      this.file = file;
      // reader.readAsDataURL(target.files[0]);
      // if (file.type.split('/')[0] == 'image') {
      this.placeholder = new FilePlaceholder(file.name, file.type, file.size);
      this.selectImage.emit(this.placeholder);
      // }
      this.selectFile.emit(file);
      const base64 = (await getBase64(file)) as string;
      const type = file.type.split('/')[0];
      if (type == 'image') this.placeholder.base64 = base64;
      if (type == 'video') {
        const image = await videoToImage(this.file, { frameTimeInSeconds: 0.5, extension: 'png' });
        console.log(image);
      }
      this.selectImage.emit(this.placeholder);
    }
  }

  async onloadend(reader: FileReader) {
    if (!this.hasFileFeature) return;
    if (this.placeholder == null || this.file == null) return;
    const result = reader.result as string;
    const splits = result.split(',');
    if (splits[0] == 'image') this.placeholder.base64 = reader.result as string;
    if (splits[0] == 'video') {
      const image = await videoToImage(this.file, { frameTimeInSeconds: 0.5, extension: 'png' });
      console.log(image);

      // this.placeholder.base64 = reader.result as string;
    }
    // if (splits[0].includes('image/png')) {
    //   this.placeholder.mimeType = 'image/png'
    // }
    // else if (splits[0].includes('image/jpg')) {
    //   this.placeholder.mimeType = 'image/jpg'
    // }
    this.selectImage.emit(this.placeholder);
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
    if (!this.hasFileFeature) return;
    this.placeholder = FilePlaceholder.fromFileData(file);
    if (this.placeholder == null) return;
    this.showFileSelection = false;
    this.selectFileFromStorage.emit(file);
    this.selectImage.emit(this.placeholder);
  }

  onKeydown($event: KeyboardEvent) {
    setTimeout(() => {
      const scrollHeight = this.askInputElm.nativeElement.scrollHeight;
      if (scrollHeight <= 50) {
        this.scrollHeightLevel = 1;
      }
      else if (50 < scrollHeight && scrollHeight <= 80) {
        this.scrollHeightLevel = 2;
      }
      else {
        this.scrollHeightLevel = 3;
      }
      console.log(this.scrollHeightLevel);

    }, 500);
  }

}

export const videoToImage = (
  videoFile: File,
  options: {
    frameTimeInSeconds?: number
    filename?: string
    extension?: string
  } = {
      frameTimeInSeconds: 0.5,
      extension: "png"
    }
): Promise<File> => {
  return new Promise<File>((resolve) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')
    const source = document.createElement('source')
    const context = canvas.getContext('2d')
    const urlRef = URL.createObjectURL(videoFile)

    video.style.display = 'none'
    canvas.style.display = 'none'

    source.setAttribute('src', urlRef)
    video.setAttribute('crossorigin', 'anonymous')
    video.setAttribute('preload', 'metadata')

    video.appendChild(source)
    document.body.appendChild(canvas)
    document.body.appendChild(video)

    if (!context) {
      return
    }

    video.currentTime = options.frameTimeInSeconds ?? 0
    video.load()

    video.addEventListener('loadedmetadata', function () {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    })

    video.addEventListener('loadeddata', function () {
      setTimeout(() => {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

        canvas.toBlob((blob) => {
          if (!blob) return
          resolve(
            new File([blob], (options.filename || videoFile.name) + "_preview." + options.extension, {
              type: 'image/' + options.extension
            })
          )
          URL.revokeObjectURL(urlRef)

          video.remove()
          canvas.remove()
        }, 'image/' + options.extension)
      }, 2000)
    })
  })
}
