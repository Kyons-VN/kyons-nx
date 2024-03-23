import { Component, Injector, OnInit, effect, inject, runInInjectionContext } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@data/theme/theme.service';

@Component({
  standalone: true,
  selector: 'chatbot-layout-default',
  templateUrl: './layout-full.component.html',
  imports: [RouterModule],
})
export class LayoutFullComponent implements OnInit {
  themeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  injector = inject(Injector);
  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        this.theme = this.themeService.themeStore();
      });
    });
  }
}
