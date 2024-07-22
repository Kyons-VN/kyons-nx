import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  ViewChild,
  effect,
  inject,
  runInInjectionContext
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatService } from '@data/chat/chat.service';
import { NavigationService } from '@data/navigation/navigation.service';
import { OrderService } from '@data/order/order.service';
import { ThemeService } from '@data/theme/theme.service';
// import { NotificationService } from '@data/notification/notification.service';
import { UserService } from '@data/user/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'student-left-menu',
  templateUrl: 'left-menu.component.html',
  styleUrls: ['left-menu.component.scss'],
})
export class LeftMenuComponent implements OnInit {
  paths = inject(NavigationService).paths;
  userService = inject(UserService);
  themeService = inject(ThemeService);
  chatService = inject(ChatService);
  injector = inject(Injector);
  orderService = inject(OrderService);

  isShowMobileMenu = false;
  show = true;
  theme = this.themeService.getTheme();
  mana = 0;
  coin = 0;
  userId = '';
  isCollapsed = false;

  /**
   * This is the toogle button elemenbt, look at HTML and see its defination
   */
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  @Output('collapseEvent') collapseEvent = new EventEmitter<boolean>();

  username = '';
  showSettings = false;

  async ngOnInit(): Promise<void> {
    this.userId = await this.userService.getUserId();
    this.username = await this.userService.getUsername();
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
        if (this.userId) {
          this.chatService.getMana(this.userId).subscribe({
            next: mana => {
              this.mana = mana.value;
            },
          });
          this.orderService.getCoin().subscribe({
            next: (coin: number) => {
              this.coin = coin;
            },
          })
        }
      });
    });
  }

  setTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseEvent.emit(this.isCollapsed);
  }
}
