import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import Inventory from '@infrastructure/order/inventory';
import { OrderService } from '@infrastructure/order/order.service';
import { TransactionList } from '@infrastructure/order/transaction';
import { AppPaths } from '@presentation/routes';
import { TopMenuComponent } from '@presentation/share-components/top-menu/top-menu.component';
import { AccountAndPaymentComponent } from './components/account-and-payment.component';
import { ChangePasswordComponent } from './components/change-password.component';
import { ProfileComponent } from './components/profile.component';
// import { AppPaths } from '@presentation/routes';

@Component({
  standalone: true,
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    AccountAndPaymentComponent,
    ProfileComponent,
    ChangePasswordComponent,
    RouterModule,
    TopMenuComponent,
  ],
})
export class AccountPageComponent implements OnInit {
  @HostBinding('class') class = 'w-full h-full';

  paths: AppPaths;
  constructor(private orderService: OrderService, navService: NavigationService) {
    this.paths = navService.paths;
  }

  activeTab = 0;
  hasError = '';
  inventory: Inventory = Inventory.empty();
  // balance: Balance = Balance.empty();
  transactions = TransactionList.empty();
  activities = [];
  router = inject(Router);

  private toTime(totalhours: number) {
    const days = Math.floor(totalhours / 24);
    const hours = totalhours % 24;
    const minutes = Math.floor((hours - Math.floor(hours)) * 60);
    const roundedHours = Math.floor(hours);
    return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${
      minutes > 0 ? ` ${minutes} phút` : ''
    }`;
  }

  ngOnInit(): void {
    return;
    // this.orderService.getInventories().subscribe({
    //   next: (inventory: Inventory) => {
    //     this.inventory = inventory;
    //   },
    //   error: () => {
    //     // TODO: Define error resposes
    //     this.hasError = 'Có lỗi, vui lòng thử lại';
    //   },
    // });
    // this.orderService.getBalance().subscribe({
    //   next: (balance: Balance) => {
    //     this.balance = balance;
    //   },
    //   error: () => {
    //     // TODO: Define error resposes
    //     this.hasError = 'Có lỗi, vui lòng thử lại';
    //   },
    // });
  }

  getTransactions() {
    this.activeTab = 1;
    if (this.transactions.list.length == 0) {
      this.orderService.getTransaction().subscribe({
        next: (res: any) => {
          this.transactions = res;
        },
        error: () => {
          // TODO: Define error resposes
          this.hasError = 'Có lỗi, vui lòng thử lại';
        },
      });
    }
  }

  getActivities() {
    this.router.navigate([this.paths.resetPassword.path]);
  }

  onSelectTab(newValue: string) {
    this.activeTab = parseInt(newValue); // don't forget to update the model here
    // ... do other stuff here ...
  }
}
