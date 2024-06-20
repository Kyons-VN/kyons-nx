import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Content, FileData, FilePart, Part, TextPart } from '@data/chat/chat-model';
import { ChatService } from '@data/chat/chat.service';
import { Role } from '@domain/chat/i-content';
import { LatexComponent } from '@share-components';
import { IntercepterObserverDirective } from '@share-directives';

@Component({
  selector: 'student-messages',
  standalone: true,
  imports: [CommonModule, LatexComponent, IntercepterObserverDirective],
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements AfterViewInit, OnChanges {
  chatService = inject(ChatService);
  @Input() messages: Content[] = [];
  @Input() isThinking = false;
  @Input() userId = '';
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
          this.completeMessages = messages.slice(0, messages.length - 1);
          // 
          this.isWriting = true;
          this.isWritingEvent.emit(true);
          this.typeWriting(lastMessage);
        }
        else {
          this.completeMessages = messages;
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
      this.isWriting = false;
      this.completeMessages = this.messages, lastMessage;
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
    if (status) {
      const part = this.messages[contentIndex].parts[partIndex];
      if (part.isData) {
        const filePart = part as FilePart;
        this.chatService.getFile(this.userId, filePart.id).subscribe({
          next: (data: FileData | null) => {
            if (data == null) return;
            filePart.mimeType = data.mimeType;
            filePart.url = data.fileUri;
            this.messages[contentIndex].parts[partIndex] = filePart;
          }
        });
      };
    }
  }
}
