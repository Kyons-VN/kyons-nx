import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostBinding, inject, Renderer2, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '@data/navigation/navigation.service';
// import Balance from '@data/order/balance';
import Balance from '@data/order/balance';
import { OrderService } from '@data/order/order.service';
import { TransactionList } from '@data/order/transaction';
import { TopMenuComponent } from '@view/share-components/top-menu/top-menu.component';
import { AccountAndPaymentComponent } from './components/account-and-payment.component';
import { ChangePasswordComponent } from './components/change-password.component';
import { ProfileComponent } from './components/profile.component';
// import { AppPaths } from '@view/routes';

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
export class AccountPageComponent {
  @HostBinding('class') class = 'w-full h-full chat';

  paths = inject(NavigationService).paths;
  orderService = inject(OrderService);
  router = inject(Router);

  activeTab = 0;
  hasError = '';
  balance: Balance = Balance.empty();
  transactions = TransactionList.empty();
  activities = [];
  isSmMenuHide = signal(true);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);

  toggleMenu() {
    this.isSmMenuHide.set(!this.isSmMenuHide());
    this.isSmMenuHide() ? this.renderer.removeClass(this.document.body, 'overflow-hidden') : this.renderer.addClass(this.document.body, 'overflow-hidden');
  }

  // ngOnInit(): void {
  // this.orderService.getInventories().subscribe({
  //   next: (inventory: Inventory) => {
  //     this.inventory = inventory;
  //   },
  //   error: () => {
  //     // TODO: Define error resposes
  //     this.hasError = 'Có lỗi, vui lòng thử lại';
  //   },
  // });
  // }

  // getTransactions() {
  //   this.activeTab = 1;
  //   if (this.transactions.list.length == 0) {
  //     this.orderService.getTransaction().subscribe({
  //       next: (res: any) => {
  //         this.transactions = res;
  //       },
  //       error: () => {
  //         // TODO: Define error resposes
  //         this.hasError = 'Có lỗi, vui lòng thử lại';
  //       },
  //     });
  //   }
  // }

  // getActivities() {
  //   this.router.navigate([this.paths.resetPassword.path]);
  // }

  onSelectTab(newValue: string) {
    this.activeTab = parseInt(newValue); // don't forget to update the model here
    // ... do other stuff here ...
  }
}
