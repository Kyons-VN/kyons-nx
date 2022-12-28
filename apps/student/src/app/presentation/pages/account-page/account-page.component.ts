import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import Balance from '@infrastructure/order/balance';
import Inventory from '@infrastructure/order/inventory';
import { OrderService } from '@infrastructure/order/order.service';
import { TransactionList } from '@infrastructure/order/transaction';
import { AppPaths } from '@presentation/routes';
// import { AppPaths } from '@presentation/routes';

@Component({
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';

  paths: AppPaths;
  constructor(
    private router: Router,
    private orderService: OrderService,
    navService: NavigationService,
  ) {
    this.paths = navService.paths;
  }

  activeTab = 0;
  hasError = '';
  inventory: Inventory = Inventory.empty();
  balance: Balance = Balance.empty();
  transactions = TransactionList.empty();
  activities = [];

  private toTime(totalhours: number) {
    const days = Math.floor(totalhours / 24);
    const hours = totalhours % 24;
    const minutes = Math.floor((hours - Math.floor(hours)) * 60);
    const roundedHours = Math.floor(hours);
    return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${minutes > 0 ? ` ${minutes} phút` : ''}`
  }

  ngOnInit(): void {
    this.orderService.getInventories().subscribe({
      next: (inventory: Inventory) => {
        this.inventory = inventory;
      },
      error: (err) => {
        // TODO: Define error resposes
        this.hasError = 'Có lỗi, vui lòng thử lại';
      }
    });
    this.orderService.getBalance().subscribe({
      next: (balance: Balance) => {
        this.balance = balance;
      },
      error: (err) => {
        // TODO: Define error resposes
        this.hasError = 'Có lỗi, vui lòng thử lại';
      }
    });
  }

  getTransactions() {
    this.activeTab = 1;
    if (this.transactions.list.length == 0) {
      this.orderService.getTransaction().subscribe({
        next: (res: any) => {
          this.transactions = res;
        },
        error: (err) => {
          // TODO: Define error resposes
          this.hasError = 'Có lỗi, vui lòng thử lại';
        }
      });
    }
  }

  getActivities() {
    this.activeTab = 2;
  }

  onSelectTab(newValue: string) {
    this.activeTab = parseInt(newValue);  // don't forget to update the model here
    // ... do other stuff here ...
  }
}
