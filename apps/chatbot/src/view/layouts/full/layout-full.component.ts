import { DOCUMENT } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit, Renderer2, effect, inject, runInInjectionContext } from '@angular/core';
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
  injector = inject(Injector);
  router = inject(Router);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  subscription!: Subscription;

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
        this.renderer.setAttribute(this.document.body, 'data-theme', this.theme);
      });
    });
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Do something before navigation starts (optional)
      } else if (event instanceof NavigationEnd) {
        // Your logic to handle route changes here
        this.renderer.setAttribute(this.document.body, 'data-theme', this.theme);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
