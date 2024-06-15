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
  effect,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// import { ChatService } from '@data/chat/chat.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Content, Mana, TextPart } from '@data/chat/chat-model';
import { Chat, ChatService } from '@data/chat/chat.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { ThemeService } from '@data/theme/theme.service';
import { UserService } from '@data/user/user.service';
import { Role, maxManaWidth } from '@domain/chat/i-content';
import { environment } from '@environments';
import { isCommand } from '@utils/chat';
import { ChatboxComponent } from '@view/share-components/chat/chatbox.component';
import { MessagesComponent } from '@view/share-components/chat/messages.component';
import { NgFlutterComponent } from '@view/share-components/ng-flutter/ng-flutter.component';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  standalone: true,
  imports: [CommonModule, NgFlutterComponent, RouterModule, TopMenuComponent, MessagesComponent, ChatboxComponent, MatButtonModule, MatMenuModule, MatIconModule, FormsModule],
  templateUrl: 'chatbot.component.html',
  styleUrl: 'chatbot.component.scss',
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-full';

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
  loading = inject(LoadingOverlayService);


  flutterState?: any;
  chats!: { [key: string]: { label: string, data: Chat[] } };
  chats$!: Chat[];
  search = '';
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
  currentChat: Chat | null = null;
  messages: Content[] = [];
  isThinking = false;
  isGaming = false;
  isSmMenuHide = signal(true);
  selectedChat = signal<Chat | null>(null);
  selectedChatGroup = signal<string>('');
  showConfirmDeleteChat = signal(false);
  showEditChat = signal(false);
  chatName = '';

  ngOnInit(): void {
    this.loading.show();
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
      this.flutterAppLoaded = false;
      this.isGaming = false;
      this.chatId = params.get('id') ?? '';
      console.log(`Chat id: ${this.chatId}`);
      this.chatService.getChats(this.userId).subscribe({
        next: chats => {
          this.chats$ = chats;
          this.chats = this.groupByTime(chats);
          this.changeDetectorRef.detectChanges();
          this.loading.hide();
        },
        error: err => {
          if (err.message === 'Unauthenticated') {
            this.router.navigate([this.paths.signOut.path]);
          }
          this.loading.hide();
          console.error(err);
        },
      });
      this.updateMana();
      if (this.chatId) {
        this.updateMessages();
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

  goToChat(chatId: string) {
    console.log(`Navigating to chat ${chatId}`);
    this.zone.run(() => {
      this.router.navigate([this.paths.chat.path.replace(':id', chatId)]);
    });
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
      }, 6000);
    }

    // Set the initial values of the Flutter app from enum DemoScreen in dart file
    this.flutterState.setUserId(this.userId);
    this.flutterState.setChatId(this.chatId);
    this.flutterState.setServerApi(`${environment.firebase.functionsUrl}/chat`);
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
    // this.flutterState.onManaChanged(() => {
    //   console.log('Mana changed');
    //   console.log(this.flutterState.getMana());
    //   const { a, b } = this.flutterState.getMana();
    //   this.manaWidth = maxManaWidth * a / b;
    //   this.batteryLife = (a / b * 100).toFixed(0) as unknown as number;
    // });
    // this.flutterState.onThemeChanged(() => {
    //   this.theme = this.flutterState.getTheme();
    //   this.themeService.setTheme(this.theme);
    // });
    this.flutterState.onShowGameChanged(() => {
      this.isGaming = this.flutterState.shouldShowGame();
      if (!this.isGaming) { this.flutterState.setMessage(''); }
      this.updateMessages();
    });
  }
  getGreeting() {
    if (this.chatId == '') {
      this.isThinking = true;
      this.chatService.getGreeting().subscribe({
        next: (message) => {
          this.messages = [message];
          this.isThinking = false;
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
    if (!isCommand(message)) this.messages = [...this.messages, new Content(Role.user, [new TextPart(message)], new Date())];
    console.log(message);
    if (this.chatId) {
      this.chatService.sendMessage(this.userId, this.chatId, message).subscribe({
        next: () => {
          // if (errorMessage.length > 0) {
          //   this.messages = errorMessage;
          // }
          // else {
          this.updateMessages();
          this.updateMana();
          // }
          // this.messages = messages;

        },
        error: (err) => {
          console.error(err);
          if (err.error === 'Not enough mana') {
            this.messages = [...this.messages, Content.outOfMana()]
          }
          this.isThinking = false;
        },
      });
    }
    else {
      this.chatService.startChat(this.userId, message).subscribe({
        next: async (chatId) => {
          this.chatId = chatId;
          await this.updateChats();
          this.router.navigate([this.paths.chat.path.replace(':id', chatId)]);
          this.isThinking = false;
        },
        error: (err) => {
          console.error(err);
          if (err.error === 'Not enough mana') {
            this.messages = [...this.messages, Content.outOfMana()]
          }
          this.isThinking = false;
        },
      });
    }
  }
  updateChats() {
    return this.chatService.getChats(this.userId, true).subscribe({
      next: (chats) => {
        this.chats = this.groupByTime(chats);
        // this.changeDetectorRef.detectChanges();
      }
    }).add(() => null);
  }
  updateMessages() {
    this.chatService.getMessages(this.userId, this.chatId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isThinking = false;
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

  toggleMenu() {
    this.isSmMenuHide.set(!this.isSmMenuHide());
    this.isSmMenuHide() ? this.renderer.removeClass(this.document.body, 'overflow-hidden') : this.renderer.addClass(this.document.body, 'overflow-hidden');
  }



  groupByTime(chats: Chat[]): { [key: string]: { label: string, data: Chat[] } } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    last7Days.setHours(0, 0, 0, 0);
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);
    last30Days.setHours(0, 0, 0, 0);

    const groups: { [key: string]: { label: string, data: Chat[] } } = {
      'today': { label: 'Hôm nay', data: [] },
      'yesterday': { label: 'Hôm qua', data: [] },
      'last7Days': { label: '7 ngày trước', data: [] },
      'last30Days': { label: '1 tháng gần đây', data: [] },
      'older': { label: 'Cũ hơn', data: [] },
    };

    chats.forEach(chat => {
      const chatDate = new Date(chat.createdAt);
      if (chatDate.getTime() >= today.getTime()) {
        groups['today']['data'].push(chat);
      } else if (chatDate.getTime() >= yesterday.getTime()) {
        groups['yesterday']['data'].push(chat);
      } else if (chatDate.getTime() >= last7Days.getTime()) {
        groups['last7Days']['data'].push(chat);
      } else if (chatDate.getTime() >= last30Days.getTime()) {
        groups['last30Days']['data'].push(chat);
      } else {
        groups['older']['data'].push(chat);
      }
    });

    return groups;
  }

  test() {
    console.log(this.selectedChat()?.id);
  }

  updateChatName() {
    this.chatService.updateChatName(this.userId, this.selectedChat()!.id, this.chatName).subscribe({
      next: () => {
        this.chatService.getChats(this.userId, true).subscribe({
          next: (chats) => {
            this.chats = this.groupByTime(chats);
            // this.changeDetectorRef.detectChanges();
          }
        })
      }
    });
    this.showEditChat.set(false);
  }

  deleteChat() {
    this.chatService.deleteChat(this.userId, this.selectedChat()!.id).subscribe({
      next: () => {
        this.chatService.getChats(this.userId, true).subscribe({
          next: (chats) => {
            this.chats = this.groupByTime(chats);
            // this.changeDetectorRef.detectChanges();
          }
        })
      }
    });
    this.showConfirmDeleteChat.set(false);
  }
}