import { Component, Injector, OnDestroy, OnInit, effect, inject, runInInjectionContext } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { ThemeService } from '@data/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'chatbot-layout-default',
  templateUrl: './layout-full.component.html',
  imports: [RouterModule],
})
export class LayoutFullComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  themeOnlyForHome = 'default';
  injector = inject(Injector);
  router = inject(Router);
  subscription!: Subscription;
  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
        if (this.router.url == '/' || this.router.url.startsWith('/chat/')) this.themeOnlyForHome = this.theme;
      });
    });
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Do something before navigation starts (optional)
      } else if (event instanceof NavigationEnd) {
        // Your logic to handle route changes here
        if (event.url == '/') {
          this.themeOnlyForHome = this.theme;
        } else {
          this.themeOnlyForHome = 'default';
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
