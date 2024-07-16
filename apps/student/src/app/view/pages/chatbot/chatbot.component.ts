import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Injector,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  effect,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
// import { ChatService } from '@data/chat/chat.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatService, chatServerApi } from '@data/chat/chat.service';
import { FileService } from '@data/file/file.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { ThemeService } from '@data/theme/theme.service';
import { UserService } from '@data/user/user.service';
import { Role, maxManaWidth } from '@domain/chat/i-content';
import { ChatboxComponent, MessagesComponent } from '@share-components';
import { Content, FileData, FilePart, FilePlaceholder, Mana, Part, TextPart } from '@share-utils/data';
import { isCommand } from '@utils/chat';
import { NgFlutterComponent } from '@view/share-components/ng-flutter/ng-flutter.component';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChatbotSidebarComponent } from './sidebar/chatbot-sidebar.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgFlutterComponent, RouterModule, TopMenuComponent, MessagesComponent, ChatboxComponent, ChatbotSidebarComponent],
  templateUrl: 'chatbot.component.html',
  styleUrl: 'chatbot.component.scss',
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-full items-center relative chat';
  @ViewChild(ChatbotSidebarComponent) sidebar!: ChatbotSidebarComponent;

  changeDetectorRef = inject(ChangeDetectorRef);
  chatService = inject(ChatService);
  paths = inject(NavigationService).paths;
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  injector = inject(Injector);
  themeService = inject(ThemeService);
  zone = inject(NgZone);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  fileService = inject(FileService);

  flutterState?: any;
  countdown!: Observable<number>;
  $interval!: Subscription;
  flutterAppLoaded = true;
  day = '';
  hour = '';
  minute = '';
  second = '';
  chatId = '';
  userId = '';
  theme!: string;
  parseInt = parseInt;
  isCollapse = true;
  manaWidth = maxManaWidth;
  batteryLife = 100;
  messages: Content[] = [];
  isThinking = false;
  isGaming = false;
  isSmMenuHide = signal(true);
  file: File | undefined = undefined;
  image: FilePlaceholder | undefined = undefined;
  mana!: Mana;
  isLoadingMessages = false;
  fileData: FileData | undefined = undefined;

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userService.updateCurrentUser(this.userId).then((res) => {
      if (res) {
        console.log('User updated');
      }
      else {
        console.log('User not updated');
      }
    }, (err) => {
      console.error(err);
      this.router.navigate([this.paths.signOut.path]);
    });
    // watch route param changes
    this.route.paramMap.subscribe(params => {
      this.isLoadingMessages = true;
      this.flutterAppLoaded = false;
      this.isGaming = false;
      this.chatId = params.get('id') ?? '';
      this.updateMana();
      if (this.chatId) {
        this.getMessages().add(() => this.isLoadingMessages = false);
      }
      else {
        setTimeout(() => {
          this.isLoadingMessages = false;
        }, 500);
      }

      setTimeout(() => {
        this.flutterAppLoaded = true;
      }, 500);
      this.theme = this.themeService.themeStore();
    });
    // const targetDate = new Date('2024-04-22T24:00:00+00:00');
    // const countdown = interval(1000);

    // this.$interval = countdown.subscribe(() => {
    //   const now = new Date();
    //   const diff = targetDate.getTime() - now.getTime();
    //   const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    //   const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    //   const second = Math.floor((diff % (1000 * 60)) / 1000);
    //   this.day = day.toString().padStart(2, '0');
    //   this.hour = hour.toString().padStart(2, '0');
    //   this.minute = minute.toString().padStart(2, '0');
    //   this.second = second.toString().padStart(2, '0');
    //   if (diff < 0) {
    //     if (this.$interval !== undefined) this.$interval.unsubscribe();
    //     this.day = '00';
    //     this.hour = '00';
    //     this.minute = '00';
    //     this.second = '00';
    //   }
    // });
  }
  updateMana() {
    this.chatService.getMana(this.userId).subscribe({
      next: (mana: Mana) => {
        this.mana = mana;
        this.manaWidth = Math.floor(maxManaWidth * mana.value / mana.max);
        this.batteryLife = Math.floor(mana.value / mana.max * 100);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.$interval !== undefined) this.$interval.unsubscribe();
  }

  onFlutterAppLoaded(state: any) {
    this.flutterState = state;

    if (this.chatId) {
      console.log(`Chat id: ${this.chatId}`);
      // this.flutterState.setChatId(id);
    } else {
      setTimeout(() => {
        if (this.manaWidth > 0 && this.messages.length == 0) {
          // this.sendMessage('/hello');
          this.getGreeting();
        }
      }, 600000);
    }

    // Set the initial values of the Flutter app from enum DemoScreen in dart file
    this.flutterState.setUserId(this.userId);
    this.flutterState.setChatId(this.chatId);
    this.flutterState.setServerApi(chatServerApi);
    // this.flutterState.setTheme(this.themeService.themeStore());
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
        this.flutterState.setTheme(this.themeService.themeStore());
      });
    });
    // this.flutterState.onChatIdChanged(() => {
    //   this.flutterAppLoaded = false;
    //   console.log(`Chat id changed: ${this.flutterState.getChatId()}`);
    //   if (this.chatId != this.flutterState.getChatId()) {
    //     this.goToChat(this.flutterState.getChatId());
    //   }
    // });
    this.flutterState.onManaChanged(() => {
      const { a, b } = this.flutterState.getMana();
      this.manaWidth = maxManaWidth * a / b;
      this.batteryLife = (a / b * 100).toFixed(0) as unknown as number;
      if (a != this.mana.value) {
        console.log('Mana changed');
        this.updateMana();
        this.getMessages();
      };
    });
    // this.flutterState.onThemeChanged(() => {
    //   this.theme = this.flutterState.getTheme();
    //   this.themeService.setTheme(this.theme);
    // });
    this.flutterState.onShowGameChanged(() => {
      this.isGaming = this.flutterState.shouldShowGame();
      if (!this.isGaming) { this.flutterState.setMessage(''); }
      this.getMessages();
    });
  }

  getGreeting() {
    if (this.chatId == '') {
      this.isThinking = true;
      this.chatService.getGreeting().subscribe({
        next: (message) => {
          this.messages = [message];
        },
        error: (err) => {
          console.error(err);
          this.isThinking = false;
        },
      })
    }
  }

  sendMessage(message: string) {
    if (this.isThinking) return;
    this.isThinking = true;
    const askingMessage: Part[] = [new TextPart(message)];
    if (this.image) {
      const newFilePart = new FilePart(this.image.name);
      newFilePart.url = this.image.base64 || this.image.uri;
      newFilePart.mimeType = this.image.mimeType;
      askingMessage.push(newFilePart);
    }
    if (!isCommand(message)) this.messages = [...this.messages, new Content(Role.user, askingMessage, new Date())];
    // console.log(message);
    // if (this.chatId) {
    this.chatService.sendMessageFile(this.userId, message, {
      chatId: this.chatId,
      file: this.file,
      image: this.image,
      fileData: this.fileData,
    }).subscribe({
      next: async (chatId) => {
        if (this.chatId == '') {
          this.chatId = chatId;
          await this.sidebar.getChats();
          this.router.navigate([this.paths.chat.path.replace(':id', chatId)]);
        }
        else {
          this.getMessages();
          this.updateMana();
        }
      },
      error: (err) => {
        console.error(err);
        if (err.code === 3) {
          this.messages = [...this.messages, Content.outOfMana()]
        }
        else {
          this.messages = [...this.messages, Content.unknownError(err.code)]
        }
        this.isThinking = false;
      },
    });
    if (this.file) { this.file = undefined; this.image = undefined; }
    if (this.fileData) { this.fileData = undefined; this.image = undefined; }
    // }
    // else {
    //   this.chatService.sendMessageFile(this.userId, message, {
    //     file: this.file,
    //     image: this.image,
    //     fileData: this.fileData,
    //   }).subscribe({
    //     next: async (chatId) => {
    //       this.chatId = chatId;
    //       await this.sidebar.getChats();
    //       this.router.navigate([this.paths.chat.path.replace(':id', chatId)]);
    //       this.isThinking = false;
    //     },
    //     error: (err: ChatError) => {
    //       console.error(err);
    //       if (err.code === 3) {
    //         this.messages = [...this.messages, Content.outOfMana()]
    //       }
    //       this.isThinking = false;
    //     },
    //   });
    // }
  }

  toggleMenu() {
    this.sidebar.toggleMenu();
  }

  getMessages() {
    if (this.chatId == '') return new Observable<Content[]>(() => { [] }).subscribe();
    return this.chatService.getMessages(this.userId, this.chatId).subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (err) => {
        console.error(err);
        this.isThinking = false;
        this.router.navigate([this.paths.chatbot.path]);
      },
    });
  }

  play() {
    this.flutterState.setMessage('/play');
  }

  exit() {
    this.flutterState.setMessage('/end');
  }

  updateThinking(isThinking: boolean) {
    this.isThinking = isThinking;
  }

  selectFile(file: File) {
    this.file = file;
  }

  selectImage(image: FilePlaceholder) {
    this.image = image;
  }

  removeImage() {
    this.file = undefined;
    this.fileData = undefined;
  }

  selectFileFromStorage(file: FileData) {
    this.fileData = file;
  }

}