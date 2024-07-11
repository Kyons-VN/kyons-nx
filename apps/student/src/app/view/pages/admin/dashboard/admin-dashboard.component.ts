import { CommonModule } from '@angular/common';
import { Component, HostBinding, Injector, OnInit, ViewEncapsulation, effect, inject, runInInjectionContext, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@data/admin/admin-service.service';
import ChatUser from '@data/admin/chat-user';
import { Chat } from '@data/chat/chat-model';
import { ChatService } from '@data/chat/chat.service';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { FilterPipe } from '@share-pipes';
import { MessagesComponent } from '@view/share-components/chat/messages.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, MessagesComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardComponent implements OnInit {
  loadingService = inject(LoadingOverlayService);
  chatService = inject(ChatService);
  adminService = inject(AdminService);
  injector = inject(Injector);

  @HostBinding('class') class = 'app-full';

  toggleList: boolean[] = [];
  tabs: string[] = ['Chat', 'Config'];
  selectedTab = 0;
  configMenu = signal(0);
  selectedUser: ChatUser | null = null;
  mana = 0;
  totalUsers!: number;
  search = '';
  users: ChatUser[] = [];

  // Config
  defaultMana = 0;
  isChanged = false;
  context = {
    initialGameContext: '',
    initialNoGameContext: '',
    websiteContext: '',
  };
  fileValidation = {
    maxFileSize: 0,
    maxImageSize: 0,
    allowedFileTypes: [''],
    maxStorageSize: 0,
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.adminService.getUsers();
    this.totalUsers = await this.adminService.countUsers();
    runInInjectionContext(this.injector, () => {
      effect(async () => {
        if (this.configMenu() == 0) {
          this.defaultMana = await this.adminService.getDefaultMana();
        }
        else if (this.configMenu() == 1) {
          this.context = await this.adminService.getContext();
        }
        else if (this.configMenu() == 2) {
          this.fileValidation = await this.adminService.getFileValidation();
        }
      });
    });
  }

  getMessages(chat: Chat) {
    this.chatService.getMessages(this.selectedUser!.id, chat.id).subscribe({
      next: (messages) => {
        if (this.selectedUser && this.selectedUser.history) this.selectedUser.history.find((c) => c.id == chat.id)!.messages = messages;
        this.toggleList[this.selectedUser!.history!.findIndex((c) => c.id == chat.id)] = true;
      }
    })
  }

  viewChat(user: ChatUser) {
    if (this.selectedUser == null) return;
    this.chatService.getChats(user.id).subscribe({
      next: (chats) => {
        this.selectedUser!.history = chats;
        this.toggleList = chats.map(() => false);
      }
    })
  }

  resetMana(user: ChatUser) {
    this.loadingService.show();
    this.adminService.resetMana(user.id).subscribe({
      next: () => {
        this.chatService.getMana(this.selectedUser!.id).subscribe({
          next: (mana) => {
            this.mana = mana.value;
            this.loadingService.hide();
          },
          error: (error) => {
            console.log(error);
            this.loadingService.hide();
          },
        })
      },
      error: (error) => {
        console.log(error);

        this.loadingService.hide();
      },
    });
  }

  async refresh() {
    this.adminService.clearStorage();
    this.users = await this.adminService.getUsers();
  }

  selectUser(user: any) {
    this.mana = -1;
    this.selectedUser = user;
    this.chatService.getMana(user.id).subscribe({
      next: (mana) => {
        this.mana = mana.value;
      },
    });
  }

  filterUser(item: ChatUser) {
    return item.email.includes(this.search);
  }

  submit() {
    console.log(this.search);

  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  saveDefaultMana() {
    this.adminService.saveDefaultMana(this.defaultMana);
  }
  saveContext() {
    this.adminService.saveContext(this.context);
  }

  insertFileTypeAt(index: number) {
    this.fileValidation.allowedFileTypes.splice(index, 0, '');
  }

  saveFileValidation() {
    this.adminService.saveFileValidation(this.fileValidation);
  }

  remove(index: number) {
    this.fileValidation.allowedFileTypes.splice(index, 1);
  }

}
