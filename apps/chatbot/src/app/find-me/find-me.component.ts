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
  chats!: Observable<(Chat | (Chat & object))[]>;
  countdown!: Observable<number>;
  $interval!: Subscription;
  flutterAppLoaded = true;
  day = '';
  hour = '';
  minute = '';
  second = '';
  chatId = '';
  userId = '';

  ngOnInit(): void {
    // watch route param changes
    this.route.paramMap.subscribe(params => {
      this.flutterAppLoaded = false;
      this.chatId = params.get('id') ?? '';
      console.log(`Chat id: ${this.chatId}`);
      this.chats = this.chatService.getChats();
      setTimeout(() => {
        this.flutterAppLoaded = true;
      }, 500);
    });
    this.userId = this.userService.getUserId();
    const targetDate = new Date('2024-04-01T24:00:00+00:00');
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
        const theme = this.themeService.themeStore();
        this.flutterState.setTheme(theme);
      });
    });
    this.flutterState.onChatIdChanged(() => {
      this.flutterAppLoaded = false;
      console.log(`Chat id changed: ${this.flutterState.getChatId()}`);
      if (this.chatId != this.flutterState.getChatId()) {
        this.goToChat(this.flutterState.getChatId());
      }
    });
  }

  onCounterSet(event: Event) {
    const clicks = parseInt((event.target as HTMLInputElement).value, 10) || 0;

    this.flutterState.setClicks(clicks);
  }

  onTextSet(event: Event) {
    this.flutterState.setText((event.target as HTMLInputElement).value || '');
  }

  // I need to force a change detection here. When clicking on the "Decrement"
  // button, everything works fine, but clicking on Flutter doesn't trigger a
  // repaint (even though this method is called)
  onCounterChanged() {
    this.changeDetectorRef.detectChanges();
  }

  onTextChanged() {
    this.changeDetectorRef.detectChanges();
  }
}
