import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { OrderService } from '@infrastructure/order/order.service';
import { AppPath } from '@presentation/routes';
// import { AppPath } from '../../routes';

@Component({
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';

  paths: AppPath;
  constructor(
    private router: Router,
    private orderService: OrderService,
    navService: NavigationService,
  ) {
    this.paths = navService.paths;
  }

  activeTab = 0;
  hasError = '';
  inventory = {
    "mock_test": 10,
    "tutor_advice": 0,
    "subscription": ''
  };
  balance = 0;
  transactions = [];

  private toTime(totalhours: number) {
    const days = Math.floor(totalhours / 24);
    const hours = totalhours % 24;
    const minutes = Math.floor((hours - Math.floor(hours)) * 60);
    const roundedHours = Math.floor(hours);
    return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${minutes > 0 ? ` ${minutes} phút` : ''}`
  }

  ngOnInit(): void {
    console.log('init AccountPageComponent');
    this.orderService.getInventories().subscribe({
      next: (data: any) => {
        data.subscription = this.toTime(data.subscription);
        this.inventory = data;
      },
      error: (err) => {
        this.hasError = 'Có lỗi, vui lòng thử lại';
      }
    });
    this.orderService.getBalance().subscribe({
      next: (res: any) => {
        this.balance = res;
      },
      error: (err) => {
        this.hasError = 'Có lỗi, vui lòng thử lại';
      }
    });
  }

  getTransactions() {
    this.activeTab = 1;
    if (this.transactions.length == 0) {
      this.orderService.getTransaction().subscribe({
        next: (res: any) => {
          this.transactions = res;
        },
        error: (err) => {
          this.hasError = 'Có lỗi, vui lòng thử lại';
        }
      });
    }

  }

}
