import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit, Renderer2, effect, inject, runInInjectionContext } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { ThemeService } from '@data/theme/theme.service';
import { LeftMenuComponent } from '@view/share-components/left-menu/left-menu.component';
import { TrackingComponent } from '@view/share-components/tracking/tracking.component';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  templateUrl: './layout-default.component.html',
  imports: [CommonModule, RouterModule, LeftMenuComponent, TrackingComponent],
})
export class LayoutDefaultComponent implements OnInit, OnDestroy {
  themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  injector = inject(Injector);
  router = inject(Router);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);
  subscription!: Subscription;
  isCollapsed = false;

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
