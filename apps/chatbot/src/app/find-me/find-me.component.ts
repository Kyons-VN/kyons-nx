import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Injector,
  NgZone,
  OnDestroy,
  OnInit,
  effect,
  inject,
  runInInjectionContext,
} from '@angular/core';
// import { ChatService } from '@data/chat/chat.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Chat, ChatService } from '@data/chat/chat.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { ThemeService } from '@data/theme/theme.service';
import { UserService } from '@data/user/user.service';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { Subscription, interval } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { NgFlutterComponent } from '../../view/ng-flutter/ng-flutter.component';

const maxManaWidth = 26;

@Component({
  selector: 'chatbot-find-me',
  standalone: true,
  imports: [CommonModule, NgFlutterComponent, RouterModule, TopMenuComponent],
  templateUrl: 'find-me.component.html',
  styleUrl: 'find-me.component.scss',
})
export class ChatbotFindMeComponent implements OnInit, OnDestroy {
  changeDetectorRef = inject(ChangeDetectorRef);
  chatService = inject(ChatService);
  paths = inject(NavigationService).paths;
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  injector = inject(Injector);
  themeService = inject(ThemeService);
  zone = inject(NgZone);
  flutterState?: any;
  chats!: Chat[];
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

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    this.userService.updateCurrentUser(this.userId);
    // watch route param changes
    this.route.paramMap.subscribe(params => {
      this.flutterAppLoaded = false;
      this.chatId = params.get('id') ?? '';
      console.log(`Chat id: ${this.chatId}`);
      this.chatService.getChats().subscribe({
        next: chats => {
          this.chats = chats;
          this.changeDetectorRef.detectChanges();
        },
        error: err => {
          if (err.message === 'Unauthenticated') {
            this.router.navigate([this.paths.signIn.path]);
          }
        },
      });
      setTimeout(() => {
        this.flutterAppLoaded = true;
      }, 500);
    });
    const targetDate = new Date('2024-04-22T24:00:00+00:00');
    const countdown = interval(1000);

    this.$interval = countdown.subscribe(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((diff % (1000 * 60)) / 1000);
      this.day = day.toString().padStart(2, '0');
      this.hour = hour.toString().padStart(2, '0');
      this.minute = minute.toString().padStart(2, '0');
      this.second = second.toString().padStart(2, '0');
      if (diff < 0) {
        if (this.$interval !== undefined) this.$interval.unsubscribe();
        this.day = '00';
        this.hour = '00';
        this.minute = '00';
        this.second = '00';
      }
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
        console.log('Start empty chat');
      }, 10000);
    }

    // Set the initial values of the Flutter app from enum DemoScreen in dart file
    this.flutterState.setUserId(this.userId);
    this.flutterState.setChatId(this.chatId);
    this.flutterState.setTheme(this.themeService.themeStore());
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
        this.flutterState.setTheme(this.themeService.themeStore());
      });
    });
    this.flutterState.onChatIdChanged(() => {
      this.flutterAppLoaded = false;
      console.log(`Chat id changed: ${this.flutterState.getChatId()}`);
      if (this.chatId != this.flutterState.getChatId()) {
        this.goToChat(this.flutterState.getChatId());
      }
    });
    this.flutterState.onManaChanged(() => {
      console.log('Mana changed');
      console.log(this.flutterState.getMana());
      const { a, b } = this.flutterState.getMana();
      this.manaWidth = maxManaWidth * a / b;
      this.batteryLife = (a / b * 100).toFixed(0) as unknown as number;
    });
    this.flutterState.onThemeChanged(() => {
      this.theme = this.flutterState.getTheme();
      this.themeService.setTheme(this.theme);
    });
  }
}
