import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
  effect,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationService } from '@data/navigation/navigation.service';
import { ThemeService } from '@data/theme/theme.service';
// import { NotificationService } from '@data/notification/notification.service';
import { UserService } from '@data/user/user.service';
import { MaterialModule } from '../../../material.module';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  selector: 'student-top-menu',
  templateUrl: 'top-menu.component.html',
  styleUrls: ['top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  showSubmenu = false;
  paths = inject(NavigationService).paths;
  userService = inject(UserService);
  show = true;
  themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  injector = inject(Injector);

  @Input() showLogo = true;

  /**
   * This is the toogle button elemenbt, look at HTML and see its defination
   */
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  username = '';
  showSettings = false;

  async ngOnInit(): Promise<void> {
    this.username = await this.userService.getUsername();
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
      });
    });
  }

  setTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }
}
