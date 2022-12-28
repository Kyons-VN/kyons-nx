import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { OrderService } from '@infrastructure/order/order.service';
import { AppPaths } from '@presentation/routes';

@Component({
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent {
  @HostBinding('class') class = 'h-full';
  paths: AppPaths;
  constructor(
    navService: NavigationService,
    private loading: LoadingOverlayService,
    private orderService: OrderService,
    private router: Router) {
    this.paths = navService.paths;
  }

  getFreeTrial() {
    this.loading.show();
    this.orderService.getFreeTrial().subscribe({
      next: () => {
        this.router.navigate([this.paths.learningPath.path]);
        this.loading.hide();
      },
      error: () => {
        alert('Có lỗi, xin thử lại');
        this.loading.hide();
      }
    });
  }
}
