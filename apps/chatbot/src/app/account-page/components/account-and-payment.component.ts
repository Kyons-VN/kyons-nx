import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationService } from '@data/navigation/navigation.service';
import Balance from '@data/order/balance';
import { Inventory, Item } from '@data/order/inventory';
import Order from '@data/order/order';
import { OrderService } from '@data/order/order.service';
import { Package } from '@data/order/package';
import SubscriptionTime from '@data/order/subscription';
import { UserService } from '@data/user/user.service';
import { OrderStatus } from '@domain/order/i-order';
import { SafeHtmlPipe } from '@share-pipes';

@Component({
  selector: 'chatbot-account-and-payment',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, RouterModule, FormsModule],
  templateUrl: './account-and-payment.component.html',
})
export class AccountAndPaymentComponent implements OnInit {
  orderService = inject(OrderService);
  paths = inject(NavigationService).paths;
  OrderStatus = OrderStatus;
  route = inject(ActivatedRoute);
  router = inject(Router);
  email = inject(UserService).getEmail();

  activeTab = signal(0);
  totalItems: number = 0;
  showBenefit: boolean = false;
  showWarning: boolean = false;
  showExtending: boolean = false;
  showUpgrade: boolean = false;
  showOrdering: boolean = false;
  orderCode: string = '';
  isOrderSuccess = false;
  showTopup = false;
  orders!: Order[];
  isViewOrder = false;
  orderDetails!: Order;
  packages!: Package[];
  inventory!: Inventory;
  items: Item[] = [];
  currentPackage!: Package;
  selectedPackage!: Package;
  balance!: Balance;
  hasError = '';
  remainingHours: number = 0;
  remainingHoursDisplay: string = '';
  isCancelSuccess = false;
  isCancelFail = false;
  isCanceling = false;
  isConfirming = false;
  isPendingOrder = false;
  isOrderFail = false;
  amount = 0;

  @HostBinding('class') class = 'w-full';

  ngOnInit(): void {
    this.loadPackages().add(() => {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params['packageLevel']) {
            window.localStorage.removeItem('selectedPackageLevel');
            this.router.navigate([this.paths.account.path]);
            this.selectPackage(this.packages.find(p => p.level === parseInt(params['packageLevel']))!);
          }
        }
      })
    });
    this.loadGeneral();
  }

  loadGeneral() {
    this.orderService.getInventory().subscribe({
      next: (inventory: Inventory) => {
        this.inventory = inventory;
        this.currentPackage = this.inventory.subscription.package;
        this.items = this.inventory.items;
        this.totalItems = this.items.length > 0 ? this.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
      },
    });

    this.orderService.getBalance().subscribe({
      next: (balance: Balance) => {
        this.balance = balance;
      },
      error: () => {
        // TODO: Define error resposes
        this.hasError = 'Có lỗi, vui lòng thử lại';
      },
    });
    this.orderService.getSubscriptionTime().subscribe({
      next: (subscriptionTime: SubscriptionTime) => {
        this.remainingHoursDisplay = toTime(subscriptionTime.remainingHours);
      },
    });
  }

  loadPackages() {
    return this.orderService.getPackages().subscribe({
      next: data => {
        this.packages = data;
      },
    });
  }

  copy(string: string) {
    navigator.clipboard.writeText(string);
    alert('Sao chép thành công!');
  }

  selectPackage(selectedPackage: Package) {
    this.selectedPackage = selectedPackage;
    this.orderService.orderPackage(selectedPackage.id, 1).subscribe({
      next: (orderCode) => {
        if (orderCode == '') { this.isOrderFail = true; }
        this.orderCode = orderCode;
        this.showOrdering = true;
      },
      error: () => {
        this.isPendingOrder = true;
        this.showOrdering = false;
      },
    });
  }

  // order(orderPackage: Package) {
  //   this.orderService.orderPackage(orderPackage.id, ).subscribe({
  //     next:()=>{},
  //     error:()=>{},
  //   });
  // }

  loadOrderHistory() {
    return this.orderService.getOrderHistory().subscribe({
      next: data => {
        this.orders = data;
      },
      error: () => { },
    });
  }

  confirmOrder() {
    this.isConfirming = true;
    this.orderService.confirmOrder(this.orderCode).subscribe({
      next: () => {
        this.isOrderSuccess = true;
        this.isConfirming = false;
        this.showOrdering = false;
      },
      error: () => {
        this.isOrderSuccess = false;
        this.isConfirming = false;
        this.showOrdering = false;
      },
    });
  }

  cancelOrder() {
    this.isCanceling = true;
    this.orderService.cancelOrder(this.orderCode).subscribe({
      next: (res) => {
        if (res === 'canceled') {
          this.isCancelSuccess = true;
          this.showOrdering = false;
        }
        else {
          this.isCancelFail = true;
        }
        this.isCanceling = false;
        this.loadOrderHistory();
      },
      error: () => {
        this.isCancelFail = true;
        this.isCanceling = false;
      },
    });
  }

  viewOrder(order: Order) {
    this.isViewOrder = true;
    this.orderDetails = order;
    this.orderCode = order.code;
  }

  viewAndPay(order: Order) {
    this.selectedPackage = order.orderPackage;
    this.orderCode = order.code;
    this.showOrdering = true;
  }

  backToHistory() {
    this.isOrderSuccess = false;
    this.isViewOrder = false;
    this.isCancelSuccess = false;
    this.isPendingOrder = false;
    this.isCancelFail = false;
    this.isOrderFail = false;
    this.activeTab.set(3);
    this.loadOrderHistory();
  }

}


function toTime(totalhours: number) {
  const days = Math.floor(totalhours / 24);
  const hours = totalhours % 24;
  const minutes = Math.floor((hours - Math.floor(hours)) * 60);
  const roundedHours = Math.floor(hours);
  return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${minutes >= 0 ? ` ${minutes} phút` : ''
    }`;
}