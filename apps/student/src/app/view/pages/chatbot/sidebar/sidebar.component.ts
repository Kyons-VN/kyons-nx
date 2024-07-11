import { CommonModule, DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Component, effect, inject, Injector, Input, NgZone, OnInit, Renderer2, runInInjectionContext, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Chat } from "@data/chat/chat-model";
import { ChatService } from "@data/chat/chat.service";
import { NavigationService } from "@data/navigation/navigation.service";
import { ThemeService } from "@data/theme/theme.service";
import { UserService } from "@data/user/user.service";
import { toNonAccentVietnamese } from "@share-utils/formats";

@Component({
  standalone: true,
  selector: 'student-chatbot-sidebar',
  templateUrl: './chatbot-sidebar.html',
  imports: [CommonModule, RouterModule, MatButtonModule, MatMenuModule, FormsModule]
})
export class ChatbotSidebarComponent implements OnInit {
  injector = inject(Injector);
  themeService = inject(ThemeService);
  paths = inject(NavigationService).paths;
  zone = inject(NgZone);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  router = inject(Router);
  route = inject(ActivatedRoute);
  chatService = inject(ChatService);
  userService = inject(UserService);
  changeDetectorRef = inject(ChangeDetectorRef);

  @Input() isSmMenuHide = signal(false);
  @Input() chatId = '';
  @Input() toggleMenuInput = () => {
    this.toggleMenu();
  };

  theme = 'default';
  userId = '';
  selectedChat = signal<Chat | null>(null);
  selectedChatGroup = signal<string>('');
  showConfirmDeleteChat = signal(false);
  showEditChat = signal(false);
  updatingChat = false;
  chatName = '';
  groupNames = ['today', 'yesterday', 'last7Days', 'last30Days', 'older'];
  searchChat = '';
  chats: { [key: string]: { label: string, data: Chat[] } } = {
    today: { label: 'Today', data: [] },
    yesterday: { label: 'Yesterday', data: [] },
    last7Days: { label: 'Last 7 Days', data: [] },
    last30Days: { label: 'Last 30 Days', data: [] },
  };
  chats$!: Chat[];
  search = '';

  ngOnInit() {
    this.userId = this.userService.getUserId();
    this.route.paramMap.subscribe(params => {
      this.chatId = params.get('id') ?? '';
      console.log(`Chat id: ${this.chatId}`);
      this.chatService.getChats(this.userId).subscribe({
        next: chats => {
          this.chats$ = chats;
          this.chats = this.groupByTime(chats);
          this.changeDetectorRef.detectChanges();
        },
        error: err => {
          if (err.message === 'Unauthenticated') {
            this.router.navigate([this.paths.signOut.path]);
          }
        },
      });
    });
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
      });
    });
  }


  async getChats(): Promise<void> {
    this.searchChat = '';
    return this.chatService.getChats(this.userId, true).subscribe({
      next: (chats) => {
        this.chats$ = chats;
        this.chats = this.groupByTime(chats);
        this.changeDetectorRef.detectChanges();
      }
    }).add(() => null);
  }

  goToChat(chatId: string) {
    this.zone.run(() => {
      this.router.navigate([this.paths.chat.path.replace(':id', chatId)]);
    });
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

  updateChatName() {
    this.updatingChat = true;
    this.chatService.updateChatName(this.userId, this.selectedChat()!.id, this.chatName).subscribe({
      next: async () => {
        await this.getChats();
        this.updatingChat = false;
      },
      error: (err) => {
        console.error(err);
        this.updatingChat = false;
      }
    });
    this.showEditChat.set(false);
  }

  deleteChat() {
    this.updatingChat = true;
    this.chatService.deleteChat(this.userId, this.selectedChat()!.id).subscribe({
      next: () => {
        this.getChats();
        if (this.selectedChat()?.id === this.chatId) {
          this.router.navigate([this.paths.chatbot.path]);
        }
        this.updatingChat = false;
      },
      error: (err) => {
        console.error(err);
        this.updatingChat = false;
      }
    });
    this.showConfirmDeleteChat.set(false);
  }

  onSearchChat() {
    if (this.searchChat === '') {
      this.chats = this.groupByTime(this.chats$);
      return;
    }
    const search = toNonAccentVietnamese(this.searchChat).toLowerCase();
    const filteredChats = this.chats$.filter(chat => chat.search.toLowerCase().includes(search));
    this.chats = this.groupByTime(filteredChats);
  }
}