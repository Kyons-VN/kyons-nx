import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IntercepterObserverDirective } from '@share-directives';
import { Content, FileData, FilePart, Part, TextPart } from '@share-utils/data';
import { IChatService, IFileService, Role } from '@share-utils/domain';
import { LatexComponent } from '../../latex/latex.component';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [CommonModule, LatexComponent, IntercepterObserverDirective, MatIconModule],
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit, AfterViewInit, OnChanges {
  ngOnInit(): void {

  }
  @Input() messages: Content[] = [];
  @Input() isThinking = false;
  @Input() userId = '';
  @Input() fileService?: IFileService = undefined;
  @Input() chatService!: IChatService;
  completeText = '';
  writingText = '';
  isWriting = false;
  completeMessages: Content[] = [];
  thinkingText = '';

  @Output() startGame = new EventEmitter<void>();
  @Output() isWritingEvent = new EventEmitter<boolean>();

  @ViewChild('chatBody') chatBodyElm!: ElementRef;

  ngAfterViewInit() {
    this.chatBodyElm.nativeElement.scrollTop = this.chatBodyElm.nativeElement.scrollHeight;
  }

  getText(part: Part) {
    if (part instanceof TextPart) {
      return part.text;
    }
    return '';
  }
  hasPlayBtn(part: Part) {
    if (part instanceof TextPart) {
      return part.hasPlayBtn;
    }
    return false;
  }

  scrollToBottom() {
    this.chatBodyElm.nativeElement.scrollTop = this.chatBodyElm.nativeElement.scrollHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages']) {
      if (changes['messages'].previousValue && changes['messages'].currentValue && changes['messages'].previousValue.length == changes['messages'].currentValue.length - 1) {
        const messages = changes['messages'].currentValue;
        const lastMessage = messages[messages.length - 1];
        if (lastMessage instanceof Content && lastMessage.role == Role.model) {
          // this.completeMessages = messages.slice(0, messages.length - 1);
          // 
          this.isWriting = true;
          this.isWritingEvent.emit(true);
          this.typeWriting(lastMessage);
        }
        else {
          this.completeMessages.push(lastMessage);
          // if (changes['messages'].currentValue.length > 0) {
          setTimeout(() => {
            this.scrollToBottom();
          }, 200);
          // }
        }
      }
      else {
        this.completeMessages = this.messages;
        // if (changes['messages'].currentValue.length > 0) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
        // }
      }
    }
    if (changes['isThinking']) {
      if (changes['isThinking'].currentValue) {
        this.thinkingText = '...';
      }
      else {
        this.thinkingText = '';
      }
    }
  }

  typeWriting(lastMessage: Content) {
    this.completeText = lastMessage.parts.map(part => this.getText(part)).join('<br>');
    if (this.writingText.length < this.completeText.length) {
      this.writingText += this.completeText.charAt(this.writingText.length);
      this.completeText = this.completeText.slice(1);
      this.scrollToBottom();
      setTimeout(() => {
        this.typeWriting(lastMessage);
      }, Math.random() * 50);
    }
    else {
      this.completeMessages.push(lastMessage);
      this.isWriting = false;
      this.completeText = '';
      this.writingText = '';
      this.isWritingEvent.emit(false);

      setTimeout(() => {
        this.scrollToBottom();
      }, 200);
    }
  }

  play() {
    this.startGame.emit();
  }

  isIntersecting(status: boolean, contentIndex: number, partIndex: number) {
    if (!this.fileService) return;
    if (status) {
      const part = this.messages[contentIndex].parts[partIndex];
      if (part.isData) {
        if (part.url || (part.data && part.data.fileUri)) {
          return;
        }
        const filePart = part as FilePart;
        this.fileService.getFile(this.userId, filePart.id).subscribe({
          next: (data: FileData | null) => {
            if (data == null) return;
            if (data.id == 'deleted') {
              filePart.isDeleted = true;
            }
            else {
              filePart.data = data;
            }
            this.messages[contentIndex].parts[partIndex] = filePart;
          }
        });
      };
    }
  }
}
