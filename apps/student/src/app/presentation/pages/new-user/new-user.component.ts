import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { OrderService } from '@infrastructure/order/order.service';
import { AppPath } from '@presentation/routes';

@Component({
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths: AppPath;
  constructor(
    navService: NavigationService,
    private loading: LoadingOverlayService,
    private orderService: OrderService,
    private router: Router) {
    this.paths = navService.paths;
  }

  ngOnInit(): void {
    console.log('init NewUserComponent');

  }

  getFreeTrial() {
    this.loading.show();
    this.orderService.getFreeTrial().subscribe({
      next: () => {
        this.router.navigate([this.paths.learningPath]);
        this.loading.hide();
      },
      error: (_) => {
        alert('Có lỗi, xin thử lại');
        this.loading.hide();
      }
    });
  }
}
