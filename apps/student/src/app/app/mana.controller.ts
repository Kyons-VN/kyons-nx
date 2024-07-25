import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChatService } from '@data/chat/chat.service';
import { UserService } from '@data/user/user.service';
import { Mana } from '@share-utils/data';

@Injectable({
  providedIn: 'root'
})
export class ManaController {
  userId = inject(UserService).getUserId();
  service = inject(ChatService);
  private static instance: ManaController;
  mana$ = toSignal(this.service.getMana(this.userId), { initialValue: new Mana(0, 0) });
  constructor() {
    if (ManaController.instance) {
      // Already created, return existing instance
      return ManaController.instance;
    }
    ManaController.instance = this;
  }

  refresh() {
    this.service.getMana(this.userId);
  }
}