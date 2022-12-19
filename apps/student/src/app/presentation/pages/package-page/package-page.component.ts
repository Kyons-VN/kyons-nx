import { Component, HostBinding, OnInit } from '@angular/core';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import Balance from '@infrastructure/order/balance';
import { OrderService } from '@infrastructure/order/order.service';
import { Package } from '@infrastructure/order/package';
import { AppPaths } from '@presentation/routes';

@Component({
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss'],
})
export class PackagePageComponent implements OnInit {
  @HostBinding('class') class = 'h-full';
  paths: AppPaths;
  constructor(
    navService: NavigationService,
    private orderService: OrderService,
    private loading: LoadingOverlayService
  ) {
    this.paths = navService.paths;
  }

  packages: Package[] = [];
  errorMessage = '';
  step = 0;
  selectedPackage!: Package;
  quantity = 1;
  balance = Balance.empty();

  ngOnInit(): void {
    console.log("init PackagePageComponent");
    this.getBalance();
    this.orderService.getPackages().subscribe({
      next: (packages: Package[]) => {
        this.packages = packages;
      },
      error: (err) => {
        // TODO: Define error resposes
        this.errorMessage = 'Có lỗi, vui lòng thử lại';
      }
    });
  }

  getBalance() {
    this.orderService.getBalance().subscribe({
      next: (balance: Balance) => {
        this.balance = balance;
      },
      error: (err) => {
        // TODO: Define error resposes
        this.errorMessage = 'Có lỗi, vui lòng thử lại';
      }
    });
  }

  buyPackage(pack: Package) {
    this.selectedPackage = pack;
    this.step = 1;
    this.quantity = 1;
  }

  orderPackage() {
    this.loading.show();
    this.orderService.orderPackage(this.selectedPackage.id, this.quantity).subscribe({
      next: (res) => {
        console.log(res);
        this.step = 2;
        this.getBalance();
        this.loading.hide();
      },
      error: (err) => {
        // TODO: Define error resposes
        if (err.error_code == 'BalanceLow') {
          this.errorMessage = 'Tài khoản của bạn hiện không đủ số dư để thanh toán. Vui lòng nạp thêm tiền vào Kyons';
        }
        else if (err.error_code == 'OverLimit') {
          this.errorMessage = `Bạn chỉ có thể mua tối đa ${this.selectedPackage.limit} gói`;
        }
        else {
          this.errorMessage = 'Có lỗi, vui lòng thử lại';
        }
        this.step = 3;
        this.loading.hide();
      }
    });
  }

  close() {
    this.step = 0;
    this.quantity = 1;
  }

}
